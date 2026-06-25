import { useRouter } from "expo-router";
import { ChevronDown, ChevronLeft, BookOpen } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  RefreshControl,
  Platform,
  UIManager,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { useAttendance } from "@/hooks/useAttendance";
import { OverviewCard } from "@/components/attendance/OverviewCard";
import { SubjectCard } from "@/components/attendance/SubjectCard";
import { SemesterPickerModal } from "@/components/attendance/SemesterPickerModal";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Attendance() {
  const router = useRouter();

  const {
    loading,
    overview,
    subjects,
    refreshing,
    onRefresh,
    semesters,
    selectedSemesterId,
    showSemesterPicker,
    setShowSemesterPicker,
    handleSelectSemester,
    getRateColor,
  } = useAttendance();

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#0d47a1" />
      </View>
    );
  }

  const isCurrentActiveSemester = selectedSemesterId === null || semesters.find(s => s.id === selectedSemesterId)?.isActive;

  return (
    <LinearGradient colors={["#0d47a1", "#1976d2"]} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <StatusBar barStyle="light-content" backgroundColor="#0d47a1" />

      {/* ═══════ HỌA TIẾT TRANG TRÍ ═══════ */}
      <View style={styles.decoCircle1} />
      <View style={styles.decoCircle2} />
      <View style={styles.decoCircle3} />

      {/* ═══════ TOP BAR ═══════ */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
          <ChevronLeft color="white" size={26} />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Chuyên cần</Text>
        </View>

        <TouchableOpacity 
          activeOpacity={0.8} 
          style={styles.headerSemesterPill}
          onPress={() => setShowSemesterPicker(true)}
        >
          <Text style={styles.headerSemesterText} numberOfLines={1} ellipsizeMode="tail">
            {overview?.semesterName || "Chọn HK"}
          </Text>
          <ChevronDown color="white" size={14} style={{ marginLeft: 4 }} />
        </TouchableOpacity>
      </View>

      {/* ═══════ SCROLL VIEW ═══════ */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewBg}
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#0d47a1"]} />}
      >
        {/* TỔNG QUAN (UI BENTO MỚI) */}
        <OverviewCard 
          overview={overview} 
          isCurrentActiveSemester={isCurrentActiveSemester} 
          getRateColor={getRateColor} 
        />

        {/* CHI TIẾT TỪNG MÔN */}
        <Text style={styles.sectionLabel}>Chi tiết các môn</Text>

        {subjects.length === 0 ? (
          <View style={styles.emptyContainer}>
            <BookOpen size={40} color="#CCC" style={{ marginBottom: 10 }} />
            <Text style={styles.emptyText}>Không có dữ liệu môn học cho học kỳ này.</Text>
          </View>
        ) : (
          subjects.map((item, index) => {
            const colors = [
              { bg: "#EAF3DE", icon: "#3B6D11" },
              { bg: "#E6F1FB", icon: "#185FA5" },
              { bg: "#FAEEDA", icon: "#854F0B" }
            ];
            const colorPair = colors[index % colors.length];

            return (
              <SubjectCard
                key={item.subjectId}
                item={item}
                colorPair={colorPair}
                getRateColor={getRateColor}
              />
            );
          })
        )}
      </ScrollView>

      {/* BOTTOM SHEET CHỌN HỌC KỲ */}
      <SemesterPickerModal
        visible={showSemesterPicker}
        onClose={() => setShowSemesterPicker(false)}
        semesters={semesters}
        selectedSemesterId={selectedSemesterId}
        onSelectSemester={handleSelectSemester}
      />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  decoCircle1: { position: 'absolute', top: -40, right: -20, width: 140, height: 140, borderRadius: 70, backgroundColor: 'rgba(255, 255, 255, 0.05)', zIndex: 0 },
  decoCircle2: { position: 'absolute', bottom: "50%", right: 80, width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255, 255, 255, 0.04)', zIndex: 0 },
  decoCircle3: { position: 'absolute', top: 20, left: -30, width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(255, 255, 255, 0.03)', zIndex: 0 },

  // ═══ TOP BAR ═══
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20, 
    paddingTop: 10,
    paddingBottom: 25, 
    backgroundColor: "transparent", 
    zIndex: 10,
  },
  iconBtn: {
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
  headerSemesterPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    maxWidth: 125,
  },
  headerSemesterText: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
    flexShrink: 1, 
  },

  // ═══ THÂN TRANG ═══
  scrollViewBg: {
    backgroundColor: "transparent",
    zIndex: 1,
  },
  scrollContent: {
    flexGrow: 1, 
    padding: 20,
    paddingTop: 25,
    paddingBottom: 80, 
    backgroundColor: "#F8F9FA",
    borderTopLeftRadius: 25,    
    borderTopRightRadius: 25,   
  },

  sectionLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
    marginLeft: 4,
  },

  // Empty State
  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  emptyText: {
    color: "#888",
    fontSize: 14,
  },
});
