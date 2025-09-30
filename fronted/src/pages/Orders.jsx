import React from 'react'
import { useContext } from 'react'
import { UserDataContext } from '../Context/UserContext'
import { FaBox, FaCog } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function Orders() {
  const { userData } = useContext(UserDataContext)
  let navigate = useNavigate()

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-r from-[#141414] to-[#0c2025] flex items-center justify-center py-[100px]">
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mb-4">
            <FaBox className="text-3xl text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            My Orders
          </h1>
          <p className="text-lg text-gray-300">
            Track and manage your orders
          </p>
        </div>

        {/* Development Status */}
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-center mb-3">
            <FaCog className="text-2xl text-yellow-400 mr-2 animate-spin" />
            <h2 className="text-xl font-semibold text-yellow-400">
              Under Development
            </h2>
          </div>
          <p className="text-gray-200 mb-2">I’m  working on this project. Some features are still in progress.</p>
          {/* <p className="text-gray-200 mb-3">Orders management is in progress. Viewing, status updates, and tracking will be available soon.</p> */}
          {/* <div className="text-gray-300 text-sm space-y-1">
            <p>• Order history & tracking</p>
            <p>• Status updates & details</p>
            <p>• Order management & cancellation</p>
          </div> */}
        </div>

        {/* Back to Shopping */}
        <button 
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )
}

export default Orders
