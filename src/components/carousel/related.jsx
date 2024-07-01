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
  isNewest = false,
  showAllProducts = false,
  numberOfProducts = 10,
  showAllCategories = false,
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
    let sortedItems = res.data;
    if (isNewest) {
      sortedItems = sortedItems.sort((a, b) => {
        const dateA = new Date(data === "diamonds" ? a.inputDate : a.createAt);
        const dateB = new Date(data === "diamonds" ? b.inputDate : b.createAt);
        return dateB - dateA;
      });
    }

    setItems(sortedItems);
  };

  useEffect(() => {
    fetchItems();
  }, [data, isNewest]);
  const handleCardClick = () => {
    // Cuộn lên đầu trang
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Cho phép cuộn mượt mà
    });
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth <= 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Filter items based on shape or category
  const filteredItems = items.filter((item) => {
    if (data === "diamonds") {
      return item.shape === shape;
    }
    return showAllCategories || item.category.categoryName === category;
  });

  // Limit the number of items if showAllProducts is false
  const displayedItems = showAllProducts
    ? filteredItems
    : filteredItems.slice(0, numberOfProducts);

  return (
    <div className="swiper-container" style={swiperContainerStyle}>
      <Swiper
        spaceBetween={30}
        slidesPerView={
          isMobile
            ? 1
            : isTablet
            ? data === "diamonds"
              ? 2
              : numberOfSlides -2
            : numberOfSlides
        }
        grid={{
          rows: rows,
        }}
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
        {displayedItems.map((item) => (
          <SwiperSlide
            key={item.productID || item.diamondID}
            className="multi-slide"
          >
            <div onClick={handleCardClick}>
              {data === "diamonds" ? (
                <CartProduct diamond={item} />
              ) : (
                <CartProduct product={item} />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
