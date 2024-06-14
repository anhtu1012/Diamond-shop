/* eslint-disable react/prop-types */
import { Card, Col, Row, Skeleton } from "antd";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function CartProduct({ product, diamond }) {
  const isDiamond = Boolean(diamond);
  const item = isDiamond ? diamond : product;
  const imageUrl = isDiamond ? item.image : item.productImages[0]?.imageUrl;
  const id = isDiamond ? item.diamondID : item.productID;
  const title = isDiamond ? item.diamondName : item.productName;
  const totalPrice = isDiamond ? item.totalPrice : item.totalPrice;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (product || diamond) {
      setLoading(false);
    }
  }, [product, diamond]);

  const handleClick = async () => {
    if (isDiamond) {
      navigate(`/diamond-details/${id}`);
    } else {
      navigate(`/product-details/${id}`);
    }
  };

  if (loading) {
    return <Skeleton active />;
  }

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
          <img alt="example" src={imageUrl} className="product-image" />
          <div className="overlay">
            <button className="overlay-button">XEM CHI TIẾT</button>
          </div>
        </div>
      }
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
            {totalPrice.toLocaleString("vi-VN", {
              maximumFractionDigits: 0,
            })}{" "}
            đ
          </h4>
        </Col>
      </Row>
    </Card>
  );
}
