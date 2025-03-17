import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSearchParams, useNavigate } from "react-router-dom";
import { vendorupdatePassword } from '../api/apiServices'; // Import API service
import { useParams } from "react-router-dom";


const VendorPasswordReset = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState([]);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

const { token } = useParams();  // Extracts token from URL path
console.log("Extracted Token:", token);

  const navigate = useNavigate();
//   console.log("SEARCH PARAMS",searchParams)



  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    try {
      console.log("TOKEN<<<<", token); // ✅ Corrected console log
  
      if (!token) {
        setError("Token is missing!");
        return;
      }
  
      const response = await vendorupdatePassword(token, newPassword, confirmPassword);
      console.log("API Response:", response); // ✅ Log response for debugging
  
      setMessage(response.message || "Password reset successfully!");
      
      alert("Password reset successful!"); // ✅ Moved inside try block to show only on success
  
      setTimeout(() => navigate("/VendorSignup"), 2000); // ✅ Redirect after success
    } catch (error) {
      console.error("Error updating password:", error); // ✅ Log actual error
      setError(error.response?.data?.message || "Something went wrong!");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800">Set New Password</h2>
        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

        <div className="mt-6">
          {/* New Password */}
          <label className="block text-gray-700">New Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-600"
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <label className="block text-gray-700 mt-4">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-600"
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleResetPassword}
            className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorPasswordReset;