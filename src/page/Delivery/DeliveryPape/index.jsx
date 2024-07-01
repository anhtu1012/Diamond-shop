import { useState } from "react";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import { Footer } from "antd/es/layout/layout";
import SidenavD from "../../../components/layout/SidenavD";
import HeaderDelivery from "../../../components/layout/HeaderD";
import Breadcrumbs from "../../../components/breadcums";

const { Header, Sider, Content } = Layout;
const DeliveryPage = () => {
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
        <SidenavD collapsed={collapsed} />
      </Sider>
      <Layout>
        <Header className="header_Admin">
          <HeaderDelivery collapsed={collapsed} setCollapsed={setCollapsed} />
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          {" "}
          <div className="breadcums" style={{ padding: "20px 10px" }}>
            <Breadcrumbs />
          </div>
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
export default DeliveryPage;
