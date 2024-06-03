/* eslint-disable react/prop-types */
import { Badge, Button, Space } from "antd";
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingFilled,
  SunFilled,
} from "@ant-design/icons";
import { Avatar } from "antd";
import { IoMdNotifications } from "react-icons/io";

function HeaderAdmin({ collapsed, setCollapsed }) {
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
          <Avatar
            style={{ fontSize: "25px", background: "black" }}
            icon={<UserOutlined />}
          />
          <p style={{ fontStyle: "italic", fontSize: "20px" }}>Manage</p>
          <SettingFilled />
          <Badge size="default" count={5}>
            <IoMdNotifications style={{ fontSize: "25px" }} />
          </Badge>
          <SunFilled />
        </Space>
      </div>
    </div>
  );
}

export default HeaderAdmin;
