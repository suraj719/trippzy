import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-evenly w-[100vw] h-[85vh]">
        <div>
          <p className="break-words font-bold text-6xl max-w-[30vw]">
            Experience the World Like Never Before with TrippZy...
          </p>
          <Link to="/auth/login">
            <button className="text-4xl rounded-lg bg-green-500 py-2 px-4 mt-4 ">
              Get started
            </button>
          </Link>
        </div>
        <img src="../home.png" />
      </div>
    </>
  );
}
