import React, { useEffect, useRef, useState } from 'react';

export default function Page4() {
  const scrollRef = useRef(null);
  const [showArrow, setShowArrow] = useState(true);
  const [arrowActive, setArrowActive] = useState(false);


  const embeds = [
    {
      label: '6.2 M+ VIEWS',
      embed: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DENBsm0zaQ0/" data-instgrm-version="14" style="max-width:100%;"></blockquote>`
    },
    {
      label: '3.3 M+ VIEWS',
      embed: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DC1wV8azEnQ/?utm_source=ig_web_button_share_sheet" data-instgrm-version="14" style="max-width:100%;"></blockquote>`
    },
    {
      label: '2.5 M+ VIEWS',
      embed: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DCJe8omsqxt/" data-instgrm-version="14" style="max-width:100%;"></blockquote>`
    },
    {
      embed: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DCJf48RhzrB/" data-instgrm-version="14" style="max-width:100%;"></blockquote>`
    },
    {
      embed: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/C9ozFFlh31x/" data-instgrm-version="14" style="max-width:100%;"></blockquote>`
    },
    {
      embed: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/C99kgXiIarY/" data-instgrm-version="14" style="max-width:100%;"></blockquote>`
    },
  ];

  // Load Instagram Embed Script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Re-process embeds after short delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  // Show/hide arrow based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const el = scrollRef.current;
      if (!el) return;

      const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
      const isScrolledBack = el.scrollLeft + el.clientWidth < el.scrollWidth - 10;

      if (isAtEnd) {
        setShowArrow(false);
      } else if (isScrolledBack) {
        setShowArrow(true);
      }
    };

    const el = scrollRef.current;
    if (el) el.addEventListener('scroll', handleScroll);

    return () => {
      if (el) el.removeEventListener('scroll', handleScroll);
    };
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollX / (document.body.scrollWidth - window.innerWidth);
      setArrowActive(scrollPercent >= 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Call once to set initial state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div className="relative w-full min-h-screen bg-black text-white px-4 sm:px-10 py-14 border-b border-gray-700">
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        @media (min-width: 640px) {
          .scrolling-track {
            animation: scrollLeft 20s linear infinite;
          }

          .scrolling-track:hover {
            animation-play-state: paused;
          }
        }
      `}</style>

      {/* Title */}
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl m-10 uppercase bebas-font text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-pink-500 to-red-500">
          Brand Reels
        </h1>
      </div>

      {/* Arrow for mobile scroll hint */}
      <div
        className={`block sm:hidden bg-white p-2 rounded-4xl opacity-100 font-extrabold absolute right-4 top-1/2 transform -translate-y-1/2 z-20 animate-pulse text-yellow-400 text-2xl pointer-events-none transition-all duration-300 ${
          arrowActive ? 'bg-yellow-400 text-white scale-125 shadow-lg ' : 'opacity-0 pointer-events-none'
        }`}
      >
        ➜
      </div>

      {/* Scrollable Embed Reels */}
      <div className="relative overflow-x-auto sm:overflow-hidden whitespace-nowrap scroll-smooth scrollbar-hide z-10">
        <div
          ref={scrollRef}
          className="inline-flex gap-4 px-2 py-8 scrolling-track"
        >
          {[...embeds, ...embeds].map(({ label, embed }, index) => (
            <div
              key={index}
              className="min-w-[200px] sm:min-w-[200px] max-w-[380px] bg-white p-2 rounded-2xl"
            >
              {label && (
                <div className="text-xs sm:text-sm font-extrabold mb-2 text-center tracking-wider uppercase text-gray-800">
                  {label}
                </div>
              )}
              <div dangerouslySetInnerHTML={{ __html: embed }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

