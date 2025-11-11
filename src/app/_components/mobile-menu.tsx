"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "./container";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button 
        onClick={toggleMenu}
        className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1"
        aria-label="Toggle menu"
      >
        <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
        <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
        <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Background overlay */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={toggleMenu}
          ></div>
          
          {/* Menu content */}
          <div className="absolute top-0 right-0 w-full h-full bg-white flex flex-col">
            <div className="py-8 border-b">
              <Container>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl tracking-tighter font-normal">C r a f t</h2>
                  <button 
                    onClick={toggleMenu}
                    className="flex flex-col items-center justify-center w-8 h-8 space-y-1"
                    aria-label="Close menu"
                  >
                    <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                    <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                  </button>
                </div>
              </Container>
            </div>
            
            <nav className="flex flex-col items-center justify-center flex-1 space-y-8">
            <Link 
                href="/" 
                className="text-lg font-normal hover:opacity-70 transition-opacity"
                onClick={toggleMenu}
              >
                STORY
              </Link>

              <Link 
                href="/about" 
                className="text-lg font-normal hover:opacity-70 transition-opacity"
                onClick={toggleMenu}
              >
                ABOUT
              </Link>
              <Link 
                href="/work" 
                className="text-lg font-normal hover:opacity-70 transition-opacity"
                onClick={toggleMenu}
              >
                WORK
              </Link>
              <Link 
                href="/dashboard" 
                className="text-lg font-normal hover:opacity-70 transition-opacity"
                onClick={toggleMenu}
              >
                PORTAL
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}