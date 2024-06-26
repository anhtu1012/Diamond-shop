import { Outlet } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import { getDiamonds, getProducts } from "../../../services/Uservices";
import { FloatButton } from "antd";
import { CommentOutlined, PhoneOutlined } from "@ant-design/icons";
import "./index.scss"; // Import the SCSS file

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
  const [quantity, setQuantity] = useState();

  const contextValue = { allProduct, allDiamond, setQuantity };

  const [showChatbox, setShowChatbox] = useState(false);

  const toggleChatbot = () => {
    setShowChatbox(!showChatbox);
  };

  const renderChatbox = () => (
    <div className={`chatbox ${showChatbox ? "show" : ""}`}>
      <button className="close-btn" onClick={toggleChatbot}>
        X
      </button>
      <iframe
        allow="microphone;"
        className="chatbox-frame"
        width="350"
        height="430"
        src="https://console.dialogflow.com/api-client/demo/embedded/9e3163ee-00e9-43b7-a50d-3f127c68024c"
      ></iframe>
    </div>
  );
  return (
    <div>
      <Header quantity={quantity} setQuantity={setQuantity} />

      <Outlet context={contextValue} />
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ bottom: 104 }}
        icon={<PhoneOutlined className="shake-icon" />}
      >
        <FloatButton />
        <FloatButton icon={<CommentOutlined />} onClick={toggleChatbot} />
      </FloatButton.Group>
      <FloatButton.BackTop />

      <Footer />
      {showChatbox && renderChatbox()}
    </div>
  );
}

export default Layout;
