import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { hoverMap, img2 } from '../components/Images';

function Page7() {
  const [hoveringIndex, setHoveringIndex] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (hoveringIndex !== null && hoverMap[hoveringIndex]) {
      const interval = setInterval(() => {
        setSlideIndex((prev) => {
          const slides = hoverMap[hoveringIndex];
          return (prev + 1) % slides.length;
        });
      }, 1500);
      return () => clearInterval(interval);
    } else {
      setSlideIndex(0);
    }
  }, [hoveringIndex]);

  return (
    <div className="bg-black min-h-screen text-white px-4 py-10">
      <h1
        style={{ fontFamily: 'Anton, sans-serif' }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-20 uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-pink-500 to-red-500 animate-gradient-x drop-shadow-[0_2px_15px_rgba(255,105,135,0.4)] text-center m-10"
      >
        Brand's Photoshoot
      </h1>

      {/* Responsive Grid: 1 column on mobile, 2 on small, 3 on md+ */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-2">
        {img2.map((src, idx) => {
          const isHoverable = hoverMap.hasOwnProperty(idx);
          const slideshow = hoverMap[idx];
          const isHovering = hoveringIndex === idx;

          return (
            <div
              key={idx}
              className={`relative w-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-[1.015] ${
                isHovering ? 'z-50' : ''
              }`}
              onMouseEnter={() => isHoverable && setHoveringIndex(idx)}
              onMouseLeave={() => setHoveringIndex(null)}
            >
              {isHovering && slideshow ? (
                <AnimatePresence mode="wait">
                  <motion.img
                    key={slideIndex}
                    src={slideshow[slideIndex]}
                    alt={`Slide ${slideIndex}`}
                    className="w-full h-auto object-cover"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.4 }}
                  />
                </AnimatePresence>
              ) : (
                <motion.img
                  src={src}
                  alt={`Model ${idx + 1}`}
                  className="w-full h-auto object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: idx * 0.05,
                    duration: 0.6,
                    ease: 'easeOut',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Page7;
