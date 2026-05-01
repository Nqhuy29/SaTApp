import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout() {
  const [role, setRole] = useState('gv');

  return (
    <>
      <Sidebar role={role} setRole={setRole} />
      <div className="main">
        <Topbar />
        <div className="content">
          <Outlet context={{ role }} />
        </div>
      </div>
    </>
  );
}
