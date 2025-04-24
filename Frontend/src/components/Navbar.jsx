import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo2.svg'; // adjust path if needed


const Navbar = () => (
  <nav className="bg-gray-900 text-white shadow-md">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      {/* Logo / App Name */}
      <Link to="/" className="flex items-center space-x-2">
        <img src={logo} alt="BeatNest Logo" className="h-8 w-8" />
        <span className="text-2xl font-bold text-yellow-400 hover:text-yellow-500 transition-colors">BeatNest</span>
      </Link>


      {/* Navigation Links */}
      <div className="space-x-6 text-sm md:text-base">
        <Link
          to="/"
          className="hover:text-yellow-400 transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          to="/search"
          className="hover:text-yellow-400 transition-colors duration-200"
        >
          Search
        </Link>
        <Link
          to="/playlist"
          className="hover:text-yellow-400 transition-colors duration-200"
        >
          Playlist
        </Link>
        <Link
          to="/about"
          className="hover:text-yellow-400 transition-colors duration-200"
        >
          About
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
