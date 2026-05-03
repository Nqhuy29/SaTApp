/* 
⚠️ DEV: COMMENT để chạy được trên Expo Go
*/
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { api } from "@/src/services/api";
import { tokenStorage } from "@/src/services/tokenStorage";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { CheckCircle2, LogOut, QrCode, XCircle } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// 👉 Thêm dòng này để "giả lập" object GoogleSignin, tránh lỗi khi gọi hàm signOut
const GoogleSignin: any = {
  signOut: () => Promise.resolve(),
};
const today = new Date();
const formattedDate = today.toLocaleDateString("vi-VN", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

//Biến giả: Thay đổi thông tin người dùng và lịch học để test giao diện
const MOCK_USER = {
  name: "Nguyễn Quang Huy",
  avatar: null, // Có thể thay bằng URL ảnh nếu có
  email: "nqhuy29@hactech.edu.vn",
  studentID: "CD234367",
};

export default function Home() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  // Thêm State để quản lý ẩn/hiện cửa sổ
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  // 1. Xử lý Đăng xuất
  const handleLogout = () => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn đăng xuất không?", [
      { text: "Không", style: "cancel" },
      {
        text: "Có",
        onPress: async () => {
          try {
            const refreshToken = await tokenStorage.getRefreshToken();
            if (refreshToken) {
              // Thông báo backend xóa refresh token
              await api.post("/auth/logout", { refreshToken });
            }
          } catch (_) {
            // Bỏ qua lỗi network khi logout
          } finally {
            // Xóa token local + cache Google
            await tokenStorage.clearTokens();
            await GoogleSignin.signOut();
            router.replace("/login");
          }
        },
        style: "destructive",
      },
    ]);
  };

  // 2. Xử lý Camera
  const startScanning = async () => {
    if (!permission?.granted) {
      const res = await requestPermission();
      if (!res.granted) {
        Alert.alert("Lỗi", "Bạn cần cấp quyền camera để quét mã");
        return;
      }
    }
    setIsScanning(true);
  };

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setIsScanning(false);
    Alert.alert("Thành công", `Đã điểm danh mã: ${data}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Tối Ưu: Avatar - Info - Logout */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          {/* Trái: Avatar */}
          <View style={styles.avatarCircle}>
            {/* Tự động lấy chữ cái đầu của tên */}
            <Text style={styles.avatarText}>{MOCK_USER.name.charAt(0)}</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.userName}>{MOCK_USER.name}</Text>
            <Text style={styles.headerSubtitle}>{formattedDate}</Text>
          </View>

          {/* Phải: Logout */}
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <LogOut color="white" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Nút Quét QR */}
        <TouchableOpacity
          style={styles.qrButton}
          activeOpacity={0.8}
          onPress={startScanning}
        >
          <QrCode color="white" size={48} />
          <Text style={styles.qrText}>Quét QR Để Điểm Danh</Text>
        </TouchableOpacity>

        {/* Tiến độ */}
        <View style={styles.progressCard}>
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Tiến độ học tập hôm nay</Text>
            <Text style={styles.progressValue}>2/3</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: "66%" }]} />
          </View>
        </View>
        <Modal
          visible={isHistoryVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsHistoryVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.bottomSheet}>
              <View style={styles.dragHandle} />

              {/* Container Header này sẽ đẩy 2 phần tử sang 2 bên */}
              <View style={styles.modalHeaderRow}>
                <Text style={styles.modalTitle}>Lớp Học Hôm Nay</Text>
                <TouchableOpacity
                  onPress={() => setIsHistoryVisible(false)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Tăng vùng bấm cho nút
                >
                  <Text style={styles.closeText}>Đóng</Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
              >
                <ClassItem
                  title="Lập Trình Java"
                  time="07:00 AM"
                  status="done"
                />
                <ClassItem
                  title="Lập Trình Web"
                  time="08:45 AM"
                  status="done"
                />
                <ClassItem
                  title="Hệ Quản Trị CSDL"
                  time="10:30 AM"
                  status="pending"
                />
                <ClassItem
                  title="Khoa Học Máy Tính"
                  time="01:00 PM"
                  status="missed"
                />
                <ClassItem
                  title="Mạng Máy Tính"
                  time="02:30 PM"
                  status="pending"
                />
                <ClassItem title="Toán Rời Rạc" time="04:00 PM" status="done" />
              </ScrollView>
            </View>
          </View>
        </Modal>
        {/* Lớp học */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Lớp Học Hôm Nay</Text>
          <TouchableOpacity onPress={() => setIsHistoryVisible(true)}>
            <Text style={styles.viewAll}>Xem Tất Cả</Text>
          </TouchableOpacity>
        </View>

        <ClassItem title="Lập Trình Java" time="07:00 AM" status="done" />
        <ClassItem title="Lập Trình Web" time="08:45 AM" status="done" />
        <ClassItem title="Hệ Quản Trị CSDL" time="10:30 AM" status="pending" />
      </ScrollView>

      {/* Modal Camera */}
      <Modal visible={isScanning} animationType="fade" transparent={false}>
        <CameraView
          style={StyleSheet.absoluteFillObject}
          onBarcodeScanned={isScanning ? handleBarCodeScanned : undefined}
        >
          <View style={styles.overlay}>
            <View style={styles.scanArea} />
            <Text style={styles.scanInstruction}>
              Di chuyển camera đến mã QR
            </Text>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setIsScanning(false)}
            >
              <Text style={styles.closeBtnText}>Hủy bỏ</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </Modal>
    </SafeAreaView>
  );
}

function ClassItem({
  title,
  time,
  status,
}: {
  title: string;
  time: string;
  status: "done" | "pending" | "missed";
}) {
  const isDone = status === "done";
  return (
    <View style={styles.classCard}>
      <View>
        <Text style={styles.classTitle}>{title}</Text>
        <Text style={styles.classTime}>{time}</Text>
      </View>
      <View style={[styles.statusBadge, isDone ? styles.bgBlue : styles.bgRed]}>
        {/* Nếu đã điểm danh hiện Check, nếu chưa hiện X */}
        {isDone ? (
          <CheckCircle2 color="white" size={14} style={{ marginRight: 4 }} />
        ) : (
          <XCircle color="white" size={14} style={{ marginRight: 4 }} />
        )}
        <Text style={styles.statusText}>
          {isDone ? "Đã điểm danh" : "Chưa điểm danh"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },

  // Header tinh chỉnh lại
  header: {
    backgroundColor: "#0d47a1",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatarCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  avatarText: { color: "white", fontWeight: "bold", fontSize: 18 },
  headerInfo: {
    flex: 1,
    marginHorizontal: 15,
  },
  userName: { color: "white", fontSize: 18, fontWeight: "bold" },
  headerSubtitle: { fontSize: 12, color: "#bbdefb", marginTop: 2 },
  logoutBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },

  scrollContent: { padding: 20 },
  qrButton: {
    backgroundColor: "#0d47a1",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    marginBottom: 25,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  qrText: { color: "white", fontWeight: "bold", marginTop: 10, fontSize: 16 },

  progressCard: {
    backgroundColor: "#e8f5e9",
    padding: 15,
    borderRadius: 15,
    marginBottom: 25,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressLabel: { color: "#2e7d32", fontWeight: "600" },
  progressValue: { fontSize: 20, fontWeight: "bold", color: "#2e7d32" },
  progressBarBg: { height: 6, backgroundColor: "#c8e6c9", borderRadius: 3 },
  progressBarFill: { height: 6, backgroundColor: "#4caf50", borderRadius: 3 },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    alignItems: "center",
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  viewAll: { color: "#1976d2", fontWeight: "600" },

  classCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  classTitle: { fontSize: 15, fontWeight: "bold", color: "#333" },
  classTime: { fontSize: 12, color: "#777", marginTop: 2 },
  statusBadge: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
    alignItems: "center",
  },
  bgBlue: { backgroundColor: "#1a237e" },
  bgRed: { backgroundColor: "#d32f2f" },
  statusText: { color: "white", fontSize: 11, fontWeight: "600" },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "#4caf50",
    backgroundColor: "transparent",
    borderRadius: 20,
  },
  scanInstruction: {
    color: "white",
    marginTop: 20,
    fontSize: 14,
    textAlign: "center",
  },
  closeBtn: {
    marginTop: 50,
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
  },
  closeBtnText: { color: "#d32f2f", fontWeight: "bold", fontSize: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Làm tối nền phía sau
    justifyContent: "flex-end", // Đẩy cửa sổ xuống đáy
  },
  bottomSheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: "70%", // Chiếm 70% chiều cao màn hình
    paddingHorizontal: 20,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 2.5,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  modalHeaderRow: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    justifyContent: "space-between", // Đẩy tiêu đề sang trái, nút đóng sang phải
    alignItems: "center", // Căn giữa theo chiều dọc
    marginBottom: 20,
    width: "100%", // Đảm bảo chiếm hết chiều rộng của BottomSheet
  },
  closeText: {
    color: "#0d47a1", // Màu xanh đậm đồng bộ với Header
    fontWeight: "bold",
    fontSize: 16,
  },
});
