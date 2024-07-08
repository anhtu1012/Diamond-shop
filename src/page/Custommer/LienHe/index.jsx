import { Col, Row } from "antd";
import Container from "../../../components/container/Container";
import { Link } from "react-router-dom";
import { LuDot } from "react-icons/lu";
import "./index.scss";
import { useEffect } from "react";
const cities = [
  "Hà Nội",
  "TP Hồ Chí Minh",
  "Đà Nẵng",
  "Hải Phòng",
  "An Giang",
  "Bà Rịa - Vũng Tàu",
  "Bắc Giang",
];
const requests = [
  "Tư vấn sản phẩm",
  "Hỗ trợ bảo hành, chính sách thu mua thu đổi",
  "Đối tác truyền thông",
  "Đối tác đầu tư",
];
const products = [
  "Nhẫn kim cương nữ",
  "Nhẫn kim cương nam",
  "Bông tai kim cương",
  "Lắc/vòng tay kim cương",
  "Mặt dây chuyền kim cương",
  "Bộ trang sức kim cương",
  "Kim cương viên GIA",
  "Nhẫn cầu hôn kim cương",
  "Nhẫn cưới kim cương",
  "Bộ trang sức cưới kim cương",
];
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
              src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/banner-ngang-kim-cuong-tu-nhien.jpg?alt=media&token=d3ed4705-c28b-4dd5-8710-7f86ed24caed"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <p
            style={{
              padding: "30px 0px",
              display: "flex",
              fontWeight: "bold",
              fontSize: "20px",
              justifyContent: "center",
              textTransform: "uppercase",
            }}
          >
            Liên Hệ Với Chúng Tôi
          </p>
          <div className="thong-tin-lien-he" style={{ marginLeft: "100px" }}>
            <Row>
              <Col span={12} xs={24} sm={24} md={24} lg={12}>
                <div className="thong-tin-lien-he-1">
                  <p style={{ fontSize: "18px", textTransform: "uppercase" }}>
                    Công Ty Cổ Phần Diamond King
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      marginTop: "30px",
                      fontWeight: "bold",
                    }}
                  >
                    Địa chỉ:
                  </p>
                  <div className="dia-chi">
                    <p
                      style={{
                        fontSize: "16px",
                        marginTop: "30px",

                        display: "inline-block",
                      }}
                    >
                      <LuDot /> Chi nhánh Hồ Chí Minh:
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
                  <p
                    style={{
                      fontSize: "16px",
                      marginTop: "30px",
                      fontWeight: "bold",
                    }}
                  >
                    Hotline liên hệ:
                  </p>
                  <div className="so-lien-he">
                    <div style={{ marginTop: "30px" }}>
                      <p style={{ display: "inline-block", fontSize: "16px" }}>
                        <LuDot /> Chi nhánh Hồ Chí Minh:
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
                    <div style={{ marginTop: "16px" }}>
                      <p style={{ display: "inline-block", fontSize: "16px" }}>
                        <LuDot /> Góp ý:
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
                    <div style={{ marginTop: "16px" }}>
                      <p style={{ display: "inline-block", fontSize: "16px" }}>
                        <LuDot /> CSKH:
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
                    <p
                      style={{
                        fontSize: "16px",
                        marginTop: "30px",
                        fontWeight: "bold",
                      }}
                    >
                      Facebook:
                      <span
                        style={{ marginLeft: "10px", fontWeight: "normal" }}
                      >
                        <a href="https://www.facebook.com" rel="nofollow">
                          https://www.facebook.com/DIAMOND.KING
                        </a>
                      </span>
                    </p>
                  </div>
                  <div className="insta-lien-he">
                    <p
                      style={{
                        fontSize: "16px",
                        marginTop: "30px",
                        fontWeight: "bold",
                      }}
                    >
                      Instagram:
                      <span
                        style={{ marginLeft: "10px", fontWeight: "normal" }}
                      >
                        <a
                          href="https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fterms%2Faccept%2F%3F__coig_login%3D1"
                          rel="nofollow"
                        >
                          https://www.instagram.com/king_diamond
                        </a>
                      </span>
                    </p>
                  </div>
                  <div className="tiktok-lien-he">
                    <p
                      style={{
                        fontSize: "16px",
                        marginTop: "30px",
                        fontWeight: "bold",
                      }}
                    >
                      Tiktok:
                      <span
                        style={{ marginLeft: "10px", fontWeight: "normal" }}
                      >
                        <a
                          href="https://www.tiktok.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fterms%2Faccept%2F%3F__coig_login%3D1"
                          rel="nofollow"
                        >
                          https://www.tiktok.com/king_diamond
                        </a>
                      </span>
                    </p>
                  </div>
                  <div className="gmaol-lien-he">
                    <p
                      style={{
                        fontSize: "16px",
                        marginTop: "30px",
                        fontWeight: "bold",
                      }}
                    >
                      Gmail:
                      <span
                        style={{ marginLeft: "10px", fontWeight: "normal" }}
                      >
                        <a
                          href="https://www.gmail.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fterms%2Faccept%2F%3F__coig_login%3D1"
                          rel="nofollow"
                        >
                          diamondking@gmail.com
                        </a>
                      </span>
                    </p>
                  </div>
                  <div className="zalo-lien-he">
                    <p
                      style={{
                        fontSize: "16px",
                        marginTop: "30px",
                        fontWeight: "bold",
                        marginBottom: '20px'
                      }}
                    >
                      Zalo:
                      <span
                        style={{ marginLeft: "10px", fontWeight: "normal" }}
                      >
                        <a
                          href="https://id.zalo.me/account?continue=https%3A%2F%2Fchat.zalo.me%2F"
                          rel="nofollow"
                        >
                          https://www.zalo.com/king_diamond
                        </a>
                      </span>
                    </p>
                  </div>
                </div>
              </Col>
              <Col span={12} xs={24} sm={24} md={24} lg={12}>
                <div className="thong-tin-lien-he-2">
                  <p
                    style={{
                      fontSize: "18px",
                      marginBottom: "30px",
                      textTransform: "uppercase",
                    }}
                  >
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
              <Col span={24} xs={24} sm={24} md={24} lg={12}>
                <p
                  style={{
                    fontSize: "20px",
                    marginTop: "30px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  Hãy Liên Hệ Với Chúng Tôi
                </p>
                <h4
                  style={{
                    marginTop: "10px",
                    fontWeight: "normal",
                    marginBottom: "30px",
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  Diamond King– chuyên gia trong lĩnh vực Kim cương
                </h4>
                <div className="lien-he-ngay" style={{ marginBottom: "40px" }}>
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
                          <select
                            name="form_fields[product]"
                            id="form-field-product"
                            className="text-field"
                            required="required"
                            aria-required="true"
                          >
                            <option value="">
                              Sản phẩm quý khách quan tâm
                            </option>
                            {products.map((product, index) => (
                              <option key={index} value={product}>
                                {product}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="form-field">
                          <select
                            name="form_fields[request]"
                            id="form-field-request"
                            className="text-field"
                            required="required"
                            aria-required="true"
                          >
                            <option value="">Chọn yêu cầu</option>
                            {requests.map((request, index) => (
                              <option key={index} value={request}>
                                {request}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="form-field">
                          <select
                            name="form_fields[city]"
                            id="form-field-city"
                            className="text-field"
                            required="required"
                            aria-required="true"
                          >
                            <option value="">Chọn tỉnh thành phố</option>
                            {cities.map((city, index) => (
                              <option key={index} value={city}>
                                {city}
                              </option>
                            ))}
                          </select>
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
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default LienHe;
