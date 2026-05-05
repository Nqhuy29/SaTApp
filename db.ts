import * as SQLite from "expo-sqlite";

// 1. Mở hoặc tạo file database tên là sat_app.db
const db = SQLite.openDatabaseSync("sat_app.db");

export const initDatabase = () => {
  try {
    // 2. Tạo bảng Attendances để lưu dữ liệu điểm danh
    // Chúng ta lưu: mã lớp, mã QR, tọa độ, mã máy, thời gian và trạng thái đồng bộ
    db.execSync(`
      CREATE TABLE IF NOT EXISTS Attendances (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        studentId TEXT,
        classId TEXT,
        qrContent TEXT,
        lat REAL,
        lon REAL,
        deviceId TEXT,
        timestamp TEXT,
        syncStatus INTEGER DEFAULT 0 
      );
    `);
  } catch (error) {
    console.error("❌ Lỗi khởi tạo Database:", error);
  }
};
// Hàm để lưu một bản ghi điểm danh mới
export const saveAttendance = (data: {
  studentId: string;
  classId: string;
  qrContent: string;
  lat: number;
  lon: number;
  deviceId: string;
  timestamp: string;
}) => {
  try {
    // Chèn dữ liệu vào bảng Attendances
    db.runSync(
      `INSERT INTO Attendances (studentId, classId, qrContent, lat, lon, deviceId, timestamp, syncStatus) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.studentId,
        data.classId,
        data.qrContent,
        data.lat,
        data.lon,
        data.deviceId,
        data.timestamp,
        0, // syncStatus mặc định là 0 (chưa đồng bộ)
      ],
    );
    console.log("✅ Đã lưu dữ liệu điểm danh vào SQLite thành công!");
    return true;
  } catch (error) {
    console.error("❌ Lỗi khi lưu vào SQLite:", error);
    return false;
  }
};
// Hàm lấy toàn bộ danh sách điểm danh để hiển thị hoặc đồng bộ
export const getAllAttendances = () => {
  try {
    const allRows = db.getAllSync("SELECT * FROM Attendances ORDER BY id DESC");
    return allRows;
  } catch (error) {
    console.error("❌ Lỗi lấy dữ liệu:", error);
    return [];
  }
};

// Thêm hàm này để bạn có thể xóa dữ liệu test khi cần
export const clearHistory = () => {
  try {
    db.execSync("DELETE FROM Attendances");
    return true;
  } catch (error) {
    return false;
  }
};

export default db;
