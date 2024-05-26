import { LoginOutlined, SearchOutlined } from "@ant-design/icons";
import { Dropdown, Modal, message } from "antd";
import { useState } from "react";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaMapMarkerAlt,
  FaShoppingCart,
  FaUserCog,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import LoginPage from "../../page/login";
import "./index.scss";
const onClick = ({ key }) => {
  // message.info(`Click on item ${key}`);
  navigate(`${key}`);
};
const settings = [
  {
    key: "1",
    label: <Link to="/">1st menu item</Link>,
  },
  {
    key: "2",
    label: <Link to="/">2nd menu item</Link>,
  },
  {
    key: "3",
    label: <Link to="/">3rd menu item</Link>,
  },
];
const items = [
  {
    label: (
      <div style={{ fontSize: "15px", padding: "10px" }}>
        Vì sao chọn Diamond
      </div>
    ),
    key: "1",
  },
];
const trangSucCuoiItems = [
  // Đây là các mục sẽ xuất hiện dưới dropdown "Trang sức cưới"
  {
    label: (
      <div style={{ fontSize: "15px", padding: "5px 20px" }}>
        Nhẫn Cầu Hôn Kim Cương
      </div>
    ),
    key: "nhan-cau-hon",
  },
  {
    label: (
      <div style={{ fontSize: "15px", padding: "5px 20px" }}>
        Nhẫn Cưới Kim Cương
      </div>
    ),
    key: "trang-suc-cuoi-2",
  },
  {
    label: (
      <div style={{ fontSize: "15px", padding: "5px 20px" }}>
        Bộ Trang Sức Cưới Kim Cương
      </div>
    ),
    key: "trang-suc-cuoi-3",
  },
];

const trangSucKimCuongItems = [
  // Đây là các mục sẽ xuất hiện dưới dropdown "Trang sức cưới"
  {
    label: (
      <div style={{ fontSize: "15px", padding: "5px 20px" }}>
        Nhẫn Kim Cương
      </div>
    ),
    key: "2",
  },
  {
    label: (
      <div style={{ fontSize: "15px", padding: "5px 20px" }}>
        Bông Tai Kim Cương
      </div>
    ),
    key: "3",
  },
  {
    label: (
      <div style={{ fontSize: "15px", padding: "5px 20px" }}>
        Lắc/Vòng Tay Kim Cương
      </div>
    ),
    key: "4",
  },
  {
    label: (
      <div style={{ fontSize: "15px", padding: "5px 20px" }}>
        Mặc Dây Chuyền Kim Cương
      </div>
    ),
    key: "5",
  },
  {
    label: (
      <div style={{ fontSize: "15px", padding: "5px 20px" }}>
        Bộ Sưu Tập Kim Cương
      </div>
    ),
    key: "6",
  },
];

function Header() {
  const onClick = ({ key }) => {
    // message.info(`Click on item ${key}`);
    navigate(`${key}`);
  };
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const user = "null";

  const showModal = () => {
    setIsLoginModalVisible(true);
  };

  const handleCancel = () => {
    setIsLoginModalVisible(false);
  };
  const navigate = useNavigate(); // Hook useNavigate
  return (
    <div className="container-fluid">
      <header className="header">
        <div className="header_social_left">
          <FaFacebookSquare />
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
        <div>
          {!user ? (
            <div className="header_social_right">
              <SearchOutlined />
              <LoginOutlined onClick={() => showModal(true)} />
              <FaShoppingCart />
            </div>
          ) : (
            <div className="header_social_right">
              <SearchOutlined />
              <FaShoppingCart onClick={() => navigate("/cart")} />
              <Dropdown
                menu={{
                  items: settings,
                  onClick,
                }}
                placement="bottom"
                arrow
              >
                <FaUserCog onClick={(e) => e.preventDefault()} />
              </Dropdown>
            </div>
          )}
        </div>
      </header>
      <nav className="nav">
        <ul>
          <li>
            <Dropdown
              menu={{
                items,
                onClick,
              }}
            >
              <Link to="/">Trang chủ</Link>
            </Dropdown>
          </li>
          <li>
            <Dropdown
              menu={{
                items: trangSucCuoiItems,
                onClick,
              }}
            >
              <Link to="/">
                Trang sức cưới
              </Link>
            </Dropdown>
          </li>
          <li>
            <Dropdown
              menu={{
                items: trangSucKimCuongItems,
                onClick,
              }}
            >
              <Link  to="/">
                Trang sức kim cương
              </Link>
            </Dropdown>
          </li>
          <li>
            <Link to="/">Kim cương viên</Link>
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
