import { useEffect, useState } from "react";
import { Breadcrumb, Button, Col, Row, notification } from "antd";
import { GiBigDiamondRing, GiDiamondHard } from "react-icons/gi";
import { IoDiamondOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import Container from "../../../components/container/Container";
import "./index.scss";
import FormProduct from "./FormProduct";
import FormDiamond from "./FormDiamond";
import Complete from "./Complete";

function Custommize() {
  const [currentStep, setCurrentStep] = useState(1);

  const [product, setProduct] = useState(null);
  const [idProduct, setIdProduct] = useState(null);
  const [diamond, setDiamond] = useState(null);
  const [idDiamond, setIdDiamond] = useState(null);
  const [idComplete, setIdComplete] = useState(null);
  const [totalPriceCustom, setTotalPriceCusTom] = useState(0);

  const location = useLocation(); // Lấy state từ location
  const userToken = localStorage.getItem("token");

  useEffect(() => {
    if (location.state && location.state.product) {
      const productDetail = location.state.product;
      setProduct(productDetail);
      setIdProduct(productDetail.productID);
      localStorage.setItem(
        "product",
        JSON.stringify({ product: productDetail, token: userToken })
      );
      localStorage.setItem(
        "idProduct",
        JSON.stringify({ id: productDetail.productID, token: userToken })
      );
    } else {
      try {
        const storedProduct = JSON.parse(localStorage.getItem("product"));
        const storedIdProduct = JSON.parse(localStorage.getItem("idProduct"));
        if (
          storedProduct &&
          storedIdProduct &&
          storedProduct.token === userToken
        ) {
          setProduct(storedProduct.product);
          setIdProduct(storedIdProduct.id);
        }
      } catch (error) {
        console.error("Failed to parse product from localStorage", error);
      }
    }
  }, [location.state, userToken]);

  useEffect(() => {
    if (location.state && location.state.diamond) {
      const diamondDetail = location.state.diamond;
      setDiamond(diamondDetail);
      setIdDiamond(diamondDetail.diamondID);
      localStorage.setItem(
        "diamond",
        JSON.stringify({ diamond: diamondDetail, token: userToken })
      );
      localStorage.setItem(
        "idDiamond",
        JSON.stringify({ id: diamondDetail.diamondID, token: userToken })
      );
    } else {
      try {
        const storedDiamond = JSON.parse(localStorage.getItem("diamond"));
        const storedIdDiamond = JSON.parse(localStorage.getItem("idDiamond"));
        if (
          storedDiamond &&
          storedIdDiamond &&
          storedDiamond.token === userToken
        ) {
          setDiamond(storedDiamond.diamond);
          setIdDiamond(storedIdDiamond.id);
        }
      } catch (error) {
        console.error("Failed to parse diamond from localStorage", error);
      }
    }
  }, [location.state, userToken]);

  const handleDeleteProduct = () => {
    setProduct(null);
    setIdProduct(null);
    localStorage.removeItem("product");
    localStorage.removeItem("idProduct");
    setIdComplete(null);
  };

  const handleDeleteDiamond = () => {
    setDiamond(null);
    setIdDiamond(null);
    localStorage.removeItem("diamond");
    localStorage.removeItem("idDiamond");
    setIdComplete(null);
  };

  const truncateProductName = (name) => {
    const words = name.split(" ");
    return words.length > 4 ? `${words.slice(0, 4).join(" ")}...` : name;
  };

  const handleStep3Click = () => {
    if (
      product.shapeDiamond === diamond.shape &&
      product.dimensionsDiamond === diamond.dimensions
    ) {
      setCurrentStep(3);
    } else {
      notification.error({
        message: "Cảnh Báo",
        description:
          "Hình dạng hoặc kích thước của Kim Cương và Trang Sức Không Bằng Nhau",
      });
    }
  };

  useEffect(() => {
    if (product && diamond) {
      if (
        product.shapeDiamond === diamond.shape &&
        product.dimensionsDiamond === diamond.dimensions
      ) {
        setIdComplete("ok");
        setTotalPriceCusTom(
          Number(product.totalPrice) + Number(diamond.totalPrice)
        );
        setCurrentStep(3);
      } else {
        setIdComplete(null);
      }
    }
  }, [product, diamond]);

  const renderStepForm = () => {
    switch (currentStep) {
      case 1:
        return <FormProduct diamond={diamond} />;
      case 2:
        return <FormDiamond product={product} />;
      case 3:
        return (
          <Complete
            diamond={diamond}
            product={product}
            setCurrentStep={setCurrentStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="banner">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/CadCustomBanner-2021New-01.jpg?alt=media&token=92f8b1c6-aaa7-4bcf-bc30-729600e26e37"
          style={{ width: "100%", height: "400px" }}
        />
      </div>
      <Container>
        <Row className="step_main">
          <Col span={24}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>
                <Link to="/">Trang chủ</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Tùy Chỉnh</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col span={8}>
            <Button
              className={`step_main_button_1 ${idProduct ? "selected" : ""}`}
              onClick={() => setCurrentStep(1)}
            >
              <Row className="body_step">
                {idProduct ? (
                  <>
                    <Col span={4}>
                      <span className="title_1">✔</span>
                    </Col>
                    <Col span={16}>
                      <div>
                        <Link
                          to={`/product-details/${idProduct}`}
                          style={{ color: "white" }}
                        >
                          <p>{truncateProductName(product.productName)}</p>
                        </Link>
                      </div>
                      <div className="title_main">
                        <span>
                          {product.totalPrice.toLocaleString("en-US", {
                            maximumFractionDigits: 0,
                          })}{" "}
                          đ
                        </span>
                        <Link to="#" onClick={handleDeleteProduct}>
                          Xóa
                        </Link>
                      </div>
                    </Col>
                    <Col span={4}>
                      <img
                        src={product.productImages[0].imageUrl}
                        alt="Product"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </Col>
                  </>
                ) : (
                  <Col span={24}>
                    <Row className="body_step">
                      <Col span={6}>
                        <span className="title_1">1</span>
                      </Col>
                      <Col span={14}>
                        <span className="title_2">CHỌN TRANG SỨC</span>
                      </Col>
                      <Col span={4}>
                        <span className="title_icon">
                          <GiBigDiamondRing />
                        </span>
                      </Col>
                    </Row>
                  </Col>
                )}
              </Row>
            </Button>
          </Col>
          <Col span={8}>
            <Button
              className={`step_main_button_2 ${idDiamond ? "selected2" : ""}`}
              onClick={() => setCurrentStep(2)}
            >
              <Row className="body_step">
                {idDiamond ? (
                  <>
                    <Col span={4}>
                      <span className="title_1">✔</span>
                    </Col>
                    <Col span={16}>
                      <div>
                        <Link
                          to={`/diamond-details/${idDiamond}`}
                          style={{ color: "white" }}
                        >
                          <p>{truncateProductName(diamond.diamondName)}</p>
                        </Link>
                      </div>
                      <div className="title_main">
                        <span>
                          {diamond.totalPrice.toLocaleString("en-US", {
                            maximumFractionDigits: 0,
                          })}{" "}
                          đ
                        </span>
                        <Link to="#" onClick={handleDeleteDiamond}>
                          Xóa
                        </Link>
                      </div>
                    </Col>
                    <Col span={4}>
                      <img
                        src={diamond.image}
                        alt="Diamond"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </Col>
                  </>
                ) : (
                  <Col span={24}>
                    <Row className="body_step">
                      <Col span={6}>
                        <span className="title_1">2</span>
                      </Col>
                      <Col span={14}>
                        <span className="title_2">CHỌN KIM CƯƠNG</span>
                      </Col>
                      <Col span={4}>
                        <span className="title_icon">
                          <GiDiamondHard />
                        </span>
                      </Col>
                    </Row>
                  </Col>
                )}
              </Row>
            </Button>
          </Col>
          <Col span={8}>
            <Button
              className={`step_main_button_3 ${idComplete ? "selected3" : ""}`}
              onClick={handleStep3Click}
              disabled={!idProduct || !idDiamond}
            >
              <Row className="body_step">
                {idComplete ? (
                  <>
                    <Col span={4}>
                      <span className="title_1">✔</span>
                    </Col>
                    <Col span={16}>
                      <div>
                        <p>Hoàn Thành</p>
                      </div>
                      <div className="title_main">
                        <span>
                          {totalPriceCustom.toLocaleString("en-US", {
                            maximumFractionDigits: 0,
                          })}{" "}
                          đ
                        </span>
                      </div>
                    </Col>
                    <Col span={4}>
                      <span className="title_icon">
                        <IoDiamondOutline />
                      </span>
                    </Col>
                  </>
                ) : (
                  <Col span={24}>
                    <Row className="body_step">
                      <Col span={6}>
                        <span className="title_1">3</span>
                      </Col>
                      <Col span={14}>
                        <span className="title_2">HOÀN THÀNH</span>
                      </Col>
                      <Col span={4}>
                        <span className="title_icon">
                          <IoDiamondOutline />
                        </span>
                      </Col>
                    </Row>
                  </Col>
                )}
              </Row>
            </Button>
          </Col>
        </Row>
        <div className="steps-content">{renderStepForm()}</div>
      </Container>
    </>
  );
}

export default Custommize;
