import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook } from "react-icons/bs";
import { GrInstagram } from "react-icons/gr";
// import { FaSquareTwitter } from "react-icons/fa6";
import { BsWhatsapp } from "react-icons/bs";

import { IoLogoLinkedin } from "react-icons/io5";




const Footer = () => {
  return (
    <footer className="bg-fuchsia-900 text-white py-10 w-full ml-10 lg:ml-0">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8 ml-10 ">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">Evvi Tees</h3>
          <p className="text-white">
            Our store, where you can find the best deals on quality products.
          </p>
          <p className="mt-2 text-white">© 2024 Evvi Tees. All rights reserved.</p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Useful Links</h3>
          <ul>
            <li className="mb-2">
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/" className="hover:underline">
                Shop
              </Link>
            </li>
            <li className="mb-2">
              <Link to={'/About'} className="hover:underline">
                About Us
              </Link>
            </li>
            <li className="mb-2">
              <Link to={'/Contact'} className="hover:underline">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-bold mb-4">Support</h3>
          <ul>
            <li className="mb-2">
              <Link to={"/Support"} className="hover:underline">
                FAQ
              </Link>
            </li>
            <li className="mb-2">
              <Link to={"/Support"} className="hover:underline">
                Shipping & Returns
              </Link>
            </li>
            <li className="mb-2">
              <Link to={"/Support"} className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
            <li className="mb-2">
              <Link to={"/Support"} className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="hover:transition duration-300 ease-in-out transform hover:scale-110">
            <BsFacebook size={30} />
             {/* Facebook */}
            </a>
            <a href="https://web.whatsapp.com/" className="hover:transition duration-300 ease-in-out transform hover:scale-110">
            <BsWhatsapp  size={30}/>

            {/* Twitter */}
            </a>
            <a href="https://instagram.com" className="hover:transition duration-300 ease-in-out transform hover:scale-110">
            <GrInstagram size={30} />
            </a>
            <a href="https://linkedin.com" className="hover: transition duration-300 ease-in-out transform hover:scale-110">

            <IoLogoLinkedin size={30} />
            {/* LinkedIn */}
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-white text-sm">
        <p>Designed and Developed by Evvi</p>
      </div>
    </footer>
  );
};

export default Footer;
