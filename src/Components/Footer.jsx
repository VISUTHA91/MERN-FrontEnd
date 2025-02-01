import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook } from "react-icons/bs";
import { GrInstagram } from "react-icons/gr";
// import { FaSquareTwitter } from "react-icons/fa6";
import { BsWhatsapp } from "react-icons/bs";

import { IoLogoLinkedin } from "react-icons/io5";

const Footer = () => {
  // return (
  //   <footer className="bg-fuchsia-900 text-white OpenSans py-10 w-full">
  //     <div className="container  grid grid-cols-1 md:grid-cols-4 gap-8 px-4 ml-10">
  //       {/* Company Info */}
  //       <div>
  //         <h3 className="text-xl font-bold mb-4">Evvi Tees</h3>
  //         <p className="w-48">
  //           Our store, where you can find the best deals on quality products.
  //         </p>
  //         <p className="mt-2">© 2024 Evvi Tees. All rights reserved.</p>
  //       </div>

  //       {/* Useful Links */}
  //       <div>
  //         <h3 className="text-xl font-bold mb-4">Useful Links</h3>
  //         <ul>
  //           <li className="mb-2">
  //             <Link to="/" className="hover:underline">
  //               Home
  //             </Link>
  //           </li>
  //           <li className="mb-2">
  //             <Link to="/" className="hover:underline">
  //               Shop
  //             </Link>
  //           </li>
  //           <li className="mb-2">
  //             <Link to={"/About"} className="hover:underline">
  //               About Us
  //             </Link>
  //           </li>
  //           <li className="mb-2">
  //             <Link to={"/Contact"} className="hover:underline">
  //               Contact Us
  //             </Link>
  //           </li>
  //           <li className="mb-2">
  //             {/* <Link to={'/Vendor/VendorDashboard'} className="hover:underline"> */}
  //             <Link to={"/vendor/login"} className="hover:underline">
  //               Vendor
  //             </Link>
  //           </li>
  //         </ul>
  //       </div>

  //       {/* Support */}
  //       <div>
  //         <h3 className="text-xl font-bold mb-4">Support</h3>
  //         <ul>
  //           <li className="mb-2">
  //             <Link to={"/Support"} className="hover:underline">
  //               FAQ
  //             </Link>
  //           </li>
  //           <li className="mb-2">
  //             <Link to={"/Support"} className="hover:underline">
  //               Shipping & Returns
  //             </Link>
  //           </li>
  //           <li className="mb-2">
  //             <Link to={"/Support"} className="hover:underline">
  //               Terms & Conditions
  //             </Link>
  //           </li>
  //           <li className="mb-2">
  //             <Link to={"/Support"} className="hover:underline">
  //               Privacy Policy
  //             </Link>
  //           </li>
  //         </ul>
  //       </div>

  //       {/* Social Media */}
  //       <div>
  //         <h3 className="text-xl font-bold mb-4 ml-8">Follow Us</h3>
  //         <div className="flex space-x gap-4 lg:flex-row sm:flex-col sm:ml-8">
  //           <a
  //             href="https://facebook.com"
  //             className="hover:transition duration-300 ease-in-out transform hover:scale-110"
  //           >
  //             <BsFacebook size={30} />
  //           </a>
  //           <a
  //             href="https://web.whatsapp.com/"
  //             className="hover:transition duration-300 ease-in-out transform hover:scale-110"
  //           >
  //             <BsWhatsapp size={30} />
  //           </a>
  //           <a
  //             href="https://instagram.com"
  //             className="hover:transition duration-300 ease-in-out transform hover:scale-110"
  //           >
  //             <GrInstagram size={30} />
  //           </a>
  //           <a
  //             href="https://linkedin.com"
  //             className="hover:transition duration-300 ease-in-out transform hover:scale-110"
  //           >
  //             <IoLogoLinkedin size={30} />
  //           </a>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Footer Bottom */}
  //     <div className="mt-8 border-t border-gray-700 pt-4 text-center text-white text-sm">
  //       <p>Designed and Developed by Evvi</p>
  //     </div>
  //   </footer>
  // );

  return (
    <footer className="bg-fuchsia-900 text-white font-sans py-10 w-full">
      <div className="container mx-auto px-4 md:grid md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Evvi Tees</h3>
          <p className="mb-4 max-w-xs">
            Discover the best deals on quality products at our store.
          </p>
          <p className="text-sm">© 2024 Evvi Tees. All rights reserved.</p>
        </div>
  
        {/* Useful Links */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Useful Links</h3>
          <ul>
            <li className="mb-2">
              <Link to="/" className="hover:underline text-sm">
                Home
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/shop" className="hover:underline text-sm">
                Shop
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/about" className="hover:underline text-sm">
                About Us
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/contact" className="hover:underline text-sm">
                Contact Us
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/vendor/login" className="hover:underline text-sm">
                Vendor Login
              </Link>
            </li>
          </ul>
        </div>
  
        {/* Support */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Support</h3>
          <ul>
            <li className="mb-2">
              <Link to="/FAQ" className="hover:underline text-sm">
                FAQ
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/support" className="hover:underline text-sm">
                Shipping & Returns
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/support" className="hover:underline text-sm">
                Terms & Conditions
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/support" className="hover:underline text-sm">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
  
        {/* Social Media */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 lg:flex-row sm:flex-col">
            <a
              href="https://facebook.com"
              className="hover:transition duration-300 ease-in-out transform hover:scale-110"
              aria-label="Facebook"
            >
              <BsFacebook size={30} />
            </a>
            <a
              href="https://web.whatsapp.com/"
              className="hover:transition duration-300 ease-in-out transform hover:scale-110"
              aria-label="WhatsApp"
            >
              <BsWhatsapp size={30} />
            </a>
            <a
              href="https://instagram.com"
              className="hover:transition duration-300 ease-in-out transform hover:scale-110"
              aria-label="Instagram"
            >
              <GrInstagram size={30} />
            </a>
            <a
              href="https://linkedin.com"
              className="hover:transition duration-300 ease-in-out transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <IoLogoLinkedin size={30} />
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
