import { Link } from "react-router-dom";
import React from "react";
export default function AddImages() {
  return (
    <>
      <div className="flex flex-wrap justify-center items-center lg:min-h-[79vh] min-h-[70vh] p-5">
        <div className="lg:w-[50%]">
          <p className="text-xl">step 2</p>
          <p className="font-bold lg:text-[5rem] text-[2rem]">
            Add some photos
          </p>
        </div>
        <div className="flex flex-col border-2 rounded-lg border-gray-400 shadow-lg p-5 h-48 items-center justify-center lg:w-[40%] w-[80%] lg:mt-0 -mt-20">
          {/* <i className="text-[2rem] fa-solid fa-image"></i> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="2rem"
            viewBox="0 0 512 512"
          >
            <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
          </svg>
          <p>you can upload any number of photos</p>
          <label className="underline" htmlFor="img-upload">
            upload images
          </label>
          <input className="hidden" id="img-upload" type="file" multiple />
        </div>
      </div>
      <div className="absolute bottom-4 lg:w-[98vw] sm:w-[90vw] flex gap-2 justify-between mx-4 items-center  font-bold border-t-2 border-gray-500 pt-2">
        <Link to="/smartPark/add-spot/about-place">
          <button className="border p-3 rounded-lg w-[150px] hover:bg-gray-800">
            back
          </button>
        </Link>
        <Link to="/smartPark/add-spot/set-price">
          <button className="bg-green-500 hover:bg-green-600 p-3 rounded-lg text-white w-[150px]">
            Next
          </button>
        </Link>
      </div>
    </>
  );
}
