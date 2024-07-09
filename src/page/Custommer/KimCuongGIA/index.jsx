import { useEffect, useState } from "react";
import "./index.scss";
import { Select, Space, Pagination, Breadcrumb, theme } from "antd";
import { Col, Row } from "antd";
import { Button, Form, Input } from "antd";
import Container from "../../../components/container/Container";
import { Content } from "antd/es/layout/layout";
import { Link, useOutletContext } from "react-router-dom";
import Relate from "../../../components/carousel/related";
import LoadingTruck from "../../../components/loading";
import { CartProduct } from "../../../components/Cardd/CartProduct";

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

function KimCuongGIA() {
  const { allDiamond } = useOutletContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("default");
  const [priceFilter, setPriceFilter] = useState("default");
  const [loading, setLoading] = useState(true);
  const productsPerPage = 16;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const filterByPrice = (diamond) => {
    if (priceFilter === "default") return true;
    const price = diamond.totalPrice;
    switch (priceFilter) {
      case "0-10":
        return price >= 0 && price <= 10000000;
      case "10-50":
        return price >= 10000000 && price <= 50000000;
      case "50-100":
        return price >= 50000000 && price <= 100000000;
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

  const filteredDiamond = allDiamond
    ? allDiamond.filter(filterByPrice).sort(sortByPrice)
    : [];

  const indexOfLastDiamond = currentPage * productsPerPage;
  const indexOfFirstDiamond = indexOfLastDiamond - productsPerPage;
  const currentDiamond = filteredDiamond.slice(
    indexOfFirstDiamond,
    indexOfLastDiamond
  );

  const handlePageChange = (pageNumber) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Cho phép cuộn mượt mà
    });
    setCurrentPage(pageNumber);
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
    <div className="tong-kim-cuong-gia">
      <div className="baner">
        <img
          src="https://www.tierra.vn/files/banner-danh-m-c-PnlesVGpjV.jpg"
          style={{ width: "100%", height: "400px" }}
        />
      </div>
      <Container>
        <div className="category-product">
          <Content style={{ padding: "0 0px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>
                <Link to="/">Trang chủ</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/kim-cuong-gia">Kim Cương Viên</Link>
              </Breadcrumb.Item>
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
          <h1>Kim Cương Viên</h1>
          <div className="choose-product">
            <Row>
              <Col span={24}>
                <Space wrap>
                  <Select
                    defaultValue="Mức giá"
                    style={{ width: 100, paddingInlineStart: "3px" }}
                    onChange={handleSortChange}
                    options={[
                      { value: "default", label: "Mặc định" },
                      { value: "asc", label: "Giá tăng dần" },
                      { value: "desc", label: "Giá giảm dần" },
                    ]}
                  />
                </Space>

                <Space>
                  <Select
                    defaultValue="Sắp xếp"
                    style={{ width: 150, paddingInlineStart: "10px" }}
                    onChange={handlePriceFilterChange}
                    options={[
                      { value: "default", label: "Tất cả" },
                      { value: "0-10", label: "Dưới 10 triệu" },
                      { value: "10-50", label: "Từ 10-50 triệu" },
                      { value: "50-100", label: "Từ 50-100 triệu" },
                      { value: "100-500", label: "Từ 100-500 triệu" },
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
              {currentDiamond.map((diamond) => (
                <Col
                  key={diamond.diamonddID}
                  className="gutter-row"
                  xs={24}
                  sm={12}
                  md={12}
                  lg={6}
                >
                  <div
                    style={{ padding: "20px 0px", width: "250px !important" }}
                  >
                    <CartProduct
                      style={{ width: "250px !important" }}
                      diamond={diamond}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </div>
          <Pagination
            current={currentPage}
            pageSize={productsPerPage}
            total={filteredDiamond.length}
            style={{ display: "flex", justifyContent: "center" }}
            onChange={handlePageChange}
          />
        </div>
        <Relate />
        <div className="form-nhan">
          <h2 style={{ fontWeight: "400" }}>Nhận tư vấn miễn phí từ Diamond</h2>
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
      </Container>
    </div>
  );
}

export default KimCuongGIA;
