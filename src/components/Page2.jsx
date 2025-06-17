import React, { useRef, useEffect } from 'react';
import Cursor from './Cursor';
import { NavLink } from 'react-router-dom';
import aboutUs from '../assets/Gunno-Media-Produtions-2.mp4';

function Page2() {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  };

  return (
    <>
      <Cursor />
      <div className="w-full min-h-screen p-20 bg-black flex flex-col lg:flex-row items-center justify-around px-6 py-12 sm:px-10 md:px-16 lg:px-20 text-white border-b border-gray-700 gap-15 lg:gap-20 relative overflow-hidden">

        {/* Decorative Background Glow */}
        <div className="absolute inset-0 pointer-events-none opacity-30 blur-3xl z-0">
          <div className="absolute top-[30%] left-[10%] w-72 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96 bg-pink-500 rounded-full mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-[20%] right-[10%] w-60 sm:w-64 md:w-72 h-60 sm:h-64 md:h-72 bg-amber-500 rounded-full mix-blend-screen animate-pulse delay-1000"></div>
        </div>

        {/* Text Section */}
        <div className="relative z-10 w-full lg:w-[45%] backdrop-blur-sm bg-black/50 p-5 sm:p-8 md:p-10 rounded-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bebas-font tracking-wide mb-6 leading-tight">
            Who We <span className="text-orange-400">Are</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-8">
            <ul>
              <li>We are a video production startup.</li><br></br>
              <li>Our USP - We give 10X better video quality at a competative price.</li>
              <li>By leveraging state - of-the -art
                technology, expert craftsmanship, and a deep understanding of market
                trends, we ensure that every video captivates, engages, and drives results.
              </li>
            </ul>
          </p>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out ${
                isActive ? 'ring-2 ring-white' : ''
              }`
            }
          >
            Contact Us
          </NavLink>
        </div>

        {/* Video Section */}
        <div className="relative z-10 w-[100%] sm:w-4/5 md:w-3/4 lg:max-w-md scale-100 sm:scale-130 overflow-hidden shadow-lg">

          <video
            ref={videoRef}
            src={aboutUs}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto object-cover"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      </div>
    </>
  );
}

export default Page2;
