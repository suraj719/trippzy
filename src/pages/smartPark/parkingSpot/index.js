import React from "react";
import { useState } from "react";
export default function BookSpot() {
  const [slide, setSlide] = useState(0);
  const [resdetails, setResdetails] = useState({
    indate: "",
    outdate: "",
  });
  const [noofdays, setnoofdays] = useState(0);
  const data = {
    images: [
      "../parking1.jpg",
      "../parking2.jpg",
      "../parking3.jpg",
      "../parking4.jpeg",
    ],
    location: "hyderabad",
    pincode: 501510,
    priceperday: 510,
    rating: 5,
    placeurl: "",
  };
  if (slide > data.images.length - 1) {
    setSlide(0);
  }
  if (slide < 0) {
    setSlide(data.images.length - 1);
  }
  const handleres = (e) => {
    setResdetails({
      ...resdetails,
      [e.target.name]: e.target.value,
    });
    // var inp = e.target.value
    // var d = new Date(inp)
    // console.log(d.getDate());
  };
  var din = new Date(resdetails.indate);
  var dout = new Date(resdetails.outdate);
  var noday = (dout.getTime() - din.getTime()) / (1000 * 3600 * 24);
  return (
    <>
      <div className="mx-5 lg:mx-40 my-10">
        <p className="text-2xl font-bold">
          {data.location}, {data.pincode}
        </p>
        <p className="mt-3 text-lg font-semibold">
          ⭐ {data.rating}, $ {data.priceperday} per day
        </p>
        <div className="mt-5 rounded-2xl flex flex-wrap  justify-evenly gap-8 items-center">
          <div className="lg:-ms-20 flex items-center gap-5 text-2xl">
            <button
              className="rounded-full p-4 hover:shadow-2xl hover:bg-gray-100"
              onClick={() => setSlide(slide - 1)}
            >
              &#10094;
            </button>
            <img
              className="rounded-2xl object-cover w-[20rem] h-[25rem] lg:w-[40rem] hover:shadow-2xl"
              src={data.images[slide]}
              alt="img"
              // style={{ width: "20rem", height: "25rem" }}
            />
            <button
              className="rounded-full p-4 hover:shadow-2xl hover:bg-gray-100"
              onClick={() => setSlide(slide + 1)}
            >
              &#10095;
            </button>
          </div>
          <div className="shadow-lg p-5 rounded-2xl border-2">
            <p className="font-bold text-xl">₹{data.priceperday}/day</p>
            <div className="mt-4 border-2 rounded-lg border-gray-400">
              <div className="flex p-2 gap-2">
                <div className=" border-r-2 border-gray-400 pe-2">
                  <label className="font-semibold text-lg" htmlFor="datein">
                    In-date
                  </label>
                  <br />
                  <input
                    className="outline-none"
                    onChange={handleres}
                    name="indate"
                    type="date"
                    id="datein"
                  />
                </div>
                <div className="">
                  <label className="font-semibold text-lg" htmlFor="dateout">
                    Out-date
                  </label>
                  <br />
                  <input
                    className="outline-none"
                    onChange={handleres}
                    name="outdate"
                    type="date"
                    id="dateout"
                  />
                </div>
              </div>
            </div>
            <div>
              {resdetails.indate && resdetails.outdate && noday > 0 ? (
                <>
                  <div className="flex justify-between text-md my-2">
                    <p>
                      ₹{data.priceperday}*{noday} days
                    </p>
                    <p>₹{data.priceperday * noday}</p>
                  </div>
                  <hr />
                  <p className="font-bold text-lg mt-2">
                    Total to be paid: ₹{data.priceperday * noday}
                  </p>
                </>
              ) : (
                <></>
              )}
            </div>
            <div>
              <button className="bg-green-500 p-2 rounded-lg w-full my-5 text-white font-bold">
                Reserve
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
