import { Instagram, Twitter, Camera, Linkedin } from "lucide-react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full text-sm text-gray-400 flex flex-col md:flex-row justify-between gap-12 border-t border-gray-700 pt-10 px-6 pb-12 bg-black">
      {/* About */}
      <div>
        <p className="uppercase text-xs mb-3 tracking-wider text-white">About</p>
        <ul className="space-y-2 text-gray-400 transition-colors">
          <li>
            <NavLink
              to="/Work"
              className={({ isActive }) =>
                `hover:text-white cursor-pointer ${
                  isActive ? 'ring-2 ring-white' : ''
                }`
              }
            >
              Works
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/About"
              className={({ isActive }) =>
                `hover:text-white cursor-pointer ${
                  isActive ? 'ring-2 ring-white' : ''
                }`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `hover:text-white cursor-pointer ${
                  isActive ? 'ring-2 ring-white' : ''
                }`
              }
            >
              Contact 
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Location */}
      <div>
        <p className="uppercase text-xs mb-3 tracking-wider text-white">Location</p>
        <p className="leading-relaxed text-gray-400">
          RISE<br />
          JHANSI, 284003<br />
          Uttar Pradesh, India
        </p>
      </div>

      {/* Socials */}
      <div>
        <p className="uppercase text-xs mb-3 tracking-wider text-white">Socials</p>
        <ul className="space-y-3 text-gray-400">
          <li>
            <a href=" https://www.instagram.com/gunnomediaproductions/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white cursor-pointer">
              <Instagram size={16} /> Instagram
            </a>
          </li>
          <li>
            <a href=" https://www.linkedin.com/company/gunno-media-productions/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white cursor-pointer">
              <Linkedin size={16} /> Linked In
            </a>
          </li>
          <li>
            <a href="https://www.behance.net/sachinshukla11" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white cursor-pointer">
              <Camera size={16} /> Behance
            </a>
          </li>
        </ul>
      </div>

      {/* Year */}
      <div className="text-xs text-gray-500 mt-4 md:mt-0 self-end md:self-start">
        © 2025
      </div>
    </footer>
  );
}

export default Footer;
