import { useEffect, useState } from "react";
import { CaretLeftFilled, DeleteOutlined } from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
} from "antd";
import { IoTicket } from "react-icons/io5";
import { Link } from "react-router-dom";
import Relate from "../../../components/carousel/related";
import Container from "../../../components/container/Container";
import "./index.scss";
import { getProvinces, getDistricts, getWards } from "vietnam-provinces";

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
    disabled: true,
  },
];

function Cart() {
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    const provincesList = getProvinces();
    setProvinces(provincesList);
  }, []);

  const handleProvinceChange = (value) => {
    const districtsList = getDistricts(value);
    setDistricts(districtsList);
    setWards([]);
    form.setFieldsValue({ district: undefined, ward: undefined });
  };

  const handleDistrictChange = (value) => {
    const wardsList = getWards(value);
    setWards(wardsList);
    form.setFieldsValue({ ward: undefined });
  };

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
            <img src={imageUrl} width={180} />
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
              <div style={{paddingBottom:"20px"}}>
                <p>{name}</p>
                <span>{code}</span>
              </div>
              <p>{nameDM}</p>
              <span>{codeDM}</span>
              <Select
                defaultValue="Size"
                style={{
                  width: 70,
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

  useEffect(() => {
    const handleScroll = () => {
      const cartTotalElement = document.querySelector(".cart_total");
      if (cartTotalElement) {
        const scrollTop = window.scrollY;
        if (scrollTop >= 400) {
          cartTotalElement.classList.add("canselfixed");
        } else {
          cartTotalElement.classList.remove("canselfixed");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="cart">
      <Container>
        <div className="cart_button">
          <Button type="primary" className="cart_button_comback">
            <CaretLeftFilled className="cart_button_comback_icon" />{" "}
            <Link to="/">Tiếp tục mua sắm</Link>
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
                    <Radio value="male"> Nam </Radio>
                    <Radio value="female"> Nữ </Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Xin hãy nhập vào Họ và tên!" },
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
                  style={{ paddingTop: "10px" }}
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
                <Form.Item
                  name="city"
                  rules={[{ required: true, message: "Xin hãy chọn Tỉnh/TP!" }]}
                >
                  <Select
                    className="input"
                    placeholder="Tỉnh/TP*"
                    style={{ width: "350px", height: "40px" }}
                    onChange={handleProvinceChange}
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {provinces.map((province) => (
                      <Option key={province.code} value={province.code}>
                        {province.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="district"
                  rules={[
                    { required: true, message: "Xin hãy chọn Quận/Huyện!" },
                  ]}
                >
                  <Select
                    className="input"
                    placeholder="Quận/Huyện*"
                    style={{ width: "350px", height: "40px" }}
                    onChange={handleDistrictChange}
                    disabled={!districts.length}
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {districts.map((district) => (
                      <Option key={district.code} value={district.code}>
                        {district.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="ward"
                  rules={[
                    { required: true, message: "Xin hãy chọn Phường/Xã!" },
                  ]}
                >
                  <Select
                    className="input"
                    placeholder="Phường/Xã*"
                    style={{ width: "350px", height: "40px" }}
                    disabled={!wards.length}
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {wards.map((ward) => (
                      <Option key={ward.code} value={ward.code}>
                        {ward.name}
                      </Option>
                    ))}
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

                <Form.Item name="note">
                  <Input
                    className="input"
                    placeholder="Ghi chú"
                    style={{ width: "350px", height: "40px" }}
                  />
                </Form.Item>
              </Form>
            </div>
          </Col>

          <Col span={15}>
            <div className="cart_form_content" style={{ padding: "0px 20px" }}>
              <div className="cart_form_title">
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
            <Form
              form={form}
              onFinish={onFinish}
              style={{ padding: "25px 30px", maxWidth: "476px" }}
            >
              <div className="cart_total">
                <div className="cart_points">
                  <span className="cart_points_label">
                    <IoTicket style={{ paddingRight: "5px" }} />
                    Nhập điểm
                  </span>
                  <Input
                    className="input"
                    placeholder="Nhập điểm *"
                    style={{ width: "150px", height: "30px" }}
                  />
                </div>
                <div className="cart_total_price">
                  <span className="cart_total_price_label">
                    Thành tiền (2 sản phẩm):
                  </span>
                  <span className="cart_total_price_value">1.100.000.000₫</span>
                </div>
                <div className="cart_vat_statement">
                  Giá tham khảo đã bao gồm VAT
                </div>
                <Button
                  className="confirm_button"
                  type="primary"
                  style={{ width: "100%", height: "48px" }}
                >
                  <Link to="/don-hang">Xác nhận</Link>
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
        <div>
          <h2
            style={{
              textAlign: "center",
              paddingBottom: "20px",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            Có thể bạn quan tâm
          </h2>
          <Relate numberOfSlides={4} autoplay data="diamonds" />
        </div>
      </Container>
    </div>
  );
}

export default Cart;
