import React, { useState, useEffect } from 'react';

export default function QR() {
  const [timerVal, setTimerVal] = useState(42);
  const [attCount, setAttCount] = useState(22);
  const [svData, setSvData] = useState([
    { code: '2251012345', nm: 'Nguyễn Văn An',   t: '07:02', status: 'present' },
    { code: '2251012346', nm: 'Trần Thị Bình',   t: '07:08', status: 'present' },
    { code: '2251012350', nm: 'Vũ Thị Hoa',      t: '07:05', status: 'present' },
    { code: '2251012351', nm: 'Đinh Văn Khoa',   t: '07:11', status: 'present' },
    { code: '2251012352', nm: 'Ngô Thị Lan',     t: '07:14', status: 'present' },
    { code: '2251012353', nm: 'Bùi Minh Long',   t: '07:16', status: 'present' },
    { code: '2251012347', nm: 'Lê Minh Cường',   t: '07:19', status: 'late'  },
    { code: '2251012354', nm: 'Đỗ Thị Mai',      t: '07:22', status: 'late'  },
    { code: '2251012355', nm: 'Phạm Quang Minh', t: null,    status: 'absent' },
    { code: '2251012356', nm: 'Lưu Thị Oanh',    t: null,    status: 'absent' },
    { code: '2251012357', nm: 'Trịnh Văn Phúc',  t: null,    status: 'absent' },
    { code: '2251012358', nm: 'Cao Thị Quỳnh',   t: null,    status: 'absent' },
    { code: '2251012359', nm: 'Đặng Minh Sơn',   t: null,    status: 'absent' },
    { code: '2251012360', nm: 'Lý Thu Thảo',     t: null,    status: 'absent' },
    { code: '2251012361', nm: 'Hồ Tuấn Vũ',      t: null,    status: 'absent' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStatusChange = (index, newStatus) => {
    const newData = [...svData];
    newData[index].status = newStatus;
    if (newStatus === 'present' && !newData[index].t) newData[index].t = '07:30';
    if (newStatus === 'late' && !newData[index].t) newData[index].t = '07:30';
    setSvData(newData);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimerVal(prev => (prev <= 1 ? 60 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pct = timerVal / 60;
  const circ = 151;
  const offset = circ * (1 - pct);
  const strokeColor = pct > .4 ? '#22C55E' : pct > .2 ? '#F59E0B' : '#EF4444';

  return (
    <>
      <div className="qr-screen" style={{ height: 'calc(100vh - 114px)' }}>
        <div className="qr-panel">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '2px' }}>Cấu trúc dữ liệu · CNTT-K22A</div>
            <div style={{ fontSize: '11px', color: 'var(--tx3)' }}>Tiết 1–3 · Phòng B201 · Buổi 5/15 · 02/09/2025</div>
          </div>

          <div className="qr-box">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="100" fill="white"/>
              <rect x="8"  y="8"  width="26" height="26" rx="3" fill="#111"/><rect x="13" y="13" width="16" height="16" rx="2" fill="white"/><rect x="16" y="16" width="10" height="10" rx="1" fill="#111"/>
              <rect x="66" y="8"  width="26" height="26" rx="3" fill="#111"/><rect x="71" y="13" width="16" height="16" rx="2" fill="white"/><rect x="74" y="16" width="10" height="10" rx="1" fill="#111"/>
              <rect x="8"  y="66" width="26" height="26" rx="3" fill="#111"/><rect x="13" y="71" width="16" height="16" rx="2" fill="white"/><rect x="16" y="74" width="10" height="10" rx="1" fill="#111"/>
              <rect x="40" y="8"  width="4" height="4" fill="#111"/><rect x="46" y="8"  width="4" height="4" fill="#111"/><rect x="52" y="8"  width="4" height="4" fill="#111"/>
              <rect x="40" y="14" width="4" height="4" fill="#111"/><rect x="52" y="14" width="4" height="4" fill="#111"/>
              <rect x="44" y="20" width="4" height="4" fill="#111"/><rect x="50" y="20" width="4" height="4" fill="#111"/>
              <rect x="8"  y="40" width="4" height="4" fill="#111"/><rect x="14" y="40" width="4" height="4" fill="#111"/><rect x="20" y="40" width="4" height="4" fill="#111"/>
              <rect x="8"  y="46" width="4" height="4" fill="#111"/><rect x="20" y="46" width="4" height="4" fill="#111"/>
              <rect x="8"  y="52" width="4" height="4" fill="#111"/><rect x="14" y="52" width="4" height="4" fill="#111"/>
              <rect x="40" y="40" width="4" height="4" fill="#111"/><rect x="48" y="40" width="4" height="4" fill="#111"/><rect x="56" y="40" width="4" height="4" fill="#111"/><rect x="64" y="40" width="4" height="4" fill="#111"/>
              <rect x="44" y="44" width="4" height="4" fill="#111"/><rect x="52" y="44" width="4" height="4" fill="#111"/><rect x="60" y="44" width="4" height="4" fill="#111"/>
              <rect x="40" y="48" width="4" height="4" fill="#111"/><rect x="56" y="48" width="4" height="4" fill="#111"/>
              <rect x="44" y="52" width="4" height="4" fill="#111"/><rect x="48" y="52" width="4" height="4" fill="#111"/><rect x="64" y="52" width="4" height="4" fill="#111"/>
              <rect x="68" y="40" width="4" height="4" fill="#111"/><rect x="80" y="40" width="4" height="4" fill="#111"/>
              <rect x="74" y="46" width="4" height="4" fill="#111"/><rect x="86" y="46" width="4" height="4" fill="#111"/>
              <rect x="68" y="52" width="4" height="4" fill="#111"/><rect x="76" y="52" width="4" height="4" fill="#111"/>
              <rect x="40" y="66" width="4" height="4" fill="#111"/><rect x="48" y="66" width="4" height="4" fill="#111"/><rect x="56" y="66" width="4" height="4" fill="#111"/>
              <rect x="44" y="72" width="4" height="4" fill="#111"/><rect x="60" y="72" width="4" height="4" fill="#111"/>
              <rect x="40" y="78" width="4" height="4" fill="#111"/><rect x="52" y="78" width="4" height="4" fill="#111"/><rect x="64" y="78" width="4" height="4" fill="#111"/>
              <rect x="68" y="66" width="4" height="4" fill="#111"/><rect x="80" y="66" width="4" height="4" fill="#111"/>
              <rect x="72" y="72" width="4" height="4" fill="#111"/><rect x="84" y="72" width="4" height="4" fill="#111"/>
              <rect x="68" y="78" width="4" height="4" fill="#111"/><rect x="76" y="78" width="4" height="4" fill="#111"/><rect x="88" y="78" width="4" height="4" fill="#111"/>
            </svg>
          </div>

          <div className="timer-wrap">
            <div className="timer-ring">
              <svg width="56" height="56" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="24" fill="none" stroke="#1E2535" strokeWidth="4"/>
                <circle cx="28" cy="28" r="24" fill="none" stroke={strokeColor} strokeWidth="4"
                        strokeDasharray="151" strokeDashoffset={offset} strokeLinecap="round" />
              </svg>
              <div className="timer-num">{timerVal}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: '600' }}>Làm mới sau <span style={{ color: 'var(--gr)', fontFamily: 'var(--mo)' }}>{timerVal}s</span></div>
              <div style={{ fontSize: '10px', color: 'var(--tx3)' }}>Token tự động đổi mỗi 60s</div>
            </div>
          </div>

          <div className="qr-stat"><div className="pulse"></div>Buổi học đang diễn ra</div>

          <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
            <button className="btn btn-a" style={{ flex: 1, fontSize: '12px' }} onClick={() => setIsModalOpen(true)}>⚡ Yêu cầu Check-out</button>
            <button className="btn btn-d" style={{ flex: 1, fontSize: '12px' }}>⏹ Kết thúc buổi</button>
          </div>
        </div>

        {/* Live attendance panel */}
        <div className="att-panel">
          <div className="att-head">
            <div>
              <div style={{ fontSize: '11px', color: 'var(--tx3)', marginBottom: '1px' }}>Đã điểm danh</div>
              <div><span className="att-cnt">{attCount}</span><span style={{ color: 'var(--tx3)', fontSize: '13px' }}> / 40</span></div>
            </div>
            <div style={{ display: 'flex', gap: '5px', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span className="bdg b-pr">✓ Đúng giờ: 18</span>
              <span className="bdg b-lt">⏰ Muộn: 4</span>
            </div>
          </div>
          <div className="att-body">
            {svData.map((s, i) => (
              <div className="att-row" key={i}>
                <div className="att-av">{s.nm.split(' ').pop()[0]}</div>
                <div style={{ flex: 1 }}>
                  <div className="att-nm">{s.nm}</div>
                  <div style={{ fontSize: '10px', color: 'var(--tx3)', fontFamily: 'var(--mo)' }}>{s.code}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {s.status === 'present' && <span className="att-ti">{s.t}</span>}
                  {s.status === 'late' && <>
                    <span className="bdg b-lt" style={{ fontSize: '10px' }}>Muộn</span>
                    <span className="att-ti">{s.t}</span>
                  </>}
                  <select 
                    className="fi" 
                    style={{ width: '85px', padding: '4px 6px', fontSize: '11px', background: 'var(--bg4)' }}
                    value={s.status}
                    onChange={(e) => handleStatusChange(i, e.target.value)}
                  >
                    <option value="present">Có mặt</option>
                    <option value="late">Muộn</option>
                    <option value="absent">Vắng</option>
                    <option value="excused">Có phép</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <div className={`mo-ov ${isModalOpen ? 'open' : ''}`} onClick={(e) => { if (e.target.className.includes('mo-ov')) setIsModalOpen(false) }}>
        <div className="mo" onClick={e => e.stopPropagation()}>
          <div className="mo-t">⚡ Yêu cầu Check-out tức thời</div>
          <div className="mo-su">Kích hoạt khi nghi ngờ có SV về sớm. Buổi học vẫn tiếp tục bình thường sau khi check-out đóng.</div>
          <div style={{ background: 'rgba(245,158,11,.08)', border: '1px solid rgba(245,158,11,.25)', borderRadius: '8px', padding: '9px 12px', fontSize: '12px', color: 'var(--am)', marginBottom: '14px' }}>
            ⚠️ SV không quét trong thời gian cho phép → <strong>left_early = 1</strong>. Trạng thái vẫn là "Có mặt".
          </div>
          <div className="fg"><label className="fl">Thời gian cho SV quét (phút)</label><input type="number" className="fi" defaultValue="5" min="2" max="15" /></div>
          <div className="fg"><label className="fl">Ghi chú lý do (tuỳ chọn)</label><input type="text" className="fi" placeholder="VD: Nghi ngờ SV về sớm tiết 3..." /></div>
          <div style={{ background: 'var(--bg3)', border: '1px solid var(--bd)', borderRadius: '8px', padding: '9px 12px', fontSize: '11px', color: 'var(--tx3)', marginBottom: '14px' }}>
            22 SV đã check-in · SV không quét trong 5 phút → <span style={{ color: 'var(--rd)' }}>left_early = 1</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-s" style={{ flex: 1 }} onClick={() => setIsModalOpen(false)}>Huỷ</button>
            <button className="btn" style={{ flex: 1, background: 'var(--am)', color: '#000', fontFamily: 'var(--fn)', fontSize: '12px', fontWeight: '600' }} onClick={() => setIsModalOpen(false)}>⚡ Kích hoạt</button>
          </div>
        </div>
      </div>
    </>
  );
}
