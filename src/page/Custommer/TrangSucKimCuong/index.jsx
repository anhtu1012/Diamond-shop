import { Content } from "antd/es/layout/layout";
import Container from "../../../components/container/Container";
import "./index.scss";
import {
  Breadcrumb,
  Col,
  Row,
  Select,
  Space,
  theme,
  Form,
  Input,
  Button,
  Pagination,
} from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import CardIndex from "../../../components/Card";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const products = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `Product ${index + 1}`,
}));
const validateMessages = {
  required: "${label} không được để trống",
  types: {
    email: "Vui lòng điền đúng ${label}!",
    number: "Vui lòng điền đúng ${label}",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
const onFinish = (values) => {
  console.log(values);
};
function TrangSucKimCuong() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;

  // Calculate the products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [, /*value*/ setValue] = useState("");

  const handleChange = (value) => {
    setValue(value);
    console.log(value);
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div>
      <div className="bannert">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/%E1%BA%A2nh%20trang%20s%E1%BB%A9c%20kim%20c%C6%B0%C6%A1ng%20banner.jpg?alt=media&token=d29df524-0926-46ac-97a8-161e12557b89"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <Container>
        <div>
          <Content style={{ padding: "0 0px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>
                <Link to="/">Trang chủ</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Trang sức kim cương</Breadcrumb.Item>
            </Breadcrumb>
            <div
              style={{
                background: colorBgContainer,
                minHeight: 0,
                padding: 0,
                borderRadius: borderRadiusLG,
              }}
            ></div>
          </Content>
        </div>
        <Col span={24}>
          <h2 className="tieu-de">TRANG SỨC KIM CƯƠNG TỰ NHIÊN</h2>
        </Col>

        <div className="san-pham">
          <Row className="danh-muc">
            <Space wrap>
              <Select
                defaultValue="Danh mục sản phẩm"
                style={{ width: 170 }}
                onChange={handleChange}
                options={[
                  { value: "category1", label: "Nhẫn Cầu Hôn" },
                  { value: "category2", label: "Nhẫn Đính Hôn" },
                  {
                    value: "category4",
                    label: "Nhẫn Cưới Hỏi",
                    disabled: true,
                  },
                ]}
              />
              <Select
                defaultValue="Mức giá"
                style={{ width: 100, paddingInlineStart: "3px" }}
                onChange={handleChange}
                options={[
                  { value: "price1", label: "Từ 50-100 triệu" },
                  { value: "price2", label: "Từ 500-700 triệu" },
                  {
                    value: "price4",
                    label: "Từ 700 triệu trở lên",
                    disabled: true,
                  },
                ]}
              />
            </Space>

            <Space>
              <Select
                defaultValue="Sắp xếp"
                style={{ width: 100, paddingInlineStart: "10px" }}
                onChange={handleChange}
                options={[
                  { value: "price1", label: "Từ 90-100 triệu" },
                  { value: "price2", label: "Từ 530-600 triệu" },
                  { value: "price3", label: "Từ 690-900 triệu" },
                  {
                    value: "price4",
                    label: "Từ 900 triệu 1 tỷ",
                    disabled: true,
                  },
                ]}
              />
            </Space>
          </Row>
          <div className="product">
            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              {currentProducts.map((product) => (
                <Col
                  key={product.id}
                  className="gutter-row"
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                >
                  <Link to={`/product-details`}>
                    {" "}
                    {/* /${product.id} */}
                    <div
                      style={{ padding: "20px 0px", width: "250px !important" }}
                    >
                      <CardIndex
                        style={{ width: "250px !important" }}
                        product={product}
                      />
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
          <div className="chon-trang">
            <Pagination
              current={currentPage}
              total={products.length}
              pageSize={productsPerPage}
              onChange={handlePageChange}
            />
          </div>
        </div>
        <div className="thong-tin">
          <h2 style={{ fontWeight: "400" }}>Nhận tư vấn miễn phí từ Diamond</h2>
          <i style={{ color: "gray" }}>
            Đăng kí ngay bên dưới để nhận thông tin từ chúng tôi
          </i>
          <div className="thong-tin1">
            <Form
              xs={12}
              sm={12}
              md={12}
              lg={6}
              {...layout}
              name="nest-messages"
              onFinish={onFinish}
              style={{
                maxWidth: 500,
              }}
              validateMessages={validateMessages}
            >
              <Form.Item
                name={["Tên"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="Họ và tên" style={{ width: 500 }} />
              </Form.Item>
              <Form.Item
                name={["Email"]}
                rules={[
                  {
                    type: "email",
                    required: true,
                  },
                ]}
              >
                <Input placeholder="Email" style={{ width: 500 }} />
              </Form.Item>
              <Form.Item
                name={["Số điện thoại"]}
                rules={[
                  {
                    type: "number",
                    required: true,
                  },
                ]}
              >
                <Input placeholder="Số điện thoại" style={{ width: 500 }} />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  ...layout.wrapperCol,
                  offset: 8,
                }}
              >
                <div className="button">
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ backgroundColor: "black", borderColor: "black" }}
                  >
                    Tư vấn ngay
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Container>
      <Row
        gutter={30}
        className="section"
        style={{
          borderRadius: "2px",
          padding: "0px 0px 0px 0px",
        }}
      >
        <Col span={6}>
          <div className="image-banner">
            <img
              src="https://jemmia.vn/wp-content/uploads/2023/05/nhan-kim-cuong-tu-nhien-jemmia.vn_.jpg"
              alt=""
            />
            <div className="category">Nhẫn Kim Cương</div>
          </div>
        </Col>
        <Col span={6}>
          <div className="image-banner">
            <img
              src="https://jemmia.vn/wp-content/uploads/2023/05/vong-tay-kim-cuong-tu-nhien-jemmia.vn_.jpg"
              alt=""
            />
            <div className="category">Vòng Tay Kim Cương</div>
          </div>
        </Col>
        <Col span={6}>
          <div className="image-banner">
            <img
              src="https://jemmia.vn/wp-content/uploads/2023/05/mat-day-chuyen-kim-cuong-tu-nhien-jemmia.vn_.jpg"
              alt=""
            />
            <div className="category">Mặt Dây Chuyền Kim Cương</div>
          </div>
        </Col>
        <Col span={6}>
          <div className="image-banner">
            <img
              src="https://jemmia.vn/wp-content/uploads/2023/05/bong-tai-kim-cuong-tu-nhien-jemmia.vn_.jpg"
              alt=""
            />
            <div className="category">Bông Tai Kim Cương</div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default TrangSucKimCuong;
