import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const renderProductItem = (
  
  index,
  codep,
  name,
  code,
  imgDM,
  nameDM,
  codeDM,
  price,
  imageUrl,
  size,
  link,
  navigate
) => (
  <div className="product_frame" key={index}>
    <div className="code-boxn">{codep}</div>
    <Row className="product_item">
      <div className="detail">
        <Col span={6} className="img">
          <img src={imageUrl} width={170} height={170} className="product_image" />
          {imgDM && (
            <img
              src={imgDM}
              style={{
                display: imgDM === null ? "none" : "block",
              }}
              className="product_imgdm"
              alt={nameDM}
            />
          )}
        </Col>
        <Col span={18} className="infor">
          <Col span={24} className="price">
            <span>{price}</span>
          </Col>
          <div className="infor_detail">
            <p style={{ marginBottom: "8px" }}>{name}</p>
            <span style={{ marginBottom: "8px" }}>{code}</span>
            <p style={{ marginBottom: "8px" }}>{nameDM}</p>
            <span style={{ marginBottom: "8px" }}>{codeDM}</span>
            <span>{size}</span>
          </div>

          <hr className="dong" />
        </Col>
      </div>
      <div className="link-container">
        {link ? (
          <a href={link} className="detail-link" style={{ color: "#e4bd7b" }}>
            Xem chi tiết
          </a>
        ) : (
          <span>Xem chi tiết</span>
        )}
      </div>
      <div className="button-container">
        <button
          className="consultation-button custom-color"
          onClick={() => navigate(link)}
          style={{fontWeight:"bold"}}
        >
          Nhận tư vấn
        </button>
      </div>
    </Row>
  </div>
);

const products = [
  {
    codep: "OD:123456",
    name: "NHẪN KIM CƯƠNG NỮ 18K",
    code: "GD0000Y011997",
    imgDM: "https://igg.vn/images/upload/34201813229polished-diamond.png",
    nameDM: "KIM CƯƠNG NỮ 18K",
    codeDM: "GD0000Y011997",
    price: "510,000,000",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/1_cam_03-1-1.jpg?alt=media&token=76e8593f-cd39-43b6-8fb4-3de486f76ee7",
    size: "45",
    link: "/staff-page/chi-tiet-don-hang",
  },
  {
    codep: "OD:123456",
    name: "NHẪN KIM CƯƠNG NỮ 18K VIP",
    code: "NKC12341241",
    imgDM: "",
    nameDM: "",
    codeDM: "",
    price: "500,000,000",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/1_cam_03-1-1.jpg?alt=media&token=76e8593f-cd39-43b6-8fb4-3de486f76ee7",
    size: "45",
    link: "/staff-page/chi-tiet-don-hang",
  },
  {
    codep: "OD:123456",
    name: "NHẪN KIM CƯƠNG NỮ 18K VIP",
    code: "NKC12341241",
    imgDM: "https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/1_cam_03-1-1.jpg?alt=media&token=76e8593f-cd39-43b6-8fb4-3de486f76ee7",
    nameDM: "",
    codeDM: "",
    price: "500,000,000",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/1_cam_03-1-1.jpg?alt=media&token=76e8593f-cd39-43b6-8fb4-3de486f76ee7",
    size: "45",
    link: "/staff-page/chi-tiet-don-hang",
  },
]; 

const NewOrder = () => {

  const navigate = useNavigate(); 


  return (
    <div>
      <div className="code-usern">ID: US123456</div>
      <div className="cart_product_list">
        {products.map((product, index) =>
          renderProductItem(
            index,
            product.codep,
            product.name,
            product.code,
            product.imgDM,
            product.nameDM,
            product.codeDM,
            product.price,
            product.imageUrl,
            product.size,
            product.link,

            navigate 

          )
        )}
      </div>
    </div>
  );
};

export default NewOrder;
