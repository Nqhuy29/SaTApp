import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation } from "react-native";
import { ChevronDown, BookOpen, AlertTriangle } from "lucide-react-native";

export function SubjectCard({ item, colorPair, getRateColor }: any) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const renderSegmentedBar = (item: any) => {
    const remaining = item.remainingSessions;

    return (
      <View style={styles.barWrap}>
        {item.presentCount > 0 && <View style={[styles.barSeg, { flex: item.presentCount, backgroundColor: "#639922" }]} />}
        {item.lateCount > 0 && <View style={[styles.barSeg, { flex: item.lateCount, backgroundColor: "#EF9F27" }]} />}
        {item.leaveEarlyCount > 0 && <View style={[styles.barSeg, { flex: item.leaveEarlyCount, backgroundColor: "#3C3489" }]} />}
        {item.excusedCount > 0 && <View style={[styles.barSeg, { flex: item.excusedCount, backgroundColor: "#00ACC1" }]} />}
        {item.absentCount > 0 && <View style={[styles.barSeg, { flex: item.absentCount, backgroundColor: "#E24B4A" }]} />}
        {remaining > 0 && <View style={[styles.barSeg, { flex: remaining, backgroundColor: "#E8E8E8" }]} />}
      </View>
    );
  };

  const passed = item.passedSessions;
  const remaining = item.remainingSessions;
  const rate = item.attendanceRatePct;
  const maxAbsent = item.maxAbsentAllowed;
  const isDanger = item.danger;
  const rateColor = getRateColor(rate);

  return (
    <TouchableOpacity
      style={styles.subjectCard}
      activeOpacity={0.8}
      onPress={toggleExpand}
    >
      <View style={[styles.cardHeader, { marginBottom: expanded ? 12 : 0 }]}>
        <View style={[styles.subjectIconBox, { backgroundColor: colorPair.bg }]}>
          <BookOpen size={18} color={colorPair.icon} />
        </View>
        <View style={styles.cardHeaderText}>
          <Text style={styles.cardTitle}>{item.subjectName}</Text>
          <Text style={styles.cardSub}>
            Đã học {passed}/{item.totalSessions} buổi · còn {remaining} buổi
          </Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <View style={[styles.ratePill, { backgroundColor: rateColor.bg, marginTop: 0 }]}>
            <Text style={[styles.ratePillText, { color: rateColor.text }]}>{rate}%</Text>
          </View>
          <View style={{ marginTop: 6, marginRight: 2 }}>
            <ChevronDown
              color="#B0B0B0"
              size={18}
              style={{ transform: [{ rotate: expanded ? "180deg" : "0deg" }] }}
            />
          </View>
        </View>
      </View>

      {expanded && (
        <View>
          {renderSegmentedBar(item)}
          <View style={styles.cardFooter}>
            <View style={styles.dotRow}>
              <View style={styles.dotItem}>
                <View style={[styles.dot, { backgroundColor: "#639922" }]} />
                <Text style={styles.dotText}>{item.presentCount} mặt</Text>
              </View>
              {item.excusedCount > 0 && (
                <View style={styles.dotItem}>
                  <View style={[styles.dot, { backgroundColor: "#00ACC1" }]} />
                  <Text style={styles.dotText}>{item.excusedCount} phép</Text>
                </View>
              )}
              {item.absentCount > 0 && (
                <View style={styles.dotItem}>
                  <View style={[styles.dot, { backgroundColor: "#E24B4A" }]} />
                  <Text style={styles.dotText}>{item.absentCount} vắng</Text>
                </View>
              )}
              {item.lateCount > 0 && (
                <View style={styles.dotItem}>
                  <View style={[styles.dot, { backgroundColor: "#EF9F27" }]} />
                  <Text style={styles.dotText}>{item.lateCount} muộn</Text>
                </View>
              )}
              {item.leaveEarlyCount > 0 && (
                <View style={styles.dotItem}>
                  <View style={[styles.dot, { backgroundColor: "#3C3489" }]} />
                  <Text style={styles.dotText}>{item.leaveEarlyCount} về sớm</Text>
                </View>
              )}
              {remaining > 0 && (
                <View style={styles.dotItem}>
                  <View style={[styles.dot, { backgroundColor: "#E8E8E8" }]} />
                  <Text style={styles.dotText}>{remaining} còn lại</Text>
                </View>
              )}
            </View>
          </View>
          {isDanger && (
            <View style={styles.warnBanner}>
              <AlertTriangle size={13} color="#A32D2D" />
              <Text style={styles.warnText}>
                Vượt ngưỡng vắng cho phép (tối đa {maxAbsent} buổi)
              </Text>
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  subjectCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 12,
  },
  subjectIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardHeaderText: { flex: 1, justifyContent: "center" },
  cardTitle: { fontSize: 15, fontWeight: "bold", color: "#1f2937", lineHeight: 22, marginBottom: 4 },
  cardSub: { fontSize: 12, color: "#6b7280" },
  ratePill: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginTop: 0,
  },
  ratePillText: { fontSize: 12, fontWeight: "bold" },
  barWrap: {
    flexDirection: "row",
    gap: 2,
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 12,
  },
  barSeg: { height: "100%", borderRadius: 2 },
  cardFooter: { flexDirection: "row", alignItems: "center" },
  dotRow: { flexDirection: "row", gap: 10, flexWrap: "wrap" },
  dotItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  dotText: { fontSize: 12, color: "#4B5563", fontWeight: "500" },
  warnBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FCEBEB",
    borderRadius: 10,
    padding: 10,
    marginTop: 12,
  },
  warnText: { fontSize: 12, color: "#791F1F", fontWeight: "600", flex: 1 },
});
