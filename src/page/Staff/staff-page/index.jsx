import { useState } from "react";
import { Breadcrumb, Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import HeaderAdmin from "../../../components/layout/Header";
import "./index.scss";
import { Footer } from "antd/es/layout/layout";
import SidenavS from "../../../components/layout/SidenavS";
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
          <HeaderAdmin collapsed={collapsed} setCollapsed={setCollapsed} />
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
            <Breadcrumb.Item>Ecommerce</Breadcrumb.Item>
            <Breadcrumb.Item>Order</Breadcrumb.Item>
            <Breadcrumb.Item>Đơn hàng</Breadcrumb.Item>
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
