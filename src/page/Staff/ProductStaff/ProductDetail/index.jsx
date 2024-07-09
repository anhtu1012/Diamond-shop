import {
  Col,
  Divider,
  Form,
  Image,
  Input,
  Rate,
  Row,
  message,
  theme,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { Link, useParams } from "react-router-dom";
import "./index.scss";
import { useEffect, useState } from "react";
import moment from "moment";
import LoadingTruck from "../../../../components/loading";
import { TiArrowBack } from "react-icons/ti";
import { fetchProductById } from "../../../../../services/Uservices";

function ProductDetailStaff() {
  const { productID } = useParams();
  const [product, setProduct] = useState("");
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const fetchProductByIds = async (productID) => {
    try {
      const response = await fetchProductById(productID);
      const productData = response.data;
      const totalQuantity = productData.sizes.reduce(
        (acc, size) => acc + size.quantity,
        0
      );
      productData.totalQuantity = totalQuantity;
      setProduct(productData);
      form.setFieldsValue({
        productID: productData.productID,
        productName: productData.productName,
        brand: productData.brand,
        bathStone: productData.bathStone,
        createAt: moment(productData.createAt, "YYYY-MM-DDTHH:mm:ss"),
        updateAt: moment(productData.updateAt, "YYYY-MM-DDTHH:mm:ss"),
        goldWeight: productData.goldWeight,
        shapeDiamond: productData.shapeDiamond,
        dimensionsDiamond: productData.dimensionsDiamond,
        message: productData.message,
        oldGold: productData.oldGold,
        productType: productData.productType,
        quantity: productData.quantity,
        quantityStonesOfDiamond: productData.quantityStonesOfDiamond,
        totalPrice: productData.totalPrice.toLocaleString("vi-VN", {
          maximumFractionDigits: 0,
        }),
        status: productData.status ? "Còn hàng" : "Hết hàng",
        stoneWeight: productData.stoneWeight,
        wagePrice: productData.wagePrice.toLocaleString("vi-VN", {
          maximumFractionDigits: 0,
        }),
        originalPrice: productData.originalPrice.toLocaleString("vi-VN", {
          maximumFractionDigits: 0,
        }),
        ratio: productData.ratio,
        categoryName: productData.category.categoryName,
        sizes: productData.sizes,
      });
      setProduct(productData);
    } catch (error) {
      console.error("Failed to fetch product data", error);
      message.error("Failed to fetch product data");
    }
  };

  useEffect(() => {
    fetchProductByIds(productID);
  }, [productID]);

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  if (!product) {
    return <LoadingTruck />;
  }

  return (
    <div className="detail-product-staff">
      <Row>
        <Col span={24}>
          <Content
            style={{
              margin: "0 10px",
            }}
          >
            <div
              style={{
                padding: 16,
                minHeight: 360,
                background: "#fff",
                borderRadius: borderRadiusLG,
              }}
            >
              <div
                className="infor-details"
                style={{ marginBottom: "20px", display: "flex" }}
              >
                <h2 style={{ fontWeight: "500" }}>
                  Thông tin chi tiết sản phẩm
                </h2>
                <h2 style={{ fontWeight: "500", marginLeft: "auto" }}>
                  <Link
                    to={"/staff-page/san-pham"}
                    style={{ color: "black", fontWeight: 600 }}
                  >
                    <TiArrowBack style={{ justifyContent: "center" }} /> Quay
                    lại
                  </Link>
                </h2>
              </div>
              <Row style={{ marginTop: "20px" }}>
                <Col span={12}>
                  <Row gutter={8}>
                    <Col span={1}></Col>
                    <Col span={8}>
                      {product.productImages
                        .slice(1)
                        .map((thumbnail, index) => (
                          <Col
                            span={24}
                            key={index}
                            style={{ display: "flex", justifyContent: "end" }}
                          >
                            <Image
                              src={thumbnail.imageUrl}
                              alt={`Thumbnail ${index + 1}`}
                              style={{
                                width: "100px",
                                display: "flex",
                                justifyContent: "center",
                                marginBottom: "5px",
                              }}
                            />
                          </Col>
                        ))}
                    </Col>
                    <Col span={12}>
                      <Image
                        src={product.productImages[0]?.imageUrl}
                        alt="Product"
                        style={{
                          width: "270px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col span={12}>
                  <div className="description-product">
                    <h2
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        color: "#15393f",
                        fontWeight: "500",
                        marginBottom: "10px",
                      }}
                    >
                      {product.productName}
                    </h2>
                    <Rate disabled defaultValue={5} />
                    <h4 style={{ marginTop: "10px", fontWeight: "300" }}>
                      {product.productID}
                    </h4>
                    <h2
                      style={{
                        display: "flex",
                        fontWeight: "bold",
                        color: "#15393f",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      {product.totalPrice.toLocaleString("vi-VN", {
                        maximumFractionDigits: 0,
                      })}{" "}
                      vnđ
                    </h2>
                    <Form form={form} layout="vertical">
                      <div className="status">
                        <Form.Item
                          label="Trạng thái"
                          name="status"
                          defaultValue={product.status}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng không để trống",
                            },
                          ]}
                          className="custom-form-item"
                        >
                          <Input
                            readOnly
                            defaultValue={product.status}
                            style={{ width: "50%" }}
                          />
                        </Form.Item>
                      </div>
                    </Form>
                  </div>
                </Col>
              </Row>
              <Row style={{ marginTop: "20px" }}>
                <Col span={24}>
                  <Divider style={{ fontSize: "20px", color: "#15393f" }}>
                    Chi Tiết Sản Phẩm
                  </Divider>
                  <div className="table-container">
                    <table className="custom-table">
                      <tbody>
                        <tr>
                          <th>Thương hiệu</th>
                          <td>
                            <Link
                              to="/"
                              style={{
                                color: "black",
                                textDecoration: "none",
                                fontFamily: "Roboto",
                              }}
                            >
                              {product.brand}
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <th>Loại sản phẩm</th>
                          <td>{product.category.categoryName}</td>
                        </tr>
                        <tr>
                          <th>Kích thước đá chủ</th>
                          <td>
                            {product.shapeDiamond} {product.dimensionsDiamond}{" "}
                            ly
                          </td>
                        </tr>
                        <tr>
                          <th>Loại đá tẩm</th>
                          <td>{product.bathStone}</td>
                        </tr>
                        <tr>
                          <th>Số lượng đá tẩm</th>
                          <td>{product.quantityStonesOfDiamond}</td>
                        </tr>
                        <tr>
                          <th>Trọng lượng đá (ct)</th>
                          <td>{product.stoneWeight}</td>
                        </tr>
                        <tr>
                          <th>Loại vàng</th>
                          <td>{product.goldType}</td>
                        </tr>
                        <tr>
                          <th>Tuổi vàng</th>
                          <td>{product.oldGold}</td>
                        </tr>
                        <tr>
                          <th>Trọng lượng vàng</th>
                          <td>{product.goldWeight} chỉ</td>
                        </tr>
                        <tr>
                          <th>Số lượng</th>
                          <td>{product.totalQuantity}</td>
                        </tr>
                        <tr>
                          <th>Chất liệu khác</th>
                          <td>{product.message}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Col>
              </Row>
              <div className="button">
                {previewImage && (
                  <Image
                    wrapperStyle={{
                      display: "none",
                    }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}
              </div>
            </div>
          </Content>
        </Col>
      </Row>
    </div>
  );
}

export default ProductDetailStaff;
