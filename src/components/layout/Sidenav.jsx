import {
  ContainerOutlined,
  GroupOutlined,
  PieChartFilled,
  ProductOutlined,
  RadarChartOutlined,
  ShoppingCartOutlined,
  SketchCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./layout.scss";
import { useState } from "react";
const items = [
  {
    key: "/admin-page/dashboard",
    icon: <PieChartFilled className="side-icon" />,
    label: <h3>Dashboard</h3>,
  },
  {
    key: "sub2",
    label: "Đơn Hàng",
    icon: <ShoppingCartOutlined className="side-icon" />,
    children: [
      { key: "/admin-page/don-hang/all", label: "Tất cả đơn hàng" },
      { key: "/admin-page/don-hang/hoa-don", label: "Hóa đơn" },
    ],
  },
  {
    key: "sub3",
    label: "Sản Phẩm",
    icon: <ProductOutlined className="side-icon" />,
    children: [
      { key: "san-pham/xem-tat-ca-san-pham", label: "Xem Sản Phẩm" },
      { key: "san-pham/tao-san-pham", label: "Tạo Sản Phẩm" },
    ],
  },
  {
    key: "sub4",
    label: "Kim Cương",
    icon: <RadarChartOutlined className="side-icon" />,
    children: [
      { key: "san-pham/xem-tat-ca-kim-cuong", label: "Xem Kim Cương" },
      { key: "san-pham/tao-kim-cuong", label: "Nhập Kim Cương" },
    ],
  },
  {
    key: "sub5",
    label: "Tài Khoản",
    icon: <UserOutlined className="side-icon" />,
    children: [
      { key: "tai-khoan/xem-tat-ca-tai-khoan", label: "Xem tất cả" },
      { key: "tai-khoan/tao-tai-khoan", label: "Tạo Tài Khoản" },
    ],
  },
  {
    key: "sub6",
    label: "Bộ sưu tập",
    icon: <GroupOutlined className="side-icon" />,
    children: [
      { key: "bo-suu-tap/xem-tat-ca-bo-suu-tap", label: "Xem Bộ Sưu Tập" },
      { key: "bo-suu-tap/tao-bo-suu-tap", label: "Tạo Bộ Sưu Tập" },
    ],
  },
  {
    key: "/admin-page/view-bao-hanh",
    icon: <ContainerOutlined className="side-icon" />,

    label: "Phiếu Bảo Hành",
  },
];
// eslint-disable-next-line react/prop-types
function Sidenav({ collapsed }) {
  const navigate = useNavigate(); // Hook useNavigate
  const [selectedKey, setSelectedKey] = useState("/admin-page/dashboard");
  const handleMenuClick = (e) => {
    // Điều hướng đến path tương ứng với key của mục menu được click
    navigate(e.key);

    setSelectedKey(e.key);
  };
  // Hàm này kiểm tra mỗi item con và thêm class "menu-item-selected" nếu cần
  const addSelectedItemClass = (items) =>
    items.map((item) => ({
      ...item,
      className: item.key === selectedKey ? "menu-item-selected" : "",
      children: item.children ? addSelectedItemClass(item.children) : undefined,
    }));

  const logoClass = collapsed ? "collapsed-logo" : "";
  return (
    <div className="tong-layout">
      <div className="side_logo">
        {!collapsed ? (
          <Link to={"/"}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/Logo.png?alt=media&token=13f983ed-b3e1-4bbe-83b2-a47edf62c6a6"
              width={250}
              alt=""
            />
          </Link>
        ) : (
          <SketchCircleFilled className={logoClass} />
        )}
      </div>

      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["selectedKey"]}
        defaultOpenKeys={["selectedKey"]}
        items={addSelectedItemClass(items)} // Sử dụng hàm addSelectedItemClass để thêm các class
        onClick={handleMenuClick}
        className="menu-theme-light customized-submenu"
        style={{ fontSize: "20px" }}
      />
    </div>
  );
}

export default Sidenav;
