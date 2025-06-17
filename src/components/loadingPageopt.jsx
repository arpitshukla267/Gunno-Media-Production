import React, { useState, useEffect } from 'react'
import Nav from './Nav'
import dslrCameraLeft from '../assets/loading-page-left.jpg'
import dslrCameraRight from '../assets/loading-page-right.jpg'
import dslrCameraLeftMobile from '../assets/loading-page-mobile-left.jpg'
import dslrCameraRightMobile from '../assets/loading-page-mobile-right.jpg'
import Cursor from './cursor'
import Page2 from './Page2'
import { motion } from 'framer-motion';

function LoadingPage() {
  const [scrollX, setScrollX] = useState(0)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024)

  useEffect(() => {
    document.body.style.overflowX = 'hidden'
    return () => {
      document.body.style.overflowX = ''
    }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrollX(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxTranslate = window.innerWidth / 2
  const translate = Math.min(scrollX, maxTranslate)

  return (
    <div>
      <Cursor />
      <Nav />

      {/* DSLR scroll effect */}
      <div className="fixed inset-0 z-50 flex overflow-hidden pointer-events-none">
        <img
          src={isMobile ? dslrCameraLeftMobile : dslrCameraLeft}
          alt="Left DSLR"
          className="w-1/2 h-full object-cover transition-transform duration-200 ease-in-out"
          style={{ transform: `translateX(-${translate}px)` }}
        />
        <img
          src={isMobile ? dslrCameraRightMobile : dslrCameraRight}
          alt="Right DSLR"
          className="w-1/2 h-full object-cover transition-transform duration-200 ease-in-out"
          style={{ transform: `translateX(${translate}px)` }}
        />
      </div>

      {/* Spacer for fixed image effect */}
      <div className="bg-white h-[calc(100vh-10rem)]"></div>

      {/* PUREVISUALS-style content */}
       <motion.main
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="min-h-[200vh] bg-[#e5e5e5] font-mono text-black"
    >
      <section className="min-h-screen sticky top-[2rem] flex flex-col justify-center items-center px-4">
        
        {/* Heading 1 */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 5 }}
          className="text-6xl bebas-font sm:text-8xl font-extrabold tracking-tight text-center"
        >
          Gunno Media
        </motion.h1>

        {/* Heading 2 */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 5 }}
          className="text-6xl bebas-font sm:text-8xl font-extrabold tracking-tight text-center"
        >
          Productions
        </motion.h1>

        {/* Center Row */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 5 }}
          className="mt-6 w-full flex flex-col sm:flex-row justify-between items-center max-w-5xl text-sm sm:text-base"
        >
          <p className="text-left sm:w-1/3 text-center sm:text-left">
            VISUAL CREATIVE STUDIO<br />BASED IN NYC
          </p>
          <div className="my-4 sm:my-0 sm:w-1/3 text-center" />
          <p className="text-right sm:w-1/3 text-center sm:text-right">
            BLENDING CREATIVITY & STRATEGY<br />FOR SEAMLESS INTERFACES
          </p>
        </motion.div>
      </section>

      {/* Optional Next Section */}
      <Page2 />
    </motion.main>
    </div>
  )
}

export default LoadingPage  
