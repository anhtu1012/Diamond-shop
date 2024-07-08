import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Image,
  Breadcrumb,
  Layout,
  theme,
  Rate,
  Divider,
} from "antd";
import Container from "../../../components/container/Container";
import "./index.scss";

import { Link, useNavigate, useParams } from "react-router-dom";
import CommitmentQuality from "../../../components/DamBaoChatLuong";
import { TbTruckDelivery } from "react-icons/tb";
import Relate from "../../../components/carousel/related";

import { fetchProductById } from "../../../../services/Uservices";
import LoadingTruck from "../../../components/loading";
import ToggleTab from "../../../components/caccauhoivisao";

const { Content } = Layout;

const ProductDetails = () => {
  const [productDetail, setProductDetail] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [feedBacks, setFeedBacks] = useState([]);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { product_id } = useParams();

  const fetchProductByIds = async (product_id) => {
    try {
      const response = await fetchProductById(product_id);
      const productData = response.data;
      setProductDetail(productData);
      setFeedBacks(response.data.feedbacks);
      setMainImage(productData.productImages[0].imageUrl);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    fetchProductByIds(product_id);
  }, [productDetail]);

  if (!productDetail) {
    return <LoadingTruck />;
  }

  const thumbnails = productDetail.productImages
    ? productDetail.productImages.map((image) => image.imageUrl)
    : [];

  const handleMainImageClick = () => {
    const nextIndex = (currentImageIndex + 1) % thumbnails.length;
    setCurrentImageIndex(nextIndex);
    setMainImage(thumbnails[nextIndex]);
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
    setMainImage(thumbnails[index]);
  };
  const handleAddDetailsClick = () => {
    navigate("/tuy-chinh", { state: { product: productDetail } });
  };

  return (
    <div className="tong-product-detail">
      <Container>
        <div className="tabner">
          <Content style={{ padding: "0 0px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>
                <Link to="/">Trang chủ</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{productDetail.productName}</Breadcrumb.Item>
            </Breadcrumb>
            <div
              style={{
                background: colorBgContainer,
                minHeight: 0,
                padding: 0,
                borderRadius: borderRadiusLG,
              }}
            />
          </Content>
          <div className="product-details">
            <Row justify="center" gutter={[16, 16]}>
              <Col span={12} xs={24} sm={24} md={24} lg={12}>
                <div className="image">
                  <Image.PreviewGroup
                    preview={{
                      onChange: (current, prev) =>
                        console.log(
                          `current index: ${current}, prev index: ${prev}`
                        ),
                    }}
                  >
                    <Image
                      isZoomed
                      width={400}
                      src={mainImage}
                      onClick={handleMainImageClick}
                    />
                    <div className="image-add">
                      <Row gutter={56}>
                        {thumbnails.map((thumb, index) => (
                          <Col key={thumb} span={6}>
                            <Image
                              width={100}
                              src={thumb}
                              onClick={() => handleThumbnailClick(index)}
                              className="thumbnail"
                            />
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </Image.PreviewGroup>
                </div>
              </Col>
              <Col span={12} xs={24} sm={24} md={24} lg={12}>
                <div className="description-product">
                  <h1 style={{ color: "#15393f" }}>
                    {productDetail.productName}
                  </h1>
                  <Rate disabled defaultValue={productDetail.rating} />
                  <h5 style={{ marginTop: "10px", fontWeight: "300" }}>
                    {productDetail.productID}
                  </h5>
                  <h2
                    style={{
                      display: "flex",
                      fontWeight: "bold",
                      color: "#15393f",
                    }}
                  >
                    {productDetail.totalPrice.toLocaleString("vi-VN", {
                      maximumFractionDigits: 0,
                    })}{" "}
                    đ
                  </h2>
                  <h4>
                    <a href="/chinh-sach-doi-tra">Chính sách hoàn trả</a>
                  </h4>
                  <div className="delivery-icon">
                    <h4>Vận chuyển:</h4>
                    <div className="icon-delivery">
                      <TbTruckDelivery />
                    </div>
                    <div className="giao-hang">
                      <h4>Miễn phí vận chuyển</h4>
                    </div>
                  </div>
                  <div className="huong-dan">
                    <h5>
                      <a
                        href="/huong-dan-do-ni"
                        style={{ color: "red", marginTop: "10px" }}
                      >
                        Hướng dẫn chọn size (Đo ni)
                      </a>
                    </h5>
                  </div>
                  <div className="quantity">
                    <h4>Số lượng: </h4>

                    <input
                      className="count"
                      type="text"
                      value={"1"}
                      readOnly
                      style={{ width: "40px", textAlign: "center" }}
                    />
                  </div>
                  <div className="focus">
                    <h4>
                      * Giá trên là giá vỏ trang sức chưa bao gồm viên chủ. Giá
                      sản phẩm thay đổi tùy theo trọng lượng thực tế của sản
                      phẩm. Vui lòng gọi 01234567890 để được hỗ trợ.{" "}
                    </h4>
                  </div>
                  <div className="custom">
                    <button
                      className="custom_button1"
                      onClick={handleAddDetailsClick}
                    >
                      Thêm Kim Cương
                    </button>
                    <Link to="/">
                      <button className="custom_button2">
                        Tư Vấn Sản Phẩm
                      </button>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <Divider style={{ fontSize: "30px", color: "#15393f" }}>
            Chi Tiết Sản Phẩm
          </Divider>
          <div className="table-container">
            <table className="custom-table">
              <tbody>
                <tr>
                  <th>Thương hiệu</th>
                  <td>
                    <Link
                      to="/"
                      style={{
                        color: "black",
                        textDecoration: "none",
                        fontFamily: "Roboto",
                      }}
                    >
                      {productDetail.brand}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th>Loại sản phẩm</th>
                  <td>{productDetail.category.categoryName}</td>
                </tr>
                <tr>
                  <th>Kích thước đá chủ</th>
                  <td>
                    {productDetail.shapeDiamond}{" "}
                    {productDetail.dimensionsDiamond} ly
                  </td>
                </tr>
                <tr>
                  <th>Loại đá tẩm</th>
                  <td>{productDetail.bathStone}</td>
                </tr>
                <tr>
                  <th>Số lượng đá tẩm</th>
                  <td>{productDetail.quantityStonesOfDiamond}</td>
                </tr>
                <tr>
                  <th>Trọng lượng đá (ct)</th>
                  <td>{productDetail.stoneWeight}</td>
                </tr>
                <tr>
                  <th>Loại vàng</th>
                  <td>{productDetail.goldType}</td>
                </tr>
                <tr>
                  <th>Tuổi vàng</th>
                  <td>{productDetail.oldGold}</td>
                </tr>
                <tr>
                  <th>Trọng lượng vàng</th>
                  <td>{productDetail.goldWeight} chỉ</td>
                </tr>
                <tr>
                  <th>Chất liệu khác</th>
                  <td>{productDetail.message}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="details">
            <Row justify="center" gutter={[16, 16]}>
              <Col span={12} xs={24} sm={24} md={24} lg={12}>
                <div className="intro">
                  <ToggleTab feedBacks={feedBacks} product={product_id} />
                </div>
              </Col>
              <Col span={12} xs={24} sm={24} md={24} lg={12}>
                <div className="elementor-column">
                  <CommitmentQuality />
                </div>
              </Col>
            </Row>
          </div>
          <div className="product-relate-container">
            <h2 style={{ fontWeight: "bold" }}>Các sản phẩm liên quan</h2>

            <Relate numberOfSlides={4} autoplay category="Nhẫn Kim Cương Nữ" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetails;
