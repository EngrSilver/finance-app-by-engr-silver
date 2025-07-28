import { Aside, useWindowWidth } from './Home';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  const width = useWindowWidth();
  const isMobile = width < 1000;

  return (
    <div className="app">
      <Aside isMobile={isMobile} />
      <main className="main-bar ">
        <Outlet />
      </main>
    </div>
  );
}
