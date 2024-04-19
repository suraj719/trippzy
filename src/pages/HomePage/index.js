import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-center w-[100vw] h-[85vh]">
        <div>
          <p className="text-6xl portrait:text-3xl font-bold max-w-[30vw] portrait:max-w-[60vw]">
            Experience the World Like Never Before with TrippZy...
          </p>
          <Link to="/auth/login">
            <button className="text-4xl rounded-lg border hover:bg-gray-800 py-2 px-4 mt-4 w-full">
              Get started
            </button>
          </Link>
        </div>
        <img src="../home.png" />
      </div>
    </>
  );
}
