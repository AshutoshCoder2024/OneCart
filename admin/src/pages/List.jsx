import React, { useContext, useEffect, useState } from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { AuthDataContext } from "../context/AuthContext";
import axios from "axios";

function List() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true); // Optional: add loading state
  const { serverUrl } = useContext(AuthDataContext);

  // fetch product list
  const fetchList = async () => {
    setLoading(true);
    try {
      const result = await axios.get(serverUrl + "/api/product/list");
      setList(result.data);
      console.log(result.data);
    } catch (error) {
      console.log("Error fetching list:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeList = async (id) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/product/remove/${id}`,
        {},
        { withCredentials: true }
      );

      if (result.status === 200) {
        fetchList(); // Refresh list after successful delete
      } else {
        console.log("Failed to remove item");
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  if (loading) {
    return (
      <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white">
      <Nav />
      <div className="w-full h-full flex items-start justify-start">
        <Sidebar />
        <div className="w-[82%] h-full lg:ml-[320px] md:ml-[230px] mt-[70px] flex flex-col gap-[30px] overflow-x-hidden py-[50px] ml-[100px]">
          <div className="w-[400px] h-[50px] text-[28px] md:text-[40px] mb-[20px] text-white">
            ALL Listed Products
          </div>

          {/* printing data */}
          {list?.length > 0 ? (
            list.map((item, index) => (
              <div
                className="w-[90%] md:h-[120px] h-[90px] bg-slate-600 rounded-xl flex items-center justify-start gap-[5px] md:gap-[30px] p-[10px] md:px-[30px]"
                key={index}
              >
                <img
                  src={item.image1}
                  className="w-[30%] md:w-[120px] h-[90%] rounded-lg"
                  alt={item.name || "Product image"} // Added alt text
                />
                {/* name category price */}
                <div className="w-[90%] h-[80%] flex flex-col items-start justify-center gap-[2px]">
                  <div className="w-full md:text-[20px] text-[15px] text-[#befof3]">
                    {item.name}
                  </div>
                  <div className="w-full md:text-[20px] text-[15px] text-[#befof3]">
                    {item.category}
                  </div>
                  <div className="w-full md:text-[20px] text-[15px] text-[#befof3]">
                    ₹{item.price} {/* Assuming currency; adjust as needed */}
                  </div>
                </div>

                <div className="w-[10%] h-full bg-transparent flex items-center justify-center">
                  <span
                    className="w-[35px] h-[30%] flex items-center justify-center rounded-md md:hover:bg-red-300 md:hover:text-black cursor-pointer text-white"
                    onClick={() => removeList(item._id)}
                  >
                    X
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-white">No products listed yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default List;