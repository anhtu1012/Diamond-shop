import { Button, Col, Rate, Row } from "antd";
import { GiBigDiamondRing } from "react-icons/gi";
import { IoDiamondOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import "./index.scss"; // Import your SCSS file for styling

const data = [
  {
    userID: "US1234",
    orders: [
      { 
        odID: "OD12345",
        custom: {
          product: {
            productID: "01117BT",
            productName: "BÔNG TAI KIM CƯƠNG 18K",
            shapeDiamond: "Round",
            dimensionsDiamond: 5,
            productType: "Bông Tai",
            totalPrice: 53053440,
            rating: 4.5,
            productImages:
              "https://jemmia.vn/wp-content/uploads/2024/04/1-copy-5.jpg",
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
            image:
              "https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/kim-cuong-vien.png?alt=media&token=4fdf38b3-e37c-4e59-9906-3bae83608fe2",
          },
          sizes: 45,
        },
        diamond: null,
      },
      {
        odID: "OD12345",
        diamond: {
          diamondID: "1453851107",
          diamondName: "KIM CƯƠNG VIÊN GIA 3LY6 – 6471017231",
          carat: 0.61,
          certificate: "GIA",
          clarify: "VS2",
          color: "Trắng",
          colorLevel: "F",
          cut: "Excellent",
          shape: "Round",
          dimensions: 5.4,
          image:
            "https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/kim-cuong-vien.png?alt=media&token=4fdf38b3-e37c-4e59-9906-3bae83608fe2",
        },
      },
    ],
  },
  {
    userID: "US1238",
    orders: [
      {
        odID: "OD12347",
        custom: {
          product: {
            productID: "01117BT",
            productName: "BÔNG TAI KIM CƯƠNG 18K",
            shapeDiamond: "Round",
            dimensionsDiamond: 5,
            productType: "Bông Tai",
            totalPrice: 53053440,
            rating: 5,
            productImages:
              "https://jemmia.vn/wp-content/uploads/2024/04/1-copy-5.jpg",
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
            image:
              "https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/kim-cuong-vien.png?alt=media&token=4fdf38b3-e37c-4e59-9906-3bae83608fe2",
          },
          sizes: 45,
        },
      },
      {
        odID: "OD12347",
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
          image:
            "https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/kim-cuong-vien.png?alt=media&token=4fdf38b3-e37c-4e59-9906-3bae83608fe2",
        },
      },
    ],
  },
];

const NewOrder = () => (
  <>
    {data.map((userData) => (
      <div key={userData.userID}>
        <h2 className="UserID-code">{userData.userID}</h2>
        {userData.orders.map((order) => (
          <Row
            className="new_order_frame"
            key={order.odID}
            style={{ marginBottom: "20px" }}
          >
            <Col span={7} className="new_order_left">
              <div className="new_order_odID">
                <span>{order.odID}</span>
              </div>
              {order.custom && order.custom.product && (
                <img
                  className="new_order_mg_main"
                  src={order.custom.product.productImages}
                  width={130}
                  alt={order.custom.product.productName}
                  style={{ marginLeft: "75px", top: "-10px" }}
                />
              )}
              {order.custom && order.custom.product && (
                <div style={{ marginLeft: "85px" }}>
                  <Button className="new_order_button_custom">
                    Size: {order.custom.sizes}
                  </Button>
                </div>
              )}
              {(order.custom?.diamond || order.diamond) && (
                <img
                  src={order.custom?.diamond?.image || order.diamond?.image}
                  className={`new_order_kimg ${
                    order.custom?.product
                      ? "new_order_kimg_kid"
                      : "new_order_kimg_main"
                  }`}
                  alt={
                    order.custom?.diamond?.diamondName ||
                    order.diamond?.diamondName
                  }
                />
              )}
              <div className="link_new_order">
                <Link to="/chi-tiet-don-hang" style={{ color: "#e4bd7b" }}>
                  Xem chi tiết
                </Link>
              </div>
            </Col>

            <Col span={17} className="new_order_right">
              {order.custom && order.custom.product && (
                <div className="new_order_info_product">
                  <div>
                    <GiBigDiamondRing
                      size={25}
                      className="new_order_icon_order"
                    />
                  </div>
                  <div className="new_order_info_sub">
                    <span>
                      {order.custom.product.productName}
                      {" - "}
                      {order.custom.product.shapeDiamond}{" "}
                      {order.custom.product.dimensionsDiamond} ly
                    </span>
                    <p style={{ fontWeight: 400, fontSize: "13px" }}>
                      {" "}
                      {order.custom.product.productID}
                    </p>
                    <Rate
                      disabled
                      defaultValue={order.custom.product.rating}
                      style={{
                        fontSize: "13px",
                      }}
                    />
                  </div>
                </div>
              )}
              <div className="new_order_info_diamond">
                <div>
                  <IoDiamondOutline
                    size={25}
                    className="new_order_icon_order"
                  />
                </div>
                <div className="new_order_info_sub">
                  <p>
                    {order.custom?.diamond?.diamondName ||
                      order.diamond.diamondName}
                  </p>
                  <div style={{ fontWeight: 400, fontSize: "13px" }}>
                    <span>
                      Carat:{" "}
                      {order.custom?.diamond?.carat || order.diamond.carat}
                    </span>
                    {" - "}
                    <span>
                      Tinh Khiết :
                      {order.custom?.diamond?.clarify || order.diamond.clarify}
                    </span>
                    {" - "}
                    <span>
                      Cấp Màu :
                      {order.custom?.diamond?.colorLevel ||
                        order.diamond.colorLevel}
                    </span>
                    {" - "}
                    Cắt:{" "}
                    <span>
                      {order.custom?.diamond?.cut || order.diamond.cut}
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
            <Col span={24} className="new_order_consult_button">
              {order.custom && order.custom.product && (
                <div className="new_order_total_price">
                  {order.custom.product.totalPrice.toLocaleString()} đ
                </div>
              )}
              <Button className="button_new_order">
                <Link to="/staff-page/chi-tiet-don-hang">Nhận tư vấn</Link>
              </Button>
            </Col>
          </Row>
        ))}
      </div>
    ))}
  </>
);

export default NewOrder;
