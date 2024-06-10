/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import "./index.scss";
import { Col, Image, Rate, Row, Select, Space } from "antd";
import { GiBigDiamondRing } from "react-icons/gi";
import { IoDiamondOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Option } from "antd/es/mentions";

function Complete({ diamond, product, setCurrentStep }) {
  const [sizeOptions, setSizeOptions] = useState([]);
  const [totalPriceCustom, setTotalPriceCusTom] = useState(0);
  useEffect(() => {
    const sizeOptions = product.sizes.map((size) => (
      <Option key={size.sizeID} value={size.sizeValue}>
        {size.sizeValue} (SL: {size.quantity})
      </Option>
    ));
    setTotalPriceCusTom(
      Number(product.totalPrice) + Number(diamond.totalPrice)
    );
    setSizeOptions(sizeOptions);
  }, []);
  const hanldeChange = () => {
    setCurrentStep(1);
  };
  const hanldeChangeDiamond = () => {
    setCurrentStep(2);
  };

  return (
    <div className="product-details" style={{ paddingTop: "30px" }}>
      <Row justify="center" gutter={[16, 16]}>
        <Col span={12} xs={24} sm={24} md={24} lg={12}>
          <div className="image_complete">
            <Image.PreviewGroup
              preview={{
                onChange: (current, prev) =>
                  console.log(`current index: ${current}, prev index: ${prev}`),
              }}
            >
              <Image
                isZoomed
                width={400}
                src={product.productImages[0].imageUrl}
              />
            </Image.PreviewGroup>
            <div className="diamond_complete">
              <Image.PreviewGroup
                preview={{
                  onChange: (current, prev) =>
                    console.log(
                      `current index: ${current}, prev index: ${prev}`
                    ),
                }}
              >
                <Image isZoomed width={100} src={diamond.image} />
              </Image.PreviewGroup>
            </div>
          </div>
        </Col>
        <Col span={12} xs={24} sm={24} md={24} lg={12}>
          <div className="description-product">
            <h1 style={{ color: "#15393f" }}>
              {product.productName} / {diamond.diamondName}
            </h1>

            <Row>
              <Col
                span={24}
                style={{
                  fontWeight: "bold",
                  padding: "10px 0px",
                  fontSize: "20px",
                }}
              >
                <span>Sản Phẩm Hoàn Chỉnh:</span>
              </Col>
              <Col span={24} style={{ paddingLeft: "10px" }}>
                {" "}
                <div className="product_complete">
                  <GiBigDiamondRing size={25} className="icon_complete" />{" "}
                  {product.productName}
                  {" / "}
                  {product.shapeDiamond} {product.dimensionsDiamond} ly
                  {" / "}
                  {product.productID}
                </div>
                <Rate
                  disabled
                  defaultValue={product.rating}
                  style={{ fontSize: "13px", paddingLeft: "25px" }}
                />
                <br />
                <div className="price_complete">
                  <span>
                    {product.totalPrice.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}{" "}
                    đ
                  </span>
                  <p onClick={hanldeChange}>Thay đổi</p>
                </div>
              </Col>
              <Col
                span={24}
                style={{ paddingLeft: "10px", paddingTop: "10px" }}
              >
                {" "}
                <div className="product_complete">
                  <IoDiamondOutline size={25} className="icon_complete" />{" "}
                  {diamond.diamondName}
                  {" / "}
                  {diamond.shape} {diamond.dimensions} ly
                  {" / "}
                  {diamond.diamondID}
                  <br />
                  {diamond.carat}
                  {" / "}
                  {diamond.clarify}
                  {" / "}
                  {diamond.colorLevel}
                  {" / "}
                  {diamond.cut}
                </div>
                <h5
                  style={{
                    padding: "5px 0px 0px 25px ",
                    fontWeight: "400",
                  }}
                >
                  Kiểm Định :
                  <Link
                    to="https://www.gia.edu/"
                    style={{
                      color: "#dec55e",
                      fontWeight: "bold",
                    }}
                  >
                    Gia
                  </Link>
                </h5>
                <div className="price_complete">
                  <span>
                    {diamond.totalPrice.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}{" "}
                    đ
                  </span>
                  <p onClick={hanldeChangeDiamond}>Thay đổi</p>
                </div>
              </Col>
            </Row>
            <div className="size">
              <Space>
                <h4>Chọn Kích Thước:</h4>
                <Select
                  placeholder="Size"
                  style={{
                    width: 100,
                    height: "30px",
                    marginTop: "10px",
                  }}
                >
                  {sizeOptions}
                </Select>
                <h4 style={{ fontWeight: "bold" }}>
                  <Link
                    href="/huong-dan-do-ni"
                    style={{ color: "#dec55e", marginTop: "10px" }}
                  >
                    Hướng dẫn chọn size (Đo ni)
                  </Link>
                </h4>
              </Space>
            </div>
            <div className="delivery-icon">
              <h4>Vận chuyển:</h4>
              <div className="icon-delivery">
                <TbTruckDelivery />
              </div>
              <div className="giao-hang">
                <h4>Miễn phí vận chuyển</h4>
              </div>
            </div>

            <h2
              style={{
                display: "flex",
                fontWeight: "bold",
                color: "#15393f",
              }}
            >
              Tổng Tiền:{" "}
              {totalPriceCustom.toLocaleString("en-US", {
                maximumFractionDigits: 0,
              })}{" "}
              đ
            </h2>

            <div className="custom">
              <button
                style={{
                  maxWidth: "500px !important",
                  width: "100%",
                  textAlign: "center",
                  fontSize: "25px",
                  borderRadius: "8px",
                }}
              >
                Thêm Vào Giỏ Hàng
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Complete;
