import { Tabs, Row, Col, Rate, Button } from "antd";
import Container from "../../../components/container/Container";
import "./index.scss";
import { Link } from "react-router-dom";
import Relate from "../../../components/carousel/related";
import { IoDiamondOutline } from "react-icons/io5";
import { GiBigDiamondRing } from "react-icons/gi";

import NoData from "../../../components/nodata";
import { useEffect, useState } from "react";
import { getOrderById } from "../../../../services/Uservices";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/counterSlice";
import LoadingTruck from "../../../components/loading";
const OrderCustomer = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const user = useSelector(selectUser);
  const [data, setData] = useState();
  const fetchOderById = async () => {
    const res = await getOrderById(user.userID);
    setData(res.data);
  };
  useEffect(() => {
    fetchOderById();
  }, [data]);

  const renderCard = (order, index, buttonText, buttonColor) => {
    const formattedDate = new Date(order.orderDate).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Sử dụng định dạng 24 giờ thay vì AM/PM
    });
    return (
      <Row className="staff_order_frame" key={index}>
        <Col span={7} className="staff_order_left">
          <div className="new_order_odID">
            <span>OD: {order.orderId}</span>
          </div>
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
              src={
                order.productCustomize?.diamond?.image || order.diamond?.image
              }
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

        <Col span={11} className="staff_order_right">
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
                  {order.productCustomize?.diamond?.carat ||
                    order.diamond.carat}
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
                  style={{
                    fontWeight: 400,
                    fontSize: "13px",
                    paddingTop: "3px",
                  }}
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
        <Col
          span={6}
          style={{ textAlign: "center", fontSize: "20px", fontWeight: "400" }}
        >
          {formattedDate}
        </Col>
        <Col
          span={24}
          style={{ borderBottom: "dashed 1px gray", paddingTop: "10px" }}
        ></Col>
        <Col span={18} className="text-left">
          <span>x {order.quantity} Sản Phẩm</span>
          <div>
            <Link to={`/don-hang/chi-tiet-don-hang/${order.orderId}`}>
              Xem Chi Tiết
            </Link>
          </div>
        </Col>
        <Col span={6} className="text-right">
          <h3>
            {(
              order.productCustomize?.totalPrice || order.diamond.totalPrice
            ).toLocaleString("de-DE", {
              maximumFractionDigits: 2,
            })}{" "}
            đ
          </h3>

          <button className={`status-button ${buttonColor}`}>
            {buttonText}
          </button>
        </Col>
      </Row>
    );
  };
  const tabs = [
    {
      label: "Chờ xác nhận",
      key: "1",
      status: "Chờ xác nhận",
      buttonColor: "default",
    },
    {
      label: "Chờ thanh toán",
      key: "2",
      status: "Chờ thanh toán",
      buttonColor: "yellow",
    },
    {
      label: "Chờ giao hàng",
      key: "3",
      status: "Chờ giao hàng",
      buttonColor: "blue",
    },
    {
      label: "Không Thành Công",
      key: "4",
      status: "Không Thành Công",
      buttonColor: "orange",
    },
    {
      label: "Đã giao",
      key: "5",
      status: "Đã giao",
      buttonColor: "green",
    },
    {
      label: "Đã hủy",
      key: "6",
      status: "Đã hủy",
      buttonColor: "red",
    },
    {
      label: "Đã hoàn tiền",
      key: "7",
      status: "Đã hoàn tiền",
      buttonColor: "grey",
    },
  ];
  function getContentForTab(status, buttonColor) {
    const filteredOrders =
      data?.orders?.filter((order) => order.status === status) || [];

    if (filteredOrders.length === 0) {
      return <NoData />;
    }

    return filteredOrders.map((order, index) =>
      renderCard(order, index, status, buttonColor)
    );
  }

  if (!data) {
    return <LoadingTruck />;
  }
  return (
    <Container>
      <div className="tabs-container">
        <Tabs onChange={onChange} type="card">
          {tabs.map((tab) => (
            <Tabs.TabPane tab={tab.label} key={tab.key}>
              {getContentForTab(tab.status, tab.buttonColor)}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
      <div>
        <h2
          style={{
            textAlign: "center",
            padding: "10px",
            fontSize: "25px",
            fontWeight: "bold",
          }}
        >
          Có thể bạn quan tâm
        </h2>
        <Relate numberOfSlides={4} autoplay category="Nhẫn Kim Cương Nữ" />
      </div>
    </Container>
  );
};

export default OrderCustomer;
