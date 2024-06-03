import { useState } from "react";
import { Breadcrumb, Col, Row, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import Container from "../../../components/container/Container";
import "./index.scss";

function KimCuongVien() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div>
      <Container>
        <Content style={{ padding: "0 0px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link to="/">Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Kim Cương Viên</Breadcrumb.Item>
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

        <div className="dau-trang">
          <h2>Kim cương viên</h2>
          <h3>Lựa chọn kim cương bạn muốn</h3>
        </div>

        <div>
          <Row>
            <Col>
            <div
                className={`shape-kc ${isClicked ? "clicked" : ""}`}
                onClick={handleClick}
              >
               
                <span style={{display: "center"}}>Tất cả</span>
              </div>
              <div
                className={`shape-kc ${isClicked ? "clicked" : ""}`}
                onClick={handleClick}
              >
                <img
                  className="img-kc"
                  src="https://trangkimluxury.vn/images/extend/2022/12/11/original/round_1670762135.png"
                  alt="Round Brilliant"
                />
                <span>Round Brilliant</span>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default KimCuongVien;
