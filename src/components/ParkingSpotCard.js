import React, { useState } from "react";

export default function ParkingSpotCard(props) {
  const [ishovered, setIshovered] = useState(false);
  const [slide, setSlide] = useState(0);
  const { images, location, pincode, rating, priceperday } = props;
  if (slide > images.length - 1) {
    setSlide(0);
  }
  if (slide < 0) {
    setSlide(images.length - 1);
  }
  return (
    <>
      <div
        className="rounded-2xl hover:shadow-2xl px-2 lg:p-0"
        onMouseEnter={() => setIshovered(true)}
        onMouseLeave={() => setIshovered(false)}
      >
        <div className="flex items-center text-2xl">
          <div className={`${ishovered ? "z-10 -me-7 -pe-10" : "hidden"}`}>
            <button
              className="z-10 rounded-full px-2 py-1 hover:shadow-2xl bg-gray-100"
              onClick={() => setSlide(slide - 1)}
            >
              &#10094;
            </button>
          </div>
          <img
            className=" rounded-2xl object-cover w-[25rem] h-[20rem]"
            src={images[slide]}
            alt="img"
            // style={{ width: "20rem", height: "25rem" }}
          />
          <button
            className={
              ishovered
                ? `-ms-7 rounded-full px-2 py-1 hover:shadow-2xl bg-gray-100`
                : "hidden"
            }
            onClick={() => setSlide(slide + 1)}
          >
            &#10095;
          </button>
        </div>
        <div className="p-2">
          <div className="flex justify-between text-xl font-bold">
            <p>
              {location}, {pincode}
            </p>
            <p>⭐{rating}</p>
          </div>
          <p className="font-semibold text-md">$ {priceperday} per day</p>
        </div>
      </div>
    </>
  );
}
