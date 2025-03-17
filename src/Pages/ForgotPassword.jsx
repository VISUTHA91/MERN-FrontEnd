import { useState } from "react";
import {sendPasswordResetEmail} from '../api/apiServices';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
 
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const response = await sendPasswordResetEmail(email);
      setMessage(response.message || "Password reset link sent successfully!");
    } catch (err) {
      setError(err);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Forgot Password</h2>
        <p className="text-gray-600 text-center mb-4">
          Enter your email, and we'll send you a password reset link.
        </p>
        <form onSubmit={handleResetPassword}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded mb-4 focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};
export default ForgotPassword;

// import { useState } from "react";
// import { sendPasswordResetEmail } from "../api/apiServices";

// const ForgotPassword = ({ closeModal }) => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");

//     try {
//       const response = await sendPasswordResetEmail(email);
//       setMessage(response.message || "Password reset link sent successfully!");
//     } catch (err) {
//       setError(err);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
//       <button
//         onClick={closeModal}
//         className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-lg"
//       >
//         ✕
//       </button>
//       <h2 className="text-2xl font-semibold text-center mb-4">Forgot Password</h2>
//       <p className="text-gray-600 text-center mb-4">
//         Enter your email, and we'll send you a password reset link.
//       </p>
//       {message && <p className="text-green-600 text-center">{message}</p>}
//       {error && <p className="text-red-600 text-center">{error}</p>}
//       <form onSubmit={handleResetPassword}>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full border p-2 rounded mb-4 focus:ring-2 focus:ring-blue-400"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//         >
//           Reset Password
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;