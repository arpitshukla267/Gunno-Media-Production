import { Instagram, Linkedin } from "lucide-react";
import { NavLink } from "react-router-dom";
import { FaBehance } from "react-icons/fa";


function Footer() {
  return (
    <footer className="w-full font-poppins text-sm text-gray-400 flex flex-col md:flex-row justify-between gap-12 border-t border-gray-700 pt-10 px-6 pb-12 bg-black">
      
      {/* About */}
      <div>
        <p className="uppercase text-xs font-semibold mb-4 tracking-widest text-white">About</p>
        <ul className="space-y-3 text-sm">
          <li>
            <NavLink
              to="/Work"
              className={({ isActive }) =>
                `hover:text-white transition duration-200 ${
                  isActive ? 'text-white underline' : 'text-gray-400'
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
                `hover:text-white transition duration-200 ${
                  isActive ? 'text-white underline' : 'text-gray-400'
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
                `hover:text-white transition duration-200 ${
                  isActive ? 'text-white underline' : 'text-gray-400'
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
        <p className="uppercase text-xs font-semibold mb-4 tracking-widest text-white">Location</p>
        <p className="leading-relaxed text-sm text-gray-400">
          RISE<br />
          JHANSI, 284003<br />
          Uttar Pradesh, India
        </p>
      </div>

      {/* Socials */}
      <div>
        <p className="uppercase text-xs font-semibold mb-4 tracking-widest text-white">Socials</p>
        <ul className="space-y-3">
          <li>
            <a
              href="https://www.instagram.com/gunnomediaproductions/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm hover:text-white transition-colors"
            >
              <Instagram size={18} /> Instagram
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/company/gunno-media-productions/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm hover:text-white transition-colors"
            >
              <Linkedin size={18} /> LinkedIn
            </a>
          </li>
          <li>
            <a
              href="https://www.behance.net/sachinshukla11"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm hover:text-white transition-colors"
            >
              <FaBehance size={18} /> Behance
            </a>
          </li>
        </ul>
      </div>

      {/* Year */}
      <div className="text-xs md:text-center text-gray-500 mt-4 md:mt-0 self-end md:self-start">
        © 2025 Gunno Media Productions
      </div>
    </footer>
  );
}

export default Footer;
