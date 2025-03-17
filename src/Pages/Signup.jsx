import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import * as apiCalls from "../api/apiServices.jsx"
import {  FaEye, FaEyeSlash } from "react-icons/fa";
function Signup() {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        name: "",
        phone_number:"",
        email: "",
        password: "",
        confirmpassword:"",
      });
        const [showPassword, setShowPassword] = useState(false);
        const [confirmpassword, setConfirmpassword] = useState(false);
      const handleChange = (e) => {
        setUserData({
          ...userData,
          [e.target.name]: e.target.value,
        });
      };
      const handleSubmit = async(e) => {
        e.preventDefault();
        const data = await apiCalls.registerUser(userData);
        try {
          console.log("Registration  Successful:", data);
          localStorage.setItem("authToken", data.token); // Storing token if needed
        } catch (error) {
          console.log(error);
          console.error("Registration failed:", error.message || error);
        }
        navigate("/Signin")
      };
      return (
        <div className="flex justify-center items-center bg-fuchsia-900">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-md mt-24 w-80">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                // onChange={handleChange}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^(?![0-9]+$)(?!\s+$)[a-zA-Z0-9 ]*$/.test(value)) {
                    handleChange(e);
                  }
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your Name"
                required/>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phonenumber">
                PhoneNo
              </label>
              <input
                type="number"
                id="phone_number"
                name="phone_number"
                value={userData.phone_number}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) {
                    handleChange(e);
                  }
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your Contact Number"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Email Address"
                required
              />
            </div>   
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"} 
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="********"
                required
              />
                 <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)} // Toggle state
                      className="absolute right-2 top-2/4 transform -translate-y-1/5 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
               Confirm Password
              </label>
              <input
                type={confirmpassword ? "text" : "password"} // Toggle type
                id="confirmpassword"
                name="confirmpassword"
                value={userData.confirmpassword}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="*********"
                required
              />
                   <button
                      type="button"
                      onClick={() => setConfirmpassword(!confirmpassword)} // Toggle state
                      className="absolute right-2 top-1/2 transform -translate-y-1/5 text-gray-500 hover:text-gray-700"
                    >
                      {confirmpassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
            </div>        
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      );
    };


export default Signup