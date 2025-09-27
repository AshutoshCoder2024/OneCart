import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { ShopDataContext } from '../Context/ShopContext';
import Card from './Card';
import Product from '../pages/Product';

function LatestCollection() {
  const { products } = useContext(ShopDataContext);
  // console.log(products);
  const [latestProducts, setLatestProducts] = useState([]);


  // console.log(latestProducts);

  // when the product comes, pick first 8 products for latestProducts
  useEffect(() => {
      setLatestProducts(products?.slice(0, 8));
  }, [products]);

  return (
    <div>
      <div className="h-[8%] w-[100%] text-center md:mt-[50px]">
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="w-[100%] text-blue-100 m-auto text-[13px] md:text-[20px] px-[10px]">
          Step Into Style - New Collection Dropping This Season!
        </p>
      </div>

      {/* product */}
      <div className="w-[100%] h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]">
        {latestProducts?.map((item) => (
          <Card
            key={item._id}
            name={item.name}
            image={item.image1}
            price={item.price}
            id={item._id}
          />
        ))}
      </div>
    </div>
  );
}

export default LatestCollection;
