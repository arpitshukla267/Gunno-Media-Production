import React, { useEffect, useRef } from 'react';

export default function Page4() {
  const scrollRef = useRef(null);
  const embedRefs = useRef([]);

  const embeds = [
    { label: '6.2 M+ VIEWS', embed: 'https://www.instagram.com/reel/DENBsm0zaQ0/' },
    { label: '3.3 M+ VIEWS', embed: 'https://www.instagram.com/reel/DC1wV8azEnQ/' },
    { label: '2.5 M+ VIEWS', embed: 'https://www.instagram.com/reel/DCJe8omsqxt/' },
    { label: '', embed: 'https://www.instagram.com/reel/DCJf48RhzrB/' },
    { label: '', embed: 'https://www.instagram.com/reel/C9ozFFlh31x/' },
    { label: '', embed: 'https://www.instagram.com/reel/C99kgXiIarY/' },
  ];

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.onload = () => window.instgrm?.Embeds.process();
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.instgrm?.Embeds.process();
    }, 800); // enough time for the DOM to settle

    return () => clearTimeout(timer);
  }, [embedRefs.current]);

  return (
    <div className="relative w-full min-h-screen bg-black text-white px-4 sm:px-10 py-14 border-b border-gray-700">
      <h1
        style={{ fontFamily: 'Anton, sans-serif' }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-wider text-transparent mt-10 bg-clip-text bg-gradient-to-r from-amber-400 via-pink-500 to-red-500 text-center drop-shadow-[0_2px_15px_rgba(255,105,135,0.4)] mb-12"
      >
        Brand Reels
      </h1>

      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (min-width: 640px) {
          .scrolling-track {
            animation: scrollLeft 30s linear infinite;
          }
          .scrolling-track:hover {
            animation-play-state: paused;
          }
        }
        .instagram-media {
          border: none !important;
          box-shadow: none !important;
          margin: 0 !important;
          padding: 0 !important;
          background: transparent !important;
          width: 100% !important;
          min-height: 560px !important;
        }
      `}</style>

      <div className="overflow-x-auto sm:overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-6 px-2 py-4 sm:py-8 scroll-smooth scrolling-track"
        >
          {embeds.map(({ label, embed }, index) => (
            <div
              key={index}
              ref={(el) => (embedRefs.current[index] = el)}
              className="min-w-[260px] max-w-[320px] bg-transparent rounded-2xl flex-shrink-0 flex flex-col items-center"
              style={{ height: '700px' }} // Set consistent outer height
            >
              <div className="p-3 pb-0">
                <div className="text-xs sm:text-sm font-extrabold text-center tracking-wider uppercase text-gray-400 mb-2">
                  {label || '\u00A0'}
                </div>
              </div>

              <div className="w-full insta-embed-wrapper" style={{ minHeight: '560px' }}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<blockquote class="instagram-media" data-instgrm-permalink="${embed}" data-instgrm-version="14" style="width:100%; min-height:560px; margin:0 auto;"></blockquote>`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
