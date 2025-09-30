import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import ThemeProvider từ file useTheme.ts (hoặc useTheme.tsx)
import { ThemeProvider } from './hooks/useTheme'; // Import cả ThemeProvider và useTheme

import GlobalLayout from './layouts/GlobalLayout';

import LandingPage from './pages/LandingPage/LandingPage';
import Test from './pages/Test';

import './i18n';
import NotFoundPage from './pages/NotFoundPage';
import Game from './pages/Game/Game';
import Inspiration from './pages/Inspiration/Inspiration';
import BlogList from './pages/Blog/BlogList';

export default function App() {

  return (
    <BrowserRouter>
      {/* Bọc toàn bộ ứng dụng bằng ThemeProvider */}
      <ThemeProvider>
        {/* Kiểm soát layout lớn của web, tương lai có thể tích hợp chuyển layout tại đối tượng này */}
        <GlobalLayout>
          {/* Các trang */}
          <Routes>
            <Route path="/" element={<Navigate to="/landingpage" replace />} />
            <Route path="/ladingpage" element={<LandingPage />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/inspiration" element={<Inspiration />} />
            <Route path="/game" element={<Game />} />
            <Route path="/test" element={<Test />} />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </GlobalLayout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

