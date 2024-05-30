import { useState } from "react";
import "./index.scss";
import { Select, Space, Pagination, Breadcrumb, theme } from "antd";
import { Col, Row } from "antd";
import { Button, Form, Input } from "antd";
import Container from "../../../components/container/Container";
import { Content } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
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

function NhanCauHon() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;

  // Calculate the products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
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
      <div className="baner">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/nhan-cau-hon.jpg?alt=media&token=138db3a9-6be7-412e-81d7-bd34deedef32"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <Container>
        <div className="category-product">
          <Content style={{ padding: "0 0px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>
                <Link to="/">Trang chủ</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Nhẫn cầu hôn</Breadcrumb.Item>
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
          <h1>Nhẫn Cầu Hôn</h1>
          <div className="choose-product">
            <Row>
              <Col span={8}>
                <Space wrap>
                  <h3>Bộ lọc:</h3>
                  <Select
                    defaultValue="Danh mục sản phẩm"
                    style={{ width: 170 }}
                    onChange={handleChange}
                    options={[
                      { value: "category1", label: "Nhẫn Cầu Hôn" },
                      { value: "category2", label: "Nhẫn Cầu Hôn" },
                      {
                        value: "category4",
                        label: "Nhẫn Cầu Hôn",
                        disabled: true,
                      },
                    ]}
                  />
                  <Select
                    defaultValue="Mức giá"
                    style={{ width: 100 }}
                    onChange={handleChange}
                    options={[
                      { value: "price1", label: "Price 1" },
                      { value: "price2", label: "Price 2" },
                      { value: "price4", label: "Price 4", disabled: true },
                    ]}
                  />
                </Space>
              </Col>
              <Col span={8} offset={8}>
                <Space>
                  <h3>Sắp xếp:</h3>
                  <Select
                    defaultValue="Mức giá"
                    style={{ width: 170 }}
                    onChange={handleChange}
                    options={[
                      { value: "price1", label: "Price 1" },
                      { value: "price2", label: "Price 2" },
                      { value: "price3", label: "Price 3" },
                      { value: "price4", label: "Price 4", disabled: true },
                    ]}
                  />
                </Space>
              </Col>
            </Row>
          </div>
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
                      <CardIndex style={{  width: "250px !important" }} product={product} />
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
          <div className="choose-page">
            <Pagination
              current={currentPage}
              total={products.length}
              pageSize={productsPerPage}
              onChange={handlePageChange}
            />
          </div>
          <div className="form">
            <h2>Nhập thông tin để được tư vấn miễn phí</h2>
            <div className="form-dien">
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
                    <Button type="primary" htmlType="submit">
                      Tư vấn ngay
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default NhanCauHon;
