import {
  Button,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  AutoComplete,
  DatePicker,
} from "antd";
import "./index.scss";
import { CaretLeftFilled, DeleteOutlined } from "@ant-design/icons";
import Container from "../../../components/container/Container";
import { useState } from "react";
import { Link } from "react-router-dom";
const { Option } = Select;
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

function Cart() {
  // Vùng JS
  const [form] = Form.useForm();

  const [email, setEmail] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value && !value.includes("@")) {
      setSuggestions([`${value}@gmail.com`]);
    } else {
      setSuggestions([]);
    }
  };

  const handleBlur = () => {
    if (!email.endsWith("@gmail.com")) {
      setEmail(email + "@gmail.com");
    }
  };

  const onFinish = (values) => {
    console.log("Received values: ", values);
  };

  const sizeOptions = [];
  for (let i = 6; i <= 20; i++) {
    sizeOptions.push(
      <Select.Option key={i} value={i}>
        {i}
      </Select.Option>
    );
  }

  const renderProductItem = (
    index,
    name,
    code,
    imgDM,
    nameDM,
    codeDM,
    price,
    imageUrl
  ) => (
    <div className="cart_product_frame" key={index}>
      <Row className="cart_product_item">
        <button className="detele">
          <DeleteOutlined /> Xóa
        </button>
        <div className="cart_detail">
          <Col span={6} className="img_cart">
            <img src={imageUrl} width={130} />
            {imgDM && (
              <img
                src={imgDM}
                style={{ display: imgDM === null ? "none" : "block" }}
                className="cart_product_imgdm"
                alt={nameDM}
              />
            )}
          </Col>
          <Col span={18} className="infor">
            <div className="infor_detail">
              <p>{name}</p>
              <span>{code}</span>
              <p>{nameDM}</p>
              <span>{codeDM}</span>
              <Select
                defaultValue="1"
                style={{
                  width: 50,
                }}
                options={items}
              />
            </div>
          </Col>
        </div>
        <Col span={24} className="price">
          {" "}
          <span>{price}</span>
        </Col>
      </Row>
    </div>
  );

  const products = [
    {
      name: "NHẪN KIM CƯƠNG 18K SUPER VIP",
      code: "NKC1241",
      imgDM: "https://igg.vn/images/upload/34201813229polished-diamond.png",
      nameDM: "KIm cuong ne",
      codeDM: "0000000",
      price: "510,000,000",
      imageUrl:
        "https://glosbejewelry.net/upload/image/Nhan-kim-cuong%20(10).jpg",
    },
    {
      name: "NHẪN KIM CƯƠNG NỮ 18K VIP",
      code: "NKC12341241",
      imgDM: "",
      nameDM: "",
      codeDM: "",
      price: "500,000,000",
      imageUrl:
        "https://glosbejewelry.net/upload/image/Nhan-kim-cuong%20(10).jpg",
    },
  ];

  return (
    <Container>
      <div>
        <div className="cart_button">
          <Button type="primary" className="cart_button_comback">
            <CaretLeftFilled className="cart_button_comback_icon" />{" "}
            <Link to="/">Tiếp tục mua sắp</Link>
          </Button>
        </div>
        <Row className="cart-main">
          <Col span={9} className="cart_main_col">
            <div className="cart_form">
              <div className="cart_form_title">
                <Button shape="circle">
                  <p>1</p>
                </Button>
                <h2>Thông tin người mua</h2>
              </div>

              <Form style={{ padding: "25px 30px" }}>
                <Form.Item>
                  <Radio.Group>
                    <Radio value="apple"> Nam </Radio>
                    <Radio value="pear"> Nữ </Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Xin hãy nhập vào Name!" },
                  ]}
                >
                  <Input
                    className="input"
                    placeholder="Họ và tên*"
                    style={{ width: "350px", height: "40px" }}
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  rules={[
                    { required: true, message: "Xin hãy nhập vào SĐT!" },
                    {
                      pattern: /^\d+$/,
                      message: "Số điện thoại chỉ được nhập số!",
                    },
                  ]}
                >
                  <Input
                    className="input"
                    placeholder="Số điện thoại*"
                    style={{ width: "350px", height: "40px" }}
                    type="tel"
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Xin hãy nhập vào Email!" },
                  ]}
                >
                  <AutoComplete
                    options={suggestions.map((email) => ({ value: email }))}
                    onChange={setEmail}
                    value={email}
                    onBlur={handleBlur}
                  >
                    <Input
                      className="input"
                      placeholder="Email*"
                      style={{ width: "350px", height: "40px" }}
                      onChange={handleEmailChange}
                    />
                  </AutoComplete>
                </Form.Item>

                <Form.Item
                  name="birthdate"
                  rules={[
                    { required: true, message: "Xin hãy nhập vào Ngày sinh!" },
                  ]}
                >
                  <DatePicker
                    className="input"
                    placeholder="Ngày sinh*"
                    style={{ width: "350px", height: "40px" }}
                    format="DD/MM/YYYY"
                  />
                </Form.Item>
              </Form>

              <div className="cart_form_title">
                <Button shape="circle">
                  <p>2</p>
                </Button>
                <h2>Địa chỉ</h2>
              </div>

              <Form
                form={form}
                onFinish={onFinish}
                style={{ padding: "25px 30px" }}
              >
                <Form.Item name="city">
                  <Select
                    className="input"
                    placeholder="Tỉnh/TP*"
                    style={{ width: "350px", height: "40px" }}
                  >
                    <Option value="hanoi">Hà Nội</Option>
                    <Option value="tphcm">TP.HCM</Option>
                    <Option value="vungtau">TP.Vũng Tàu</Option>
                    <Option value="baoloc">TP.Bảo Lộc</Option>
                  </Select>
                </Form.Item>

                <Form.Item name="district">
                  <Select
                    className="input"
                    placeholder="Quận/Huyện*"
                    style={{ width: "350px", height: "40px" }}
                  >
                    <Option value="namtulien">Nam Từ Liêm</Option>
                    <Option value="quan1">Quận 1</Option>
                    <Option value="vung">Huyện.Vũng Tàu</Option>
                    <Option value="baolam">Huyện Bảo Lâm</Option>
                  </Select>
                </Form.Item>

                <Form.Item name="ward">
                  <Select
                    className="input"
                    placeholder="Phường/Xã*"
                    style={{ width: "350px", height: "40px" }}
                  >
                    <Option value="xhn">P/X ở HN</Option>
                    <Option value="xhcm">Xã hcm</Option>
                    <Option value="xvt">xã ở Vũng Tàu</Option>
                    <Option value="xbl">Phường Xã</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Xin hãy nhập vào Địa chỉ cụ thể!",
                    },
                  ]}
                >
                  <Input
                    className="input"
                    placeholder="Địa chỉ cụ thể*"
                    style={{ width: "350px", height: "40px" }}
                  />
                </Form.Item>

                <Form.Item
                  name="note"
                  rules={[
                    { required: true, message: "Xin hãy nhập vào Ghi chú!" },
                  ]}
                >
                  <Input
                    className="input"
                    placeholder="Ghi chú*"
                    style={{ width: "350px", height: "40px" }}
                  />
                </Form.Item>
              </Form>
            </div>
            <div className="cart_form_title">
              <Button shape="circle">
                <p>3</p>
              </Button>
              <h2>Nhập Điểm</h2>
            </div>

            <Form
              form={form}
              onFinish={onFinish}
              style={{ padding: "25px 30px", maxWidth: "476px" }}
            >
              <Form.Item
                name="points"
                rules={[{ required: true, message: "Xin hãy nhập điểm!" }]}
                style={{ marginBottom: "20px" }}
              >
                <Input
                  className="input"
                  placeholder="Nhập điểm *"
                  style={{ width: "350px", height: "40px" }}
                />
              </Form.Item>

              <Form.Item name="agreement">
                <span style={{ fontSize: "13px" }}>
                  * Đồng ý nhận thông tin và chương trình khuyến mãi của Diamond
                  qua email, SMS, mạng xã hội và thu thập, xử lý dữ liệu cá nhân
                  của tôi theo quy định thông báo này và quy định pháp luật.
                </span>
                <br />
                <Radio value="agree1">Tôi đồng ý</Radio>
              </Form.Item>

              <Button
                className="confirm_button"
                type="primary"
                style={{ width: "310px", height: "48px" }}
              >
                <Link to="/don-hang">Xác nhận</Link>
              </Button>
            </Form>
          </Col>

          <Col span={15}>
            <div
              style={{ paddingTop: "0px 20px" }}
              className="cart_form_content"
            >
              <div className="cart_form_title_h2">
                <h2 style={{ fontSize: "24px", margin: "5px 10px 5px 10px" }}>
                  Thông tin giỏ hàng
                </h2>
              </div>
              <div className="cart_product_list">
                {products.map((product, index) =>
                  renderProductItem(
                    index,
                    product.name,
                    product.code,
                    product.imgDM,
                    product.nameDM,
                    product.codeDM,
                    product.price,
                    product.imageUrl
                  )
                )}
              </div>
            </div>

            <div className="cart_summary">
              <div className="cart_summary_item">
                <span className="cart_summary_label">Tạm tính:</span>
                <span className="cart_summary_value">1.010.000.000₫</span>
              </div>
              <div className="cart_summary_item">
                <span className="cart_summary_label">Chi phí vận chuyển:</span>
                <span className="cart_summary_value_bold">
                  <i>Miễn phí</i>
                </span>
              </div>
            </div>
            <div className="cart_total">
              <div className="cart_total_price">
                <span className="cart_total_price_label">Thành tiền:</span>
                <span className="cart_total_price_value">1.100.000.000₫</span>
              </div>
              <div className="cart_vat_statement">
                Giá tham khảo đã bao gồm VAT
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Cart;
