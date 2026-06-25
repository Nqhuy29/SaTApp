import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { tokenStorage } from "@/src/services/tokenStorage";
import { BASE_URL } from "@/src/services/api";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useError } from "@/src/context/ErrorContext";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
// Cấu hình Google Sign-In ngay khi module được import,
// đảm bảo rằng mọi chức năng liên quan đến Google Sign-In đều có cấu hình sẵn sàng khi được gọi.

GoogleSignin.configure({
  // Web Client ID chuyên phục vụ Backend Server để đẻ ra chuỗi idToken phù hợp
  webClientId:
    "1053516508108-d32l6qi3ie8fk671bg2iv4cf7m9kve8l.apps.googleusercontent.com",
});

// Các hàm liên quan đến Google Sign-In được giữ nguyên, đảm bảo tính nhất quán và dễ bảo trì.
export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { showError } = useError();

  // Hàm xử lý đăng nhập Google, được tối ưu để bắt lỗi chi tiết và cung cấp phản hồi rõ ràng cho người dùng.
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // Đảm bảo thiết bị sẵn sàng Play Services
      await GoogleSignin.hasPlayServices();

      // Gọi Pop-up Native dưới đáy màn hình
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo?.data?.idToken;
      const userName = userInfo?.data?.user?.name || '';
      const userEmail = userInfo?.data?.user?.email || '';
      const userPhoto = userInfo?.data?.user?.photo || null;

      if (idToken) {
        // Truyền idToken Native mượt mà này sang Backend
        await sendTokenToBackend(idToken, userName, userEmail, userPhoto);
      } else {
        showError("Đăng nhập Google thất bại, không lấy được thông tin xác thực. Vui lòng thử lại.");
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        showError("Bạn vừa hủy đăng nhập.");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Bỏ qua lỗi này thay vì hiện pop-up lỗi
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        showError("Không tìm thấy dịch vụ Google Play trên thiết bị của bạn.");
      } else {
        // Lỗi không xác định hoặc DEVELOPER_ERROR
        showError("Đã xảy ra sự cố khi kết nối với Google. Vui lòng thử lại sau.");
      }
    } finally {
      setLoading(false);
    }
  };
  // Hàm gửi idToken lên Backend, được tối ưu để xử lý lỗi chi tiết
  // và đảm bảo rằng người dùng nhận được phản hồi rõ ràng về trạng thái đăng nhập của họ.
  const sendTokenToBackend = async (idToken: string, userName: string, userEmail: string, userPhoto: string | null) => {
    try {
      const res = await fetch(
        `${BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        },
      );

      if (res.ok) {
        const data = await res.json();
        const { accessToken, refreshToken } = data.result;

        // Kiểm tra phân quyền: chỉ STUDENT mới được vào app
        if (!tokenStorage.isStudentToken(accessToken)) {
          await GoogleSignin.signOut();
          showError(
            "Tài khoản này không có quyền truy cập. Chỉ sinh viên mới được sử dụng ứng dụng này."
          );
          return;
        }

        // Lưu token an toàn vào SecureStore
        await tokenStorage.saveTokens(accessToken, refreshToken);

        // Lưu thông tin user từ Google để Home hiển thị
        await tokenStorage.saveUserInfo(userName, userEmail, userPhoto);

        console.log("Đăng nhập thành công!");
        router.replace("/(tabs)");
      } else {
        // Xóa cache Google → lần sau hiện màn hình chọn tài khoản khác
        await GoogleSignin.signOut();
        showError("Phiên đăng nhập bị hệ thống từ chối hoặc đã hết hạn. Vui lòng thử lại.");
      }
    } catch (e: any) {
      // Xóa cache Google → lần sau hiện màn hình chọn tài khoản khác
      await GoogleSignin.signOut();
      showError("Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng Wifi/4G của bạn.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Background trang trí phía trên */}
      <LinearGradient
        colors={["#0d47a1", "#1976d2"]}
        style={styles.headerBackground}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.content}>
          {/* LOGO AREA */}
          {/* Tối ưu: Đặt logo vào trong một vòng tròn trắng có bóng để nổi bật hơn trên nền gradient */}
          <View style={styles.logoSection}>
            <View style={styles.logoWhiteCircle}>
              <Image
                source={require("../assets/images/student-attendance-logo.png")}
                style={styles.logoImg}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.appName}>SaTApp</Text>
            <Text style={styles.appTagline}>Ứng dụng điểm danh sinh viên</Text>
          </View>

          {/* LOGIN CARD */}
          <View style={styles.loginCard}>
            <Text style={styles.loginTitle}>Chào mừng bạn!</Text>
            <Text style={styles.loginSubtitle}>
              Đăng nhập bằng tài khoản Google của trường để tiếp tục
            </Text>

            {/* Google Sign-In Button */}
            <TouchableOpacity
              style={[styles.googleBtn, loading && styles.googleBtnDisabled]}
              onPress={handleGoogleLogin}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#0d47a1" />
              ) : (
                <>
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
                    }}
                    style={styles.googleIcon}
                  />
                  <Text style={styles.googleBtnText}>Đăng nhập với Google</Text>
                </>
              )}
            </TouchableOpacity>

            <Text style={styles.hintText}>
              Vui lòng sử dụng email{" "}
              <Text style={styles.hintBold}>đã đăng ký</Text> với trường để đăng nhập
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fbff" },
  headerBackground: {
    position: "absolute",
    top: 0,
    width: width,
    height: width * 1.0,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  content: { flex: 1, paddingHorizontal: 25, justifyContent: "center" },

  // Logo
  logoSection: { alignItems: "center", marginBottom: 50 },
  logoWhiteCircle: {
    width: 110,
    height: 110,
    borderRadius: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  logoImg: { width: 90, height: 90 },
  appName: {
    fontSize: 32,
    fontWeight: "900",
    color: "#fff",
    marginTop: 10,
    letterSpacing: 1,
  },
  appTagline: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "600",
  },

  // Card
  loginCard: {
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 28,
    shadowColor: "#0d47a1",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 13,
    color: "#888",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
    paddingHorizontal: 10,
  },

  // Error removed

  // Google Button
  googleBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 58,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#e1e8ef",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  googleBtnDisabled: {
    opacity: 0.7,
  },
  googleIcon: { width: 22, height: 22, marginRight: 12 },
  googleBtnText: { color: "#333", fontSize: 15, fontWeight: "700" },

  // Hint
  hintText: {
    marginTop: 18,
    fontSize: 12,
    color: "#aaa",
    textAlign: "center",
  },
  hintBold: {
    color: "#0d47a1",
    fontWeight: "700",
  },
});
