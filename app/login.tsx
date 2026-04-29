import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
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

GoogleSignin.configure({
  // Web Client ID chuyên phục vụ Backend Server để đẻ ra chuỗi idToken phù hợp
  webClientId:
    "1053516508108-d32l6qi3ie8fk671bg2iv4cf7m9kve8l.apps.googleusercontent.com",
});

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorText("");
    try {
      // Đảm bảo thiết bị sẵn sàng Play Services
      await GoogleSignin.hasPlayServices();

      // Gọi Pop-up Native dưới đáy màn hình
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo?.data?.idToken;

      if (idToken) {
        // Truyền idToken Native mượt mà này sang Backend
        await sendTokenToBackend(idToken);
      } else {
        setErrorText("Không trích xuất được idToken từ Google.");
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setErrorText("Bạn vừa hủy đăng nhập.");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setErrorText("Đang xử lý đăng nhập...");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setErrorText("Điện thoại thiếu dịch vụ Google Play.");
      } else {
        // Nếu in ra DEVELOPER_ERROR (Code 10), thì do chữ ký SHA-1 trên Google Cloud Console chưa khớp!
        setErrorText(`Lỗi: ${error.message} (Mã: ${error.code})`);
      }
    } finally {
      setLoading(false);
    }
  };

  const sendTokenToBackend = async (idToken: string) => {
    try {
      const res = await fetch(
        "https://efficient-magnifier-irritable.ngrok-free.dev/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken }),
        }
      );

      if (res.ok) {
        console.log("Đăng nhập thành công!");
        router.replace("/(tabs)");
      } else {
        // Xóa cache Google → lần sau hiện màn hình chọn tài khoản khác
        await GoogleSignin.signOut();
        setErrorText(
          `Spring Boot từ chối Token (HTTP ${res.status}). Xin hãy kiểm tra lại cấu hình Audience của Java nhé!`
        );
      }
    } catch (e: any) {
      // Xóa cache Google → lần sau hiện màn hình chọn tài khoản khác
      await GoogleSignin.signOut();
      setErrorText("Lỗi kết nối Backend Ngrok: " + (e.message || e));
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

            {/* Error message */}
            {errorText !== "" && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{errorText}</Text>
              </View>
            )}

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
                  <Text style={styles.googleBtnText}>
                    Đăng nhập với Google
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <Text style={styles.hintText}>
              Vui lòng sử dụng email <Text style={styles.hintBold}>@hactech.edu.vn</Text> của trường
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
    height: width * 0.8,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  content: { flex: 1, paddingHorizontal: 25, justifyContent: "center" },

  // Logo
  logoSection: { alignItems: "center", marginBottom: 35 },
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

  // Error
  errorBox: {
    backgroundColor: "#fff3f3",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ffcccc",
  },
  errorText: {
    color: "#d32f2f",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
  },

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
