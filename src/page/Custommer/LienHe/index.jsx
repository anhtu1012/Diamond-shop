import { Col, Row } from "antd";
import Container from "../../../components/container/Container";
import { Link } from "react-router-dom";
import { AiOutlineCheck } from "react-icons/ai";

function LienHe() {
  return (
    <div>
      <Container>
        <div className="lien-he">
          <div className="anh">
            <img
              src="https://jemmia.vn/wp-content/uploads/2022/10/jemmia.jpg"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <h1
            style={{
              padding: "30px 0px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Liên Hệ Với Chúng Tôi
          </h1>
          <div className="thong-tin-lien-he">
            <Row>
              <Col span={12}>
                <div className="thong-tin-lien-he-1">
                  <p style={{ fontSize: "25px" }}>
                    Công Ty Cổ Phần Diamond King
                  </p>
                  <p style={{ fontSize: "18px", marginTop: "30px" }}>
                    Địa chỉ:
                  </p>
                  <div className="dia-chi">
                    <p
                      style={{
                        marginTop: "30px",
                        marginLeft: "30px",
                        display: "inline-block",
                      }}
                    >
                      <AiOutlineCheck /> Chi nhánh Hồ Chí Minh:
                    </p>
                    <p style={{ marginLeft: "10px", display: "inline-block" }}>
                      <Link
                        to={
                          "https://www.google.com/maps/place/VNUHCM+Student+Cultural+House/@10.8751238,106.7981485,17z/data=!3m1!4b1!4m6!3m5!1s0x3174d8a6b19d6763:0x143c54525028b2e!8m2!3d10.8751238!4d106.8007234!16s%2Fg%2F11hd1pf9gj?entry=ttu"
                        }
                      >
                        Nhà Văn Hóa Sinh Viên
                      </Link>
                    </p>
                  </div>
                  <p style={{ fontSize: "18px", marginTop: "30px" }}>
                    Hotline liên hệ:
                  </p>
                  <div className="so-lien-he">
                    <div style={{ marginTop: "30px", marginLeft: "30px" }}>
                      <p style={{ display: "inline-block" }}>
                        <AiOutlineCheck /> Chi nhánh Hồ Chí Minh:
                      </p>
                      <p
                        style={{ marginLeft: "10px", display: "inline-block" }}
                      >
                        <a href="tel:0123456789" rel="nofollow">
                          012 345 6789
                        </a>{" "}
                        (phím 1)
                      </p>
                    </div>
                    <div style={{ marginTop: "10px", marginLeft: "30px" }}>
                      <p style={{ display: "inline-block" }}>
                        <AiOutlineCheck /> Góp ý:
                      </p>
                      <p
                        style={{ marginLeft: "10px", display: "inline-block" }}
                      >
                        <a href="tel:0916306945" rel="nofollow">
                          012 345 6789
                        </a>{" "}
                        (phím 2)
                      </p>
                    </div>
                  </div>
                  <div className="facebook-lien-he">
                    <p style={{ fontSize: "18px", marginTop: "30px" }}>
                      Facebook:
                    </p>
                    <p
                        style={{ marginLeft: "10px", display: "inline-block" }}
                      >
                        <a href="tel:0916306945" rel="nofollow">
                          012 345 6789
                        </a>{" "}
                        (phím 2)
                      </p>
                  </div>
                  <div className="zalo-lien-he">
                    <p style={{ fontSize: "18px", marginTop: "30px" }}>Zalo:</p>
                  </div>
                  <div className="insta-lien-he">
                    <p style={{ fontSize: "18px", marginTop: "30px" }}>
                      Instagram:
                    </p>
                  </div>
                </div>
              </Col>
              <Col span={12}>col-12</Col>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default LienHe;
