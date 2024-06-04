import { SearchOutlined } from "@ant-design/icons";
import { Badge, Button, Dropdown, Modal, Tooltip, message } from "antd";
import { useEffect, useState } from "react";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaMapMarkerAlt,
  FaShoppingCart,
  FaUserCog,
  FaUserSecret,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getProducts, logoutApi } from "../../../services/Uservices";
import LoginPage from "../../page/login";
import "./index.scss";

const items = [
  {
    label: (
      <div style={{ fontSize: "15px", padding: "10px" }}>
        Vì sao chọn Diamond
      </div>
    ),
    key: "gioi-thieu-ve-diamond",
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
    key: "nhan-cuoi",
  },
  {
    label: (
      <div style={{ fontSize: "15px", padding: "5px 20px" }}>
        Bộ Trang Sức Cưới Kim Cương
      </div>
    ),
    key: "bo-trang-suc-cuoi",
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
    key: "nhan-kim-cuong",
  },
  {
    label: (
      <div style={{ fontSize: "15px", padding: "5px 20px" }}>
        Bông Tai Kim Cương
      </div>
    ),
    key: "bong-tai-kim-cuong",
  },
  {
    label: (
      <div style={{ fontSize: "15px", padding: "5px 20px" }}>
        Lắc/Vòng Tay Kim Cương
      </div>
    ),
    key: "lac-vong-tay-kim-cuong",
  },
  {
    label: (
      <div style={{ fontSize: "15px", padding: "5px 20px" }}>
        Mặt Dây Chuyền Kim Cương
      </div>
    ),
    key: "mat-day-chuyen-kim-cuong",
  },
  {
    label: (
      <div style={{ fontSize: "15px", padding: "5px 20px" }}>
        Bộ Sưu Tập Kim Cương
      </div>
    ),
    key: "bo-suu-tap-kim-cuong",
  },
];

function Header() {
  const onClick = ({ key }) => {
    // message.info(`Click on item ${key}`);
    navigate(`${key}`);
  };
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const navigate = useNavigate(); // Hook useNavigate
  const [user, setUser] = useState(null); // State lưu trữ thông tin người dùng

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".container-fluid");
      if (header) {
        if (window.pageYOffset > header.offsetTop) {
          header.classList.add("sticky");
        } else {
          header.classList.remove("sticky");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(window.atob(base64));
      setUser(payload);
    }
  }, []);
  const showModal = () => {
    setIsLoginModalVisible(true);
  };

  const handleCancel = () => {
    setIsLoginModalVisible(false);
  };
  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
  };
  const handleLogout = async () => {
    await logoutApi();
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
    message.success("Đăng Xuất Thành Công");
  };
  const settings = [
    {
      key: "1",
      label: <Link to="/">Thông tin</Link>,
    },
    {
      key: "/don-hang",
      label: "Đơn Hàng",
    },
    {
      key: "#",
      label: (
        <Button
          type="text"
          onClick={handleLogout}
          style={{ padding: "0", color: "red" }}
        >
          Đăng xuất
        </Button>
      ),
    },
  ];
  const hanldeGetProduct = async () => {
    const res = await getProducts();
    console.log(res.data);
  };
  return (
    <div className="container-fluid">
      <header className="header">
        <div className="header_social_left">
          <FaFacebookSquare onClick={() => hanldeGetProduct()} />
          <FaInstagramSquare />
          <FaMapMarkerAlt />
        </div>
        <div className="header_logo">
          <Link to="/">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/Logo.png?alt=media&token=13f983ed-b3e1-4bbe-83b2-a47edf62c6a6"
              width={250}
              alt=""
            />
          </Link>
        </div>
        <div>
          {!user ? (
            <div className="header_social_right">
              <div className="search">
                <SearchOutlined onClick={toggleSearch} />
                {isSearchVisible && (
                  <input type="text" placeholder="Search..." />
                )}
              </div>
              <Badge count={5} size="small">
                <FaShoppingCart
                  style={{ fontSize: "25px", color: "#828282" }}
                  onClick={() => navigate("/cart")}
                />
              </Badge>
              <Tooltip placement="bottom" title={"Đăng nhập"}>
                <FaUserSecret onClick={() => showModal(true)} />
              </Tooltip>
            </div>
          ) : (
            <div className="header_social_right">
              <div className="search">
                <SearchOutlined onClick={toggleSearch} />
                {isSearchVisible && (
                  <input type="text" placeholder="Search..." />
                )}
              </div>
              <Badge count={5} size="small">
                <FaShoppingCart
                  style={{ fontSize: "25px", color: "#828282" }}
                  onClick={() => navigate("/cart")}
                />
              </Badge>
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
              <Link to="/trang-suc-cuoi">Trang sức cưới</Link>
            </Dropdown>
          </li>
          <li>
            <Dropdown
              menu={{
                items: trangSucKimCuongItems,
                onClick,
              }}
            >
              <Link to="/trang-suc-kim-cuong">Trang sức kim cương</Link>
            </Dropdown>
          </li>
          <li>
            <Link to="/kim-cuong-vien">Kim cương viên</Link>
          </li>
          <li>
            <Link to="/huong-dan-do-ni">Hướng dẫn</Link>
          </li>
          <li>
            <Link to="/tuy-chinh">Tùy chỉnh</Link>
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
        <LoginPage setUser={setUser} onLoginSuccess={handleCancel} />
      </Modal>
    </div>
  );
}

export default Header;
