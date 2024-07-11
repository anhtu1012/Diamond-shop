import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Popconfirm,
  Rate,
  Row,
  Select,
  Space,
  Steps,
  message,
  theme,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./index.scss";
import { TiArrowBack } from "react-icons/ti";
import { IoDiamondOutline } from "react-icons/io5";
import { GiBigDiamondRing } from "react-icons/gi";
import {
  createOrder,
  feedBack,
  fetchOrderFeedback,
  getOrderDetail,
} from "../../../../../services/Uservices";
import { useEffect, useRef, useState } from "react";
import LoadingTruck from "../../../../components/loading";
import Container from "../../../../components/container/Container";
import { VscError } from "react-icons/vsc";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/features/counterSlice";
const statusToStepIndex = {
  "Chờ Xác Nhận": 0,
  "Chờ thanh toán": 1,
  "Chờ giao hàng": 2,
  "Không Thành Công": 2,
  "Đã giao": 3,
  "Đã hủy": 4,
  "Đã hoàn tiền": 4,
};
const renderProductItem = (order, index) => (
  <Row className="staff_order_frame" key={index}>
    <Col span={7} className="staff_order_left">
      {order.productCustomize && order.productCustomize.product && (
        <img
          className="img_main"
          src={order.productCustomize.product.productImages[0].imageUrl}
          width={130}
          style={{ marginLeft: "80px" }}
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
          style={{ marginLeft: "90px" }}
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

function ViewOrderDetailsCusTom() {
  const { orderID } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  const [items, setItems] = useState([
    "Tôi muốn thay đổi địa chỉ ",
    "Tôi muốn thay đổi kim cương",
  ]);
  const [reason, setReason] = useState("");
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const [selectedProduct, setSelectedProduct] = useState([]);
  useEffect(() => {
    const getOrderFeedback = async () => {
      try {
        if (data?.orderId) {
          const res = await fetchOrderFeedback(data.orderId);
          setSelectedProduct(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch order feedback:", error);
        message.error("Failed to fetch order feedback");
      }
    };

    getOrderFeedback();
  }, [data?.orderId]);

  const addItem = (e) => {
    let index = 0;
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  useEffect(() => {
    const fetchGetOrderDetail = async () => {
      const res = await getOrderDetail(orderID);
      setData(res.data);
    };

    fetchGetOrderDetail();
  }, [orderID]);

  const currentStepIndex = statusToStepIndex[data?.status];
  const genderText = data?.gender === "MALE" ? "Nam" : "Nữ";
  const formattedDate = new Date(data?.orderDate).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
  });
  const handleRemobeOrder = async () => {
    try {
      const status = {
        status: "Đã hủy",
        reason: reason,
      };
      await createOrder(orderID, status);
      message.success("Hủy đơn hàng thành công");
      navigate("/");
    } catch (error) {
      message.error("Đã có lỗi xảy ra khi hủy đơn hàng");
    }
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const hanldeSubmit = () => {
    form.submit();
  };
  const [form] = Form.useForm();
  const user = useSelector(selectUser);
  const handleFeedback = async (values, order) => {
    try {
      const info = {
        comment: values[`comment-${selectedProduct.indexOf(order)}`],
        rating: values[`rating-${selectedProduct.indexOf(order)}`],
        productID: order.productID,
        diamondID: null,
        userID: user.userID,
      };
      console.log(info);
      await feedBack(info);
      message.success("Đánh giá thành công");
      form.resetFields([
        `comment-${selectedProduct.indexOf(order)}`,
        `rating-${selectedProduct.indexOf(order)}`,
      ]);
      handleCancel();
    } catch (error) {
      message.error("Đánh giá thất bại");
    }
  };

  if (!data) {
    return <LoadingTruck />;
  }
  return (
    <Container>
      <div className="tong-order-detail">
        <div className="order-detail-1">
          <Row>
            <Col span={24}>
              <Content
                style={{
                  margin: "0 10px",
                }}
              >
                <div
                  style={{
                    padding: 16,
                    minHeight: 160,
                    marginBottom: "10px",
                    background: "#fff",
                    borderRadius: borderRadiusLG,
                  }}
                >
                  <div
                    className="infor-detail-order"
                    style={{ display: "flex" }}
                  >
                    <h2
                      style={{
                        fontWeight: "bold",
                        textAlign: "left",
                        marginBottom: "5px",
                      }}
                    >
                      Thông tin chi tiết sản phẩm
                    </h2>

                    <h2
                      style={{
                        fontWeight: "500",
                        marginLeft: "auto",
                        textAlign: "right",
                      }}
                    >
                      <Link
                        to={"/don-hang"}
                        style={{ color: "black", fontWeight: 600 }}
                      >
                        <TiArrowBack style={{ justifyContent: "center" }} />{" "}
                        Quay lại
                      </Link>
                    </h2>
                  </div>
                  <p
                    style={{
                      fontWeight: "400",
                      background: "#15393f",
                      color: "white",
                      border: "2px solid black",
                      gap: "5px",
                      fontSize: "16px",
                      padding: "4px",
                      width: "18%",
                      marginBottom: "10px",
                    }}
                  >
                    Đặt ngày: {formattedDate}
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      background: "#e4bd7b",
                      border: "2px solid black",
                      padding: "4px",

                      fontWeight: "bold",
                      width: "10%",
                    }}
                  >
                    {data.orderId}
                  </p>
                  <div>
                    {data.orderDetails.map((order, index) =>
                      renderProductItem(order, index)
                    )}
                  </div>
                </div>
              </Content>
            </Col>
          </Row>
        </div>

        <div className="order-detail-2">
          <Row style={{ padding: "10px 10px" }}>
            <Col span={6}>
              <Content
                style={{
                  margin: "30px 10px",
                }}
              >
                <div
                  style={{
                    padding: 16,
                    minHeight: 170,
                    background: "#fff",
                    borderRadius: borderRadiusLG,
                    boxShadow: "0px 0px 4px",
                  }}
                >
                  <Col span={24}>
                    <div
                      className={`step-giao-hang ${
                        data.status === "Đã hủy" ||
                        data.status === "Đã hoàn tiền "
                          ? "step-cancelled"
                          : ""
                      }`}
                    >
                      <Steps
                        direction="vertical"
                        current={currentStepIndex}
                        style={{ gap: "2px" }}
                        items={[
                          {
                            title: "Chờ Xác Nhận",
                          },
                          {
                            title: "Chờ Thanh Toán",
                          },
                          {
                            title: "Chờ giao hàng",
                          },
                          {
                            title: "Đã giao",
                          },
                          {
                            title:
                              data.status === "Đã hủy"
                                ? "Đã hủy"
                                : "Đã hoàn tiền",
                            icon: (data.status === "Đã hủy" ||
                              data.status === "Đã hoàn tiền") && (
                              <VscError
                                size={35}
                                style={{
                                  color: "white",
                                  background: "red",
                                  borderRadius: "50%",
                                }}
                              />
                            ),
                          },
                        ]}
                      />
                    </div>
                  </Col>
                </div>
              </Content>
            </Col>
            <Col span={10}>
              <div className="information">
                <p
                  style={{
                    fontWeight: "500",
                    fontSize: "16px",
                    marginLeft: "10px",
                  }}
                >
                  Thông tin chi khách hàng
                </p>
                <Content
                  style={{
                    margin: "10px 10px",
                    marginLeft: "20px",
                  }}
                >
                  <div
                    className="thong-tin-nguoi-mua"
                    style={{
                      padding: 20,
                      minHeight: 190,
                      background: "#fff",
                      borderRadius: borderRadiusLG,
                      boxShadow: "0px 0px 4px",
                    }}
                  >
                    <div className="row">
                      <p>Họ và Tên:</p>
                      <span>{data.fullName}</span>
                    </div>

                    <div className="row">
                      <p>Email:</p>
                      <span>{data.email}</span>
                    </div>
                    <div className="row">
                      <p>Giới tính:</p>
                      <span>{genderText}</span>
                    </div>
                    <div className="row">
                      <p>Địa chỉ:</p>
                      <span>{data.addressShipping}</span>
                    </div>
                    <div className="row">
                      <p>Số điện thoại:</p>
                      <span>{data.phoneShipping}</span>
                    </div>
                    {data?.note != null && (
                      <div className="row">
                        <p>Ghi Chú:</p>
                        <span>{data.note}</span>
                      </div>
                    )}
                    {(data?.status === "Đã hủy" && data?.reason != null) ||
                      (data?.status === "Không Thành Công" && (
                        <div className="row">
                          <p>Lí do:</p>
                          <span>{data.reason}</span>
                        </div>
                      ))}
                    {data?.status != "Chờ xác nhận" &&
                      data?.status != "Chờ thanh toán" &&
                      data?.payments &&
                      data.payments.length > 0 && (
                        <div className="row">
                          <p>Thanh toán:</p>
                          <span>{data.payments[0].methodPayment}</span>
                        </div>
                      )}
                  </div>
                </Content>
              </div>
            </Col>

            <Col span={8}>
              <div className="price-all" style={{ marginLeft: "10px" }}>
                <p style={{ fontWeight: "500", fontSize: "16px" }}>
                  Số tiền thanh toán
                </p>
                <Content
                  style={{
                    margin: "10px 10px",
                  }}
                >
                  <div
                    style={{
                      padding: 16,
                      minHeight: 190,
                      background: "#fff",
                      borderRadius: borderRadiusLG,
                      boxShadow: "0px 0px 4px",
                    }}
                  >
                    <div
                      className="total-price"
                      style={{ marginTop: "5px", textAlign: "left" }}
                    >
                      <div>
                        {data.orderDetails.length === 1 ? (
                          <div className="row">
                            <p>Giá Sản Phẩm 1 :</p>
                            <span>
                              {data.orderDetails[0].price.toLocaleString(
                                "vi-VN",
                                {
                                  maximumFractionDigits: 0,
                                }
                              )}{" "}
                              vnđ
                            </span>
                          </div>
                        ) : (
                          data.orderDetails.map((order, index) => (
                            <div className="row" key={index === 1}>
                              <p>Giá Sản Phẩm {index + 1}:</p>
                              <span>
                                {order.price.toLocaleString("vi-VN", {
                                  maximumFractionDigits: 0,
                                })}{" "}
                                vnđ
                              </span>
                            </div>
                          ))
                        )}
                      </div>

                      <div className="row">
                        <p>Giảm giá :</p>
                        <span>
                          -{" "}
                          {data.discount.toLocaleString("vi-VN", {
                            maximumFractionDigits: 0,
                          })}{" "}
                          vnđ
                        </span>
                      </div>
                      <div className="row">
                        <p>Giao hàng:</p>
                        <span>Miễn phí</span>
                      </div>
                      <div className="row" style={{ marginTop: "25px" }}>
                        <p style={{ fontSize: "20px" }}>Tổng giá:</p>
                        <span
                          style={{
                            fontSize: "20px",
                            color: "red",
                            fontWeight: "500",
                          }}
                        >
                          {data.price.toLocaleString("vi-VN", {
                            maximumFractionDigits: 0,
                          })}{" "}
                          vnđ
                        </span>
                      </div>
                      {data?.status === "Chờ xác nhận" && (
                        <div className="row">
                          <Select
                            style={{
                              width: 200,
                            }}
                            onChange={setReason}
                            placeholder="Chọn lý do hủy đơn"
                            dropdownRender={(menu) => (
                              <>
                                {menu}
                                <Divider
                                  style={{
                                    margin: "8px 0",
                                  }}
                                />
                                <Space
                                  style={{
                                    padding: "0 8px 4px",
                                  }}
                                >
                                  <Input
                                    placeholder="Please enter item"
                                    ref={inputRef}
                                    value={name}
                                    onChange={onNameChange}
                                    onKeyDown={(e) => e.stopPropagation()}
                                  />
                                  <Button
                                    type="text"
                                    icon={<PlusOutlined />}
                                    onClick={addItem}
                                  >
                                    Add item
                                  </Button>
                                </Space>
                              </>
                            )}
                            options={items.map((item) => ({
                              label: item,
                              value: item,
                            }))}
                          />
                          <span>
                            {" "}
                            <Popconfirm
                              title="Hủy Đơn"
                              onConfirm={handleRemobeOrder}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button
                                style={{
                                  background: "red",
                                  color: "white",
                                  borderRadius: "0px 8px 8px 0px",
                                  fontWeight: "bold",
                                }}
                              >
                                Hủy Đơn
                              </Button>
                            </Popconfirm>
                          </span>
                        </div>
                      )}
                      {data?.status === "Chờ thanh toán" && (
                        <div
                          className="thanh-toan"
                          style={{ textAlign: "center" }}
                        >
                          <Link to={`/thanh-toan/${data.orderId}`}>
                            <Button
                              style={{
                                background: "#15393f",
                                color: "white",
                                borderRadius: "5px",
                                fontWeight: "bold",
                                width: "300px",
                                height: "50px",
                              }}
                            >
                              Thanh toán ngay
                            </Button>
                          </Link>
                        </div>
                      )}
                      {data?.status === "Không Thành Công" && (
                        <div
                          className="thanh-toan"
                          style={{ textAlign: "center" }}
                        >
                          <Link to={`/thanh-toan/${data.orderId}`}>
                            <Button
                              style={{
                                background: "orange",
                                color: "white",
                                borderRadius: "5px",
                                fontWeight: "bold",
                                width: "300px",
                                height: "50px",
                              }}
                            >
                              Không Thành Công
                            </Button>
                          </Link>
                        </div>
                      )}
                      {data?.status === "Đã giao" && (
                        <div
                          className="thanh-toan"
                          style={{ textAlign: "center" }}
                        >
                          <Button
                            onClick={() => showModal(data?.orderDetails)}
                            style={{
                              background: "orange",
                              color: "white",
                              borderRadius: "5px",
                              fontWeight: "bold",
                              width: "300px",
                              height: "50px",
                            }}
                          >
                            Đánh giá sản phẩm
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Content>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Modal
        title="Đánh giá sản phẩm"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Đóng
          </Button>,
        ]}
      >
        {selectedProduct.map((order, index) => (
          <div key={index}>
            <Link to={`/product-details/${order.productID}`}>
              <div className="feedBackModal">{order.productName}</div>
            </Link>
            {form && (
              <Form
                form={form}
                layout="vertical"
                onFinish={(values) => handleFeedback(values, order)}
              >
                <Form.Item
                  style={{ paddingTop: "10px", fontWeight: "bold" }}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn số sao",
                    },
                  ]}
                  name={`rating-${index}`}
                  label="Đánh giá"
                >
                  <Rate />
                </Form.Item>
                <Form.Item
                  style={{ fontWeight: "bold" }}
                  name={`comment-${index}`}
                  label="Bình luận"
                >
                  <Input.TextArea rows={4} />
                </Form.Item>
              </Form>
            )}
            <div style={{ textAlign: "right", paddingBottom: "10px" }}>
              <Button
                type="primary"
                onClick={hanldeSubmit}
                style={{ background: "orange" }}
              >
                Đánh giá
              </Button>
            </div>
          </div>
        ))}
      </Modal>
    </Container>
  );
}

export default ViewOrderDetailsCusTom;
