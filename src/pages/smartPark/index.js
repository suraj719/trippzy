import { useEffect, useState } from "react";
import ParkingSpotCard from "../../components/ParkingSpotCard";
import ClusterMap from "./ClusterMap";
export default function SmartPark() {
  const [pinCode, setPinCode] = useState(501510);

  const [data, setData] = useState([
    //should get data from api/blockchain
    {
      images: [
        "../parking1.jpg",
        "../parking2.jpg",
        "../parking3.jpg",
        "../parking4.jpeg",
      ],
      location: "hyderabad",
      pincode: 501510,
      priceperday: 510,
      rating: 3,
    },
    {
      images: [
        "../parking2.jpg",
        "../parking1.jpg",
        "../parking3.jpg",
        "../parking4.jpeg",
      ],
      location: "hyderabad",
      pincode: 501510,
      priceperday: 510,
      rating: 5,
    },
    {
      images: ["../parking3.jpg"],
      location: "hyderabad",
      pincode: 501510,
      priceperday: 510,
      rating: 5,
    },
    {
      images: ["../parking4.jpeg"],
      location: "hyderabad",
      pincode: 501510,
      priceperday: 510,
      rating: 5,
    },
    {
      images: ["../parking4.jpeg"],
      location: "hyderabad",
      pincode: 501510,
      priceperday: 510,
      rating: 5,
    },
    {
      images: ["../parking4.jpeg"],
      location: "hyderabad",
      pincode: 501510,
      priceperday: 510,
      rating: 5,
    },
    {
      images: ["../parking4.jpeg"],
      location: "hyderabad",
      pincode: 501510,
      priceperday: 510,
      rating: 5,
    },
    {
      images: ["../parking4.jpeg"],
      location: "hyderabad",
      pincode: 501510,
      priceperday: 510,
      rating: 5,
    },
    {
      images: ["../parking4.jpeg"],
      location: "hyderabad",
      pincode: 501510,
      priceperday: 510,
      rating: 5,
    },
    {
      images: ["../parking4.jpeg"],
      location: "hyderabad",
      pincode: 501510,
      priceperday: 510,
      rating: 5,
    },
    {
      images: ["../parking4.jpeg"],
      location: "hyderabad",
      pincode: 501510,
      priceperday: 510,
      rating: 5,
    },
    {
      images: ["../parking4.jpeg"],
      location: "hyderabad",
      pincode: 501510,
      priceperday: 510,
      rating: 5,
    },
    {
      images: ["../parking4.jpeg"],
      location: "hyderabad",
      pincode: 501510,
      priceperday: 510,
      rating: 5,
    },
    {
      images: ["../parking4.jpeg"],
      location: "hyderabad",
      pincode: 501510,
      priceperday: 510,
      rating: 5,
    },
    {
      images: ["../parking4.jpeg"],
      location: "hyderabad",
      pincode: 501510,
      priceperday: 510,
      rating: 5,
    },
    {
      images: ["../parking4.jpeg"],
      location: "hyderabad",
      pincode: 501510,
      priceperday: 510,
      rating: 5,
    },
    {
      images: ["../parking4.jpeg"],
      location: "hyderabad",
      pincode: 501510,
      priceperday: 510,
      rating: 5,
    },
  ]);
  return (
    <>
      <ClusterMap />
      {/* <div className="my-5 mb-10">
        <div className=" flex items-center justify-center gap-2">
          <div className="bg-gray-100 rounded-full border-2 p-2  shadow-md outline-none justify-self-center">
            <input
              className=" ps-5 pe-1 py-2 w-30 bg-gray-100 outline-none border-r-2 border-gray-400"
              type="text"
              placeholder="search by Address"
            />
            <input
              className=" ps-5 py-2 w-[40%] bg-gray-100 outline-none"
              type="number"
              placeholder="search by pincode"
            />
          </div>
          <button className="bg-red-500 rounded-lg px-3 py-2 hover:bg-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1rem"
              viewBox="0 0 512 512"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </button>
        </div>
        <div className="mt-5 flex flex-wrap wrap justify-evenly gap-5 lg:gap-8 lg:px-20">
          {data.map((place, id) => {
            return (
              <div key={id}>
                <ParkingSpotCard
                  images={place.images}
                  location={place.location}
                  pincode={place.pincode}
                  priceperday={place.priceperday}
                />
              </div>
            );
          })}
        </div>
      </div> */}
    </>
  );
}
