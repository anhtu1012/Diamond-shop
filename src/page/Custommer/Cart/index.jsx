/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { CaretLeftFilled } from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  Col,
  Form,
  Input,
  Radio,
  Rate,
  Row,
  Select,
  message,
  notification,
} from "antd";
import { IoDiamondOutline, IoTicket } from "react-icons/io5";
import { Link } from "react-router-dom";
import Relate from "../../../components/carousel/related";
import Container from "../../../components/container/Container";
import "./index.scss";
import { getProvinces, getDistricts, getWards } from "vietnam-provinces";
import {
  deleteCart,
  getCart,
  submitOrder,
} from "../../../../services/Uservices";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/counterSlice";
import { GiBigDiamondRing } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import NotFound from "../../404";
const { Option } = Select;

function Cart() {
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const userr = useSelector(selectUser);
  const [points, setPoints] = useState(0);
  const [totalCartValue, setTotalCartValue] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [dataCart, setDataCart] = useState();
  const [initialValues, setInitialValues] = useState({});
  const fetchCart = async () => {
    try {
      console.log(userr.userID);
      const res = await getCart(userr.userID);

      // Update state with fetched data
      setDataCart(res.data);
      console.log(dataCart);
      // Set initial form values
      setInitialValues({
        fullName: `${res.data.user.firstName} ${res.data.user.lastName}`,
        phone: res.data.user.phone,
        email: res.data.user.email,
        province: res.data.user.address.split(",")[0],
        district: res.data.user.address.split(",")[1],
        ward: res.data.user.address.split(",")[2],
        detailAddress: res.data.user.address.split(",")[3],
        points: 0, // default value for points input
      });

      // Set form values with fetched data
      form.setFieldsValue({
        fullName: `${res.data.user.firstName} ${res.data.user.lastName}`,
        phone: res.data.user.phone,
        email: res.data.user.email,
        province: res.data.user.address.split(",")[0],
        district: res.data.user.address.split(",")[1],
        ward: res.data.user.address.split(",")[2],
        detailAddress: res.data.user.address.split(",")[3],
      });
    } catch (error) {
      console.error("Failed to fetch cart data:", error);
    }
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
  const handleSubmit = async () => {
    try {
      // Lấy giá trị từ form
      const formValues = await form.validateFields();

      // Tạo thông tin địa chỉ
      const { province, district, ward, address, note } = formValues;

      const selectedProvince = provinces.find((p) => p.code === province);
      const selectedDistrict = districts.find((d) => d.code === district);
      const selectedWard = wards.find((w) => w.code === ward);
      const fullAddress = `${address}, ${
        selectedWard ? selectedWard.name + ", " : ""
      }${selectedDistrict ? selectedDistrict.name + ", " : ""}${
        selectedProvince ? selectedProvince.name : ""
      }`;

      // Tạo thông tin đơn hàng
      const orderInfo = {
        userId: userr.userID,
        fullName: formValues.fullName,
        phone: formValues.phone,
        email: formValues.email,
        address: fullAddress,
        note: note || "",
        items: dataCart.items.map((item) => ({
          productId:
            item.productCustomize?.product.productID ||
            item.diamondAdd?.diamondID,
          quantity: item.quantity,
          // Bạn thêm các thông tin khác của sản phẩm nếu cần thiết
        })),
        totalCost: totalCartValue,
        pointsUsed: points,
      };
      console.log("Order information:", orderInfo);
      // Gọi API đặt hàng với thông tin đơn hàng
      const response = await submitOrder(orderInfo);
      if (response.success) {
        // Xử lý khi đặt hàng thành công, ví dụ: thông báo cho người dùng, làm trống giỏ hàng
        message.success("Đặt hàng thành công!");
        console.log("Order submitted successfully:", response.data);
      }
    } catch (error) {
      // Xử lý khi có lỗi xảy ra, ví dụ: hiển thị thông báo lỗi
      console.error("Failed to submit order:", error);
      message.error("Đặt hàng không thành công!");
    }
  };

  const renderProductItem = (item) => {
    if (!item.productCustomize && !item.diamondAdd) {
      return null; // Trả về null hoặc một JSX tương ứng nếu không có thông tin để hiển thị
    }
    const handleDeleteCart = async (cartItemId) => {
      try {
        await deleteCart(cartItemId);
        message.success("Xóa thành công");
        // Cập nhật lại dữ liệu giỏ hàng trên UI sau khi xóa thành công
        fetchCart(); // Gọi hàm fetchDataCart() để cập nhật lại danh sách giỏ hàng
      } catch (error) {
        console.error("Failed to delete item from cart:", error);
      }
    };

    return (
      <Row className="staff_order_frame" key={item.cartItemId}>
        <div>
          <RiDeleteBin6Line
            onClick={() => handleDeleteCart(item.cartItemId)}
            size={15}
            className="delete"
          />
        </div>
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
                item.productCustomize?.diamond?.image || item.diamondAdd?.image
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
    );
  };

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

  const handlePointsChange = (value) => {
    const usedPoints = Math.min(value, dataCart.user.totalPoints); // Đặt giới hạn điểm sử dụng không vượt quá tổng điểm có
    if (value > dataCart.user.totalPoints) {
      // Hiển thị thông báo lỗi nếu nhập điểm vượt quá tổng điểm có
      notification.error({
        message: "Lỗi nhập điểm",
        description:
          "Số điểm bạn nhập vượt quá tổng điểm hiện có. Xin vui lòng nhập lại.",
        duration: 3,
      });
      return; // Dừng hàm để không thực thi các lệnh tiếp theo
    }

    setPoints(usedPoints);

    // Phần còn lại của hàm để tính toán giảm giá và cập nhật thành tiền...
  };
  useEffect(() => {
    const calculateTotalCartValue = () => {
      const totalValue = dataCart?.items.reduce(
        (acc, item) => acc + item.totalPrice,
        0
      );
      return totalValue;
    };

    const calculatedDiscount = points * 500000;

    const totalValue = calculateTotalCartValue();

    if (calculatedDiscount > totalValue) {
      notification.error({
        message: "Lỗi nhập điểm",
        description:
          "Giá trị giảm giá vượt quá tổng giá trị của giỏ hàng. Xin vui lòng nhập lại.",
        duration: 3,
      });

      setDiscount(0); // Reset giá trị giảm giá về 0
      setTotalCartValue(totalValue); // Cập nhật lại tổng giá trị giỏ hàng mà không trừ giảm giá
    } else {
      // Cập nhật giá trị giảm giá và tổng giá trị giỏ hàng sau khi đã trừ giảm giá
      setDiscount(calculatedDiscount);
      setTotalCartValue(totalValue - calculatedDiscount);
    }
  }, [points, dataCart?.items]);
  if (!dataCart || !dataCart.items.length) {
    return <NotFound />;
  }

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
                <h2 style={{ fontSize: "24px", margin: "5px 10px 5px 10px" }}>
                  Thông tin người mua
                </h2>
              </div>

              <Form
                form={form}
                name="userForm"
                onFinish={onFinish}
                initialValues={initialValues}
                style={{ padding: "25px 30px" }}
              >
                <Form.Item>
                  <Radio.Group>
                    <Radio value="male"> Nam </Radio>
                    <Radio value="female"> Nữ </Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="fullName"
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
                      pattern: /^[0-9]{10}$/,
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

                {/*<Form.Item
                  name="yearOfBirth"
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
                </Form.Item>*/}

                <Form.Item
                  name="province"
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
                <Button shape="circle">
                  <p>2</p>
                </Button>
                <h2
                  style={{
                    fontSize: "24px",
                    margin: "5px 10px 5px 10px",
                    fontWeight: "bold",
                  }}
                >
                  Thông tin giỏ hàng
                </h2>
              </div>
              <div className="cart_product_list">
                {dataCart?.items.map((item, index) =>
                  renderProductItem(item, index)
                )}
              </div>
            </div>

            <div className="cart_summary">
              <div className="cart_summary_item">
                <span className="cart_summary_label">Điểm:</span>
                <span className="cart_summary_value">
                  {discount.toLocaleString("de-DE", {
                    maximumFractionDigits: 2,
                  })}{" "}
                  ₫
                </span>
              </div>
              <div className="cart_summary_item">
                <span className="cart_summary_label">Tạm tính:</span>
                <span className="cart_summary_value">
                  {totalCartValue.toLocaleString("de-DE", {
                    maximumFractionDigits: 2,
                  })}{" "}
                  ₫
                </span>
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
                    Nhập điểm:
                    <span style={{ fontWeight: "300" }}>
                      (1đ = 500.000 vnđ)
                    </span>
                  </span>
                  <Input
                    type="number"
                    min={0}
                    max={dataCart?.user.totalPoints}
                    onChange={(e) => handlePointsChange(e.target.value)}
                    className="input"
                    placeholder={dataCart?.user.totalPoints}
                    style={{ width: "150px", height: "30px" }}
                  />
                </div>
                <div className="cart_total_price">
                  <span className="cart_total_price_label">
                    Thành tiền (2 sản phẩm):
                  </span>
                  <span className="cart_total_price_value">
                    {totalCartValue.toLocaleString("de-DE", {
                      maximumFractionDigits: 2,
                    })}{" "}
                    ₫
                  </span>
                </div>
                <div className="cart_vat_statement">
                  Giá tham khảo đã bao gồm VAT
                </div>
                <Button
                  className="confirm_button"
                  type="primary"
                  style={{ width: "100%", height: "48px" }}
                  onClick={handleSubmit}
                >
                  Xác nhận
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
          <Relate numberOfSlides={4} autoplay dataCart="diamonds" />
        </div>
      </Container>
    </div>
  );
}

export default Cart;
