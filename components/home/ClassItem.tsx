import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { STATUS_CONFIG } from "@/src/utils/statusConfig";

interface ClassItemProps {
  item: any;
  onPress: () => void;
}

export function ClassItem({ item, onPress }: ClassItemProps) {
  const config = STATUS_CONFIG[item.attendance_status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.upcoming;

  const [timeVal, ampm] = (item.time || "00:00 AM").split(' ');
  const [hour, min] = (timeVal || "00:00").split(':');
  const vnAmPm = ampm === 'AM' ? 'SA' : (ampm === 'PM' ? 'CH' : (ampm || ''));

  const timeBg = config.timeBg || "#0d47a1";
  const timeColor = config.timeColor || "#FFF";

  return (
    <TouchableOpacity style={styles.classCard} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.classCardLeft}>
        <View style={[styles.timeBoxTop, { backgroundColor: timeBg }]}>
          <Text style={[styles.timeBoxHour, { color: timeColor }]}>{hour}</Text>
          <Text style={[styles.timeBoxMin, { color: timeColor }]}>{min} {vnAmPm}</Text>
        </View>
        <View style={styles.timeBoxBottom}>
          <Text style={styles.timeBoxRoom}>{item.room || "---"}</Text>
        </View>
      </View>

      <View style={styles.classCardMiddle}>
        <Text style={styles.classTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.classTime}>
          {item.time} · GV: {item.teacher || "---"}
        </Text>
      </View>

      <View style={[styles.statusBadge, { backgroundColor: config.badgeBg }]}>
        <Text style={[styles.statusText, { color: config.badgeColor }]}>
          {config.badgeText}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  classCard: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  classCardLeft: {
    width: 55,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    marginRight: 12,
  },
  timeBoxTop: {
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  timeBoxHour: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 20,
  },
  timeBoxMin: {
    fontSize: 10,
    fontWeight: "600",
  },
  timeBoxBottom: {
    backgroundColor: "white",
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  timeBoxRoom: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#666",
  },
  classCardMiddle: {
    flex: 1,
    justifyContent: "center",
  },
  classTitle: { fontSize: 15, fontWeight: "bold", color: "#333", marginBottom: 4 },
  classTime: { fontSize: 12, color: "#777" },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  statusText: { fontSize: 11, fontWeight: "bold" },
});
