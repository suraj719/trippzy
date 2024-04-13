import React from "react";

export default function MySpots() {
  const spots = [
    {
      id: "1",
      availability: true,
      vehicleType: "two wheeler",
      latLong: "12457,1.25",
      pinCode: 124578,
      number: 91123456,
      docs: "",
      owner: "",
      price: 0.1245,
      verified: true,
    },
    {
      id: "1",
      availability: false,
      vehicleType: "two wheeler",
      latLong: "12457,1.25",
      pinCode: 124578,
      number: 91123456,
      docs: "",
      owner: "",
      price: 0.1245,
      verified: false,
    },
  ];
  return (
    <div className="p-5">
      <p className="font-bold text-3xl">Your Parking Spots: </p>
      {spots.length > 0 ? (
        <>
          <div className="flex flex-col gap-5 p-4">
            {spots.map((spot, index) => {
              return (
                <div key={index}>
                  <div className="bg-gray-100 hover:bg-gray-200 rounded-lg px-5 py-3 md:w-[96vw] w-[90vw] flex flex-col gap-2">
                    <div className="flex justify-between">
                      <p className="flex items-center gap-2">
                        <img
                          src="../price.png"
                          alt="price"
                          className="w-[2rem]"
                        />
                        <span className="font-bold text-xl">Price: </span>
                        {spot.price}
                      </p>
                      <div className="flex justify-center items-center gap-2">
                        {spot.availability ? (
                          <>
                            <button className="bg-green-200 p-2 rounded-lg font-bold">
                              available
                            </button>
                          </>
                        ) : (
                          <>
                            <button className="bg-gray-300 p-2 rounded-lg font-bold">
                              unavailable
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <p className="flex items-center gap-2">
                      <img
                        src="../vehicletype.png"
                        alt="vehicle-type"
                        className="w-[2rem]"
                      />
                      <span className="font-bold text-xl">Vechicle type: </span>
                      {spot.vehicleType}
                    </p>
                    <div className="flex items-center gap-2">
                      <img
                        src="../location.png"
                        alt="location"
                        className="w-[2rem]"
                      />
                      <div>
                        <p>
                          <span className="font-bold text-xl">pincode:</span>{" "}
                          {spot.pinCode}
                        </p>
                        <span className="font-bold text-xl">Location: </span>
                        {spot.latLong}
                      </div>
                    </div>
                    <p className="flex items-center gap-2">
                      <img
                        src="../verified.png"
                        alt="verified"
                        className="w-[2rem]"
                      />
                      <span className="font-bold text-xl">Verified: </span>
                      {spot.verified ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <p className="text-center font-bold text-1xl">
            No Parking Spots were added by you!!
          </p>
        </>
      )}
    </div>
  );
}
