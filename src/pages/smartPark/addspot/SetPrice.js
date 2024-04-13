import React from "react";
import { Link } from "react-router-dom";
export default function SetPrice() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-center flex-col lg:min-h-[79vh] min-h-[70vh] p-5">
        <div className="lg:w-[60%]">
          <p className="text-xl">step 3</p>
          <p className="font-bold lg:text-[5rem] text-[2rem]">
            set price and publish
          </p>
        </div>

        <div className="flex text-[4rem] max-w-40 text-center">
          <span className="mt-2">₹</span>
          <input
            className="outline-none w-60"
            type="number"
            placeholder="price"
            defaultValue="0"
            onWheel={(event) => event.currentTarget.blur()}
          />
        </div>
      </div>
      <div className="absolute bottom-4 lg:w-[98vw] sm:w-[90vw] flex gap-2 justify-between mx-4 items-center  font-bold border-t-2 border-gray-500 pt-2">
        <Link to="/smartPark/add-spot/add-images">
          <button className="border p-3 rounded-lg w-[150px] hover:bg-gray-800">
            back
          </button>
        </Link>

        {/* add an onclick event to publish the place */}
        <button className="bg-green-500 hover:bg-green-600 p-3 rounded-lg text-white w-[150px]">
          Publish
        </button>
      </div>
    </>
  );
}
