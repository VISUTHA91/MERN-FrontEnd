// import { useState,useEffect } from "react";
// import { Link } from 'react-router-dom';
// import { getCategories} from '../api/apiServices'

//   function ShopCategory() {

//     const [activeIndex, setActiveIndex] = useState(0);
//     const [categories, setCategories] = useState([]);

//     useEffect(() => {
//         const fetchCategories = async () => {
//           try {
//             const response = await getCategories(); // Fetch categories from backend
//             console.log("Fetched Data",response)
//             setCategories(response.data); // Store fetched categories
//           } catch (error) {
//             console.error('Error fetching categories:', error);
//           }
//         };
//         fetchCategories();
//       }, []);


//   return (
//     <div className="flex w-[90vw] mx-auto h-[80vh] overflow-hidden">
//       {/* {panels.map((panel, index) => ( */}
//     {categories.map((category,index) => (
//         <Link 
//         to={`/Productlist/${category.name}`}
//          key={category._id}
//          state={{ categoryId: category._id }}>
//         <div
//           key={index}
//           className={`relative flex-shrink-0 cursor-pointer transition-all duration-700 ease-in-out overflow-hidden ${
//             activeIndex === index ? "flex-[5]" : "flex-1"
//           } ${index >= 3 && "hidden sm:block"}`}
//           style={{
//             // backgroundImage: `url(${panel.imageUrl})`,
//             backgroundImage:`url(http://localhost:3000/${category.image})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             borderRadius: "12px",
//           }}
//           onClick={() => setActiveIndex(index)}
//         >
//           <h3
//             className={`absolute bottom-5 left-5 text-white text-2xl transition-opacity duration-300 ${
//               activeIndex === index ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             {category.name}
//           </h3>
//         </div>
//         </Link>
//             ))}
//     </div>
//   );
// };

// export default ShopCategory;


// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { getCategories } from "../api/apiServices";

// function ShopCategory() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await getCategories();
//         console.log("Fetched Categories:", response.data); // Debugging log
//         setCategories(response.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };
//     fetchCategories();
//   }, []);
//   console.log("101010110101010101010",categories)

//   return (
//     <div className="flex w-[90vw] mx-auto h-[80vh]">
//       <h1>Hello</h1> {/* This will always render */}
      
//       {categories && (
//         <div>
//           {categories.map((category, index) => (
//             <Link
//               to={`/Productlist/${category.name}`}
//               key={category._id}
//               state={{ categoryId: category._id }}
//             >
//               <div
//                 className={`relative flex-shrink-0 cursor-pointer transition-all duration-700 ease-in-out overflow-hidden ${
//                   activeIndex === index ? "flex-[5]" : "flex-1"
//                 } ${index >= 3 && "hidden sm:block"}`}
//                 style={{
//                   backgroundImage: `url(http://localhost:3000/${category.image})`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                   borderRadius: "12px",
//                 }}
//                 onClick={() => setActiveIndex(index)}>
//                 <h3
//                   className={`absolute bottom-5 left-5 text-white text-2xl transition-opacity duration-300 ${
//                     activeIndex === index ? "opacity-100" : "opacity-0"
//                   }`}>
//                   {category.name}
//                 </h3>
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}
//       <h1>END</h1> {/* This will always render */}
//     </div>
//   );
// }

// export default ShopCategory;

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { getCategories } from "../api/apiServices";

// function ShopCategory() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await getCategories();
//         // console.log("Fetched categories:", response.data); // Log to check structure
//         setCategories(response.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };
//     fetchCategories();
//   }, []);
  
//   return (
//       <div className="flex w-[90vw] mx-auto h-[80vh]">
//         <h1>Goood morning</h1>
//       {categories && categories.length > 0 ? (
//           <div>
//           {categories.map((category, index) => (
//             <Link
//             key={category._id}
//               to={`/Productlist/${category.name}`}
//               state={{ categoryId: category._id }}>
            
//             <div>
//                     <img
//                     src={`http://localhost:3000/${category.image}`} 
//                     className={`relative cursor-pointer transition-all duration-700 ease-in-out overflow-hidden 
//                         ${activeIndex === index ? "flex-[5]" : "flex-1"} 
//                         ${index >= 3 ? "hidden sm:block" : ""}`}
//                       style={{
//                         backgroundSize: "cover",
//                         backgroundPosition: "center",
//                         borderRadius: "12px",
//                       }}
//                       onClick={() => {
//                         setActiveIndex(index);
//                         console.log("Active index set to:", index); // Debugging log to check if setActiveIndex is called
//                       }}/>
//                 <h3
//                   className={`absolute bottom-5 left-5 text-block text-2xl transition-opacity duration-300 ${
//                     activeIndex === index ? "opacity-100" : "opacity-0"
//                   }`}>
//                   {category.name} 
//                 </h3>
//               </div>
//             </Link>
//           ))}
//         </div>
//       ) : (
//         <p>No categories available</p> // Fallback message if no categories
//       )}
//     </div>
//   );
// }

// export default ShopCategory;



import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../api/apiServices";

function ShopCategory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex w-[90vw] mx-auto h-[80vh]">
      {categories.length > 0 ? (
        <div className="flex space-x-4">
          {categories.map((category, index) => (
            <Link
              key={category._id}
              to={`/Productlist/${category.name}`}
              state={{ categoryId: category._id }}
            >
              <div
                className={`relative cursor-pointer transition-all duration-700 ease-in-out overflow-hidden ${
                  activeIndex === index ? "flex-[5]" : "flex-1"
                } ${index >= 5 ? "hidden sm:block" : ""}`}
                onClick={() => {
                  setActiveIndex(index);
                  console.log("Active index set to:", index);
                }}
              >
                <img
                  src={`http://localhost:3000/${category.image}`}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                <h3
                  className={`absolute bottom-5 left-5 text-white text-2xl transition-opacity duration-300 ${
                    activeIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No categories available</p>
      )}
    </div>
  );
}

export default ShopCategory;

