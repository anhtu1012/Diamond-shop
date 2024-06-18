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

import { useDispatch, useSelector } from "react-redux";
import {
  clearDiamond,
  clearProduct,
  selectDiamond,
  selectProduct,
  setDiamond,
  setProduct,
} from "../../../redux/features/counterSlice";

function Custommize() {
  const [currentStep, setCurrentStep] = useState(1);
  const product = useSelector(selectProduct);
  const diamond = useSelector(selectDiamond);
  const [idComplete, setIdComplete] = useState(null);
  const [totalPriceCustom, setTotalPriceCusTom] = useState(0);
  const dispatch = useDispatch();
  const location = useLocation(); // Lấy state từ location

  useEffect(() => {
    if (location.state && location.state.product) {
      dispatch(setProduct(location.state.product));
    }
  }, [location.state, dispatch]);

  useEffect(() => {
    if (location.state && location.state.diamond) {
      dispatch(setDiamond(location.state.diamond));
    }
  }, [location.state, dispatch]);
  useEffect(() => {
    if (product && diamond) {
      setCurrentStep(3);
    } else if (product) {
      setCurrentStep(2);
    }
  }, [product, diamond]);

  const handleDeleteProduct = () => {
    dispatch(clearProduct());
  };

  const handleDeleteDiamond = () => {
    dispatch(clearDiamond());
  };

  const truncateProductName = (name) => {
    const words = name.split(" ");
    return words.length > 4 ? `${words.slice(0, 4).join(" ")}...` : name;
  };

  const handleStep3Click = () => {
    if (
      product &&
      diamond &&
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
      } else {
        setIdComplete(null);
      }
    } else {
      setIdComplete(null);
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
              className={`step_main_button_1 ${product ? "selected" : ""}`}
              onClick={() => setCurrentStep(1)}
            >
              <Row className="body_step">
                {product ? (
                  <>
                    <Col span={4}>
                      <span className="title_1">✔</span>
                    </Col>
                    <Col span={16}>
                      <div>
                        <Link
                          to={`/product-details/${product.productID}`}
                          style={{ color: "white" }}
                        >
                          <p>{truncateProductName(product.productName)}</p>
                        </Link>
                      </div>
                      <div className="title_main">
                        <span>
                          {product.totalPrice.toLocaleString("vi-VN", {
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
              className={`step_main_button_2 ${diamond ? "selected2" : ""}`}
              onClick={() => setCurrentStep(2)}
            >
              <Row className="body_step">
                {diamond ? (
                  <>
                    <Col span={4}>
                      <span className="title_1">✔</span>
                    </Col>
                    <Col span={16}>
                      <div>
                        <Link
                          to={`/diamond-details/${diamond.diamondID}`}
                          style={{ color: "white" }}
                        >
                          <p>{truncateProductName(diamond.diamondName)}</p>
                        </Link>
                      </div>
                      <div className="title_main">
                        <span>
                          {diamond.totalPrice.toLocaleString("vi-VN", {
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
              disabled={!product || !diamond || !idComplete}
            >
              <Row className="body_step">
                {idComplete ? (
                  <>
                    <Col span={4}>
                      <span className="title_1">✔</span>
                    </Col>
                    <Col span={16}>
                      <div>
                        <p>HOÀN THÀNH</p>
                      </div>
                      <div className="title_main">
                        <span>
                          {totalPriceCustom.toLocaleString("vi-VN", {
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
