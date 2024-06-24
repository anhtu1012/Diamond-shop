import { Button, Col, Rate, Row } from "antd";
import "./index.scss";
import { Link } from "react-router-dom";
import { GiBigDiamondRing } from "react-icons/gi";
import { IoDiamondOutline } from "react-icons/io5";

const data = [
  {
    orderDetailID: 27,
    productCustomize: null,
    diamond: {
      diamondID: "6421183449",
      diamondName: "KIM CƯƠNG VIÊN GIA 4LY9 – 6421183449",
      carat: 0.45,
      certificate: "GIA",
      clarify: "VVS2",
      color: "Trắng",
      colorLevel: "F",
      cut: "Excellent",
      shape: "Round",
      dimensions: 4.9,
      flourescence: "MEDIUM",
      image: "https://jemmia.vn/wp-content/uploads/2024/05/kim-cuong-vien.png",
      inputDate: "2024-06-03T07:00:00.000+00:00",
      originPrice: 42975000,
      status: false,
      totalPrice: 64462500,
      ratio: 0.5,
      feedbacks: [],
    },
    quantity: 1,
    price: 0,
  },
  {
    orderDetailID: 28,
    productCustomize: {
      prodcutCustomId: "P01134MD-1485173788",
      product: {
        createAt: "2024-06-08T22:46:20.747688",
        updateAt: "2024-06-08T22:46:20.747688",
        productID: "01134MD",
        productName: "MẶT DÂY CHUYỀN KIM CƯƠNG 18K",
        bathStone: "Kim Cương",
        brand: "diamond",
        goldType: "Vàng Trắng",
        goldWeight: 1.11,
        shapeDiamond: "Round",
        dimensionsDiamond: 5,
        message: "",
        oldGold: "18K",
        productType: "Mặt Dây Chuyền",
        quantity: 20,
        quantityStonesOfDiamond: 39,
        totalPrice: 6661760,
        rating: 4.5,
        status: true,
        stoneWeight: 0.5625,
        originalPrice: 2758400,
        wagePrice: 2000000,
        ratio: 0.4,
        category: {
          createAt: "2024-06-03T23:28:22.016562",
          updateAt: "2024-06-03T23:28:22.016562",
          categoryID: 6,
          categoryName: "Mặt Dây Chuyền Kim Cương",
        },
        productImages: [
          {
            imageId: 120,
            imageUrl:
              "https://jemmia.vn/wp-content/uploads/2024/04/1_cam_01-copy-3.jpg",
          },
          {
            imageId: 121,
            imageUrl:
              "https://jemmia.vn/wp-content/uploads/2024/04/1_cam_02-copy-3.jpg",
          },
          {
            imageId: 122,
            imageUrl:
              "https://jemmia.vn/wp-content/uploads/2024/04/3-copy-10.jpg",
          },
        ],
        sizes: [],
        feedbacks: [],
      },
      diamond: {
        diamondID: "1485173788",
        diamondName: "KIM CƯƠNG VIÊN GIA",
        carat: 0.61,
        certificate: "GIA",
        clarify: "VS1",
        color: "Trắng",
        colorLevel: "F",
        cut: "Excellent",
        shape: "Round",
        dimensions: 5.4,
        flourescence: "FAINT",
        image:
          "https://jemmia.vn/wp-content/uploads/2024/05/kim-cuong-vien.png",
        inputDate: "2024-06-03T07:00:00.000+00:00",
        originPrice: 340500000,
        status: false,
        totalPrice: 544800000,
        ratio: 0.6,
        feedbacks: [],
      },
      totalPrice: 145000000,
      size: 10,
    },
    diamond: null,
    quantity: 1,
    price: 123456,
  },
];

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

function DetailNewOrderDelivery() {
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
                <p className="value">Phạm Trung Main Street</p>
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
                  Lưu Hữu Phước, Đông Hoà, Dĩ An, Bình Dương, Việt Nam
                </p>
              </div>
              <div className="thong-tin-item">
                <p className="label">Ngày Sinh:</p>
                <p className="value">01/01/2003</p>
              </div>
            </div>
            <div style={{ marginTop: "10px", marginLeft: "auto" }}>
              <Button type="primary" className="custom-black-button">
                <Link
                  to="/delivery-page/cap-nhat-don-hang"
                  style={{ fontWeight: "bold" }}
                >
                  {/* Cập nhật đơn hàng */}Nhận đơn hàng
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

export default DetailNewOrderDelivery;
