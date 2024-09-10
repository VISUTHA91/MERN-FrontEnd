import React from 'react'
import { useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { useRef,useEffect } from 'react';
function Navbar() {
  let Links = [
    { name: "HOME", link: "/" },
    { name: "ABOUT", link: "/" },
    { name: "CONTACT", link: "/" },
  ];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);


  return (

    <nav className="flex p-4 justify-between">
       <div onClick={()=>setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'>
                {
                    open ? <IoMdClose /> : <RxHamburgerMenu />

                }
            </div>
       <div className='font-bold text-2xl cursor-pointer flex items-center gap-1'>
          <p>ABC</p>
      </div>
      <div>
    <ul  className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-16 p-4 ml-2 bg-blue-100 w-36' : 'top-[-490px]'}`} >
    {/*  className="flex justify-between items-center"> */}
      {Links.map((link) => (
        <li key={link.name} className="ml-4 font-semibold">
          <a href={link.link} className="hover:text-blue-400 duration-500">
            {link.name}
          </a>
        </li>
      ))}

      {/* Dropdown Menu */}
      <li className="relative ml-4">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className=" hover:text-blue-400 font-semibold"
        >
          PRODUCTS
        </button>

        {isDropdownOpen && (
          <ul className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-20">
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-blue-400 hover:text-white duration-300"
              >
                Dropdown Item 1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-blue-400 hover:text-white duration-300"
              >
                Dropdown Item 2
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-blue-400 hover:text-white duration-300"
              >
                Dropdown Item 3
              </a>
            </li>
          </ul>
        )}
      </li>
    </ul>
    </div>
    <div>


    </div>
  </nav>


  )
}

export default Navbar