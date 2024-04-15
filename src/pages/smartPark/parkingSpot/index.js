import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { ShowLoading, HideLoading } from "../../../redux/alerts";
import { useDispatch } from "react-redux";
import axios from "axios";
import ErrorPage from "../../ErrorPage";
export default function BookSpot() {
  const dispatch = useDispatch();
  const { slotID } = useParams();
  const [slide, setSlide] = useState(0);
  const [resdetails, setResdetails] = useState({
    indate: "",
    outdate: "",
  });
  const [noofdays, setnoofdays] = useState(0);
  const [data, setData] = useState();
  const [location, setLocation] = useState();
  if (slide > data?.images?.length - 1) {
    setSlide(0);
  }
  if (slide < 0) {
    setSlide(data?.images?.length - 1);
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
  const fetchData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/slot/get-slot/${slotID}`
      );
      if (response.data.success) {
        console.log(response.data);
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${response.data.data.lng},${response.data.data.lat}.json?access_token=${process.env.REACT_APP_MAPBOX_KEY}`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => setLocation(data.features[0]));
        setData(response.data.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(HideLoading());
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {data ? (
        <>
          <div className="mx-5 lg:mx-40 my-10">
            <p className="text-xl font-bold">{data.description}</p>
            <p className="mt-3 text-lg font-semibold">
              {data.rating || 5} ⭐ , ₹ {data.price} per day
            </p>
            <div className="mt-5 rounded-2xl flex portrait:flex-col justify-center   items-center">
              <div className=" w-[60vw] flex items-center gap-5 text-2xl">
                <button
                  className="rounded-full p-3 hover:shadow-2xl hover:bg-gray-800"
                  onClick={() => setSlide(slide - 1)}
                >
                  &#10094;
                </button>
                <img
                  className="rounded-2xl object-cover w-[80%] object-contain h-[25rem] hover:shadow-2xl"
                  src={data?.images[slide]}
                  alt="img"
                  // style={{ width: "20rem", height: "25rem" }}
                />
                <button
                  className="rounded-full p-3 hover:shadow-2xl hover:bg-gray-800"
                  onClick={() => setSlide(slide + 1)}
                >
                  &#10095;
                </button>
              </div>
              <div className="w-[35vw]">
                <p className="text-xl my-2 break-words">
                  <span className="font-bold ">Address: </span>
                  {location?.place_name}
                </p>
                <div className="shadow-lg p-5 rounded-2xl border-2">
                  <p className="font-bold text-xl">₹{data.price}/day</p>
                  <div className="mt-4 border-2 rounded-lg border-gray-400">
                    <div className="flex p-2 gap-2">
                      <div className=" border-r-2 border-gray-400 pe-2">
                        <label
                          className="font-semibold text-lg"
                          htmlFor="datein"
                        >
                          In-date
                        </label>
                        <br />
                        <input
                          className="outline-none"
                          onChange={handleres}
                          name="indate"
                          type="datetime-local"
                          id="datein"
                          style={{
                            colorScheme: "dark",
                          }}
                        />
                      </div>
                      <div className="">
                        <label
                          className="font-semibold text-lg"
                          htmlFor="dateout"
                        >
                          Out-date
                        </label>
                        <br />
                        <input
                          className="outline-none"
                          onChange={handleres}
                          name="outdate"
                          type="datetime-local"
                          id="dateout"
                          style={{
                            colorScheme: "dark",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    {resdetails.indate && resdetails.outdate && noday > 0 ? (
                      <>
                        <div className="flex justify-between text-md my-2">
                          <p>
                            ₹{data.price}*{noday} days
                          </p>
                          <p>₹{data.price * noday}</p>
                        </div>
                        <hr />
                        <p className="font-bold text-lg mt-2">
                          Total to be paid: ₹{data.price * noday}
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
          </div>
        </>
      ) : (
        <>
          <ErrorPage />
        </>
      )}
    </>
  );
}
