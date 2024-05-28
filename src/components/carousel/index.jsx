// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./index.scss";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Carousel() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="carousel"
      >
        <SwiperSlide>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/ts-kim-cuong-slider.png?alt=media&token=90f1257c-994a-46eb-9755-895dcfcade3b"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/kvv2_1200x450_ts_v%E1%BB%8F.jpg?alt=media&token=22b3a349-a8f7-4879-96ab-25d8df843e5e"
          alt=""
        />
      </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/banner.jpg?alt=media&token=09b3493a-b89f-45e4-9767-1a834b6aaeca"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/Baner.jpg?alt=media&token=c3b80df5-2f5f-4f4b-b9ce-276384b44590"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/kvv2_1200x450_ts_v%E1%BB%8F.jpg?alt=media&token=22b3a349-a8f7-4879-96ab-25d8df843e5e"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
