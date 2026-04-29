import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; // Cần cài: npx expo install expo-linear-gradient
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = () => {
    if (!email.endsWith("@hactech.edu.vn")) {
      Alert.alert("Thông báo", "Vui lòng sử dụng email @hactech.edu.vn");
      return;
    }
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      {/* Background trang trí phía trên */}
      <LinearGradient
        colors={["#0d47a1", "#1976d2"]}
        style={styles.headerBackground}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.content}
        >
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

          {/* FORM CARD */}
          <View style={styles.loginCard}>
            <Text style={styles.loginTitle}>Đăng Nhập</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email sinh viên</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color="#0d47a1"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="example@hactech.edu.vn"
                  placeholderTextColor="#a0a0a0"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mật khẩu</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#0d47a1"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#a0a0a0"
                  secureTextEntry={!isPasswordVisible}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <Ionicons
                    name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
              <LinearGradient
                colors={["#0d47a1", "#42a5f5"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientBtn}
              >
                <Text style={styles.btnLoginText}>ĐĂNG NHẬP</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotBtn}>
              <Text style={styles.forgotText}>Quên mật khẩu?</Text>
            </TouchableOpacity>
          </View>

          {/* FOOTER */}
          <View style={styles.footer}>
            <View style={styles.dividerRow}>
              <View style={styles.line} />
              <Text style={styles.orText}>Hoặc tiếp tục với</Text>
              <View style={styles.line} />
            </View>

            <TouchableOpacity style={styles.googleBtn}>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
                }}
                style={styles.googleIcon}
              />
              <Text style={styles.googleBtnText}>Google</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
  logoSection: { alignItems: "center", marginBottom: 30 },
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
    padding: 25,
    shadowColor: "#0d47a1",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: { marginBottom: 18 },
  label: {
    fontSize: 13,
    color: "#666",
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
    borderWidth: 1,
    borderColor: "#e1e8ef",
  },
  icon: { marginRight: 10 },
  input: { flex: 1, color: "#333", fontSize: 15 },

  // Button
  btnLogin: { marginTop: 10, borderRadius: 15, overflow: "hidden" },
  gradientBtn: { height: 55, justifyContent: "center", alignItems: "center" },
  btnLoginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  forgotBtn: { marginTop: 15, alignItems: "center" },
  forgotText: { color: "#0d47a1", fontSize: 14, fontWeight: "600" },

  // Footer
  footer: { marginTop: 30 },
  dividerRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  line: { flex: 1, height: 1, backgroundColor: "#dce4ec" },
  orText: { marginHorizontal: 15, color: "#999", fontSize: 13 },
  googleBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 55,
    borderRadius: 15,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e1e8ef",
  },
  googleIcon: { width: 20, height: 20, marginRight: 10 },
  googleBtnText: { color: "#444", fontSize: 15, fontWeight: "bold" },
});
