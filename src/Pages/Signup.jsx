// import React from 'react'

// function Signup() {
//   return (
//     <div>Signup</div>
//   )
// }

// export default Signup


import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import * as apiCalls from "../api/apiServices.jsx"



function Signup() {
  const navigate = useNavigate()

    const [userData, setUserData] = useState({
        name: "",
        phone_number:"",
        email: "",
        password: "",
        confirmpassword:"",
      });
    
      const handleChange = (e) => {
        setUserData({
          ...userData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        // Perform form submission logic here, like sending data to your API
        // console.log("Form data submitted:", userData);
        const data = await apiCalls.registerUser(userData);
        try {
          // console.log(data) // Correctly passing the 'user' object
          console.log("Registration  Successful:", data);
          localStorage.setItem("authToken", data.token); // Storing token if needed
        } catch (error) {
          console.log(error);
          console.error("Registration failed:", error.message || error);
        }
        navigate("/Signin")

      };
    
      return (
    
        <div className="flex justify-center items-center h-full bg-fuchsia-900">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-md mt-24 w-80"
          >
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
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your Name"
                required
              />
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
                onChange={handleChange}
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
            
    
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="********"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
               Confirm Password
              </label>
              <input
                type="confirmpassword"
                id="confirmpassword"
                name="confirmpassword"
                value={userData.confirmpassword}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="********"
                required
              />
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