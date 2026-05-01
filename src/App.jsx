import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import QR from './pages/QR';
import Sessions from './pages/Sessions';
import Attendance from './pages/Attendance';
import Report from './pages/Report';
import AdminDashboard from './pages/AdminDashboard';
import AdminTkb from './pages/AdminTkb';
import AdminUsers from './pages/AdminUsers';
import AdminRooms from './pages/AdminRooms';
import AdminSubjects from './pages/AdminSubjects';
import AdminSemesters from './pages/AdminSemesters';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            {/* GV Routes */}
            <Route index element={<Dashboard />} />
            <Route path="qr" element={<QR />} />
            <Route path="sessions" element={<Sessions />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="report" element={<Report />} />
            
            {/* Admin Routes */}
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/tkb" element={<AdminTkb />} />
            <Route path="admin/users" element={<AdminUsers />} />
            <Route path="admin/rooms" element={<AdminRooms />} />
            <Route path="admin/subjects" element={<AdminSubjects />} />
            <Route path="admin/semesters" element={<AdminSemesters />} />
            <Route path="admin/report" element={<div>Báo cáo toàn trường</div>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
