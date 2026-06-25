import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from 'expo-router';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Users,
  LogOut,
  GraduationCap,
  Building,
  AlertCircle,
} from 'lucide-react-native';
import { api } from '@/src/services/api';
import { tokenStorage } from '@/src/services/tokenStorage';

interface StudentProfile {
  fullName: string;
  studentCode: string;
  email: string;
  adminClassName: string;
  cohortYear: string;
  departmentName: string;
  facultyName: string;
  homeroomTeacherName: string;
  phoneNumber: string | null;
  gender: string | null;
  birthday: string | null; // LocalDate is serialized as YYYY-MM-DD
  birthPlace: string | null;
}

export default function ProfileScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setErrorMsg(null);
      const response = await api.get('/api/v1/students/me/profile');
      if (response.data && response.data.result) {
        setProfile(response.data.result);
      } else {
        throw new Error('Không thể lấy dữ liệu thông tin cá nhân');
      }
    } catch (error: any) {
      console.error('Lỗi khi lấy thông tin cá nhân:', error);
      let errMsg = 'Không thể kết nối tới máy chủ. Vui lòng thử lại sau.';
      if (error.response?.data?.message) {
        errMsg = error.response.data.message;
      } else if (error.message) {
        errMsg = error.message;
      }
      setErrorMsg(errMsg);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    tokenStorage.getUserInfo().then(info => setUserPhoto(info.photo));
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProfile();
  };

  const handleLogout = () => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn đăng xuất không?", [
      { text: "Không", style: "cancel" },
      {
        text: "Có",
        onPress: async () => {
          try {
            await tokenStorage.clearTokens();
            await GoogleSignin.signOut();
          } catch (e) {
            console.log('Lỗi khi đăng xuất:', e);
          } finally {
            router.replace('/login');
          }
        },
        style: "destructive",
      },
    ]);
  };

  const getAvatarChar = (name?: string) => {
    if (!name) return 'S';
    const cleanName = name.trim();
    const parts = cleanName.split(' ');
    const lastWord = parts[parts.length - 1];
    return lastWord ? lastWord.charAt(0).toUpperCase() : cleanName.charAt(0).toUpperCase();
  };

  const formatBirthday = (dateStr?: string | null) => {
    if (!dateStr) return 'Chưa cập nhật';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  const formatGender = (genderStr?: string | null) => {
    if (!genderStr) return 'Chưa cập nhật';
    const g = genderStr.toLowerCase();
    if (g === 'male') return 'Nam';
    if (g === 'female') return 'Nữ';
    if (g === 'other') return 'Khác';
    return genderStr;
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0d47a1" />
        <Text style={styles.loadingText}>Đang tải thông tin cá nhân...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.errorContainer}>
        <AlertCircle size={48} color="#d32f2f" />
        <Text style={styles.errorText}>{errorMsg}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => { setIsLoading(true); fetchProfile(); }}>
          <Text style={styles.retryButtonText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <LinearGradient colors={["#0d47a1", "#1976d2"]} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#ffffff"]}
            tintColor="#ffffff"
          />
        }
      >
        {/* Header Profile */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.avatarCircle}>
              {userPhoto ? (
                <Image source={{ uri: userPhoto }} style={styles.avatarImage} />
              ) : (
                <Text style={styles.avatarText}>{getAvatarChar(profile?.fullName)}</Text>
              )}
            </View>
            <Text style={styles.userName}>{profile?.fullName}</Text>
            <Text style={styles.userCode}>MSSV: {profile?.studentCode}</Text>
            <View style={styles.classBadge}>
              <Text style={styles.classBadgeText}>{profile?.adminClassName}</Text>
            </View>
          </View>
        </View>

        {/* Scrollable Details */}
        <View style={styles.scrollContent}>
          {/* Nhóm Thông tin học tập */}
          <Text style={styles.sectionTitle}>Thông tin học tập</Text>
          <View style={styles.infoCard}>
            <InfoItem
              icon={<GraduationCap size={20} color="#0d47a1" />}
              label="Ngành học"
              value={profile?.departmentName || 'Chưa cập nhật'}
            />
            <Divider />
            <InfoItem
              icon={<Building size={20} color="#0d47a1" />}
              label="Khoa"
              value={profile?.facultyName || 'Chưa cập nhật'}
            />
            <Divider />
            <InfoItem
              icon={<Calendar size={20} color="#0d47a1" />}
              label="Khóa học"
              value={profile?.cohortYear ? `Khóa ${profile.cohortYear}` : 'Chưa cập nhật'}
            />
            <Divider />
            <InfoItem
              icon={<Users size={20} color="#0d47a1" />}
              label="GV chủ nhiệm"
              value={profile?.homeroomTeacherName || 'Chưa cập nhật'}
            />
          </View>

          {/* Nhóm Thông tin cá nhân */}
          <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
          <View style={styles.infoCard}>
            <InfoItem
              icon={<User size={20} color="#0d47a1" />}
              label="Giới tính"
              value={formatGender(profile?.gender)}
            />
            <Divider />
            <InfoItem
              icon={<Calendar size={20} color="#0d47a1" />}
              label="Ngày sinh"
              value={formatBirthday(profile?.birthday)}
            />
            <Divider />
            <InfoItem
              icon={<MapPin size={20} color="#0d47a1" />}
              label="Nơi sinh"
              value={profile?.birthPlace || 'Chưa cập nhật'}
            />
          </View>

          {/* Nhóm Thông tin liên lạc */}
          <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>
          <View style={styles.infoCard}>
            <InfoItem
              icon={<Mail size={20} color="#0d47a1" />}
              label="Email trường"
              value={profile?.email || 'Chưa cập nhật'}
            />
            <Divider />
            <InfoItem
              icon={<Phone size={20} color="#0d47a1" />}
              label="Số điện thoại"
              value={profile?.phoneNumber || 'Chưa cập nhật'}
            />
          </View>

          {/* Nút Đăng xuất */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
            <LogOut size={20} color="#d32f2f" style={styles.logoutIcon} />
            <Text style={styles.logoutText}>Đăng xuất tài khoản</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

// Subcomponents
function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.iconWrapper}>{icon}</View>
      <View style={styles.infoTextWrapper}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 15,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  errorText: {
    marginTop: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: '#0d47a1',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  headerContent: {
    alignItems: 'center',
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarText: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: 36,
  },
  userName: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userCode: {
    color: '#E0E0FF',
    fontSize: 14,
    marginTop: 5,
    fontWeight: '500',
  },
  classBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  classBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  scrollContent: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FA',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#888888',
    textTransform: 'uppercase',
    marginBottom: 10,
    marginTop: 15,
    letterSpacing: 0.5,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EEF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoTextWrapper: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginLeft: 48,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF1F1',
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#FFE0E0',
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    color: '#d32f2f',
    fontSize: 15,
    fontWeight: '700',
  },
});
