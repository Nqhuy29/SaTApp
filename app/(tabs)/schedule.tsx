import { useRouter } from "expo-router";
import { CheckCircle2, ChevronLeft } from "lucide-react-native";
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const { width } = Dimensions.get("window");

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState("T5");
  const router = useRouter();

  return (
    // Dùng View làm container gốc để quản lý màu nền Status Bar tốt hơn
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d47a1" />

      <View style={styles.header}>
        {/* SafeAreaView lo phần khoảng trống phía trên (Pin, Giờ) */}
        <SafeAreaView edges={["top"]}>
          <View style={styles.topRow}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backBtn}
            >
              <ChevronLeft color="white" size={24} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Lịch Học</Text>
            <View style={styles.weekPicker}>
              <Text style={styles.weekText}>Tuần 4</Text>
            </View>
          </View>

          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.dayTabsContainer}
            >
              {DAYS.map((day) => (
                <TouchableOpacity
                  key={day}
                  onPress={() => setSelectedDay(day)}
                  style={[
                    styles.dayTab,
                    selectedDay === day && styles.dayTabActive,
                    (day === "T7" || day === "CN") &&
                      selectedDay !== day && {
                        backgroundColor: "rgba(255,255,255,0.05)",
                      },
                  ]}
                >
                  <Text
                    style={[
                      styles.dayTabText,
                      selectedDay === day && styles.dayTabTextActive,
                      (day === "T7" || day === "CN") &&
                        selectedDay !== day && { color: "#ffab91" },
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.dayIndicator}>
          Lịch học{" "}
          {selectedDay === "CN" ? "Chủ Nhật" : `Thứ ${selectedDay.slice(1)}`}
        </Text>

        {selectedDay === "T7" || selectedDay === "CN" ? (
          <ScheduleCard
            title="Đồ án chuyên ngành (Học bù)"
            room="Phòng Lab 402"
            time="08:00 - 11:00"
            status="pending"
            color="#f57c00"
          />
        ) : (
          <>
            <ScheduleCard
              title="Lập trình Java"
              room="Phòng 205"
              time="07:00 - 08:30"
              status="done"
              color="#0d47a1"
            />
            <ScheduleCard
              title="Lập trình Web"
              room="Phòng 205"
              time="08:45 - 10:15"
              status="done"
              color="#0d47a1"
            />
            <ScheduleCard
              title="Hệ Quản Trị CSDL"
              room="Phòng 205"
              time="10:30 - 12:00"
              status="pending"
              color="#d32f2f"
            />
          </>
        )}
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

function ScheduleCard({ title, room, time, status, color }: any) {
  const isDone = status === "done";
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSub}>{room}</Text>
        <View style={styles.timeBadge}>
          <Text style={styles.timeText}>● {time}</Text>
        </View>
      </View>
      <View style={[styles.statusBadge, isDone ? styles.bgBlue : styles.bgRed]}>
        {isDone && (
          <CheckCircle2 color="white" size={14} style={{ marginRight: 4 }} />
        )}
        <Text style={styles.statusText}>
          {isDone ? "Có mặt" : "Vắng/Chưa học"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  header: {
    backgroundColor: "#0d47a1",
    paddingBottom: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 5,
    zIndex: 10,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 10, // Thêm chút khoảng cách với SafeArea
    paddingHorizontal: 20,
  },
  backBtn: { padding: 5 },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "white" },
  weekPicker: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  weekText: { color: "white", fontWeight: "600" },

  dayTabsContainer: {
    paddingHorizontal: 15,
    gap: 10,
  },
  dayTab: {
    width: 50,
    height: 50,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  dayTabActive: {
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  dayTabText: { color: "#bbdefb", fontWeight: "bold", fontSize: 15 },
  dayTabTextActive: { color: "#0d47a1", fontSize: 16 },

  scrollContent: {
    padding: 20,
    paddingTop: 20,
  },
  dayIndicator: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
    fontWeight: "500",
    fontStyle: "italic",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    borderLeftWidth: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 17, fontWeight: "bold", color: "#333" },
  cardSub: { fontSize: 13, color: "#666", marginVertical: 4 },
  timeBadge: {
    backgroundColor: "#e3f2fd",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  timeText: { fontSize: 11, color: "#0d47a1", fontWeight: "bold" },
  statusBadge: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: "center",
    marginLeft: 10,
  },
  bgBlue: { backgroundColor: "#2e7d32" },
  bgRed: { backgroundColor: "#ef5350" },
  statusText: { color: "white", fontSize: 11, fontWeight: "600" },
});
