// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

// import required modules
import { Grid } from "swiper/modules";
import CartProduct from "../Cardd";

export default function Relate() {
  return (
    <>
      <Swiper
        slidesPerView={4}
        grid={{
          rows: 1,
        }}
        spaceBetween={30}
        modules={[Grid]}
        className="mySwiper"
      >
        <SwiperSlide>
          <CartProduct />
        </SwiperSlide>
        <SwiperSlide>
          <CartProduct />
        </SwiperSlide>
        <SwiperSlide>
          <CartProduct />
        </SwiperSlide>
        <SwiperSlide>
          <CartProduct />
        </SwiperSlide>
        <SwiperSlide>
          <CartProduct />
        </SwiperSlide>
        <SwiperSlide>
          <CartProduct />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
