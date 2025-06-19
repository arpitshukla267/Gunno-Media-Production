import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import dslrCameraLeft from '../assets/loading-page-left.jpg';
import dslrCameraRight from '../assets/loading-page-right.jpg';
import dslrCameraLeftMobile from '../assets/loading-page-mobile-left.jpg';
import dslrCameraRightMobile from '../assets/loading-page-mobile-right.jpg';
import Cursor from './Cursor';
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
    <div className="relative" style={{ fontFamily: 'Poppins, sans-serif' }}>
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

      <main className="relative overflow-hidden min-h-[100vh] text-white bg-[#111]">
        <div className={`${styles.animateBackgroundScroll} absolute inset-0 w-full h-full opacity-20 z-0 pointer-events-none`} />
        <div className={`${styles.animateBackgroundScroll} absolute inset-0 w-full h-full opacity-20 z-0`} />

        <section className="min-h-screen flex flex-col justify-center items-center px-4 z-10 space-y-4">
            <h1
              style={{ fontFamily: 'Anton, sans-serif' }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-widest leading-tight text-center uppercase backdrop-blur-sm bg-white/10 px-6 py-4 rounded-xl"
            >
              Gunno Media
            </h1>
          
            <h2
              style={{ fontFamily: 'Anton, sans-serif' }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-widest leading-tight text-center uppercase backdrop-blur-sm bg-white/10 px-6 py-4 rounded-xl"
            >
              Productions
            </h2>
          
          <div className="mt-8 w-full flex flex-col sm:flex-row justify-between items-center max-w-5xl text-sm sm:text-base leading-relaxed">
            <p
              style={{ fontFamily: 'Poppins, sans-serif' }}
              className="text-left sm:w-1/3 text-center sm:text-left"
            >
              Video Production Startup<br /> Delhi-Lucknow-Chandigarh
            </p>

            <div className="my-6 sm:my-0 sm:w-1/3 text-center" />

            <p
              style={{ fontFamily: 'Playfair Display, serif' }}
              className="text-right sm:w-1/3 text-center sm:text-right italic"
            >
              Converting "dukaan" into "BRAND"
            </p>
          </div>
        </section>

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
