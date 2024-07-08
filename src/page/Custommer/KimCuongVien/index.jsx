import { Breadcrumb, Button, Col, Row, Select, Table, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { Link, useOutletContext } from "react-router-dom";
import Container from "../../../components/container/Container";
import "./index.scss";
import { useState, useEffect } from "react";
import { FaArrowDown } from "react-icons/fa";
import LoadingTruck from "../../../components/loading";
import { LuDot } from "react-icons/lu";
import { useMediaQuery } from "react-responsive";

function KimCuongVien() {
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
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Cho phép cuộn mượt mà
    });
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

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });

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

  const mobileColumns = [
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

  const handleSearch = () => {
    const filtered = allDiamond.filter((item) => {
      if (!item || !item.shape) {
        console.log("Item or item.shape does not exist:", item);
        return false;
      }
      if (selectedShapes.length > 0 && !selectedShapes.includes(item.shape)) {
        return false;
      }

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
      if (selectedPriceRange === "duoi100" && item.totalPrice >= 100000000) {
        return false;
      }
      if (
        selectedPriceRange === "100den250" &&
        (item.totalPrice < 100000000 || item.totalPrice > 250000000)
      ) {
        return false;
      }
      if (
        selectedPriceRange === "250den500" &&
        (item.totalPrice < 250000000 || item.totalPrice > 500000000)
      ) {
        return false;
      }
      if (selectedPriceRange === "tren500" && item.totalPrice <= 500000000) {
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
    setSelectedShapes([]);
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
    <div className="tong-kim-cuong-vien">
      <Container>
        <Content style={{ padding: "0 0px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link to="/">Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/kim-cuong-vien">Kim Cương Viên</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Kim Cương GIA</Breadcrumb.Item>
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
            <Col span={7} xs={24} sm={24} md={24} lg={7}>
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

            <Col span={17} xs={24} sm={24} md={24} lg={17}>
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
                columns={isTabletOrMobile ? mobileColumns : columns}
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
        {/* ---------------------------------------------------------------------------------------------------------------------------- */}
        <div className="kien-thuc-kc">
          <h2 className="kc-gia">
            Kim Cương GIA - Hàng thật, giá thật, chất lượng thật!
          </h2>
          <h3 className="kc-gia1">
            Kim cương đang dần chứng minh được sức hút của mình trong thế giới
            trang sức. Cũng vì lẽ đó mà trong những năm gần đây, việc mua bán và
            trao đổi kim cương đã trở nên nhộn nhịp hơn bao giờ hết. Vậy nên,
            giấy chứng nhận Kim Cương GIA được ra đời như một chuẩn mực về chất
            lượng của kim cương để giúp mọi người dễ dàng phân biệt được hàng
            thật và những kẻ mạo danh. Hãy cùng Diamond tìm hiểu về loại giấy
            chứng nhận quyền lực số 1 thế giới dành cho kim cương qua bài viết
            sau.
          </h3>
          <h2 className="kc-gia">
            1. Kim Cương GIA là gì? - Giấy chứng nhận uy tín số 1 thế giới!
          </h2>
          <h3 className="kc-gia1">
            GIA là từ viết tắt của Gemological Institute of America, đây là một
            tổ chức phi lợi nhuận về giám định đá quý của Mỹ. GIA không trao đổi
            hay mua bán kim cương, đá quý và cũng không đại diện cho một tổ
            chức, doanh nghiệp nào. Chính vì lý do này mà giấy chứng nhận của
            GIA luôn khách quan và đảm bảo quyền lợi cho người mua bán kim
            cương, đá quý. Kim Cương GIA là một khái niệm dùng để chỉ những viên
            kim cương đã được tổ chức GIA cấp giấy chứng nhận về chất lượng. Đây
            được xem là tổ chức giám định kim cương uy tín nhất thế giới hiện
            nay.
          </h3>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/GIA.jpg?alt=media&token=cadc5bd1-ac2d-4d10-abd5-56752e0a9212"
            style={{
              width: "70%",
              display: " block",
              margin: "0 auto",
              paddingTop: "20px",
            }}
          />
          <h5 className="kc-gia2">
            Giấy chứng nhận GIA về chất lượng của kim cương
          </h5>
          <h3 className="kc-gia1">
            Trong giấy chứng nhận của GIA sẽ có tất cả thông tin cần thiết về
            viên kim cương, bao gồm:
          </h3>
          <h3 className="kc-gia1">
            <LuDot />
            Màu sắc (Color)
          </h3>
          <h3 className="kc-gia1">
            <LuDot />
            Giác cắt (Cut)
          </h3>
          <h3 className="kc-gia1">
            <LuDot />
            Mức độ tinh khiết (Clarity)
          </h3>
          <h3 className="kc-gia1">
            <LuDot />
            Trọng lượng (Carat)
          </h3>
          <h3 className="kc-gia1">
            <LuDot />
            Các thông số về tỷ lệ (Proportions)
          </h3>
          <h3 className="kc-gia1">
            <LuDot />
            Vị trí của những tạp chất trong viên kim cương (Clarity
            Characteristics)
          </h3>
          <h3 className="kc-gia1">
            Kim Cương GIA được nhiều người ưa chuộng vì sự minh bạch, rõ ràng
            trong nguồn gốc và chất lượng của viên kim cương, tạo điều kiện
            thuận lợi trong các giao dịch trao đổi hoặc mua bán.
          </h3>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/4C.jpg?alt=media&token=093908dc-7980-408d-9e86-f9357ec490fb"
            style={{
              width: "70%",
              display: " block",
              margin: "0 auto",
              paddingTop: "20px",
            }}
          />
          <h5 className="kc-gia2">Tiêu chuẩn 4C của Kim Cương GIA</h5>
          <h2 className="kc-gia">
            2. Không phải tất cả kim cương đều là Kim Cương GIA!
          </h2>
          <h3 className="kc-gia1">
            Phần lớn những viên kim cương trên thị trường hiện nay là Kim Cương
            GIA, tuy nhiên không phải tất cả các viên kim cương đều được tổ chức
            GIA giám định qua. Những viên kim cương quá nhỏ và không có giá trị
            lớn thường không được đem đi giám định. Bên cạnh đó, cũng có nhiều
            viên kim cương được giám định bởi các tổ chức khác, thay vì GIA.
          </h3>
          <h3 className="kc-gia1">
            Để đảm bảo được chất lượng cũng như tính minh bạch của viên kim
            cương, bạn hãy yêu cầu những cơ sở kinh doanh đá quý cho bạn xem
            giấy chứng nhận của viên kim cương đó. Những thương hiệu kinh doanh
            kim cương uy tín, chất lượng sẽ luôn chủ động trong việc đảm bảo
            tính minh bạch của sản phẩm bằng cách cung cấp đầy đủ thông tin về
            giấy chứng nhận hoặc hướng dẫn khách hàng tra cứu thông tin online
            trên website của tổ chức GIA.
          </h3>
          <h2 className="kc-gia">
            3. Tại sao chỉ có duy nhất khái niệm Kim Cương GIA?
          </h2>
          <h3 className="kc-gia1">
            Trong lĩnh vực kiểm định kim cương thì ngoài GIA còn có các tổ chức
            khác như AGS, IGI, EGL, HRD,.... Tuy nhiên, trên thị trường hiện nay
            chỉ có duy nhất khái niệm Kim Cương GIA vì những lý do sau:
          </h3>
          <h3 className="kc-gia1">
            <LuDot />
            GIA cung cấp một thang điểm đánh giá chất lượng của kim cương vô
            cùng khắt khe dựa vào tiêu chuẩn 4C bao gồm: Color (màu sắc),
            Clarity (độ tinh khiết), Cut (giác cắt), Carat weight (trọng lượng).
            Các tổ chức kiểm định khác hầu như đều sử dụng hệ thống đánh giá
            được GIA nghiên cứu và phát minh.
          </h3>
          <h3 className="kc-gia1">
            <LuDot />
            GIA là một tổ chức hoàn toàn độc lập, không đại diện cho lợi ích của
            bất cứ cá nhân, doanh nghiệp hay tổ chức nào. Do đó, những thông tin
            GIA cung cấp luôn đảm bảo được tính khách quan, minh bạch, rõ ràng.
          </h3>
          <h3 className="kc-gia1">
            <LuDot />
            GIA không tham gia vào việc mua bán kim cương và đá quý. Cơ quan này
            chỉ cung cấp dịch vụ kiểm định chất lượng của kim cương.
          </h3>
          <h3 className="kc-gia1">
            <LuDot />
            GIA còn là tổ chức giáo dục uy tín trong việc đào tạo nên những
            chuyên gia kiểm định đá quý trên toàn thế giới.
          </h3>
          <h3 className="kc-gia1">
            <LuDot />
            GIA là trung tâm được giao phó cho việc kiểm định những viên kim
            cương nổi tiếng nhất thế giới như: Kim Cương Xanh Hope (Hy Vọng)
            (45.52 carat), Kim Cương De Beers Centenary (273.85 carat),....
          </h3>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/To-chuc-giam-dinh.jpg?alt=media&token=add54e54-7905-4808-807e-617c2fcfd6b1"
            style={{
              width: "70%",
              display: " block",
              margin: "0 auto",
              paddingTop: "20px",
            }}
          />
          <h5 className="kc-gia2">
            Các tổ chức giám định kim cương, đá quý phổ biến trên thế giới
          </h5>
          <h2 className="kc-gia">4. Tiêu chuẩn 4C của Kim Cương GIA</h2>
          <h3 className="kc-gia1">
            Vào năm 1939, GIA đã kết hợp cùng Đế chế Kim Cương De Beers hùng
            mạnh thiết lập Tiêu chí 4C để đánh giá chất lượng kim cương, dựa
            trên 4 yếu tố.
          </h3>
          <h2 className="kc-gia">4.1. Color - Màu sắc </h2>
          <h3 className="kc-gia1">
            Màu sắc của kim cương còn được những người thợ kim hoàn gọi là nước
            màu kim cương, ví dụ như: Kim Cương GIA nước D, nước E,.... Thang
            chuẩn của nước màu kim cương theo tiêu chuẩn của GIA sẽ bắt đầu từ
            D. Lý do vì sao GIA không bắt đầu ở những nước màu cao hơn như A, B,
            C mà phải bắt đầu từ D là để tránh sự nhầm lẫn với những hệ thống
            phân loại nước màu kim cương ngẫu nhiên của nhiều công ty khác.
          </h3>
          <h3 className="kc-gia1">
            Các cấp màu của Kim Cương GIA từ nước D đến nước Z không liên quan
            đến màu sắc mà liên quan đến độ trong của màu sắc và được chia thành
            5 nhóm như sau:
          </h3>
          <h3 className="kc-gia1">
            <LuDot />
            Kim cương nước D, E, F được xếp vào nhóm không màu
          </h3>
          <h3 className="kc-gia1">
            <LuDot />
            Kim cương nước G, H, I, J thuộc vào nhóm gần như không màu
          </h3>
          <h3 className="kc-gia1">
            <LuDot />
            Kim cương nước K, L, M sẽ bị lẫn một ít sắc vàng nhưng khó nhận biết
            bằng mắt thường
          </h3>
          <h3 className="kc-gia1">
            <LuDot />
            Kim cương nước N, O, P, Q, R thường sẽ có màu vàng rất nhạt
          </h3>
          <h3 className="kc-gia1">
            <LuDot />
            Kim cương nước S - Z sẽ có màu vàng nhạt.
          </h3>
          <h3 className="kc-gia1">
            Vậy nên, kim cương nước D là những viên kim cương tinh khiết và quý
            giá nhất. Khi kim cương có nước màu càng thấp thì giá trị sẽ không
            cao. Tuy nhiên, nếu một viên kim cương có sắc vàng dưới nước Z trong
            thang chuẩn 4C của Kim Cương GIA thì lại được xem là có màu sắc lạ
            mắt và có giá trị cao. Những màu sắc lạ của Kim Cương GIA bao gồm
            đỏ, hồng, xanh da trời, vàng, xanh lam, đen. Nâu và vàng được xem là
            những màu sắc lạ phổ biến nhất.
          </h3>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/Cac-nuoc-mau.jpg?alt=media&token=589146a5-512d-44da-bee6-0e513abcf27b"
            style={{
              width: "70%",
              display: " block",
              margin: "0 auto",
              paddingTop: "20px",
            }}
          />
          <h5 className="kc-gia2">
            Các nước màu của kim cương theo tiêu chuẩn GIA
          </h5>
          <h2 className="kc-gia">4.2. Clarity - Độ tinh khiết</h2>
          <h3 className="kc-gia1">
            Độ tinh khiết của kim cương đại diện cho khả năng hiển thị những tạp
            chất, đặc điểm trong và ngoài của viên Kim Cương GIA. Các tạp chất
            và tỳ vết này xảy ra trong suốt quá trình hình thành của kim cương
            nên chúng thể hiện rõ sự phát triển của tinh thể Carbon.
          </h3>
          <h3 className="kc-gia1">
            Để kiểm tra được độ tinh khiết thì các chuyên gia kiểm định Kim
            Cương GIA sẽ sử dụng các thiết bị kính lúp (loup) ở x10 hay các kính
            hiển vi trong phòng thí nghiệm. Mặc dù phân loại kim cương là một
            công việc mang tính chủ quan, tuy nhiên với tiêu chuẩn 4C của Kim
            Cương GIA thì các nhà kiểm định có thể dễ dàng phân loại được độ
            tinh khiết và độ trong của kim cương. Một viên kim cương có độ tinh
            khiết càng cao thì giá trị của chúng sẽ càng cao.
          </h3>
          <h3 className="kc-gia1">
            Một viên kim cương được đánh giá là F (Flawless) được xem là một
            viên kim cương hoàn hảo, không tỳ vết. Còn nếu được đánh giá là IF
            (Internal Flawless) nghĩa là hoàn hảo ở bên trong. Đây là những viên
            kim cương không phát hiện được tạp chất hoặc tỳ vết khi soi dưới
            kính loup có x10.
          </h3>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/Cac-cap-bac.jpg?alt=media&token=a779b12d-7643-4de9-9153-77253436423b"
            style={{
              width: "70%",
              display: " block",
              margin: "0 auto",
              paddingTop: "20px",
            }}
          />
          <h5 className="kc-gia2">
            Các cấp bậc về độ tinh khiết của kim cương theo tiêu chuẩn GIA
          </h5>
          <h2 className="kc-gia">4.3. Cut - Giác cắt</h2>
          <h3 className="kc-gia1">
            Nhiều bạn vẫn nhầm lẫn giác cắt với hình dáng bên ngoài của viên kim
            cương. “Cut” trong tiêu chuẩn 4C của Kim Cương GIA sẽ được đánh giá
            theo tỷ lệ, không phải dựa vào hình dáng bên ngoài.{" "}
          </h3>
          <h3 className="kc-gia1">
            Khi đánh giá giác cắt của Kim Cương GIA, các mặt của viên kim cương
            sẽ được đo lường cụ thể về góc, chiều dài, độ đối xứng. Các thông số
            cơ bản sẽ bao gồm:
          </h3>
          <h3 className="kc-gia1">
            <LuDot />
            Table (mặt bàn): Thường có hình lục giác, là giao diện lớn nhất của
            viên kim cương. Kích thước của table sẽ được đo theo đơn vị mm rồi
            chia cho đường kính trung bình để ra được phần trăm. Khi phần trăm
            của table càng lớn thì độ phản xạ ánh sáng sẽ giảm đi rất nhiều.
            Kích thước của table lý tưởng là 53-60%.
          </h3>
          <h3 className="kc-gia1">
            <LuDot />
            Depth (chiều sâu): Chiều sâu của Kim Cương GIA sẽ bằng tổng độ dài
            từ đỉnh đến đáy của viên kim cương chia cho đường kính trung bình.
            Chiều sâu lý tưởng là 60%. Nếu viên kim cương quá sâu, nó sẽ xuất
            hiện những màu tối. Còn nếu viên kim cương quá nông, ánh sáng sẽ bị
            lọt ra ngoài.
          </h3>
          <h3 className="kc-gia1">
            <LuDot />
            Độ dày cạnh: Đây là nơi giao nhau giữa mặt trên và mặt dưới của một
            viên kim cương. Nếu viền quá dày thì sẽ làm giảm vẻ đẹp tổng thể và
            tăng khối lượng của viên kim cương một cách không cần thiết.
          </h3>
          <h3 className="kc-gia1">
            <LuDot />
            Culet: Là điểm dưới cùng nằm ở phần đáy của viên kim cương. Nếu
            culet quá lớn thì sẽ ảnh hưởng đến các góc cắt và làm mất vẻ đẹp
            thẩm mỹ. Vì vậy, nhiều viên Kim Cương GIA không có culet hoặc là sẽ
            được xử lý để culet trở nên nhỏ hơn.
          </h3>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/Thong-so-quan-trong.jpg?alt=media&token=a6b8caa9-5a05-4508-9ec3-dddf4faaebc5"
            style={{
              width: "70%",
              display: " block",
              margin: "0 auto",
              paddingTop: "20px",
            }}
          />
          <h5 className="kc-gia2">
            Các thông số quan trọng trong việc đánh giá giác cắt của Kim Cương
            GIA
          </h5>
          <h2 className="kc-gia">4.4. Carat Weight - Trọng lượng</h2>
          <h3 className="kc-gia1">
            Carat là đơn vị đo trọng lượng của kim cương. Một carat tương đương
            với 0.2 gram. Kim cương phải được cân bằng những chiếc cân điện tử
            có độ chính xác rất cao, độ chia nhỏ nhất của chúng sẽ đến phần
            nghìn carat. Đơn vị của Kim Cương GIA sẽ được tính đến chữ số thập
            phân thứ 2, ví dụ như 2.65 carat, 4.00 carat,... Trọng lượng là một
            trong những đặc điểm quan trọng nhất để định giá một viên kim cương.
            Trọng lượng của viên kim cương càng lớn thì sẽ càng đắt đỏ.
          </h3>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/Carat.jpg?alt=media&token=cb57e641-6117-4b86-b182-f56aed1ffe19"
            style={{
              width: "70%",
              display: " block",
              margin: "0 auto",
              paddingTop: "20px",
            }}
          />
          <h5 className="kc-gia2">
            Carat (ct) là đơn vị đo trọng lượng của kim cương
          </h5>
          <h2 className="kc-gia">
            5. Kim Cương GIA có đắt đỏ hơn kim cương không giấy chứng nhận
          </h2>
          <h3 className="kc-gia1">
            Bạn nên biết rằng giá trị của một viên kim cương thì phần lớn sẽ phụ
            thuộc vào chất lượng và độ quý hiếm của viên kim cương đó. Việc kim
            cương đã qua chứng nhận bởi tổ chức GIA không khiến cho giá trị của
            nó tăng lên hoặc giảm xuống. Tuy nhiên, tất cả những viên kim cương
            nổi tiếng đều phải qua kiểm định của GIA. Số tiền bạn phải bỏ ra để
            giám định Kim Cương GIA không cao, chỉ khoảng 100-150 USD. Rõ ràng
            là chi phí nhỏ này không thể làm ảnh hưởng đến giá trị cuối cùng của
            viên kim cương.{" "}
          </h3>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/Giay-chung-nhan.jpg?alt=media&token=a7e9991c-3883-4f0a-859f-f34335caa5e79"
            style={{
              width: "70%",
              display: " block",
              margin: "0 auto",
              paddingTop: "20px",
            }}
          />
          <h5 className="kc-gia2">
            Giấy chứng nhận Kim Cương GIA không làm tăng hoặc giảm giá trị của
            viên kim cương
          </h5>
          <h3 className="kc-gia1">
            Bằng mắt thường thì chúng ta rất khó để phân biệt được sự khác nhau
            của những viên kim cương. Chính vì vậy, Kim Cương GIA sẽ giúp người
            mua dễ dàng so sánh chất lượng của những viên kim cương và chọn được
            viên kim cương thích hợp nhất với yêu cầu của họ.{" "}
          </h3>
          <h2 className="kc-gia">6. Tại sao phải mua Kim Cương GIA?</h2>
          <h3 className="kc-gia1">
            Kim Cương GIA rất phổ biến trong thị trường kim cương hiện nay. Tuy
            nhiên, nếu bạn là một người sành về kim cương và hiểu rõ nguồn gốc,
            đặc điểm, giá trị của viên kim cương thì sẽ không bắt buộc phải mua
            Kim Cương GIA.
          </h3>
          <h3 className="kc-gia1">
            Nhưng nếu bạn chỉ là một người yêu thích kim cương thông thường thì
            bạn khó mà phát hiện được chất lượng và giá trị thật sự của một viên
            kim cương. Một viên kim cương nặng 0.99 carat sẽ có giá trị thấp hơn
            một viên kim cương 1.10 carat. Tuy nhiên, nếu không có giấy chứng
            nhận GIA, bạn sẽ không thể nào nhận ra điểm chênh lệch của 2 viên
            kim cương này. Thậm chí, với những người thợ lành nghề cũng không dễ
            dàng xác minh được độ tinh khiết và giác cắt của viên kim cương nếu
            như không được hỗ trợ bởi những thiết bị và máy móc hiện đại.
          </h3>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/Ch%E1%BB%A9ng%20nh%E1%BA%ADn%20GIA.jpg?alt=media&token=fbda187d-9ae5-42dc-a30c-bddf3f260d6d"
            style={{
              width: "70%",
              display: " block",
              margin: "0 auto",
              paddingTop: "20px",
            }}
          />
          <h5 className="kc-gia2">
            Giấy chứng nhận GIA cung cấp đầy đủ các thông tin về chất lượng, đặc
            điểm, trọng lượng của viên kim cương
          </h5>
          <h3 className="kc-gia1">
            Bởi vậy, Diamond khuyên bạn nên mua những viên Kim Cương GIA đã được
            kiểm định chất lượng minh bạch và rõ ràng. Điều này không chỉ bảo vệ
            bạn trước những “gian thương” mà còn giúp cho việc trao đổi mua bán
            những viên kim cương sau này cũng thuận lợi hơn rất nhiều.
          </h3>
          <h2 className="kc-gia">7. Nên mua Kim Cương GIA ở đâu? </h2>
          <h3 className="kc-gia1">
            Vì kim cương khá quý giá, đắt đỏ nên mọi người thường rất cẩn trọng
            khi mua những món trang sức kim cương. Họ không chỉ quan tâm đến vẻ
            đẹp bên ngoài mà còn chú trọng đến chất lượng của những viên kim
            cương.
          </h3>
          <h3 className="kc-gia1">
            Nên mua Kim Cương GIA ở đâu để đảm bảo uy tín và chất lượng luôn
            được mọi người quan tâm. Phần lớn những cửa hàng kim cương hiện nay
            đều có bán cả hai loại Kim Cương GIA và kim cương không giấy chứng
            nhận. Nếu không cẩn thận, bạn sẽ dễ dàng bị “qua mặt” khi mà chủ cửa
            hàng đưa cho bạn xem một viên Kim Cương GIA nhưng đến khi giao hàng
            lại là một viên kim cương “vô danh” khác.
          </h3>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/Aaaa.jpg?alt=media&token=786a6008-ed17-4391-822b-6985df37d9e7"
            style={{
              width: "70%",
              display: " block",
              margin: "0 auto",
              paddingTop: "20px",
            }}
          />
          <h5 className="kc-gia2">
            Để giúp bạn hoàn toàn yên tâm về chất lượng của những viên kim
            cương, tại Diamond chỉ mua bán duy nhất kim cương tự nhiên GIA đã
            qua kiểm định chất lượng nghiêm ngặt. Chúng tôi nói không với những
            viên kim cương không có giấy chứng nhận.
          </h5>
          <h3 className="kc-gia1">
            Ngoài ra, tất cả trang sức kim cương tại Diamond đều có màu sắc nước
            D, là nước màu tinh khiết nhất, sang trọng nhất và quý giá nhất.
            Chúng tôi luôn đặt vẻ đẹp hoàn hảo và chất lượng của những viên kim
            cương lên hàng đầu để mang lại những trải nghiệm tốt nhất cho quý
            khách hàng.
          </h3>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/Aaaa.jpg?alt=media&token=786a6008-ed17-4391-822b-6985df37d9e7"
            style={{
              width: "70%",
              display: " block",
              margin: "0 auto",
              paddingTop: "20px",
            }}
          />
          <h5 className="kc-gia2">
            Diamond - Tinh hoa của thế giới Kim Cương GIA
          </h5>
          <h3 className="kc-gia1">
            Diamond cũng có đội ngũ lành nghề với 15 năm kinh nghiệm luôn dành
            tất cả sự am hiểu và tận tâm để chế tác ra những món trang sức kim
            cương độc đáo, tinh tế, tôn lên vẻ đẹp của người sở hữu chúng. Đặc
            biệt, với chính sách bảo hành trọn đời và chế độ hậu mãi minh bạch
            giúp bạn an tâm trao niềm tin và nhận lấy chất lượng phục vụ tuyệt
            vời nhất.
          </h3>
          <h3 className="kc-gia1">
            Diamond vừa cung cấp đến bạn những thông tin về Kim Cương GIA và
            những đặc điểm của giấy chứng nhận uy tín, quyền lực này. Khi đến
            với Diamond, bạn hoàn toàn có thể yên tâm 100% trang sức kim cương
            của chúng tôi đều đã được cấp giấy chứng nhận chất lượng từ tổ chức
            GIA. Nếu có bất cứ thắc mắc nào về Kim Cương GIA, liên hệ ngay với
            Diamond để được tư vấn tận tâm trước khi bạn đưa ra lựa chọn cuối
            cùng nhé!
          </h3>
          <h2 className="kc-gia">Thông tin liên hệ: Diamond</h2>
          <h3 className="kc-gia1">
            <LuDot />
            Địa chỉ: Lưu Hữu Phước, Đông Hoà, Dĩ An, Bình Dương, Việt Nam
          </h3>
          <h3 className="kc-gia1">
            <LuDot />
            Website: https://kingdiamond.vn /
          </h3>
          <h3 className="kc-gia1">
            <LuDot />
            Điện thoại: 0123 456 789
          </h3>
        </div>
      </Container>
    </div>
  );
}

export default KimCuongVien;
