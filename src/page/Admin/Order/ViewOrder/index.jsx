import { Col, Rate, Row, Steps, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { Link, useParams } from "react-router-dom";
import "./index.scss";
import { TiArrowBack } from "react-icons/ti";

const data = [
  {
    key: "1",
    idorder: "OD123456",
    idcus: "US123456",
    image: "https://jemmia.vn/wp-content/uploads/2024/05/1_cam_03-copy.jpg",
    name: "NHẪN KIM CƯƠNG NỮ 18K - 01141N",
    rate: 5,
    email: "hai263672@gmail.com",
    nameUs: "Nguyen Thanh Hai",
    imgDM: "https://igg.vn/images/upload/34201813229polished-diamond.png",
    nameDM: "KIM CƯƠNG VIÊN GIA 6LY8 – 7486091466 ",
    codeDM: "7486091466",
    date: "29-5-2024",
    quantity: "2",
    phone: "0916306945",
    idproduct: "01141N",
    priceN: "16.329.600 ₫",
    priceDM: "",
    totalprice: "315.319.600 ₫",
    address: "24/9b võ văn hát, long trường, thủ đức",
  },
  {
    key: "2",
    idorder: "OD123456",
    idcus: "US123456",
    image: "https://igg.vn/images/upload/34201813229polished-diamond.png",
    name: "KIM CƯƠNG VIÊN GIA 6LY8 – 7486091466",
    rate: null,
    email: "hai263672@gmail.com",
    nameUs: "",
    imgDM: "",
    nameDM: " ",
    codeDM: "",
    date: "",
    quantity: "",
    phone: "",
    idproduct: "7486091466",
    priceN: "",
    priceDM: "298.990.000 ₫",
    totalprice: "",
    address: "",
  },
];

const renderProductItem = (
  index,
  name,
  rate,
  idproduct,
  imgDM,

  nameDM,
  codeDM,
  priceN,
  priceDM,
  image
) => (
  <div className="cart_product_frame" key={index}>
    <Row className="cart_product_item">
      <div className="cart_detail">
        <Col span={6} className="img_cart">
          <img src={image} width={180} style={{ marginLeft: "50px" }} />
          {imgDM && (
            <img
              src={imgDM}
              style={{ display: imgDM === null ? "none" : "block" }}
              className="cart_product_imgdm"
              alt={nameDM}
            />
          )}
        </Col>

        <Col span={18} className="infor">
          <div className="infor_detail" style={{ gap: "10px" }}>
            <p>{name}</p>
            <div className="rate">
              <Rate
                disabled
                defaultValue={rate}
                style={{ display: rate === null ? "none" : "block" }}
              />
            </div>
            <span>{idproduct}</span>
            <p>{nameDM}</p>
            <span>{codeDM}</span>
          </div>

          <Col span={24} className="price">
            <span style={{ display: priceN === null ? "none" : "block" }}>
              {priceN}
            </span>
          </Col>
          <Col span={24} className="price">
            <span style={{ display: priceDM === null ? "none" : "block" }}>
              {priceDM}
            </span>
          </Col>
        </Col>
      </div>
    </Row>
  </div>
);

function ViewOrderDetails() {
  const { idorder } = useParams();
  const order = data.find((d) => d.idorder === idorder);
  if (!order) {
    return <div>Order not found</div>;
  }

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <div>
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
                    width: "14%",
                    marginBottom: "10px",
                  }}
                >
                  Đặt ngày {order.date}
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    background: "#e4bd7b",
                    border: "2px solid black",
                    padding: "4px",

                    fontWeight: "bold",
                    width: "8%",
                  }}
                >
                  {order.idorder}
                </p>
                <div className="cart_product_list">
                  {data.map((order, index) =>
                    renderProductItem(
                      index,
                      order.name,
                      order.rate,
                      order.idproduct,
                      order.imgDM,
                      order.nameDM,
                      order.codeDM,
                      order.priceN,
                      order.priceDM,
                      order.image
                    )
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
                background: "#EEEEEE",
                borderRadius: borderRadiusLG,
              }}
            >
              <Col span={24}>
                <Steps
                  direction="vertical"
                  style={{ gap: "8px" }}
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
                  style={{
                    padding: 20,
                    minHeight: 190,
                    background: "#DDDDDD",
                    borderRadius: borderRadiusLG,
                  }}
                >
                  <div>
                    <p
                      style={{
                        marginBottom: "10px",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      Họ và Tên:{" "}
                      <span style={{ fontWeight: "400" }}>{order.nameUs}</span>
                    </p>
                    <p
                      style={{
                        marginBottom: "10px",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      Mã khách hàng:{" "}
                      <span style={{ fontWeight: "400" }}>{order.idcus}</span>
                    </p>
                    <p
                      style={{
                        marginBottom: "10px",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      Email:{" "}
                      <span style={{ fontWeight: "400" }}>{order.email}</span>
                    </p>
                    <p
                      style={{
                        marginBottom: "10px",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      Số điện thoại:{" "}
                      <span style={{ fontWeight: "400" }}>{order.phone}</span>
                    </p>
                    <p
                      style={{
                        marginBottom: "10px",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      Địa chỉ:{" "}
                      <span style={{ fontWeight: "400" }}>{order.address}</span>
                    </p>
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
                    background: "#EEEEEE",
                    borderRadius: borderRadiusLG,
                  }}
                >
                  <div
                    className="total-price"
                    style={{ marginTop: "20px", textAlign: "left" }}
                  >
                    <p
                      style={{
                        marginBottom: "16px",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      Giá nhẫn:
                      <span style={{ fontWeight: "normal" }}>
                        {order.priceN}
                      </span>
                    </p>
                    <p
                      style={{
                        marginBottom: "16px",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      Giá kim cương:{" "}
                      <span style={{ fontWeight: "normal" }}>
                        {data[1].priceDM}
                      </span>
                    </p>
                    <p
                      style={{
                        marginBottom: "16px",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      Giao hàng:{" "}
                      <span style={{ fontWeight: "normal" }}>Miễn phí</span>
                    </p>
                    <p
                      style={{
                        marginTop: "40px",
                        fontSize: "20px",
                        color: "red",
                        fontWeight: "bold",
                      }}
                    >
                      Tổng giá:{" "}
                      <span style={{ fontWeight: "normal" }}>
                        {order.totalprice}
                      </span>
                    </p>
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

export default ViewOrderDetails;
