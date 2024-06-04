import { RightOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import Carousel from "../../../components/carousel";
import Relate from "../../../components/carousel/related";
import Container from "../../../components/container/Container";
import "./index.scss";

function HomePage() {
  return (
    <div style={{ overflow: "hidden" }}>
      <Carousel />
      <Container>
        <Row className="home_diamond_nature">
          <Col span={24}>
            <h2 className="h2">KIM CƯƠNG THIÊN NHIÊN</h2>
          </Col>
          <Col span={24}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/banner-ngang-kim-cuong-tu-nhien.jpg?alt=media&token=b7a37af7-b017-4014-9b2f-7dff1c93a736"
              alt=""
            />
          </Col>
        </Row>

        <Row className="section">
          <Col span={24}>
            <Relate numberOfSlides={4} data="diamonds" />
          </Col>
          <Col span={24} style={{ textAlign: "center", padding: "20px 0px" }}>
            <button>
              Xem Thêm <RightOutlined />
            </button>
          </Col>
        </Row>
        <Row
          gutter={30}
          className="section"
          style={{ background: "#A6B9BB", borderRadius: "2px" }}
        >
          <Col span={24}>
            <h2 className="h2">TRANG SỨC NHẪN KIM CƯƠNG</h2>
          </Col>
          <Col span={12}>
            <div className="image-banner">
              <img
                src="https://jemmia.vn/wp-content/uploads/2023/05/banner-nhan-kim-cuong-tu-nhien-jemmia.vn_-600x600.jpg"
                alt=""
              />
              <button className="view-more-btn">Xem Thêm</button>
            </div>
          </Col>
          <Col span={12} style={{ paddingBottom: "15px" }}>
            <Relate
              numberOfSlides={2}
              rows={2}
              autoplay
              category="Nhẫn Kim Cương Nữ"
            />
          </Col>
        </Row>
        <Row
          gutter={30}
          className="section"
          style={{
            background: "#A6B9BB",
            borderRadius: "2px",
            paddingTop: "30px",
          }}
        >
          <Col span={24}>
            <h2 className="h2">TRANG SỨC BÔNG TAI KIM CƯƠNG</h2>
          </Col>
          <Col span={12} style={{ paddingBottom: "15px" }}>
            <Relate
              numberOfSlides={2}
              rows={2}
              autoplay
              category="Bông Tai Kim Cương"
            />
          </Col>
          <Col span={12}>
            <div className="image-banner">
              <img
                src="https://jemmia.vn/wp-content/uploads/2023/05/banner-bong-tai-kim-cuong-tu-nhien-jemmia.vn_-600x600.jpg"
                alt=""
              />
              <button className="view-more-btn">Xem Thêm</button>
            </div>
          </Col>
        </Row>
        <Row
          gutter={30}
          className="section"
          style={{
            borderRadius: "2px",
            paddingTop: "30px",
          }}
        >
          <Col span={24}>
            <h2 style={{ color: "black" }} className="h2">
              TRANG SỨC CƯỚI
            </h2>
          </Col>

          <Col span={12}>
            <div className="image-banner">
              <img
                src="https://jemmia.vn/wp-content/uploads/2022/11/cs.jpg"
                alt=""
              />
              <button className="view-more-btn">Xem Thêm</button>
            </div>
          </Col>
          <Col
            span={12}
            style={{ paddingBottom: "15px", background: "#fff3f3" }}
          >
            <div className="widget-container">
              <div className="love-wedding">
                <p className="title">LOVE &amp; WEDDING</p>
                <p className="description">
                  Lưu giữ kỉ niệm tuyệt vời với những thiết kế trang sức thời
                  thượng vượt thời gian. Gắn kết tình yêu bền chặt với viên kim
                  cương đầu tiên – tín vật ghi dấu cho chặng đường hôn nhân hạnh
                  phúc.
                </p>
              </div>
              <div className="custom">
                <button className="custom_button">
                  Nhẫn Cầu Hôn Kim Cương
                </button>
                <button className="custom_button">Nhẫn Cưới Kim Cương</button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Row
        gutter={30}
        className="section"
        style={{
          borderRadius: "2px",
          padding: "0px 30px 30px 30px",
        }}
      >
        <Col span={6}>
          <div className="image-banner">
            <img
              src="https://jemmia.vn/wp-content/uploads/2023/05/nhan-kim-cuong-tu-nhien-jemmia.vn_.jpg"
              alt=""
            />
            <div className="category">Nhẫn Kim Cương</div>
          </div>
        </Col>
        <Col span={6}>
          <div className="image-banner">
            <img
              src="https://jemmia.vn/wp-content/uploads/2023/05/vong-tay-kim-cuong-tu-nhien-jemmia.vn_.jpg"
              alt=""
            />
            <div className="category">Vòng Tay Kim Cương</div>
          </div>
        </Col>
        <Col span={6}>
          <div className="image-banner">
            <img
              src="https://jemmia.vn/wp-content/uploads/2023/05/mat-day-chuyen-kim-cuong-tu-nhien-jemmia.vn_.jpg"
              alt=""
            />
            <div className="category">Mặt Dây Chuyền Kim Cương</div>
          </div>
        </Col>
        <Col span={6}>
          <div className="image-banner">
            <img
              src="https://jemmia.vn/wp-content/uploads/2023/05/bong-tai-kim-cuong-tu-nhien-jemmia.vn_.jpg"
              alt=""
            />
            <div className="category">Bông Tai Kim Cương</div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default HomePage;
