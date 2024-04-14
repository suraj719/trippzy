import React from "react";

export default function IntroAddPlace({ setIndex }) {
  return (
    <>
      <div className="flex flex-wrap justify-center items-center h-[80vh] p-5">
        <div className="lg:w-[50%]">
          <p className="font-bold lg:text-[5rem] text-[2rem]">
            It&apos;s easy to add your place on TrippZy
          </p>
        </div>
        <div>
          <div className="flex text-2xl items-center my-8 justify-between">
            <div>
              <p className="font-bold">1. Tell us about your place</p>
              <p className="font-light">Share the location of your place</p>
            </div>
            <svg
              fill="rgb(239, 68, 68)"
              xmlns="http://www.w3.org/2000/svg"
              height="2rem"
              viewBox="0 0 384 512"
            >
              <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
            </svg>
          </div>
          <hr />
          <div className="flex text-2xl items-center my-8 justify-between">
            <div>
              <p className="font-bold">2. Make your place stand out</p>
              <p className="font-light">Add some photos and description</p>
            </div>
            <svg
              fill="rgb(34, 197, 94)"
              xmlns="http://www.w3.org/2000/svg"
              height="2rem"
              viewBox="0 0 512 512"
            >
              <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
            </svg>
          </div>
          <hr />
          <div className="flex text-2xl items-center my-8 justify-between">
            <div>
              <p className="font-bold">3. Publish online</p>
              <p className="font-light">Set a price and publish online</p>
            </div>
            <svg
              fill="rgb(14, 165, 233)"
              xmlns="http://www.w3.org/2000/svg"
              height="2rem"
              viewBox="0 0 576 512"
            >
              <path d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zM272 192H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H272c-8.8 0-16-7.2-16-16s7.2-16 16-16zM256 304c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H272c-8.8 0-16-7.2-16-16zM164 152v13.9c7.5 1.2 14.6 2.9 21.1 4.7c10.7 2.8 17 13.8 14.2 24.5s-13.8 17-24.5 14.2c-11-2.9-21.6-5-31.2-5.2c-7.9-.1-16 1.8-21.5 5c-4.8 2.8-6.2 5.6-6.2 9.3c0 1.8 .1 3.5 5.3 6.7c6.3 3.8 15.5 6.7 28.3 10.5l.7 .2c11.2 3.4 25.6 7.7 37.1 15c12.9 8.1 24.3 21.3 24.6 41.6c.3 20.9-10.5 36.1-24.8 45c-7.2 4.5-15.2 7.3-23.2 9V360c0 11-9 20-20 20s-20-9-20-20V345.4c-10.3-2.2-20-5.5-28.2-8.4l0 0 0 0c-2.1-.7-4.1-1.4-6.1-2.1c-10.5-3.5-16.1-14.8-12.6-25.3s14.8-16.1 25.3-12.6c2.5 .8 4.9 1.7 7.2 2.4c13.6 4.6 24 8.1 35.1 8.5c8.6 .3 16.5-1.6 21.4-4.7c4.1-2.5 6-5.5 5.9-10.5c0-2.9-.8-5-5.9-8.2c-6.3-4-15.4-6.9-28-10.7l-1.7-.5c-10.9-3.3-24.6-7.4-35.6-14c-12.7-7.7-24.6-20.5-24.7-40.7c-.1-21.1 11.8-35.7 25.8-43.9c6.9-4.1 14.5-6.8 22.2-8.5V152c0-11 9-20 20-20s20 9 20 20z" />
            </svg>
          </div>
          <hr />
        </div>
      </div>
      <div className="absolute bottom-4 lg:w-[98vw] sm:w-[90vw] flex gap-2 justify-end mx-4 items-center border-t-2 border-gray-500  font-bold pt-2 ">
        <button
          onClick={() => {
            setIndex(1);
          }}
          className="bg-green-500 hover:bg-green-600 p-3 rounded-lg text-white w-[150px]"
        >
          Get Started
        </button>
      </div>
    </>
  );
}