import React from 'react'
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { FaClipboardList, FaCog } from "react-icons/fa";

function Orders() {
  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white relative">
      <Nav />
      <Sidebar />

      <div className="w-[82%] min-h-[100vh] absolute right-0 top-[70px] px-[20px] md:px-[40px] py-[30px]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full">
            <FaClipboardList className="text-xl text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold">Orders</h1>
        </div>

        {/* Under Development Card */}
        <div className="mb-4 text-gray-300">
          {/* I’m actively working on this project. Some features are still in progress. */}
        </div>
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <FaCog className="text-yellow-400 animate-spin" />
            <p className="text-yellow-400 font-medium">under  development</p>
          </div>
          <p className="text-gray-200 mb-2">I am working on this project. Some features are still in progress.</p>
          {/* <p className="text-gray-200 mb-3">Admin order management will include:</p> */}
          {/* <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Order list with filters (status/date/user)</li>
            <li>View order details and items</li>
            <li>Update order status (Pending, Shipped, Delivered, Cancelled)</li>
            <li>Export orders</li>
          </ul> */}
        </div>
      </div>
    </div>
  )
}

export default Orders