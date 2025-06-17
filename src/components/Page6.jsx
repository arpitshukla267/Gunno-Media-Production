import React from "react";
import { NavLink } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-around px-4 sm:px-6 md:px-10 py-6 sm:py-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl md:text-6xl mb-6 sm:mb-10 font-bold tracking-widest leading-tight uppercase">
          Turning Imagination
          <br />
          Into Reality
        </h1>
        <NavLink
          to="/contact"
          className="font-bold border-2 px-4 py-2 rounded-xl text-sm hover:cursor-pointer hover:text-gray-400"
        >
          Let's Talk
        </NavLink>
      </div>

      {/* Marquee Section */}
      <div className="overflow-hidden whitespace-nowrap w-full bg-black py-6 sm:py-10 rotate-[-5deg]">
        <style>
          {`
            @keyframes marquee {
              0%   { transform: translateX(-100%); }
              100% { transform: translateX(0%); }
            }

            .marquee {
              animation: marquee 40s linear infinite;
            }
          `}
        </style>

        <ul className="inline-flex marquee gap-8 sm:gap-12 md:gap-16 mb-10 sm:mb-20">
          {[
            "photography",
            "videography",
            "Pre & Post Production",
            "photography",
            "videography",
            "Pre & Post Production",
            "photography",
            "videography",
            "Pre & Post Production"
          ].map((text, index) => (
            <li
              key={index}
              className="uppercase text-4xl sm:text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white whitespace-nowrap"
            >
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
