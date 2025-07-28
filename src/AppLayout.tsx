import { Aside, useWindowWidth } from './Home';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

export default function AppLayout() {
  const [minimized, setMinimized] = useState(false);

  const width = useWindowWidth();
  const isMobile = width < 1000;

  return (
    <div className="app">
      <Aside
        isMobile={isMobile}
        minimized={minimized}
        setMinimized={setMinimized}
      />
      <main
        className="main-bar"
        style={{ marginLeft: minimized ? '120px' : '' }}>
        <Outlet />
      </main>
    </div>
  );
}
