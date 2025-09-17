import React, { useState } from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Slidebar'
import upload from "../assets/upload.png"

function Add() {
  const [image1, setimage1] = useState(false)
  const [image2, setimage2] = useState(false)
  const [image3, setimage3] = useState(false)
  const [image4, setimage4] = useState(false)
  const [Name, setName] = useState("")
  const [Descriptiom, setDescription] = useState("")
  const [Category, setCategory] = useState("Men")
  const [SubCategory, setSubCategory] = useState("TopWear")
  const [Price, setPrice] = useState("")
  const [Bestseller, setBestseller] = useState(false)
  const [Sizes, setSizes] = useState([])


  // const handleAddProduct()


  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] overflow-x-hidden relative bottom-[20px]' >
      <Nav></Nav>
      <Sidebar></Sidebar>

      <div className='w-[82%] h-[100%] flex items-center justify-start overflow-x-hidden absolute right-0'>

        <form className='w-[100%] md:w-[90%] h-[100%] mt-[70px] flex flex-col gap-[30px] py-[60px] px-[30px] md:px-[60px] '>

          <div className='w-[400px] h-[50px] text-[25px] md:text-[40px] text-white'> Add Product Page  </div>


          <div className='w-[80%] h-[130px] flex items-start justify-center flex-col mt-[20px] gap-[10px]  '>


            <p className='text-[20px] md:text-[25px] font-semibold' >Upload Images </p>

            {/* conatiner of 4 img  */}
            <div className='w-[100%] h-[100%] flex items-center justify-start'>
              <label htmlFor='image1' className='w-[65px] h-[65px] md:w-[100px] md:h-[100[px] cursor-pointer hover:border-[#46d1f7] '>
                <img src={!image1 ? upload : URL.createObjectURL(image1)} alt="image1" className='w-[80%]  h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px] '></img>
                <input required type="file" id="image1" hidden onChange={(e) => setimage1(e.target.files[0])} />

              </label>
              <label htmlFor='image2' className='w-[65px] h-[65px] md:w-[100px] md:h-[100[px] cursor-pointer hover:border-[#46d1f7] '>
                <img src={!image2 ? upload : URL.createObjectURL(image2)} alt="image2" className='w-[80%]  h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px] '></img>
                <input type="file" id="image2" hidden onChange={(e) => setimage2(e.target.files[0])} required />

              </label>
              <label htmlFor='image3' className='w-[65px] h-[65px] md:w-[100px] md:h-[100[px] cursor-pointer hover:border-[#46d1f7] '>
                <img src={!image3 ? upload : URL.createObjectURL(image3)} alt="image3" className='w-[80%]  h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px] '></img>
                <input type="file" id="image3" hidden onChange={(e) => setimage3(e.target.files[0])} required />

              </label>
              <label htmlFor='image4' className='w-[65px] h-[65px] md:w-[100px] md:h-[100[px] cursor-pointer hover:border-[#46d1f7] '>
                <img src={!image4 ? upload : URL.createObjectURL(image4)} alt="image4" className='w-[80%]  h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px] '></img>
                <input type="file" id="image4" hidden onChange={(e) => setimage4(e.target.files[0])} required />

              </label>

            </div>

          </div>

          {/* product name  */}
          <div className='w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px] '>

            <p type="text" className='text-[20px] md:text-[25px] font-semibold'> Product Name</p>
            <input className='w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px]  py-[10px] text-[18px] placeholder:text-[#ffffffc2] ' placeholder='Type here' onChange={(e) => setName(e.target.value)} value={Name} required></input>
          </div>
          {/* product description  */}
          <div className='w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px] '>

            <p className='text-[20px] md:text-[25px] font-semibold'> Product Description</p>
            <textarea className='w-[600px] max-w-[98%] h-[100px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] py-[10px] text-[18px] placeholder:text-[#ffffffc2] ' placeholder='Type here' onChange={(e) => setDescription(e.target.value)} value={Descriptiom} required ></textarea>
          </div>

          {/* category */}
          <div className='md:w-[30%] w-[100%] flex items-start sm:justify-center flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold w-[100%] '>Category</p>
            <select name='' id='' className='bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg hover:border-[#46d1f7] border-[2px]  ' onChange={(e) => setCategory(e.target.value)}  >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          {/* sub-category */}
          <div className='md:w-[30%] w-[100%] flex items-start sm:justify-center flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold w-[100%] '>Sub-Category</p>
            <select name='' id='' className='bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg hover:border-[#46d1f7] border-[2px]  ' onChange={(e) => setSubCategory(e.target.value)}   >
              <option value="TopWear">TopWear</option>
              <option value="BottomWear">BottomWear</option>
              <option value="WinterWear">WinterWear</option>
            </select>
          </div>

          {/* Product Price  */}
          <div className='w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px] '>

            <p className='text-[20px] md:text-[25px] font-semibold'> Product Price</p>
            <input type='number' className='w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px]  py-[10px] text-[18px] placeholder:text-[#ffffffc2] ' placeholder='₹ 2000' onChange={(e) => setPrice(e.target.Price)} value={Price} required></input>
          </div>

          {/* product Sizez */}
          <div className='w-[80%] h-[220px] md:h-[100px] flex items-start justify-center flex-col gap-[10px] py-[10px] md:py-[0px]' >
            <p className='text-[20px] md:text-[20px] font-semibold' >Produxt Size </p>

            <div className='flex items-center justify-start gap-[15px] flex-wrap'>


              <div className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer  ${Sizes.includes("S") ? "bg-green-400 text-black border-[#46d1f7]" : " "}`}
                onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>S</div>
              {/* when we click if the S is presen  in sizes array then it remove other S added to the array  */}

              <div className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer  ${Sizes.includes("M") ? "bg-green-400 text-black border-[#46d1f7]" : " "}`}
                onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>M</div>
              <div className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer  ${Sizes.includes("L") ? "bg-green-400 text-black border-[#46d1f7]" : " "}`}
                onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>L</div>
              <div className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer  ${Sizes.includes("XL") ? "bg-green-400 text-black border-[#46d1f7]" : " "}`}
                onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>XL</div>
              <div className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer  ${Sizes.includes("XXL") ? "bg-green-400 text-black border-[#46d1f7]" : " "}`}
                onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>XL</div>



            </div>

          </div>

          {/* Check Box  */}
          <div className='w-[80%] flex items-center justify-start gap-[10px] mt-[20px] '>
            <input type='checkbox' id='checkbox' className=' w-[25px] h-[25px] cursor-pointer '></input>
            <label htmlFor='checkbox' className='text-[18px] md:text-[22px] font-semibold' onClick={() => setBestseller(!Bestseller)} value="">
              Add to BestSeller
            </label>
          </div>

          <button className='w-[140px] px-[20px] py-[20px] rounded-xl bg-[#65d8f7] flex items-center justify-center gap-[10px] text-black active:bg-slate-700 active:text-white active:border-[2px] border-white' > Add Product         </button>



        </form>
      </div>
    </div>
  )
}

export default Add


// URL.createObjectURL() creates a temporary URL that points to the file in memory, so React can show the image before uploading.