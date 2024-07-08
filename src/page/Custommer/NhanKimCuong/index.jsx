import { useEffect, useState } from "react";
import "./index.scss";
import { Select, Space, Pagination, Breadcrumb, theme } from "antd";
import { Col, Row } from "antd";
import { Button, Form, Input } from "antd";
import Container from "../../../components/container/Container";
import { Content } from "antd/es/layout/layout";
import { Link, useOutletContext } from "react-router-dom";
import Relate from "../../../components/carousel/related";
import { CartProduct } from "../../../components/Cardd/CartProduct";
import LoadingTruck from "../../../components/loading";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

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

function NhanKimCuong() {
  const { allProduct } = useOutletContext(); // Lấy allProduct từ context

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState("Nhẫn Kim Cương Nam");
  const [sortOrder, setSortOrder] = useState("default");
  const [priceFilter, setPriceFilter] = useState("default");
  const [loading, setLoading] = useState(true);
  const productsPerPage = 16;

  useEffect(() => {
    setCurrentPage(1);
  }, [currentCategory, sortOrder, priceFilter]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const filterByPrice = (product) => {
    if (priceFilter === "default") return true;
    const price = product.totalPrice;
    switch (priceFilter) {
      case "50-100":
        return price >= 50000000 && price <= 100000000;
      case "500-700":
        return price >= 50000000 && price <= 700000000;
      default:
        return true;
    }
  };

  const sortByPrice = (a, b) => {
    if (sortOrder === "default") return 0;
    return sortOrder === "asc"
      ? a.totalPrice - b.totalPrice
      : b.totalPrice - a.totalPrice;
  };

  const filteredProducts = allProduct
    ? allProduct
        .filter((product) => product.category.categoryName === currentCategory)
        .filter(filterByPrice)
        .sort(sortByPrice)
    : [];

  // Calculate the products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts
    ? filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    : [];

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Cho phép cuộn mượt mà
    });
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (value) => {
    setCurrentCategory(value);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  const handlePriceFilterChange = (value) => {
    setPriceFilter(value);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  if (loading) {
    return <LoadingTruck />; // Render LoadingTruck while loading
  }

  return (
    <div className="tong-nhan">
      <div className="banner">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/NhankimCuong.jpg?alt=media&token=15eaebb0-012e-443b-90de-d8bbca441d24.jpg"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <Container>
        <div className="chon-nhan-kim-cuong">
          <Content style={{ padding: "0 0px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>
                <Link to="/">Trang chủ</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/trang-suc-kim-cuong">Trang Sức Kim Cương</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Nhẫn Kim Cương</Breadcrumb.Item>
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
          <h1 style={{ color: "#15393f" }}>Nhẫn Kim Cương</h1>
          <div className="chproduct">
            <Row className="danh-muc">
              <Space wrap className="filter-space">
                <Select
                  defaultValue="Danh mục sản phẩm"
                  style={{ width: 170 }}
                  onChange={handleCategoryChange}
                  options={[
                    {
                      value: "Nhẫn Kim Cương Nam",
                      label: "Nhẫn Kim Cương Nam",
                    },
                    { value: "Nhẫn Kim Cương Nữ", label: "Nhẫn Kim Cương Nữ" },
                    {
                      value: "Bông Tai Kim Cương",
                      label: "Bông Tai Kim Cương",
                    },
                    {
                      value: "Lắc/ Vòng Tay Kim Cương",
                      label: "Lắc/ Vòng Tay Kim Cương",
                    },
                    {
                      value: "Mặt Dây Chuyền Kim Cương",
                      label: "Mặt Dây Chuyền Kim Cương",
                    },
                    {
                      value: "Dây Chuyền Kim Cương",
                      label: "Dây Chuyền Kim Cương",
                    },
                  ]}
                />
                <Select
                  defaultValue="Mức giá"
                  style={{ width: 150 }}
                  onChange={handlePriceFilterChange}
                  options={[
                    { value: "default", label: "Tất cả" },
                    { value: "20", label: "Dưới 20 triệu" },
                    { value: "20-50", label: "Từ 20-50 triệu" },
                    { value: "50-100", label: "Từ 50-100 triệu" },
                    { value: "100", label: "Trên 100 triệu" },
                  ]}
                />
                <Select
                  defaultValue="Sắp xếp"
                  style={{ width: 150 }}
                  onChange={handleSortChange}
                  options={[
                    { value: "default", label: "Mặc định" },
                    { value: "asc", label: "Giá tăng dần" },
                    { value: "desc", label: "Giá giảm dần" },
                  ]}
                />
              </Space>
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
                  key={product.productID}
                  className="gutter-row"
                  xs={24}
                  sm={12}
                  md={12}
                  lg={6}
                >
                  <div
                    style={{
                      textAlign: "center",
                      padding: "20px 40px",
                      width: "250px !important",
                    }}
                  >
                    <CartProduct
                      style={{ width: "250px !important" }}
                      product={product}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </div>
          <div className="chpage">
            <Pagination
              current={currentPage}
              total={filteredProducts ? filteredProducts.length : 0}
              pageSize={productsPerPage}
              onChange={handlePageChange}
            />
          </div>
          <h2 style={{ padding: "30px", fontWeight: "bold", color: "#15393f" }}>
            Có thể bạn quan tâm
          </h2>
          <Relate numberOfSlides={4} autoplay category="Nhẫn Cưới Kim Cương" />
          <div className="form-nhan">
            <h2 style={{ fontWeight: "400" }}>
              Nhận tư vấn miễn phí từ Diamond
            </h2>
            <i style={{ color: "gray" }}>
              Đăng kí ngay bên dưới để nhận thông tin từ chúng tôi
            </i>
            <div className="form-infor">
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

export default NhanKimCuong;
