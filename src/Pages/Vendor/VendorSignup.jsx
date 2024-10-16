import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../assets/Images';
// import getIFSC from "node-ifsc"
// import getBankDetails from 'ifsc'
import { registerVendor } from '../../api/apiServices';
import *as apiCalls from '../../api/apiServices.jsx';



function VendorSignup() {
  const navigate = useNavigate();

  const [vendorData, setVendorData] = useState({
    name: "",
    phone_number: "",
    email: "",
    password: "",
    confirmpassword: "",
    companyname: "",
    flatNo: "",
    area: "",
    city: "",
    state: "",
    pin: "",
  });
  // const [bankDetails, setBankDetails] = useState({
  //   accountHolderName: '',
  //   accountNumber: '',
  //   ifscCode: '',
  //   bankName: '',
  //   branchName: '',
  // });

  // const [ifscError, setIfscError] = useState('');
  // const [bankInfo, setBankInfo] = useState(null);


  const [step, setStep] = useState(1); // Track the current step

  const handleChange = (e) => {
    setVendorData({
      ...vendorData,
      [e.target.name]: e.target.value,
    });
  };
  // const handlebankChange = (e) => {
  //   setBankDetails({
  //     ...bankDetails,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleIFSCValidation = async (e) => {
  //   const ifscCode = e.target.value.toUpperCase(); // Get entered IFSC code
  //   setBankDetails({ ...bankDetails, ifscCode });

  //   try {
  //     // Fetch bank details from an API that works in the browser
  //     const response = await fetch(`https://ifsc.razorpay.com/${ifscCode}`);
  //     // const response = await getBankDetails(ifscCode);
  //     console.log(response.ok

  //     );
  //     if (response.ok) {
  //       const result = await response.json();
  //       setIfscError('');
  //       setBankDetails({
  //         ...bankDetails,
  //         ifscCode,
  //         bankName: result.BANK,
  //         branchName: result.BRANCH,
  //         city: result.CITY,
  //         state: result.STATE,

  //       });
  //     } else {
  //       setIfscError('Invalid IFSC Code');
  //       setBankDetails({
  //         ...bankDetails,
  //         bankName: '',
  //         branchName: '',
  //         city: '',
  //         state: '',
  //       });
  //     }
  //   } catch (error) {
  //     setIfscError('Error fetching bank details');
  //     setBankDetails({
  //       ...bankDetails,
  //       bankName: '',
  //       branchName: '',
  //       city: '',
  //       state: '',
  //     });
  //   }
  // };


  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const address = [
      {
        flatNo: vendorData.flatNo,
        area: vendorData.area,
        city: vendorData.city,
        state: vendorData.state,
        pincode: vendorData.pin,
      }
    ];
    // const bankDetailsArray = [
    //   {
    //     accountHolderName: bankDetails.accountHolderName,
    //     accountNumber: bankDetails.accountNumber,
    //     accountType:bankDetails.accountType,
    //     ifscCode: bankDetails.ifscCode,
    //     bankName: bankDetails.bankName,
    //     branchName: bankDetails.branchName,
    //     city: bankDetails.city,
    //     state: bankDetails.state,
    //   }
    // ];
    const finalvendorData = {
      name: vendorData.name,
      phone_number: vendorData.phone_number,
      email: vendorData.email,
      password: vendorData.password,
      confirmpassword: vendorData.confirmpassword,
      companyname: vendorData.companyname,
      address, // Array of address details
      // bankDetails: bankDetailsArray, // Array of bank details
    };
    console.log("Submitting vendor data:", finalvendorData); // Log the data


    const data = await apiCalls.registerVendor(finalvendorData);
    try {
      console.log("Registration  Successful:", data);

      localStorage.setItem("authToken", data.token);
      navigate("/Vendor/VendorLogin")
      // Storing token if needed
    } catch (error) {
      console.log(error);
      console.error("Registration failed:", error.message || error);
    }
  };
  return (
    <div className="flex justify-center items-center h-full bg-fuchsia-900 p-4 md:p-8">
      <div className="flex pointer-events-none hidden select-none shadow-2xl md:block md:w-1/2 lg:w-1/2 rounded-tl-2xl rounded-bl-2xl h-full">
        <img className="h-screen w-full object-cover opacity-90 rounded-tl-3xl rounded-bl-3xl" src={login} alt="Login" />
      </div>
      <form className="bg-white p-4 md:p-8 rounded-tr-3xl rounded-br-3xl shadow-md h-screen w-full md:w-1/2 lg:w-1/2">
        {step === 1 && (
          <div className="h-full -mb-2">
            <h3 className='text-center text-xl font-bold'>Your Details</h3>
            <div className="w-full">
              {['name', 'phone_number', 'email', 'password', 'confirmpassword'].map((field, index) => (
                <div className="mb-4" key={index}>
                  <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor={field}>
                    {field === 'phone_number' ? 'Phone No' : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field.includes('password') ? 'password' : field === 'phone_number' ? 'number' : 'text'}
                    id={field}
                    name={field}
                    value={vendorData[field]}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                    required
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="h-full">
            <h3 className='text-center text-xl font-bold mb-1'>Your Company Details</h3>
            <div className="w-full">
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyname">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyname"
                  name="companyname"
                  value={vendorData.companyname}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Your Company Name"
                  required
                />
              </div>
              <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">GSTin(Optional)</label>
              <input
                type="text"
                name="gstin"
                value={vendorData.gstin}
                onChange={handleChange}
                className="w-full p-1 border rounded"
                placeholder="GSTin(number)"
              />
            </div>

            <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Address">
                  Address
                </label>
              </div>

              {['flatNo','area', 'city', 'state', 'pin'].map((field, index) => (
                <div className="mb-3" key={index}>
                  <input
                    type={field === 'pin' ? 'number' : 'text'}
                    id={field}
                    name={field}
                    value={vendorData[field]}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder={`Enter Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                    required
                  />
                </div>
              ))}
            </div>
          </div>
        )}

         {/* {step === 3 && (
           <div className="h-full">
            <h3 className='text-center text-xl font-bold mb-1'>Your Bank Details</h3>
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">Account Holder Name</label>
              <input
                type="text"
                name="accountHolderName"
                value={bankDetails.accountHolderName}
                onChange={handlebankChange}
                className="w-full p-1 border rounded"
                placeholder="Account Holder Name"
                required
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">Account Number</label>
              <input
                type="number"
                name="accountNumber"
                value={bankDetails.accountNumber}
                onChange={handlebankChange}
                className="w-full p-1 border rounded"
                placeholder="Account Number"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">Account Type</label>
              <select
                name="accountType"
                value={bankDetails.accountType}
                onChange={handlebankChange} // Handle change like other inputs
                className="w-full p-1 border rounded"
                required>
                <option className='w-1/2' value=" " default>Select Account Type</option>
                <option className='w-1/2' value="savings">Saving Account</option>
                <option className='w-1/2' value="current">Current Account</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">IFSC Code</label>
              <input
                type="text"
                name="ifscCode"
                value={bankDetails.ifscCode}
                onChange={handleIFSCValidation} // Automatically validate when IFSC is typed
                className="w-full p-1 border rounded"
                placeholder="Enter IFSC Code"
                required
              />
              {ifscError && <p className="text-red-500 mt-2">{ifscError}</p>}
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={bankDetails.bankName}
                readOnly
                className="w-full p-1 border rounded bg-gray-100"
                placeholder="Bank Name"
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">Branch Name</label>
              <input
                type="text"
                name="branchName"
                value={bankDetails.branchName}
                readOnly
                className="w-full p-1 border rounded bg-gray-100"
                placeholder="Branch Name"
              />
            </div>


            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Branch Name</label>
            <input
              type="text"
              name="city"
              value={bankDetails.city}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
              placeholder="Branch city"
            />
          </div>


          </div>
        )}  */}

        <div className="flex items-center gap-2">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 -mt-6 rounded focus:outline-none focus:shadow-outline"
            >
              Previous
            </button>
          )}
          {step < 2 ? (
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4  -mt-6 rounded focus:outline-none focus:shadow-outline"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4  -mt-6 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}


//   );
// }

export default VendorSignup;
