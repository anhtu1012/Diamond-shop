/* eslint-disable react/prop-types */
import { Card, Col, Row } from "antd";
import "./index.scss";

export function CartProduct({ product }) {
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
            // eslint-disable-next-line react/prop-types
            src={product.image}
            className="product-image"
          />
          <div className="overlay">
            <button className="overlay-button">XEM CHI TIẾT</button>
          </div>
        </div>
      }
      // eslint-disable-next-line react/prop-types
      // key={product.product_id} // Adding key prop
    >
      <Row>
        <Col span={24} style={{ textAlign: "center" }}>
          <h5>{product.product_id}</h5>
        </Col>
        <Col span={24} style={{ textAlign: "center" }}>
          <h3>{product.product_name}</h3>
        </Col>
        <Col span={24} style={{ textAlign: "center" }}>
          <h4>{product.total_price}</h4>
        </Col>
      </Row>
    </Card>
  );
}
