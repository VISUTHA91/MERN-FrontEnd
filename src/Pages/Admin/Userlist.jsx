import React from 'react'
import { getAllUser } from '../../api/apiServices';
import { useEffect } from 'react';
import { useState } from 'react';




function Userlist() {

  const [userlist, setUserlist] = useState([]);
  

useEffect(() => {
  const fetchuserlist = async () => {
    try {
      const response = await getAllUser(); // Fetch categories from backend
      console.log("Fetched Data",response)
      setUserlist(response.alluser); // Store fetched categories
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  fetchuserlist();
}, []);

  return (
    <div className=''>
  <h1 className="text-2xl font-bold mb-4 p-10 pl-10">User Details</h1>
  <div className="">
    {userlist && (
      <table className="w-full bg-white border border-gray-300 rounded-lg shadow-lg  mr-14">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Contact</th>
            {/* <th className="py-2 px-4 border-b">Password</th> */}
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {userlist.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100 w-1/4">
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.phone_number}</td>
              {/* <td className="py-2 px-4 border-b">{user.password}</td> */}
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700"
                  onClick={(e) => {
                    deleteuser(user._id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
</div>

  )
}

export default Userlist