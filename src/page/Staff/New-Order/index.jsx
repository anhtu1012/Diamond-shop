import { Button, Col, Rate, Row } from "antd";
import { GiBigDiamondRing } from "react-icons/gi";
import { IoDiamondOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import "./index.scss"; // Import your SCSS file for styling
import { getNewOrder } from "../../../../services/Uservices";
import { useEffect, useState } from "react";
import NoData from "../../../components/nodata";

function NewOrder() {
  const [data, setData] = useState([]);

  const fetchNewOrder = async () => {
    try {
      const res = await getNewOrder();
      setData(res.data);
    } catch (error) {
      console.error("Error fetching new order:", error);
      setData([]); // Set data to an empty array in case of error
    }
  };

  useEffect(() => {
    fetchNewOrder();
  }, [data]);

  return (
    <>
      {Array.isArray(data) && data.length > 0 ? (
        data.map((userData) => (
          <div key={userData.userId} className="oder_main">
            <h2 className="UserID-code">US: {userData.userId}</h2>
            {userData.orders.map((order) => {
              const formattedDate = new Date(order.orderDate).toLocaleString(
                "vi-VN",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false, // Sử dụng định dạng 24 giờ thay vì AM/PM
                }
              );
              return (
                <Row
                  className="new_order_frame"
                  key={order.orderId}
                  style={{ marginBottom: "20px" }}
                >
                  <Col span={7} className="new_order_left">
                    <div className="new_order_odID">
                      <span>OD: {order.orderId}</span>
                    </div>
                    {order.productCustomize &&
                      order.productCustomize.product && (
                        <img
                          className="new_order_mg_main"
                          src={
                            order.productCustomize.product.productImages[0]
                              .imageUrl
                          }
                          width={130}
                          alt={order.productCustomize.product.productName}
                          style={{ marginLeft: "75px", top: "-10px" }}
                        />
                      )}
                    {order.productCustomize &&
                      order.productCustomize.product && (
                        <div style={{ marginLeft: "85px" }}>
                          <Button className="new_order_button_custom">
                            Size: {order.productCustomize.size}
                          </Button>
                        </div>
                      )}
                    {(order.cusproductCustomizetom?.diamond ||
                      order.diamond) && (
                      <img
                        src={
                          order.productCustomize?.diamond?.image ||
                          order.diamond?.image
                        }
                        className={`new_order_kimg ${
                          order.productCustomize?.product
                            ? "new_order_kimg_kid"
                            : "new_order_kimg_main"
                        }`}
                        alt={
                          order.productCustomize?.diamond?.diamondName ||
                          order.diamond?.diamondName
                        }
                      />
                    )}
                  </Col>

                  <Col span={10} className="new_order_right">
                    {order.productCustomize &&
                      order.productCustomize.product && (
                        <div className="new_order_info_product">
                          <div>
                            <GiBigDiamondRing
                              size={25}
                              className="new_order_icon_order"
                            />
                          </div>
                          <div className="new_order_info_sub">
                            <span>
                              {order.productCustomize.product.productName}
                              {" - "}
                              {order.productCustomize.product.shapeDiamond}{" "}
                              {order.productCustomize.product.dimensionsDiamond}{" "}
                              ly
                            </span>
                            <p style={{ fontWeight: 400, fontSize: "13px" }}>
                              {" "}
                              {order.productCustomize.product.productID}
                            </p>
                            <Rate
                              disabled
                              defaultValue={
                                order.productCustomize.product.rating
                              }
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
                          {order.productCustomize?.diamond?.diamondName ||
                            order.diamond?.diamondName}
                        </p>
                        <div style={{ fontWeight: 400, fontSize: "13px" }}>
                          <span>
                            Carat:{" "}
                            {order.productCustomize?.diamond?.carat ||
                              order.diamond?.carat}
                          </span>
                          {" - "}
                          <span>
                            Tinh Khiết :
                            {order.productCustomize?.diamond?.clarify ||
                              order.diamond?.clarify}
                          </span>
                          {" - "}
                          <span>
                            Cấp Màu :
                            {order.productCustomize?.diamond?.colorLevel ||
                              order.diamond?.colorLevel}
                          </span>
                          {" - "}
                          Cắt:{" "}
                          <span>
                            {order.productCustomize?.diamond?.cut ||
                              order.diamond?.cut}
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
                            <span
                              style={{ color: "#e4bd7b", fontWeight: "bold" }}
                            >
                              {" "}
                              {order.diamond?.certificate}{" "}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Col>
                  <Col
                    span={7}
                    style={{
                      textAlign: "center",
                      fontSize: "20px",
                      fontWeight: "400",
                    }}
                  >
                    {formattedDate}
                  </Col>
                  <Col
                    span={24}
                    style={{
                      paddingTop: "10px",
                      borderBottom: "dashed 1px black",
                    }}
                  ></Col>
                  <Col span={18} className="text-left">
                    <span>x {order.quantity} Sản Phẩm</span>
                    <div>
                      <Link
                        to={`/staff-page/chi-tiet-don-hang/${order.orderId}`}
                        style={{ color: "#e4bd7b" }}
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </Col>
                  <Col span={6} className="text-right">
                    <h3>
                      {(
                        order.productCustomize?.totalPrice ||
                        order.diamond?.totalPrice ||
                        order.orderDetails.reduce(
                          (total, detail) =>
                            total + detail?.price - detail?.discount
                        )
                      ).toLocaleString("de-DE", {
                        maximumFractionDigits: 2,
                      })}{" "}
                      đ
                    </h3>
                    <button>
                      <Link
                        to={`/staff-page/chi-tiet-don-hang/${order.orderId}`}
                      >
                        Nhận tư vấn
                      </Link>
                    </button>
                  </Col>
                </Row>
              );
            })}
          </div>
        ))
      ) : (
        <NoData/>
      )}
    </>
  );
}

export default NewOrder;
