import { initDatabase } from "@/db";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

export const unstable_settings = {
  // Đảm bảo khi có lỗi hoặc reload, nó biết quay về (tabs) nếu đã vào trong
  initialRouteName: "index",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Khi app khởi động,gọi hàm initDatabase để tạo bảng nếu chưa có
  useEffect(() => {
    try {
      initDatabase();
      console.log("✅ Database đã được khởi tạo hoặc đã tồn tại.");
    } catch (error) {
      console.error("❌ Lỗi khi khởi tạo database:", error);
    }
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* 1. Màn hình Đăng nhập (app/index.tsx) */}
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            gestureEnabled: false, // Chống vuốt ngược lại màn hình login sau khi vào app
          }}
        />

        {/* 2. Cụm các trang chính (app/(tabs)/...) */}
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
            gestureEnabled: false, // Chống vuốt ngược lại màn hình login sau khi vào app
          }}
        />
        {/* 3. Các màn hình phụ khác */}
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
