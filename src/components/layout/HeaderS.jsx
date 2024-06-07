/* eslint-disable react/prop-types */
import { Badge, Button, Space } from "antd";
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingFilled,
  SoundFilled,
  SunFilled,
} from "@ant-design/icons";


import { Avatar } from "antd";

function HeaderStaff({ collapsed, setCollapsed }) {
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
            <SoundFilled style={{ fontSize: "25px" }} />
          </Badge>
          <SunFilled />
        </Space>
      </div>
    </div>
  );
}

export default HeaderStaff;
