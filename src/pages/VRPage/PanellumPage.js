import React from "react";
import { Pannellum } from "pannellum-react";

export default function PanellumPage() {
  const url = localStorage.getItem("3d-url");
  return (
    <>
      <div>
        <Pannellum
          width="100%"
          height="90vh"
          image={url}
          pitch={10}
          yaw={180}
          hfov={110}
          autoLoad
          onLoad={() => {
            console.log("panorama loaded");
          }}
        ></Pannellum>
      </div>
    </>
  );
}
