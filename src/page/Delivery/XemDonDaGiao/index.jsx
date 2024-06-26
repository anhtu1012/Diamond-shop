import { Button, Col, Rate, Row, Steps } from "antd";
import { Content } from "antd/es/layout/layout";
import { Link, useParams } from "react-router-dom";
import "./index.scss";
import { TiArrowBack } from "react-icons/ti";
import { IoDiamondOutline } from "react-icons/io5";
import { GiBigDiamondRing } from "react-icons/gi";
import { VscError } from "react-icons/vsc";
import { useEffect, useState } from "react";
import LoadingTruck from "../../../components/loading";
import { getOrderDetail } from "../../../../services/Uservices";

const statusToStepIndex = {
  "Chờ thanh toán": 0,
  "Chờ giao hàng": 1,
  "Đã giao": 2,
  "Đã hủy": 3,
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
          alt="Product"
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
          order.productCustomize?.totalPrice || order.diamond.totalPrice
        ).toLocaleString("de-DE", {
          maximumFractionDigits: 2,
        })}{" "}
        đ
      </span>
    </Col>
  </Row>
);

function XemDonDaGiao() {
  const { orderID } = useParams();

  const [data, setData] = useState();

  useEffect(() => {
    const fetchGetOrderDetail = async () => {
      try {
        const res = await getOrderDetail(orderID);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching order detail:", error);
      }
    };

    fetchGetOrderDetail();
  }, [orderID]);

  const currentStepIndex = statusToStepIndex[data?.status];
  const formattedDate = new Date(data?.orderDate).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
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
                  borderRadius: "8px",
                }}
              >
                <div className="infor-detail-order" style={{ display: "flex" }}>
                  <h2
                    style={{
                      fontWeight: "bold",
                      textAlign: "left",
                      marginBottom: "5px",
                      flex: "1",
                    }}
                  >
                    Thông tin chi tiết sản phẩm
                  </h2>

                  <h2
                    style={{
                      fontWeight: "500",
                      textAlign: "right",
                      flex: "1",
                    }}
                  >
                    <Link
                      to={"/don-hang"}
                      style={{ color: "black", fontWeight: 600 }}
                    >
                      <TiArrowBack style={{ verticalAlign: "middle" }} /> Quay
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
                    display: "inline-block",
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
                    display: "inline-block",
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
          <Col span={14}>
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
                  borderRadius: "8px",
                  boxShadow: "0px 0px 4px",
                }}
              >
                <div
                  className={`step-giao-hang ${
                    data.status === "Đã hủy" ? "step-cancelled" : ""
                  }`}
                >
                  <Steps
                    direction="vertical"
                    current={currentStepIndex}
                    style={{ gap: "2px" }}
                    items={[
                      {
                        title: "Chờ thanh toán",
                      },
                      {
                        title: "Chờ giao hàng",
                      },
                      {
                        title: "Đã giao",
                      },
                      {
                        title: "Đã hủy",
                        icon: data.status === "Đã hủy" && (
                          <VscError
                            size={35}
                            style={{
                              color: "white",
                              background: "red",
                              borderRadius: "50%",
                            }}
                          />
                        ),
                      },
                    ]}
                  />
                </div>
              </div>
              </Content>
          </Col>

          <Col span={10}>
            <div className="information">
              <p
                style={{
                  fontWeight: "500",
                  fontSize: "16px",
                  marginLeft: "10px",
                }}
              >
                Thông tin khách hàng
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
                    borderRadius: "8px",
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
                  <div className="row">
                    <p>Ghi Chú:</p>
                    <span>{data.note}</span>
                  </div>
                  <div className="row">
                    <p>Lí do:</p>
                    <span>{data.reason}</span>
                  </div>
                </div>
              </Content>
            </div>
          </Col>
        </Row>
      </div>

      <div className="order-detail-3">
        <Row style={{ padding: "10px 10px" }}>
          <Col span={24}>
            <Content
              style={{
                margin: "30px 10px",
              }}
            >
              <div
                style={{
                  padding: 16,
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0px 0px 4px",
                }}
              >
                <div className="thong-tin-tong-don">
                  <div className="row">
                    <p>Tổng giá trị đơn hàng:</p>
                    <span style={{ fontWeight: "bold", color: "red" }}>
                      {data.price.toLocaleString("vi-VN", {
                        maximumFractionDigits: 0,
                      })}{" "}
                      vnđ
                    </span>
                  </div>
                  <div className="row">
                    <p>Phương thức thanh toán:</p>
                    <span>{data.paymentMethod}</span>
                  </div>
                  <div className="row">
                    <p>Trạng thái thanh toán:</p>
                    <span>{data.paymentStatus}</span>
                  </div>
                  <div className="row">
                    <p>Trạng thái đơn hàng:</p>
                    <span>{data.status}</span>
                  </div>
                </div>
              </div>
            </Content>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default XemDonDaGiao;

           
