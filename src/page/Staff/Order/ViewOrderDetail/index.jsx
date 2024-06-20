import { Button, Col, Rate, Row, Steps, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { Link, useParams } from "react-router-dom";
import "./index.scss";
import { TiArrowBack } from "react-icons/ti";
import { IoDiamondOutline } from "react-icons/io5";
import { GiBigDiamondRing } from "react-icons/gi";

const data = [
  {
    odID: "OD123456",
    dateOD: "19-06-2003",
    status: "Đã giao",
    user: {
      userID: "US123456",
      firstName: "Nguyen Thanh",
      lastName: "Hai",
      gender: "Nam",
      email: "hai263672@gmail.com",
      birthDay: "13-01-2003",
      phone: "0916306945",
      address: "24/9B, Vo van Hat, Ho Chi Minh",
    },
    custom: {
      product: {
        productID: "01117BT",
        productName: "BÔNG TAI KIM CƯƠNG 18K",
        shapeDiamond: "Round",
        dimensionsDiamond: 5,
        productType: "Bông Tai",
        totalPrice: 53053440,
        rating: 4.5,
        status: true,
        productImages:
          "https://jemmia.vn/wp-content/uploads/2024/04/1-copy-5.jpg",
        feedbacks: [],
      },
      diamond: {
        diamondID: "1453851108",
        diamondName: "KIM CƯƠNG VIÊN GIA 3LY6 – 6471017231",
        carat: 0.61,
        certificate: "GIA",
        clarify: "VS2",
        color: "Trắng",
        colorLevel: "F",
        cut: "Excellent",
        shape: "Round",
        dimensions: 5.4,
        flourescence: "FAINT",
        image:
          "https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/kim-cuong-vien.png?alt=media&token=4fdf38b3-e37c-4e59-9906-3bae83608fe2",
        status: true,
        totalPrice: 748000000,
        feedbacks: [],
      },
      sizes: 45,
    },
  },
  {
    odID: "OD123456",
    dateOD: "19-06-2003",
    status: "Đã giao",
    user: {
      userID: "US123456",
      firstName: "Nguyen Thanh",
      lastName: "Hai",
      gender: "Nam",
      email: "hai263672@gmail.com",
      birthDay: "13-01-2003",
      phone: "0916306945",
      address: "24/9B, Vo van Hat, Ho Chi Minh",
    },
    custom: null,
    diamond: {
      diamondID: "1453851107",
      diamondName: "KIM CƯƠNG VIÊN GIA 3LY6 – 6471017231",
      carat: 0.61,
      certificate: "GIA",
      clarify: "VS2",
      color: "Trắng",
      colorLevel: "F",
      cut: "Excellent",
      shape: "Round",
      dimensions: 5.4,
      flourescence: "FAINT",
      image:
        "https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/kim-cuong-vien.png?alt=media&token=4fdf38b3-e37c-4e59-9906-3bae83608fe2",
      status: true,
      totalPrice: 748000000,
      feedbacks: [],
    },
  },
];

const statusToStepIndex = {
  "Chờ giao hàng": 0,
  "Đang giao": 1,
  "Đã giao": 2,
};

const renderProductItem = (order, index) => (
  <Row className="staff_order_frame" key={index}>
    <Col span={7} className="staff_order_left">
      {order.custom && order.custom.product && (
        <img
          className="img_main"
          src={order.custom.product.productImages}
          width={130}
          style={{ marginLeft: "80px" }}
        />
      )}

      {order.custom && order.custom.product && (
        <div style={{ textAlign: "center" }}>
          <Button className="button_custom">Size: {order.custom.sizes}</Button>
        </div>
      )}
      {(order.custom?.diamond || order.diamond) && (
        <img
          src={order.custom?.diamond?.image || order.diamond?.image}
          className={`staff_order_kimg ${
            order.custom?.product
              ? "staff_order_kimg_kid"
              : "staff_order_kimg_main"
          }`}
          alt={order.custom?.diamond?.diamondName || order.diamond?.diamondName}
          style={{ marginLeft: "90px" }}
        />
      )}
    </Col>

    <Col span={17} className="staff_order_right">
      {order.custom && order.custom.product && (
        <div className="info_product">
          <div>
            <GiBigDiamondRing size={25} className="icon_order" />
          </div>
          <div className="info_sub">
            <span>
              {order.custom.product.productName}
              {" - "}
              {order.custom.product.shapeDiamond}{" "}
              {order.custom.product.dimensionsDiamond} ly
            </span>
            <p style={{ fontWeight: 400, fontSize: "13px" }}>
              {" "}
              {order.custom.product.productID}
            </p>
            <Rate
              disabled
              defaultValue={order.custom.product.rating}
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
            {order.custom?.diamond?.diamondName || order.diamond.diamondName}
          </p>
          <div style={{ fontWeight: 400, fontSize: "13px" }}>
            <span>
              Carat: {order.custom?.diamond?.carat || order.diamond.carat}
            </span>
            {" - "}
            <span>
              Tinh Khiết :
              {order.custom?.diamond?.clarify || order.diamond.clarify}
            </span>
            {" - "}
            <span>
              Cấp Màu :
              {order.custom?.diamond?.colorLevel || order.diamond.colorLevel}
            </span>
            {" - "}
            Cắt: <span>{order.custom?.diamond?.cut || order.diamond.cut}</span>
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
          order.custom?.product?.totalPrice ||
          order.custom?.diamond?.totalPrice ||
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
  const { odID } = useParams();
  const order = data.find((d) => d.odID === odID);
  const currentStepIndex = statusToStepIndex[order.status];

  const totalPrice =
    order.custom.product.totalPrice + order.custom.diamond.totalPrice;

  if (!order) {
    return <div>Order not found</div>;
  }

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

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
                      to={"/admin-page/don-hang/all"}
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
                  Đặt ngày {order.dateOD}
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
                  {order.odID}
                </p>
                <div>
                  {data.map((order, index) => renderProductItem(order, index))}
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
                    <span>
                      {order.user.firstName} {order.user.lastName}
                    </span>
                  </div>
                  <div className="row">
                    <p>Email:</p>
                    <span>{order.user.email}</span>
                  </div>
                  <div className="row">
                    <p>Giới tính:</p>
                    <span>{order.user.gender}</span>
                  </div>
                  <div className="row">
                    <p>Sinh nhật:</p>
                    <span>{order.user.birthDay}</span>
                  </div>
                  <div className="row">
                    <p>Địa chỉ:</p>
                    <span>{order.user.address}</span>
                  </div>
                  <div className="row">
                    <p>Số điện thoại:</p>
                    <span>{order.user.phone}</span>
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
                        {order.custom.product.totalPrice.toLocaleString(
                          "vi-VN",
                          {
                            maximumFractionDigits: 0,
                          }
                        )}{" "}
                        vnđ
                      </span>
                    </div>
                    <div className="row">
                      <p>Giá kim cương:</p>
                      <span>
                        {order.custom.diamond.totalPrice.toLocaleString(
                          "vi-VN",
                          {
                            maximumFractionDigits: 0,
                          }
                        )}{" "}
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
                        {totalPrice.toLocaleString("vi-VN", {
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
