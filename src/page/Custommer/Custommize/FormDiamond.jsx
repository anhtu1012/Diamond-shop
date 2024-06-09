/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./index.scss";
import { Select, Space, Pagination, theme, Button, Input, Form } from "antd";
import { Col, Row } from "antd";
import { useOutletContext } from "react-router-dom";
import { CartProduct } from "../../../components/Cardd/CartProduct";
import LoadingTruck from "../../../components/loading";

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
    ? allDiamond.filter(filterByPrice).filter(filterByShape).filter(filterByDimensions).sort(sortByPrice)
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

  const [visibleProducts, setVisibleProducts] = useState(10);

  const handleLoadMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 10);
  };

  const [filteredData, setFilteredData] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState("price1");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  const handlePriceChange = (event) => {
    setSelectedPriceRange(event.target.value);
  };
  const handleChange = (value) => {
    setSelectedSortOption(value);
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
  const handleSearch = () => {
    const filtered = allDiamond.filter((item) => {
      if (selectedOptions.carat !== "") {
        const [minCarat, maxCarat] = selectedOptions.carat.split("-");
        if (
          item.carat < parseFloat(minCarat) ||
          item.carat > parseFloat(maxCarat)
        ) {
          return false;
        }
      }
      if (selectedOptions.dimensions !== "") {
        const [minSize, maxSize] = selectedOptions.dimensions.split("-");
        if (
          item.dimensions < parseFloat(minSize) ||
          item.dimensions > parseFloat(maxSize)
        ) {
          return false;
        }
      }
      if (
        selectedOptions.colorLevel !== "" &&
        item.colorLevel !== selectedOptions.colorLevel
      ) {
        return false;
      }
      if (
        selectedOptions.clarify !== "" &&
        item.clarify !== selectedOptions.clarify
      ) {
        return false;
      }
      return true;
    });
    setFilteredData(filtered);
  };

  const handleReset = () => {
    setSelectedOptions({
      carat: "",
      dimensions: "",
      colorLevel: "",
      clarify: "",
    });
    setSelectedPriceRange("");
  };

  const [selectedOptions, setSelectedOptions] = useState({
    carat: "",
    dimensions: "",
    colorLevel: "",
    clarify: "",
  });

  const handleOptionChange = (type, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "" : value,
    }));
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedShapes, setSelectedShapes] = useState([]);

  const handleShapeClick = (shape) => {
    const isSelected = selectedShapes.includes(shape);

    if (isSelected) {
      setSelectedShapes(
        selectedShapes.filter((selectedShape) => selectedShape !== shape)
      );
    } else {
      setSelectedShapes([...selectedShapes, shape]);
    }
  };
  if (!allDiamond) {
    return <LoadingTruck />;
  }

  return (
    <div className="form-main">
      <div className="san-pham">
        <div className="dau-trang">
          <h2 style={{ fontWeight: "bold" }}>Công cụ tìm kim cương</h2>
          <h4 style={{ fontWeight: "bold" }}>
            Lọc để tìm viên kim cương hoàn hảo của bạn
          </h4>
        </div>

        <div className="dau-trang1">
          <Col span={24}>
            <span
              className="kc"
              style={{ fontSize: "25px", fontWeight: "bold" }}
            >
              Kim cương viên
            </span>
            <Select
              className="gia-tri"
              defaultValue="Tất cả sản phẩm"
              style={{ width: 170 }}
              onChange={handleChange}
              options={[
                { value: "price1", label: "Tất cả sản phẩm" },
                { value: "price2", label: "Từ thấp đến cao" },
                { value: "price3", label: "Từ cao đến thấp" },
                { value: "price4", label: "Sản phẩm mới" },
              ]}
            />
          </Col>
        </div>

        <div className="divider-line"></div>

        <div className="thanh-phan">
          <Row>
            <Col span={7}>
              <div className="chon-anh">
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                  Hình dạng(Shape)
                </span>
                <div className="shape-selector-row">
                  <div
                    className={`shape-selector ${
                      selectedShapes.includes(1) ? "selected" : ""
                    }`}
                    onClick={() => handleShapeClick(1)}
                  >
                    <img
                      src="https://jemmia.vn/wp-content/uploads/2023/06/diamond_shape_round.jpg"
                      alt="Round"
                      className="shape-img"
                    />
                  </div>
                  <div
                    className={`shape-selector ${
                      selectedShapes.includes(2) ? "selected" : ""
                    }`}
                    onClick={() => handleShapeClick(2)}
                  >
                    <img
                      src="https://jemmia.vn/wp-content/uploads/2023/06/diamond_shape_emerald-1.png"
                      alt="Emerald"
                      className="shape-img"
                    />
                  </div>
                  <div
                    className={`shape-selector ${
                      selectedShapes.includes(3) ? "selected" : ""
                    }`}
                    onClick={() => handleShapeClick(3)}
                  >
                    <img
                      src="https://trangkimluxury.vn/images/extend/2022/12/11/original/trai_1670760161.png"
                      alt="Heart"
                      className="shape-img"
                    />
                  </div>
                  <div
                    className={`shape-selector ${
                      selectedShapes.includes(4) ? "selected" : ""
                    }`}
                    onClick={() => handleShapeClick(4)}
                  >
                    <img
                      src="https://jemmia.vn/wp-content/uploads/2023/06/diamond_shape_cushion-1.png"
                      alt="Cushion"
                      className="shape-img"
                    />
                  </div>
                  <div
                    className={`shape-selector ${
                      selectedShapes.includes(5) ? "selected" : ""
                    }`}
                    onClick={() => handleShapeClick(5)}
                  >
                    <img
                      src="https://jemmia.vn/wp-content/uploads/2023/06/diamond_shape_pear-1.png"
                      alt="Pear"
                      className="shape-img"
                    />
                  </div>
                </div>
              </div>
              <div className="chon-gia" style={{ marginTop: "20px" }}>
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                  Giá(Price)
                </span>
                <select
                  style={{
                    marginTop: "10px",
                    width: "300px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    padding: "8px",
                  }}
                  onChange={handlePriceChange}
                >
                  <option value="">Tất cả sản phẩm</option>
                  <option value="duoi100">Dưới 100 triệu đồng</option>
                  <option value="100den250">Từ 100 - 250 triệu đồng</option>
                  <option value="250den500">Từ 250 - 500 triệu đồng</option>
                  <option value="tren500">Trên 500 triệu đồng</option>
                </select>
              </div>
            </Col>

            <Col span={17}>
              <div className="chon-thong-so">
                <div className="option">
                  <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                    Trọng Lượng (Carat)
                  </span>
                  <div className="chon-kl">
                    {[
                      "Tất cả",
                      "0.3 - 0.49",
                      "0.5 - 0.89",
                      "0.9 - 1.29",
                      "1.3 - 1.9",
                      "2.0 - 3.0",
                      "Trên 3.0",
                    ].map((value, index) => (
                      <button
                        key={index}
                        className={`chon-kl-button ${
                          selectedOptions.carat === value ? "selected" : ""
                        }`}
                        onClick={() => handleOptionChange("carat", value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="option">
                  <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                    Kích Thước (Size)
                  </span>
                  <div className="chon-kl">
                    {[
                      "Tất cả",
                      "4.3 - 4.9",
                      "5.0 - 5.9",
                      "6.0 - 6.9",
                      "7.0 - 7.9",
                      "8.0 - 8.9",
                      "Trên 9.0",
                    ].map((value, index) => (
                      <button
                        key={index}
                        className={`chon-kl-button ${
                          selectedOptions.size === value ? "selected" : ""
                        }`}
                        onClick={() => handleOptionChange("size", value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="option">
                  <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                    Cấp Màu (Color)
                  </span>
                  <div className="chon-kl">
                    {[
                      "Tất cả",
                      "D",
                      "E",
                      "F",
                      "G",
                      "H",
                      "I",
                      "J",
                      "K",
                      "L",
                      "M",
                    ].map((value, index) => (
                      <button
                        key={index}
                        className={`chon-kl-button ${
                          selectedOptions.color === value ? "selected" : ""
                        }`}
                        onClick={() => handleOptionChange("color", value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="option">
                  <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                    Độ Tinh Khiết (Clarity)
                  </span>
                  <div className="chon-kl">
                    {[
                      "Tất cả",
                      "IF",
                      "VVS1",
                      "VVS2",
                      "VS1",
                      "VS2",
                      "SI1",
                      "SI2",
                      "I1",
                      "I2",
                    ].map((value, index) => (
                      <button
                        key={index}
                        className={`chon-kl-button ${
                          selectedOptions.clarity === value ? "selected" : ""
                        }`}
                        onClick={() => handleOptionChange("clarity", value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="button-group">
                  <button className="reset-button" onClick={handleReset}>
                    Làm mới bộ lọc
                  </button>
                  <button className="search-button" onClick={handleSearch}>
                    Tìm kiếm
                  </button>
                </div>
              </div>
            </Col>

            <div className="divider-line"></div>
          </Row>
        </div>
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
