import { Button, Col, Popconfirm, Rate, Row, message } from "antd";
import "./index.scss";
import { useNavigate, useParams } from "react-router-dom";
import { GiBigDiamondRing } from "react-icons/gi";
import { IoDiamondOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { createOrder, getOrderDetail } from "../../../../../services/Uservices";

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

function DetailNewOrder() {
  const { orderID } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();
  useEffect(() => {
    const fetchGetOrderDetail = async () => {
      const res = await getOrderDetail(orderID);
      setData(res.data);
    };

    fetchGetOrderDetail();
  }, [orderID]);

  const handleCreateOrder = async () => {
    try {
      const status = {
        status: "Chờ thanh toán",
        reason: "",
      };
      await createOrder(orderID, status);
      message.success("Tạo đơn hàng thành công");
      navigate("/staff-page/don-hang-moi");
    } catch (error) {
      message.error("Đã có lỗi xảy ra khi tạo đơn hàng");
    }
  };
  const genderText = data?.gender === "MALE" ? "Nam" : "Nữ";
  const handleRemobeOrder = async () => {
    try {
      const status = {
        status: "Đã hủy",
        reason: "",
      };
      await createOrder(orderID, status);
      message.success("Hủy đơn hàng thành công");
      navigate("/staff-page/don-hang-moi");
    } catch (error) {
      message.error("Đã có lỗi xảy ra khi hủy đơn hàng");
    }
  };
  if (!data) {
    return <div>No order details found.</div>;
  }
  return (
    <div>
      <Row gutter={10}>
        <Col span={10}>
          <div className="khung1">
            <div className="code-user">Name: {data.fullName}</div>
            <div className="thong-tin-nguoi-mua" style={{ padding: "10px " }}>
              <span>Thông tin người mua</span>
            </div>

            <div className="thong-tin-chi-tiet">
              <div className="thong-tin-item">
                <p className="label">Tên:</p>
                <p className="value">{data.fullName}</p>
              </div>
              <div className="thong-tin-item">
                <p className="label">Số Điện Thoại:</p>
                <p className="value">{data.phoneShipping}</p>
              </div>
              <div className="thong-tin-item">
                <p className="label">Email:</p>
                <p className="value">{data.email}</p>
              </div>
              <div className="thong-tin-item">
                <p className="label">Giới Tính:</p>
                <p className="value">{genderText}</p>
              </div>
              <div className="thong-tin-item">
                <p className="label">Địa Chỉ:</p>
                <p className="value">{data.addressShipping}</p>
              </div>
              {data?.note != null && (
                <div className="thong-tin-item">
                  <p className="label">Ghi Chú:</p>
                  <span>{data.note}</span>
                </div>
              )}
              {(data?.status === "Đã hủy" && data?.reason != null) ||
                (data?.status === "Không Thành Công" && (
                  <div className="thong-tin-item">
                    <p className="label">Lí do:</p>
                    <span>{data.reason}</span>
                  </div>
                ))}
            </div>
            <div style={{ marginTop: "10px", marginLeft: "auto" }}>
              <Popconfirm
                title="Hủy đơn"
                description="Bạn có chắc muốn hủy không!?"
                onConfirm={handleRemobeOrder}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="primary"
                  danger
                  style={{ marginRight: "10px", fontWeight: "bold" }}
                >
                  Hủy đơn
                </Button>
              </Popconfirm>
              <Button
                type="primary"
                style={{ fontWeight: "bold" }}
                className="custom-black-button"
                onClick={handleCreateOrder}
              >
                Tạo đơn hàng
              </Button>
            </div>
          </div>
        </Col>
        <Col span={14}>
          <div className="khung">
            <div className="code-box">OD: OD{data.orderId}</div>
            <div className="thong-tin-don-mua" style={{ padding: "10px " }}>
              <span>Thông tin đơn hàng</span>
            </div>

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
      </Row>
    </div>
  );
}

export default DetailNewOrder;
