import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import ThemeProvider từ file useTheme.ts (hoặc useTheme.tsx)
import { ThemeProvider } from './hooks/useTheme'; // Import cả ThemeProvider và useTheme

import GlobalLayout from './layouts/GlobalLayout';

import LandingPage from './pages/LandingPage/LandingPage';
import Test from './pages/Test';

import './i18n';

export default function App() {

  return (
    <BrowserRouter>
      {/* Bọc toàn bộ ứng dụng bằng ThemeProvider */}
      <ThemeProvider>
        {/* Kiểm soát layout lớn của web, tương lai có thể tích hợp chuyển layout tại đối tượng này */}
        <GlobalLayout>
          {/* Các trang */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </GlobalLayout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

