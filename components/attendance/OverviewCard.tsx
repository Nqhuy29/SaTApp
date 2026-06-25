import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Check, X, Clock, Timer } from "lucide-react-native";

function MiniStatCard({ title, value, icon: Icon, color, bg }: any) {
  return (
    <View style={[styles.miniStatCard, { backgroundColor: bg }]}>
      <View style={styles.miniStatTop}>
        <View style={[styles.miniStatIconWrap, { backgroundColor: 'rgba(255,255,255,0.6)' }]}>
          <Icon size={14} color={color} />
        </View>
        <Text style={[styles.miniStatValue, { color }]}>{value}</Text>
      </View>
      <Text style={[styles.miniStatTitle, { color }]}>{title}</Text>
    </View>
  );
}

export function OverviewCard({ overview, isCurrentActiveSemester, getRateColor }: any) {
  if (!overview) return null;

  const overallRate = overview.attendanceRatePct || 0;
  const rateColor = getRateColor(overallRate);

  return (
    <View style={styles.overviewCard}>
      <View style={styles.overviewTop}>
        <Text style={styles.sectionMiniLabel}>Tổng quan</Text>
        <View style={[styles.activePill, !isCurrentActiveSemester && { backgroundColor: '#F0F0F0' }]}>
          <Text style={[styles.activePillText, !isCurrentActiveSemester && { color: '#666' }]}>
            {isCurrentActiveSemester ? "Đang diễn ra" : "Đã kết thúc"}
          </Text>
        </View>
      </View>

      {/* Thanh tiến độ chính (Hero Bar) */}
      <View style={styles.heroSection}>
        <View style={styles.heroTextRow}>
          <View>
            <Text style={styles.heroLabel}>Tỷ lệ đi học</Text>
            <Text style={styles.heroSub}>{overview.totalPassed} buổi đã diễn ra</Text>
          </View>
          <Text style={[styles.heroRateText, { color: rateColor.bar }]}>{overallRate}%</Text>
        </View>
        <View style={styles.heroTrack}>
          <View style={[styles.heroFill, { width: `${overallRate}%`, backgroundColor: rateColor.bar }]} />
        </View>
      </View>

      {/* Lưới thống kê Bento (2 hàng) */}
      <View style={styles.bentoGrid}>
        {/* Hàng 1: Có mặt & Vắng (2 ô bự) */}
        <View style={styles.bentoRow}>
          <MiniStatCard title="Có mặt" value={overview.totalPresent} icon={Check} color="#3B6D11" bg="#EAF3DE" />
          <MiniStatCard title="Vắng" value={overview.totalAbsent} icon={X} color="#A32D2D" bg="#FCEBEB" />
        </View>
        
        {/* Hàng 2: Có phép, Muộn, Về sớm (3 ô nhỏ) */}
        <View style={styles.bentoRow}>
          <MiniStatCard title="Phép" value={overview.totalExcused || 0} icon={Check} color="#00838F" bg="#E0F7FA" />
          <MiniStatCard title="Muộn" value={overview.totalLate} icon={Clock} color="#854F0B" bg="#FAEEDA" />
          <MiniStatCard title="Sớm" value={overview.totalLeaveEarly} icon={Timer} color="#3C3489" bg="#EEEDFE" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overviewCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
  },
  overviewTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionMiniLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  activePill: {
    backgroundColor: "#E6F1FB",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  activePillText: { fontSize: 11, fontWeight: "bold", color: "#0C447C" },

  // Hero Rate Section
  heroSection: {
    marginBottom: 20,
  },
  heroTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  heroLabel: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  heroSub: {
    fontSize: 12,
    color: "#888",
  },
  heroRateText: {
    fontSize: 32,
    fontWeight: "900",
    lineHeight: 34,
  },
  heroTrack: {
    height: 8,
    backgroundColor: "#F0F0F0",
    borderRadius: 4,
    overflow: "hidden",
  },
  heroFill: {
    height: "100%",
    borderRadius: 4,
  },

  // Bento Grid
  bentoGrid: {
    gap: 10,
  },
  bentoRow: {
    flexDirection: "row",
    gap: 10,
  },
  miniStatCard: {
    flex: 1,
    borderRadius: 14,
    padding: 12,
  },
  miniStatTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  miniStatIconWrap: {
    width: 26,
    height: 26,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  miniStatValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  miniStatTitle: {
    fontSize: 12,
    fontWeight: "600",
  },
});
