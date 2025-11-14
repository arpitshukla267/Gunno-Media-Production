import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import dslrCameraLeft from '../assets/loading-page-left-min.jpg';
import dslrCameraRight from '../assets/loading-page-right-min.jpg';
import dslrCameraLeftMobile from '../assets/loading-page-mobile-left1-min.jpg';
import dslrCameraRightMobile from '../assets/loading-page-mobile-right1-min.jpg';
import Cursor from './Cursor';
import Page2 from './Page2';
import { NavLink } from 'react-router-dom';
import { motion as Motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import styles from './LoadingPage.module.css';
import { useImagePreloader } from '../hooks/useImagePreloader';

function LoadingPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  const scrollMotion = useMotionValue(0);
  const smoothMotion = useSpring(scrollMotion, { stiffness: 60, damping: 20 });
  const translateLeft = useTransform(smoothMotion, val => `-${val}px`);
  const heroSources = isMobile
    ? [dslrCameraLeftMobile, dslrCameraRightMobile]
    : [dslrCameraLeft, dslrCameraRight];
  const heroImagesReady = useImagePreloader(heroSources);

  const stats = [
    { label: 'Cities', value: '03', helper: 'Delhi · Lucknow · Chandigarh' },
    { label: 'Shoots/mo', value: '15+', helper: 'Branded campaigns & stories' },
    { label: 'Avg. turnaround', value: '07d', helper: 'From brief to delivery' },
    { label: 'Client NPS', value: '9.3', helper: 'Top-rated experience' },
  ];

  const heroBadges = ['Launch films', 'Lookbooks', 'Event IPs', 'Lifestyle'];

  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    return () => {
      document.body.style.overflowX = '';
    };
  }, []);

  useEffect(() => {
    const onScroll = () => scrollMotion.set(Math.min(window.scrollY, window.innerWidth / 2));
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollMotion]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Cursor />
      <Nav />
      <div className='h-[100vh]'></div>
      <div className="fixed inset-0 z-40 flex overflow-hidden pointer-events-none">
        <div
          className={`absolute inset-0 bg-gradient-to-r from-black via-black to-black transition-opacity duration-700 ${
            heroImagesReady ? 'opacity-0' : 'opacity-70'
          }`}
        />
        <Motion.img
          loading={isMobile ? 'eager' : 'lazy'}
          decoding="async"
          fetchpriority="high"
          width="1536"
          height="2048"
          src={isMobile ? dslrCameraLeftMobile : dslrCameraLeft}
          alt="Left DSLR"
          className="w-1/2 h-full object-cover brightness-90"
          style={{ x: translateLeft }}
        />
        <Motion.img
          loading={isMobile ? 'eager' : 'lazy'}
          decoding="async"
          fetchpriority="high"
          width="1536"
          height="2048"
          src={isMobile ? dslrCameraRightMobile : dslrCameraRight}
          alt="Right DSLR"
          className="w-1/2 h-full object-cover brightness-90"
          style={{ x: smoothMotion }}
        />
      </div>

      <main className="relative overflow-hidden min-h-[100vh] text-white bg-[#050505] pt-28 pb-16">
        <div className={`${styles.animateBackgroundScroll} absolute inset-0 w-full h-full opacity-30 z-0 pointer-events-none`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_40%)]" />

        <section className="relative min-h-screen flex flex-col justify-center px-4 sm:px-8 z-10">
          <Motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs sm:text-sm uppercase tracking-[0.4em] text-amber-300/80 mb-4"
          >
            Gunno Media Productions
          </Motion.span>

          <Motion.h1
            style={{ fontFamily: 'Anton, sans-serif' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight uppercase drop-shadow-2xl"
          >
            Crafting iconic brand films & immersive experiences.
          </Motion.h1>

          <Motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl text-base sm:text-lg text-gray-200 mt-6"
          >
            Full-stack production house dedicated to fast-moving founders. We ideate, shoot,
            and finish cinematic visuals that turn everyday businesses into brands-with-a-fanbase.
          </Motion.p>

          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-wrap gap-3 mt-8"
          >
            {heroBadges.map((badge) => (
              <span
                key={badge}
                className="px-4 py-2 rounded-full text-sm uppercase tracking-wide bg-white/10 border border-white/15 backdrop-blur"
              >
                {badge}
              </span>
            ))}
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <NavLink
              to="/contact"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 via-pink-500 to-red-500 text-black font-semibold uppercase tracking-widest shadow-lg shadow-amber-500/25 hover:scale-105 transition"
            >
              Start a brief
            </NavLink>
            <NavLink
              to="/Work"
              className="px-6 py-3 rounded-full border border-white/30 text-white font-semibold uppercase tracking-widest hover:bg-white/10 transition"
            >
              View work
            </NavLink>
          </Motion.div>

          <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-10 items-start mt-14">
            <Motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map(({ label, value, helper }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-4 sm:p-5 shadow-[0_20px_70px_rgba(0,0,0,0.35)]"
                >
                  <p className="text-xs uppercase tracking-widest text-gray-400">{label}</p>
                  <p className="text-3xl font-bold mt-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    {value}
                  </p>
                  <p className="text-xs text-gray-300">{helper}</p>
                </div>
              ))}
            </Motion.div>

            <Motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-black/50 p-6 backdrop-blur"
            >
              <p className="text-sm text-gray-300 leading-relaxed">
                “Our work blends strategy, motion design, and people-first storytelling. Every
                frame feels premium, yet ships with the agility of a startup.”
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">Gunno Media Crew</p>
                  <p className="text-xs uppercase tracking-[0.4em] text-gray-400">Producers · Directors · Artists</p>
                </div>
                <Motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-xs uppercase tracking-widest"
                >
                  LIVE
                </Motion.div>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Booking high-impact productions for Q1 & Q2 · 2025
              </div>
            </Motion.div>
          </div>

          <Motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-12 flex flex-col items-center text-xs uppercase tracking-[0.5em] text-gray-300"
          >
            <span>Scroll to explore</span>
            <span className="mt-3 h-12 w-px bg-gradient-to-b from-white/70 to-transparent" />
          </Motion.div>
        </section>
      </main>

      <Page2 />
    </div>
  );
}

export default LoadingPage;
