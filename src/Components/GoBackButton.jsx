// import { useNavigate } from "react-router-dom";

// const GoBackButton = () => {
//   const navigate = useNavigate();

//   return (
//     <button
//       onClick={() => navigate(-1)}
//       className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//     >
//       Go Back
//     </button>
//   );
// };

// export default GoBackButton;


import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import React from "react";

const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-all duration-300 shadow-md"
    >
      <FaArrowLeft className="text-xl text-gray-700" />
    </button>
  );
};

export default GoBackButton;
