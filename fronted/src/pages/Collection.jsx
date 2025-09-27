import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import Title from "../components/Title";
import { ShopDataContext } from "../Context/ShopContext";
import Card from "../components/Card";

function Collection() {
  const [showfilter, setshowfilter] = useState(false);
  let { products } = useContext(ShopDataContext);
  let [filterProduct, setFilterProduct] = useState([]);
  let [category, setCategory] = useState([]);
  let [subCategory, setSubCategory] = useState([]);
  let [sortType, setSortType] = useState("relavent");

  const toogleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
  const toogleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productCopy = products.slice();

    console.log("Selected categories:", category);
    console.log("Selected subcategories:", subCategory);
    console.log("Sample product subcategory:", products[0]?.subCategory);

    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.some(
          (selected) => selected.toLowerCase() === item.category.toLowerCase()
        )
      );
    }

    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.some(
          (selected) =>
            selected.toLowerCase() === item.subCategory.toLowerCase()
        )
      );
      console.log("After subcategory filter:", productCopy.length);
    }

    // Apply sorting
    if (sortType === "low-high") {
      productCopy.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      productCopy.sort((a, b) => b.price - a.price);
    }

    setFilterProduct(productCopy);
  };

  //  automaticaly set  when the product chnages
  useEffect(() => {
    setFilterProduct(products);
  }, [products]);

  //   automaticaly call when category, subcategory, or sortType changes
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, sortType]);

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-start flex-col md:flex-row justify-start pt--[70px] overflow-x-hidden z-[2]   ">
      {/* left */}
      <div
        className={`md:w-[30vw] lg:w-[20vw] w-[100vw] md:min-h-[100vh] 
         ${showfilter ? "h-[45vh]" : "h-[8vh]"} 
              p-[20px] border-r-[1px] border-gray-400 text-[#aaf5fa] lg:fixed mt-[70px]`}
      >
        {/* filter word with > ^ */}
        <p
          className="text-[25px] font-semibold flex gap-[5px] items-center justify-start  cursor-pointer "
          onClick={() => setshowfilter((prev) => !prev)}
        >
          FILTERS
          {!showfilter && <FiChevronRight className="text-[18px] md:hidden" />}
          {showfilter && <FiChevronDown className="text-[18px] md:hidden" />}
        </p>

        {/* category */}
        <div
          className={`border-[2px] border-[#dedcdc] pl-5 py--3 mt-6 rounded-md bg-slate-600 ${
            showfilter ? "" : "hidden"
          } md:block `}
        >
          <p className="text-[18px] text-[#f8fafa]">CATEGORIES</p>
          <div className="w-[230px] h-[120px] flex items-start justify-center gap-[10px] flex-col">
            <label className="flex items-center gap-[10px] text-[16px] font-light cursor-pointer">
              <input
                type="checkbox"
                value="Men"
                className="w-3"
                onChange={toogleCategory}
              />
              Men
            </label>

            <label className="flex items-center gap-[10px] text-[16px] font-light cursor-pointer">
              <input
                type="checkbox"
                value="Women"
                className="w-3"
                onChange={toogleCategory}
              />
              WOMEN
            </label>

            <label className="flex items-center gap-[10px] text-[16px] font-light cursor-pointer">
              <input
                type="checkbox"
                value="Kids"
                className="w-3"
                onChange={toogleCategory}
              />
              KIDS
            </label>
          </div>
        </div>

        {/* sub-Category */}
        <div
          className={`border-[2px] border-[#dedcdc] pl-5 py--3 mt-6 rounded-md bg-slate-600 ${
            showfilter ? "" : "hidden"
          } md:block`}
        >
          <p className="text-[18px] text-[#f8fafa]">SUB-CATEGORIES</p>
          <div className="w-[230px] h-[120px] flex items-start justify-center gap-[10px] flex-col">
            <label className="flex items-center gap-[10px] text-[16px] font-light cursor-pointer">
              <input
                type="checkbox"
                value="TopWear"
                className="w-3"
                onChange={toogleSubCategory}
              />
              TOPWEAR
            </label>

            <label className="flex items-center gap-[10px] text-[16px] font-light cursor-pointer">
              <input
                type="checkbox"
                value="BottomWear"
                className="w-3"
                onChange={toogleSubCategory}
              />
              BOTTOMWEAR
            </label>

            <label className="flex items-center gap-[10px] text-[16px] font-light cursor-pointer">
              <input
                type="checkbox"
                value="WinterWear"
                className="w-3"
                onChange={toogleSubCategory}
              />
              WINTERWEAR
            </label>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="lg:pl-[20%] md:py-[10px]">
        {/* filter for price range  */}
        <div className="md:w-[80vw] w-[100vw] p-[20px] flex justify-between flex-col lg:flex-row lg:px-[50px] ">
          <Title text1={"ALL"} text2={"COLLECTION"} />
          <select
            className="bg-slate-600 w-[60%] md:w-[200px] h-[50px] px-[10px] text-[white] rounded-lg hover:border-[#46d1f7] border-[2px]"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relavent" className="w-[100%] h-[100%]">
              Sort BY: Relavent
            </option>
            <option value="low-high" className="w-[100%] h-[100%]">
              Sort BY: Low to High
            </option>
            <option value="high-low" className="w-[100%] h-[100%]">
              Sort BY: High to Low
            </option>
          </select>
        </div>
        <div className="lg:w-[80vw] md:w-[60vw] w-[100vw] min-h-[70vh] flex items-center justify-center flex-wrap gap-[30px]  ">
          {filterProduct.map((item, index) => (
            <Card
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Collection;
