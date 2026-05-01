import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Sidebar({ role, setRole }) {
  const isAdmin = role === 'admin';
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return (
    <aside className="sb">
      {/* Logo */}
      <div className="sb-logo">
        <div className="sb-logo-ic">📡</div>
        <div>
          <div className="sb-logo-tx">QRAttend</div>
          <div className="sb-logo-su">Hệ thống điểm danh QR</div>
        </div>
      </div>

      {/* User info */}
      <div className="sb-user">
        <div 
          className="sb-av" 
          style={{ 
            background: isAdmin ? 'linear-gradient(135deg,#3B82F6,#A855F7)' : 'linear-gradient(135deg,#22C55E,#14B8A6)' 
          }}
        >
          {isAdmin ? 'AD' : 'NM'}
        </div>
        <div>
          <div className="sb-un">{isAdmin ? 'Quản trị viên' : 'Nguyễn Minh'}</div>
          <div className="sb-ur">{isAdmin ? 'Admin · Hệ thống' : 'Giảng viên · Khoa CNTT'}</div>
        </div>
      </div>

      {/* Role toggle */}
      <div style={{ padding: '0 7px' }}>
        <div className="sb-toggle" style={{ marginTop: '10px' }}>
          <button 
            className={`sb-tb ${!isAdmin ? 'on' : ''}`} 
            onClick={() => setRole('gv')}
          >
            Giảng viên
          </button>
          <button 
            className={`sb-tb ${isAdmin ? 'on' : ''}`} 
            onClick={() => setRole('admin')}
          >
            Admin
          </button>
        </div>
      </div>

      {/* Navigation */}
      {!isAdmin ? (
        <div id="nav-gv">
          <div className="sb-sec">Tổng quan</div>
          <NavLink to="/" className={({ isActive }) => `sb-it ${isActive ? 'on' : ''}`} end>
            <span className="dot"></span>Dashboard
          </NavLink>
          <NavLink to="/sessions" className={({ isActive }) => `sb-it ${isActive ? 'on' : ''}`}>
            <span className="dot"></span>Buổi học
          </NavLink>

          <div className="sb-sec">Điểm danh</div>
          <NavLink to="/qr" className={({ isActive }) => `sb-it ${isActive ? 'on' : ''}`}>
            <span className="dot"></span>Mở QR điểm danh
          </NavLink>

          <div className="sb-sec">Báo cáo</div>
          <NavLink to="/report" className={({ isActive }) => `sb-it ${isActive ? 'on' : ''}`}>
            <span className="dot"></span>Báo cáo lớp
          </NavLink>
        </div>
      ) : (
        <div id="nav-admin">
          <div className="sb-sec">Tổng quan</div>
          <NavLink to="/admin" className={({ isActive }) => `sb-it ${isActive ? 'on' : ''}`} end>
            <span className="dot"></span>Dashboard Admin
          </NavLink>

          <div className="sb-sec">Quản lý danh mục</div>
          <NavLink to="/admin/tkb" className={({ isActive }) => `sb-it ${isActive ? 'on' : ''}`}>
            <span className="dot"></span>Nhập TKB
          </NavLink>
          <NavLink to="/admin/users" className={({ isActive }) => `sb-it ${isActive ? 'on' : ''}`}>
            <span className="dot"></span>Tài khoản
          </NavLink>
          <NavLink to="/admin/rooms" className={({ isActive }) => `sb-it ${isActive ? 'on' : ''}`}>
            <span className="dot"></span>Phòng học
          </NavLink>
          <NavLink to="/admin/subjects" className={({ isActive }) => `sb-it ${isActive ? 'on' : ''}`}>
            <span className="dot"></span>Môn học
          </NavLink>
          <NavLink to="/admin/semesters" className={({ isActive }) => `sb-it ${isActive ? 'on' : ''}`}>
            <span className="dot"></span>Học kỳ
          </NavLink>

          <div className="sb-sec">Báo cáo</div>
          <NavLink to="/admin/report" className={({ isActive }) => `sb-it ${isActive ? 'on' : ''}`}>
            <span className="dot"></span>Báo cáo toàn trường
          </NavLink>
        </div>
      )}

      <div className="sb-foot">
        <button className="sb-out" onClick={handleLogout}>⎋ &nbsp;Đăng xuất</button>
      </div>
    </aside>
  );
}
