import Container from "../../../components/container/Container";
import Carousel from "../../../components/carousel";
import "./index.scss";
import { Col, Row } from "antd";
import Relate from "../../../components/carousel/related";
import { RightOutlined } from "@ant-design/icons";

function HomePage() {
  return (
    <div>
      <Carousel />
      <Container>
        <Row className="home_diamond_nature">
          <Col span={24}>
            <h2>KIM CƯƠNG THIÊN NHIÊN</h2>
          </Col>
          <Col span={24}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/banner-ngang-kim-cuong-tu-nhien.jpg?alt=media&token=b7a37af7-b017-4014-9b2f-7dff1c93a736"
              alt=""
              width={1253}
            />
          </Col>
        </Row>

        <Row className="section">
          <Col span={24}>
            <Relate />
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

export default HomePage;
