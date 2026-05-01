import React, { useRef } from 'react';

export default function AdminRooms() {
  const fileInputRef = useRef(null);

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`Đã chọn file: ${file.name}. Đang tiến hành import dữ liệu phòng học...`);
      e.target.value = null;
    }
  };

  return (
    <div className="page active">
      <div style={{ display: 'flex', gap: '10px', marginBottom: '14px', alignItems: 'center' }}>
        <div className="srch"><span className="srch-ic">🔍</span><input placeholder="Tên phòng..." /></div>
        <select className="fi" style={{ width: '160px' }} defaultValue="Tất cả tòa nhà">
          <option>Tất cả tòa nhà</option>
          <option>Tòa A</option>
          <option>Tòa B</option>
          <option>Tòa C</option>
        </select>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept=".xlsx, .xls, .csv" onChange={handleFileChange} />
          <button className="btn btn-s btn-sm" onClick={handleImportClick}>Import Excel</button>
          <button className="btn btn-p btn-sm">+ Thêm phòng</button>
        </div>
      </div>
      <div className="card">
        <table className="tbl">
          <thead>
            <tr>
              <th>Tên phòng</th>
              <th>Tòa nhà</th>
              <th>Sức chứa</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span style={{ fontWeight: '500' }}>P.A101</span></td>
              <td>Tòa A</td>
              <td>50</td>
              <td><span className="bdg b-op">Đang sử dụng</span></td>
              <td><button className="btn btn-s btn-sm">Sửa</button></td>
            </tr>
            <tr>
              <td><span style={{ fontWeight: '500' }}>P.B205</span></td>
              <td>Tòa B</td>
              <td>120</td>
              <td><span className="bdg b-op">Đang sử dụng</span></td>
              <td><button className="btn btn-s btn-sm">Sửa</button></td>
            </tr>
            <tr>
              <td><span style={{ fontWeight: '500' }}>P.C302</span></td>
              <td>Tòa C</td>
              <td>40</td>
              <td><span className="bdg b-ca">Bảo trì</span></td>
              <td><button className="btn btn-s btn-sm">Sửa</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
