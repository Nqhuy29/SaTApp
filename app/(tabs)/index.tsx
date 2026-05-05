import { saveAttendance } from "@/db";
import { tokenStorage } from "@/src/services/tokenStorage";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  LogOut,
  MapPin,
  QrCode,
  User,
  XCircle,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const GoogleSignin: any = { signOut: () => Promise.resolve() };
const today = new Date();
const formattedDate = today.toLocaleDateString("vi-VN", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const MOCK_USER = {
  name: "Nguyễn Quang Huy",
  email: "nqhuy29@hactech.edu.vn",
};

const TODAY_CLASSES = [
  {
    id: 1,
    title: "Lập Trình Java",
    time: "07:00 AM",
    status: "done",
    teacher: "ThS. Nguyễn Văn A",
    room: "Phòng Lab 501",
    attended: 12,
    total: 15,
  },
  {
    id: 2,
    title: "Lập Trình Web",
    time: "08:45 AM",
    status: "done",
    teacher: "TS. Lê Thị B",
    room: "Phòng 302",
    attended: 10,
    total: 15,
  },
  {
    id: 3,
    title: "Hệ Quản Trị CSDL",
    time: "10:30 AM",
    status: "pending",
    teacher: "ThS. Trần Văn C",
    room: "Phòng 205",
    attended: 8,
    total: 15,
  },
  {
    id: 4,
    title: "Khoa Học Máy Tính",
    time: "01:00 PM",
    status: "missed",
    teacher: "TS. Hoàng Văn E",
    room: "Hội trường G3",
    attended: 5,
    total: 15,
  },
  {
    id: 5,
    title: "Mạng Máy Tính",
    time: "02:30 PM",
    status: "pending",
    teacher: "ThS. Đặng Nam F",
    room: "Phòng Lab 02",
    attended: 9,
    total: 15,
  },
];

export default function Home() {
  const router = useRouter();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [qrBounds, setQrBounds] = useState<any>(null);
  const isProcessing = React.useRef(false);

  // Thêm state để lưu thông tin sau khi quét
  const [scannedData, setScannedData] = useState<any>(null);

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

  const startScanning = async () => {
    if (!cameraPermission?.granted) {
      const cameraStatus = await requestCameraPermission();
      if (!cameraStatus.granted)
        return Alert.alert("Lỗi", "Cần quyền camera để quét QR");
    }
    const { status: locationStatus } =
      await Location.requestForegroundPermissionsAsync();
    if (locationStatus !== "granted") {
      return Alert.alert("Lỗi", "Cần quyền GPS để xác thực vị trí điểm danh");
    }
    setIsScanning(true);
  };

  // Hàm xử lý khi bắt được QR
  const handleBarCodeScanned = (result: any) => {
    if (isProcessing.current) return;
    const { data, bounds } = result;
    setQrBounds(bounds);

    // Giả lập việc lấy thông tin môn học từ nội dung QR (Thực tế bạn sẽ parse data này)
    // Ở đây tôi gán luôn vào class ID 3 để làm ví dụ
    const classInfo = TODAY_CLASSES.find((c) => c.id === 3);

    setScannedData({
      qrContent: data,
      ...classInfo,
    });
  };

  // Hàm thực hiện điểm danh khi bấm nút
  const confirmAttendance = async () => {
    if (!scannedData || isProcessing.current) return;

    isProcessing.current = true;
    try {
      const location = await Location.getCurrentPositionAsync({});
      const success = saveAttendance({
        studentId: MOCK_USER.email,
        classId: scannedData.id,
        qrContent: scannedData.qrContent,
        lat: location.coords.latitude,
        lon: location.coords.longitude,
        deviceId: "DEVICE_01",
        timestamp: new Date().toISOString(),
      });

      if (success) {
        Alert.alert("Thành công", "Đã điểm danh!", [
          {
            text: "OK",
            onPress: () => {
              setIsScanning(false);
              setScannedData(null);
              setQrBounds(null);
              isProcessing.current = false;
            },
          },
        ]);
      }
    } catch (error) {
      isProcessing.current = false;
      Alert.alert("Lỗi", "Không thể lấy vị trí hoặc lưu điểm danh");
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="light-content" backgroundColor="#0d47a1" />

      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{MOCK_USER.name.charAt(0)}</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.userName}>{MOCK_USER.name}</Text>
            <Text style={styles.headerSubtitle}>{formattedDate}</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <LogOut color="white" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity
          style={styles.qrButton}
          activeOpacity={0.8}
          onPress={startScanning}
        >
          <QrCode color="white" size={48} />
          <Text style={styles.qrText}>Quét QR Để Điểm Danh</Text>
        </TouchableOpacity>

        <View style={styles.progressCard}>
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Tiến độ học tập hôm nay</Text>
            <Text style={styles.progressValue}>2/{TODAY_CLASSES.length}</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${(2 / TODAY_CLASSES.length) * 100}%` },
              ]}
            />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Danh Sách Lớp Hôm Nay</Text>
        </View>

        {TODAY_CLASSES.map((item) => (
          <ClassItem
            key={item.id}
            item={item}
            onPress={() => setSelectedClass(item)}
          />
        ))}

        <View style={{ height: 40 }} />
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => router.push("/history")}
        >
          <Clock color="#0d47a1" size={24} />
          <Text style={styles.historyButtonText}>Xem Lịch Sử Điểm Danh</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal Chi tiết môn học danh sách */}
      <Modal visible={!!selectedClass} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.detailCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chi tiết môn học</Text>
              <TouchableOpacity onPress={() => setSelectedClass(null)}>
                <XCircle color="#666" size={24} />
              </TouchableOpacity>
            </View>
            <Text style={styles.detailSubjectName}>{selectedClass?.title}</Text>
            <View style={styles.detailInfoGrid}>
              <InfoRow
                icon={<User size={18} color="#0d47a1" />}
                label="Giảng viên"
                value={selectedClass?.teacher}
              />
              <InfoRow
                icon={<MapPin size={18} color="#0d47a1" />}
                label="Phòng học"
                value={selectedClass?.room}
              />
              <InfoRow
                icon={<Clock size={18} color="#0d47a1" />}
                label="Giờ học"
                value={selectedClass?.time}
              />
              <InfoRow
                icon={<BookOpen size={18} color="#0d47a1" />}
                label="Số buổi"
                value={`${selectedClass?.attended}/${selectedClass?.total} buổi`}
              />
            </View>
            <View
              style={[
                styles.statusBanner,
                selectedClass?.status === "done" ? styles.bgBlue : styles.bgRed,
              ]}
            >
              <Text style={styles.statusBannerText}>
                Trạng thái:{" "}
                {selectedClass?.status === "done"
                  ? "Đã điểm danh"
                  : selectedClass?.status === "missed"
                    ? "Vắng mặt"
                    : "Chưa học"}
              </Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Camera */}
      <Modal visible={isScanning} animationType="slide" transparent={false}>
        <CameraView
          style={StyleSheet.absoluteFillObject}
          onBarcodeScanned={scannedData ? undefined : handleBarCodeScanned} // Dừng quét khi đã có data
        >
          <TouchableOpacity
            style={styles.closeX}
            onPress={() => {
              setIsScanning(false);
              setQrBounds(null);
              setScannedData(null);
              isProcessing.current = false;
            }}
          >
            <Text style={{ color: "white", fontSize: 24 }}>✕</Text>
          </TouchableOpacity>

          <View style={styles.cameraOverlay}>
            <Text style={styles.topInstruction}>
              {scannedData ? "Xác nhận thông tin" : "Quét mã QR điểm danh"}
            </Text>

            <View style={styles.containerFrame}>
              <View
                style={[
                  qrBounds ? styles.smartFrameZ : styles.defaultFrameZ,
                  qrBounds && {
                    width: qrBounds.size.width + 40,
                    height: qrBounds.size.height + 40,
                    left: qrBounds.origin.x - (Platform.OS === "ios" ? 20 : 50),
                    top: qrBounds.origin.y - 20,
                    position: "absolute",
                  },
                ]}
              >
                <View
                  style={[
                    styles.zCorner,
                    styles.zTopLeft,
                    qrBounds && styles.zYellow,
                  ]}
                />
                <View
                  style={[
                    styles.zCorner,
                    styles.zTopRight,
                    qrBounds && styles.zYellow,
                  ]}
                />
                <View
                  style={[
                    styles.zCorner,
                    styles.zBottomLeft,
                    qrBounds && styles.zYellow,
                  ]}
                />
                <View
                  style={[
                    styles.zCorner,
                    styles.zBottomRight,
                    qrBounds && styles.zYellow,
                  ]}
                />
              </View>
            </View>

            {/* CARD THÔNG TIN HIỆN LÊN KHI QUÉT XONG */}
            {scannedData && (
              <View style={styles.attendanceCard}>
                <Text style={styles.scannedTitle}>{scannedData.title}</Text>
                <View style={styles.scannedInfoRow}>
                  <User size={14} color="#555" />
                  <Text style={styles.scannedText}>{scannedData.teacher}</Text>
                </View>
                <View style={styles.scannedInfoRow}>
                  <MapPin size={14} color="#555" />
                  <Text style={styles.scannedText}>{scannedData.room}</Text>
                </View>
                <View style={styles.scannedInfoRow}>
                  <Clock size={14} color="#555" />
                  <Text style={styles.scannedText}>{scannedData.time}</Text>
                </View>

                <TouchableOpacity
                  style={styles.confirmBtn}
                  onPress={confirmAttendance}
                >
                  <Text style={styles.confirmBtnText}>ĐIỂM DANH NGAY</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setScannedData(null);
                    setQrBounds(null);
                  }}
                >
                  <Text style={styles.reScanText}>Quét lại mã khác</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </CameraView>
      </Modal>
    </SafeAreaView>
  );
}

// Giữ nguyên các component phụ InfoRow, ClassItem...
function InfoRow({ icon, label, value }: any) {
  return (
    <View style={styles.infoRow}>
      {icon}
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

function ClassItem({ item, onPress }: { item: any; onPress: () => void }) {
  const isDone = item.status === "done";
  return (
    <TouchableOpacity
      style={styles.classCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View>
        <Text style={styles.classTitle}>{item.title}</Text>
        <Text style={styles.classTime}>
          {item.time} - {item.room}
        </Text>
      </View>
      <View style={[styles.statusBadge, isDone ? styles.bgBlue : styles.bgRed]}>
        {isDone ? (
          <CheckCircle2 color="white" size={14} />
        ) : (
          <XCircle color="white" size={14} />
        )}
        <Text style={styles.statusText}>
          {isDone ? "Đã có mặt" : "Chưa có mặt"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d47a1" },
  header: {
    backgroundColor: "#0d47a1",
    paddingHorizontal: 20,
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
  },
  avatarText: { color: "white", fontWeight: "bold", fontSize: 18 },
  headerInfo: { flex: 1, marginHorizontal: 15 },
  userName: { color: "white", fontSize: 18, fontWeight: "bold" },
  headerSubtitle: { fontSize: 12, color: "#bbdefb" },
  logoutBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    minHeight: "100%",
  },
  qrButton: {
    backgroundColor: "#0d47a1",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    marginBottom: 20,
    elevation: 5,
  },
  qrText: { color: "white", fontWeight: "bold", marginTop: 10 },
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
  progressValue: { fontSize: 18, fontWeight: "bold", color: "#2e7d32" },
  progressBarBg: { height: 6, backgroundColor: "#c8e6c9", borderRadius: 3 },
  progressBarFill: { height: 6, backgroundColor: "#4caf50", borderRadius: 3 },
  sectionHeader: { marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  classCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    elevation: 1,
  },
  classTitle: { fontSize: 15, fontWeight: "bold", color: "#333" },
  classTime: { fontSize: 12, color: "#777", marginTop: 2 },
  statusBadge: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: "center",
    gap: 4,
  },
  bgBlue: { backgroundColor: "#1a237e" },
  bgRed: { backgroundColor: "#d32f2f" },
  statusText: { color: "white", fontSize: 10, fontWeight: "600" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  detailCard: {
    backgroundColor: "white",
    borderRadius: 25,
    width: "100%",
    padding: 25,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  modalTitle: { fontSize: 14, color: "#888", fontWeight: "600" },
  detailSubjectName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0d47a1",
    marginBottom: 20,
  },
  detailInfoGrid: { gap: 15, marginBottom: 25 },
  infoRow: { flexDirection: "row", alignItems: "center" },
  infoLabel: { fontSize: 12, color: "#888" },
  infoValue: { fontSize: 15, fontWeight: "600", color: "#333" },
  statusBanner: { padding: 12, borderRadius: 12, alignItems: "center" },
  statusBannerText: { color: "white", fontWeight: "bold" },
  historyButton: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#0d47a1",
    gap: 10,
  },
  historyButtonText: { color: "#0d47a1", fontWeight: "bold" },

  closeX: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  topInstruction: {
    color: "white",
    fontSize: 16,
    position: "absolute",
    top: "15%",
    fontWeight: "bold",
  },
  containerFrame: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  defaultFrameZ: {
    width: 260,
    height: 260,
  },
  smartFrameZ: {},
  zCorner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: "rgba(255,255,255,0.6)",
    borderWidth: 4,
    borderRadius: 4,
  },
  zYellow: {
    borderColor: "#FFD700",
    borderWidth: 5,
  },
  zTopLeft: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  zTopRight: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  zBottomLeft: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  zBottomRight: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },

  // Style cho Attendance Card mới
  attendanceCard: {
    position: "absolute",
    bottom: 40,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  scannedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0d47a1",
    marginBottom: 10,
  },
  scannedInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    gap: 8,
  },
  scannedText: {
    fontSize: 14,
    color: "#555",
  },
  confirmBtn: {
    backgroundColor: "#0d47a1",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 15,
    alignItems: "center",
  },
  confirmBtnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  reScanText: {
    marginTop: 12,
    color: "#888",
    textDecorationLine: "underline",
  },
});
