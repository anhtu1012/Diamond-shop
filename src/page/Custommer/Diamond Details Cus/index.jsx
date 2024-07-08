import {
  Breadcrumb,
  Col,
  Divider,
  Image,
  Layout,
  Rate,
  Row,
  message,
  theme,
} from "antd";
import { useEffect, useState } from "react";
import Container from "../../../components/container/Container";
import "./index.scss";

import { TbTruckDelivery } from "react-icons/tb";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import CommitmentQuality from "../../../components/DamBaoChatLuong";
import Relate from "../../../components/carousel/related";

import { addToCart, fetchDiamondById } from "../../../../services/Uservices";
import LoadingTruck from "../../../components/loading";
import ToggleTab from "../../../components/caccauhoivisao";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/counterSlice";

const { Content } = Layout;

const DiamondDetailss = () => {
  const { setQuantity } = useOutletContext();
  const [diamondDetail, setDiamondDetail] = useState(null);
  const [feedBacks, setFeedBacks] = useState([]);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { diamondID } = useParams();
  const fetchProductByIds = async (diamondID) => {
    try {
      const response = await fetchDiamondById(diamondID);
      const productData = response.data;
      setDiamondDetail(productData);
      setFeedBacks(response.data.feedbacks);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    fetchProductByIds(diamondID);
  }, [diamondDetail]);
  const hanldeAddtoCart = async () => {
    try {
      const data = {
        userId: user.userID,
        productId: diamondDetail.diamondID,
      };
      await addToCart(data);
      setQuantity((prev) => prev + 1);
      message.success("Thêm vào giỏ hàng thành công!");
    } catch (error) {
      message.error("Kim cương đã tồn tài trong giỏ hàng");
      console.error("Error adding to cart:", error);
    }
  };

  if (!diamondDetail) {
    return <LoadingTruck />;
  }
  const handleAddDetailsClick = () => {
    navigate("/tuy-chinh", { state: { diamond: diamondDetail } });
  };
  return (
    <div>
      <Container>
        <div className="tabner">
          <Content style={{ padding: "0 0px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>
                <Link to="/">Trang chủ</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{diamondDetail.diamondName}</Breadcrumb.Item>
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
                    <Image isZoomed width={400} src={diamondDetail.image} />
                  </Image.PreviewGroup>
                </div>
              </Col>
              <Col span={12} xs={24} sm={24} md={24} lg={12}>
                <div className="description-product">
                  <h1 style={{ color: "#15393f" }}>
                    {diamondDetail.diamondName}
                  </h1>
                  <Rate disabled defaultValue={5} />
                  <h5 style={{ marginTop: "10px", fontWeight: "300" }}>
                    {diamondDetail.diamondID}
                  </h5>
                  <h2
                    style={{
                      display: "flex",
                      fontWeight: "bold",
                      color: "#15393f",
                    }}
                  >
                    {diamondDetail.totalPrice.toLocaleString("vi-VN", {
                      maximumFractionDigits: 0,
                    })}{" "}
                    đ
                  </h2>
                  <h4>
                    <Link to="/chinh-sach-doi-tra">Chính sách hoàn trả</Link>
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
                      * Viên kim cương có xuất xứ hoàn toàn từ tự nhiên. Có giấy
                      kiểm định chắc chẽ được cung cấp từ GIA. Được bảo hành
                      trọn đời. Nếu sản phẩm có vấn đề gì liên hệ Diamond King
                      để được hỗ trợ tận tình. Vui lòng gọi 01234567890 để được
                      hỗ trợ.{" "}
                    </h4>
                  </div>
                  <div
                    className={
                      diamondDetail.status === false ? "customNone" : "custom"
                    }
                  >
                    <button
                      className="custom_button1"
                      onClick={handleAddDetailsClick}
                      disabled={diamondDetail.status === false}
                    >
                      Thêm Vào Tùy Chỉnh
                    </button>
                    <button
                      className="custom_button2"
                      onClick={hanldeAddtoCart}
                      disabled={diamondDetail.status === false}
                    >
                      Thêm Vào Giỏ Hàng
                    </button>
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
              <tr>
                <th>CẤP MÀU</th>
                <td>{diamondDetail.colorLevel}</td>
              </tr>
              <tr>
                <th>ĐỘ TINH KHIẾT</th>
                <td>{diamondDetail.clarify}</td>
              </tr>
              <tr>
                <th>MÃ GIA</th>
                <td>{diamondDetail.diamondID}</td>
              </tr>
              <tr>
                <th>MÀU SẮC</th>
                <td>{diamondDetail.color}</td>
              </tr>
              <tr>
                <th>NÉT CẮT</th>
                <td>{diamondDetail.cut}</td>
              </tr>
              <tr>
                <th>PHÁT QUANG</th>
                <td>{diamondDetail.flourescence}</td>
              </tr>
              <tr>
                <th>HÌNH DẠNG</th>
                <td>{diamondDetail.shape}</td>
              </tr>
              <tr>
                <th>KÍCH THƯỚC (MM)</th>
                <td>{diamondDetail.dimensions}</td>
              </tr>
              <tr>
                <th>TRỌNG LƯỢNG (CTS)</th>
                <td>{diamondDetail.carat}</td>
              </tr>
            </table>
          </div>
          <div className="details">
            <Row justify="center" gutter={[16, 16]}>
              <Col span={12} xs={24} sm={24} md={24} lg={12}>
                <div className="intro">
                  <ToggleTab feedBacks={feedBacks} diamond={diamondID} />
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
            <h2>Các sản phẩm liên quan</h2>

            <Relate numberOfSlides={4} autoplay category="Nhẫn Kim Cương Nữ" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DiamondDetailss;
