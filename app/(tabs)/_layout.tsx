import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { Calendar, CheckCircle2, Home } from "lucide-react-native";
import React from "react";

// 1. Khởi tạo bộ điều hướng có khả năng lướt ngang (Swipe)
const { Navigator } = createMaterialTopTabNavigator();
const MaterialTopTabs = withLayoutContext(Navigator);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeColor = Colors[colorScheme ?? "light"].tint;

  return (
    <MaterialTopTabs
      tabBarPosition="bottom" // Đẩy thanh tab xuống dưới cùng
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: "#888",
        tabBarIndicatorStyle: { height: 0 }, // Ẩn vạch gạch chân (indicator)
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          textTransform: "none",
          marginBottom: 5, // Căn chỉnh khoảng cách chữ
        },
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 65, // Tăng nhẹ chiều cao để icon và chữ không bị khít
          borderTopWidth: 1,
          borderTopColor: "#eee",
          paddingBottom: 5,
        },
        tabBarShowIcon: true, // Bắt buộc hiển thị Icon
        tabBarContentContainerStyle: {
          height: "100%", // Đảm bảo nội dung tab chiếm hết chiều cao bar
        },
      }}
    >
      <MaterialTopTabs.Screen
        name="index"
        options={{
          title: "Trang chủ",
          // Sửa lỗi: Thêm kiểu dữ liệu { color: string }
          tabBarIcon: ({ color }: { color: string }) => (
            <Home size={22} color={color} />
          ),
        }}
      />
      <MaterialTopTabs.Screen
        name="schedule"
        options={{
          title: "Lịch Học",
          // Sửa lỗi: Thêm kiểu dữ liệu { color: string }
          tabBarIcon: ({ color }: { color: string }) => (
            <Calendar size={22} color={color} />
          ),
        }}
      />
      <MaterialTopTabs.Screen
        name="attendance"
        options={{
          title: "Chuyên Cần",
          // Sửa lỗi: Thêm kiểu dữ liệu { color: string }
          tabBarIcon: ({ color }: { color: string }) => (
            <CheckCircle2 size={22} color={color} />
          ),
        }}
      />
    </MaterialTopTabs>
  );
}
