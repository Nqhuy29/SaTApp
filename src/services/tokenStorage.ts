import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_NAME_KEY = "userName";
const USER_EMAIL_KEY = "userEmail";
const USER_PHOTO_KEY = "userPhoto";

export const tokenStorage = {
  saveTokens: async (accessToken: string, refreshToken: string) => {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
  },

  getAccessToken: async (): Promise<string | null> => {
    return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  },

  getRefreshToken: async (): Promise<string | null> => {
    return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  },

  // Lưu thông tin user từ Google Sign-In
  saveUserInfo: async (name: string, email: string, photo: string | null) => {
    await SecureStore.setItemAsync(USER_NAME_KEY, name);
    await SecureStore.setItemAsync(USER_EMAIL_KEY, email);
    if (photo) {
      await SecureStore.setItemAsync(USER_PHOTO_KEY, photo);
    } else {
      await SecureStore.deleteItemAsync(USER_PHOTO_KEY);
    }
  },

  getUserInfo: async (): Promise<{ name: string; email: string; photo: string | null }> => {
    const name = (await SecureStore.getItemAsync(USER_NAME_KEY)) || '';
    const email = (await SecureStore.getItemAsync(USER_EMAIL_KEY)) || '';
    const photo = await SecureStore.getItemAsync(USER_PHOTO_KEY);
    return { name, email, photo };
  },

  clearTokens: async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_NAME_KEY);
    await SecureStore.deleteItemAsync(USER_EMAIL_KEY);
    await SecureStore.deleteItemAsync(USER_PHOTO_KEY);
  },

  // Giải mã JWT payload để lấy thông tin role
  decodeJwtPayload: (token: string): any => {
    try {
      const payload = token.split('.')[1];
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const decoded = atob(base64);
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  },

  // Kiểm tra token có phải role STUDENT không
  isStudentToken: (token: string): boolean => {
    try {
      const claims = tokenStorage.decodeJwtPayload(token);
      if (!claims) return false;

      // // DEBUG: In ra toàn bộ JWT payload để xem field nào chứa role
      // console.log('=== JWT CLAIMS ===', JSON.stringify(claims, null, 2));

      // Duyệt TẤT CẢ các field trong JWT tìm từ "student" (không phân biệt hoa thường)
      const allValues = JSON.stringify(claims).toLowerCase();
      return allValues.includes('student');
    } catch {
      return false;
    }
  },
};
