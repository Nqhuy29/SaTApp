import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Clock, Bookmark, CheckCircle2 } from "lucide-react-native";
import { STATUS_CONFIG } from "@/src/utils/statusConfig";

export function TimelineCard({ item }: { item: any }) {
  const config = STATUS_CONFIG[item.attendance_status] || STATUS_CONFIG.upcoming;
  const isPresent = item.attendance_status === "present";
  const isAbsent = item.attendance_status === "ongoing_absent" || item.attendance_status === "absent";
  
  const isNotStarted = config.badgeText === "Chưa bắt đầu";

  return (
    <View style={[styles.cardContainer, isNotStarted && { opacity: 0.6 }]}>
      <View style={styles.cardTimeBox}>
        <Text style={styles.cardStartTime}>{item.startTime}</Text>
        <View style={styles.cardTimeDivider} />
        <Text style={styles.cardEndTime}>{item.endTime}</Text>
      </View>

      <View style={styles.cardInfoBox}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>
        
        <View style={styles.cardBadgesRow}>
          <View style={styles.roomBadge}>
            <Bookmark size={12} color="#888" style={{ marginRight: 4 }} />
            <Text style={styles.roomText}>{item.room || "---"}</Text>
          </View>

          <View style={[styles.statusBadge, { backgroundColor: config.badgeBg }]}>
            {isPresent ? (
              <CheckCircle2 size={12} color={config.badgeColor} style={{ marginRight: 4 }} />
            ) : isAbsent ? (
              <CheckCircle2 size={12} color={config.badgeColor} style={{ marginRight: 4 }} />
            ) : (
              <Clock size={12} color={config.badgeColor} style={{ marginRight: 4 }} />
            )}
            <Text style={[styles.statusText, { color: config.badgeColor }]}>
              {config.badgeText}
            </Text>
          </View>
        </View>

        {item.originalSessionDate && (
          <Text style={{ fontSize: 12, color: '#E67E22', marginTop: 6, fontStyle: 'italic', fontWeight: '500' }}>
            * Dạy bù cho buổi ngày {item.originalSessionDate}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTimeBox: {
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  cardStartTime: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
  },
  cardTimeDivider: {
    width: 1.5,
    height: 16,
    backgroundColor: "#E5E7EB",
    marginVertical: 6,
  },
  cardEndTime: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "600",
  },
  cardInfoBox: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 10,
    lineHeight: 22,
  },
  cardBadgesRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
  },
  roomBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  roomText: {
    fontSize: 12,
    color: "#4B5563",
    fontWeight: "600",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },
});
