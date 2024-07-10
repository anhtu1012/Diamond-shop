import {
  ContainerOutlined,
  ProductOutlined,
  ShoppingCartOutlined,
  SketchCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Menu, notification } from "antd";
import { useNavigate } from "react-router-dom";
import "./layout.scss";
import { useEffect, useState } from "react";
import { getOrderPending } from "../../../services/Uservices";

// eslint-disable-next-line react/prop-types
function SidenavS({ collapsed }) {
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

  const [quantityPending, setQuantityPending] = useState();
  useEffect(() => {
    const fetchOrderPeding = async () => {
      try {
        const res = await getOrderPending();
        setQuantityPending(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderPeding();
  }, [quantityPending]);
  useEffect(() => {
    const sendNotification = () => {
      if (quantityPending > 0) {
        notification.warning({
          message: "Nhắc nhở đơn xác nhận",
          description: `Bạn có ${quantityPending} đơn hàng cần xác nhận. Vui lòng xác nhận ngay cho khách!`,
          duration: 5,
        });
      }
    };

    sendNotification();

    const intervalId = setInterval(sendNotification, 300000);

    return () => clearInterval(intervalId);
  }, [quantityPending]);
  const items = [
    {
      key: "/staff-page/don-hang-moi",
      icon: (
        <Badge count={quantityPending} size="small">
          {" "}
          <ShoppingCartOutlined
            style={{ fontSize: "25px", color: "black" }}
            className="side-icon"
          />
        </Badge>
      ),
      label: <h3>Đơn Hàng Mới</h3>,
    },
    {
      key: "/staff-page/don-hang",
      icon: <ShoppingCartOutlined className="side-icon" />,
      label: "Đơn Hàng",
    },
    {
      key: "/staff-page/tai-khoan",
      icon: <UserOutlined className="side-icon" />,
      label: "Tài Khoản",
    },
    {
      key: "/staff-page/san-pham",
      icon: <ProductOutlined className="side-icon" />,

      label: "Sản Phẩm",
    },
    {
      key: "/staff-page/view-bao-hanh",
      icon: <ContainerOutlined className="side-icon" />,

      label: "Phiếu Bảo Hành",
    },
    {
      key: "/staff-page/bao-hanh",
      icon: <ContainerOutlined className="side-icon" />,

      label: "Tạo Phiếu Bảo Hành",
    },
  ];
  const logoClass = collapsed ? "collapsed-logo" : "";
  return (
    <>
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
        style={{ fontSize: "20px" }}
      />
    </>
  );
}

export default SidenavS;
