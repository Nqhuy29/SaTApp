import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Platform } from "react-native";
import { Check, X } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function SemesterPickerModal({ visible, onClose, semesters, selectedSemesterId, onSelectSemester }: any) {
  const insets = useSafeAreaInsets();
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <TouchableOpacity activeOpacity={1} style={[styles.modalContent, { paddingBottom: Math.max(insets.bottom, 20) }]}>
          <View style={styles.modalHeaderRow}>
            <Text style={styles.modalTitle}>Chọn học kỳ</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={20} color="#666" />
            </TouchableOpacity>
          </View>
          <ScrollView style={{ maxHeight: 350 }} showsVerticalScrollIndicator={false}>
            {semesters.map((sem: any) => {
              const isSelected = selectedSemesterId === sem.id || (selectedSemesterId === null && sem.isActive);
              
              return (
                <TouchableOpacity
                  key={sem.id}
                  style={styles.semesterOption}
                  onPress={() => onSelectSemester(sem.id)}
                >
                  <Text style={[styles.semesterOptionText, isSelected && styles.semesterOptionTextSelected]}>
                    {sem.name} {sem.isActive ? "(Hiện tại)" : ""}
                  </Text>
                  {isSelected && <Check size={20} color="#0d47a1" />}
                </TouchableOpacity>
              );
            })}
            {semesters.length === 0 && (
              <Text style={{ textAlign: 'center', color: '#888', marginTop: 20 }}>
                Không tìm thấy học kỳ nào
              </Text>
            )}
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  modalHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#111827",
  },
  semesterOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#F3F4F6",
  },
  semesterOptionText: {
    fontSize: 15,
    color: "#374151",
  },
  semesterOptionTextSelected: {
    color: "#0d47a1",
    fontWeight: "bold",
  },
});
