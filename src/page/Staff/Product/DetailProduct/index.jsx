import { Button, Col, Rate, Row } from "antd";
import "./index.scss";
import { GiJewelCrown } from "react-icons/gi";
import { Link } from "react-router-dom";

function DetailProduct() {
  return (
    <div>
      <Row gutter={10}>
        <Col span={10}>
          <div className="khung1">
            <div className="code-user">ID: US123456</div>
            <div className="thong-tin-nguoi-mua" style={{ padding: "10px " }}>
              <span>Thông tin người mua</span>
            </div>

            <div className="thong-tin-chi-tiet">
              <div className="thong-tin-item">
                <p className="label">Tên:</p>
                <p className="value">Phạm Trung 123 Main Street, City</p>
              </div>
              <div className="thong-tin-item">
                <p className="label">Số Điện Thoại:</p>
                <p className="value">0123456789</p>
              </div>
              <div className="thong-tin-item">
                <p className="label">Email:</p>
                <p className="value">trungnguyen@example.com</p>
              </div>
              <div className="thong-tin-item">
                <p className="label">Địa Chỉ:</p>
                <p className="value">
                  123 Main Street, City,123 Main Street, City,123 Main Street,
                  City
                </p>
              </div>
              <div className="thong-tin-item">
                <p className="label">Ngày Sinh:</p>
                <p className="value">01/01/2003</p>
              </div>
            </div>
            <div style={{ marginTop: "10px", marginLeft: "auto" }}>
              <Button
                type="primary"
                danger
                style={{ marginRight: "10px", fontWeight: "bold" }}
              >
                Xóa
              </Button>

              <Button type="primary" className="custom-black-button">
                <Link
                  to="/staff-page/don-hang-moi"
                  style={{ fontWeight: "bold" }}
                >
                  Tạo đơn hàng
                </Link>
              </Button>
            </div>
          </div>
        </Col>
        <Col span={14}>
          <div className="khung">
            <div className="code-box">OD: OD123456</div>
            <div className="thong-tin-don-mua" style={{ padding: "10px " }}>
              <span>Thông tin đơn hàng</span>
            </div>
            <hr className="custom-hr" />
            <div className="product_infor">
              <div className="product">
                <Row className="product">
                  <Col span={9} clasName="img">
                    <img
                      src="https://glosbejewelry.net/upload/image/Nhan-kim-cuong%20(10).jpg"
                      width={170}
                    />
                  </Col>

                  <Col span={15} className="product_detail">
                    <div className="product1">
                      <GiJewelCrown style={{ fontSize: "20px" }} />
                      <div>
                        <p>NHẪN KIM CƯƠNG NỮ 18K</p>
                        <div>
                          <Rate disabled defaultValue={5} />
                        </div>
                        <span>GD0000Y011997</span>
                      </div>
                    </div>
                    <div className="product1">
                      <img
                        src="https://igg.vn/images/upload/34201813229polished-diamond.png"
                        width={30}
                      />
                      <div>
                        <p>KIM CƯƠNG VIÊN GIA 5LY4</p>
                        <div>
                          <Rate disabled defaultValue={5} />
                        </div>
                        <span>1453851108</span>
                      </div>
                    </div>
                    <Col span={24} className="size_productdp">
                      Size: 45
                    </Col>
                    <Col span={24} className="price_productdp">
                      <div>
                        <p>11.753.000đ</p>
                      </div>
                    </Col>
                  </Col>
                </Row>
                <hr className="custom-hr" />
              </div>
              <div className="product">
                <Row className="product">
                  <Col span={9} clasName="img">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/1_cam_03-1-1.jpg?alt=media&token=76e8593f-cd39-43b6-8fb4-3de486f76ee7"
                      width={170}
                    />
                  </Col>
                  <Col span={15} className="product_detail">
                    <div className="product1">
                      <GiJewelCrown style={{ fontSize: "20px" }} />
                      <div>
                        <p>NHẪN KIM CƯƠNG NỮ 18K</p>
                        <div>
                          <Rate disabled defaultValue={5} />
                        </div>
                        <span>GD0000Y011997</span>
                      </div>
                    </div>
                    <div className="product1">
                      <div>
                        <p></p>
                        <span></span>
                      </div>
                    </div>
                    <Col span={24} className="size_productdp">
                      Size: 45
                    </Col>
                    <Col span={24} className="price_productdp">
                      <div>
                        <p>11.753.000đ</p>
                      </div>
                    </Col>
                  </Col>
                </Row>
                <hr className="custom-hr" />
              </div>
            </div>
            <div className="repayp">
              <div className="total_pricep">
                <p>Tạm tính</p>
                <span style={{color:"#15393f"}}>23.506.000đ</span>
              </div>
              <div className="total_pricep">
                <p>Chí phí vận chuyển</p>
                <span style={{color:"#15393f"}}>Miễn Phí</span>
              </div>
            </div>

            <div className="repay2p">
              <div className="totalp">
                <p>Thành tiền </p>
                <span style={{color:"#15393f"}}> 23.506.000đ</span>
              </div>
              <div
                style={{
                  fontSize: "15px",
                  textAlign: "right",
                  fontStyle: "italic",
                }}
              >
                Giá tham khảo đã bao gồm VAT
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DetailProduct;
