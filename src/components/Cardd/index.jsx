import { Card, Col, Row } from "antd";
import "./index.scss";

function CartProduct() {
  return (
    <Card
      hoverable
      style={{
        width: 250,
      }}
      className="cart-product"
      cover={
        <div className="image-container">
          {/*<div className="sale-badge">Giảm giá!</div>*/}
          <img
            alt="example"
            src="https://jemmia.vn/wp-content/uploads/2024/05/kim-cuong-vien.png"
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
}

export default CartProduct;
