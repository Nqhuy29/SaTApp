import { useRouter } from "expo-router";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  RotateCcw,
} from "lucide-react-native";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { useWeekSchedule } from "@/hooks/useWeekSchedule";
import { formatDateHeader, getDayLabel } from "@/src/utils/scheduleDate";
import { TimelineCard } from "@/components/schedule/TimelineCard";

export default function Schedule() {
  const router = useRouter();
  
  const {
    weekNumber,
    setWeekNumber,
    selectedDate,
    setSelectedDate,
    weekDates,
    currentClasses,
    todayStr,
    isLoading,
    refreshing,
    onRefresh,
    defaultWeek,
    isDefaultWeek,
    weekLabel,
    scheduleByDate,
  } = useWeekSchedule();

  return (
    <LinearGradient colors={["#0d47a1", "#1976d2"]} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <StatusBar barStyle="light-content" backgroundColor="#0d47a1" />

      {/* ═══════ TOP BAR (CỐ ĐỊNH, KHÔNG BỊ TRÔI THEO) ═══════ */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <ChevronLeft color="white" size={28} />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Lịch học</Text>
        </View>

        <View style={styles.headerWeekNav}>
          <TouchableOpacity onPress={() => setWeekNumber((w) => Math.max(1, (w || defaultWeek) - 1))} style={styles.headerArrowBtn}>
            <ChevronLeft color="white" size={18} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setWeekNumber(defaultWeek)} activeOpacity={0.8} style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.headerWeekText}>
              {weekLabel}
            </Text>
            {!isDefaultWeek && (
              <RotateCcw color="#fff" size={11} style={{ marginLeft: 2, marginRight: 2 }} />
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setWeekNumber((w) => (w || defaultWeek) + 1)} style={styles.headerArrowBtn}>
            <ChevronRight color="white" size={18} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ═══════ SCROLL VIEW (VÙNG CÓ THỂ CUỘN LƯỚT) ═══════ */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewBg}
        contentContainerStyle={styles.scrollContentContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#0d47a1"]} />}
      >
        
        {/* THANH NGÀY THÁNG ĐƯỢC ĐẨY VÀO SCROLL, CUỘN XUỐNG SẼ ĐI THEO VÀ ẨN LÊN TRÊN */}
        <View style={styles.dateStripWrapper}>
          <View style={styles.dateStrip}>
            {weekDates.map((dateStr) => {
              const d = new Date(dateStr + "T00:00:00");
              const dayNum = d.getDate();
              const label = getDayLabel(dateStr);
              const isSelected = dateStr === selectedDate;
              const isToday = dateStr === todayStr;
              const isWeekend = label === "T7" || label === "CN";
              const hasClasses = (scheduleByDate[dateStr] || []).length > 0;

              return (
                <TouchableOpacity
                  key={dateStr}
                  activeOpacity={0.7}
                  onPress={() => setSelectedDate(dateStr)}
                  style={[styles.dayCell, isSelected && styles.dayCellSelected]}
                >
                  <Text style={[
                    styles.dayLabel,
                    isSelected && styles.dayLabelSelected,
                    isWeekend && !isSelected && { color: "#ffab91" },
                  ]}>
                    {label}
                  </Text>
                  <Text style={[
                    styles.dayNumber,
                    isSelected && styles.dayNumberSelected,
                    isWeekend && !isSelected && { color: "#ffab91" },
                    isToday && !isSelected && styles.dayNumberToday,
                  ]}>
                    {dayNum}
                  </Text>
                  {isToday && !isSelected && <View style={styles.todayDot} />}
                  {!isSelected && hasClasses && !isToday && <View style={styles.classDot} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* PHẦN DANH SÁCH LỚP HỌC BO GÓC TRÊN */}
        <View style={styles.scrollContent}>
          <Text style={styles.sectionDateTitle}>
            {formatDateHeader(selectedDate)}
          </Text>

          {isLoading ? (
            <View style={styles.loadingBox}>
              <ActivityIndicator size="large" color="#0d47a1" />
              <Text style={styles.loadingText}>Đang tải lịch...</Text>
            </View>
          ) : currentClasses.length === 0 ? (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconCircle}>
                <Clock color="#bbb" size={36} />
              </View>
              <Text style={styles.emptyTitle}>Không có lớp</Text>
              <Text style={styles.emptySubtitle}>Bạn không có lớp nào trong ngày này</Text>
            </View>
          ) : (
            <View style={styles.timelineContainer}>
              {currentClasses.map((item: any) => (
                <TimelineCard key={item.id} item={item} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 }, 

  // ═══ TOP BAR (Cố định, không lướt) ═══
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20, 
    paddingTop: 10,
    paddingBottom: 15, // Tạo một chút khoảng thoáng
    backgroundColor: "transparent",
    zIndex: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitleContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: -1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  headerWeekNav: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  headerArrowBtn: {
    padding: 2,
  },
  headerWeekText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    paddingHorizontal: 4,
  },

  // ═══ SCROLL AREA ═══
  scrollViewBg: {
    backgroundColor: "transparent", // Đảm bảo kéo pull-to-refresh không bị lộ viền
  },
  scrollContentContainer: {
    flexGrow: 1, 
  },

  // ═══ DATE STRIP (Phần này sẽ lướt trôi theo) ═══
  dateStripWrapper: {
    backgroundColor: "transparent",
    paddingBottom: 25, 
    paddingTop: 5,
  },
  dateStrip: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 12,
  },
  dayCell: {
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 64,
    borderRadius: 22,
  },
  dayCellSelected: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "rgba(255,255,255,0.6)",
    marginBottom: 3,
  },
  dayLabelSelected: {
    color: "#0d47a1",
  },
  dayNumber: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  dayNumberSelected: {
    color: "#0d47a1",
  },
  dayNumberToday: {
    color: "#fff",
  },
  todayDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#FFD700",
    marginTop: 3,
  },
  classDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginTop: 3,
  },

  // ═══ THÂN TRANG (Cuộn cùng Date Strip) ═══
  scrollContent: {
    flexGrow: 1, // Để khối này chiếm toàn bộ khoảng trống còn lại
    padding: 20,
    paddingTop: 25,
    paddingBottom: 80, // Cách đáy nhiều hơn để lúc cuộn không bị kích
    backgroundColor: "#F8F9FA",
    borderTopLeftRadius: 25,    
    borderTopRightRadius: 25,   
  },
  
  sectionDateTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#6b7280",
    letterSpacing: 0.5,
    marginBottom: 16,
    textTransform: "uppercase",
  },
  loadingBox: {
    padding: 50,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 15,
    color: "#888",
    fontWeight: "500",
  },
  emptyContainer: {
    padding: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#999",
  },
  timelineContainer: {
    paddingBottom: 20,
  },
});