import { useEffect, useState } from "react";
import "./index.scss";
import { Select, Space, Pagination, Breadcrumb, theme } from "antd";
import { Col, Row } from "antd";
import { Button, Form, Input } from "antd";
import Container from "../../../components/container/Container";
import { Content } from "antd/es/layout/layout";
import { Link } from "react-router-dom";

import Relate from "../../../components/carousel/related";

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

function BoTrangSucCuoi() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
      <div className="bannerbts">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/NhanCuoi.jpg?alt=media&token=108cfbb8-74bb-4e76-ab75-058e9b9a8ea0.jpg"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <Container>
        <div className="cproductbts">
          <Content style={{ padding: "0 0px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>
                <Link to="/">Trang chủ</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/">Trang Sức Cưới</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Bộ Trang Sức Cưới</Breadcrumb.Item>
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
          <h1 style={{ marginBottom: "30px" }}>Bộ Trang Sức Cưới Kim Cương</h1>

          <div className="chproductbts">
            <Row>
              <Col span={8}>
                <Space wrap>
                  <h3>Bộ lọc:</h3>
                  <Select
                    defaultValue="Danh mục sản phẩm"
                    style={{ width: 170 }}
                    onChange={handleChange}
                    options={[
                      { value: "category1", label: "Bộ Sưu Tập Anh Quốc" },
                      { value: "category2", label: "Bộ Sưu Tập Thụy Điển" },
                      {
                        value: "category4",
                        label: "Bộ Sưu Tập Việt Nam",
                        disabled: true,
                      },
                    ]}
                  />
                  <Select
                    defaultValue="Mức giá"
                    style={{ width: 130 }}
                    onChange={handleChange}
                    options={[
                      { value: "price1", label: "Dưới 100 triệu" },
                      { value: "price2", label: "Dưới 200 triệu" },
                      { value: "price3", label: "Dưới 300 triệu" },
                      {
                        value: "price4",
                        label: "Dưới 400 triệu",
                        disabled: true,
                      },
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
                      { value: "price1", label: "Từ 50 - 100 triệu" },
                      { value: "price2", label: "Từ 100 - 200 triệu" },
                      { value: "price3", label: "Dưới 400 triệu" },
                      { value: "price4", label: "Trên 1 tỷ", disabled: true },
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
                     
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
          <div className="cpagebts">
            <Pagination
              current={currentPage}
              total={products.length}
              pageSize={productsPerPage}
              onChange={handlePageChange}
            />
          </div>
          <h2 style={{ padding: "30px", fontWeight: "400" }}>
            Có thể bạn quan tâm
          </h2>
          <Relate numberOfSlides={4} autoplay category="NHẪN KIM CƯƠNG" />
          <div className="form-nhanbts">
            <h2 style={{ fontWeight: "400" }}>
              Nhận tư vấn miễn phí từ Diamond
            </h2>
            <i style={{ color: "grey" }}>
              Đăng kí ngay bên dưới để nhận thông tin từ chúng tôi
            </i>
            <div className="form-inforbts">
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
        </div>
      </Container>
    </div>
  );
}

export default BoTrangSucCuoi;
