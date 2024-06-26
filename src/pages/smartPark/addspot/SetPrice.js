import React from "react";
export default function SetPrice({
  setIndex,
  handleChange,
  slotData,
  handleSave,
}) {
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
            value={slotData.price}
            onChange={(e) => handleChange("price", e.target.value)}
            onWheel={(event) => event.currentTarget.blur()}
          />
        </div>
      </div>
      <div className="absolute bottom-4 lg:w-[98vw] sm:w-[90vw] flex gap-2 justify-between mx-4 items-center  font-bold border-t-2 border-gray-500 pt-2">
        <button
          onClick={() => {
            setIndex(2);
          }}
          className="border p-3 rounded-lg w-[150px] hover:bg-gray-800"
        >
          back
        </button>
        <button
          onClick={handleSave}
          className="bg-green-500 hover:bg-green-600 p-3 rounded-lg text-white w-[150px]"
        >
          Publish
        </button>
      </div>
    </>
  );
}
