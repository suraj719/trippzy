import React, { useEffect, useState } from "react";
import {
  ref as sRef,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../util/firebase/firebase";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/alerts";

export default function AddImages({ setIndex, handleChange, slotData }) {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [links, setLinks] = useState([]);
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const handleUpload = async (e) => {
    // e.preventDefault();
    // dispatch(ShowLoading());
    // const files = e.target.files;
    if (files && files.length > 0) {
      const uploadPromises = Array.from(files).map((file) => {
        const storageRef = sRef(storage, `slots/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              console.log(`Uploading ${file.name}: ${progress}%`);
            },
            (error) => {
              console.error(`Error uploading ${file.name}: ${error}`);
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => resolve(downloadURL))
                .catch(reject);
            }
          );
        });
      });

      try {
        const downloadURLs = await Promise.all(uploadPromises);
        handleChange("images", downloadURLs);
        console.log("All files uploaded:", downloadURLs);
        setLinks(downloadURLs);
      } catch (error) {
        console.error("Error uploading files:", error);
        alert("Error uploading files. Please try again.");
      }
    }
    // dispatch(HideLoading());
  };
  useEffect(() => {
    handleUpload();
  }, [files]);
  return (
    <>
      <div className="p-4 mb-1">
        <p className="text-xl">step 2</p>
        <p className="font-bold  text-[2rem]">
          Add some photos and description
        </p>
      </div>
      <div className="flex portrait:flex-col justify-center gap-10 items-center min-h-[40vh] p-5">
        <div className="lg:w-[30%] w-[80%]">
          <div className="flex flex-col border-2 rounded-lg border-gray-400 shadow-lg p-5 h-48 items-center justify-center  lg:mt-0 -mt-20">
            <p>you can upload any number of photos</p>
            <label className="underline cursor-pointer" htmlFor="img-upload">
              upload images
            </label>
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="hidden"
              id="img-upload"
              type="file"
              multiple
            />
          </div>
        </div>
        <div>
          <textarea
            value={slotData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="outline-none border rounded-lg w-[30vw] portrait:w-[70vw] h-48 p-2 bg-black"
            placeholder="description"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        {slotData.images && slotData?.images?.length > 0 ? (
          <>
            {slotData.images.map((link, index) => (
              <img
                key={index + "img"}
                className="w-[10rem] h-[10rem] rounded-lg object-cover"
                src={link}
              />
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="portrait:-bottom-10 absolute bottom-4 lg:w-[98vw] sm:w-[90vw] flex gap-2 justify-between mx-4 items-center  font-bold border-t-2 border-gray-500 pt-2">
        <button
          onClick={() => {
            setIndex(1);
          }}
          className="border p-3 rounded-lg w-[150px] hover:bg-gray-800"
        >
          back
        </button>
        <button
          onClick={() => {
            setIndex(3);
          }}
          className="bg-green-500 hover:bg-green-600 p-3 rounded-lg text-white w-[150px]"
        >
          Next
        </button>
      </div>
    </>
  );
}
