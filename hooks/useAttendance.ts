import { useError } from "@/src/context/ErrorContext";
import { useState, useEffect, useRef, useCallback } from "react";
import { Alert } from "react-native";
import { api } from "@/src/services/api";

export function useAttendance() {
  const { showError } = useError();

  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<any>(null);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  
  const [semesters, setSemesters] = useState<any[]>([]);
  const [selectedSemesterId, setSelectedSemesterId] = useState<number | null>(null);
  const [showSemesterPicker, setShowSemesterPicker] = useState(false);

  const lastFetchTime = useRef(0);

  const fetchSemesters = async () => {
    try {
      const response = await api.get("/api/v1/students/me/attendances/semesters");
      if (response.data.code === 200) {
        setSemesters(response.data.result);
      }
    } catch (error) {
      console.error("Failed to fetch semesters:", error);
      showError("Không thể tải danh sách học kỳ. Vui lòng kiểm tra kết nối.");
    }
  };

  const fetchAttendance = async (semId?: number | null) => {
    const currentSemId = semId !== undefined ? semId : selectedSemesterId;
    try {
      const params = currentSemId ? { semesterId: currentSemId } : {};
      const response = await api.get("/api/v1/students/me/attendances/overview", { params });
      
      if (response.data.code === 200) {
        setOverview(response.data.result.overview);
        setSubjects(response.data.result.subjects);
      }
    } catch (error) {
      console.error("Failed to fetch attendance:", error);
      showError("Không thể tải dữ liệu chuyên cần. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSemesters();
    fetchAttendance();
  }, []);

  const onRefresh = useCallback(async () => {
    const now = Date.now();
    if (now - lastFetchTime.current < 15000) {
      setRefreshing(true);
      setTimeout(() => setRefreshing(false), 500);
      return;
    }
    lastFetchTime.current = now;
    setRefreshing(true);
    await fetchAttendance(selectedSemesterId);
    setRefreshing(false);
  }, [selectedSemesterId]);

  const handleSelectSemester = (semId: number) => {
    setSelectedSemesterId(semId);
    setShowSemesterPicker(false);
    setLoading(true);
    fetchAttendance(semId);
  };

  const getRateColor = (rate: number) => {
    if (rate >= 80) return { text: "#27500A", bg: "#EAF3DE", bar: "#639922" };
    if (rate >= 60) return { text: "#633806", bg: "#FAEEDA", bar: "#EF9F27" };
    return { text: "#791F1F", bg: "#FCEBEB", bar: "#E24B4A" };
  };

  return {
    loading,
    overview,
    subjects,
    refreshing,
    onRefresh,
    semesters,
    selectedSemesterId,
    showSemesterPicker,
    setShowSemesterPicker,
    handleSelectSemester,
    getRateColor,
  };
}
