/* eslint-disable react/prop-types */
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Grid, Navigation } from "swiper/modules";
import { CartProduct } from "../Cardd/CartProduct";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Relate({
  // eslint-disable-next-line react/prop-types
  numberOfSlides = 4,
  // eslint-disable-next-line react/prop-types
  autoplay = false,
  // eslint-disable-next-line react/prop-types
  rows = 1,
  category = "BÔNG TAI KIM CƯƠNG",
}) {
  const swiperContainerStyle = {
    "--swiper-rows": rows,
    "--swiper-space-between": "30px",
  };
  const [products, setProducts] = useState([]);

  const fetchProduct = async () => {
    const res = await axios.get(
      "https://662b9b55de35f91de158d8ba.mockapi.io/us"
    );
    setProducts(res.data);
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div className="swiper-container" style={swiperContainerStyle}>
      <Swiper
        slidesPerView={numberOfSlides}
        grid={{
          rows: rows, // Dynamically setting the number of rows
        }}
        spaceBetween={30}
        autoplay={
          autoplay
            ? {
                delay: 2500,
                disableOnInteraction: false,
              }
            : false
        }
        modules={autoplay ? [Autoplay, Grid, Navigation] : [Grid, Navigation]}
        className={`relate ${rows === 2 ? "multi-item" : ""}`}
      >
        {/* Ensure the total number of SwiperSlide components is a multiple of the grid rows */}
        {products
          .filter((product) => product.category_id === category)
          .map((product) => (
            <SwiperSlide key={product.product_id} className="multi-slide">
              <CartProduct product={product} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
