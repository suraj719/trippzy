import React from "react";
import { Link } from "react-router-dom";
export default function AboutPlace() {
  return (
    <>
      <div className="flex flex-wrap justify-center items-center min-h-[79vh] p-5">
        <div className="lg:w-[50%]">
          <p className="text-xl">step 1</p>
          <p className="font-bold lg:text-[5rem] text-[2rem]">
            Tell us about your place
          </p>
        </div>
        <div className="border-2 rounded-lg border-gray-400 shadow-lg p-5 lg:w-[40%] w-[80%]">
          <div>
            <input
              className="px-2 outline-none h-10"
              type="text"
              placeholder="House,flat,building no"
            />
          </div>
          <div className="border-t-2 border-gray-400 mt-2">
            <input
              className="px-2 outline-none h-10"
              type="text"
              placeholder="street address"
            />
          </div>
          <div className="border-t-2 border-gray-400 mt-2">
            <input
              className="px-2 outline-none h-10"
              type="text"
              placeholder="city/town"
            />
          </div>
          <div className="border-t-2 border-gray-400 mt-2">
            <input
              className="px-2 outline-none h-10"
              type="text"
              placeholder="pincode"
            />
          </div>
          <div className="border-t-2 border-gray-400 mt-2">
            <input
              className="px-2 outline-none h-10"
              type="text"
              placeholder="province/state"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 lg:w-[98vw] sm:w-[90vw] flex gap-2 justify-between mx-4 items-center  font-bold border-t-2 border-gray-500 pt-2">
        <Link to="/smartPark/add-spot">
          <button className="border p-3 rounded-lg w-[150px] hover:bg-gray-800">
            back
          </button>
        </Link>
        <Link to="/smartPark/add-spot/add-images">
          <button className="bg-green-500 hover:bg-green-600 p-3 rounded-lg text-white w-[150px]">
            Next
          </button>
        </Link>
      </div>
    </>
  );
}
