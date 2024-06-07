import {
  Breadcrumb,
  Col,
  Collapse,
  Divider,
  Image,
  Layout,
  Rate,
  Row,
  theme,
} from "antd";
import { useEffect, useState } from "react";
import Container from "../../../components/container/Container";
import "./index.scss";

import { TbTruckDelivery } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import CommitmentQuality from "../../../components/DamBaoChatLuong";
import Relate from "../../../components/carousel/related";

import { fetchDiamondById } from "../../../../services/Uservices";
import LoadingTruck from "../../../components/loading";

const { Content } = Layout;

const DiamondDetailss = () => {
  const [diamondDetail, setDiamondDetail] = useState(null);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { diamondID } = useParams();
  console.log(diamondID);
  const fetchProductByIds = async (diamondID) => {
    try {
      const response = await fetchDiamondById(diamondID);
      const productData = response.data;
      setDiamondDetail(productData);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    fetchProductByIds(diamondID);
  }, [diamondID]);

  if (!diamondDetail) {
    return <LoadingTruck />;
  }

  const text1 = `  Trang Sức Kim Cương Tại Diamond
   - Trang Sức Đa Dạng Mẫu Mã, Thiết Kế Theo Cá Nhân Hoá.
   - Trang Thiết Bị Công Nghệ Kiểm Định Hiện Đại Nhất.
   - Trải Nghiệm Dịch Vụ Kim Cương Đẳng Cấp.
  Kim Cương Viên Tại Diamond
   - Có giấy Kiểm Định GIA
   - Có xuất Hoá Đơn VAT
   - Nhập Khẩu Hải Quan Chính Ngạch
  `;
  const text2 = ` - Nếu nhận hàng mà sản phẩm không đạt chất lượng thì sao?
Quý khách hàng vui lòng liên hệ với tư vấn viên trong vòng 24 GIỜ kể từ khi nhận sản phẩm, Diamond sẽ hỗ trợ đổi hàng hoàn toàn miễn phí trong trường hợp sản phẩm bị lỗi do sản xuất.
  
   - Mua hàng online làm sao biết kích thước nhẫn nào vừa tay?
Diamond sẽ gửi tặng bộ đo ni tay đến tận nơi của Quý khách hoàn toàn miễn phí. Bạn chỉ cần chọn ni nhẫn phù hợp và thông báo với tư vấn viên của chúng tôi. Ngoài ra, Diamond hỗ trợ điều chỉnh size nhẫn miễn phí trọn đời trong trường hợp bạn muốn thay đổi.
  
   - Có gì để chứng minh tôi đã mua sản phẩm của Diamond không?
Sản phẩm Diamond được đảm bảo tính pháp lý qua 03 loại chứng từ sau: hóa đơn bán hàng, hợp đồng mua bán và hóa đơn VAT đảm bảo mọi quyền lợi của khách hàng.
  
   - Diamond có thiết kế sản phẩm theo yêu cầu không?
Diamond rất hân hạnh được cùng bạn tạo nên những thiết kế trang sức độc bản. Chúng tôi sẵn sàng lắng nghe ý tưởng, phác thảo, hoàn thiện và gia công theo yêu cầu riêng của bạn.
  `;

  return (
    <div>
      <Container>
        <div className="tabner">
          <Content style={{ padding: "0 0px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>
                <Link to="/">Trang chủ</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/nhan-cau-hon">Nhẫn cầu hôn</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Nhẫn kim cương 18k</Breadcrumb.Item>
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
                    {diamondDetail.totalPrice.toLocaleString("en-US", {
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
                      * Giá trên là giá vỏ trang sức chưa bao gồm viên chủ. Giá
                      sản phẩm thay đổi tùy theo trọng lượng thực tế của sản
                      phẩm. Vui lòng gọi 01234567890 để được hỗ trợ.{" "}
                    </h4>
                  </div>
                  <div className="custom">
                    <button className="custom_button1">Thêm Trang Sức</button>
                    <Link to="/">
                      <button className="custom_button2">
                        Thêm Vào Giỏ Hàng
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
                <td>Ơ{diamondDetail.dimensions}</td>
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
                  <Collapse
                    size="small"
                    style={{ width: 500 }}
                    items={[
                      {
                        key: "1",
                        label: <strong>Vì sao chọn Diamond</strong>,
                        children: (
                          <pre style={{ whiteSpace: "pre-wrap" }}>{text1}</pre>
                        ),
                      },
                    ]}
                  />
                  <Collapse
                    size="small"
                    style={{ width: 500 }}
                    items={[
                      {
                        key: "1",
                        label: <strong>Bình luận và đánh giá</strong>,
                        children: (
                          <pre style={{ whiteSpace: "pre-wrap" }}>{text2}</pre>
                        ),
                      },
                    ]}
                  />
                  <Collapse
                    size="small"
                    style={{ width: 500 }}
                    items={[
                      {
                        key: "1",
                        label: <strong>Một số câu hỏi thường gặp</strong>,
                        children: (
                          <pre style={{ whiteSpace: "pre-wrap" }}>{text1}</pre>
                        ),
                      },
                    ]}
                  />
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
