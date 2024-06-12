import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
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
  <div className="cart_product_frame" key={index}>
    <div className="code-boxn">{codep}</div>
    <Row className="cart_product_item">
      <div className="cart_detail">
        <Col span={6} className="img_cart">
          <img src={imageUrl} width={130} />
          {imgDM && (
            <img
              src={imgDM}
              style={{ display: imgDM === null ? "none" : "block" }}
              className="cart_product_imgdm"
              alt={nameDM}
            />
          )}
        </Col>
        <Col span={18} className="infor">
          <Col span={24} className="price">
            <span>{price}</span>
          </Col>
          <div className="infor_detail">
            <p>{name}</p>
            <span>{code}</span>
            <p>{nameDM}</p>
            <span>{codeDM}</span>
            <span>{size}</span>
          </div>
          <hr />
        </Col>
      </div>
      <div className="link-container">
        {link ? (
          <a href={link} className="detail-link">
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
      "https://glosbejewelry.net/upload/image/Nhan-kim-cuong%20(10).jpg",
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
      "https://glosbejewelry.net/upload/image/Nhan-kim-cuong%20(10).jpg",
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
      "https://glosbejewelry.net/upload/image/Nhan-kim-cuong%20(10).jpg",
    size: "45",
    link: "/staff-page/chi-tiet-don-hang",
  },
];

const NewOrder = () => {
  const navigate = useNavigate(); // Get the navigate function from useNavigate hook

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
            navigate // Pass navigate function as a prop
          )
        )}
      </div>
    </div>
  );
};

export default NewOrder;
