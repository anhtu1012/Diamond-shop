import { Button, Col, Rate, Row } from "antd";
import "./index.scss";
import { Link } from "react-router-dom";
import { GiBigDiamondRing } from "react-icons/gi";
import { IoDiamondOutline } from "react-icons/io5";
const data = [
  {
    key: "1",
    idorder: "OD123456",
    idcus: "US123456",
    image: "https://jemmia.vn/wp-content/uploads/2024/05/1_cam_03-copy.jpg",
    name: "NHẪN KIM CƯƠNG NỮ 18K ",

    rate: 5,
    shape: "Round 5.4 ly ",
    carat: null,

    clarify: null,

    colorLevel: null,

    cut: null,
    email: "hai263672@gmail.com",
    nameUs: "Nguyen Thanh Hai",
    imgDM: "https://igg.vn/images/upload/34201813229polished-diamond.png",
    nameDM: "KIM CƯƠNG VIÊN GIA 6LY8  ",
    codeDM: "7486091466",
    date: "29-5-2024",
    quantity: "2",
    phone: "0916306945",
    idproduct: "01141N",
    priceN: "16.329.600 ₫",
    priceDM: "",
    totalprice: "315.319.600 ₫",
    address: "24/9b võ văn hát, long trường, thủ đức",
  },
  {
    key: "2",
    idorder: "OD123456",
    idcus: "US123456",
    image: "https://igg.vn/images/upload/34201813229polished-diamond.png",
    name: "KIM CƯƠNG VIÊN GIA 6LY8 – 7486091466",
    rate: null,
    shape: "Round 5.4 ly ",
    carat: "0.6",

    clarify: "VS1",

    colorLevel: "F",

    cut: "Excellent",
    email: "hai263672@gmail.com",
    nameUs: "",
    imgDM: "",
    nameDM: " ",
    codeDM: "",
    date: "",
    quantity: "",
    phone: "",
    idproduct: "7486091466",
    priceN: "",
    priceDM: "298.990.000 ₫",
    totalprice: "",
    address: "",
  },
];
const renderProductItem = (
  index,
  name,
  rate,
  shape,
  carat,

  clarify,

  colorLevel,

  cut,
  idproduct,
  imgDM,
  nameDM,
  codeDM,
  priceN,
  priceDM,
  image
) => (
  <Row className="staff_order_frame" key={index}>
    <Col span={9} className="staff_order_left">
      <img
        className="img_main"
        src={image}
        width={130}
        style={{ marginLeft: "50px" }}
      />
      {imgDM && (
        <img
          src={imgDM}
          style={{ display: imgDM === null ? "none" : "block" }}
          className="staff_order_kimg_kid"
          alt={nameDM}
        />
      )}
    </Col>
    <Col span={15} className="staff_order_right">
      <div className="info_product">
        <div>
          <GiBigDiamondRing size={25} className="icon_order" />
        </div>
        <div className={`info_sub ${name === "" ? "info_sub_diamond" : ""}`}>
          <span>
            {name}- {shape}
          </span>
          <Rate
            disabled
            defaultValue={rate}
            style={{
              display: rate === null ? "none" : "block",
              fontSize: "15px",
            }}
          />
        </div>
      </div>

      <div className="info_diamond">
        <div>
          <IoDiamondOutline size={25} className="icon_order" />
        </div>
        <p>{nameDM}</p>
        <span>{codeDM}</span>
      </div>
    </Col>
    <Col span={24} className="price">
      <span
        style={{
          display: priceN === null ? "none" : "block",
          textAlign: "right",
        }}
      >
        {priceN}
      </span>
    </Col>
    <Col span={24} className="price">
      <span
        style={{
          display: priceDM === null ? "none" : "block",
          textAlign: "right",
        }}
      >
        {priceDM}
      </span>
    </Col>
  </Row>
);
function DetailProduct() {
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
              {" "}
              {data.map((order, index) =>
                renderProductItem(
                  index,
                  order.name,

                  order.rate,
                  order.shape,
                  order.carat,

                  order.clarify,

                  order.colorLevel,

                  order.cut,
                  order.idproduct,

                  order.imgDM,
                  order.nameDM,
                  order.codeDM,
                  order.priceN,
                  order.priceDM,
                  order.image
                )
              )}
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

export default DetailProduct;
