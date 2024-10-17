import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MdEmail } from "react-icons/md";
import { FaUnlock } from "react-icons/fa";
import { login } from '../../assets/Images';
import *as apiCalls from '../../api/apiServices.jsx';

function VendorLogin() {
  const [vendor, setVendor] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setVendor({
      ...vendor,
      [e.target.name]: e.target.value,
    });
  };


  const registerVendor = async (e) => {
    e.preventDefault();
    // console.log(user)
    try {
      const data = await apiCalls.vendorLogin(vendor); // Correctly passing the 'user' object
      console.log("Login In Successful:", data);
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("vendor", JSON.stringify({ id:data.vendor.id})); // Store user name
      // console.log("hello",data.user);
      navigate("/Vendor/VendorDashboard")
      window.location.reload();
      // Storing token if needed
    } catch (error) {
      console.error("Login failed:", error.message || error);
      alert(error.message)
      // navigate("/Vendor/VendorSignup")
    }
  };

  return (
    <>
      <div className="flex w-full flex-wrap  justify-center bg-fuchsia-900 ">
        <div className="pointer-events-none hidden select-none shadow-2xl md:block md:w-1/2 lg:w-1/2 rounded-tl-2xl rounded-bl-2xl mt-10  mb-10 h-screen">
          <img className="h-screen w-full object-cover opacity-90  rounded-tl-3xl rounded-bl-3xl" src={login} />
        </div>
        <div className="flex w-full flex-col md:w-1/2 lg:w-1/3 mt-10 shadow- bg-fuchsia-50 rounded-tr-3xl rounded-br-3xl h-screen">
          <div className="my-auto flex flex-col justify-center px-6 pt-8 sm:px-24 md:justify-start md:px-8 md:pt-0 lg:px-12">
            <p className="text-center text-3xl font-bold">Welcome</p>
            <p className="mt-2 text-center">Login to access your  Vendor account.</p>
            <form method="POST"
              onSubmit={(e) => {
                registerVendor(e);
              }} className="flex flex-col pt-3 md:pt-8">
              <div className="flex flex-col pt-4">
                <div className="relative flex overflow-hidden rounded-lg border focus-within:border-transparent focus-within:ring-2 transition focus-within:ring-blue-600">
                  <span className="inline-flex items-center border-r border-gray-300 bg-white px-3 text-sm text-gray-500 shadow-sm">
                    <MdEmail />
                  </span>
                  <input type="email" id="email" name="email" value={vendor.email} onChange={handleChange}
                    className="w-full flex-1 appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400  focus:outline-none" placeholder="Email" />
                </div>
              </div>
              <div className="mb-12 flex flex-col pt-4">
                <div className="relative flex overflow-hidden rounded-lg border focus-within:border-transparent focus-within:ring-2 transition focus-within:ring-blue-600">
                  <span className="inline-flex items-center border-r border-gray-300 bg-white px-3 text-sm text-gray-500 shadow-sm">
                    <FaUnlock />
                  </span>
                  <input type="password" id="password"  name="password"  value={vendor.password} onChange={handleChange}
                    className="w-full flex-1 appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400  focus:outline-none" placeholder="Password" />
                </div>
              </div>
              <button type="submit" className="w-full rounded-lg bg-blue-700 px-4 py-2 text-center text-base font-semibold text-white shadow-md transition ease-in hover:bg-blue-600 focus:outline-none focus:ring-2">
                <span className="w-full"> Submit </span>
              </button>
            </form>
            <div className="pt-12 pb-12 text-center">
              <p className="whitespace-nowrap">
                Don't have an account?
                <a href="VendorSignup" className="font-semibold underline"> Register here. </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default VendorLogin