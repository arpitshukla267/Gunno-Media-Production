import React, { useState } from 'react';
import logo from '../assets/Gunnomedialogo.svg';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 w-full z-51 backdrop-blur-md bg-white/10 shadow-md px-6 sm:px-10 md:px-20 py-3 transition-all duration-300">
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <a href="/">
          <img
            src={logo}
            alt="Logo"
            className="h-10 sm:h-12 w-auto drop-shadow-md"
          />
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex flex-row gap-10 font-semibold text-[1rem] tracking-wide" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md transition duration-200 transform hover:scale-105 ${
                  isActive ? 'text-orange-500 font-bold underline' : 'text-orange-300'
                } hover:text-orange-400`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md transition duration-200 transform hover:scale-105 ${
                  isActive ? 'text-orange-500 font-bold underline' : 'text-orange-300'
                } hover:text-orange-400`
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Hamburger Icon */}
        <button onClick={toggleMenu} className="md:hidden text-orange-300 focus:outline-none">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-500 ease-in-out ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="bg-black/70 backdrop-blur-xl rounded-lg p-5 mt-2 shadow-lg">
          <ul
            className="flex flex-col gap-5 font-semibold text-center text-base tracking-wide"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            <li>
              <NavLink
                to="/"
                end
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md transition duration-200 ${
                    isActive ? 'text-orange-500 font-bold underline' : 'text-orange-300'
                  } hover:text-orange-400`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md transition duration-200 ${
                    isActive ? 'text-orange-500 font-bold underline' : 'text-orange-300'
                  } hover:text-orange-400`
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
