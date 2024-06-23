import { Tabs, Row, Col, Rate, Button } from "antd";
import Container from "../../../components/container/Container";
import "./index.scss";
import { Link } from "react-router-dom";
import Relate from "../../../components/carousel/related";
import { IoDiamondOutline } from "react-icons/io5";
import { GiBigDiamondRing } from "react-icons/gi";

import NoData from "../../../components/nodata";
const OrderCustomer = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const data = [
    {
      orderId: 45,
      status: "Chờ xác nhận",
      orderDate: "2024-06-22T08:08:41.38852",
      quantity: 2,
      price: 803251000,
      diamond: null,
      productCustomize: {
        prodcutCustomId: "P01146N1-1453851108",
        product: {
          createAt: "2024-06-08T21:01:54.487409",
          updateAt: "2024-06-08T21:01:54.487409",
          productID: "01146N1",
          productName: "NHẪN KIM CƯƠNG NỮ 18K",
          bathStone: "kim cương",
          brand: "diamond",
          goldType: "Vàng Trắng",
          goldWeight: 1.05,
          shapeDiamond: "Round",
          dimensionsDiamond: 5.4,
          message: "",
          oldGold: "18K",
          productType: "Nhẫn",
          quantity: 20,
          quantityStonesOfDiamond: 63,
          totalPrice: 55251000,
          rating: 4.5,
          status: true,
          stoneWeight: 1.07,
          originalPrice: 37465000,
          wagePrice: 2000000,
          ratio: 0.4,
          category: {
            createAt: "2024-06-03T23:26:54.215137",
            updateAt: "2024-06-03T23:26:54.215137",
            categoryID: 2,
            categoryName: "Nhẫn Kim Cương Nữ",
          },
          productImages: [
            {
              imageId: 22,
              imageUrl:
                "https://jemmia.vn/wp-content/uploads/2024/03/1_cam_03-copy-2-1.jpg",
            },
            {
              imageId: 23,
              imageUrl:
                "https://jemmia.vn/wp-content/uploads/2024/03/1_cam_01-copy-2-1.jpg",
            },
            {
              imageId: 24,
              imageUrl:
                "https://jemmia.vn/wp-content/uploads/2024/03/4_cam_01-copy-2-1-600x600.jpg",
            },
          ],
          sizes: [
            {
              sizeID: 59,
              sizeValue: 8,
              quantity: 8,
            },
            {
              sizeID: 60,
              sizeValue: 9,
              quantity: 5,
            },
            {
              sizeID: 61,
              sizeValue: 10,
              quantity: 6,
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
          inputDate: "2024-06-03T07:00:00.000+00:00",
          originPrice: 440000000,
          status: false,
          totalPrice: 748000000,
          ratio: 0.7,
          feedbacks: [],
        },
        totalPrice: 803251000,
        size: 10,
      },
    },
    {
      orderId: 43,
      status: "Chờ thanh toán",
      orderDate: "2024-06-22T08:08:41.38852",
      quantity: 1,
      price: 95962500,
      diamond: {
        diamondID: "2467437869",
        diamondName: "KIM CƯƠNG VIÊN GIA 5LY4 – 2467437869",
        carat: 0.6,
        certificate: "GIA",
        clarify: "VS1",
        color: "Trắng",
        colorLevel: "F",
        cut: "Excellent",
        shape: "Round",
        dimensions: 5.4,
        flourescence: "MEDIUM",
        image:
          "https://jemmia.vn/wp-content/uploads/2024/05/kim-cuong-vien.png",
        inputDate: "2024-06-03T07:00:00.000+00:00",
        originPrice: 63975000,
        status: false,
        totalPrice: 95962500,
        ratio: 0.5,
        feedbacks: [],
      },
      productCustomize: null,
    },
    {
      orderId: 42,
      quantity: 1,
      status: "Đã giao",
      orderDate: "2024-06-22T08:08:41.38852",
      price: 131962500,
      diamond: {
        diamondID: "1489714529",
        diamondName: "KIM CƯƠNG VIÊN GIA 5LY4 – 1489714529",
        carat: 0.6,
        certificate: "GIA",
        clarify: "VS1",
        color: "Trắng",
        colorLevel: "D",
        cut: "Excellent",
        shape: "Round",
        dimensions: 5.4,
        flourescence: "NONE",
        image:
          "https://jemmia.vn/wp-content/uploads/2024/05/kim-cuong-vien.png",
        inputDate: "2024-06-03T07:00:00.000+00:00",
        originPrice: 87975000,
        status: false,
        totalPrice: 131962500,
        ratio: 0.5,
        feedbacks: [],
      },
      productCustomize: null,
    },
  ];
  // const formattedDate = new Date(data?.orderDate).toLocaleString("vi-VN", {
  //   day: "2-digit",
  //   month: "2-digit",
  //   year: "numeric",
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   second: "2-digit",
  // });
  const renderCard = (order, index, buttonText, buttonColor) => (
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
      <Col
        span={6}
        style={{ textAlign: "center", fontSize: "20px", fontWeight: "400" }}
      >
        10:10:10 20/21/2021
      </Col>
      <Col
        span={24}
        style={{ borderBottom: "dashed 1px gray", paddingTop: "10px" }}
      ></Col>
      <Col span={18} className="text-left">
        <span>x {order.quantity} Sản Phẩm</span>
        <div>
          <Link to="/">Xem Chi Tiết</Link>
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
        <button className={`status-button ${buttonColor}`}>{buttonText}</button>
      </Col>
    </Row>
  );
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
      label: "Đã giao",
      key: "4",
      status: "Đã giao",
      buttonColor: "green",
    },
    {
      label: "Đã hủy",
      key: "5",
      status: "Đã hủy",
      buttonColor: "red",
    },
    {
      label: "Lịch sử",
      key: "6",
      status: "Đánh giá",
      buttonColor: "grey",
    },
  ];
  function getContentForTab(status, buttonColor) {
    const filteredOrders = data.filter((order) => order.status === status);

    if (filteredOrders.length === 0) {
      return <NoData />;
    }

    return filteredOrders.map((order, index) =>
      renderCard(order, index, status, buttonColor)
    );
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
