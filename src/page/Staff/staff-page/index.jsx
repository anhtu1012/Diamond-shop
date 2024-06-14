import { useState } from "react";
import { Breadcrumb, Layout, theme } from "antd";
import {  Link, Outlet } from "react-router-dom";
import "./index.scss";
import { Footer } from "antd/es/layout/layout";
import SidenavS from "../../../components/layout/SidenavS";
import HeaderStaff from "../../../components/layout/HeaderS";
const { Header, Sider, Content } = Layout;
const StaffPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={270}
        theme="line"
        className="sider"
        style={{
          background: "transparent",
        }}
      >
        <SidenavS collapsed={collapsed} />
      </Sider>
      <Layout>
        <Header className="header_Admin">
          <HeaderStaff collapsed={collapsed} setCollapsed={setCollapsed} />
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          {" "}
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>
              <Link to="/staff-page">Đơn hàng mới</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/staff-page/don-hang">Đơn hàng</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/staff-page/tai-khoan">Tài khoản</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/staff-page/san-pham">Sản phẩm</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/staff-page/bao-hanh">Phiếu bảo hành</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default StaffPage;
