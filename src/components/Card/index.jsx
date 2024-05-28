import { Card, Col, Row } from "antd";
import "./index.scss";
const CardIndex = () => (
  <Card
    hoverable
    className="cart-product"
    cover={
      <div className="image-container">
        <img
          alt="example"
          src="https://cdn.pnj.io/images/detailed/48/kim-cuong-4.44.4-vvs1-e-pnj-gia-10203.30044044.png"
          className="product-image"
        />
        <div className="overlay">
          <button className="overlay-button">XEM CHI TIẾT</button>
        </div>
      </div>
    }
  >
    <Row>
      <Col span={24} style={{ textAlign: "center" }}>
        <h5>6432534361</h5>
      </Col>
      <Col span={24} style={{ textAlign: "center" }}>
        <h3>KIM CƯƠNG VIÊN GIA 4LY5 - 6432534361</h3>
      </Col>
      <Col span={24} style={{ textAlign: "center" }}>
        <h4>24.834.423đ</h4>
      </Col>
    </Row>
  </Card>
);

export default CardIndex;
