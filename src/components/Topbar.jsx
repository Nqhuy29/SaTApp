import React from 'react';
import { useLocation } from 'react-router-dom';

const PAGE_TITLES = {
  '/':                  ['Dashboard',                   'Thứ 3, 02/09/2025 · HK1-2024-2025'],
  '/sessions':          ['Buổi học · CTDL · K22A',      '15 buổi · HK1-2024-2025'],
  '/qr':                ['QR Điểm danh · Buổi 5/15',    'CTDL · K22A · Đang diễn ra · B201'],
  '/attendance':        ['Danh sách điểm danh',          'Buổi 5/15 · 02/09/2025 · CTDL'],
  '/report':            ['Báo cáo lớp',                  'CTDL · CNTT-K22A · HK1-2024-2025'],
  '/admin':             ['Dashboard Admin',              'HK1-2024-2025 · Toàn trường'],
  '/admin/tkb':         ['Nhập Thời khóa biểu',          'Upload file TKB từ trường'],
  '/admin/users':       ['Quản lý Tài khoản',            'Admin · Giảng viên · Sinh viên'],
  '/admin/rooms':       ['Quản lý Phòng học',            '4 phòng · 1 chưa có GPS'],
  '/admin/subjects':    ['Quản lý Môn học',              '48 môn học'],
  '/admin/semesters':   ['Quản lý Học kỳ',               '1 học kỳ đang active'],
  '/admin/report':      ['Báo cáo Toàn trường',          'HK1-2024-2025'],
};

export default function Topbar() {
  const location = useLocation();
  const [title, sub] = PAGE_TITLES[location.pathname] || ['Dashboard', ''];

  return (
    <div className="topbar">
      <div>
        <div className="tb-title" id="pgTitle">{title}</div>
        <div className="tb-sub" id="pgSub">{sub}</div>
      </div>
      <div className="tb-acts">
        <div className="srch">
          <span className="srch-ic">🔍</span>
          <input placeholder="Tìm kiếm..." />
        </div>
        <button className="btn btn-s" style={{ padding: '7px 10px' }}>🔔</button>
      </div>
    </div>
  );
}
