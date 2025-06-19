import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function Page5() {
  const photographyRef = useRef(null);
  const videographyRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = [photographyRef, videographyRef, visualRef];

    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    setTimeout(() => {
      ScrollTrigger.matchMedia({
        "all": () => {
          sections.forEach((ref) => {
            if (!ref.current) return;

            ScrollTrigger.create({
              trigger: ref.current,
              start: 'top 50%',
              end: 'top 10%',
              onEnter: () => ref.current.classList.add('text-white'),
              onLeave: () => ref.current.classList.remove('text-white'),
              onEnterBack: () => ref.current.classList.add('text-white'),
              onLeaveBack: () => ref.current.classList.remove('text-white'),
              markers: false,
            });
          });

          ScrollTrigger.refresh();
        },
      });
    }, 300);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-black flex flex-col z-20 text-white px-4 sm:px-6 md:px-10 py-10 sm:py-14 gap-16 sm:gap-20 border-b-2 border-b-gray-700">

      <h1
        style={{ fontFamily: 'Orbitron, sans-serif' }}
        className="uppercase sticky top-[4rem] sm:top-[6rem] font-extrabold text-center tracking-widest text-3xl sm:text-5xl md:text-6xl mt-16 sm:mt-8 mb-32 sm:mb-40 z-10 bg-black text-white drop-shadow-md"
      >
        our <span className="inline-block">services</span>
      </h1>

      {/* Photography Section */}
      <div
        ref={photographyRef}
        className="border-t sticky top-[9rem] sm:top-[12rem] border-white pt-6 sm:pt-8 text-gray-600 transition-colors duration-300 bg-black"
      >
        <h2
          style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          className="text-xl sm:text-2xl font-bold uppercase mb-4 sm:mb-6 text-white tracking-wide"
        >
          Photography
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <span className="hover:text-orange-400 transition">Commercial Photography</span>
          <span className="hover:text-orange-400 transition">Event Photography</span>
          <span className="hover:text-orange-400 transition">Product Photography</span>
          <span className="hover:text-orange-400 transition">Model Shoot</span>
          <span className="hover:text-orange-400 transition">Food Photography</span>
          <span className="hover:text-orange-400 transition">Wedding Photography</span>
        </div>
      </div>

      {/* Videography Section */}
      <div
        ref={videographyRef}
        className="border-t sticky top-[9rem] sm:top-[12rem] border-gray-800 pt-6 sm:pt-8 text-gray-600 transition-colors duration-300 bg-black"
      >
        <h2
          style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          className="text-xl sm:text-2xl font-bold uppercase mb-4 sm:mb-6 text-white tracking-wide"
        >
          Videography
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <span className="hover:text-orange-400 transition">Corporate Video Shoot</span>
          <span className="hover:text-orange-400 transition">Digital Ad Film</span>
          <span className="hover:text-orange-400 transition">Podcast Shoot</span>
          <span className="hover:text-orange-400 transition">Documentary Film Shoot</span>
          <span className="hover:text-orange-400 transition">Event Shoot (Weddings & Shows)</span>
          <span className="hover:text-orange-400 transition">Music Video Production</span>
        </div>
      </div>

      {/* Post Production Section */}
      <div
        ref={visualRef}
        className="border-t sticky top-[9rem] sm:top-[12rem] border-gray-800 pt-6 sm:pt-8 text-gray-600 transition-colors duration-300 bg-black"
      >
        <h2
          style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          className="text-xl sm:text-2xl font-bold uppercase mb-4 sm:mb-6 text-white tracking-wide"
        >
          Pre & Post Production
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <span className="hover:text-orange-400 transition">Ghost Writing</span>
          <span className="hover:text-orange-400 transition">Screenplay Development</span>
          <span className="hover:text-orange-400 transition">Talent Handling</span>
          <span className="hover:text-orange-400 transition">Video Editing</span>
          <span className="hover:text-orange-400 transition">Reel Editing</span>
          <span className="hover:text-orange-400 transition">Color Correction & Color Grading</span>
        </div>
      </div>
    </div>
  );
}

export default Page5;
