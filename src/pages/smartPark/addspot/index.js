import { useState } from "react";
import { useSelector } from "react-redux";
import AboutPlace from "./AboutPlace";
import AddImages from "./AddImages";
import IntroAddPlace from "./IntroAddPlace";
import SetPrice from "./SetPrice";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../../redux/alerts";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";

export default function AddSpotPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [slotData, setSlotData] = useState({
    // lat: 17.366,
    // lng: 78.476,
    lat: null,
    lng: null,
    price: 0,
    description: "",
    images: [],
    uploadedBy: user,
  });
  const handleChange = (name, value) => {
    setSlotData({
      ...slotData,
      [name]: value,
    });
  };
  const handleLoc = (newlat, newlng) => {
    setSlotData({
      ...slotData,
      lat: newlat,
      lng: newlng,
    });
  };
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/slot/create`,
        slotData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("successfully created your account");
        navigate("/smartPark");
      } else {
        toast.error("something went wrong!");
      }
    } catch (error) {
      toast.error("something went wrong!");
    }
    dispatch(HideLoading());
  };
  const [index, setIndex] = useState(0);
  return (
    <>
      {index == 0 && <IntroAddPlace setIndex={setIndex} />}
      {index == 1 && (
        <AboutPlace
          setIndex={setIndex}
          handleChange={handleLoc}
          slotData={slotData}
        />
      )}
      {index == 2 && (
        <AddImages
          handleChange={handleChange}
          slotData={slotData}
          setIndex={setIndex}
        />
      )}
      {index == 3 && (
        <SetPrice
          handleChange={handleChange}
          slotData={slotData}
          setIndex={setIndex}
          handleSave={handleSave}
        />
      )}
    </>
  );
}
