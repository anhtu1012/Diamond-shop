import { useEffect, useState } from "react";
import { CaretLeftFilled } from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Rate,
  Row,
  Select,
} from "antd";
import { IoDiamondOutline, IoTicket } from "react-icons/io5";
import { Link } from "react-router-dom";
import Relate from "../../../components/carousel/related";
import Container from "../../../components/container/Container";
import "./index.scss";
import { getProvinces, getDistricts, getWards } from "vietnam-provinces";
import { getCart } from "../../../../services/Uservices";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/counterSlice";
import { GiBigDiamondRing } from "react-icons/gi";

const { Option } = Select;

function Cart() {
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const user = useSelector(selectUser);
  const fetchCart = async () => {
    console.log(user.userID);
    const res = await getCart(user.userID);
    console.log(res.data);
  };
  useEffect(() => {
    fetchCart();
  }, []);
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

  const renderProductItem = (order) => (
    <div key={order.cartId}>
      {order.items.map((item) => (
        <Row className="staff_order_frame" key={item.cartItemId}>
          <Col span={7} className="staff_order_left">
            {item.productCustomize && item.productCustomize.product && (
              <img
                className="img_main"
                src={item.productCustomize.product.productImages[0]?.imageUrl}
                width={130}
                style={{ marginLeft: "10px" }}
              />
            )}
            {item.productCustomize && item.productCustomize.product && (
              <div style={{ textAlign: "center" }}>
                <Button className="button_custom">
                  Size: {item.productCustomize.size}
                </Button>
              </div>
            )}
            {(item.productCustomize?.diamond || item.diamondAdd) && (
              <img
                src={
                  item.productCustomize?.diamond?.image ||
                  item.diamondAdd?.image
                }
                className={`staff_order_kimg ${
                  item.productCustomize?.product
                    ? "staff_order_kimg_kid"
                    : "staff_order_kimg_main"
                }`}
                alt={
                  item.productCustomize?.diamond?.diamondName ||
                  item.diamondAdd?.diamondName
                }
              />
            )}
          </Col>
  
          <Col span={17} className="staff_order_right">
            {item.productCustomize && item.productCustomize.product && (
              <div className="info_product">
                <div>
                  <GiBigDiamondRing size={25} className="icon_order" />
                </div>
                <div className="info_sub">
                  <span>
                    {item.productCustomize.product.productName}
                    {" - "}
                    {item.productCustomize.product.shapeDiamond}{" "}
                    {item.productCustomize.product.dimensionsDiamond} ly
                  </span>
                  <p style={{ fontWeight: 400, fontSize: "13px" }}>
                    {item.productCustomize.product.productID}
                  </p>
                  <Rate
                    disabled
                    defaultValue={item.productCustomize.product.rating}
                    style={{
                      fontSize: "13px",
                    }}
                  />
                </div>
              </div>
            )}
            {(item.productCustomize?.diamond || item.diamondAdd) && (
              <div className="info_diamond">
                <div>
                  <IoDiamondOutline size={25} className="icon_order" />
                </div>
                <div className="info_sub">
                  <p>
                    {item.productCustomize?.diamond?.diamondName ||
                      item.diamondAdd?.diamondName}
                  </p>
                  <div style={{ fontWeight: 400, fontSize: "13px" }}>
                    <span>
                      Carat:{" "}
                      {item.productCustomize?.diamond?.carat ||
                        item.diamondAdd?.carat}
                    </span>
                    {" - "}
                    <span>
                      Tinh Khiết :
                      {item.productCustomize?.diamond?.clarify ||
                        item.diamondAdd?.clarify}
                    </span>
                    {" - "}
                    <span>
                      Cấp Màu :
                      {item.productCustomize?.diamond?.colorLevel ||
                        item.diamondAdd?.colorLevel}
                    </span>
                    {" - "}
                    Cắt:{" "}
                    <span>
                      {item.productCustomize?.diamond?.cut ||
                        item.diamondAdd?.cut}
                    </span>
                  </div>
                  {(item.productCustomize?.diamond || item.diamondAdd) && (
                    <div
                      style={{
                        fontWeight: 400,
                        fontSize: "13px",
                        paddingTop: "3px",
                      }}
                    >
                      Kiểm định:{" "}
                      <span style={{ color: "red" }}>
                        {item.productCustomize?.diamond?.certificate ||
                          item.diamondAdd?.certificate}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Col>
          <Col span={24} className="price">
            <span style={{ textAlign: "right" }}>
              {(
                item.productCustomize?.totalPrice ||
                item.diamondAdd?.totalPrice ||
                item.totalPrice
              ).toLocaleString("de-DE", {
                maximumFractionDigits: 2,
              })}{" "}
              đ
            </span>
          </Col>
        </Row>
      ))}
    </div>
  );
  

  const data = [
    {
      cartId: 1,
      userId: 24,
      items: [
        {
          cartItemId: 1,
          diamondAdd: null,
          productCustomize: {
            prodcutCustomId: "P01117BT-1453851108",
            product: {
              createAt: "2024-06-08T21:55:04.290387",
              updateAt: "2024-06-15T19:49:42.353674",
              productID: "01117BT",
              productName: "BÔNG TAI KIM CƯƠNG 18K ",
              bathStone: "kim cương",
              brand: "diamond",
              goldType: "Vàng Trắng",
              goldWeight: 1.04,
              shapeDiamond: "Round",
              dimensionsDiamond: 5.0,
              message: "",
              oldGold: "18K",
              productType: "Bông Tai",
              quantity: 20,
              quantityStonesOfDiamond: 60,
              totalPrice: 10000000,
              rating: 4.5,
              status: true,
              stoneWeight: 0.04,
              originalPrice: 3.11584e7,
              wagePrice: 2000000.0,
              ratio: 0.6,
              category: {
                createAt: "2024-06-03T23:27:23.264671",
                updateAt: "2024-06-03T23:27:23.264671",
                categoryID: 3,
                categoryName: "Bông Tai Kim Cương",
              },
              productImages: [
                {
                  imageId: 70,
                  imageUrl:
                    "https://jemmia.vn/wp-content/uploads/2024/04/1-copy-5.jpg",
                },
                {
                  imageId: 71,
                  imageUrl:
                    "https://jemmia.vn/wp-content/uploads/2024/04/3-copy-7.jpg",
                },
                {
                  imageId: 72,
                  imageUrl:
                    "https://jemmia.vn/wp-content/uploads/2024/04/2-copy-5.jpg",
                },
              ],
              sizes: [
                {
                  sizeID: 107,
                  sizeValue: 10,
                  quantity: 8,
                },
                {
                  sizeID: 108,
                  sizeValue: 12,
                  quantity: 5,
                },
                {
                  sizeID: 109,
                  sizeValue: 14,
                  quantity: 7,
                },
              ],
              feedbacks: [],
            },
            diamond: {
              diamondID: "1453851108",
              diamondName: "KIM CƯƠNG VIÊN GIA 3LY6 – 6471017231",
              carat: 0.61,
              certificate: "GIA",
              clarify: "VS2",
              color: "Trắng",
              colorLevel: "F",
              cut: "Excellent",
              shape: "Round",
              dimensions: 5.4,
              flourescence: "FAINT",
              image:
                "https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/kim-cuong-vien.png?alt=media&token=4fdf38b3-e37c-4e59-9906-3bae83608fe2",
              inputDate: "2024-06-03T00:00:00.000+00:00",
              originPrice: 4.4e8,
              status: false,
              totalPrice: 300000000,
              ratio: 0.7,
              feedbacks: [],
            },
            totalPrice: 310000000,
            size: 10,
          },
          quantity: 1,
          totalPrice: 310000000,
        },
        {
          cartItemId: 12,
          productCustomize: null,
          diamondAdd: {
            diamondID: "6391377543",
            diamondName: "KIM CƯƠNG VIÊN GIA 5LY3 – 6391377543",
            carat: 0.59,
            certificate: "GIA",
            clarify: "VVS1",
            color: "Trắng",
            colorLevel: "E",
            cut: "Excellent",
            shape: "Round",
            dimensions: 5.3,
            flourescence: "NONE",
            image:
              "https://jemmia.vn/wp-content/uploads/2024/05/kim-cuong-vien.png",
            inputDate: "2024-06-03T00:00:00.000+00:00",
            originPrice: 7.5975e7,
            status: true,
            totalPrice: 1.139625e8,
            ratio: 0.5,
            feedbacks: [],
          },
          quantity: 1,
          totalPrice: 1.139625e8,
        },
      ],
      fullName: "Truong Le Minh Nghia [K17 HCM]",
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
                {data.map((order, index) => renderProductItem(order, index))}
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
