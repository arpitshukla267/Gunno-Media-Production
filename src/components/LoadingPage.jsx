import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import dslrCameraLeft from '../assets/loading-page-left.jpg';
import dslrCameraRight from '../assets/loading-page-right.jpg';
import dslrCameraLeftMobile from '../assets/loading-page-mobile-left.jpg';
import dslrCameraRightMobile from '../assets/loading-page-mobile-right.jpg';
import Cursor from './cursor';
import Page2 from './Page2';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import styles from './LoadingPage.module.css';

function LoadingPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  const scrollMotion = useMotionValue(0);
  const smoothMotion = useSpring(scrollMotion, { stiffness: 60, damping: 20 });
  const translateLeft = useTransform(smoothMotion, val => `-${val}px`);

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
    <div className="relative">
      <Cursor />
      <Nav />

      <div className="fixed inset-0 z-50 flex overflow-hidden pointer-events-none">
        <motion.img
          src={isMobile ? dslrCameraLeftMobile : dslrCameraLeft}
          alt="Left DSLR"
          className="w-1/2 h-full object-cover"
          style={{ x: translateLeft }}
        />
        <motion.img
          src={isMobile ? dslrCameraRightMobile : dslrCameraRight}
          alt="Right DSLR"
          className="w-1/2 h-full object-cover"
          style={{ x: smoothMotion }}
        />
      </div>

      <div className="bg-white h-[calc(100vh-10rem)]" />

<main className="relative overflow-hidden min-h-[100vh] font-mono text-white bg-[#111]">
  {/* for dark theme -> <main className="relative overflow-hidden min-h-[200vh] font-mono text-white bg-[#111]">
 */}
  <div
    className={`${styles.animateBackgroundScroll} absolute inset-0 w-full h-full opacity-20 z-0 pointer-events-none`}
  />
  {/* Background animation layer */}
  <div className={`${styles.animateBackgroundScroll} absolute inset-0 w-full h-full opacity-20 z-0`} />

  {/* Main sticky heading section */}
  <section className="min-h-screen flex flex-col justify-center items-center px-4 z-10">
    <h1 className="text-5xl md:text-7xl lg:text-8xl bebas-font font-extrabold tracking-tight text-center uppercase backdrop-blur-sm bg-white/10 px-4 py-2 rounded-xl">
      Gunno Media
    </h1>

    <h2 className="text-5xl md:text-7xl lg:text-8xl bebas-font font-extrabold tracking-tight text-center uppercase backdrop-blur-sm bg-white/10 px-4 py-2 mt-2 rounded-xl">
      Productions
    </h2>

    <div className="mt-8 w-full flex flex-col sm:flex-row justify-between items-center max-w-5xl text-sm sm:text-base">
      <p className="text-left sm:w-1/3 text-center sm:text-left leading-relaxed">
        Video Production Startup<br /> Delhi-Lucknow-Chandigarh
      </p>
      <div className="my-6 sm:my-0 sm:w-1/3 text-center" />
      <p className="text-right sm:w-1/3 text-center sm:text-right leading-relaxed">
        Converting "dukaan" into "BRAND"
      </p>
    </div>
  </section>

  {/* Reveal Page2 smoothly */}
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 1 }}
  >
    
  </motion.div>
  </main>
  <Page2 />
    </div>
  );
}

export default LoadingPage;


