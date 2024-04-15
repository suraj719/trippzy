import { Box, Card, ImageListItem, ImageListItemBar } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Lazy } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/lazy";
import { Link } from "react-router-dom";

const PopupRoom = ({ popupInfo }) => {
  const { description, price, images, slotId } = popupInfo;
  return (
    <Link to={`/smartPark/slot/${slotId}`}>
      <Card sx={{ maxWidth: 400 }}>
        <ImageListItem sx={{ display: "block" }}>
          <ImageListItemBar
            sx={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)",
              zIndex: 2,
            }}
            title={"₹" + price}
            position="top"
          />
          <ImageListItemBar
            title={description}
            // subtitle={description.substr(0, 30) + "..."}
            sx={{ zIndex: 2 }}
          />
          <Swiper
            modules={[Autoplay, Pagination, Lazy]}
            autoplay
            lazy
            pagination={{ clickable: true }}
            style={{
              "--swiper-pagination-color": "rgba(255,255,255, 0.8)",
              "--swiper-pagination-bullet-inactive-color": "#fff",
              "--swiper-pagination-bullet-inactive-opacity": 0.5,
            }}
          >
            {images?.length > 0 ? (
              <>
                {images?.map((url) => (
                  <SwiperSlide key={url}>
                    <Box
                      component="img"
                      src={url}
                      alt="room"
                      sx={{
                        height: 255,
                        display: "block",
                        overflow: "hidden",
                        width: "100%",
                        cursor: "pointer",
                        objectFit: "cover",
                      }}
                      // onClick={() =>
                      //   dispatch({ type: "UPDATE_ROOM", payload: popupInfo })
                      // }
                    />
                  </SwiperSlide>
                ))}
              </>
            ) : (
              <>
                <SwiperSlide>
                  <Box
                    component="img"
                    src="../defaultImg.png"
                    alt="room"
                    sx={{
                      height: 255,
                      display: "block",
                      overflow: "hidden",
                      width: "100%",
                      cursor: "pointer",
                      objectFit: "cover",
                    }}
                    // onClick={() =>
                    //   dispatch({ type: "UPDATE_ROOM", payload: popupInfo })
                    // }
                  />
                </SwiperSlide>
              </>
            )}
          </Swiper>
        </ImageListItem>
      </Card>
    </Link>
  );
};

export default PopupRoom;
