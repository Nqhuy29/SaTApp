import React from 'react';

export default function AdminTkb() {
  return (
    <div className="page active">
      <div className="g2">
        <div className="card">
          <div className="card-h"><div className="card-t">Upload file TKB</div></div>
          <div style={{ padding: '14px' }}>
            <div className="fg">
              <label className="fl">Học kỳ</label>
              <select className="fi" defaultValue="HK1-2024-2025"><option>HK1-2024-2025</option><option>HK2-2024-2025</option></select>
            </div>
            <div className="upz">
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>📁</div>
              <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>Kéo thả file Excel / CSV</div>
              <div style={{ fontSize: '11px', color: 'var(--tx3)' }}>hoặc nhấn để chọn · .xlsx · .csv · ≤ 10MB</div>
            </div>
            <button className="btn btn-s" style={{ width: '100%', marginTop: '10px', fontSize: '12px' }}>🔗 Đồng bộ từ hệ thống trường</button>
          </div>
        </div>
        <div className="card">
          <div className="card-h">
            <div><div className="card-t">Preview TKB đã parse</div><div className="card-su">142 dòng · <span style={{ color: 'var(--rd)' }}>2 lỗi</span></div></div>
            <button className="btn btn-p btn-sm">Xác nhận → sinh 1,840 buổi</button>
          </div>
          <table className="tbl" style={{ fontSize: '11px' }}>
            <thead><tr><th>Lớp</th><th>Môn</th><th>GV</th><th>Phòng</th><th>Thứ</th><th>Tuần</th><th>Buổi</th><th></th></tr></thead>
            <tbody>
              <tr><td>CNTT-K22A</td><td>CTDL</td><td>Ng.Minh</td><td>B201</td><td>3</td><td>1–15</td><td style={{ color: 'var(--gr)', fontWeight: '700' }}>15</td><td style={{ color: 'var(--gr)' }}>✓</td></tr>
              <tr><td>CNTT-K23B</td><td>LT Web</td><td>Ng.Minh</td><td>A105</td><td>3</td><td>1–15</td><td style={{ color: 'var(--gr)', fontWeight: '700' }}>15</td><td style={{ color: 'var(--gr)' }}>✓</td></tr>
              <tr style={{ background: 'rgba(239,68,68,.06)' }}><td style={{ color: 'var(--rd)' }}>KT-K22A</td><td>KT vĩ mô</td><td>Tr.Hương</td><td>D401</td><td>2</td><td>2–14</td><td style={{ color: 'var(--rd)' }}>!</td><td style={{ color: 'var(--rd)', fontSize: '10px' }}>Phòng không tồn tại</td></tr>
              <tr style={{ background: 'rgba(239,68,68,.06)' }}><td style={{ color: 'var(--rd)' }}>KT-K23A</td><td>Tài chính</td><td>—</td><td>C201</td><td>4</td><td>1–14</td><td style={{ color: 'var(--rd)' }}>!</td><td style={{ color: 'var(--rd)', fontSize: '10px' }}>GV không tồn tại</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
