# 🎯 SaTApp - Hệ thống Điểm danh Sinh viên qua QR Code

**SaTApp** là ứng dụng di động dành cho sinh viên, giúp việc điểm danh trở nên nhanh chóng, chính xác và chống gian lận hiệu quả bằng cách kết hợp mã QR động và xác thực vị trí GPS.

---

## 📱 Thành viên thực hiện

- **Nguyễn Quang Huy** (Nqhuy29)
- **Lê Kien** (kienNB2005)

## 🛠 Công nghệ sử dụng

- **Frontend:** React Native (Expo Router)
- **Ngôn ngữ:** TypeScript
- **Backend:** Java Spring Boot (đang phát triển)
- **Database:** MySQL
- **Thư viện chính:** - `expo-router`: Điều hướng file-based.
  - `expo-barcode-scanner`: Quét mã QR.
  - `expo-location`: Xác thực vị trí GPS.
  - `lucide-react-native`: Hệ thống icon hiện đại.

## 📂 Cấu trúc dự án

- `app/`: Các màn hình chính (Login, Home, Scan, Schedule...).
- `components/`: Các thành phần UI dùng chung.
- `src/api/`: Cấu hình gọi API đến Spring Boot.
- `src/services/`: Logic xử lý GPS và kiểm tra mã QR.
- `src/utils/`: Các hàm bổ trợ (định dạng ngày tháng, tính khoảng cách).

## 🚀 Tính năng chính

- [ ] **Login:** Đăng nhập bằng Google Account.
- [ ] **QR Scan:** Quét mã QR động để điểm danh.
- [ ] **GPS Check:** Chống điểm danh hộ bằng cách kiểm tra vị trí sinh viên trong phạm vi lớp học.
- [ ] **Schedule:** Xem lịch học theo ngày/tuần.
- [ ] **History:** Xem lịch sử điểm danh và tỉ lệ chuyên cần.

## 🛠 Cài đặt để phát triển

1. **Clone project:**

   ```bash
   git clone [https://github.com/Nqhuy29/SaTApp.git](https://github.com/Nqhuy29/SaTApp.git)
   cd SaTApp
   ```
