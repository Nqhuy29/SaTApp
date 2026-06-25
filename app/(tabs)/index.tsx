
import { tokenStorage } from "@/src/services/tokenStorage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import {
  Calendar,
  LogOut,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  DeviceEventEmitter,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useQRScanner } from "@/hooks/useQRScanner";
import { useTodaySchedule } from "@/hooks/useTodaySchedule";
import { ClassItem } from "@/components/home/ClassItem";
import { ClassDetailModal } from "@/components/home/ClassDetailModal";
import { QRScannerModal } from "@/components/home/QRScannerModal";

const today = new Date();
const dayOfWeek = today.toLocaleDateString("vi-VN", { weekday: "long" });
const dayName = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
const dateStr = today.toLocaleDateString("vi-VN", { day: '2-digit', month: '2-digit', year: 'numeric' });
const formattedDate = `${dayName}, ${dateStr}`;

export default function Home() {
  const router = useRouter();
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [userInfo, setUserInfo] = useState({ name: '', email: '', photo: null as string | null });

  // ── Hook: Lịch hôm nay ──
  const {
    todayClasses, isLoadingToday, refreshing,
    fetchTodaySchedule, onRefresh,
  } = useTodaySchedule();

  // ── Hook: QR Scanner ──
  const {
    isScanning, scannedData, scanError, qrBounds, isConfirming,
    startScanning, handleBarCodeScanned, confirmAttendance,
    closeScanner, resetScan,
  } = useQRScanner(fetchTodaySchedule);

  useEffect(() => {
    // Lấy thông tin user đã lưu từ SecureStore (lưu lúc login)
    const loadUser = async () => {
      const info = await tokenStorage.getUserInfo();
      if (info.name) setUserInfo(info);
    };
    loadUser();

    const subscription = DeviceEventEmitter.addListener("openScanner", startScanning);
    return () => {
      subscription.remove();
    };
  }, []);

  const handleLogout = () => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn đăng xuất không?", [
      { text: "Không", style: "cancel" },
      {
        text: "Có",
        onPress: async () => {
          await tokenStorage.clearTokens();
          await GoogleSignin.signOut();
          router.replace("/login");
        },
        style: "destructive",
      },
    ]);
  };

  const activeTodayClasses = todayClasses.filter(c => c.attendance_status !== 'cancelled');
  const presentCount = activeTodayClasses.filter(c => c.attendance_status === 'present').length;
  const totalActiveCount = activeTodayClasses.length;

  return (
    <LinearGradient colors={["#0d47a1", "#1976d2"]} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={styles.avatarCircle}>
              {userInfo.photo ? (
                <Image source={{ uri: userInfo.photo }} style={styles.avatarImage} />
              ) : (
                <Text style={styles.avatarText}>{userInfo.name ? userInfo.name.charAt(0) : 'K'}</Text>
              )}
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.headerSubtitle}>Xin chào!!!</Text>
              <Text style={styles.userName}>{userInfo.name || 'Kiên Lê'}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <LogOut color="white" size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.dateBadgeContainer}>
          <View style={styles.dateBadge}>
            <Calendar size={14} color="white" />
            <Text style={styles.dateText}>{formattedDate}</Text>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#0d47a1"]} />}
      >
        <View style={styles.progressCard}>
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Tiến độ hôm nay</Text>
            <Text style={styles.progressValue}>
              {presentCount} / {totalActiveCount} lớp
            </Text>
          </View>
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${totalActiveCount > 0 ? (presentCount / totalActiveCount) * 100 : 0}%` },
              ]}
            />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>LỊCH HÔM NAY</Text>
        </View>

        {isLoadingToday ? (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0d47a1" />
            <Text style={{ marginTop: 10, color: '#888' }}>Đang tải lịch...</Text>
          </View>
        ) : todayClasses.length === 0 ? (
          <View style={{ padding: 30, alignItems: 'center' }}>
            <Text style={{ color: '#aaa', fontSize: 15, fontStyle: 'italic' }}>Không có lớp hôm nay</Text>
          </View>
        ) : (
          todayClasses.map((item) => (
            <ClassItem key={item.id} item={item} onPress={() => setSelectedClass(item)} />
          ))
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Modal Chi tiết môn học */}
      <ClassDetailModal
        selectedClass={selectedClass}
        onClose={() => setSelectedClass(null)}
        onScanQR={startScanning}
      />

      {/* Modal Camera */}
      <QRScannerModal
        isScanning={isScanning}
        scannedData={scannedData}
        scanError={scanError}
        qrBounds={qrBounds}
        isConfirming={isConfirming}
        onBarCodeScanned={handleBarCodeScanned}
        onConfirmAttendance={confirmAttendance}
        onClose={closeScanner}
        onResetScan={resetScan}
      />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 60, // Tăng paddingBottom lên 60 để đồng đều với màn hình schedule
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    overflow: "hidden",
  },
  avatarImage: { width: "100%", height: "100%" },
  avatarText: { color: "white", fontWeight: "bold", fontSize: 18 },
  headerInfo: { marginHorizontal: 12 },
  headerSubtitle: { fontSize: 13, color: "#E0E0FF" },
  userName: { color: "white", fontSize: 18, fontWeight: "bold", marginTop: 2 },
  logoutBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  dateBadgeContainer: {
    marginTop: 15,
    alignItems: "flex-start",
  },
  dateBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  dateText: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
  },
  scrollContent: {
    padding: 20,
    backgroundColor: "#F8F9FA",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    minHeight: "100%",
  },
  progressCard: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 16,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    alignItems: "center",
  },
  progressLabel: { color: "#333", fontWeight: "bold", fontSize: 16 },
  progressValue: { fontSize: 14, fontWeight: "bold", color: "#0d47a1" },
  progressBarBg: { height: 8, backgroundColor: "#F0F0F0", borderRadius: 4 },
  progressBarFill: { height: 8, backgroundColor: "#0d47a1", borderRadius: 4 },
  sectionHeader: { marginBottom: 15, marginTop: 5 },
  sectionTitle: { fontSize: 14, fontWeight: "bold", color: "#888", textTransform: "uppercase" },
});
