import React, { useRef } from 'react';

export default function AdminSemesters() {
  const fileInputRef = useRef(null);

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`Đã chọn file: ${file.name}. Đang tiến hành import dữ liệu học kỳ...`);
      e.target.value = null;
    }
  };

  return (
    <div className="page active">
      <div style={{ display: 'flex', gap: '10px', marginBottom: '14px', alignItems: 'center' }}>
        <div className="srch"><span className="srch-ic">🔍</span><input placeholder="Tên học kỳ..." /></div>
        <select className="fi" style={{ width: '160px' }} defaultValue="Tất cả trạng thái">
          <option>Tất cả trạng thái</option>
          <option>Đang diễn ra</option>
          <option>Sắp tới</option>
          <option>Đã kết thúc</option>
        </select>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept=".xlsx, .xls, .csv" onChange={handleFileChange} />
          <button className="btn btn-s btn-sm" onClick={handleImportClick}>Import Excel</button>
          <button className="btn btn-p btn-sm">+ Thêm học kỳ</button>
        </div>
      </div>
      <div className="card">
        <table className="tbl">
          <thead>
            <tr>
              <th>Mã học kỳ</th>
              <th>Tên học kỳ</th>
              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span style={{ fontWeight: '500' }}>HK1_2025</span></td>
              <td>Học kỳ 1 năm học 2025-2026</td>
              <td>05/09/2025</td>
              <td>15/01/2026</td>
              <td><span className="bdg b-op">Sắp tới</span></td>
              <td><button className="btn btn-s btn-sm">Sửa</button></td>
            </tr>
            <tr>
              <td><span style={{ fontWeight: '500' }}>HK2_2024</span></td>
              <td>Học kỳ 2 năm học 2024-2025</td>
              <td>15/02/2025</td>
              <td>30/06/2025</td>
              <td><span className="bdg b-op">Đang diễn ra</span></td>
              <td><button className="btn btn-s btn-sm">Sửa</button></td>
            </tr>
            <tr>
              <td><span style={{ fontWeight: '500' }}>HK1_2024</span></td>
              <td>Học kỳ 1 năm học 2024-2025</td>
              <td>05/09/2024</td>
              <td>15/01/2025</td>
              <td><span className="bdg b-ca">Đã kết thúc</span></td>
              <td><button className="btn btn-s btn-sm">Sửa</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
