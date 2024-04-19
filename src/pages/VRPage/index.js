import React, { useState } from "react";
import { createClient } from "pexels";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import { Link } from "react-router-dom";

export default function VRPage() {
  const dispatch = useDispatch();
  const client = createClient(
    "OodzQCbCdUkMeDr9HniDaG5geOQZT7JXrQmK30zP3BtfLoxvPl3CI0eQ"
  );

  const [data, setData] = useState({
    photos: [
      {
        id: 1603650,
        width: 5184,
        height: 3456,
        url: "https://www.pexels.com/photo/taj-mahal-and-the-four-minarets-1603650/",
        photographer: "Sudipta  Mondal",
        photographer_url: "https://www.pexels.com/@sudipta",
        photographer_id: 581412,
        avg_color: "#919A94",
        src: {
          original:
            "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg",
          large2x:
            "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          large:
            "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
          medium:
            "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&h=350",
          small:
            "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&h=130",
          portrait:
            "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
          landscape:
            "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
          tiny: "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
        },
        liked: false,
        alt: "Taj Mahal and the Four Minarets",
      },
      {
        id: 1530259,
        width: 4160,
        height: 6240,
        url: "https://www.pexels.com/photo/low-angle-photo-of-eiffel-tower-1530259/",
        photographer: "Louis",
        photographer_url: "https://www.pexels.com/@suissounet",
        photographer_id: 465924,
        avg_color: "#6D9EA7",
        src: {
          original:
            "https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg",
          large2x:
            "https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          large:
            "https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
          medium:
            "https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&h=350",
          small:
            "https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&h=130",
          portrait:
            "https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
          landscape:
            "https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
          tiny: "https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
        },
        liked: false,
        alt: "Low Angle Photo of Eiffel Tower",
      },
      {
        id: 12968097,
        width: 4000,
        height: 6000,
        url: "https://www.pexels.com/photo/view-of-the-charminar-at-sunset-12968097/",
        photographer: "Satya Nandigam",
        photographer_url: "https://www.pexels.com/@satya-nandigam-162270670",
        photographer_id: 162270670,
        avg_color: "#7C6965",
        src: {
          original:
            "https://images.pexels.com/photos/12968097/pexels-photo-12968097.jpeg",
          large2x:
            "https://images.pexels.com/photos/12968097/pexels-photo-12968097.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          large:
            "https://images.pexels.com/photos/12968097/pexels-photo-12968097.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
          medium:
            "https://images.pexels.com/photos/12968097/pexels-photo-12968097.jpeg?auto=compress&cs=tinysrgb&h=350",
          small:
            "https://images.pexels.com/photos/12968097/pexels-photo-12968097.jpeg?auto=compress&cs=tinysrgb&h=130",
          portrait:
            "https://images.pexels.com/photos/12968097/pexels-photo-12968097.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
          landscape:
            "https://images.pexels.com/photos/12968097/pexels-photo-12968097.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
          tiny: "https://images.pexels.com/photos/12968097/pexels-photo-12968097.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
        },
        liked: false,
        alt: "View of the Charminar at Sunset",
      },
    ],
  });
  const [query, setQuery] = useState("");
  const handleSearch = async () => {
    if (query) {
      dispatch(ShowLoading());
      try {
        await client.photos.search({ query }).then((photos) => {
          setData(photos);
        });
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(HideLoading());
  };
  console.log(data);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const handleImageClick = (image, imageId) => {
    setSelectedData(image);
    setSelectedImage(imageId);
  };
  return (
    <>
      <div className="border rounded-lg p-4 m-2 h-[85vh]">
        <div className="flex items-center justify-center gap-8 mb-8">
          <input
            type="text"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            placeholder="Search for a location..."
            className="w-[60%] p-2 bg-gray-100 rounded-md text-black"
          />
          <button
            onClick={handleSearch}
            className="bg-green-500 hover:bg-green-600 rounded-lg p-2 font-bold"
          >
            get pics ✨
          </button>
        </div>
        {/* {data?.photos?.length > 0 ? (
          <> */}
        <div
          className="flex flex-wrap items-center justify-evenly gap-4"
          style={{
            maxHeight: "70vh",
            overflow: "auto",
          }}
        >
          {data?.photos?.length > 0 ? (
            <>
              {data?.photos?.map((image, index) => {
                return (
                  <div key={index}>
                    <img
                      src={image.src.medium}
                      className="cursor-pointer"
                      onClick={() => handleImageClick(image, index)}
                    />
                    {selectedImage === index && selectedData && (
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-4 rounded shadow-md">
                          <div className="mt-4 flex-col justify-center">
                            <Link
                              target="_blank"
                              to={selectedData.src.landscape}
                            >
                              <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                // onClick={handleHideImage}
                              >
                                view Image
                              </button>
                            </Link>
                            <Link target="_blank" to={`/vr-view/3dview`}>
                              <button
                                onClick={() => {
                                  localStorage.setItem(
                                    "3d-url",
                                    selectedData.src.large
                                  );
                                }}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                              >
                                view Image in 360 deg
                              </button>
                            </Link>
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => setSelectedImage(null)}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <p>sss</p>
            </>
          )}
        </div>
        {/* </> */}
        {/* ) : (
          <></>
        )} */}
      </div>
    </>
  );
}
