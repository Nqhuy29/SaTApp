import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="page active">
      <div className="sg">
        <div className="sc gr"><div className="sc-ic">📅</div><div className="sc-lb">Buổi hôm nay</div><div className="sc-vl gr">2</div><div className="sc-su">1 đang mở · 1 sắp tới</div></div>
        <div className="sc bl"><div className="sc-ic">📚</div><div className="sc-lb">Tuần này</div><div className="sc-vl bl">5</div><div className="sc-su">3 môn khác nhau</div></div>
        <div className="sc am"><div className="sc-ic">📊</div><div className="sc-lb">Học kỳ này</div><div className="sc-vl am">48</div><div className="sc-su">12 xong · 36 còn lại</div></div>
        <div className="sc pu"><div className="sc-ic">🎯</div><div className="sc-lb">Chuyên cần TB</div><div className="sc-vl pu">87%</div><div className="sc-su">Toàn bộ lớp</div></div>
      </div>

      <div className="g2">
        <div>
          {/* Today's sessions */}
          <div className="card">
            <div className="card-h">
              <div><div className="card-t">Buổi học hôm nay</div><div className="card-su">02/09/2025 · Thứ 3</div></div>
            </div>
            <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ background: 'var(--bg3)', border: '1px solid rgba(34,197,94,.2)', borderRadius: '10px', padding: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '2px' }}>Cấu trúc dữ liệu</div>
                    <div style={{ fontSize: '11px', color: 'var(--tx3)' }}>CNTT-K22A · Tiết 1–3 · B201 · Buổi 5/15</div>
                  </div>
                  <span className="bdg b-op">Đang mở</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="pb" style={{ flex: 1 }}><div className="pf gr" style={{ width: '55%' }}></div></div>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--gr)', fontFamily: 'var(--mo)' }}>22/40</span>
                  <button className="btn btn-s btn-sm" onClick={() => navigate('/qr')}>Xem QR</button>
                </div>
              </div>
              <div style={{ background: 'var(--bg3)', border: '1px solid var(--bd)', borderRadius: '10px', padding: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '2px' }}>Lập trình Web</div>
                    <div style={{ fontSize: '11px', color: 'var(--tx3)' }}>CNTT-K23B · Tiết 7–9 · A105 · Buổi 3/15</div>
                  </div>
                  <span className="bdg b-sc">Sắp tới</span>
                </div>
                <button 
                  className="btn btn-p" 
                  style={{ width: '100%', fontSize: '12px', opacity: 0.6, cursor: 'not-allowed' }} 
                  onClick={() => alert('Đang có buổi học mở (Cấu trúc dữ liệu). Vui lòng kết thúc buổi học hiện tại trước khi tạo mã QR mới!')}
                >
                  ▶ Tạo mã QR
                </button>
              </div>
            </div>
          </div>

          {/* Semester progress */}
          <div className="card">
            <div className="card-h"><div className="card-t">Tiến độ học kỳ</div></div>
            <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '11px' }}>
              <div><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}><span style={{ fontWeight: '500' }}>Cấu trúc dữ liệu</span><span style={{ color: 'var(--tx3)', fontFamily: 'var(--mo)' }}>5/15</span></div><div className="pb"><div className="pf gr" style={{ width: '33%' }}></div></div></div>
              <div><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}><span style={{ fontWeight: '500' }}>Lập trình Web</span><span style={{ color: 'var(--tx3)', fontFamily: 'var(--mo)' }}>3/15</span></div><div className="pb"><div className="pf gr" style={{ width: '20%' }}></div></div></div>
              <div><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}><span style={{ fontWeight: '500' }}>Mạng máy tính</span><span style={{ color: 'var(--tx3)', fontFamily: 'var(--mo)' }}>4/15</span></div><div className="pb"><div className="pf gr" style={{ width: '27%' }}></div></div></div>
            </div>
          </div>
        </div>

        <div>
          {/* Weekly schedule */}
          <div className="card">
            <div className="card-h"><div className="card-t">Lịch tuần này</div></div>
            <table className="tbl">
              <tbody>
                <tr><td style={{ color: 'var(--tx3)', fontSize: '11px' }}>T2</td><td>CTDL · K22A · B201 · T.1–3</td><td><span className="bdg b-cl">Xong</span></td></tr>
                <tr><td style={{ color: 'var(--gr)', fontSize: '11px', fontWeight: '600' }}>T3</td><td style={{ fontWeight: '500' }}>CTDL · K22A · B201 · T.1–3</td><td><span className="bdg b-op">Hôm nay</span></td></tr>
                <tr><td style={{ color: 'var(--tx3)', fontSize: '11px' }}>T3</td><td>LT Web · K23B · A105 · T.7–9</td><td><span className="bdg b-sc">Sắp tới</span></td></tr>
                <tr><td style={{ color: 'var(--tx3)', fontSize: '11px' }}>T5</td><td>Mạng MT · K22B · C301 · T.4–6</td><td><span className="bdg b-sc">Sắp tới</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
