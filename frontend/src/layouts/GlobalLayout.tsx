import React, { useEffect, useState, type CSSProperties } from 'react'
import { useTheme } from '../hooks/useTheme';
import NavigationUnit from '../components/NavigationUnit/NavigationUnit';
import Footer from '../components/HeaderAndFooter/Footer';
import Divider from '../components/Divider/Divider';

export default function GlobalLayout({ children }: { children: React.ReactNode }) {

  const { resolvedTheme } = useTheme(); // Lấy theme và setTheme từ Context

  const [sizeAndSpacing, setSizeAndSpacing] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');

  // Apply size and spacing class to body
  useEffect(() => {
    function updateSizeAndSpacing() {
      if (window.innerWidth < 768) {
        setSizeAndSpacing('sm');
      } else if (window.innerWidth < 1024) {
        setSizeAndSpacing('md');
      } else if (window.innerWidth < 1440) {
        setSizeAndSpacing('lg');
      } else {
        setSizeAndSpacing('xl');
      }
    }

    updateSizeAndSpacing();
    window.addEventListener('resize', updateSizeAndSpacing);
    return () => window.removeEventListener('resize', updateSizeAndSpacing);
  }, []);

  useEffect(() => {
    document.body.classList.remove('size-and-spacing-sm', 'size-and-spacing-md', 'size-and-spacing-lg', 'size-and-spacing-xl');
    document.body.classList.add(`size-and-spacing-${sizeAndSpacing}`);
    document.body.style.setProperty('background-color', 'grey')
    localStorage.setItem('sizeAndSpacing', sizeAndSpacing);
  }, [sizeAndSpacing]);


  // define the layout item
  let appLayout: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  }

  let navLayout: CSSProperties = {
    display: `flex`,
    flexDirection: `column`,
    height: '100vh',
    position: 'sticky',
    top: '0',
    left: '0',
  }
  let contentContainerLayout: CSSProperties = {
    width: '100%',
  }


  return (
    <div className={`App theme-${resolvedTheme} size-and-spacing-${sizeAndSpacing}`}
      style={{
        backgroundColor: 'var(--Schemes-Surface)',
        minHeight: '100dvh',
        ...appLayout,
      }}
    >
      {/* Thanh điều hướng */}
      <NavigationUnit {...navLayout} />
      <Divider direction='vertical' />
      {/* Content */}
      <div style={contentContainerLayout}>
        <main>
          {children}
        </main>

        <Divider />
        <Footer />
      </div>
    </div>
  )
}