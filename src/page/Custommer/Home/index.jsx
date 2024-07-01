import { useEffect, useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import { Col, Row, Modal, Button } from "antd";
import Carousel from "../../../components/carousel";
import Relate from "../../../components/carousel/related";
import Container from "../../../components/container/Container";
import VideoEmbed from "../../../components/video";
import "./index.scss";
import { Link } from "react-router-dom";

function HomePage() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const hasShownModal = sessionStorage.getItem("hasShownModal");
    if (!hasShownModal) {
      setIsModalVisible(true);
      sessionStorage.setItem("hasShownModal", "true");
    }
  }, []);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <Carousel className="carousel" />

      <Container>
        <Row className="home_diamond_nature">
          <Row className="section">
            <Col span={24}>
              <h2 style={{ color: "black", fontWeight: "bold" }}>
                SẢN PHẨM MỚI NHẤT
              </h2>
            </Col>
            <Col span={24}>
              <Relate
                numberOfSlides={4}
                data="products"
                showAllProducts={true}
                isNewest
                showAllCategories
              />
            </Col>
            <Col span={24} style={{ textAlign: "center", padding: "20px 0px" }}>
              <button>
                Xem Thêm <RightOutlined />
              </button>
            </Col>
          </Row>
          <Col span={24} style={{ paddingBottom: "50px" }}>
            <VideoEmbed />
          </Col>
          <Col span={24}>
            <h2 className="h2">KIM CƯƠNG THIÊN NHIÊN</h2>
          </Col>
          <Col span={24}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/banner-ngang-kim-cuong-tu-nhien.jpg?alt=media&token=d3ed4705-c28b-4dd5-8710-7f86ed24caed"
              alt=""
              style={{}}
            />
          </Col>
        </Row>

        <Row className="section">
          <Col span={24}>
            <Relate numberOfSlides={4} data="diamonds" />
          </Col>
          <Col span={24} style={{ textAlign: "center", padding: "20px 0px" }}>
            <Link to={"/kim-cuong-vien"}>
              <button>
                Xem Thêm <RightOutlined />
              </button>
            </Link>
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
              <Link to={"/nhan-kim-cuong"}>
                <button className="view-more-btn">Xem Thêm</button>
              </Link>
            </div>
          </Col>
          <Col span={12} xs={24} sm={24} md={24} lg={12} xl={12} style={{ paddingBottom: "15px" }}>
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
          <Col span={12} xs={24} sm={24} md={24} lg={12} xl={12} style={{ paddingBottom: "15px" }}>
            <Relate
              numberOfSlides={2}
              rows={2}
              autoplay
              data="products"
              category="Bông Tai Kim Cương"
            />
          </Col>
          <Col span={12}>
            <div className="image-banner">
              <img
                src="https://jemmia.vn/wp-content/uploads/2023/05/banner-bong-tai-kim-cuong-tu-nhien-jemmia.vn_-600x600.jpg"
                alt=""
              />
              <Link to={"/bong-tai-kim-cuong"}>
                <button className="view-more-btn">Xem Thêm</button>
              </Link>
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
              <Link to={"/trang-suc-cuoi"}>
                <button className="view-more-btn">Xem Thêm</button>
              </Link>
            </div>
          </Col>
          <Col
          span={12} xs={24} sm={24} md={24} lg={12} xl={12}
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
                <Link to={"/nhan-cau-hon"}>
                  <button className="custom_button">
                    Nhẫn Cầu Hôn Kim Cương
                  </button>
                </Link>
                <Link to={"/nhan-cuoi"}>
                  <button className="custom_button">Nhẫn Cưới Kim Cương</button>
                </Link>
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
            <Link to={"/nhan-kim-cuong"}>
              <div className="category">Nhẫn Kim Cương</div>
            </Link>
          </div>
        </Col>
        <Col span={6}>
          <div className="image-banner">
            <img
              src="https://jemmia.vn/wp-content/uploads/2023/05/vong-tay-kim-cuong-tu-nhien-jemmia.vn_.jpg"
              alt=""
            />
            <Link to={"/lac-vong-tay-kim-cuong"}>
              {" "}
              <div className="category">Vòng Tay Kim Cương</div>
            </Link>
          </div>
        </Col>
        <Col span={6}>
          <div className="image-banner">
            <img
              src="https://jemmia.vn/wp-content/uploads/2023/05/mat-day-chuyen-kim-cuong-tu-nhien-jemmia.vn_.jpg"
              alt=""
            />
            <Link to={"/mat-day-chuyen-kim-cuong"}>
              <div className="category">Mặt Dây Chuyền Kim Cương</div>
            </Link>
          </div>
        </Col>
        <Col span={6}>
          <div className="image-banner">
            <img
              src="https://jemmia.vn/wp-content/uploads/2023/05/bong-tai-kim-cuong-tu-nhien-jemmia.vn_.jpg"
              alt=""
            />
            <Link to={"/bong-tai-kim-cuong"}>
              <div className="category">Bông Tai Kim Cương</div>
            </Link>
          </div>
        </Col>
      </Row>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        className="custom-modal"
      >
        <div className="modal-content">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/OIG1.jpeg?alt=media&token=f035e590-c838-4a41-8c78-3e7dc70e86b7"
            alt="Promotion"
            className="modal-image"
          />
          <Button className="buy-now-btn">
            <Link to="nhan-kim-cuong">Mua Ngay</Link>
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default HomePage;
