import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { useVolStore } from './store/store';
import Info from './pages/Info';

export function App() {
  const { loadAll } = useVolStore();
  let check = true;
  useEffect(() => {
    if (check) {
      loadAll();
      check = false;
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/info/:id" element={<Info />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
