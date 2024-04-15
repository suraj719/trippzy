import React from "react";
import AddLocation from "./AddLocation";
export default function AboutPlace({ setIndex, handleChange, slotData }) {
  return (
    <>
      <div>
        <div className="flex portrait:flex-col justify-center items-center min-h-[79vh] p-5">
          <div className="">
            <p className="text-xl">step 1</p>
            <p className="font-bold lg:text-[5rem] text-[2rem]">
              Share location of your place
            </p>
          </div>
          <div className="border-2 rounded-lg border-gray-400 shadow-lg p-5 w-[100%] h-full">
            <AddLocation
              lat={slotData.lat}
              lng={slotData.lng}
              handleChange={handleChange}
            />
          </div>
        </div>
        <div className="portrait:-bottom-5   absolute bottom-4 lg:w-[98vw] sm:w-[90vw] flex gap-2 justify-between mx-4 items-center  font-bold border-t-2 border-gray-500 pt-2">
          <button
            onClick={() => {
              setIndex(0);
            }}
            className="border p-3 rounded-lg w-[150px] hover:bg-gray-800"
          >
            back
          </button>
          <button
            onClick={() => {
              setIndex(2);
            }}
            className="bg-green-500 hover:bg-green-600 p-3 rounded-lg text-white w-[150px]"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
