import { CheckCircle2, QrCode } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const today = new Date();
const formattedDate = today.toLocaleDateString("vi-VN", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header cố định */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Điểm Danh</Text>
        <Text style={styles.headerSubtitle}>{formattedDate}</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Nút Quét QR lớn */}
        <TouchableOpacity style={styles.qrButton} activeOpacity={0.8}>
          <QrCode color="white" size={48} />
          <Text style={styles.qrText}>Quét QR Để Điểm Danh</Text>
        </TouchableOpacity>

        {/* Thanh tiến độ hôm nay */}
        <View style={styles.progressCard}>
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Điểm Danh Hôm Nay</Text>
            <Text style={styles.progressValue}>2/3</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: "66%" }]} />
          </View>
        </View>

        {/* Danh sách lớp học */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Lớp Học Hôm Nay</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>Xem Tất Cả</Text>
          </TouchableOpacity>
        </View>

        <ClassItem title="Lập Trình Java" time="07:00 AM" status="done" />
        <ClassItem title="Lập Trình Web" time="08:45 AM" status="done" />
        <ClassItem title="Hệ Cơ Sở Dữ Liệu " time="10:30 PM" status="pending" />
      </ScrollView>
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
  status: "done" | "pending";
}) {
  const isDone = status === "done";
  return (
    <View style={styles.classCard}>
      <View>
        <Text style={styles.classTitle}>{title}</Text>
        <Text style={styles.classTime}>{time}</Text>
      </View>
      <View style={[styles.statusBadge, isDone ? styles.bgBlue : styles.bgRed]}>
        {isDone && (
          <CheckCircle2 color="white" size={14} style={{ marginRight: 4 }} />
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
  header: {
    backgroundColor: "#0d47a1",
    padding: 20,
    paddingTop: 40,
    zIndex: 10,
  },
  headerTitle: { fontSize: 28, fontWeight: "bold", color: "white" },
  headerSubtitle: { fontSize: 14, color: "#bbdefb", marginTop: 4 },
  scrollContent: { padding: 20, paddingTop: 30 }, // Tạo khoảng trống với phần QR
  qrButton: {
    backgroundColor: "#0d47a1",
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
    marginBottom: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
  },
  qrText: { color: "white", fontWeight: "bold", marginTop: 15, fontSize: 18 },
  progressCard: {
    backgroundColor: "#e8f5e9",
    padding: 20,
    borderRadius: 15,
    marginBottom: 25,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  progressLabel: { color: "#2e7d32", fontWeight: "600" },
  progressValue: { fontSize: 24, fontWeight: "bold", color: "#2e7d32" },
  progressBarBg: { height: 8, backgroundColor: "#c8e6c9", borderRadius: 4 },
  progressBarFill: { height: 8, backgroundColor: "#4caf50", borderRadius: 4 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  viewAll: { color: "#1976d2" },
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
  classTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
  classTime: { fontSize: 13, color: "#777", marginTop: 4 },
  statusBadge: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
  },
  bgBlue: { backgroundColor: "#1a237e" },
  bgRed: { backgroundColor: "#d32f2f" },
  statusText: { color: "white", fontSize: 12, fontWeight: "600" },
});
