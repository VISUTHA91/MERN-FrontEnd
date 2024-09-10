// import React, { useState, useRef, useEffect } from 'react';
// import { RxHamburgerMenu } from "react-icons/rx";
// import { IoMdClose } from "react-icons/io";
// import { BsFillHandbagFill } from "react-icons/bs";
// import { FaUserAlt } from "react-icons/fa";
// import { IoIosSearch } from "react-icons/io";




// function Nav() {
//   const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
//   const aboutDropdownRef = useRef(null);
//   const [open, setOpen] = useState(false);


//   const Links = [
//     { name: "HOME", link: "/Home" },
//     // { name: "ABOUT", link: "/About" },
//     { name: "PRODUCTS", link: "/Product" },
//     { name: "CONTACT", link: "/Contact" },
//   ];

//   // Function to handle outside click
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target)) {
//         setIsAboutDropdownOpen(false);
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [aboutDropdownRef]);

//   return (
//     <nav className=" p-4  w-full flex fixed justify-between border border-b-2 shadow-cyan-500/50">
//         <div onClick={()=>setOpen(!open)} className='absolute right-1 top-7 cursor-pointer md:hidden w-7 h-7'>
//                 {
//                     open ? <IoMdClose size={28} /> : <RxHamburgerMenu size={28} />

//                 }
//             </div>
//        <div className='font-bold text-2xl cursor-pointer ml-6 flex items-center gap-1'>
//           <p>ABC</p>
//       </div>
//       <ul className={`md:flex md:items-center md:pb-0 pb-12 gap-10 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-16 p-4 ml-2 leading-loose w-36' : 'top-[-490px]'}`} > 
      
//       {/* className="flex justify-between items-center text-white"> */}
//         {Links.map((link) => (
//           <li key={link.name} className="relative ml-4 font-semibold ">
//             {link.name === "PRODUCTS" ? (
//               <>
//                 <button
//                    onMouseOver={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
//                   className=" hover:text-blue-400 duration-500"
//                   ref={aboutDropdownRef}
//                 >
//                   {link.name}
//                 </button>
//                 {isAboutDropdownOpen && (
//                   <ul className="absolute left-0 mt-6 py-2 w-48 rounded-md shadow-lg z-20">
//                     <li>
//                       <a
//                         href="/about-us"
//                         className="block px-4 py-2  hover:bg-blue-400 hover:text-white duration-300"
//                       >
//                         Product 1
//                       </a>
//                     </li>
//                     <li>
//                       <a
//                         href="/team"
//                         className="block px-4 py-2  hover:bg-blue-400 hover:text-white duration-300"
//                       >
//                         Product 2
//                       </a>
//                     </li>
//                     <li>
//                       <a
//                         href="/careers"
//                         className="block px-4 py-2  hover:bg-blue-400 hover:text-white duration-300"
//                       >
//                         Product 3
//                       </a>
//                     </li>
//                   </ul>
//                 )}
//               </>
//             ) : (
//               <a href={link.link} className="hover:text-blue-500 duration-500 ">
                
//                 {link.name}
//               </a>
              
//             )}
//           </li>
          
//         ))}
//       </ul>

//       <div className='flex  justify-between gap-48 mr-6 mt-2'>
//       {/* <div class="flex flex-1 items-center justify-center p-2"> */}
//     <div className="w-full flex max-w-64 mt-0 focus:border-blue-500 ">
//         <div className=" sm:mt-10">
//             <input id="q" name="q" className="inline w-80  border rounded-xl bg-white py-2 pl-1 pr-3 placeholder-gray-500    sm:text-sm" placeholder="Search Products" type="text"   />
//             <button type="submit" class="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 
//             sm:mt-10 sm:ml-3 sm:w-auto sm:text-sm">Search</button>
//             </div>
//             {/* <IoIosSearch size={28} className='mr-2 cursor-pointer' onClick={""}  /> */}
//     </div>
//     <div className='flex gap-4'>
//     <a  href='Cart'><BsFillHandbagFill size={28} className='cursor-pointer'/></a>
//       <a href='Signin'><FaUserAlt size={28} className='cursor-pointer'  /></a>
//       </div>
//       </div>
//     </nav>
//   );
// }

// export default Nav;





import React, { useState, useRef, useEffect } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { BsFillHandbagFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

function Nav() {
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const aboutDropdownRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const Links = [
    { name: "HOME", link: "/Home" },
    { name: "PRODUCTS", link: "/Product" },
    { name: "CONTACT", link: "/Contact" },
  ];

  // Function to handle outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target)) {
        setIsAboutDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [aboutDropdownRef]);

  // Handle scroll event to change navbar background color
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY >=90) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the scroll event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`p-4 w-full flex fixed justify-between items-center shadow-lg z-40 transition-colors duration-500 ${
        isScrolled ? 'bg-fuchsia-900 text-white' : 'bg-transparent text-white'}`}>
      <div className="font-bold text-white text-2xl cursor-pointer ml-6 mt-4 flex items-center gap-1">
        <a href="/"> <p>ABC</p></a>
      </div>

      <div onClick={() => setOpen(!open)} className="absolute right-5 top-5 cursor-pointer md:hidden">
        {open ? (<IoMdClose size={28} />) : (<RxHamburgerMenu size={28} />)}
      </div>

      <ul className={`md:flex md:items-center text-white md:pb-0 pb-12 absolute md:static bg-gray md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 p-2 gap-20 transition-all duration-500 ease-in ${open ? 'top-20 text-black' : 'top-[-490px]'}`}>
        {Links.map((link) => (
          <li key={link.name} className="relative ml-4 mt-4 font-semibold">
            {link.name === "PRODUCTS" ? (
              <>
                <button
                  onMouseOver={() => setIsAboutDropdownOpen(true)}
                  onMouseOut={() => setIsAboutDropdownOpen(false)}
                  className="hover:text-blue-400 duration-500"
                  ref={aboutDropdownRef}
                >
                  {link.name}
                </button>
                {isAboutDropdownOpen && (
                  <ul className="absolute left-0 mt-6 py-2 w-48 rounded-md shadow-lg bg-white z-20">
                    <li>
                      <a href="/product1" className="block px-4 py-2 hover:bg-blue-400 hover:text-white duration-300">Product 1</a>
                    </li>
                    <li>
                      <a href="/product2" className="block px-4 py-2 hover:bg-blue-400 hover:text-white duration-300">Product 2</a>
                    </li>
                    <li>
                      <a href="/product3" className="block px-4 py-2 hover:bg-blue-400 hover:text-white duration-300">Product 3</a>
                    </li>
                  </ul>
                )}
              </>
            ) : (
              <a href={link.link} className="hover:text-blue-500 duration-500">
                {link.name}
              </a>
            )}
          </li>
        ))}
      </ul>

      <div className="hidden md:flex items-center text-white justify-between gap-6 w-96 bg-blue mr-10">
        <div className="relative flex items-center w-full bg-blue">
          <input
            id="q"
            name="q"
            className="w-full max-w-xs border rounded-xl py-2 pl-3 pr-10 placeholder-gray-500 text-sm focus:border-blue"
            placeholder="Search Products"
            type="text"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-600">
            <IoIosSearch size={20} />
          </button>
        </div>
        <div className="flex items-center gap-8 bg-blue">
          <a href="/Cart">
            <BsFillHandbagFill size={28} className="cursor-pointer" />
          </a>
          <a href="/Signin">
            <FaUserAlt size={28} className="cursor-pointer" />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
