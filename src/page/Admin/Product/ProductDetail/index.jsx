import {
  Button,
  Col,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Rate,
  Row,
  Select,
  Upload,
  message,
  theme,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { Link, useParams } from "react-router-dom";
import "./index.scss";
import { useEffect, useState } from "react";
import moment from "moment";
import { fetchProductById } from "../../../../../services/Uservices";
import LoadingTruck from "../../../../components/loading";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { TiArrowBack } from "react-icons/ti";

function ProductDetail() {
  const { productID } = useParams();
  const [product, setProduct] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  const fetchProductByIds = async (productID) => {
    try {
      const response = await fetchProductById(productID);
      const productData = response.data;
      setProduct(productData);
      const images = productData.productImages.map((img, index) => ({
        uid: img.imageId.toString(),
        name: `images${index + 1}.png`,
        status: "done",
        url: img.imageUrl,
      }));
      setFileList(images);
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
        wagePrice: productData.wagePrice.toLocaleString("en-US", {
          maximumFractionDigits: 0,
        }),
        originalPrice: productData.originalPrice.toLocaleString("en-US", {
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

  const handlePreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const imgWindow = window.open(src);
    imgWindow.document.write(`<img src="${src}" style="width: 100%;" />`);
  };

  const handleChange = ({ fileList: newFileList }) => {
    if (Array.isArray(newFileList)) {
      setFileList(newFileList);
    } else {
      console.error("newFileList is not an array:", newFileList);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  if (!product) {
    return <LoadingTruck />;
  }

  return (
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
              <h2 style={{ fontWeight: "500" }}>Thông tin chi tiết sản phẩm</h2>
              <h2 style={{ fontWeight: "500", marginLeft: "auto" }}>
                <Link
                  to={"/admin-page/san-pham/xem-tat-ca-san-pham"}
                  style={{ color: "black", fontWeight: 600 }}
                >
                  <TiArrowBack style={{ justifyContent: "center" }} /> Quay lại
                </Link>
              </h2>
            </div>
            <Row style={{ marginTop: "20px" }}>
              <Col span={12}>
                <Row gutter={8}>
                  <Col span={2}></Col>
                  <Col span={8}>
                    {product.productImages.slice(1).map((thumbnail, index) => (
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
                        width: "300px",
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
                    {product.totalPrice.toLocaleString("en-US", {
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
                <div className="button">
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
                      style={{ background: "#dec55e" }}
                      onClick={handleEdit}
                    >
                      Chỉnh sửa
                    </Button>
                  )}
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
                          {product.shapeDiamond} {product.dimensionsDiamond} ly
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
                        <th>Chất liệu khác</th>
                        <td>{product.message}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
            <Form form={form} layout="vertical">
              <Row
                gutter={20}
                className="detail1"
                style={{ padding: "5px 10px" }}
              ></Row>
              <div
                className="button"
                style={{ display: "flex", justifyContent: "right" }}
              >
                <Modal
                  title="Chỉnh sửa sản phẩm"
                  width={600}
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
                      <Col span={6}>
                        <Form.Item label="Kích thước">
                          <Form.List name="sizes">
                            {(fields, { add, remove }) => (
                              <div>
                                <div style={{ marginBottom: 16 }}>
                                  <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    icon={<PlusOutlined />}
                                    style={{ height: "30px" }}
                                  >
                                    Nhập sizes
                                  </Button>
                                </div>
                                {fields.map((field) => (
                                  <Row key={field.key} gutter={24}>
                                    <Col span={11}>
                                      <Form.Item
                                        {...field}
                                        name={[field.name, "sizeValue"]}
                                        fieldKey={[field.fieldKey, "sizeValue"]}
                                        rules={[
                                          {
                                            required: true,
                                            message: "Vui lòng nhập kích thước",
                                          },
                                        ]}
                                      >
                                        <InputNumber
                                          placeholder="Kích thước"
                                          min={1}
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col span={11}>
                                      <Form.Item
                                        {...field}
                                        name={[field.name, "quantity"]}
                                        fieldKey={[field.fieldKey, "quantity"]}
                                        rules={[
                                          {
                                            required: true,
                                            message: "Vui lòng nhập số lượng",
                                          },
                                        ]}
                                      >
                                        <InputNumber
                                          placeholder="Số lượng"
                                          min={1}
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col span={2}>
                                      <MinusCircleOutlined
                                        onClick={() => remove(field.name)}
                                      />
                                    </Col>
                                  </Row>
                                ))}
                              </div>
                            )}
                          </Form.List>
                        </Form.Item>
                      </Col>
                      {product.sizes?.map((size) => (
                        <Col
                          span={6}
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
                              style={{ width: "100%" }}
                            />
                          </Form.Item>
                        </Col>
                      ))}
                      <Col span={8}>
                        <Form.Item
                          label="Giá nhập"
                          name="originalPrice"
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
                          label="Gia công"
                          name="wagePrice"
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
                          label="Giá bán"
                          name="totalPrice"
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
                      <Col span={24}>
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
                          {isEditing ? (
                            <Select
                              style={{ width: "100%" }}
                              defaultValue={
                                product.status ? "Còn hàng" : "Hết hàng"
                              }
                            >
                              {["Còn hàng", "Hết hàng"].map((status) => (
                                <Select.Option key={status} value={status}>
                                  {status}
                                </Select.Option>
                              ))}
                            </Select>
                          ) : (
                            <Input
                              className="custom-placeholder"
                              readOnly
                              placeholder={
                                product.status ? "Còn hàng" : "Hết hàng"
                              }
                              style={{ width: "100%" }}
                            />
                          )}
                        </Form.Item>
                      </Col>
                      {product.productImages
                        .slice(0)
                        .map((thumbnail, index) => (
                          <Col span={6} key={index}>
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
                        ))}
                      <Col span={6}>
                        <Form.Item name="poster" valuePropName="fileList">
                          <Upload
                            listType="picture-card"
                            fileList={Array.isArray(fileList) ? fileList : []}
                            beforeUpload={() => false}
                            onPreview={handlePreview}
                            onChange={handleChange}
                          >
                            {fileList.length >= 8 ? null : uploadButton}
                          </Upload>
                        </Form.Item>
                      </Col>
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
