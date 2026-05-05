import { useRouter } from "expo-router";
import {
  Calendar,
  CheckCircle2,
  ChevronLeft,
  Clock,
  MapPin,
  User,
  XCircle,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Attendance() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState("week");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const ATTENDANCE_DATA = [
    {
      id: 1,
      title: "Phát Triển Web",
      date: "23/04/2026",
      time: "11:05 - 12:40",
      teacher: "TS. Lê Thị B",
      room: "Phòng Lab 501",
      status: "done",
      isThisWeek: true,
    },
    {
      id: 2,
      title: "Cấu Trúc Dữ Liệu",
      date: "23/04/2026",
      time: "09:15 - 11:45",
      teacher: "ThS. Nguyễn Văn A",
      room: "Phòng 302 - Nhà A1",
      status: "done",
      isThisWeek: true,
    },
    {
      id: 3,
      title: "Hệ Quản Trị CSDL",
      date: "22/04/2026",
      time: "14:00 - 16:30",
      teacher: "ThS. Trần Văn C",
      room: "Phòng 201 - Nhà B2",
      status: "missed",
      isThisWeek: true,
    },
    {
      id: 4,
      title: "Lập trình Java",
      date: "15/04/2026",
      time: "07:00 - 09:30",
      teacher: "TS. Nguyễn Minh D",
      room: "Phòng Lab 01",
      status: "done",
      isThisWeek: false,
    },
    {
      id: 5,
      title: "An toàn thông tin",
      date: "10/04/2026",
      time: "13:00 - 15:30",
      teacher: "ThS. Hoàng Văn E",
      room: "Phòng 404",
      status: "done",
      isThisWeek: false,
    },
    {
      id: 6,
      title: "Toán rời rạc",
      date: "05/04/2026",
      time: "08:00 - 10:30",
      teacher: "ThS. Đỗ Văn G",
      room: "Phòng 102",
      status: "missed",
      isThisWeek: false,
    },
  ];

  const displayData =
    viewMode === "week"
      ? ATTENDANCE_DATA.filter((item) => item.isThisWeek)
      : ATTENDANCE_DATA;

  const openDetail = (item: any) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d47a1" />

      {/* HEADER ĐÃ ĐỒNG BỘ ĐỘ CAO VÀ BO GÓC */}
      <View style={styles.header}>
        <SafeAreaView edges={["top"]}>
          <View style={styles.topRow}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backBtn}
            >
              <ChevronLeft color="white" size={24} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Chuyên Cần</Text>
            <View style={{ width: 34 }} />
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => setViewMode("week")}
              style={[styles.tab, viewMode === "week" && styles.activeTab]}
            >
              <Text
                style={[
                  styles.tabText,
                  viewMode === "week" && styles.activeTabText,
                ]}
              >
                Tuần này
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setViewMode("month")}
              style={[styles.tab, viewMode === "month" && styles.activeTab]}
            >
              <Text
                style={[
                  styles.tabText,
                  viewMode === "month" && styles.activeTabText,
                ]}
              >
                Tháng này
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.mainStatsCard}>
          <View style={styles.statsHeader}>
            <Text style={styles.statsIcon}>🏅</Text>
            <Text style={styles.statsLabel}>
              Tỷ lệ {viewMode === "week" ? "tuần" : "tháng 04/2026"}
            </Text>
          </View>
          <Text style={styles.percentageText}>
            67%
            <Text style={styles.fractionText}>
              {viewMode === "week" ? " 2/3" : " 4/6"}
            </Text>
          </Text>
          <View style={styles.fullProgressBar}>
            <View style={[styles.progressFill, { width: "67%" }]} />
          </View>
        </View>

        <View style={styles.gridRow}>
          <View style={[styles.gridCard, { backgroundColor: "#e8f5e9" }]}>
            <CheckCircle2 color="#4caf50" size={24} />
            <Text style={[styles.gridLabel, { color: "#2e7d32" }]}>Có mặt</Text>
            <Text style={[styles.gridValue, { color: "#2e7d32" }]}>
              {viewMode === "week" ? "2" : "4"}
            </Text>
          </View>
          <View style={[styles.gridCard, { backgroundColor: "#ffebee" }]}>
            <XCircle color="#f44336" size={24} />
            <Text style={[styles.gridLabel, { color: "#d32f2f" }]}>
              Vắng mặt
            </Text>
            <Text style={[styles.gridValue, { color: "#d32f2f" }]}>
              {viewMode === "week" ? "1" : "2"}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          {viewMode === "week" ? "Chi tiết tuần này" : "Lịch sử tháng 04/2026"}
        </Text>

        {displayData.map((item) => (
          <HistoryItem
            key={item.id}
            title={item.title}
            date={`${item.date.split("/")[0]}/${item.date.split("/")[1]} ● ${item.time.split(" ")[0]}`}
            status={item.status}
            onPress={() => openDetail(item)}
          />
        ))}
        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Modal chi tiết buổi học */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chi tiết buổi học</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeText}>Đóng</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.subjectName}>{selectedItem?.title}</Text>
              <View style={styles.infoRow}>
                <User size={18} color="#0d47a1" />
                <Text style={styles.infoText}>
                  Giảng viên:{" "}
                  <Text style={styles.bold}>{selectedItem?.teacher}</Text>
                </Text>
              </View>
              <View style={styles.infoRow}>
                <MapPin size={18} color="#0d47a1" />
                <Text style={styles.infoText}>
                  Địa điểm:{" "}
                  <Text style={styles.bold}>{selectedItem?.room}</Text>
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Calendar size={18} color="#0d47a1" />
                <Text style={styles.infoText}>
                  Ngày học:{" "}
                  <Text style={styles.bold}>{selectedItem?.date}</Text>
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Clock size={18} color="#0d47a1" />
                <Text style={styles.infoText}>
                  Thời gian:{" "}
                  <Text style={styles.bold}>{selectedItem?.time}</Text>
                </Text>
              </View>
              <View
                style={[
                  styles.statusBox,
                  selectedItem?.status === "done"
                    ? styles.statusDone
                    : styles.statusMissed,
                ]}
              >
                <Text style={styles.statusBoxText}>
                  Trạng thái:{" "}
                  {selectedItem?.status === "done"
                    ? "Đã điểm danh ✅"
                    : "Vắng mặt ❌"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function HistoryItem({ title, date, status, onPress }: any) {
  const isDone = status === "done";
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.historyCard,
        isDone ? styles.borderBlue : styles.borderRed,
      ]}
    >
      <View
        style={[
          styles.iconCircle,
          isDone ? styles.bgBlueLight : styles.bgRedLight,
        ]}
      >
        {isDone ? (
          <CheckCircle2 color="#0d47a1" size={20} />
        ) : (
          <XCircle color="#d32f2f" size={20} />
        )}
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.historyTitle}>{title}</Text>
        <Text style={styles.historyDate}>{date}</Text>
      </View>
      <View
        style={[styles.historyBadge, isDone ? styles.bgBlue : styles.bgRed]}
      >
        <Text style={styles.badgeText}>{isDone ? "Có mặt" : "Vắng"}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  header: {
    backgroundColor: "#0d47a1",
    paddingHorizontal: 20,
    paddingBottom: 30, // Tăng lên để khớp với phần Home/Lịch học
    borderBottomLeftRadius: 25, // Thêm bo tròn
    borderBottomRightRadius: 25, // Thêm bo tròn
    elevation: 5,
    zIndex: 10,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 10,
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "white" },
  backBtn: { padding: 5 },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    padding: 4,
  },
  tab: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 10 },
  activeTab: { backgroundColor: "white" },
  tabText: { color: "#bbdefb", fontWeight: "600" },
  activeTabText: { color: "#0d47a1", fontWeight: "bold" },

  scrollContent: { paddingHorizontal: 20, paddingTop: 20 },

  mainStatsCard: {
    backgroundColor: "#0d47a1",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  statsHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  statsIcon: { fontSize: 20, marginRight: 8 },
  statsLabel: { color: "#bbdefb", fontWeight: "600" },
  percentageText: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 15,
  },
  fractionText: { fontSize: 18, fontWeight: "400", color: "#bbdefb" },
  fullProgressBar: {
    height: 6,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 3,
  },
  progressFill: { height: 6, backgroundColor: "white", borderRadius: 3 },

  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  gridCard: { width: "48%", padding: 15, borderRadius: 15, elevation: 2 },
  gridLabel: { fontSize: 12, fontWeight: "600", marginTop: 8 },
  gridValue: { fontSize: 24, fontWeight: "bold", marginTop: 4 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  historyCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
  },
  borderBlue: { borderLeftWidth: 4, borderLeftColor: "#0d47a1" },
  borderRed: { borderLeftWidth: 4, borderLeftColor: "#d32f2f" },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  bgBlueLight: { backgroundColor: "#e3f2fd" },
  bgRedLight: { backgroundColor: "#ffebee" },
  historyTitle: { fontSize: 15, fontWeight: "bold", color: "#333" },
  historyDate: { fontSize: 12, color: "#888", marginTop: 2 },
  historyBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15 },
  bgBlue: { backgroundColor: "#0d47a1" },
  bgRed: { backgroundColor: "#d32f2f" },
  badgeText: { color: "white", fontSize: 11, fontWeight: "bold" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    minHeight: 400,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: "#666" },
  closeText: { color: "#0d47a1", fontWeight: "bold", fontSize: 16 },
  subjectName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  detailContainer: { gap: 15 },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  infoText: { fontSize: 16, color: "#555" },
  bold: { fontWeight: "bold", color: "#333" },
  statusBox: {
    marginTop: 10,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  statusDone: { backgroundColor: "#e8f5e9" },
  statusMissed: { backgroundColor: "#ffebee" },
  statusBoxText: { fontWeight: "bold", fontSize: 16 },
});
