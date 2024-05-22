import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import "./index.scss";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaMapMarkerAlt,
  FaShoppingCart,
  FaUserCog,
  FaYoutube,
} from "react-icons/fa";
import { Modal } from "antd";
import { useState } from "react";
import LoginPage from "../../page/login";
function Header() {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const user = null;

  const showModal = () => {
    setIsLoginModalVisible(true);
  };

  const handleCancel = () => {
    setIsLoginModalVisible(false);
  };
  return (
    <div className="container-fluid">
      <header className="header">
        <div className="header_social_left">
          <FaFacebookSquare />
          <FaYoutube />
          <FaInstagramSquare />
          <FaMapMarkerAlt />
        </div>
        <div className="header_logo">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/Logo.png?alt=media&token=13f983ed-b3e1-4bbe-83b2-a47edf62c6a6"
            width={250}
            alt=""
          />
        </div>
        <div className="header_social_right">
          {!user ? (
            <button onClick={() => showModal(true)}>Login</button>
          ) : (
            <div>
              <FaUserCog />
              <FaShoppingCart />
            </div>
          )}
        </div>
      </header>

      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to="/">Trang sức cưới</Link>
          </li>
          <li>
            <Link to="/">Trang sức kim cương</Link>
          </li>
          <li>
            <Link to="/">Kim cương</Link>
          </li>
          <li>
            <Link to="/">Chuyên gia</Link>
          </li>
          <li>
            <Link to="/">Tùy chỉnh</Link>
          </li>
          <li>
            <Link to="/">Liên hệ</Link>
          </li>
        </ul>
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlined className="icon" />
        </div>
      </nav>

      <Modal
        centered
        open={isLoginModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={1010} // chỉ định chiều rộng của Modal
        className="custom-modal-style" // sử dụng class CSS mới để kiểm soát style của Modal
      >
        {/* Đây là nơi cho form đăng nhập */}
        <LoginPage />
      </Modal>
    </div>
  );
}

export default Header;
