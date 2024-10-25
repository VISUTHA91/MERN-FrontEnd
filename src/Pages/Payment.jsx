import React, { useState } from 'react';


const Payment = () => {
    

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'John Doe',
      address: '123 Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA',
    },
  ]);
  const [newAddress, setNewAddress] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India', // Default country
  });
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState(addresses[0]?.id);


  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiryDate: '', cvv: '' });
  const [upiID, setUpiID] = useState('');

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const handleAddNewAddress = (e) => {
    e.preventDefault();
    const newAddr = { ...newAddress, id: addresses.length + 1 };
    setAddresses([...addresses, newAddr]);
    setIsAddingNew(false);
    setNewAddress({ name: '', address: '', city: '', state: '', postalCode: '', country: 'India' });
  };

  const handleRemoveAddress = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  const handleEditAddress = (id) => {
    const addressToEdit = addresses.find((address) => address.id === id);
    setNewAddress(addressToEdit);
    setIsAddingNew(true);
    handleRemoveAddress(id);
  };

  const handleSetDefaultAddress = (id) => {
    setDefaultAddress(id);
  };


  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleUpiIDChange = (e) => {
    setUpiID(e.target.value);
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6 ">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 mt-14">Payment Details</h2>

        <h3 className="text-xl font-semibold mb-2">Select Billing Address</h3>

        {/* List of addresses */}
        {addresses.map((address) => (
          <div key={address.id} className={`border p-4 mb-4 ${defaultAddress === address.id ? 'border-blue-500' : 'border-gray-300'} rounded-lg`}>
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{address.name}</p>
                <p>{address.address}, {address.city}, {address.state}</p>
                <p>{address.postalCode}, {address.country}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEditAddress(address.id)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRemoveAddress(address.id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
            <button
              onClick={() => handleSetDefaultAddress(address.id)}
              className="mt-2 text-sm text-blue-500 hover:underline"
            >
              {defaultAddress === address.id ? 'Default Address' : 'Set as Default'}
            </button>
          </div>
        ))}

        {/* Button to add new address */}
        <button
          onClick={() => setIsAddingNew(true)}
          className="mb-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Add New Address
        </button>

        {/* Form to add new address */}
        {isAddingNew && (
          <form onSubmit={handleAddNewAddress} className="mb-6">
            <h3 className="text-xl font-semibold mb-2">New Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newAddress.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={newAddress.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={newAddress.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={newAddress.state}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={newAddress.postalCode}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  value={newAddress.country}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  disabled
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
            >
              Save Address
            </button>
          </form>
        )}

        <h3 className="text-xl font-semibold mt-6 mb-2">Payment Method</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="card"
              name="paymentMethod"
              value="card"
              checked={selectedPaymentMethod === 'card'}
              onChange={handlePaymentMethodChange}
              className="mr-2"
            />
            <label htmlFor="creditCard">Credit/Debit Card</label>
          </div>

          {/* UPI */}
          <div className="flex items-center">
            <input
              type="radio"
              id="upi"
              name="paymentMethod"
              value="upi"
              checked={selectedPaymentMethod === 'upi'}
              onChange={handlePaymentMethodChange}
              className="mr-2"
            />
            <label htmlFor="debitCard">UPI(GPay/PhonePe)</label>
          </div>
                {/* PayPal */}
          <div className="flex items-center">
            <input
              type="radio"
              id="paypal"
              name="paymentMethod"
              value="paypal"
              checked={selectedPaymentMethod === 'paypal'}
              onChange={handlePaymentMethodChange}
              className="mr-2"
            />
            <label htmlFor="paypal">PayPal</label>
          </div>

          {/* COD */}
          <div className="flex items-center">
            <input
              type="radio"
              id="cod"
              name="paymentMethod"
              value="cod"
              checked={selectedPaymentMethod === 'cod'}
              onChange={handlePaymentMethodChange}
              className="mr-2"
            />
            <label htmlFor="cod">Cash on Delivery</label>
          </div>
        </div>


         {/* Conditionally render payment details based on selected method */}
         {selectedPaymentMethod === 'card' && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Card Details</h3>
            <input
              type="text"
              name="cardName"
              placeholder="Card Holder Name"
              value={cardDetails.cardName}
              onChange={handleCardDetailsChange}
              className="w-full mb-2 p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={cardDetails.cardNumber}
              onChange={handleCardDetailsChange}
              className="w-full mb-2 p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="expiryDate"
              placeholder="Expiry Date (MM/YY)"
              value={cardDetails.expiryDate}
              onChange={handleCardDetailsChange}
              className="w-full mb-2 p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={cardDetails.cvv}
              onChange={handleCardDetailsChange}
              className="w-full mb-2 p-2 border border-gray-300 rounded"
              required
            />
          </div>
        )}

        {selectedPaymentMethod === 'upi' && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">UPI Details</h3>
            <input
              type="text"
              name="upiID"
              placeholder="Enter UPI ID"
              value={upiID}
              onChange={handleUpiIDChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        )}

        {selectedPaymentMethod === 'paypal' && (
          <div className="mt-6">
            <p className="text-lg font-semibold">You will be redirected to PayPal for payment.</p>
          </div>
        )}


        <button
          type="submit"
          className="mt-6 w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
