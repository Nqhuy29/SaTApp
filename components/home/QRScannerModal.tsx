import React, { useState, useRef } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CameraView } from "expo-camera";
import { CheckCircle2, XCircle, ZoomIn, ZoomOut } from "lucide-react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import SpeederLoader from "@/components/SpeederLoader";

interface QRScannerModalProps {
  isScanning: boolean;
  scannedData: any;
  scanError: string | null;
  qrBounds: any;
  isConfirming: boolean;
  onBarCodeScanned: (result: any) => void;
  onConfirmAttendance: () => void;
  onClose: () => void;
  onResetScan: () => void;
}

export function QRScannerModal({
  isScanning,
  scannedData,
  scanError,
  qrBounds,
  isConfirming,
  onBarCodeScanned,
  onConfirmAttendance,
  onClose,
  onResetScan,
}: QRScannerModalProps) {
  const [zoom, setZoom] = useState(0);
  const baseZoom = useRef(0);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(1, prev + 0.05));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(0, prev - 0.05));
  };

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      baseZoom.current = zoom;
    })
    .onUpdate((e) => {
      const newZoom = Math.max(0, Math.min(1, baseZoom.current + (e.scale - 1) * 0.5));
      setZoom(newZoom);
    })
    .runOnJS(true);

  return (
    <Modal visible={isScanning} animationType="slide" transparent={false}>
      <GestureHandlerRootView style={StyleSheet.absoluteFillObject}>
        <GestureDetector gesture={pinchGesture}>
          <View style={StyleSheet.absoluteFillObject}>
            <CameraView
              style={StyleSheet.absoluteFillObject}
              onBarcodeScanned={scannedData ? undefined : onBarCodeScanned}
              zoom={zoom}
            />

            <TouchableOpacity style={styles.closeX} onPress={onClose}>
              <Text style={{ color: "white", fontSize: 24 }}>✕</Text>
            </TouchableOpacity>

            <View style={[StyleSheet.absoluteFillObject, styles.cameraOverlay]}>
              <Text style={styles.topInstruction}>
                {scannedData ? "Xác nhận thông vị trí" : "Quét mã QR điểm danh"}
              </Text>

              <View style={styles.containerFrame}>
                <View style={styles.defaultFrameZ}>
                  <View style={[styles.zCorner, styles.zTopLeft, qrBounds && styles.zYellow]} />
                  <View style={[styles.zCorner, styles.zTopRight, qrBounds && styles.zYellow]} />
                  <View style={[styles.zCorner, styles.zBottomLeft, qrBounds && styles.zYellow]} />
                  <View style={[styles.zCorner, styles.zBottomRight, qrBounds && styles.zYellow]} />
                </View>
              </View>

              {/* ZOOM CONTROLS */}
              {!scannedData && (
                <View style={styles.zoomContainer}>
                  <TouchableOpacity onPress={handleZoomOut} style={styles.zoomBtn}>
                    <ZoomOut color="white" size={28} />
                  </TouchableOpacity>
                  
                  <View style={styles.zoomLevelIndicator}>
                    <Text style={styles.zoomLevelText}>{Math.round(zoom * 20) + 1}x</Text>
                  </View>

                  <TouchableOpacity onPress={handleZoomIn} style={styles.zoomBtn}>
                    <ZoomIn color="white" size={28} />
                  </TouchableOpacity>
                </View>
              )}

              {/* CARD THÔNG TIN HIỆN LÊN KHI QUÉT XONG */}
              {scannedData && (
                <View style={styles.attendanceCard}>
                  <Text style={[styles.scannedTitle, scanError && { color: "#d32f2f" }]}>
                    {scanError ? "Điểm Danh Thất Bại" : "Mã QR Hợp Lệ"}
                  </Text>

                  {scanError ? (
                    <View style={[styles.scannedInfoRow, { backgroundColor: "#ffebee", padding: 10, borderRadius: 8, width: "100%", justifyContent: "center" }]}>
                      <XCircle size={18} color="#d32f2f" />
                      <Text style={[styles.scannedText, { color: "#d32f2f", marginLeft: 5, textAlign: "center" }]}>{scanError}</Text>
                    </View>
                  ) : (
                    <View style={styles.scannedInfoRow}>
                      <CheckCircle2 size={18} color="#4caf50" />
                      <Text style={styles.scannedText}>Đã quét thành công mã QR.</Text>
                    </View>
                  )}

                  <TouchableOpacity
                    style={[styles.confirmBtn, scanError && { backgroundColor: "#f5f5f5", borderWidth: 1, borderColor: "#ddd" }]}
                    onPress={scanError ? onResetScan : onConfirmAttendance}
                  >
                    <Text style={[styles.confirmBtnText, scanError && { color: "#555" }]}>
                      {scanError ? "QUÉT LẠI MÃ KHÁC" : "XÁC NHẬN ĐIỂM DANH"}
                    </Text>
                  </TouchableOpacity>

                  {!scanError && (
                    <TouchableOpacity onPress={onResetScan}>
                      <Text style={styles.reScanText}>Hủy và quét lại</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          </View>
        </GestureDetector>
        <SpeederLoader visible={isConfirming} />
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  closeX: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  topInstruction: {
    color: "white",
    fontSize: 16,
    position: "absolute",
    top: "15%",
    fontWeight: "bold",
  },
  containerFrame: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  defaultFrameZ: {
    width: 260,
    height: 260,
  },
  zCorner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: "rgba(255,255,255,0.6)",
    borderWidth: 4,
    borderRadius: 4,
  },
  zYellow: {
    borderColor: "#FFD700",
    borderWidth: 5,
  },
  zTopLeft: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  zTopRight: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  zBottomLeft: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  zBottomRight: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  zoomContainer: {
    position: "absolute",
    bottom: 100,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 20,
  },
  zoomBtn: {
    padding: 10,
  },
  zoomLevelIndicator: {
    width: 40,
    alignItems: "center",
  },
  zoomLevelText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  attendanceCard: {
    position: "absolute",
    bottom: 40,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  scannedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5B42F3",
    marginBottom: 10,
  },
  scannedInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    gap: 8,
  },
  scannedText: {
    fontSize: 14,
    color: "#555",
  },
  confirmBtn: {
    backgroundColor: "#5B42F3",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 15,
    alignItems: "center",
  },
  confirmBtnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  reScanText: {
    marginTop: 12,
    color: "#888",
    textDecorationLine: "underline",
  },
});

