import { Button, Col, Row } from "antd";
import { GiBigDiamondRing, GiDiamondHard } from "react-icons/gi";
import { IoDiamondOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Container from "../../../components/container/Container";
import "./index.scss";

function Custommize() {
  const idDiamond = "null";
  return (
    <Container>
      <Row className="step_main">
        <Col span={8}>
          <Button className="step_main_button_1">
            <Row className="body_step">
              {idDiamond ? (
                <>
                  <Col span={4}>
                    <span className="title_1">✔</span>
                  </Col>
                  <Col span={16}>
                    <div>
                      <p>1 Carat Round 4ly5</p>
                    </div>
                    <div className="title_main">
                      <span>488.800.000 ₫</span>
                      <Link to="">Xóa</Link>
                      <Link to="">Thay đổi</Link>
                    </div>
                  </Col>
                  <Col span={4}>
                    <img
                      src="https://jemmia.vn/wp-content/uploads/2024/05/kim-cuong-vien.png"
                      alt="Diamond"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </Col>
                </>
              ) : (
                <>
                  <Col span={4}>
                    <span className="title_1">1</span>
                  </Col>
                  <Col span={16}>
                    <p className="title_2">Chọn Kim Cương</p>
                  </Col>
                  <Col span={4}>
                    <IoDiamondOutline size={25} />
                  </Col>
                </>
              )}
            </Row>
          </Button>
        </Col>
        <Col span={8}>
          <Button className="step_main_button_2">
            <Row className="body_step">
              {idDiamond ? (
                <>
                  <Col span={4}>
                    <span className="title_1">✔</span>
                  </Col>
                  <Col span={16}>
                    <div>
                      <p>1 Carat Round 4ly5</p>
                    </div>
                    <div className="title_main">
                      <span>488.800.000 ₫</span>
                      <Link to="">Xóa</Link>
                      <Link to="">Thay đổi</Link>
                    </div>
                  </Col>
                  <Col span={4}>
                    <img
                      src="https://jemmia.vn/wp-content/uploads/2024/05/kim-cuong-vien.png"
                      alt="Diamond"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </Col>
                </>
              ) : (
                <>
                  <Col span={4}>
                    <span className="title_1">2</span>
                  </Col>
                  <Col span={16}>
                    <p className="title_2">Chọn Trang sức</p>
                  </Col>
                  <Col span={4}>
                    <GiBigDiamondRing size={25} />
                  </Col>
                </>
              )}
            </Row>
          </Button>
        </Col>
        <Col span={8}>
          <Button className="step_main_button_3">
            <Row className="body_step">
              {idDiamond ? (
                <>
                  <Col span={4}>
                    <span className="title_1">✔</span>
                  </Col>
                  <Col span={16}>
                    <div>
                      <p>Hoàn thành</p>
                    </div>
                    <div className="title_main">
                      <span>488.800.000 ₫</span>
                    </div>
                  </Col>
                  <Col span={4}>
                    <img
                      src="https://jemmia.vn/wp-content/uploads/2024/05/kim-cuong-vien.png"
                      alt="Diamond"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </Col>
                </>
              ) : (
                <>
                  <Col span={4}>
                    <span className="title_1">3</span>
                  </Col>
                  <Col span={16}>
                    <p className="title_2">Hoàn Thành</p>
                  </Col>
                  <Col span={4}>
                    <GiDiamondHard size={25} />
                  </Col>
                </>
              )}
            </Row>
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Custommize;
