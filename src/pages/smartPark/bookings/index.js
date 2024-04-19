import React from "react";

export default function SpotBookings() {
  const bookings = [
    {
      id: 1,
      bookingTime: "12jan",
      parkingInTime: "12jan",
      parkingOutTime: "13jan",
      payment: true,
      txnUrl: "0x12345498797458787",
      txnChain: "1029",
      charges: "450",
      checkInTime: "12jan",
      checkOutTime: "13jan",
      verified: true,
    },
    {
      id: 1,
      bookingTime: "12jan",
      parkingInTime: "12jan",
      parkingOutTime: "13jan",
      payment: false,
      txnUrl: "0x121468744874661543",
      txnChain: "1029",
      charges: "500",
      checkInTime: "12jan",
      checkOutTime: "13jan",
      verified: false,
    },
  ];
  return (
    <div className="p-5 text-black">
      <p className="font-bold text-3xl text-white">Your Bookings: </p>
      {bookings.length > 0 ? (
        <>
          <div className="flex flex-col gap-5 p-4">
            {bookings.map((booking, index) => {
              return (
                <div key={index}>
                  <div className="bg-gray-100 hover:bg-gray-200 rounded-lg px-5 py-3 md:w-[96vw] w-[90vw]">
                    <div className="flex justify-between">
                      <p>id: {booking.id}</p>
                      <div className="flex justif-center items-center gap-2">
                        <p>₹{booking.charges}</p>
                        {booking.payment ? (
                          <>
                            <button className="bg-green-300 p-2 rounded-lg font-bold">
                              Payment done
                            </button>
                          </>
                        ) : (
                          <>
                            <button className="bg-sky-200 p-2 rounded-lg">
                              Yet to be paid
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <p>
                      transaction url:{" "}
                      {`${booking.txnUrl.substring(
                        0,
                        5
                      )}....${booking.txnUrl.slice(-4)}`}
                    </p>
                    <p>
                      <span className="font-bold">Booked on: </span>
                      {booking.bookingTime}
                    </p>
                    <p>
                      <span className="font-bold">checkIn Time: </span>
                      {booking.checkInTime}
                    </p>
                    <p>
                      <span className="font-bold">checkOut Time: </span>
                      {booking.checkOutTime}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <p className="text-center font-bold text-1xl">No bookings done!!</p>
        </>
      )}
    </div>
  );
}
