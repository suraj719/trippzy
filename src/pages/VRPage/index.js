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

  const [data, setData] = useState(null);
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
        <div className="flex items-center justify-center gap-8 mb-4">
          <input
            type="text"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            placeholder="Search for a location..."
            className="w-[60%] p-2 border rounded-md"
          />
          <button
            onClick={handleSearch}
            className="bg-green-500 rounded-lg p-2 font-bold"
          >
            get pics ✨
          </button>
        </div>
        {data?.photos?.length > 0 ? (
          <>
            <div
              className="flex flex-wrap items-center justify-evenly gap-4"
              style={{
                maxHeight: "70vh",
                overflow: "auto",
              }}
            >
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
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
