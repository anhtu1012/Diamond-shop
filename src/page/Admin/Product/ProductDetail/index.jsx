import {
  Button,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Select,
  message,
  theme,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { useParams } from "react-router-dom";
import "./index.scss";
import { useEffect, useState } from "react";
import moment from "moment";
import { fetchProductById } from "../../../../../services/Uservices";
import LoadingTruck from "../../../../components/loading";

function ProductDetail() {
  const { productID } = useParams();
  const [product, setProduct] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const fetchProductByIds = async (productID) => {
    const response = await fetchProductById(productID);
    const productData = response.data;
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
      totalPrice: productData.totalPrice.toLocaleString("en-US", {
        maximumFractionDigits: 0,
      }),
      status: productData.status ? "Còn hàng" : "Hết hàng",
      stoneWeight: productData.stoneWeight,
      originalPrice: productData.originalPrice.toLocaleString("en-US", {
        maximumFractionDigits: 0,
      }),
      ratio: productData.ratio,
      categoryName: productData.category.categoryName,

      sizes: productData.sizes,
    });
  };

  useEffect(() => {
    fetchProductByIds(productID);
  }, [productID]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    message.success("Lưu thành công!");
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    message.success("Xóa thành công");
  };

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  if (!product) {
    return <LoadingTruck />;
  }

  return (
    <Row>
      <Col span={16}>
        <Content
          style={{
            margin: "0 10px",
          }}
        >
          <div
            style={{
              padding: 16,
              minHeight: 360,
              background: "#EEEEEE",
              borderRadius: borderRadiusLG,
            }}
          >
            <h3 style={{ fontWeight: "400" }}>Thông tin chi tiết sản phẩm</h3>
            <Form form={form} layout="vertical">
              <Row
                gutter={20}
                className="detail1"
                style={{ padding: "5px 10px" }}
              >
                <Col className="infor-detail" span={12}>
                  <Form.Item
                    label="Tên Sản Phẩm"
                    name="productName"
                    rules={[{ required: true }]}
                    className="custom-form-item"
                  >
                    <Input readOnly style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col className="infor-detail" span={12}>
                  <Form.Item
                    label="Mã sản phẩm"
                    name="productID"
                    rules={[{ required: true }]}
                    className="custom-form-item"
                  >
                    <Input readOnlystyle={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={12} className="infor-detail">
                  <Form.Item
                    label="Loại sản phẩm"
                    name="categoryName"
                    rules={[{ required: true }]}
                    className="custom-form-item"
                  >
                    <Input
                      defaultValue={product?.category?.categoryName}
                      readOnly
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12} className="infor-detail">
                  <Form.Item
                    label="Phân loại"
                    name="productType"
                    rules={[{ required: true }]}
                    className="custom-form-item"
                  >
                    <Input
                      value={product.productType}
                      readOnly
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col className="infor-detail" span={12}>
                  <Form.Item
                    label="Kích thước đá chủ"
                    name="dimensionsDiamond"
                    rules={[{ required: true }]}
                    className="custom-form-item"
                  >
                    <Input
                      className="input"
                      readOnly
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col className="infor-detail" span={12}>
                  <Form.Item
                    label="Loại đá tẩm"
                    name="bathStone"
                    rules={[{ required: true }]}
                    className="custom-form-item"
                  >
                    <Input
                      className="input"
                      readOnly
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col className="infor-detail" span={12}>
                  <Form.Item
                    label="Số lượng đá tẩm"
                    name="quantityStonesOfDiamond"
                    rules={[{ required: true }]}
                    className="custom-form-item"
                  >
                    <Input
                      className="input"
                      readOnly
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col className="infor-detail" span={12}>
                  <Form.Item
                    label="Loại vàng"
                    name="goldType"
                    rules={[{ required: true }]}
                    className="custom-form-item"
                  >
                    <Input
                      className="input"
                      readOnly
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col className="infor-detail" span={12}>
                  <Form.Item
                    label="Tuổi vàng"
                    name="oldGold"
                    rules={[{ required: true }]}
                    className="custom-form-item"
                  >
                    <Input readOnly style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col className="infor-detail" span={12}>
                  <Form.Item
                    label="Trọng lượng vàng"
                    name="goldWeight"
                    rules={[{ required: true }]}
                    className="custom-form-item"
                  >
                    <Input readOnly style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col className="infor-detail" span={12}>
                  <Form.Item
                    label="Thương hiệu"
                    name="brand"
                    rules={[{ required: true }]}
                    className="custom-form-item"
                  >
                    <Input
                      className="input"
                      readOnly
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col className="infor-detail" span={12}>
                  <Form.Item
                    label="Tỉ lệ"
                    name="ratio"
                    rules={[{ required: true }]}
                    className="custom-form-item"
                  >
                    <Input
                      className="input"
                      readOnly
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col className="infor-detail" span={12}>
                  <Form.Item
                    label="Trọng lượng đá"
                    name="stoneWeight"
                    rules={[{ required: true }]}
                    className="custom-form-item"
                  >
                    <Input
                      className="input"
                      readOnly
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>

                {product.sizes?.map((size) => (
                  <Col span={4} key={size.sizeID} className="infor-detail">
                    <Form.Item
                      label={`Size ${size.sizeValue}`}
                      className="custom-form-item"
                    >
                      <Input
                        defaultValue={size.quantity}
                        className="input"
                        readOnly
                        style={{
                          width: "100%",
                        }}
                      />
                    </Form.Item>
                  </Col>
                ))}
              </Row>
              <Row
                gutter={20}
                className="detail2"
                style={{ padding: "5px 10px" }}
              ></Row>
              <Form.Item
                label="Ghi chú"
                name="message"
                rules={[{ required: true }]}
                className="custom-form-item"
              >
                <Input.TextArea
                  readOnly
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </Form.Item>
              <Row></Row>
            </Form>
          </div>
        </Content>
      </Col>
      <Col span={8}>
        <Content
          style={{
            margin: "0 10px",
          }}
        >
          <div
            style={{
              padding: 16,
              minHeight: 360,
              background: "#EEEEEE",
              borderRadius: borderRadiusLG,
            }}
          >
            <h3 style={{ fontWeight: "500" }}>Hình ảnh</h3>
            <Form form={form} layout="vertical">
              <Row
                gutter={20}
                className="detail1"
                style={{ padding: "5px 10px" }}
              >
                <Col span={12}>
                  <Image
                    src={product.productImages[0]?.imageUrl} // Use the first image URL as the main product image
                    alt="Product"
                    style={{
                      width: "130px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  />
                </Col>
                <Col span={12}>
                  <Row gutter={8}>
                    {product.productImages.slice(1).map(
                      (
                        thumbnail,
                        index // Slice the array to exclude the first image
                      ) => (
                        <Col span={8} key={index}>
                          <Image
                            src={thumbnail.imageUrl}
                            alt={`Thumbnail ${index + 1}`}
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          />
                        </Col>
                      )
                    )}
                  </Row>
                </Col>

                <Col className="infor-detail" span={24}>
                  <Form.Item
                    label="Ngày Nhập"
                    name="inputDate"
                    rules={[{ required: false }]}
                    className="custom-form-item"
                  >
                    {isEditing ? (
                      <DatePicker
                        style={{ width: "100%" }}
                        defaultValue={moment(product.createAt, "YYYY-MM-DD")}
                        format="YYYY-MM-DD"
                      />
                    ) : (
                      <Input
                        defaultValue={moment(product.createAt).format(
                          "YYYY-MM-DD"
                        )}
                        readOnly
                        style={{ width: "100%", marginRight: "10px" }}
                      />
                    )}
                  </Form.Item>
                  <Form.Item
                    label="Ngày Cập Nhật"
                    name="updateAt"
                    rules={[{ required: false }]}
                    className="custom-form-item"
                  >
                    {isEditing ? (
                      <DatePicker
                        style={{ width: "100%" }}
                        defaultValue={moment(product.updateAt, "YYYY-MM-DD")}
                        format="YYYY-MM-DD"
                      />
                    ) : (
                      <Input
                        defaultValue={moment(product.updateAt).format(
                          "YYYY-MM-DD"
                        )}
                        readOnly
                        style={{ width: "100%", marginRight: "10px" }}
                      />
                    )}
                  </Form.Item>
                  <Form.Item
                    label="Giá gốc (VNĐ)"
                    name="originalPrice"
                    rules={[{ required: false }]}
                    className="custom-form-item"
                  >
                    <Input readOnly style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    label="Giá bán (VNĐ)"
                    name="totalPrice"
                    rules={[{ required: true }]}
                    className="custom-form-item"
                  >
                    <Input readOnly style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    label="Trạng thái"
                    name="status"
                    rules={[{ required: true }]}
                    className="custom-form-item"
                  >
                    <Input readOnly style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col className="infor-detail" span={24}></Col>
              </Row>
              <div
                className="button"
                style={{ display: "flex", justifyContent: "right" }}
              >
                <Button
                  className="button1"
                  type="primary"
                  onClick={handleDelete}
                >
                  Xóa
                </Button>
                {!isEditing && (
                  <Button
                    className="button2"
                    type="primary"
                    onClick={handleEdit}
                  >
                    Chỉnh sửa
                  </Button>
                )}
                <Modal
                  title="Chỉnh sửa sản phẩm"
                  open={isEditing}
                  onCancel={handleCancel}
                  onOk={handleSave}
                  cancelText="Hủy"
                  okText="Lưu"
                >
                  <Form form={form} layout="vertical">
                    <Row gutter={24}>
                      <Col span={24}>
                        <Form.Item
                          label="Tên Sản Phẩm"
                          name="productName"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng không để trống",
                            },
                          ]}
                          className="custom-form-item"
                        >
                          <Input
                            readOnly={!isEditing}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Mã sản phẩm"
                          name="productID"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng không để trống",
                            },
                          ]}
                          className="custom-form-item"
                        >
                          <Input
                            readOnly={!isEditing}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Loại sản phẩm"
                          name="categoryName"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng không để trống",
                            },
                          ]}
                          className="custom-form-item"
                        >
                          {isEditing ? (
                            <Select
                              style={{ width: "100%" }}
                              defaultValue={product?.category?.categoryName}
                            >
                              {[
                                "Nhẫn cầu hôn kim cương",
                                "Nhẫn cưới kim cương",
                                "Nhẫn kim cương",
                                "Bông tai kim cương",
                                "Lắc/Vòng tay kim cương",
                                "Mặt dây chuyền kim cương",
                              ].map((category) => (
                                <Select.Option key={category} value={category}>
                                  {category}
                                </Select.Option>
                              ))}
                            </Select>
                          ) : (
                            <Input
                              defaultValue={product?.category?.categoryName}
                              readOnly
                              style={{ width: "100%" }}
                            />
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Phân loại"
                          name="productType"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng không để trống",
                            },
                          ]}
                          className="custom-form-item"
                        >
                          {isEditing ? (
                            <Select
                              style={{ width: "100%" }}
                              defaultValue={product.productType}
                            >
                              {[
                                "Nhẫn",
                                "Lắc/Vòng tay",
                                "Dây chuyền",
                                "Bông tai",
                              ].map((productType) => (
                                <Select.Option
                                  key={productType}
                                  value={productType}
                                >
                                  {productType}
                                </Select.Option>
                              ))}
                            </Select>
                          ) : (
                            <Input
                              value={product.productType}
                              readOnly
                              style={{ width: "100%" }}
                            />
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Kích thước đá chủ"
                          name="dimensionsDiamond"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng không để trống",
                            },
                          ]}
                          className="custom-form-item"
                        >
                          <Input
                            className="input"
                            readOnly={!isEditing}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Loại đá tẩm"
                          name="bathStone"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng không để trống",
                            },
                          ]}
                          className="custom-form-item"
                        >
                          <Input
                            className="input"
                            readOnly={!isEditing}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Số lượng đá tẩm"
                          name="quantityStonesOfDiamond"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng không để trống",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Loại vàng"
                          name="goldType"
                          rules={[
                            {
                              required: false,
                            },
                          ]}
                          className="custom-form-item"
                        >
                          <Input
                            className="input"
                            readOnly={!isEditing}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Tuổi vàng"
                          name="oldGold"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng không để trống",
                            },
                          ]}
                          className="custom-form-item"
                        >
                          <Input
                            readOnly={!isEditing}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Thương hiệu"
                          name="brand"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng không để trống",
                            },
                          ]}
                          className="custom-form-item"
                        >
                          <Input
                            readOnly={!isEditing}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Tỉ lệ"
                          name="ratio"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng không để trống",
                            },
                          ]}
                          className="custom-form-item"
                        >
                          <Input
                            readOnly={!isEditing}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Trọng lượng đá"
                          name="stoneWeight"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng không để trống",
                            },
                          ]}
                          className="custom-form-item"
                        >
                          <Input
                            readOnly={!isEditing}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      {product.sizes?.map((size) => (
                        <Col
                          span={8}
                          key={size.sizeID}
                          className="infor-detail"
                        >
                          <Form.Item
                            label={`Size ${size.sizeValue}`}
                            className="custom-form-item"
                          >
                            <Input
                              defaultValue={size.quantity}
                              className="input"
                              readOnly={!isEditing}
                              style={{
                                width: "100%",
                              }}
                            />
                          </Form.Item>
                        </Col>
                      ))}
                    </Row>
                  </Form>
                </Modal>
              </div>
            </Form>
          </div>
        </Content>
      </Col>
    </Row>
  );
}

export default ProductDetail;
