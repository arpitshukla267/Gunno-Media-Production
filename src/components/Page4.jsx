import React, { useEffect, useRef, useState } from 'react';

export default function Page4() {
  const scrollRef = useRef(null);
  const [arrowVisible, setArrowVisible] = useState(true);
  const [loadedIndexes, setLoadedIndexes] = useState(new Set());

  const embeds = [
    { label: '6.2 M+ VIEWS', embed: 'https://www.instagram.com/reel/DENBsm0zaQ0/' },
    { label: '3.3 M+ VIEWS', embed: 'https://www.instagram.com/reel/DC1wV8azEnQ/' },
    { label: '2.5 M+ VIEWS', embed: 'https://www.instagram.com/reel/DCJe8omsqxt/' },
    { embed: 'https://www.instagram.com/reel/DCJf48RhzrB/' },
    { embed: 'https://www.instagram.com/reel/C9ozFFlh31x/' },
    { embed: 'https://www.instagram.com/reel/C99kgXiIarY/' },
  ];

  // Load Instagram embed.js
  useEffect(() => {
    if (!window.instgrm) {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
      return () => document.body.removeChild(script);
    }
  }, []);

  // Show/hide arrow based on scroll
  useEffect(() => {
    const container = scrollRef.current;
    const onScroll = () => {
      if (container) {
        const scrollPercent = container.scrollLeft / (container.scrollWidth - container.clientWidth);
        setArrowVisible(scrollPercent < 0.5);
      }
    };
    container?.addEventListener('scroll', onScroll);
    return () => container?.removeEventListener('scroll', onScroll);
  }, []);

  // Lazy load with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index || '-1');
            if (!isNaN(index)) {
              setLoadedIndexes(prev => new Set(prev).add(index));
            }
          }
        });
      },
      {
        root: scrollRef.current,
        threshold: 0.2,
      }
    );

    const items = scrollRef.current?.querySelectorAll('.embed-item');
    items?.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black text-white px-4 sm:px-10 py-14 border-b border-gray-700">
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        @media (min-width: 640px) {
          .scrolling-track-desktop {
            animation: scrollLeft 20s linear infinite;
          }
          .scrolling-track-desktop:hover {
            animation-play-state: paused;
          }
        }
      `}</style>

      {/* Heading */}
      <div className="text-center">
        <h1
          style={{ fontFamily: 'Anton, sans-serif' }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-pink-500 to-red-500 animate-gradient-x drop-shadow-[0_2px_15px_rgba(255,105,135,0.4)] text-center m-10"
        >
          Brand Reels
        </h1>  
      </div>

      {/* Mobile Arrow */}
      <div
        className={`block sm:hidden bg-white p-2 rounded-4xl absolute right-4 top-1/2 transform -translate-y-1/2 z-20 text-yellow-400 text-2xl transition-all duration-300 ${
          arrowVisible ? 'animate-pulse scale-125 shadow-lg text-white bg-white' : 'opacity-0'
        }`}
      >
        ➜
      </div>

      {/* Scrollable Reels */}
      <div className="relative sm:overflow-hidden overflow-x-auto scroll-smooth scrollbar-hide">
        <div
          ref={scrollRef}
          className="flex gap-4 px-2 py-8 scrolling-track-desktop"
        >
          {[...embeds, ...embeds].map(({ label, embed }, index) => (
            <div
              key={index}
              data-index={index}
              className="embed-item min-w-[260px] max-w-[320px] bg-white rounded-2xl flex-shrink-0 overflow-hidden shadow-md"
            >
              {label && (
                <div className="p-3 pb-0">
                  <div className="text-xs sm:text-sm font-extrabold text-center tracking-wider uppercase text-gray-800 mb-2">
                    {label}
                  </div>
                </div>
              )}

              {loadedIndexes.has(index) ? (
                <div
                  className="w-full"
                  ref={(el) => {
                    if (el && !el.dataset.loaded) {
                      el.dataset.loaded = 'true';
                      const block = document.createElement('blockquote');
                      block.className = 'instagram-media';
                      block.setAttribute('data-instgrm-permalink', embed);
                      block.setAttribute('data-instgrm-version', '14');
                      block.style.maxWidth = '100%';
                      el.appendChild(block);
                      window.instgrm?.Embeds.process();
                    }
                  }}
                />
              ) : (
                <div className="w-full h-[400px] flex items-center justify-center text-gray-400 text-sm animate-pulse">
                  Loading reel...
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
