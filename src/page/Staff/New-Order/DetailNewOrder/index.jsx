import { Button, Col, Rate, Row } from "antd";
import "./index.scss";
import { Link } from "react-router-dom";
import { GiBigDiamondRing } from "react-icons/gi";
import { IoDiamondOutline } from "react-icons/io5";

const data = [
  {
    odID: "OD12345",
    userID: "US1234",
    
    custom: {
      product: {
        productID: "01117BT",
        productName: "BÔNG TAI KIM CƯƠNG 18K",
        shapeDiamond: "Round",
        dimensionsDiamond: 5,
        productType: "Bông Tai",
        totalPrice: 53053440,
        rating: 4.5,
        status: true,
        productImages:
          "https://jemmia.vn/wp-content/uploads/2024/04/1-copy-5.jpg",
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
        status: true,
        totalPrice: 748000000,
        feedbacks: [],
      },
      sizes: 45,
    },
    diamond: null,
  },
  {
    odID: "OD12345",
    userID: "US1234",
    custom: null,
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
      flourescence: "FAINT",
      image:
        "https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/kim-cuong-vien.png?alt=media&token=4fdf38b3-e37c-4e59-9906-3bae83608fe2",
      status: true,
      totalPrice: 748000000,
      feedbacks: [],
    },
  },
];

const renderProductItem = (order, index) => (
  <Row className="staff_order_frame" key={index}>
    <Col span={7} className="staff_order_left">
      {order.custom && order.custom.product && (
        <img
          className="img_main"
          src={order.custom.product.productImages}
          width={130}
          style={{ marginLeft: "10px" }}
        />
      )}

      {order.custom && order.custom.product && (
        <div style={{ textAlign: "center" }}>
          <Button className="button_custom">Size: {order.custom.sizes}</Button>
        </div>
      )}
      {(order.custom?.diamond || order.diamond) && (
        <img
          src={order.custom?.diamond?.image || order.diamond?.image}
          className={`staff_order_kimg ${
            order.custom?.product
              ? "staff_order_kimg_kid"
              : "staff_order_kimg_main"
          }`}
          alt={order.custom?.diamond?.diamondName || order.diamond?.diamondName}
        />
      )}
    </Col>

    <Col span={17} className="staff_order_right">
      {order.custom && order.custom.product && (
        <div className="info_product">
          <div>
            <GiBigDiamondRing size={25} className="icon_order" />
          </div>
          <div className="info_sub">
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
      <div className="info_diamond">
        <div>
          <IoDiamondOutline size={25} className="icon_order" />
        </div>
        <div className="info_sub">
          <p>
            {order.custom?.diamond?.diamondName || order.diamond.diamondName}
          </p>
          <div style={{ fontWeight: 400, fontSize: "13px" }}>
            <span>
              Carat: {order.custom?.diamond?.carat || order.diamond.carat}
            </span>
            {" - "}
            <span>
              Tinh Khiết :
              {order.custom?.diamond?.clarify || order.diamond.clarify}
            </span>
            {" - "}
            <span>
              Cấp Màu :
              {order.custom?.diamond?.colorLevel || order.diamond.colorLevel}
            </span>
            {" - "}
            Cắt: <span>{order.custom?.diamond?.cut || order.diamond.cut}</span>
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
          order.custom?.product?.totalPrice ||
          order.custom?.diamond?.totalPrice ||
          order.diamond.totalPrice
        ).toLocaleString("de-DE", {
          maximumFractionDigits: 2,
        })}{" "}
        đ
      </span>
    </Col>
  </Row>
);

function DetailNewOrder() {
  return (
    <div>
      <Row gutter={10}>
        <Col span={10}>
          <div className="khung1">
            <div className="code-user">ID: US123456</div>
            <div className="thong-tin-nguoi-mua" style={{ padding: "10px " }}>
              <span>Thông tin người mua</span>
            </div>

            <div className="thong-tin-chi-tiet">
              <div className="thong-tin-item">
                <p className="label">Tên:</p>
                <p className="value">Phạm Trung 123 Main Street, City</p>
              </div>
              <div className="thong-tin-item">
                <p className="label">Số Điện Thoại:</p>
                <p className="value">0123456789</p>
              </div>
              <div className="thong-tin-item">
                <p className="label">Email:</p>
                <p className="value">trungnguyen@example.com</p>
              </div>
              <div className="thong-tin-item">
                <p className="label">Địa Chỉ:</p>
                <p className="value">
                  123 Main Street, City,123 Main Street, City,123 Main Street,
                  City
                </p>
              </div>
              <div className="thong-tin-item">
                <p className="label">Ngày Sinh:</p>
                <p className="value">01/01/2003</p>
              </div>
            </div>
            <div style={{ marginTop: "10px", marginLeft: "auto" }}>
              <Button
                type="primary"
                danger
                style={{ marginRight: "10px", fontWeight: "bold" }}
              >
                Xóa
              </Button>

              <Button type="primary" className="custom-black-button">
                <Link
                  to="/staff-page/don-hang-moi"
                  style={{ fontWeight: "bold" }}
                >
                  Tạo đơn hàng
                </Link>
              </Button>
            </div>
          </div>
        </Col>
        <Col span={14}>
          <div className="khung">
            <div className="code-box">OD: OD123456</div>
            <div className="thong-tin-don-mua" style={{ padding: "10px " }}>
              <span>Thông tin đơn hàng</span>
            </div>

            <div>
              {data.map((order, index) => renderProductItem(order, index))}
            </div>
            <div className="repayp">
              <div className="total_pricep">
                <p>Tạm tính</p>
                <span style={{ color: "#15393f" }}>23.506.000đ</span>
              </div>
              <div className="total_pricep">
                <p>Chí phí vận chuyển</p>
                <span style={{ color: "#15393f" }}>Miễn Phí</span>
              </div>
            </div>

            <div className="repay2p">
              <div className="totalp">
                <p>Thành tiền </p>
                <span style={{ color: "#15393f" }}> 23.506.000đ</span>
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
