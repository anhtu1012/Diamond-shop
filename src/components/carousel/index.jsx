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
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/kvv2_1200x450-best_seller.jpg?alt=media&token=0c52179d-bc22-4fa8-8cae-8695eb9abb1f"
            alt=""
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/disney-kc-1200x450CTA.jpg?alt=media&token=088e2a9d-bd07-407e-9f3b-7dc7b6b04648"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/banner_Lac.jpg?alt=media&token=c6417ec1-e2b0-48d4-b2a3-1426baaf312e"
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
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/banner_vb.jpg?alt=media&token=0d04801d-075e-42a0-a543-c48d7a046d64"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/banner-5.jpg?alt=media&token=3e5cb1aa-c912-4de3-a82c-68aae44c4241"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/SlideBanner.jpg?alt=media&token=27c80717-4e57-48d8-bf19-a1ac5b8a3435s"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
