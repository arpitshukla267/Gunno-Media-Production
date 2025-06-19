import React, { useEffect, useRef, useState } from 'react';

function Cursor({ text = ' Hello ' }) {
  const cursorRef = useRef(null);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isEnabled, setIsEnabled] = useState(true);

  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Disable cursor on small screens
    const mediaQuery = window.matchMedia('(max-width: 640px)');
    setIsEnabled(!mediaQuery.matches);

    const handleResize = () => {
      setIsEnabled(!mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleResize);

    const move = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const screenHeight = window.innerHeight;
      setIsFirstPage(scrollY < screenHeight);
    };

    if (isEnabled) {
      window.addEventListener('mousemove', move);
      window.addEventListener('scroll', handleScroll);

      const followMouse = () => {
        pos.current.x += (mouse.current.x - pos.current.x) * 0.1;
        pos.current.y += (mouse.current.y - pos.current.y) * 0.1;

        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${pos.current.x - 16}px, ${pos.current.y - 16}px, 0)`;
        }

        requestAnimationFrame(followMouse);
      };

      followMouse();
    }

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('scroll', handleScroll);
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, [isEnabled]);

  if (!isEnabled) return null; // 🔕 Don't render on small screens

  return (
    <div
      ref={cursorRef}
      className={`fixed z-99 p-1 border-2 pointer-events-none mix-blend-difference transition-all duration-300 ease-out
        ${isFirstPage ? 'w-auto h-7 rounded-md' : 'w-6 h-6 rounded-full bg-amber-50 '}
        text-white border-white flex items-center justify-center`}
    >
      {isFirstPage && text}
    </div>
  );
}

export default Cursor;
