export const DAYS_LABEL = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
export const MONTH_NAMES = [
  "THÁNG 1","THÁNG 2","THÁNG 3","THÁNG 4","THÁNG 5","THÁNG 6",
  "THÁNG 7","THÁNG 8","THÁNG 9","THÁNG 10","THÁNG 11","THÁNG 12",
];
export const DAY_NAMES_FULL = ["CHỦ NHẬT","THỨ HAI","THỨ BA","THỨ TƯ","THỨ NĂM","THỨ SÁU","THỨ BẢY"];

export function getWeekFromDate(dateStr: string): string[] {
  const d = new Date(dateStr + "T00:00:00");
  const dow = d.getDay(); 
  const diffToMonday = dow === 0 ? -6 : 1 - dow;
  const monday = new Date(d.getFullYear(), d.getMonth(), d.getDate() + diffToMonday);
  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i);
    const yyyy = day.getFullYear();
    const mm = String(day.getMonth() + 1).padStart(2, "0");
    const dd = String(day.getDate()).padStart(2, "0");
    dates.push(`${yyyy}-${mm}-${dd}`);
  }
  return dates;
}

export function formatDateHeader(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  const dayName = DAY_NAMES_FULL[d.getDay()];
  const day = d.getDate();
  const month = MONTH_NAMES[d.getMonth()];
  return `${dayName}, ${day} ${month}`;
}

export function getDayLabel(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return DAYS_LABEL[d.getDay()];
}

export function getTodayStr(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
