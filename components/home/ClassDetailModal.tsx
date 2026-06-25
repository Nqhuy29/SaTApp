import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AlertCircle, BookOpen, Clock, MapPin, User, XCircle } from "lucide-react-native";
import { STATUS_CONFIG } from "@/src/utils/statusConfig";

interface ClassDetailModalProps {
  selectedClass: any;
  onClose: () => void;
  onScanQR: () => void;
}

function InfoRow({ icon, label, value }: any) {
  return (
    <View style={styles.infoRow}>
      {icon}
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

export function ClassDetailModal({ selectedClass, onClose, onScanQR }: ClassDetailModalProps) {
  // Lấy ra config hiển thị dựa trên môn học đang được chọn ở Popup
  const activeConfig = selectedClass
    ? STATUS_CONFIG[selectedClass.attendance_status as keyof typeof STATUS_CONFIG]
    : null;

  return (
    <Modal visible={!!selectedClass} animationType="fade" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.detailCard}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Chi tiết môn học</Text>
            <TouchableOpacity onPress={onClose}>
              <XCircle color="#666" size={24} />
            </TouchableOpacity>
          </View>
          <Text style={styles.detailSubjectName}>{selectedClass?.title}</Text>
          <View style={styles.detailInfoGrid}>
            <InfoRow icon={<User size={18} color="#0d47a1" />} label="Giảng viên" value={selectedClass?.teacher} />
            <InfoRow icon={<MapPin size={18} color="#0d47a1" />} label="Phòng học" value={selectedClass?.room} />
            <InfoRow icon={<Clock size={18} color="#0d47a1" />} label="Giờ học" value={selectedClass?.time} />
            <InfoRow icon={<BookOpen size={18} color="#0d47a1" />} label="Số buổi" value={`${selectedClass?.attended}/${selectedClass?.total} buổi`} />
            {selectedClass?.originalSessionDate && (
              <InfoRow icon={<AlertCircle size={18} color="#E67E22" />} label="Thông tin thêm" value={`Dạy bù cho buổi ngày ${selectedClass.originalSessionDate}`} />
            )}
          </View>

          {/* BÚT ACTION TRONG POPUP */}
          <TouchableOpacity
            disabled={!activeConfig?.isActionable}
            style={[
              styles.actionButton,
              { backgroundColor: activeConfig?.popupBtnColor },
            ]}
            onPress={() => {
              if (activeConfig?.isActionable) {
                onClose(); // Đóng modal
                setTimeout(() => {
                  onScanQR(); // Mở camera quét QR
                }, 300); // Chờ animation modal tắt xong mới mở cam cho mượt
              }
            }}
          >
            <Text style={styles.actionButtonText}>{activeConfig?.popupText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  detailCard: {
    backgroundColor: "white",
    borderRadius: 25,
    width: "100%",
    padding: 25,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  modalTitle: { fontSize: 14, color: "#888", fontWeight: "600" },
  detailSubjectName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0d47a1",
    marginBottom: 20,
  },
  detailInfoGrid: { gap: 15, marginBottom: 25 },
  infoRow: { flexDirection: "row", alignItems: "center" },
  infoLabel: { fontSize: 12, color: "#888" },
  infoValue: { fontSize: 15, fontWeight: "600", color: "#333" },
  actionButton: {
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10
  },
  actionButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  },
});
