import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import axios from "axios";

export default function TripsPage() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/trip/get-trips`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setData(response.data.data);
      } else {
        console.log("something went wrong!");
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
      <div
        className="border rounded-lg p-4 my-4"
        style={{ maxHeight: "80vh", overflow: "auto" }}
      >
        <div className="flex justify-between">
          <p className="text-xl font-bold">Your trips</p>
          <Link
            to="/trips/create"
            className="border rounded-lg p-2 px-4 bg-gray-800 hover:bg-gray-700"
          >
            create trip
          </Link>
        </div>
        <div className="my-4">
          {data?.map((trip, index) => {
            return (
              <Link to={`/trip/${trip._id}`} key={index}>
                <p className="border rounded-lg p-2 px-4 break-all bg-gray-800 hover:bg-gray-700">
                  {trip.title}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
