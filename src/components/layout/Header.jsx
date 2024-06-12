/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Badge, Button, Drawer, Dropdown, Space, message } from "antd";
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SunFilled,
} from "@ant-design/icons";
import { Avatar } from "antd";
import { IoMdNotifications } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { logoutApi } from "../../../services/Uservices";
import { useState } from "react";
import "./Header.scss";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/counterSlice";

function HeaderAdmin({ collapsed, setCollapsed }) {
  const onClick = ({ key }) => {
    // message.info(`Click on item ${key}`);
    navigate(`${key}`);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook useNavigate
  const handleLogout = async () => {
    await logoutApi();
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
    message.success("Đăng Xuất Thành Công");
  };
  const settings = [
    {
      key: "1",
      label: <Link to="/">Thông tin</Link>,
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
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="header_admin">
      <div>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
            marginRight: "1rem",
          }}
        />
      </div>
      <div>
        <Space size="middle" className="header_admin_icon">
          <p style={{ fontStyle: "italic", fontSize: "25px" }}>
            Xin chào, Admin
          </p>
          <Dropdown
            menu={{
              items: settings,
              onClick,
            }}
            placement="bottom"
            arrow
          >
            <Avatar
              style={{ fontSize: "25px", background: "black" }}
              icon={<UserOutlined />}
              onClick={(e) => e.preventDefault()}
            />
          </Dropdown>

          <Badge size="default" count={5} style={{ marginTop: "30px" }}>
            <IoMdNotifications
              style={{ marginTop: "30px", fontSize: "30px" }}
              onClick={showDrawer}
            />
          </Badge>
          <Drawer title="Thông báo" onClose={onClose} open={open}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ marginBottom: "20px", marginRight: "10px" }}>
                Có một tài khoản mới được đăng kí
              </p>
              <div
                style={{
                  flex: "1",
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "-20px",
                }}
              >
                <Badge size="default" count={1}></Badge>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ marginBottom: "20px", marginRight: "10px" }}>
                Có một tài khoản mới được đăng kí
              </p>
              <div
                style={{
                  flex: "1",
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "-20px",
                }}
              >
                <Badge size="default" count={1}></Badge>
              </div>
            </div>
          </Drawer>
        </Space>
      </div>
    </div>
  );
}

export default HeaderAdmin;
