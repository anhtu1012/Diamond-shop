import { Col, Row, Steps, Tag, theme } from "antd";
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
    name: "NHẪN KIM CƯƠNG NỮ 18K 01141N",
    email: "hai263672@gmail.com",
    nameUs: "Nguyen Thanh Hai",
    imgDM: "https://igg.vn/images/upload/34201813229polished-diamond.png",
    nameDM: "KIm cuong ne",
    codeDM: "0000000",
    date: "29-5-2024",
    quantity: "2",
    phone: "0916306945",
    status: "Chờ xác nhận",
    idproduct: "MS12345",
    price: "488.800.000 ₫",
    totalprice: "488.800.000 ₫",
    address: "24/9b võ văn hát, long trường, thủ đức",
  },
  {
    key: "2",
    idorder: "OD123457",
    idcus: "US123457",
    image: "https://jemmia.vn/wp-content/uploads/2024/05/1_cam_03-copy.jpg",
    name: "NHẪN KIM CƯƠNG NỮ 18K 01141N",
    email: "huy263672@gmail.com",
    nameUs: "Nguyen Thanh Hai",
    imgDM: "",
    nameDM: "",
    codeDM: "",
    date: "28-5-2024",
    quantity: "2",
    phone: "0123456789",
    status: "Chờ thanh toán",
    price: "488.800.000 ₫",
    idproduct: "MS12345",
    totalprice: "488.800.000 ₫",
    address: "24/9b võ văn hát, long trường, thủ đức",
  },
  {
    key: "3",
    idorder: "OD123458",
    idcus: "US123458",
    idproduct: "MS12345",
    image: "https://jemmia.vn/wp-content/uploads/2024/05/1_cam_03-copy.jpg",
    name: "NHẪN KIM CƯƠNG NỮ 18K 01141N",
    email: "hhung263672@gmail.com",
    nameUs: "Nguyen Thanh Hai",
    date: "30-5-2024",
    quantity: "2",
    phone: "0123456789",
    status: "Chờ giao hàng",
    price: "488.800.000 ₫",
    totalprice: "488.800.000 ₫",
    address: "24/9b võ văn hát, long trường, thủ đức",
  },
];

const renderProductItem = (
  index,
  name,
  idproduct,
  imgDM,
  nameDM,
  codeDM,
  price,
  image,
  status,
  currentStep
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
          <div className="infor_detail">
            <p>{name}</p>
            <span>{idproduct}</span>
            <p>{nameDM}</p>
            <span>{codeDM}</span>
          </div>
          <Tag
            className="status"
            key={status}
            style={{
              marginTop: "20px",
              background: getStatusColor(currentStep),
              color: "white",
              padding: "4px 10px",
              fontWeight: "500",
              fontSize: "16px",
            }}
          >
            {status.toUpperCase()}
          </Tag>
          <Col span={24} className="price">
            <span>{price}</span>
          </Col>
        </Col>
      </div>
    </Row>
  </div>
);

const statusToStep = {
  "Chờ xác nhận": 0,
  "Chờ thanh toán": 0,
  "Chờ giao hàng": 1,
  "Đang giao": 1,
  "Đã giao": 2,
};

const getStatusColor = (currentStep) => {
  switch (currentStep) {
    case 0:
      return "#FFD700"; // Yellow
    case 1:
      return "#33CC33"; // Green
    case 2:
      return "#008000"; // Dark Green
    case 3:
      return "#FF0000"; // Red
    default:
      return "#FFD700"; // Default Yellow
  }
};

function ViewOrderDetails() {
  const { idorder } = useParams();
  const order = data.find((d) => d.idorder === idorder);
  if (!order) {
    return <div>Order not found</div>;
  }

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const currentStep = statusToStep[order.status];

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
                  <h2 style={{ fontWeight: "bold", textAlign: "left" }}>
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
                    padding: "10px 10px",
                    fontSize: "16px",
                  }}
                >
                  Đặt ngày {order.date}
                </p>
                <p
                  style={{
                    fontWeight: "400",
                    padding: "0px 10px",
                    fontSize: "16px",
                  }}
                >
                  {order.idorder}
                </p>
                <div className="cart_product_list">
                  {renderProductItem(
                    0,
                    order.name,
                    order.idproduct,
                    order.imgDM,
                    order.nameDM,
                    order.codeDM,
                    order.price,
                    order.image,
                    order.status,
                    currentStep
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
                  current={currentStep}
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
                      Họ và Tên: <span style={{fontWeight: '300'}}>{order.nameUs}</span>
                    </p>
                    <p
                      style={{
                        marginBottom: "10px",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      Mã khách hàng: <span style={{fontWeight: '300'}}>{order.idcus}</span>
                    </p>
                    <p
                      style={{
                        marginBottom: "10px",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      Email: <span style={{fontWeight: '300'}}>{order.email}</span>
                    </p>
                    <p
                      style={{
                        marginBottom: "10px",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      Số điện thoại: <span style={{fontWeight: '300'}}>{order.phone}</span>
                    </p>
                    <p
                      style={{
                        marginBottom: "10px",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      Địa chỉ: <span style={{fontWeight: '300'}}>{order.address}</span>
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
                    style={{ marginTop: "20px", textAlign: "end" }}
                  >
                    <p style={{ marginBottom: "16px", fontSize: "16px" }}>
                      Giá sản phẩm: {order.price}
                    </p>
                    <p style={{ marginBottom: "16px", fontSize: "16px" }}>
                      Giao hàng: Free
                    </p>
                    <p
                      style={{
                        marginTop: "40px",
                        fontSize: "20px",
                        color: "red",
                      }}
                    >
                      Tổng giá: {order.totalprice}
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
