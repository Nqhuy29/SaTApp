import * as Application from "expo-application";
import { Platform } from "react-native";

export const getDeviceId = async (): Promise<string> => {
  try {
    if (Platform.OS === "android") {
      const id = Application.getAndroidId();
      return id ?? "UNKNOWN_ANDROID";
    } else {
      const id = await Application.getIosIdForVendorAsync();
      return id ?? "UNKNOWN_IOS";
    }
  } catch (error) {
    console.error("Lỗi lấy Device ID:", error);
    return "DEVICE_ERROR";
  }
};
