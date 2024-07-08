import { Content } from "antd/es/layout/layout";
import Container from "../../../components/container/Container";
import { Breadcrumb, Col, Row, theme } from "antd";
import { Link } from "react-router-dom";
import "./index.scss";
import Relate from "../../../components/carousel/related";
import { RightOutlined } from "@ant-design/icons";
import { useEffect } from "react";
function TrangSucCuoi() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="tong-trang-suc-cuoi">
      <div className="baner1">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/Trang%20s%E1%BB%A9c%20c%C6%B0%E1%BB%9Bi.webp?alt=media&token=4d281899-82c5-4a2a-a854-9c88a2f48028.jpg"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <Container>
        <div>
          <Content style={{ padding: "0 0px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>
                <Link to="/">Trang chủ</Link>
              </Breadcrumb.Item>
            </Breadcrumb>
            <div
              style={{
                background: colorBgContainer,
                minHeight: 0,
                padding: 0,
                borderRadius: borderRadiusLG,
              }}
            ></div>
          </Content>
        </div>
        <Col span={24}>
          <h2>LOVE & WEDDING</h2>
        </Col>

        <Col span={24}>
          <h2 className="nhan">Nhẫn Cầu Hôn</h2>
        </Col>
        <div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/nhan-cau-hon.jpg?alt=media&token=138db3a9-6be7-412e-81d7-bd34deedef32.jpg"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <Row className="section">
          <Col span={24}>
            <Relate numberOfSlides={4} category="Nhẫn Cầu Hôn Kim Cương" />
          </Col>
          <Col span={24} style={{ textAlign: "center", padding: "20px 0px" }}>
            <Link to={"/nhan-cau-hon"}>
              <button>
                Xem Thêm <RightOutlined />
              </button>
            </Link>
          </Col>
        </Row>
        <Col span={24}>
          <h2 className="nhan">Nhẫn Cưới</h2>
        </Col>
        <div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/NhanCuoi1.jpg?alt=media&token=379d04ec-22ea-4060-afd1-572edc4771df"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <Row className="section">
          <Col span={24}>
            <Relate numberOfSlides={4} category="Nhẫn Cưới Kim Cương" />
          </Col>
          <Col span={24} style={{ textAlign: "center", padding: "20px 0px" }}>
            <Link to={"/nhan-cuoi"}>
              <button>
                Xem Thêm <RightOutlined />
              </button>
            </Link>
          </Col>
        </Row>
        <Col span={24}>
          <h2 className="nhan">Bộ trang sức cưới</h2>
        </Col>
        <div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/NhanCuoi.jpg?alt=media&token=108cfbb8-74bb-4e76-ab75-058e9b9a8ea0"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <Row className="section">
          <Col span={24}>
            <Relate numberOfSlides={4} data="diamonds" />
          </Col>
          <Col span={24} style={{ textAlign: "center", padding: "20px 0px" }}>
            <button>
              Xem Thêm <RightOutlined />
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TrangSucCuoi;
