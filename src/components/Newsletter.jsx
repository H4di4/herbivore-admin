import React from 'react';
import bgImage from '../assets/Newsletter.jpg'; 

const Newsletter = () => {
  return (
    <section
      className="relative bg-cover mt-32 bg-center text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay to make text readable */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl md:text-3xl font-normal mb-6">
       SIGN UP FOR 15% OFF
        </h2>
        <p className="text-sm md:text-base mb-8">
          Get 15% off your first order plus access to new drops, product tips, and exclusive offers.
        </p>

        {/* Email input and button */}
        <form className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="E-mail"
            className="w-[500px] sm:w-auto px-4 py-2 text-black placeholder-gray-500  border border-gray-300 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 w-52 bg-white text-black border border-black  transition"
          >
           SIGN UP
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
