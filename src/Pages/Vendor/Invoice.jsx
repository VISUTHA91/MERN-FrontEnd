import React, { useState } from "react";

const Invoice = () => {
  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    mobile: "",
  });

  const [items, setItems] = useState([
    { description: "", quantity: 1, mrp: 0, unitPrice: 0, tax: 0, total: 0 },
  ]);

  const handleCustomerChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...items];
    newItems[index][name] = value;

    const quantity = parseFloat(newItems[index].quantity) || 0;
    const unitPrice = parseFloat(newItems[index].unitPrice) || 0;
    const tax = parseFloat(newItems[index].tax) || 0;
    const total = quantity * unitPrice + tax;
    newItems[index].total = total.toFixed(2);

    setItems(newItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      { description: "", quantity: 1, mrp: 0, unitPrice: 0, tax: 0, total: 0 },
    ]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Invoice Generator</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-3">Customer Details</h3>
        <input
          type="text"
          name="mobile"  
          placeholder="Mobile Number"
          value={customer.mobile}
          onChange={handleCustomerChange}
          className="border p-3 w-full mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="name"
          placeholder="Customer Name"
          value={customer.name}
          onChange={handleCustomerChange}
          className="border p-3 w-full mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={customer.address}
          onChange={handleCustomerChange}
          className="border p-3 w-full mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        
      </div>

      <div className="bg-white p-6 mt-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-3">Item Details</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-300 text-gray-700">
              <th className="border p-3">Description</th>
              <th className="border p-3">Quantity</th>
              <th className="border p-3">MRP</th>
              <th className="border p-3">Unit Price</th>
              <th className="border p-3">Tax Amount</th>
              <th className="border p-3">Total</th>
              <th className="border p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border">
                <td className="border p-3"><input type="text" name="description" value={item.description} onChange={(e) => handleItemChange(index, e)} className="border p-2 w-full rounded-md" /></td>
                <td className="border p-3"><input type="number" name="quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} className="border p-2 w-full rounded-md" /></td>
                <td className="border p-3"><input type="number" name="mrp" value={item.mrp} onChange={(e) => handleItemChange(index, e)} className="border p-2 w-full rounded-md" /></td>
                <td className="border p-3"><input type="number" name="unitPrice" value={item.unitPrice} onChange={(e) => handleItemChange(index, e)} className="border p-2 w-full rounded-md" /></td>
                <td className="border p-3"><input type="number" name="tax" value={item.tax} onChange={(e) => handleItemChange(index, e)} className="border p-2 w-full rounded-md" /></td>
                <td className="border p-3 font-bold text-gray-700">₹{item.total}</td>
                <td className="border p-3"><button onClick={() => removeItem(index)} className="bg-red-500 text-white p-2 rounded-lg shadow">Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addItem} className="bg-green-500 text-white p-3 mt-4 rounded-lg shadow-md">Add Item</button>
      </div>

      <div className="bg-white p-6 mt-6 rounded-lg shadow-lg text-center">
        <h3 className="text-xl font-semibold mb-3">Total Amount</h3>
        <p className="text-2xl font-bold text-gray-800">₹ {items.reduce((sum, item) => sum + parseFloat(item.total || 0), 0).toFixed(2)}</p>
      </div>
    </div>
  );
};
export default Invoice;