import { useRouter } from "expo-router";
import { CheckCircle2, ChevronLeft } from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const DAYS = ["T2", "T3", "T4", "T5", "T6"];

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState("T5");
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
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

        {/* Bộ lọc Thứ */}
        <View style={styles.dayTabs}>
          {DAYS.map((day) => (
            <TouchableOpacity
              key={day}
              onPress={() => setSelectedDay(day)}
              style={[
                styles.dayTab,
                selectedDay === day && styles.dayTabActive,
              ]}
            >
              <Text
                style={[
                  styles.dayTabText,
                  selectedDay === day && styles.dayTabTextActive,
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ScheduleCard
          title="Lập trình java"
          room="Phòng 205"
          time="07:00 - 08:30"
          status="done"
          color="#0d47a1"
        />
        <ScheduleCard
          title="Lập trình web"
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
      </ScrollView>
    </SafeAreaView>
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
          {isDone ? "Có mặt" : "Chưa điểm danh"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  header: {
    backgroundColor: "#0d47a1",
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 40,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  backBtn: { padding: 5 },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "white" },
  weekPicker: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  weekText: { color: "white", fontWeight: "600" },
  dayTabs: { flexDirection: "row", justifyContent: "space-between" },
  dayTab: {
    width: 55,
    height: 45,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  dayTabActive: { backgroundColor: "white" },
  dayTabText: { color: "#bbdefb", fontWeight: "bold" },
  dayTabTextActive: { color: "#0d47a1" },
  scrollContent: { padding: 20, paddingTop: 30 },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    borderLeftWidth: 5,
    elevation: 2,
  },

  // Đây là phần bị thiếu của bạn:
  cardInfo: {
    flex: 1,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  cardSub: { fontSize: 14, color: "#666", marginVertical: 4 },

  timeBadge: {
    backgroundColor: "#e3f2fd",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  timeText: { fontSize: 12, color: "#0d47a1", fontWeight: "bold" },
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
