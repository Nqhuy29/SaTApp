import React, { useRef } from 'react';

export default function AdminUsers() {
  const fileInputRef = useRef(null);

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`Đã chọn file: ${file.name}. Đang tiến hành import dữ liệu tài khoản...`);
      e.target.value = null;
    }
  };

  return (
    <div className="page active">
      <div style={{ display: 'flex', gap: '10px', marginBottom: '14px', alignItems: 'center' }}>
        <div className="srch"><span className="srch-ic">🔍</span><input placeholder="Tên, email, mã..." /></div>
        <select className="fi" style={{ width: '160px' }} defaultValue="Tất cả vai trò"><option>Tất cả vai trò</option><option>Admin</option><option>Giảng viên</option><option>Sinh viên</option></select>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept=".xlsx, .xls, .csv" onChange={handleFileChange} />
          <button className="btn btn-s btn-sm" onClick={handleImportClick}>Import Excel</button>
          <button className="btn btn-p btn-sm">+ Thêm tài khoản</button>
        </div>
      </div>
      <div className="card">
        <table className="tbl">
          <thead><tr><th>Họ tên</th><th>Email</th><th>Vai trò</th><th>Khoa / Lớp</th><th>Trạng thái</th><th></th></tr></thead>
          <tbody>
            <tr><td><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'linear-gradient(135deg,var(--bl),var(--pu))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '600' }}>NM</div><span style={{ fontWeight: '500' }}>Nguyễn Minh</span></div></td><td style={{ fontSize: '11px', color: 'var(--tx3)' }}>nguyenminh@uni.edu.vn</td><td><span className="bdg b-gv">Giảng viên</span></td><td style={{ fontSize: '11px' }}>Khoa CNTT</td><td><span className="bdg b-op">Hoạt động</span></td><td><button className="btn btn-s btn-sm">Sửa</button></td></tr>
            <tr><td><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'linear-gradient(135deg,var(--gr),var(--tl))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '600' }}>VA</div><span style={{ fontWeight: '500' }}>Nguyễn Văn An</span></div></td><td style={{ fontSize: '11px', color: 'var(--tx3)' }}>2251012345@uni.edu.vn</td><td><span className="bdg b-sv">Sinh viên</span></td><td style={{ fontSize: '11px' }}>CNTT-K22A</td><td><span className="bdg b-op">Hoạt động</span></td><td><button className="btn btn-s btn-sm">Sửa</button></td></tr>
            <tr><td><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'linear-gradient(135deg,#6B7280,#4B5563)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '600' }}>TH</div><span style={{ fontWeight: '500' }}>Trần Hương</span></div></td><td style={{ fontSize: '11px', color: 'var(--tx3)' }}>tranhung@uni.edu.vn</td><td><span className="bdg b-gv">Giảng viên</span></td><td style={{ fontSize: '11px' }}>Khoa Toán</td><td><span className="bdg b-ca">Khoá</span></td><td><button className="btn btn-s btn-sm">Mở khoá</button></td></tr>
            <tr><td><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'linear-gradient(135deg,var(--am),#D97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '600' }}>QT</div><span style={{ fontWeight: '500' }}>Quản trị viên</span></div></td><td style={{ fontSize: '11px', color: 'var(--tx3)' }}>admin@uni.edu.vn</td><td><span className="bdg b-ad">Admin</span></td><td style={{ fontSize: '11px' }}>—</td><td><span className="bdg b-op">Hoạt động</span></td><td><button className="btn btn-s btn-sm">Sửa</button></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
