import { useEffect, useRef, useState } from 'react'

import { TextBodyLarge, TextDisplaySmall } from './components/TextBox/textBox'
import LazyImage from './components/LazyImage/lazyImage'
import { ButtonDefault } from './components/Button/Button'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'light-medium-contrast' | 'light-high-contrast'>('light')
  const [sizeAndSpacing, setSizeAndSpacing] = useState<'sm' | 'md' | 'lg' | 'xl'>('md')

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Example of focusing the button programmatically after 2 seconds
    const timer = setTimeout(() => {
      buttonRef.current?.focus();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Apply theme class to body and listen to system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    function applyTheme(currentTheme: string) {
      document.body.classList.remove('theme-light', 'theme-dark', 'theme-light-medium-contrast', 'theme-light-high-contrast');
      if (currentTheme === 'dark' || (currentTheme === 'light' && mediaQuery.matches)) {
        document.body.classList.add('theme-dark');
      } else if (currentTheme === 'light-medium-contrast') {
        document.body.classList.add('theme-light-medium-contrast');
      } else if (currentTheme === 'light-high-contrast') {
        document.body.classList.add('theme-light-high-contrast');
      } else {
        document.body.classList.add('theme-light');
      }
      localStorage.setItem('theme', currentTheme);
    }

    applyTheme(theme);

    function mediaQueryListener(e: MediaQueryListEvent) {
      if (theme === 'light') {
        console.log(e)
        applyTheme(theme);
      }
    }

    mediaQuery.addEventListener('change', mediaQueryListener);

    return () => {
      mediaQuery.removeEventListener('change', mediaQueryListener);
    };
  }, [theme])

  // Apply size and spacing class to body
  useEffect(() => {
    function updateSizeAndSpacing() {
      if (window.innerWidth < 768) {
        setSizeAndSpacing('sm')
      } else if (window.innerWidth < 1024) {
        setSizeAndSpacing('md')
      } else if (window.innerWidth < 1440) {
        setSizeAndSpacing('lg')
      } else {
        setSizeAndSpacing('xl')
      }
    }

    updateSizeAndSpacing()
    window.addEventListener('resize', updateSizeAndSpacing)
    return () => window.removeEventListener('resize', updateSizeAndSpacing)
  }, [])

  useEffect(() => {
    document.body.classList.remove('size-and-spacing-sm', 'size-and-spacing-md', 'size-and-spacing-lg', 'size-and-spacing-xl')
    document.body.classList.add(`size-and-spacing-${sizeAndSpacing}`)
    // Set the size and spacing in localStorage
    localStorage.setItem('sizeAndSpacing', sizeAndSpacing)
  }, [sizeAndSpacing])

  return (

    <div className={`App theme-${theme} size-and-spacing-${sizeAndSpacing} typography-system-large`}
      style={{ backgroundColor: 'var(--Schemes-Primary-Container)', minHeight: '100vh', padding: 'var(--PAGE-Prop-Body-margin)' }}
    >
      <h1>
        <TextDisplaySmall children="The insightArc - React JS with Vite" color='var(--Schemes-On-Primary-Container)' />
      </h1>
      <TextBodyLarge children='Coming soon...' color='var(--Schemes-On-Primary-Container)' />
      <br />
      <div className="" style={{ display: 'none' }} onClick={() => setTheme('dark')}></div>
      <LazyImage src='/src/assets/photos/home/theinsightArcbanner.jpg' alt='logo' aspectRatio='16/9'/>

      <ButtonDefault autoFocus>
        I am focused on mount
      </ButtonDefault>

      {/* Use a ref to focus it programmatically */}
      <ButtonDefault ref={buttonRef}>
        I will be focused after 2 seconds
      </ButtonDefault>
    </div>


  )
}

export default App
