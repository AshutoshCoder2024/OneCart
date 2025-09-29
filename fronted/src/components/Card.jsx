import React, { useContext } from "react";
import { ShopDataContext } from "../Context/ShopContext";

function Card({ name, image, id, price }) {
  // console.log(name,price);
  let { currency } = useContext(ShopDataContext);
  return (
    <div className="w-[300px] max-w-[90%] h-[330px] bg-[#ffffff0a] backdrop-blur-lg rounded-lg hover:scale-[102%] flex items-start justify-start flex-col p-[10px] cursor-pointer border-[1px] border-[#80808049] pb-[10px]">
      <img src={image} alt="" className="h-[80%] w-[100%] object-cover" />
      <div className="text-[#0b9aa4] text-[18px] py-[10px]">{name}</div>
      <div className="text-[#f3fafa] text-[14px] mb-[10px]">
        {currency}
        {price}
      </div>
    </div>
  );
}

export default Card;
