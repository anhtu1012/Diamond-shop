/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Button,
  Col,
  Form,
  Input,
  Pagination,
  Row,
  Select,
  Space,
  theme,
} from "antd";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { CartProduct } from "../../../components/Cardd/CartProduct";
import LoadingTruck from "../../../components/loading";
import "./index.scss";

function FormDiamond({ product }) {
  const { allDiamond } = useOutletContext(); // Lấy allProduct từ context
  console.log(product);
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

  const [sortOrder, setSortOrder] = useState("default");
  const [priceFilter, setPriceFilter] = useState("default");
  const [loading, setLoading] = useState(true);
  const productsPerPage = 16;

  useEffect(() => {
    setCurrentPage(1);
  }, [sortOrder, priceFilter]);

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
      case "50-100":
        return price >= 50000000 && price <= 100000000;
      case "500-700":
        return price >= 500000000 && price <= 700000000;
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
  const filterByShape = (diamond) => {
    if (product === null) return true;
    return diamond.shape === product.shapeDiamond;
  };

  const filterByDimensions = (diamond) => {
    if (product === null) return true;
    return diamond.dimensions === product.dimensionsDiamond;
  };

  const filteredProducts = allDiamond
    ? allDiamond
        .filter(filterByPrice)
        .filter(filterByShape)
        .filter(filterByDimensions)
        .sort(sortByPrice)
    : [];

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  const handlePriceFilterChange = (value) => {
    setPriceFilter(value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [clickedProduct, setClickedProduct] = useState("");

  const handleClick = (product) => {
    if (clickedProduct === product) {
      setClickedProduct("");
    } else {
      setClickedProduct(product);
    }
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  if (!allDiamond) {
    return <LoadingTruck />;
  }

  return (
    <div className="form-main">
      <div className="san-pham">
        <Row className="danh-muc">
          <Col span={24}>
            <h1 className="tieu-de">Chọn Theo Phong Cách Của Bạn</h1>
          </Col>

          <Space wrap>
            <Select
              defaultValue="Mức giá"
              style={{ width: 150, paddingInlineStart: "3px" }}
              onChange={handlePriceFilterChange}
              options={[
                { value: "default", label: "Tất Cả" },
                { value: "50-100", label: "Từ 50-100 triệu" },
                { value: "500-700", label: "Từ 500-700 triệu" },
              ]}
            />
          </Space>

          <Space>
            <Select
              defaultValue="Sắp xếp"
              style={{ width: 150, paddingInlineStart: "10px" }}
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
            {currentProducts.map((diamond) => (
              <Col
                key={diamond.diamondID}
                className="gutter-row"
                xs={12}
                sm={12}
                md={12}
                lg={6}
              >
                <div style={{ padding: "20px 0px", width: "250px !important" }}>
                  <CartProduct
                    style={{ width: "250px !important" }}
                    diamond={diamond}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </div>
        <div className="chon-trang">
          <Pagination
            current={currentPage}
            total={filteredProducts.length}
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
    </div>
  );
}

export default FormDiamond;
