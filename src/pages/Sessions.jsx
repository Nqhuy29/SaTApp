import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sessions() {
  const navigate = useNavigate();

  return (
    <div className="page active">
      <div style={{ display: 'flex', gap: '10px', marginBottom: '14px', alignItems: 'center' }}>
        <select className="fi" style={{ width: '230px' }} defaultValue="Cấu trúc dữ liệu · K22A">
          <option>Cấu trúc dữ liệu · K22A</option>
          <option>Lập trình Web · K23B</option>
          <option>Mạng máy tính · K22B</option>
        </select>
        <span style={{ color: 'var(--tx3)', fontSize: '12px' }}>15 buổi · 5 đã xong · 10 còn lại</span>
      </div>
      <div className="card">
        <table className="tbl">
          <thead>
            <tr><th>Buổi</th><th>Ngày</th><th>Tiết</th><th>Phòng</th><th>Có mặt</th><th>Muộn</th><th>Trạng thái</th><th></th></tr>
          </thead>
          <tbody>
            <tr><td style={{ fontFamily: 'var(--mo)', fontWeight: '600' }}>1/15</td><td>19/08</td><td>1–3</td><td>B201</td><td><span style={{ color: 'var(--gr)', fontWeight: '600' }}>38/40</span> <span style={{ color: 'var(--tx3)' }}>95%</span></td><td style={{ color: 'var(--tx3)' }}>2</td><td><span className="bdg b-cl">Đã xong</span></td><td><button className="btn btn-s btn-sm" onClick={() => navigate('/attendance')}>Xem</button></td></tr>
            <tr><td style={{ fontFamily: 'var(--mo)', fontWeight: '600' }}>2/15</td><td>26/08</td><td>1–3</td><td>B201</td><td><span style={{ color: 'var(--gr)', fontWeight: '600' }}>35/40</span> <span style={{ color: 'var(--tx3)' }}>87%</span></td><td style={{ color: 'var(--tx3)' }}>5</td><td><span className="bdg b-cl">Đã xong</span></td><td><button className="btn btn-s btn-sm" onClick={() => navigate('/attendance')}>Xem</button></td></tr>
            <tr style={{ background: 'rgba(34,197,94,.02)' }}><td style={{ fontFamily: 'var(--mo)', fontWeight: '600', color: 'var(--gr)' }}>5/15</td><td style={{ color: 'var(--gr)' }}>02/09</td><td>1–3</td><td>B201</td><td><span style={{ color: 'var(--gr)', fontWeight: '600' }}>22/40</span> <span style={{ color: 'var(--am)' }}>55%</span></td><td style={{ color: 'var(--am)' }}>4</td><td><span className="bdg b-op">Đang mở</span></td><td><button className="btn btn-p btn-sm" onClick={() => navigate('/qr')}>Xem QR</button></td></tr>
            <tr><td style={{ fontFamily: 'var(--mo)', color: 'var(--tx3)' }}>6/15</td><td style={{ color: 'var(--tx3)' }}>09/09</td><td>1–3</td><td>B201</td><td style={{ color: 'var(--tx3)' }}>—</td><td style={{ color: 'var(--tx3)' }}>—</td><td><span className="bdg b-sc">Sắp tới</span></td><td><button className="btn btn-p btn-sm" style={{ opacity: 0.6, cursor: 'not-allowed' }} onClick={() => alert('Vui lòng kết thúc buổi học đang mở trước khi tạo mã QR mới!')}>▶ Tạo mã QR</button></td></tr>
            <tr><td style={{ fontFamily: 'var(--mo)', color: 'var(--tx3)' }}>7/15</td><td style={{ color: 'var(--tx3)' }}>16/09</td><td>1–3</td><td>B201</td><td style={{ color: 'var(--tx3)' }}>—</td><td style={{ color: 'var(--tx3)' }}>—</td><td><span className="bdg b-sc">Sắp tới</span></td><td><button className="btn btn-s btn-sm" style={{ opacity: 0.6, cursor: 'not-allowed' }} onClick={() => alert('Vui lòng kết thúc buổi học đang mở trước khi tạo mã QR mới!')}>Tạo mã QR</button></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
