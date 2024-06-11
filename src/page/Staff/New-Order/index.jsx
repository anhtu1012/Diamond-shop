import { Card, Col, Row, Tabs, Image } from "antd";

import { Link } from "react-router-dom";

const NewOrder = () => {
  const onChange = (key) => {
    console.log(key);
  };

  const tabs = [
    {
      label: "Chờ xác nhận",
      key: "1",
      content: renderCard("Đang xử lý", "default"),
    },
    {
      label: "Chờ thanh toán",
      key: "2",
      content: renderCard("Chờ thanh toán", "default"),
    },
    {
      label: "Chờ giao hàng",
      key: "3",
      content: renderCard("Chờ giao hàng", "default"),
    },
    { label: "Đã giao", key: "4", content: renderCard("Đã giao", "green") },
    { label: "Đã hủy", key: "5", content: renderCard("Đã hủy", "red") },
    // { label: "Lịch sử", key: "6", content: renderCard("Đánh giá", "yellow") },
  ];

  function renderCard(buttonText, buttonColor) {
    return (
      <div>
        <Card className="card">
          <Row className="card_row">
            <Col span={4}>
              <Image
                width={150}
                src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/1_cam_03-1-1.jpg?alt=media&token=76e8593f-cd39-43b6-8fb4-3de486f76ee7"
              />
            </Col>
            <Col span={11} className="infoo">
              <h2>NHẪN KIM CƯƠNG NỮ 18K</h2>
              <p>Mã:GD0000Y011997</p>
              <p>Size dây chuyền: 45</p>
            </Col>
            <Col span={5}>
              <span>x1</span>
            </Col>
            <Col span={4}>
              <h3> 11.753.000đ</h3>
            </Col>
          </Row>
          <Row className="card_row">
            <Col span={4}>
              <Image
                width={150}
                src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/1_cam_03-1-1.jpg?alt=media&token=76e8593f-cd39-43b6-8fb4-3de486f76ee7"
              />
            </Col>
            <Col span={11} className="infoo">
              <h2>NHẪN KIM CƯƠNG NỮ 18K</h2>
              <p>Mã:GD0000Y011997</p>
              <p>Size dây chuyền: 45</p>
            </Col>
            <Col span={5}>
              <span>x1</span>
            </Col>
            <Col span={4}>
              <h3> 11.753.000đ</h3>
            </Col>
          </Row>
          <Row className="card_row_bottom">
            <Col span={18} className="text-left">
              <span>2 Sản Phẩm</span>
              <div>
                <Link to="/staff-page/chi-tiet-don-hang">Xem Chi Tiết</Link>
              </div>
            </Col>
            <Col span={6} className="text-right">
              <h2>Thành tiền</h2>
              <h3> 23.506.000đ</h3>
              <button className={`status-button ${buttonColor}`}>
                {buttonText}
              </button>
            </Col>
          </Row>
        </Card>
        <Card className="card">
          <Row className="card_row">
            <Col span={4}>
              <Image
                width={150}
                src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/1_cam_03-1-1.jpg?alt=media&token=76e8593f-cd39-43b6-8fb4-3de486f76ee7"
              />
            </Col>
            <Col span={11} className="infoo">
              <h2>NHẪN KIM CƯƠNG NỮ 18K</h2>
              <p>Mã:GD0000Y011997</p>
              <p>Size dây chuyền: 45</p>
            </Col>
            <Col span={5}>
              <span>x1</span>
            </Col>
            <Col span={4}>
              <h3> 11.753.000đ</h3>
            </Col>
          </Row>
          <Row className="card_row_bottom">
            <Col span={18} className="text-left">
              <span>1 Sản Phẩm</span>
              <div>
                <Link to="/staff-page/chi-tiet-don-hang">Xem Chi Tiết</Link>
              </div>
            </Col>
            <Col span={6} className="text-right">
              <h2>Thành tiền</h2>
              <h3> 11.753.000đ</h3>
              <button className={`status-button ${buttonColor}`}>
                {buttonText}
              </button>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }

  return (
    <div className="tabs-container">
      <Tabs onChange={onChange} type="card">
        {tabs.map((tab) => (
          <Tabs.TabPane tab={tab.label} key={tab.key}>
            {tab.content}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default NewOrder;
