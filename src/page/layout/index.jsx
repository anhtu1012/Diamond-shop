import { Outlet } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import { getDiamonds, getProducts } from "../../../services/Uservices";

function Layout() {
  const [allProduct, setAllProduct] = useState();
  const [allDiamond, setAllDiamond] = useState();

  const fetchAllProduct = async () => {
    const res = await getProducts();
    setAllProduct(res.data);
  };

  const fetchAllDiamond = async () => {
    const res = await getDiamonds();
    setAllDiamond(res.data);
  };

  useEffect(() => {
    fetchAllProduct();
    fetchAllDiamond();
  }, []);
  console.log(allDiamond);

  const contextValue = { allProduct, allDiamond }; // Tạo một object chứa các state

  return (
    <div>
      <Header />
      {/* Truyền contextValue qua Outlet */}
      <Outlet context={contextValue} />
      <Footer />
    </div>
  );
}

export default Layout;
