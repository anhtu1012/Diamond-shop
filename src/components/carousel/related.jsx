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
import { getDiamonds, getProducts } from "../../../services/Uservices";

export default function Relate({
  numberOfSlides = 4,
  autoplay = false,
  rows = 1,
  shape = "Round",
  category = "Nhẫn Kim Cương Nữ",
  data = "products",
}) {
  const swiperContainerStyle = {
    "--swiper-rows": rows,
    "--swiper-space-between": "30px",
  };
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    let res;
    if (data === "diamonds") {
      res = await getDiamonds();
    } else {
      res = await getProducts();
    }
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, [data]);

  return (
    <div className="swiper-container" style={swiperContainerStyle}>
      <Swiper
        slidesPerView={numberOfSlides}
        grid={{
          rows: rows,
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
        {items
          .filter((item) => {
            if (data === "diamonds") {
              return item.shape === shape;
            }
            return item.category.categoryName === category;
          })
          .map((item) => (
            <SwiperSlide
              key={item.productID || item.diamondID}
              className="multi-slide"
            >
              {data === "diamonds" ? (
                <CartProduct diamond={item} />
              ) : (
                <CartProduct product={item} />
              )}
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
