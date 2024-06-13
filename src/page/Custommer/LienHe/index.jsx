import { Col, Row } from "antd";
import Container from "../../../components/container/Container";
import { Link } from "react-router-dom";
import { AiOutlineCheck } from "react-icons/ai";
import "./index.scss";
import { useEffect } from "react";
function LienHe() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Container>
        <div className="lien-he">
          <div className="anh">
            <img
              src="https://a-static.besthdwallpaper.com/diamond-jewels-wallpaper-2048x576-11133_71.jpg"
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
          <div className="thong-tin-lien-he" style={{ marginLeft: "100px" }}>
            <Row>
              <Col span={2}></Col>
              <Col span={10}>
                <div className="thong-tin-lien-he-1">
                  <p style={{ fontSize: "25px" }}>
                    Công Ty Cổ Phần Diamond King
                  </p>
                  <p style={{ fontSize: "16px", marginTop: "30px" }}>
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
                  <p style={{ fontSize: "16px", marginTop: "30px" }}>
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
                    <div style={{ marginTop: "16px", marginLeft: "30px" }}>
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
                    <p style={{ fontSize: "16px", marginTop: "30px" }}>
                      Facebook:
                      <span style={{ marginLeft: "10px" }}>
                        <a href="https://www.facebook.com" rel="nofollow">
                          Trang chủ Facebook của Diamond King{" "}
                        </a>
                      </span>
                    </p>
                  </div>
                  <div className="zalo-lien-he">
                    <p style={{ fontSize: "16px", marginTop: "30px" }}>
                      Zalo:
                      <span style={{ marginLeft: "10px" }}>
                        <a
                          href="https://id.zalo.me/account?continue=https%3A%2F%2Fchat.zalo.me%2F"
                          rel="nofollow"
                        >
                          Zalo Tư Vấn Của Diamond King{" "}
                        </a>
                      </span>
                    </p>
                  </div>
                  <div className="insta-lien-he">
                    <p style={{ fontSize: "16px", marginTop: "30px" }}>
                      Instagram:
                      <span style={{ marginLeft: "10px" }}>
                        <a
                          href="https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fterms%2Faccept%2F%3F__coig_login%3D1"
                          rel="nofollow"
                        >
                          Trang chủ Instagram của Diamond King{" "}
                        </a>
                      </span>
                    </p>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="thong-tin-lien-he-2">
                  <p style={{ fontSize: "25px", marginBottom: "30px" }}>
                    Chi Nhánh Hồ Chí Minh
                  </p>
                  <div className="google-map">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.1640560267656!2d106.8007234!3d10.875123799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a6b19d6763%3A0x143c54525028b2e!2sVNUHCM%20Student%20Cultural%20House!5e0!3m2!1sen!2s!4v1717609028517!5m2!1sen!2s"
                      width={400}
                      height={300}
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={6}></Col>
              <Col span={12}>
                <p
                  style={{
                    fontSize: "25px",
                    marginTop: "30px",
                    fontWeight: "400",
                    marginBottom: "30px",
                    marginLeft: "20px",
                  }}
                >
                  Hãy Liên Hệ Ngay Để Được Tư Vấn
                </p>
                <div className="liên-he-ngay" style={{ marginBottom: "40px" }}>
                  <div className="contact-form-wrapper">
                    <form
                      className="contact-form"
                      method="post"
                      id="contact-form"
                      name="contact-form"
                    >
                      <div className="form-fields-wrapper">
                        <div className="form-field">
                          <input
                            size="1"
                            type="text"
                            name="form_fields[name]"
                            id="form-field-name"
                            className="text-field"
                            placeholder="Họ và tên (*)"
                            required="required"
                            aria-required="true"
                            pattern="[a-zA-ZÀ-ÿ\s]{1,}"
                          />
                        </div>
                        <div className="form-field">
                          <input
                            size="1"
                            type="text"
                            name="form_fields[lastname]"
                            id="form-field-lastname"
                            className="text-field"
                            placeholder="Số điện thoại (*)"
                            required="required"
                            aria-required="true"
                          />
                        </div>
                        <div className="form-field">
                          <input
                            size="1"
                            type="email"
                            name="form_fields[email]"
                            id="form-field-email"
                            className="text-field"
                            placeholder="Email (*)"
                            required="required"
                            aria-required="true"
                          />
                        </div>
                        <div className="form-field">
                          <textarea
                            name="form_fields[message]"
                            id="form-field-message"
                            className="text-area"
                            placeholder="Tin nhắn"
                          ></textarea>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="elementor-button elementor-size-sm"
                            id="Button_From_Lien_He"
                          >
                            <span>
                              <span className="elementor-button-text">
                                LIÊN HỆ NGAY
                              </span>
                            </span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </Col>
              <Col span={6}></Col>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default LienHe;
