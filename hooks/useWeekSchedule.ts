import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { api } from "@/src/services/api";
import { formatTimeShort, formatToVnDate, deriveDisplayStatus } from "@/src/utils/statusConfig";
import { getWeekFromDate, getTodayStr } from "@/src/utils/scheduleDate";

export function useWeekSchedule() {
  const [weekNumber, setWeekNumber] = useState<number | null>(null); 
  const [currentWeek, setCurrentWeek] = useState(1);
  const [activeSemester, setActiveSemester] = useState<any>(null);
  const [rawData, setRawData] = useState<any[]>([]); 
  const [scheduleByDate, setScheduleByDate] = useState<Record<string, any[]>>({});
  const [selectedDate, setSelectedDate] = useState(getTodayStr());
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const lastFetchTime = useRef(0);

  // Lấy thông tin học kỳ để tính toán tuần hiện tại chính xác
  useEffect(() => {
    const fetchSemester = async () => {
      try {
        const res = await api.get("/api/v1/semesters");
        const list = res.data?.result || [];
        const active = list.find((s: any) => s.isActive);
        if (active && active.startDate) {
          setActiveSemester(active);
          const start = new Date(active.startDate);
          start.setHours(0, 0, 0, 0);
          const now = new Date();
          now.setHours(0, 0, 0, 0);

          const diffTime = now.getTime() - start.getTime();
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          const actualWeek = Math.floor(diffDays / 7) + (active.startWeek || 1);

          setCurrentWeek(actualWeek);

          const startW = active.startWeek || 1;
          if (actualWeek >= startW) {
            setWeekNumber(actualWeek);
          } else {
            setWeekNumber(startW);
          }
        } else {
          setWeekNumber(1);
          setCurrentWeek(1);
        }
      } catch (error) {
        console.error("Lỗi khi tải học kỳ:", error);
        setWeekNumber(1);
        setCurrentWeek(1);
      }
    };
    fetchSemester();
  }, []);

  const weekDates = useMemo(() => {
    if (rawData.length > 0) {
      const firstDate = rawData[0].sessionDate;
      return getWeekFromDate(firstDate);
    }
    return getWeekFromDate(getTodayStr());
  }, [rawData]);

  const fetchWeekSchedule = async () => {
    if (weekNumber === null) return;
    try {
      setIsLoading(true);
      const res = await api.get("/api/v1/students/me/schedules", { params: { weekNumber } });
      const data: any[] = res.data?.result || [];
      setRawData(data);

      const grouped: Record<string, any[]> = {};

      data.forEach((item: any) => {
        const dateKey = item.sessionDate;
        const mapped = {
          id: item.classSessionId,
          title: item.subjectName,
          room: item.roomCode,
          startTime: formatTimeShort(item.periodStartTime),
          endTime: formatTimeShort(item.periodEndTime),
          time: `${formatTimeShort(item.periodStartTime)} - ${formatTimeShort(item.periodEndTime)}`,
          attendance_status: deriveDisplayStatus(item.sessionStatus, item.attendanceStatus),
          originalSessionDate: item.originalSessionDate ? formatToVnDate(item.originalSessionDate) : null,
        };
        if (!grouped[dateKey]) grouped[dateKey] = [];
        grouped[dateKey].push(mapped);
      });

      setScheduleByDate(grouped);
    } catch (error) {
      console.error("Lỗi tải lịch tuần:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (weekNumber !== null && weekNumber > 0) {
      fetchWeekSchedule();
    }
  }, [weekNumber]);

  useEffect(() => {
    const today = getTodayStr();
    if (weekDates.includes(today)) {
      setSelectedDate(today);
    } else if (weekDates.length > 0) {
      setSelectedDate(weekDates[0]);
    }
  }, [weekDates]);

  const onRefresh = useCallback(async () => {
    const now = Date.now();
    if (now - lastFetchTime.current < 15000) {
      setRefreshing(true);
      setTimeout(() => setRefreshing(false), 500);
      return;
    }
    lastFetchTime.current = now;
    setRefreshing(true);
    await fetchWeekSchedule();
    setRefreshing(false);
  }, [weekNumber]);

  const currentClasses = scheduleByDate[selectedDate] || [];
  const todayStr = getTodayStr();

  const defaultWeek = useMemo(() => {
    const startW = activeSemester?.startWeek || 1;
    return currentWeek >= startW ? currentWeek : startW;
  }, [currentWeek, activeSemester]);

  const isDefaultWeek = weekNumber === defaultWeek;
  const weekLabel = isDefaultWeek
    ? (currentWeek >= (activeSemester?.startWeek || 1) ? `Tuần này (${defaultWeek})` : `Tuần ${defaultWeek}`)
    : `Tuần ${weekNumber}`;

  return {
    weekNumber,
    setWeekNumber,
    selectedDate,
    setSelectedDate,
    weekDates,
    currentClasses,
    todayStr,
    isLoading,
    refreshing,
    onRefresh,
    defaultWeek,
    isDefaultWeek,
    weekLabel,
    scheduleByDate,
  };
}
