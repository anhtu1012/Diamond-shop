import { Button, Col, Form, Radio, Rate, Row, message } from "antd";
import "./index.scss";
import { CaretLeftFilled } from "@ant-design/icons";
import { GiBigDiamondRing } from "react-icons/gi";
import { FaCcMastercard, FaHome, FaStoreAlt } from "react-icons/fa";
import Container from "../../../components/container/Container";
import { IoDiamondOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkOut, getOrderDetail } from "../../../../services/Uservices";
import NoData from "../../../components/nodata";

const renderProductItem = (order, index) => (
  <Row className="staff_order_frame" key={index}>
    <Col span={7} className="staff_order_left">
      {order.productCustomize && order.productCustomize.product && (
        <img
          className="img_main"
          src={order.productCustomize.product.productImages[0].imageUrl}
          width={130}
          style={{ marginLeft: "10px" }}
        />
      )}

      {order.productCustomize && order.productCustomize.product && (
        <div style={{ textAlign: "center" }}>
          <Button className="button_custom">
            Size: {order.productCustomize.size}
          </Button>
        </div>
      )}
      {(order.productCustomize?.diamond || order.diamond) && (
        <img
          src={order.productCustomize?.diamond?.image || order.diamond?.image}
          className={`staff_order_kimg ${
            order.productCustomize?.product
              ? "staff_order_kimg_kid"
              : "staff_order_kimg_main"
          }`}
          alt={
            order.productCustomize?.diamond?.diamondName ||
            order.diamond?.diamondName
          }
        />
      )}
    </Col>

    <Col span={17} className="staff_order_right">
      {order.productCustomize && order.productCustomize.product && (
        <div className="info_product">
          <div>
            <GiBigDiamondRing size={25} className="icon_order" />
          </div>
          <div className="info_sub">
            <span>
              {order.productCustomize.product.productName}
              {" - "}
              {order.productCustomize.product.shapeDiamond}{" "}
              {order.productCustomize.product.dimensionsDiamond} ly
            </span>
            <p style={{ fontWeight: 400, fontSize: "13px" }}>
              {" "}
              {order.productCustomize.product.productID}
            </p>
            <Rate
              disabled
              defaultValue={order.productCustomize.product.rating}
              style={{
                fontSize: "13px",
              }}
            />
          </div>
        </div>
      )}
      <div className="info_diamond">
        <div>
          <IoDiamondOutline size={25} className="icon_order" />
        </div>
        <div className="info_sub">
          <p>
            {order.productCustomize?.diamond?.diamondName ||
              order.diamond.diamondName}
          </p>
          <div style={{ fontWeight: 400, fontSize: "13px" }}>
            <span>
              Carat:{" "}
              {order.productCustomize?.diamond?.carat || order.diamond.carat}
            </span>
            {" - "}
            <span>
              Tinh Khiết :
              {order.productCustomize?.diamond?.clarify ||
                order.diamond.clarify}
            </span>
            {" - "}
            <span>
              Cấp Màu :
              {order.productCustomize?.diamond?.colorLevel ||
                order.diamond.colorLevel}
            </span>
            {" - "}
            Cắt:{" "}
            <span>
              {order.productCustomize?.diamond?.cut || order.diamond.cut}
            </span>
          </div>
          {order.diamond && (
            <div
              style={{ fontWeight: 400, fontSize: "13px", paddingTop: "3px" }}
            >
              Kiểm định:{" "}
              <span style={{ color: "red" }}>
                {" "}
                {order.diamond.certificate}{" "}
              </span>
            </div>
          )}
        </div>
      </div>
    </Col>
    <Col span={24} className="price">
      <span style={{ textAlign: "right" }}>
        {(
          order.productCustomize?.totalPrice || order.diamond.totalPrice
        ).toLocaleString("de-DE", {
          maximumFractionDigits: 2,
        })}{" "}
        đ
      </span>
    </Col>
  </Row>
);

function Payment() {
  const [form] = Form.useForm();
  const { orderID } = useParams();
  // const navigate = useNavigate();
  const [data, setData] = useState();
  useEffect(() => {
    const fetchGetOrderDetail = async () => {
      const res = await getOrderDetail(orderID);
      setData(res.data);
    };

    fetchGetOrderDetail();
  }, []);
  const handleCheckOut = async () => {
    try {
      const values = form.getFieldsValue();
      const paymentMethod =
        values.paymentMethod === "installment" ? "vnpay" : "paypal";
      const info = {
        orderID: orderID,
        paymentMethod: paymentMethod,
      };
      console.log(info);
      const res = await checkOut(info);
      if (res.data.code === "Success") {
        window.location.href = res.data.link;
      } else {
        message.error("Thanh toán thất bại");
      }
    } catch (error) {
      message.error("Đã có lỗi xảy ra khi tạo đơn hàng");
    }
  };
  if (!data) {
    return <NoData />;
  }

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
          <Col span={14}>
            <div className="khung">
              <div
                className="thong-tin-don-mua"
                style={{ textAlign: "center" }}
              >
                <span>ĐƠN HÀNG</span>
              </div>
              <div className="code-box">OD: OD{data.orderId}</div>
              <div>
                {data.orderDetails.map((order, index) =>
                  renderProductItem(order, index)
                )}
              </div>
              <div className="repayp">
                <div className="total_pricep">
                  <p>Giảm giá</p>
                  <span style={{ color: "#15393f" }}>
                    {" "}
                    {data.discount.toLocaleString("vi-VN", {
                      maximumFractionDigits: 0,
                    })}{" "}
                    vnđ
                  </span>
                </div>
                <div className="total_pricep">
                  <p>Chí phí vận chuyển</p>
                  <span style={{ color: "#15393f" }}>Miễn Phí</span>
                </div>
              </div>

              <div className="repay2p">
                <div className="totalp">
                  <p>Thành tiền </p>
                  <span style={{ color: "#15393f" }}>
                    {" "}
                    {data.price.toLocaleString("vi-VN", {
                      maximumFractionDigits: 0,
                    })}{" "}
                    đ
                  </span>
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
          <Col span={10} className="pay_main_col">
            <Form
              form={form}
              style={{ padding: "10px 30px" }}
              initialValues={{ paymentMethod: "online" }}
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
                    <p
                      style={{
                        margin: 0,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src="https://cdn-new.topcv.vn/unsafe/150x/https://static.topcv.vn/company_logos/cong-ty-cp-giai-phap-thanh-toan-viet-nam-vnpay-6194ba1fa3d66.jpg"
                        style={{
                          marginRight: "8px",
                          width: "30px",
                          height: "30px",
                          display: "inline-block",
                        }}
                      />
                      Thanh toán trả góp qua VnPay
                    </p>
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
              <div className="thanh-taon">
                <Button
                  type="primary"
                  onClick={handleCheckOut}
                  htmlType="submit"
                  className="payment_button"
                  style={{
                    background: "#15393f",
                    color: "white",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    width: "300px",
                    height: "50px",
                  }}
                >
                  Thanh toán
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Payment;
