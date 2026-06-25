// Cấu hình UI cho các trường hợp trạng thái điểm danh
export const STATUS_CONFIG: Record<string, any> = {
  upcoming: {
    badgeText: "Sắp tới",
    badgeColor: "#E67E22",
    badgeBg: "#FDEBD0",
    popupText: "Chưa tới giờ học",
    popupBtnColor: "#E67E22",
    isActionable: false,
    icon: "clock",
    timeBg: "#0d47a1",
    timeColor: "#FFF"
  },
  ongoing_absent: {
    badgeText: "Chưa có mặt",
    badgeColor: "#E74C3C",
    badgeBg: "#FDEDEC",
    popupText: "Quét QR Điểm Danh",
    popupBtnColor: "#0d47a1",
    isActionable: true,
    icon: "alert",
    timeBg: "#0d47a1",
    timeColor: "#FFF"
  },
  present: {
    badgeText: "Đã có mặt",
    badgeColor: "#2ECC71",
    badgeBg: "#EAFAF1",
    popupText: "Điểm danh thành công",
    popupBtnColor: "#2ECC71",
    isActionable: false,
    icon: "check",
    timeBg: "#2ECC71",
    timeColor: "#FFF"
  },
  absent: {
    badgeText: "Vắng mặt",
    badgeColor: "#C0392B",
    badgeBg: "#FDEDEC",
    popupText: "Đã chốt sổ - Vắng mặt",
    popupBtnColor: "#C0392B",
    isActionable: false,
    icon: "x",
    timeBg: "#D5D8DC",
    timeColor: "#555"
  },
  excused: {
    badgeText: "Có phép",
    badgeColor: "#16A085",
    badgeBg: "#E8F8F5",
    popupText: "Đã chốt sổ - Có phép",
    popupBtnColor: "#16A085",
    isActionable: false,
    icon: "info",
    timeBg: "#D5D8DC",
    timeColor: "#555"
  },
  not_started: {
    badgeText: "Chưa bắt đầu",
    badgeColor: "#9CA3AF",
    badgeBg: "#F3F4F6",
    popupText: "Chưa bắt đầu",
    popupBtnColor: "#9CA3AF",
    isActionable: false,
    icon: "clock",
    timeBg: "#D5D8DC",
    timeColor: "#555"
  },
  cancelled: {
    badgeText: "Đã hủy",
    badgeColor: "#7F8C8D",
    badgeBg: "#F2F3F4",
    popupText: "Buổi học đã bị hủy",
    popupBtnColor: "#7F8C8D",
    isActionable: false,
    icon: "x-circle",
    timeBg: "#BDC3C7",
    timeColor: "#FFF"
  },
};

// Helper: Format thời gian từ "HH:mm:ss" → "HH:mm AM/PM"
export function formatTime(timeStr: string | null): string {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':');
  const hour = parseInt(h, 10);
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const h12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${String(h12).padStart(2, '0')}:${m} ${suffix}`;
}

// Helper: Format thời gian từ "HH:mm:ss" → "HH:mm" (short format)
export function formatTimeShort(timeStr: string | null): string {
  if (!timeStr) return '';
  return timeStr.substring(0, 5);
}

// Helper: Format YYYY-MM-DD -> DD/MM/YYYY
export function formatToVnDate(dateStr: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

// Helper: Map sessionStatus + attendanceStatus → UI status key
export function deriveDisplayStatus(sessionStatus: string | null, attendanceStatus: string | null): string {
  const session = (sessionStatus || '').toLowerCase();
  const attendance = (attendanceStatus || '').toLowerCase();
  if (session === 'not_started' || attendance === 'not_started') return 'not_started';
  if (attendance === 'present' || attendance === 'late') return 'present';
  if (attendance === 'excused' || attendance === 'excused_absent') return 'excused';
  if (session === 'cancelled') return 'cancelled';
  if (session === 'completed' || session === 'closed') return 'absent';
  if (session === 'ongoing' || session === 'open') return 'ongoing_absent';
  return 'upcoming';
}
