import { clearHistory, getAllAttendances } from "@/db";
import { useRouter } from "expo-router"; // Để điều hướng quay lại
import {
    ArrowLeft,
    Clock,
    MapPin,
    RefreshCcw,
    Trash2,
} from "lucide-react-native"; // Thêm ArrowLeft
import React, { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HistoryScreen() {
  const [history, setHistory] = useState<any[]>([]);
  const router = useRouter();

  const loadHistory = () => {
    const data = getAllAttendances();
    setHistory(data);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleClear = () => {
    Alert.alert(
      "Xác nhận",
      "Bạn có muốn xóa toàn bộ lịch sử điểm danh không?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa sạch",
          onPress: () => {
            clearHistory();
            loadHistory();
          },
          style: "destructive",
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* SỬA LỖI 2: Đảm bảo icon hệ thống (giờ, pin) có màu đen trên nền trắng */}
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View style={styles.header}>
        <View style={styles.leftHeader}>
          {/* SỬA LỖI 1: Nút quay lại */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <ArrowLeft color="#333" size={24} />
          </TouchableOpacity>
          <Text style={styles.title}>Lịch Sử</Text>
        </View>

        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={loadHistory} style={styles.iconBtn}>
            <RefreshCcw color="#0d47a1" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleClear}
            style={[styles.iconBtn, { marginLeft: 15 }]}
          >
            <Trash2 color="#d32f2f" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 20 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Chưa có dữ liệu điểm danh nào trong máy.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.classId}>Lớp: {item.classId}</Text>
              <View
                style={[
                  styles.statusTag,
                  item.syncStatus === 1 ? styles.synced : styles.pending,
                ]}
              >
                <Text style={styles.statusText}>
                  {item.syncStatus === 1 ? "Đã đồng bộ" : "Chưa gửi"}
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Clock size={14} color="#666" />
              <Text style={styles.infoText}>
                {new Date(item.timestamp).toLocaleString("vi-VN")}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <MapPin size={14} color="#666" />
              <Text style={styles.infoText}>
                Tọa độ: {item.lat.toFixed(4)}, {item.lon.toFixed(4)}
              </Text>
            </View>

            <Text style={styles.qrContent} numberOfLines={1}>
              QR: {item.qrContent}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
    elevation: 2,
    // Đảm bảo header không đè sát lên tai thỏ của iPhone/Android
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  backBtn: {
    padding: 5,
    marginRight: 10,
  },
  title: { fontSize: 18, fontWeight: "bold", color: "#333" },
  headerButtons: { flexDirection: "row" },
  iconBtn: { padding: 5 },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 1,
    borderLeftWidth: 5,
    borderLeftColor: "#0d47a1",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  classId: { fontWeight: "bold", fontSize: 16 },
  statusTag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5 },
  synced: { backgroundColor: "#e8f5e9" },
  pending: { backgroundColor: "#fff3e0" },
  statusText: { fontSize: 10, fontWeight: "bold", color: "#666" },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  infoText: { marginLeft: 8, color: "#666", fontSize: 13 },
  qrContent: { fontSize: 12, color: "#999", marginTop: 5, fontStyle: "italic" },
  emptyText: { textAlign: "center", marginTop: 50, color: "#999" },
});
