/* eslint-disable react/prop-types */
import { Card, Col, Row } from "antd";
import "./index.scss";
import { useNavigate } from "react-router-dom";

export function CartProduct({ product, diamond }) {
  const isDiamond = Boolean(diamond);
  const item = isDiamond ? diamond : product;
  const imageUrl = isDiamond ? item.image : item.productImages[0]?.imageUrl;
  const id = isDiamond ? item.diamondID : item.productID;
  const title = isDiamond ? item.diamondName : item.productName;
  const totalPrice = isDiamond ? item.totalPrice : item.totalPrice;
  const navigate = useNavigate();
  const handleClick = async () => {
    if (isDiamond) {
      navigate(`/diamond-details/${id}`);
    } else {
      navigate(`/product-details/${id}`);
    }
  };
  return (
    <Card
      onClick={handleClick}
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
            src={imageUrl}
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
          <h5>{id}</h5>
        </Col>
        <Col span={24} style={{ textAlign: "center" }}>
          <h3 style={{ color: "#15393f" }}>{title}</h3>
        </Col>
        <Col span={24} style={{ textAlign: "center" }}>
          <h4>
            {totalPrice.toLocaleString("en-US", {
              maximumFractionDigits: 0,
            })}{" "}
            đ
          </h4>
        </Col>
      </Row>
    </Card>
  );
}
