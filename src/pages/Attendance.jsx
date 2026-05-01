import React, { useState } from 'react';

export default function Attendance() {
  const [svData, setSvData] = useState([
    { code: '2251012345', nm: 'Nguyễn Văn An',   in: '07:02', late: 'Đúng giờ', gps: '✓ 12m', out: '09:24', early: '—', status: 'present' },
    { code: '2251012346', nm: 'Trần Thị Bình',   in: '07:08', late: 'Đúng giờ', gps: '✓ 8m',  out: '—',     early: '—', status: 'present' },
    { code: '2251012347', nm: 'Lê Minh Cường',   in: '07:19', late: '+19 phút', gps: '✓ 6m',  out: '—',     early: '—', status: 'late' },
    { code: '2251012350', nm: 'Vũ Thị Hoa',      in: '07:05', late: 'Đúng giờ', gps: '✗ 78m', out: 'Không quét', early: 'Về sớm', status: 'present' },
    { code: '2251012348', nm: 'Phạm Thu Dung',   in: '—',     late: '—',        gps: '—',     out: '—',     early: '—', status: 'absent' },
    { code: '2251012349', nm: 'Hoàng Văn Em',    in: '—',     late: '—',        gps: '—',     out: '—',     early: '—', status: 'excused' },
  ]);

  const handleStatusChange = (index, newStatus) => {
    const newData = [...svData];
    newData[index].status = newStatus;
    setSvData(newData);
  };

  return (
    <div className="page active">
      <div style={{ display: 'flex', gap: '10px', marginBottom: '14px', alignItems: 'center' }}>
        <div className="srch"><span className="srch-ic">🔍</span><input placeholder="Tìm theo tên, MSSV..." /></div>
        <select className="fi" style={{ width: '170px' }} defaultValue="Tất cả">
          <option>Tất cả</option><option>Có mặt</option><option>Vắng</option><option>Có phép</option><option>Muộn</option>
        </select>
        <span style={{ color: 'var(--tx3)', fontSize: '11px' }}>Buổi 5/15 · 02/09/2025 · CTDL · 22/40</span>
      </div>
      <div className="card">
        <table className="tbl">
          <thead>
            <tr><th>MSSV</th><th>Họ tên</th><th>Check-in</th><th>Phút muộn</th><th>GPS</th><th>Check-out</th><th>Về sớm</th><th>Trạng thái</th></tr>
          </thead>
          <tbody>
            {svData.map((s, i) => (
              <tr key={i}>
                <td style={{ fontFamily: 'var(--mo)' }}>{s.code}</td>
                <td style={{ fontWeight: '500' }}>{s.nm}</td>
                <td style={{ fontFamily: 'var(--mo)', color: s.status === 'absent' ? 'var(--tx3)' : s.status === 'late' ? 'var(--am)' : 'var(--tx3)' }}>{s.in}</td>
                <td style={{ fontSize: '11px', color: s.status === 'late' ? 'var(--am)' : 'var(--gr)' }}>{s.late}</td>
                <td style={{ fontSize: '11px', color: s.gps.includes('✗') ? 'var(--rd)' : s.gps === '—' ? 'var(--tx3)' : 'var(--gr)' }}>{s.gps}</td>
                <td style={{ fontSize: '11px', fontFamily: 'var(--mo)', color: s.out === 'Không quét' ? 'var(--tx3)' : s.out !== '—' ? 'var(--gr)' : 'var(--tx3)' }}>{s.out}</td>
                <td style={{ fontSize: '11px', color: s.early === 'Về sớm' ? 'var(--rd)' : 'var(--tx3)', fontWeight: s.early === 'Về sớm' ? '600' : 'normal' }}>{s.early}</td>
                <td>
                  <select 
                    className="fi" 
                    style={{ width: '90px', padding: '4px 6px', fontSize: '11px', background: 'var(--bg4)' }}
                    value={s.status}
                    onChange={(e) => handleStatusChange(i, e.target.value)}
                  >
                    <option value="present">Có mặt</option>
                    <option value="late">Muộn</option>
                    <option value="absent">Vắng</option>
                    <option value="excused">Có phép</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
