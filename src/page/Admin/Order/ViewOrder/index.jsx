import { Col, Image, Row, Steps, Tag, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { useParams } from "react-router-dom";
import "./index.scss";

const data = [
  {
    key: "1",
    idorder: "OD123456",
    idcus: "US123456",
    image: "https://jemmia.vn/wp-content/uploads/2024/05/1_cam_03-copy.jpg",
    name: "NHẪN KIM CƯƠNG NỮ 18K 01141N",
    email: "hai263672@gmail.com",
    nameUs: "Nguyen Thanh Hai",
    date: "29-5-2024",
    quantity: "2",
    phone: "0916306945",
    status: "Chờ xác nhận",
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
    date: "28-5-2024",
    quantity: "2",
    phone: "0123456789",
    status: "Chờ thanh toán",
    price: "488.800.000 ₫",
    totalprice: "488.800.000 ₫",
    address: "24/9b võ văn hát, long trường, thủ đức",
  },
  {
    key: "3",
    idorder: "OD123458",
    idcus: "US123458",
    image: "https://jemmia.vn/wp-content/uploads/2024/05/1_cam_03-copy.jpg",
    name: "NHẪN KIM CƯƠNG NỮ 18K 01141N",
    email: "hhung263672@gmail.com",
    nameUs: "Nguyen Thanh Hai",
    date: "30-5-2024",
    quantity: "2",
    phone: "0123456789",
    status: "Chờ xác nhận",
    price: "488.800.000 ₫",
    totalprice: "488.800.000 ₫",
    address: "24/9b võ văn hát, long trường, thủ đức",
  },
  {
    key: "4",
    idorder: "OD123459",
    idcus: "US123459",
    image: "https://jemmia.vn/wp-content/uploads/2024/05/1_cam_03-copy.jpg",
    name: "NHẪN KIM CƯƠNG NỮ 18K 01141N",
    email: "hai263673@gmail.com",
    nameUs: "Nguyen Thanh Hai",
    date: "6-5-2024",
    phone: "0123456789",
    quantity: "2",
    status: "Đã giao",
    price: "488.800.000 ₫",
    totalprice: "488.800.000 ₫",
    address: "24/9b võ văn hát, long trường, thủ đức",
  },
  {
    key: "5",
    idorder: "OD123460",
    idcus: "US123460",
    image: "https://jemmia.vn/wp-content/uploads/2024/05/1_cam_03-copy.jpg",
    name: "NHẪN KIM CƯƠNG NỮ 18K 01141N",
    email: "hai263674@gmail.com",
    nameUs: "Nguyen Thanh Hai",
    date: "5-5-2024",
    phone: "0123456789",
    quantity: "2",
    status: "Đã hủy",
    price: "488.800.000 ₫",
    totalprice: "488.800.000 ₫",
    address: "24/9b võ văn hát, long trường, thủ đức",
  },
  {
    key: "6",
    idorder: "OD123461",
    idcus: "US123461",
    image: "https://jemmia.vn/wp-content/uploads/2024/05/1_cam_03-copy.jpg",
    name: "NHẪN KIM CƯƠNG NỮ 18K 01141N",
    email: "hai263675@gmail.com",
    nameUs: "Nguyen Thanh Hai",
    date: "4-5-2024",
    phone: "0123456789",
    quantity: "2",
    status: "Đã giao",
    price: "488.800.000 ₫",
    totalprice: "488.800.000 ₫",
    address: "24/9b võ văn hát, long trường, thủ đức",
  },
  {
    key: "7",
    idorder: "OD123462",
    idcus: "US123462",
    image: "https://jemmia.vn/wp-content/uploads/2024/05/1_cam_03-copy.jpg",
    name: "NHẪN KIM CƯƠNG NỮ 18K 01141N",
    email: "hai263676@gmail.com",
    nameUs: "Nguyen Thanh Hai",
    date: "3-5-2024",
    quantity: "2",
    phone: "0123456789",
    status: "Đã hủy",
    price: "488.800.000 ₫",
    totalprice: "488.800.000 ₫",
    address: "24/9b võ văn hát, long trường, thủ đức",
  },
  {
    key: "8",
    idorder: "OD123463",
    idcus: "US123463",
    image: "https://jemmia.vn/wp-content/uploads/2024/05/1_cam_03-copy.jpg",
    name: "NHẪN KIM CƯƠNG NỮ 18K 01141N",
    email: "hai263677@gmail.com",
    nameUs: "Nguyen Thanh Hai",
    date: "2-5-2024",
    quantity: "2",
    status: "Đã giao",
    phone: "0123456789",
    price: "488.800.000 ₫",
    totalprice: "488.800.000 ₫",
    address: "24/9b võ văn hát, long trường, thủ đức",
  },
  {
    key: "9",
    idorder: "OD123463",
    idcus: "US123463",
    image: "https://jemmia.vn/wp-content/uploads/2024/05/1_cam_03-copy.jpg",
    name: "NHẪN KIM CƯƠNG NỮ 18K 01141N",
    email: "hai263677@gmail.com",
    date: "3-4-2024",
    nameUs: "Nguyen Thanh Hai",
    quantity: "4",
    phone: "0123456789",
    status: "Chờ giao hàng",
    price: "488.800.000 ₫",
    totalprice: "488.800.000 ₫",
    address: "24/9b võ văn hát, long trường, thủ đức",
  },
  {
    key: "10",
    idorder: "OD123463",
    idcus: "US123463",
    image: "https://jemmia.vn/wp-content/uploads/2024/05/1_cam_03-copy.jpg",
    nameUs: "Nguyen Thanh Hai",
    name: "NHẪN KIM CƯƠNG NỮ 18K 01141N",
    email: "263677@gmail.com",
    phone: "0123456789",
    date: "3-3-2024",
    quantity: "3",
    status: "Chờ thanh toán",
    price: "488.800.000 ₫",
    totalprice: "488.800.000 ₫",
    address: "24/9b võ văn hát, long trường, thủ đức",
  },
  {
    key: "11",
    idorder: "OD123463",
    idcus: "US123463",
    image: "https://jemmia.vn/wp-content/uploads/2024/05/1_cam_03-copy.jpg",
    name: "NHẪN KIM CƯƠNG NỮ 18K 01141N",
    email: "hai263677@gmail.com",
    nameUs: "Nguyen Thanh Hai",
    date: "3-2-2024",
    phone: "0123456789",
    quantity: "1",
    status: "Chờ xác nhận",
    price: "488.800.000 ₫",
    totalprice: "488.800.000 ₫",
    address: "24/9b võ văn hát, long trường, thủ đức",
  },
];

const statusToStep = {
  "Chờ xác nhận": 0,
  "Chờ thanh toán": 0,
  "Chờ giao hàng": 1,
  "Đang giao": 1,
  "Đã giao": 2,
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
              background: "#EEEEEE",
              borderRadius: borderRadiusLG,
            }}
          >
            <p style={{ fontWeight: "500", fontSize: "16px" }}>
              Thông tin chi tiết đơn hàng
            </p>
            <p style={{ fontWeight: "400", padding: "10px 10px" }}>
              Đặt ngày {order.date}
            </p>
            <div className="order-product">
              <Image
                src={order.image}
                alt="Order"
                style={{
                  width: "120px",
                  padding: "10px 10px",
                  display: "flex",
                  justifyContent: "center",
                }}
              />
              <div className="detail-order-product">
                <p style={{ fontSize: "16px", fontWeight: "500" }}>
                  {order.name}
                </p>
                <p style={{ marginTop: "10px" }}>
                  Mã đơn hàng: {order.idorder}
                </p>
                <Tag
                  key={order.status}
                  style={{
                    marginTop: "20px",
                    background: "#33CC33",
                    color: "white",
                    padding: "4px 10px",
                    fontWeight: "500",
                  }}
                >
                  {order.status.toUpperCase()}
                </Tag>
              </div>
            </div>
          </div>
        </Content>
      </div>
      <div className="order-detail-2">
        <Content
          style={{
            margin: "0 10px",
          }}
        >
          <div
            style={{
              padding: 16,
              minHeight: 240,
              background: "#EEEEEE",
              borderRadius: borderRadiusLG,
            }}
          >
            <Row style={{ padding: "10px 10px" }}>
              <Col span={6}>
                <Steps
                  direction="vertical"
                  style={{ gap: "20px" }}
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
              <Col span={10}>
                <div className="information">
                  <p style={{ fontWeight: "500", fontSize: "16px" }}>
                    Thông tin chi khách hàng
                  </p>
                  <Content
                    style={{
                      margin: "5px 15px",
                    }}
                  >
                    <div
                      style={{
                        padding: 20,
                        minHeight: 120,
                        background: "#DDDDDD",
                        borderRadius: borderRadiusLG,
                      }}
                    >
                      <p style={{ marginBottom: "8px", fontSize: "16px" }}>
                        Họ và Tên: {order.nameUs}
                      </p>
                      <p style={{ marginBottom: "8px", fontSize: "16px" }}>
                        Mã khách hàng: {order.idcus}
                      </p>
                      <p style={{ marginBottom: "8px", fontSize: "16px" }}>
                        Email: {order.email}
                      </p>
                      <p style={{ marginBottom: "8px", fontSize: "16px" }}>
                        Số điện thoại: {order.phone}
                      </p>
                      <p style={{ marginBottom: "8px", fontSize: "16px" }}>
                        Địa chỉ: {order.address}
                      </p>
                    </div>
                  </Content>
                </div>
              </Col>
              <Col span={8}>
                <div className="price-all" style={{ marginLeft: "40px" }}>
                  <p style={{ fontWeight: "500", fontSize: "16px" }}>
                    Số tiền thanh toán
                  </p>
                  <div
                    className="total-price"
                    style={{ marginTop: "20px", marginLeft: "30px" }}
                  >
                    <p style={{ marginBottom: "16px", fontSize: "16px" }}>
                      Giá sản phẩm: {order.price}
                    </p>
                    <p style={{ marginBottom: "16px", fontSize: "16px" }}>
                      Giao hàng: Free
                    </p>
                    <p
                      style={{
                        marginTop: "50px",
                        fontSize: "20px",
                        color: "red",
                      }}
                    >
                      Tổng giá: {order.totalprice}
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Content>
      </div>
    </div>
  );
}

export default ViewOrderDetails;
