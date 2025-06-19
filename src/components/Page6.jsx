import React from "react";
import { NavLink } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white font-poppins flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-10">
      
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bebas tracking-widest leading-tight uppercase text-white drop-shadow-lg">
          Turning Imagination
          <br />
          Into Reality
        </h1>
        <NavLink
          to="/contact"
          className="inline-block mt-8 px-6 py-3 border-2 border-white rounded-xl text-sm font-semibold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
        >
          Let's Talk
        </NavLink>
      </div>

      {/* Marquee Section */}
      <div className="overflow-hidden w-full py-6 sm:py-10 bg-black rotate-[-3deg]">
        <style>
          {`
            @keyframes marquee {
              0%   { transform: translateX(0%); }
              100% { transform: translateX(-100%); }
            }

            .marquee {
              animation: marquee 35s linear infinite;
            }
          `}
        </style>

        <div className="whitespace-nowrap w-full">
          <ul className="inline-flex marquee gap-12 sm:gap-20 md:gap-28">
            {[
              "Photography",
              "Videography",
              "Pre & Post Production",
              "Photography",
              "Videography",
              "Pre & Post Production"
            ].map((text, index) => (
              <li
                key={index}
                className="uppercase text-3xl sm:text-5xl md:text-7xl font-extrabold font-bebas text-white tracking-wider"
              >
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
