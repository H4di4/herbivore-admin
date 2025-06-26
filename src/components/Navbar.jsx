import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import headerImg from "../assets/header.jpg"



const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
    <nav className="bg-[#ffffff] shadow-md sticky top-0 z-50 min-h-2 ">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center space-x-8">
        <Link to="/" >
         <img src={headerImg} className='w-72 -ml-10 mt-2'></img>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 font-normal tracking-wider text-black">
          <Link to="/shop" className='text-sm ' >SHOP</Link>
          <Link to="/bestseller" className='text-sm '>BESTSELLERS</Link>
          <Link to="/contact" className='text-sm '>CONTACT</Link>
             <Link to="/about" className=' text-sm'>ABOUT US</Link>
        </div>
</div>
        {/* Right Section */}
        <div className="flex  items-center space-x-4">
           <Link
            to="/admin/login"
            className="hidden md:inline-block  text-black px-3 py-1 rounded  transition font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
              class="feather feather-user">
              <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
               <svg xmlns="http://www.w3.org/2000/svg" 
     width="30" height="24" 
     viewBox="0 0 24 24" 
     fill="none" 
     stroke="currentColor" 
     stroke-width="1.5" 
     stroke-linecap="round" 
     stroke-linejoin="round" 
     class="feather feather-search">
  <circle cx="11" cy="11" r="8"></circle>
  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
</svg>

          <Link to="/cart" className="px-3 py-1 flex items-center">  <svg xmlns="http://www.w3.org/2000/svg"
            width="30" height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-cart">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 
           2 1.61h9.72a2 2 0 0 0 
           2-1.61L23 6H6"></path>
          </svg>
          </Link>
     
         

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-8 h-8 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
       
      </div>
     

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#ffffff] shadow-inner px-6 py-4 space-y-4 font-medium text-black">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block transition">Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="block  transition">About</Link>
          <Link to="/blog" onClick={() => setMenuOpen(false)} className="block  transition">Blog</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="block  transition">Contact</Link>
          <a href="/admin" className="block text-black font-semibold" onClick={() => setMenuOpen(false)}>Admin</a>
          <Link to="/cart" onClick={() => setMenuOpen(false)} className="block text-2xl">🛒</Link>
        </div>
      )}
    </nav>
   
    </>
  );
  
};

export default Navbar;
