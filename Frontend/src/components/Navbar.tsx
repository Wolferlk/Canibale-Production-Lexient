import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed w-full h-20 bg-black/95 backdrop-blur-sm text-white z-50">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <img
              src="https://i.ibb.co/wFwh11s6/cannibal-logo-02.png"
              alt="CANNIBAL.CO Logo"
              className="h-auto w-40 object-contain"
            />
          </Link>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="hover:text-gray-300 transition-colors">Home</Link>
              <Link to="/store" className="hover:text-gray-300 transition-colors">Shop</Link>
              <Link to="/fashiongallery" className="hover:text-gray-300 transition-colors">Gallery</Link>
              <Link to="/about" className="hover:text-gray-300 transition-colors">About</Link>
              <Link to="/contact" className="hover:text-gray-300 transition-colors">Contact</Link>
            </div>
            
            <Link to="/cart" className="hover:text-gray-300 transition-colors" onClick={closeMenu}>
              <ShoppingCart className="w-6 h-6" />
            </Link>

            <button 
              onClick={toggleMenu} 
              className="md:hidden p-1 hover:bg-white/10 rounded transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with smooth animation */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isMenuOpen 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="bg-black/90 backdrop-blur-sm px-4 py-6 space-y-4">
          <Link 
            to="/" 
            className="block py-2 px-3 hover:bg-white/10 rounded transition-colors text-lg"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link 
            to="/store" 
            className="block py-2 px-3 hover:bg-white/10 rounded transition-colors text-lg"
            onClick={closeMenu}
          >
            Shop
          </Link>
          <Link 
            to="/fashiongallery" 
            className="block py-2 px-3 hover:bg-white/10 rounded transition-colors text-lg"
            onClick={closeMenu}
          >
            Gallery
          </Link>
          <Link 
            to="/about" 
            className="block py-2 px-3 hover:bg-white/10 rounded transition-colors text-lg"
            onClick={closeMenu}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="block py-2 px-3 hover:bg-white/10 rounded transition-colors text-lg"
            onClick={closeMenu}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}