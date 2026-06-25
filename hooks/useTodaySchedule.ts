import React, { useEffect, useState } from "react";
import { api } from "@/src/services/api";
import { formatTime, deriveDisplayStatus, formatToVnDate } from "@/src/utils/statusConfig";

export function useTodaySchedule() {
  const [todayClasses, setTodayClasses] = useState<any[]>([]);
  const [isLoadingToday, setIsLoadingToday] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const lastFetchTime = React.useRef(0);

  const fetchTodaySchedule = async () => {
    try {
      setIsLoadingToday(true);
      const res = await api.get('/api/v1/students/me/schedules/today');
      const data = res.data?.result || [];
      const mapped = data.map((item: any) => ({
        id: item.classSessionId,
        title: item.subjectName,
        time: formatTime(item.periodStartTime),
        attendance_status: deriveDisplayStatus(item.sessionStatus, item.attendanceStatus),
        teacher: item.lecturerName,
        room: item.roomCode,
        attended: item.sessionNumber,
        total: item.totalSessions,
        originalSessionDate: item.originalSessionDate ? formatToVnDate(item.originalSessionDate) : null,
      }));
      setTodayClasses(mapped);
    } catch (error) {
      console.error('Lỗi tải lịch hôm nay:', error);
    } finally {
      setIsLoadingToday(false);
    }
  };

  const onRefresh = React.useCallback(async () => {
    const now = Date.now();
    if (now - lastFetchTime.current < 15000) {
      setRefreshing(true);
      setTimeout(() => setRefreshing(false), 500);
      return;
    }
    lastFetchTime.current = now;
    setRefreshing(true);
    await fetchTodaySchedule();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchTodaySchedule();
  }, []);

  return {
    todayClasses,
    isLoadingToday,
    refreshing,
    fetchTodaySchedule,
    onRefresh,
  };
}
