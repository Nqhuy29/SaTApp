import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { Calendar, Home, User, QrCode, PieChart } from "lucide-react-native";
import React from "react";
import { View, TouchableOpacity, Text, DeviceEventEmitter } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// 1. Khởi tạo bộ điều hướng có khả năng lướt ngang (Swipe)
const { Navigator } = createMaterialTopTabNavigator();
const MaterialTopTabs = withLayoutContext(Navigator);

function CustomTabBar({ state, descriptors, navigation, insets }: any) {
  const activeColor = "#0d47a1"; // Màu xanh chủ đạo
  
  return (
    <View style={{ 
      flexDirection: 'row', 
      backgroundColor: '#fff', 
      height: 60 + insets.bottom, 
      borderTopWidth: 1, 
      borderTopColor: '#eee',
      paddingBottom: insets.bottom
    }}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.title;
        const isFocused = state.index === index;
        
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const color = isFocused ? activeColor : '#888';
        const iconElement = options.tabBarIcon ? options.tabBarIcon({ color }) : null;

        const renderTab = (
          <TouchableOpacity 
            key={route.key} 
            onPress={onPress} 
            activeOpacity={0.7}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            {iconElement}
            <Text style={{ fontSize: 10, color, marginTop: 4, fontWeight: '600' }}>{label}</Text>
          </TouchableOpacity>
        );

        // Bí quyết tạo khoảng trống ở giữa cho nút QR (Giống MoMo) 
        // Khi render đến tab thứ 3 (index 2 - Chuyên cần), ta chèn thêm một View rỗng flex: 1
        // Như vậy ta có tổng cộng 5 flex: 1, tạo ra bố cục 5 nút hoàn hảo
        if (index === 2) { 
           return (
             <React.Fragment key={route.key + "_fragment"}>
               <View style={{ flex: 1, pointerEvents: 'none' }} />
               {renderTab}
             </React.Fragment>
           )
        }

        return renderTab;
      })}
    </View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <MaterialTopTabs
        tabBarPosition="bottom"
        tabBar={(props) => <CustomTabBar {...props} insets={insets} />}
      >
        <MaterialTopTabs.Screen
          name="index"
          options={{
            title: "Trang chủ",
            tabBarIcon: ({ color }: { color: string }) => <Home size={22} color={color} />,
          }}
        />
        <MaterialTopTabs.Screen
          name="schedule"
          options={{
            title: "Lịch học",
            tabBarIcon: ({ color }: { color: string }) => <Calendar size={22} color={color} />,
          }}
        />
        <MaterialTopTabs.Screen
          name="attendance"
          options={{
            title: "Chuyên cần",
            tabBarIcon: ({ color }: { color: string }) => <PieChart size={22} color={color} />,
          }}
        />
        <MaterialTopTabs.Screen
          name="profile"
          options={{
            title: "Cá nhân",
            tabBarIcon: ({ color }: { color: string }) => <User size={22} color={color} />,
          }}
        />
      </MaterialTopTabs>

      {/* Floating QR Button */}
      <View style={{ position: 'absolute', bottom: insets.bottom + 15, alignSelf: 'center', zIndex: 100 }}>
        <TouchableOpacity
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: "#0d47a1",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 4,
            borderColor: "white",
            elevation: 6,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
          }}
          activeOpacity={0.9}
          onPress={() => DeviceEventEmitter.emit("openScanner")}
        >
          <QrCode color="white" size={24} />
          <Text style={{ color: "white", fontSize: 9, fontWeight: "bold", marginTop: 2 }}>QR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
