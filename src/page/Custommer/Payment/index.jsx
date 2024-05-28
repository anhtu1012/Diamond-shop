import { Button, Col, Form, Radio, Row, Select } from "antd";
import "./index.scss";
import { CaretLeftFilled } from "@ant-design/icons";
import { GiJewelCrown } from "react-icons/gi";
import {
  FaCcMastercard,
  FaCreditCard,
  FaHome,
  FaStoreAlt,
} from "react-icons/fa";
import Container from "../../../components/container/Container";
import { IoDiamondOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
const items = [
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
    disabled: true,
  },
];

function Payment() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values: ", values);
  };

  return (
    <Container>
      <div className="payment-container">
        <div className="pay_button">
          <Link to="/don-hang">
            <Button type="primary" className="pay_button_comback">
              <CaretLeftFilled className="pay_button_comback_icon" /> Quay lại
            </Button>
          </Link>
        </div>

        <Row className="pay-main">
          <Col span={14} className="payment_order">
            <div className="title">
              <h2>ĐƠN HÀNG</h2>
            </div>
            <div className="pay_product_infor">
              <div className="pay_product">
                <Row className="product">
                  <Col span={9} clasName="pay_img">
                    <img
                      src="https://igg.vn/images/upload/34201813229polished-diamond.png"
                      width={200}
                    />
                  </Col>
                  <Col span={15} className="pay_product_detail">
                    <div className="product1">
                      <GiJewelCrown style={{ fontSize: "20px" }} />
                      <div>
                        <p>NHẪN KIM CƯƠNG NỮ 18K</p>
                        <span>123452352</span>
                      </div>
                    </div>
                    <div className="product1">
                      <IoDiamondOutline style={{ fontSize: "20px" }} />
                      <div>
                        <p>KIM CƯƠNG VIÊN GIA 3LY6 – 7443338670</p>
                        <span>7443338670</span>
                      </div>
                    </div>
                  </Col>
                  <Col span={24} className="pay_size_product">
                    <Select
                      defaultValue="Kích Thước"
                      style={{
                        width: 160,
                        paddingLeft: "60px",
                        border: "none !important",
                      }}
                      options={items}
                    />
                  </Col>
                  <Col span={24} className="pay_price_product">
                    <div>
                      <p>11.314.423đ</p>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="pay_product">
                <Row className="product">
                  <Col span={9} clasName="pay_img">
                    <img
                      src="https://igg.vn/images/upload/34201813229polished-diamond.png"
                      width={200}
                    />
                  </Col>
                  <Col span={15} className="pay_product_detail">
                    <div className="product1">
                      <GiJewelCrown style={{ fontSize: "20px" }} />
                      <div>
                        <p>NHẪN KIM CƯƠNG NỮ 18K</p>
                        <span>123452352</span>
                      </div>
                    </div>
                    <div className="product1">
                      <div>
                        <p></p>
                        <span></span>
                      </div>
                    </div>
                  </Col>
                  <Col span={24} className="pay_size_product">
                    <Select
                      defaultValue="Kích Thước"
                      style={{
                        width: 160,
                        paddingLeft: "60px",
                        border: "none !important",
                      }}
                      options={items}
                    />
                  </Col>
                  <Col span={24} className="pay_price_product">
                    <div>
                      <p>474.314.423đ</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="repay">
              <div className="total_price">
                <p>Tạm tính</p>
                <span>484.864.468đ</span>
              </div>
              <div className="total_price">
                <p>Chí phí vận chuyển</p>
                <span>Miễn Phí</span>
              </div>
            </div>
            <div className="repay2">
              <div className="total">
                <p>Thành tiền </p>
                <span>484.864.468đ</span>
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
          </Col>
          <Col span={10} className="pay_main_col">
            <Form
              form={form}
              onFinish={onFinish}
              style={{ padding: "10px 30px" }}
            >
              <div className="pay_form_title">
                <Button shape="circle" style={{ border: "2px solid black" }}>
                  <p>1</p>
                </Button>
                <h2>Phương thức vận chuyển</h2>
              </div>
              <Form.Item name="chooseMethod">
                <Radio.Group>
                  <Radio
                    value="home"
                    style={{
                      width: "467px",
                      height: "47px",
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #ccc",
                      padding: "0 10px",
                      marginBottom: "10px",
                      borderRadius: "8px",
                    }}
                  >
                    <FaHome style={{ marginRight: "8px" }} />
                    Giao hàng tận nơi
                  </Radio>
                  <Radio
                    value="stores"
                    style={{
                      width: "467px",
                      height: "47px",
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #ccc",
                      padding: "0 10px",
                      borderRadius: "8px",
                    }}
                  >
                    <FaStoreAlt style={{ marginRight: "8px" }} />
                    Đến cửa hàng
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <div className="pay_form_title">
                <Button shape="circle" style={{ border: "2px solid black" }}>
                  <p>2</p>
                </Button>
                <h2>Phương thức thanh toán</h2>
              </div>
              <Form.Item name="paymentMethod">
                <Radio.Group>
                  <Radio
                    value="transfer"
                    style={{
                      width: "467px",
                      height: "47px",
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #ccc",
                      padding: "0 10px",
                      marginBottom: "10px",
                      borderRadius: "8px",
                    }}
                  >
                    <FaCreditCard style={{ marginRight: "8px" }} />
                    Chuyển khoản qua ngân hàng
                  </Radio>
                  <Radio
                    value="installment"
                    style={{
                      width: "467px",
                      height: "47px",
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #ccc",
                      padding: "0 10px",
                      marginBottom: "10px",
                      borderRadius: "8px",
                    }}
                  >
                    <FaCreditCard style={{ marginRight: "8px" }} />
                    Thanh toán trả góp qua thẻ tín dụng
                  </Radio>
                  <Radio
                    value="online"
                    style={{
                      width: "467px",
                      height: "47px",
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #ccc",
                      padding: "0 10px",
                      borderRadius: "8px",
                    }}
                  >
                    <FaCcMastercard style={{ marginRight: "8px" }} />
                    Thanh toán online bằng thẻ ATM/Visa/Master...
                  </Radio>
                </Radio.Group>
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="payment_button"
                style={{ width: "310px", height: "48px" }}
              >
                Thanh toán
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Payment;
