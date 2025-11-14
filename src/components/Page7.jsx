import React, { useEffect, useRef, useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { hoverMap, img2 } from '../components/Images';

function Page7() {
  const [hoveringIndex, setHoveringIndex] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const prefetchedSlides = useRef(new Set());

  const infoBadges = [
    { title: 'End-to-end crew', description: 'Directors · DOPs · Stylists · Editors' },
    { title: 'Modular setups', description: 'On-location · Studio · Experiential' },
    { title: 'Deliverables', description: 'Reels · Key visuals · BTS · Ads' },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.24, 0.8, 0.25, 1] } },
  };

  const categories = ['Editorial', 'Launch', 'Lookbook', 'Event IP'];

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

  const handlePrefetch = (index) => {
    if (prefetchedSlides.current.has(index) || !hoverMap[index]) return;
    hoverMap[index].forEach((src) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
    });
    prefetchedSlides.current.add(index);
  };

  const handleEnter = (index, isHoverable) => {
    if (!isHoverable) return;
    handlePrefetch(index);
    setHoveringIndex(index);
  };

  const handleLeave = () => setHoveringIndex(null);

  return (
    <section className="relative bg-gradient-to-b from-black via-[#050505] to-black text-white px-4 py-16 sm:py-20 overflow-hidden">
      <div className="pointer-events-none absolute -top-24 left-10 w-72 h-72 bg-amber-500/20 blur-[140px] animate-[pulse_7s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-500/10 blur-[180px] animate-[pulse_9s_ease-in-out_infinite]" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-12">
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-amber-300/80">
            Brand photography lab
          </p>
          <h1
            style={{ fontFamily: 'Anton, sans-serif' }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-pink-500 to-red-500 drop-shadow-[0_2px_25px_rgba(255,105,135,0.35)]"
          >
            Photographs that feel cinematic.
          </h1>
          <p className="text-base sm:text-lg text-gray-200 max-w-3xl mx-auto">
            Library of editorials, product stories, and campaign imagery we build for design-first brands.
            Hover to explore each micro-series.
          </p>
        </Motion.div>

        <div className="grid sm:grid-cols-3 gap-4">
          {infoBadges.map(({ title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-4 text-sm"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">{title}</p>
              <p className="mt-2 text-gray-100">{description}</p>
            </div>
          ))}
        </div>

        <Motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {img2.map((src, idx) => {
            const isHoverable = Object.prototype.hasOwnProperty.call(hoverMap, idx);
            const slideshow = hoverMap[idx];
            const isHovering = hoveringIndex === idx;

            return (
              <Motion.div
                key={idx}
                variants={cardVariants}
                className={`group relative aspect-[3/4] w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 backdrop-blur-sm transition duration-500 ${
                  isHovering ? 'shadow-[0_25px_80px_rgba(255,105,135,0.35)] scale-[1.01]' : 'shadow-[0_15px_50px_rgba(0,0,0,0.55)]'
                }`}
                onMouseEnter={() => handleEnter(idx, isHoverable)}
                onMouseLeave={handleLeave}
                onFocus={() => handleEnter(idx, isHoverable)}
                onBlur={handleLeave}
                tabIndex={0}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <span className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[0.65rem] uppercase tracking-[0.3em] bg-black/60 border border-white/20">
                  {categories[idx % categories.length]}
                </span>
                <span className="absolute top-4 right-4 z-20 text-xs tracking-widest bg-white/10 border border-white/20 px-2 py-1 rounded-full">
                  {slideshow?.length ? `${slideshow.length} looks` : 'Single'}
                </span>

                {isHovering && slideshow ? (
                  <AnimatePresence mode="wait">
                    <Motion.img
                      key={`${idx}-${slideIndex}`}
                      src={slideshow[slideIndex]}
                      alt={`Campaign frame ${slideIndex + 1}`}
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.05, x: 30 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.98, x: -30 }}
                      transition={{ duration: 0.45 }}
                    />
                  </AnimatePresence>
                ) : (
                  <Motion.img
                    src={src}
                    alt={`Model ${idx + 1}`}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: idx * 0.05,
                      duration: 0.6,
                      ease: 'easeOut',
                    }}
                  />
                )}

                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-sm">
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-gray-300">
                      Series {String(idx + 1).padStart(2, '0')}
                    </p>
                    <p className="text-lg font-semibold">Gunno Media Studio</p>
                  </div>
                  {isHoverable && (
                    <p className="text-xs uppercase tracking-[0.4em] text-amber-200">
                      Hover +
                    </p>
                  )}
                </div>
              </Motion.div>
            );
          })}
        </Motion.div>
      </div>
    </section>
  );
}

export default Page7;
