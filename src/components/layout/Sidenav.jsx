import {
  DashboardTwoTone,
  ShopFilled,
  SettingOutlined,
  SketchCircleFilled,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "./layout.scss";
import { useState } from "react";
const items = [
  {
    key: "/admin-page/dashboard",
    icon: <DashboardTwoTone className="icon" />,
    label: <h3>Dashboard</h3>,
  },
  {
    key: "sub1",
    label: "Ecommerce",
    icon: <ShopFilled className="icon" />,
    children: [
      {
        key: "sub1-2",
        label: "Order",
        children: [
          { key: "/admin-page/order", label: "Đơn hàng" },
          { key: "/admin-page/product", label: "Hóa đơn" },
        ],
      },
      {
        key: "sub1-3",
        label: "Product",
        children: [
          { key: "", label: "New Product" },
          { key: "", label: "Edit Product" },
        ],
      },
    ],
  },
  {
    key: "sub2",
    label: "Account",
    icon: <SettingOutlined className="icon" />,
    children: [
      { key: "", label: "Option 7" },
      { key: "", label: "Option 8" },
      { key: "", label: "Option 9" },
      { key: "", label: "Option 10" },
    ],
  },
  {
    key: "sub3",
    label: "Dự kiến",
    icon: <SettingOutlined className="icon" />,
    children: [
      { key: "", label: "Option 7" },
      { key: "", label: "Option 8" },
      { key: "", label: "Option 9" },
      { key: "", label: "Option 10" },
    ],
  },
  {
    key: "sub4",
    label: "Dự kiến",
    icon: <SettingOutlined className="icon" />,
    children: [
      { key: "", label: "Option 7" },
      { key: "", label: "Option 8" },
      { key: "", label: "Option 9" },
      { key: "", label: "Option 10" },
    ],
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
    <>
      <h2>aghsdjkfh</h2>
      <div className="side_logo">
        {!collapsed ? (
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/Logo.png?alt=media&token=13f983ed-b3e1-4bbe-83b2-a47edf62c6a6"
            width={250}
            alt=""
          />
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
        style={{ fontSize: "20px", paddingBottom: "30px" }}
      />
    </>
  );
}

export default Sidenav;
