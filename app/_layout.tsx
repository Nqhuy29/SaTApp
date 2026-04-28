import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  // Đảm bảo khi có lỗi hoặc reload, nó biết quay về (tabs) nếu đã vào trong
  initialRouteName: "index",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

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
