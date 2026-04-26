import { useRouter } from "expo-router";
import { CheckCircle2, ChevronLeft, XCircle } from "lucide-react-native";
import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function Attendance() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeft color="white" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chuyên Cần</Text>

        {/* Toggle Tuần/Tháng */}
        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={styles.activeTabText}>Tuần này</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Tháng này</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Card Tỷ lệ */}
        <View style={styles.mainStatsCard}>
          <View style={styles.statsHeader}>
            <Text style={styles.statsIcon}>🏅</Text>
            <Text style={styles.statsLabel}>Tỷ lệ điểm danh</Text>
          </View>
          <Text style={styles.percentageText}>
            87% <Text style={styles.fractionText}>13/15</Text>
          </Text>
          <View style={styles.fullProgressBar}>
            <View style={[styles.progressFill, { width: "87%" }]} />
          </View>
        </View>

        {/* Grid Có mặt / Vắng */}
        <View style={styles.gridRow}>
          <View style={[styles.gridCard, { backgroundColor: "#e8f5e9" }]}>
            <CheckCircle2 color="#4caf50" size={24} />
            <Text style={[styles.gridLabel, { color: "#2e7d32" }]}>
              Đã điểm danh
            </Text>
            <Text style={[styles.gridValue, { color: "#2e7d32" }]}>13</Text>
          </View>
          <View style={[styles.gridCard, { backgroundColor: "#ffebee" }]}>
            <XCircle color="#f44336" size={24} />
            <Text style={[styles.gridLabel, { color: "#d32f2f" }]}>
              Vắng mặt
            </Text>
            <Text style={[styles.gridValue, { color: "#d32f2f" }]}>2</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Lịch sử gần đây</Text>
        <HistoryItem
          title="Cấu Trúc Dữ Liệu"
          date="23/04/2026 ● 09:15"
          status="done"
        />
        <HistoryItem
          title="Phát Triển Web"
          date="23/04/2026 ● 11:05"
          status="done"
        />
        <HistoryItem
          title="Hệ Quản Trị CSDL"
          date="22/04/2026 ● 14:00"
          status="missed"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function HistoryItem({ title, date, status }: any) {
  const isDone = status === "done";
  return (
    <View
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  header: { backgroundColor: "#0d47a1", padding: 20, paddingTop: 40 },
  backBtn: { marginBottom: 10 },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    padding: 4,
  },
  tab: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 10 },
  activeTab: { backgroundColor: "white" },
  tabText: { color: "white", fontWeight: "600" },
  activeTabText: { color: "#0d47a1", fontWeight: "bold" },
  scrollContent: { padding: 20, paddingTop: 30 },
  mainStatsCard: {
    backgroundColor: "#0d47a1",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
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
  gridCard: { width: "48%", padding: 15, borderRadius: 15 },
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
    borderWidth: 1,
    borderColor: "#eee",
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
});
