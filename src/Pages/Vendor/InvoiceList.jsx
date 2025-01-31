import React, { useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import { BiSolidPrinter } from "react-icons/bi";



const Invoice = () => {
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const invoices = [
        { id: 1, number: "INV001", date: "2024-12-01", amount: "$200", status: "Completed" },
        { id: 2, number: "INV002", date: "2024-12-02", amount: "$150", status: "Pending" },
        { id: 3, number: "INV003", date: "2024-12-03", amount: "$300", status: "Cancelled" },
        { id: 4, number: "INV004", date: "2024-12-10", amount: "$350", status: "Completed" },
        { id: 5, number: "INV005", date: "2024-12-08", amount: "$500", status: "Completed" },
    ];

    const handleView = (invoice) => {
        setSelectedInvoice(invoice);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedInvoice(null);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Invoice List</h1>
            <table className="w-full border-collapse  border-gray-300 text-left">
                <thead>
                    <tr className="bg-cyan-700 text-white">
                        <th className="border border-gray-300 px-2 py-2">S.No</th>
                        <th className="border border-gray-300 px-2 py-2">Invoice No</th>
                        <th className="border border-gray-300 px-2 py-2">Date</th>
                        <th className="border border-gray-300 px-2 py-2">Amount</th>
                        <th className="border border-gray-300 px-2 py-2">Status</th>
                        <th className="border border-gray-300 px-2 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice, index) => (
                        <tr key={invoice.id} className="">
                            <td className="border border-gray-300 px-2 py-2">{index + 1}</td>
                            <td className="border border-gray-300 px-2 py-2">{invoice.number}</td>
                            <td className="border border-gray-300 px-2 py-2">{invoice.date}</td>
                            <td className="border border-gray-300 px-2 py-2">{invoice.amount}</td>
                            <td className="border border-gray-300 px-2 py-2">{invoice.status}</td>
                            <td className="border border-gray-300 px-2 py-2">

                                <button
                                    className="text-cyan-700 px-4 py-1"
                                    onClick={() => handleView(invoice)}
                                >
                                    <MdRemoveRedEye size={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* {isModalOpen && selectedInvoice && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-1/2">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Invoice Details</h2>
                            <div className="flex gap-2">
                                <button
                                    className=" text-cyan-700 px-3 py-1 rounded"
                                    onClick={handlePrint}
                                >
                                 <BiSolidPrinter size={28} />

                                </button>
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                        <div>
                            <p><strong>Invoice No:</strong> {selectedInvoice.number}</p>
                            <p><strong>Date:</strong> {selectedInvoice.date}</p>
                            <p><strong>Amount:</strong> {selectedInvoice.amount}</p>
                            <p><strong>Status:</strong> {selectedInvoice.status}</p>
                        </div>
                    </div>
                </div>
            )} */}
            {isModalOpen && selectedInvoice && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-cyan-700 text-white p-6 rounded-lg w-1/2 shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Invoice Details</h2>
                            <div className="flex gap-2">
                                <button
                                    className=" text-white px-3 py-1 rounded"
                                    onClick={handlePrint}
                                >
                                    <BiSolidPrinter size={28} />

                                </button>
                                <button
                                    onClick={closeModal}
                                    className="text-white text-lg font-bold hover:text-gray-200"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                        <div>
                            <p><strong>Invoice No:</strong> {selectedInvoice.number}</p>
                            <p><strong>Date:</strong> {selectedInvoice.date}</p>
                            <p><strong>Amount:</strong> {selectedInvoice.amount}</p>
                            <p><strong>Status:</strong> {selectedInvoice.status}</p>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Invoice;
