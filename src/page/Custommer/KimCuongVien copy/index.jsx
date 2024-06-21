import { Breadcrumb, Button, Col, Row, Select, Table, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { Link, useOutletContext } from "react-router-dom";
import Container from "../../../components/container/Container";
import "./index.scss";
import { useState, useEffect } from "react";
import { FaArrowDown } from "react-icons/fa";
import LoadingTruck from "../../../components/loading";
import { searchDiamond } from "../../../../services/Uservices";

function KimCuongVienTest() {
  const { allDiamond } = useOutletContext(); // Lấy allProduct từ context
  const [visibleProducts, setVisibleProducts] = useState(10);

  const handleLoadMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 10);
  };

  const [filteredData, setFilteredData] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState("price");
  const [selectedPriceRange, setSelectedPriceRange] = useState("price");

  const handlePriceChange = (event) => {
    setSelectedPriceRange(event.target.value);
  };
  const handleChange = (value) => {
    setSelectedSortOption(value);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    setFilteredData(allDiamond);
  }, []);
  const [clickedProduct, setClickedProduct] = useState("");

  const handleClick = (product) => {
    if (clickedProduct === product) {
      setClickedProduct("");
    } else {
      setClickedProduct(product);
    }
  };

  const recommendedProducts = [
    "F-FL-6.6",
    "F-VS2-4.8",
    "D-VVS1-6.3",
    "G-VS2-3.6",
    "F-VVS1-3.6",
    "F-VS1-3.6",
    "E-VS2-3.6",
  ];

  const columns = [
    {
      title: "Hình dạng",
      dataIndex: "shape",
      key: "shape",
      align: "center",
    },
    {
      title: "Trọng Lượng (cts)",
      dataIndex: "carat",
      key: "carat",
      align: "center",
    },
    {
      title: "Cấp Màu",
      dataIndex: "colorLevel",
      key: "colorLevel",
      align: "center",
    },
    {
      title: "Độ Tinh Khiết",
      dataIndex: "clarify",
      key: "clarify",
      align: "center",
    },
    {
      title: "Kiểm Định",
      dataIndex: "certificate",
      key: "certificate",
      align: "center",
    },
    {
      title: "Kích Thước (mm)",
      dataIndex: "dimensions",
      key: "dimensions",
      align: "center",
    },
    {
      title: "Phát Quang",
      dataIndex: "flourescence",
      key: "flourescence",
      align: "center",
    },
    {
      title: "Nét Cắt/Độ Bóng/Đối Xứng",
      dataIndex: "cut",
      key: "cut",
      align: "center",
    },
    {
      title: "Giá (VNĐ)",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text) => <span>{text.toLocaleString()}</span>,
      align: "center",
    },
    {
      title: "Chi tiết",
      dataIndex: "details",
      key: "details",
      render: (text, record) => (
        <Link to={`/diamond-details/${record.diamondID}`}>Chi tiết</Link>
      ),
      align: "center",
    },
  ];

  const handleSearch = async () => {
    console.log("Selected Options:", selectedOptions);
    console.log("Selected Shapes:", selectedShapes);
    console.log("Selected Price Range:", selectedPriceRange);

    const key = {
      carat: selectedOptions.carat,
      size: selectedOptions.dimensions,
      color: selectedOptions.colorLevel,
      clarify: selectedOptions.clarify,
      shape: selectedShapes[0], // only one shape should be selected
      price: selectedPriceRange,
      optionalPrice: selectedSortOption,
    };
    console.log(key);
    const res = await searchDiamond(key);
    console.log(res);
  };

  const handleReset = () => {};

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
    <div>
      <Container>
        <Content style={{ padding: "0 0px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link to="/">Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Kim Cương Viên</Breadcrumb.Item>
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
                      selectedShapes.includes("Round") ? "selected" : ""
                    }`}
                    onClick={() => handleShapeClick("Round")}
                  >
                    <img
                      src="https://jemmia.vn/wp-content/uploads/2023/06/diamond_shape_round.jpg"
                      alt="Round"
                      title="Round"
                      className="shape-img"
                    />
                  </div>
                  <div
                    className={`shape-selector ${
                      selectedShapes.includes("Emerald") ? "selected" : ""
                    }`}
                    onClick={() => handleShapeClick("Emerald")}
                  >
                    <img
                      src="https://jemmia.vn/wp-content/uploads/2023/06/diamond_shape_emerald-1.png"
                      alt="Emerald"
                      title="Emerald"
                      className="shape-img"
                    />
                  </div>
                  <div
                    className={`shape-selector ${
                      selectedShapes.includes("Heart") ? "selected" : ""
                    }`}
                    onClick={() => handleShapeClick("Heart")}
                  >
                    <img
                      src="https://trangkimluxury.vn/images/extend/2022/12/11/original/trai_1670760161.png"
                      alt="Heart"
                      className="shape-img"
                    />
                  </div>
                  <div
                    className={`shape-selector ${
                      selectedShapes.includes("Cushion") ? "selected" : ""
                    }`}
                    onClick={() => handleShapeClick("Cushion")}
                  >
                    <img
                      src="https://jemmia.vn/wp-content/uploads/2023/06/diamond_shape_cushion-1.png"
                      alt="Cushion"
                      className="shape-img"
                    />
                  </div>
                  <div
                    className={`shape-selector ${
                      selectedShapes.includes("Pear") ? "selected" : ""
                    }`}
                    onClick={() => handleShapeClick("Pear")}
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
                      "3.0 Trở Lên",
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
                      "9.0 Trở lên",
                    ].map((value, index) => (
                      <button
                        key={index}
                        className={`chon-kl-button ${
                          selectedOptions.dimensions === value ? "selected" : ""
                        }`}
                        onClick={() => handleOptionChange("dimensions", value)}
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
                          selectedOptions.colorLevel === value ? "selected" : ""
                        }`}
                        onClick={() => handleOptionChange("colorLevel", value)}
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
                          selectedOptions.clarify === value ? "selected" : ""
                        }`}
                        onClick={() => handleOptionChange("clarify", value)}
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
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                Sản Phẩm Gợi Ý
              </span>
            </Col>
            <Col span={24}>
              <Row gutter={[16, 16]}>
                {recommendedProducts.map((product, index) => (
                  <Col key={index} xs={3} style={{ marginBottom: "16px" }}>
                    <div
                      className="product-item"
                      style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        cursor: "pointer",
                        backgroundColor:
                          clickedProduct === product
                            ? "#15393f"
                            : "transparent",
                        color: clickedProduct === product ? "white" : "#15393f",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                      }}
                      onClick={() => handleClick(product)}
                    >
                      <p>{product}</p>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>

            <Col span={24}>
              <Table
                className="table"
                dataSource={(filteredData
                  ? filteredData
                  : allDiamond.filter((item) => {
                      if (
                        selectedShapes.length > 0 &&
                        !selectedShapes.includes(item.shape)
                      ) {
                        return false;
                      }
                      if (selectedPriceRange === "duoi100") {
                        return item.totalPrice < 100000000;
                      } else if (selectedPriceRange === "100den250") {
                        return (
                          item.totalPrice >= 100000000 &&
                          item.totalPrice <= 250000000
                        );
                      } else if (selectedPriceRange === "250den500") {
                        return (
                          item.totalPrice >= 250000000 &&
                          item.totalPrice <= 500000000
                        );
                      } else if (selectedPriceRange === "tren500") {
                        return item.totalPrice > 500000000;
                      }
                      return true;
                    })
                )

                  .sort((a, b) => {
                    if (selectedSortOption === "price2") {
                      return a.totalPrice - b.totalPrice;
                    } else if (selectedSortOption === "price3") {
                      return b.totalPrice - a.totalPrice;
                    }
                    return false;
                  })

                  .slice(0, visibleProducts)}
                columns={columns}
                pagination={false}
              />
            </Col>
          </Row>
          <Col span={24}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
              }}
            >
              <div>
                <div>
                  <div>
                    <span>
                      Hiển Thị{" "}
                      {Math.min(
                        filteredData || visibleProducts,
                        allDiamond.length
                      )}{" "}
                      Trên {allDiamond.length} Sản Phẩm
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ marginLeft: "10px" }}>
                <Button
                  type="primary"
                  style={{
                    color: "#15393f",
                    backgroundColor: "#fff",
                    borderColor: "#000",
                  }}
                  onClick={handleLoadMore}
                >
                  Xem thêm <FaArrowDown />
                </Button>
              </div>
            </div>
          </Col>
          <div className="divider-line"></div>
        </div>
      </Container>
    </div>
  );
}

export default KimCuongVienTest;
