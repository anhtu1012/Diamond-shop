/* eslint-disable react/prop-types */
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Dropdown,
  Menu,
  Modal,
  Tooltip,
  message,
  notification,
} from "antd";
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
import {
  getOrderWaitPay,
  getQuantityCart,
  logoutApi,
  searchResultss,
} from "../../../services/Uservices";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../redux/features/counterSlice";
import Login from "../login";

const items = [
  {
    label: (
      <div style={{ fontSize: "15px", padding: "10px" }}>
        Vì sao bạn chọn Diamond
      </div>
    ),
    key: "gioi-thieu-ve-diamond",
  },
];

const trangSucCuoiItems = [
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

const kimCuongVien = [
  {
    label: (
      <div style={{ fontSize: "15px", padding: "10px" }}>Kim cương GIA</div>
    ),
    key: "/kim-cuong-gia",
  },
  {
    label: (
      <div style={{ fontSize: "15px", padding: "10px" }}>
        Bảng giá kim cương GIA
      </div>
    ),
    key: "/bang-gia-kim-cuong",
  },
];

function Header({ quantity, setQuantity }) {
  const onClick = ({ key }) => {
    navigate(`${key}`);
  };

  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [quantityWaitPay, setQuantityWaitPay] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchQuantity = async () => {
      try {
        const res = await getQuantityCart(user.userID);
        setQuantity(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuantity();
  }, [quantity]);

  useEffect(() => {
    const fetchOrderWaitPay = async () => {
      try {
        const res = await getOrderWaitPay(user.userID);
        setQuantityWaitPay(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderWaitPay();
  }, [quantityWaitPay]);

  useEffect(() => {
    const sendNotification = () => {
      if (quantityWaitPay > 0) {
        notification.warning({
          message: "Nhắc nhở thanh toán",
          description: `Bạn có ${quantityWaitPay} đơn hàng chờ thanh toán. Vui lòng thanh toán ngay!`,
          duration: 5,
        });
      }
    };

    sendNotification();

    const intervalId = setInterval(sendNotification, 300000);

    return () => clearInterval(intervalId);
  }, [quantityWaitPay]);

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
    dispatch(logout());
    navigate("/");
    message.success("Đăng Xuất Thành Công");
  };

  const settings = [
    {
      key: "/thong-tin-chi-tiet",
      label: "Thông tin",
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

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = async (event) => {
    const query = event.target.value;
    console.log("Searching for:", query); // Debug: Log the search query
    if (query) {
      try {
        const response = await searchResultss(query);
        console.log("Search results:", response.data); // Debug: Log the search results
        setSearchResults(response.data);
      } catch (error) {
        console.error("Search error:", error); // Debug: Log the error
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };
  const searchMenu = (
    <Menu>
      {Array.isArray(searchResults) && searchResults.length > 0 ? (
        searchResults.map((item) => (
          <Menu.Item key={item.diamondID || item.productID}>
            <Link
              to={
                item.diamondID
                  ? `/diamond-details/${item.diamondID}`
                  : `/product-details/${item.productID}`
              }
              onClick={toggleSearch}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                  <img
                    src={item.image || item.productImages[0].imageUrl}
                    alt={item.diamondName || item.productName}
                    style={{ width: "50px", marginRight: "10px" }}
                  />
                </div>
                <div>{item.diamondName || item.productName}</div>
              </div>
            </Link>
          </Menu.Item>
        ))
      ) : (
        <Menu.Item key="no-results">No results found</Menu.Item>
      )}
    </Menu>
  );

  return (
    <div className="container-fluid">
      <header className="header">
        <div className="header_social_left">
          <FaFacebookSquare />
          <FaInstagramSquare />
          <FaMapMarkerAlt />
        </div>
        <div className="menu-toggle" onClick={toggleNav}>
          <MenuOutlined />
        </div>
        <div className="header_logo">
          <Link to="/">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/Logo.png?alt=media&token=13f983ed-b3e1-4bbe-83b2-a47edf62c6a6"
              width={250}
              alt=""
            />
          </Link>
        </div>{" "}
        <div>
          {!user ? (
            <div className="header_social_right">
              <div className="search">
                <SearchOutlined onClick={toggleSearch} />
                {isSearchVisible && (
                  <Dropdown overlay={searchMenu} trigger={["click"]}>
                    <input
                      type="text"
                      placeholder="Search..."
                      onChange={handleSearch}
                    />
                  </Dropdown>
                )}
              </div>
              <Badge count={0} size="small">
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
                  <Dropdown overlay={searchMenu} trigger={["click"]}>
                    <input
                      type="text"
                      placeholder="Search..."
                      onChange={handleSearch}
                    />
                  </Dropdown>
                )}
              </div>
              <Badge count={quantity} size="small">
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
                <Badge count={quantityWaitPay} size="small">
                  <FaUserCog
                    style={{ fontSize: "25px", color: "#828282" }}
                    onClick={(e) => e.preventDefault()}
                  />
                </Badge>
              </Dropdown>
            </div>
          )}
        </div>
      </header>
      <nav className={`nav ${isNavVisible ? "active" : ""}`}>
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
            <Dropdown
              menu={{
                items: kimCuongVien,
                onClick,
              }}
            >
              <Link to="/kim-cuong-vien">Kim cương viên</Link>
            </Dropdown>
          </li>
          <li>
            <Link to="/huong-dan-do-ni">Hướng dẫn</Link>
          </li>
          <li>
            <Link to="/tuy-chinh" style={{ color: "red ", fontWeight: "500" }}>
              Tùy chỉnh
            </Link>
          </li>
          <li>
            <Link to="/lien-he">Liên hệ</Link>
          </li>
        </ul>
      </nav>
      <Modal
        centered
        open={isLoginModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={1010}
        className="custom-modal-style"
      >
        <Login onLoginSuccess={handleCancel} />
      </Modal>
    </div>
  );
}

export default Header;
