import React, { useEffect, useRef } from 'react';
import styles from './CircleFollowMouse.module.css';

const CircleFollowMouse: React.FC = () => {
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (circleRef.current) {
        circleRef.current.style.left = `${event.clientX - 25}px`;
        circleRef.current.style.top = `${event.clientY - 25}px`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <div ref={circleRef} className={styles.circle} />;
};

export default CircleFollowMouse;
