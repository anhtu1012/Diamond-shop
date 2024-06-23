import { Button, Col, Rate, Row, Steps, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { Link, useParams } from "react-router-dom";
import "./index.scss";
import { TiArrowBack } from "react-icons/ti";
import { IoDiamondOutline } from "react-icons/io5";
import { GiBigDiamondRing } from "react-icons/gi";
import { getOrderDetail } from "../../../../../services/Uservices";
import { useEffect, useState } from "react";
import LoadingTruck from "../../../../components/loading";

const statusToStepIndex = {
  pendding: 0,
  "Đang giao": 1,
  "Đã giao": 2,
};

const renderProductItem = (order, index) => (
  <Row className="staff_order_frame" key={index}>
    <Col span={7} className="staff_order_left">
      {order.productCustomize && order.productCustomize.product && (
        <img
          className="img_main"
          src={order.productCustomize.product.productImages[0].imageUrl}
          width={130}
          style={{ marginLeft: "80px" }}
        />
      )}

      {order.productCustomize && order.productCustomize.product && (
        <div style={{ textAlign: "center" }}>
          <Button className="button_custom">
            Size: {order.productCustomize.size}
          </Button>
        </div>
      )}
      {(order.productCustomize?.diamond || order.diamond) && (
        <img
          src={order.productCustomize?.diamond?.image || order.diamond?.image}
          className={`staff_order_kimg ${
            order.productCustomize?.product
              ? "staff_order_kimg_kid"
              : "staff_order_kimg_main"
          }`}
          alt={
            order.productCustomize?.diamond?.diamondName ||
            order.diamond?.diamondName
          }
          style={{ marginLeft: "90px" }}
        />
      )}
    </Col>

    <Col span={17} className="staff_order_right">
      {order.productCustomize && order.productCustomize.product && (
        <div className="info_product">
          <div>
            <GiBigDiamondRing size={25} className="icon_order" />
          </div>
          <div className="info_sub">
            <span>
              {order.productCustomize.product.productName}
              {" - "}
              {order.productCustomize.product.shapeDiamond}{" "}
              {order.productCustomize.product.dimensionsDiamond} ly
            </span>
            <p style={{ fontWeight: 400, fontSize: "13px" }}>
              {" "}
              {order.productCustomize.product.productID}
            </p>
            <Rate
              disabled
              defaultValue={order.productCustomize.product.rating}
              style={{
                fontSize: "13px",
              }}
            />
          </div>
        </div>
      )}
      <div className="info_diamond">
        <div>
          <IoDiamondOutline size={25} className="icon_order" />
        </div>
        <div className="info_sub">
          <p>
            {order.productCustomize?.diamond?.diamondName ||
              order.diamond.diamondName}
          </p>
          <div style={{ fontWeight: 400, fontSize: "13px" }}>
            <span>
              Carat:{" "}
              {order.productCustomize?.diamond?.carat || order.diamond.carat}
            </span>
            {" - "}
            <span>
              Tinh Khiết :
              {order.productCustomize?.diamond?.clarify ||
                order.diamond.clarify}
            </span>
            {" - "}
            <span>
              Cấp Màu :
              {order.productCustomize?.diamond?.colorLevel ||
                order.diamond.colorLevel}
            </span>
            {" - "}
            Cắt:{" "}
            <span>
              {order.productCustomize?.diamond?.cut || order.diamond.cut}
            </span>
          </div>
          {order.diamond && (
            <div
              style={{ fontWeight: 400, fontSize: "13px", paddingTop: "3px" }}
            >
              Kiểm định:{" "}
              <span style={{ color: "red" }}>
                {" "}
                {order.diamond.certificate}{" "}
              </span>
            </div>
          )}
        </div>
      </div>
    </Col>
    <Col span={24} className="price">
      <span style={{ textAlign: "right" }}>
        {(
          order.productCustomize?.product?.totalPrice ||
          order.productCustomize?.diamond?.totalPrice ||
          order.diamond.totalPrice
        ).toLocaleString("de-DE", {
          maximumFractionDigits: 2,
        })}{" "}
        đ
      </span>
    </Col>
  </Row>
);

function ViewOrderDetailsStaff() {
  const { orderID } = useParams();
  console.log(orderID);
  const [data, setData] = useState();
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  useEffect(() => {
    const fetchGetOrderDetail = async () => {
      const res = await getOrderDetail(orderID);
      setData(res.data);
    };

    fetchGetOrderDetail();
  }, [orderID]);

  const currentStepIndex = statusToStepIndex[data?.status];

  const formattedDate = new Date(data?.orderDate).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
  });

  if (!data) {
    return <LoadingTruck />;
  }
  return (
    <div className="tong-order-detail">
      <div className="order-detail-1">
        <Row>
          <Col span={24}>
            <Content
              style={{
                margin: "0 10px",
              }}
            >
              <div
                style={{
                  padding: 16,
                  minHeight: 160,
                  marginBottom: "10px",
                  background: "#fff",
                  borderRadius: borderRadiusLG,
                }}
              >
                <div className="infor-detail-order" style={{ display: "flex" }}>
                  <h2
                    style={{
                      fontWeight: "bold",
                      textAlign: "left",
                      marginBottom: "5px",
                    }}
                  >
                    Thông tin chi tiết sản phẩm
                  </h2>

                  <h2
                    style={{
                      fontWeight: "500",
                      marginLeft: "auto",
                      textAlign: "right",
                    }}
                  >
                    <Link
                      to={"/staff-page/don-hang"}
                      style={{ color: "black", fontWeight: 600 }}
                    >
                      <TiArrowBack style={{ justifyContent: "center" }} /> Quay
                      lại
                    </Link>
                  </h2>
                </div>
                <p
                  style={{
                    fontWeight: "400",
                    background: "#15393f",
                    color: "white",
                    border: "2px solid black",
                    gap: "5px",
                    fontSize: "16px",
                    padding: "4px",
                    width: "18%",
                    marginBottom: "10px",
                  }}
                >
                  Đặt ngày: {formattedDate}
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    background: "#e4bd7b",
                    border: "2px solid black",
                    padding: "4px",

                    fontWeight: "bold",
                    width: "10%",
                  }}
                >
                  {data.orderID}
                </p>
                <div>
                  {data.orderDetails.map((order, index) =>
                    renderProductItem(order, index)
                  )}
                </div>
              </div>
            </Content>
          </Col>
        </Row>
      </div>

      <div className="order-detail-2">
        <Row style={{ padding: "10px 10px" }}>
          <Content
            style={{
              margin: "30px 10px",
            }}
          >
            <div
              style={{
                padding: 16,
                minHeight: 170,
                background: "#fff",
                borderRadius: borderRadiusLG,
                boxShadow: "0px 0px 4px",
              }}
            >
              <Col span={24}>
                <div className="step-giao-hang">
                  <Steps
                    direction="vertical"
                    current={currentStepIndex}
                    style={{ gap: "18px" }}
                    items={[
                      {
                        title: "Chờ giao hàng",
                      },
                      {
                        title: "Đang giao",
                      },
                      {
                        title: "Đã giao",
                      },
                    ]}
                  />
                </div>
              </Col>
            </div>
          </Content>
          <Col span={10}>
            <div className="information">
              <p
                style={{
                  fontWeight: "500",
                  fontSize: "16px",
                  marginLeft: "10px",
                }}
              >
                Thông tin chi khách hàng
              </p>
              <Content
                style={{
                  margin: "10px 10px",
                  marginLeft: "20px",
                }}
              >
                <div
                  className="thong-tin-nguoi-mua"
                  style={{
                    padding: 20,
                    minHeight: 190,
                    background: "#fff",
                    borderRadius: borderRadiusLG,
                    boxShadow: "0px 0px 4px",
                  }}
                >
                  <div className="row">
                    <p>Họ và Tên:</p>
                    <span>{data.fullName}</span>
                  </div>

                  <div className="row">
                    <p>Email:</p>
                    <span>{data.email}</span>
                  </div>
                  <div className="row">
                    <p>Giới tính:</p>
                    <span>{data.gender}</span>
                  </div>
                  <div className="row">
                    <p>Địa chỉ:</p>
                    <span>{data.addressShipping}</span>
                  </div>
                  <div className="row">
                    <p>Số điện thoại:</p>
                    <span>{data.phoneShipping}</span>
                  </div>
                </div>
              </Content>
            </div>
          </Col>

          <Col span={8}>
            <div className="price-all" style={{ marginLeft: "10px" }}>
              <p style={{ fontWeight: "500", fontSize: "16px" }}>
                Số tiền thanh toán
              </p>
              <Content
                style={{
                  margin: "10px 10px",
                }}
              >
                <div
                  style={{
                    padding: 16,
                    minHeight: 190,
                    background: "#fff",
                    borderRadius: borderRadiusLG,
                    boxShadow: "0px 0px 4px",
                  }}
                >
                  <div
                    className="total-price"
                    style={{ marginTop: "5px", textAlign: "left" }}
                  >
                    <div className="row">
                      <p>Giá nhẫn:</p>
                      <span>
                        {data.price.toLocaleString("vi-VN", {
                          maximumFractionDigits: 0,
                        })}{" "}
                        vnđ
                      </span>
                    </div>

                    <div className="row">
                      <p>Giao hàng:</p>
                      <span>Miễn phí</span>
                    </div>
                    <div className="row" style={{ marginTop: "65px" }}>
                      <p style={{ fontSize: "20px" }}>Tổng giá:</p>
                      <span
                        style={{
                          fontSize: "20px",
                          color: "red",
                          fontWeight: "500",
                        }}
                      >
                        {data.price.toLocaleString("vi-VN", {
                          maximumFractionDigits: 0,
                        })}{" "}
                        vnđ
                      </span>
                    </div>
                  </div>
                </div>
              </Content>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ViewOrderDetailsStaff;
