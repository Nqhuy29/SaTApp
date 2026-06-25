import { useError } from "@/src/context/ErrorContext";
import { useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import React, { useState } from "react";
import { Alert } from "react-native";
import { api } from "@/src/services/api";
import { getDeviceId } from "@/src/utils/deviceId";
import Toast from "react-native-toast-message";

export function useQRScanner(onAttendanceSuccess: () => void) {
  const { showError } = useError();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const [qrBounds, setQrBounds] = useState<any>(null);
  const isProcessing = React.useRef(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  const [scanError, setScanError] = useState<string | null>(null);

  const locationSubscription = React.useRef<any>(null);
  const latestLocation = React.useRef<Location.LocationObject | null>(null);

  React.useEffect(() => {
    let mounted = true;

    const startLocationWatch = async () => {
      if (isScanning) {
        try {
          const { status } = await Location.getForegroundPermissionsAsync();
          if (status === "granted") {
            // Lấy ngay 1 vị trí ban đầu để có sẵn tọa độ
            const initialLocation = await Location.getCurrentPositionAsync({
              accuracy: Location.Accuracy.Balanced,
            });
            if (mounted && !latestLocation.current) {
              latestLocation.current = initialLocation;
            }

            // Bắt đầu theo dõi vị trí liên tục
            locationSubscription.current = await Location.watchPositionAsync(
              {
                accuracy: Location.Accuracy.High,
                timeInterval: 2000,
                distanceInterval: 1,
              },
              (location) => {
                if (mounted) latestLocation.current = location;
              }
            );
          }
        } catch (error) {
          console.log("Lỗi theo dõi vị trí:", error);
        }
      } else {
        if (locationSubscription.current) {
          locationSubscription.current.remove();
          locationSubscription.current = null;
        }
      }
    };

    startLocationWatch();

    return () => {
      mounted = false;
      if (locationSubscription.current) {
        locationSubscription.current.remove();
        locationSubscription.current = null;
      }
    };
  }, [isScanning]);

  const startScanning = async () => {
    if (!cameraPermission?.granted) {
      const cameraStatus = await requestCameraPermission();
      if (!cameraStatus.granted)
        return showError("Cần quyền camera để quét QR");
    }
    const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
    if (locationStatus !== "granted") {
      return showError("Cần quyền GPS để xác thực vị trí điểm danh");
    }
    setIsScanning(true);
  };

  const handleBarCodeScanned = (result: any) => {
    if (isProcessing.current) return;
    const { data, bounds } = result;
    setQrBounds(bounds);

    if (!data || typeof data !== "string" || data.split(".").length !== 3 || !data.startsWith("ey")) {
      setScanError("Mã QR không hợp lệ! Vui lòng quét mã điểm danh của ứng dụng.");
      setScannedData(null);
      return;
    }

    setScanError(null);
    setScannedData({ qrContent: data });
  };

  const confirmAttendance = async () => {
    const uniqueId = await getDeviceId();

    if (!scannedData || isProcessing.current) return;
    isProcessing.current = true;
    setIsConfirming(true);

    try {
      const enabled = await Location.hasServicesEnabledAsync();
      if (!enabled) {
        isProcessing.current = false;
        setIsConfirming(false);
        return showError("Vui lòng bật GPS trên thiết bị của bạn.");
      }

      let finalLocation = latestLocation.current;
      
      // Đề phòng trường hợp cực đoan: tiến trình ngầm chưa kịp lấy vị trí nào
      if (!finalLocation) {
        finalLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
      }

      const response = await api.post("/api/v1/students/me/attendances/submit-qr", {
        token: scannedData.qrContent,
        deviceId: uniqueId,
        lat: finalLocation.coords.latitude,
        lng: finalLocation.coords.longitude,
      });

      const isSuccess =
        response.data?.code == 1000 ||
        response.data?.code == 200 ||
        response.data?.message === "Điểm danh thành công";

      if (response.data && isSuccess) {
        setIsConfirming(false);
        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: response.data.message || "Điểm danh thành công"
        });
        
        // Tự động đóng màn hình và làm mới thay vì ép người dùng bấm OK
        setIsScanning(false);
        setScannedData(null);
        setQrBounds(null);
        setScanError(null);
        isProcessing.current = false;
        onAttendanceSuccess();
      } else {
        throw new Error(response.data?.message || "Lỗi không xác định từ server");
      }
    } catch (error: any) {
      isProcessing.current = false;
      setIsConfirming(false);
      console.log("Lỗi điểm danh:", error);

      let errorMsg = "Không thể điểm danh. Vui lòng thử lại.";
      if (error.response?.data) {
        if (typeof error.response.data === "object") {
          errorMsg = error.response.data.message || JSON.stringify(error.response.data);
        } else {
          errorMsg = `Lỗi Server: ${String(error.response.data).substring(0, 100)}...`;
        }
      } else {
        errorMsg = error.message;
      }

      setScanError(errorMsg);
    }
  };

  const closeScanner = () => {
    setIsScanning(false);
    setQrBounds(null);
    setScannedData(null);
    setScanError(null);
    isProcessing.current = false;
  };

  const resetScan = () => {
    setScannedData(null);
    setQrBounds(null);
    setScanError(null);
  };

  return {
    isScanning,
    scannedData,
    scanError,
    qrBounds,
    isConfirming,
    startScanning,
    handleBarCodeScanned,
    confirmAttendance,
    closeScanner,
    resetScan,
  };
}
