import React from 'react'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'

function Product() {
  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-r from-[#141414] to-[#0c2025] flex items-center justify-start flex-col py-[20px]">


      {/* LatestCollection  */}
      <div className='w-[100%] min-h-[70px] flex items-center justify-center gap-[10px] flex-col '>
        <LatestCollection />
      </div>

      {/* BestSeller */}
      <div className='w-[100%] min-h-[70px] flex items-center justify-center gap-[10px] flex-col '>
        <BestSeller />
      </div>

    </div>
  )
}

export default Product