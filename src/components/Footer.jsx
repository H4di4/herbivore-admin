import React from 'react';
import logo from "../assets/header.jpg"

const Footer = () => {
    return (
        <footer className="bg-white mt-10 text-black py-12 px-2 sm:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">

                {/* Section 1: Plant powered */}
                <div className="flex flex-col items-start mr-8">
                    <img src={logo} alt="Logo" className="mb-2 w-56" />
                    <h3 className="text-gray-900 mb-4 ">Plant powered, clinically effective</h3>
                </div>

                {/* Other sections */}
                <div className='ml-12'>
                    <h4 className="text-gray-900 mb-4 text-[14px] ">SHOP</h4>
                    <ul className="space-y-2 text-sm leading-7">
                        <li><a href="#">Shop All</a></li>
                        <li><a href="#">Bestsellers</a></li>
                        <li><a href="#">Skincare</a></li>
                        <li><a href="#">Bath + Body</a></li>
                        <li><a href="#">Sets + Bundles</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-gray-900 mb-4 text-[14px]">ABOUT</h4>
                    <ul className="space-y-2 text-sm leading-7">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Blog: Naturally Speaking</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-gray-900 mb-4 text-[14px] ">CUSTOMER SERVICE</h4>
                    <ul className="space-y-2 text-sm leading-7">
                        <li><a href="#">FAQs</a></li>
                        <li><a href="#">Returns</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Find a Store</a></li>
                        <li><a href="#">Affiliates</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-gray-900 mb-4 text-[14px]">ACCOUNT</h4>
                    <ul className="space-y-2 text-sm list-none">
                        <li><a href="#">My Account</a></li>
                    </ul>
                </div>

            </div>

            {/* Legal section aligned left */}
            <div className="mt-20 pt-2  flex flex-col justify-between uppercase text-xs leading-6 text-black max-w-7xl mx-auto px-0">
                <div className="w-full pl-0 text-left">
                    <span>© 2025 Herbivore Botanicals, LLC. All rights reserved.</span>

                    <br />
                    <a href="#">Privacy Policy</a>
                    <span className="mx-2">·</span>
                    <a href="#">Terms of Service</a>
                    <span className="mx-2">·</span>
                    <a href="#">Accessibility</a>
                </div>
            </div>
        </footer>

    );
};

export default Footer;
