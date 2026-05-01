import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. Request Interceptor: Tự động đính kèm accessToken vào mọi API
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. Response Interceptor: Bắt lỗi 401 và tự động dùng refreshToken
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu mã lỗi là 401 (hết hạn token) và chưa từng thử refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('Không có refresh token');
        }

        // Gọi API lên backend để lấy token mới (CẦN SỬA LẠI THAM SỐ CHO KHỚP VỚI BACKEND CỦA BẠN)
        const res = await axios.post('http://localhost:8080/auth/refresh', {
          refreshToken: refreshToken
        });

        const newAccessToken = res.data.result?.accessToken;
        const newRefreshToken = res.data.result?.refreshToken; // Có thể backend sẽ trả về luôn refresh token mới

        if (newAccessToken) {
          // Lưu token mới vào localStorage
          localStorage.setItem('accessToken', newAccessToken);
          if (newRefreshToken) {
            localStorage.setItem('refreshToken', newRefreshToken);
          }

          // Gắn token mới vào request bị hỏng ban nãy và gọi lại nó
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Nếu refresh cũng thất bại (quá hạn cả refresh token) -> Văng ra Login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
