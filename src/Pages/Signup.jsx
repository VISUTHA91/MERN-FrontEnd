// import React from 'react'

// function Signup() {
//   return (
//     <div>Signup</div>
//   )
// }

// export default Signup


import React from 'react'
import { useState } from 'react';

function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        phonenumber:"",
        email: "",
        password: "",
        confirmpassword:"",
      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission logic here, like sending data to your API
        console.log("Form data submitted:", formData);
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
                value={formData.name}
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
                id="phonenumber"
                name="phonenumber"
                value={formData.phonenumber}
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
                value={formData.email}
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
                value={formData.password}
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
                value={formData.confirmpassword}
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