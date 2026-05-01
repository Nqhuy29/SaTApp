import React, { useRef } from 'react';

export default function AdminSubjects() {
  const fileInputRef = useRef(null);

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`Đã chọn file: ${file.name}. Đang tiến hành import dữ liệu môn học...`);
      e.target.value = null;
    }
  };

  return (
    <div className="page active">
      <div style={{ display: 'flex', gap: '10px', marginBottom: '14px', alignItems: 'center' }}>
        <div className="srch"><span className="srch-ic">🔍</span><input placeholder="Mã môn, tên môn..." /></div>
        <select className="fi" style={{ width: '160px' }} defaultValue="Tất cả khoa">
          <option>Tất cả khoa</option>
          <option>Khoa CNTT</option>
          <option>Khoa Kinh tế</option>
          <option>Khoa Ngoại ngữ</option>
        </select>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept=".xlsx, .xls, .csv" onChange={handleFileChange} />
          <button className="btn btn-s btn-sm" onClick={handleImportClick}>Import Excel</button>
          <button className="btn btn-p btn-sm">+ Thêm môn học</button>
        </div>
      </div>
      <div className="card">
        <table className="tbl">
          <thead>
            <tr>
              <th>Mã môn</th>
              <th>Tên môn</th>
              <th>Số TC</th>
              <th>Khoa quản lý</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span style={{ fontWeight: '500' }}>INT1339</span></td>
              <td>Lập trình Web</td>
              <td>3</td>
              <td>Khoa CNTT</td>
              <td><span className="bdg b-op">Đang giảng dạy</span></td>
              <td><button className="btn btn-s btn-sm">Sửa</button></td>
            </tr>
            <tr>
              <td><span style={{ fontWeight: '500' }}>INT1440</span></td>
              <td>Cơ sở dữ liệu</td>
              <td>3</td>
              <td>Khoa CNTT</td>
              <td><span className="bdg b-op">Đang giảng dạy</span></td>
              <td><button className="btn btn-s btn-sm">Sửa</button></td>
            </tr>
            <tr>
              <td><span style={{ fontWeight: '500' }}>ECO1001</span></td>
              <td>Kinh tế vi mô</td>
              <td>2</td>
              <td>Khoa Kinh tế</td>
              <td><span className="bdg b-op">Đang giảng dạy</span></td>
              <td><button className="btn btn-s btn-sm">Sửa</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
