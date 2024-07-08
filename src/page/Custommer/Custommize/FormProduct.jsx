/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./index.scss";
import { Select, Space, Pagination, theme, Button, Input, Form } from "antd";
import { Col, Row } from "antd";
import { useOutletContext } from "react-router-dom";
import { CartProduct } from "../../../components/Cardd/CartProduct";
import LoadingTruck from "../../../components/loading";

function FormProuct({ diamond }) {
  const { allProduct } = useOutletContext(); // Lấy allProduct từ context

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

  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState([
    "Nhẫn Kim Cương Nam",
    "Nhẫn Kim Cương Nữ",
    "Bông Tai Kim Cương",
    "Lắc/ Vòng Tay Kim Cương",
    "Mặt Dây Chuyền Kim Cương",
    "Dây Chuyền Kim Cương",
  ]);
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
        return price >= 500000000 && price <= 700000000;
      default:
        return true;
    }
  };
  const filterByShape = (product) => {
    if (!diamond || !diamond.shape) return true;
    return diamond.shape === product.shapeDiamond;
  };

  const filterByDimensions = (product) => {
    if (!diamond || !diamond.dimensions) return true;
    return diamond.dimensions === product.dimensionsDiamond;
  };
  const sortByPrice = (a, b) => {
    if (sortOrder === "default") return 0;
    return sortOrder === "asc"
      ? a.totalPrice - b.totalPrice
      : b.totalPrice - a.totalPrice;
  };

  const filteredProducts = allProduct
    ? allProduct
        .filter((product) =>
          currentCategory.includes(product.category.categoryName)
        )
        .filter(filterByShape)
        .filter(filterByDimensions)
        .filter(filterByPrice)
        .sort(sortByPrice)
    : [];

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Cho phép cuộn mượt mà
    });
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (value) => {
    setCurrentCategory([value]);
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
    return <LoadingTruck />;
  }

  return (
    <div className="form-main">
      <div className="san-pham">
        <Col span={24}>
          <h1 className="tieu-de">TRANG SỨC KIM CƯƠNG TỰ NHIÊN</h1>
        </Col>
        <Row className="danh-muc" style={{display: 'flex', justifyContent: 'center'}}>
          <Space wrap className="filter-space">
            <Select
              defaultValue="Danh mục sản phẩm"
              style={{ width: 170 }}
              onChange={handleCategoryChange}
              options={[
                { value: "Nhẫn Kim Cương Nam", label: "Nhẫn Kim Cương Nam" },
                { value: "Nhẫn Kim Cương Nữ", label: "Nhẫn Kim Cương Nữ" },
                { value: "Bông Tai Kim Cương", label: "Bông Tai Kim Cương" },
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
                <div style={{ padding: "20px 0px", width: "250px !important" }}>
                  <CartProduct
                    style={{ width: "250px !important" }}
                    product={product}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </div>
        <div
          className="chon-trang"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Pagination
            current={currentPage}
            total={filteredProducts.length}
            pageSize={productsPerPage}
            onChange={handlePageChange}
          />
        </div>
      </div>
      <div className="form-nhan">
        <h2 style={{ fontWeight: "400" }}>Nhận tư vấn miễn phí từ Diamond</h2>
        <i style={{ color: "gray" }}>
          Đăng kí ngay bên dưới để nhận thông tin từ chúng tôi
        </i>
        <div className="form-infor">
          <Form
            xs={24}
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
  );
}

export default FormProuct;
