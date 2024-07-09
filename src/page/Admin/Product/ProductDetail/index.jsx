/* eslint-disable react-hooks/exhaustive-deps */
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
import {
  deleteProduct,
  fetchProductById,
  updateProduct,
} from "../../../../../services/Uservices";
import LoadingTruck from "../../../../components/loading";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { TiArrowBack } from "react-icons/ti";
import ImgCrop from "antd-img-crop";
import uploadFile from "../../../../utils/upload";
import { toast } from "react-toastify";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
function ProductDetail() {
  const { productID } = useParams();
  const [product, setProduct] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [initialFileList, setInitialFileList] = useState([]);
  const fetchProductByIds = async (productID) => {
    try {
      const response = await fetchProductById(productID);
      const productData = response.data;
      setProduct(productData);
      console.log(productData);
      const totalQuantity = productData.sizes.reduce(
        (acc, size) => acc + size.quantity,
        0
      );
      productData.totalQuantity = totalQuantity;
      const images = productData.productImages.map((img, index) => ({
        uid: img.imageId.toString(),
        name: `images${index + 1}.png`,
        status: "done",
        url: img.imageUrl,
      }));
      setFileList(images);
      setInitialFileList([...images]);
      form.setFieldsValue({
        productID: productData.productID,
        productName: productData.productName,
        brand: productData.brand,
        bathStone: productData.bathStone,
        createAt: moment(productData.createAt, "YYYY-MM-DDTHH:mm:ss"),
        updateAt: moment(productData.updateAt, "YYYY-MM-DDTHH:mm:ss"),
        goldWeight: productData.goldWeight,
        goldType: productData.goldType,
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

  const handleDeleteImage = async (file) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(newFileList);
    message.success("Xóa ảnh thành công!");
  };
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      const currentValues = await form.validateFields();
      let updatedDetails = {};

      if (product.productName !== currentValues.productName) {
        updatedDetails.productName = currentValues.productName;
      }
      if (product.brand !== currentValues.brand) {
        updatedDetails.brand = currentValues.brand;
      }
      if (product.bathStone !== currentValues.bathStone) {
        updatedDetails.bathStone = currentValues.bathStone;
      }
      if (product.goldWeight !== currentValues.goldWeight) {
        updatedDetails.goldWeight = currentValues.goldWeight;
      }
      if (product.goldType !== currentValues.goldType) {
        updatedDetails.goldType = currentValues.goldType;
      }
      if (product.shapeDiamond !== currentValues.shapeDiamond) {
        updatedDetails.shapeDiamond = currentValues.shapeDiamond;
      }
      if (product.dimensionsDiamond !== currentValues.dimensionsDiamond) {
        updatedDetails.dimensionsDiamond = currentValues.dimensionsDiamond;
      }
      if (product.oldGold !== currentValues.oldGold) {
        updatedDetails.oldGold = currentValues.oldGold;
      }
      if (product.productType !== currentValues.productType) {
        updatedDetails.productType = currentValues.productType;
      }

      if (product.quantity !== currentValues.quantity) {
        updatedDetails.quantity = currentValues.quantity;
      }
      if (
        product.quantityStonesOfDiamond !==
        currentValues.quantityStonesOfDiamond
      ) {
        updatedDetails.quantityStonesOfDiamond =
          currentValues.quantityStonesOfDiamond;
      }

      if (
        product.wagePrice.toLocaleString("vi-VN", {
          maximumFractionDigits: 0,
        }) !== currentValues.wagePrice
      ) {
        updatedDetails.wagePrice = currentValues.wagePrice;
      }
      if (
        product.originalPrice.toLocaleString("vi-VN", {
          maximumFractionDigits: 0,
        }) !== currentValues.originalPrice
      ) {
        updatedDetails.originalPrice = currentValues.originalPrice;
      }
      if (product.ratio !== currentValues.ratio) {
        updatedDetails.ratio = currentValues.ratio;
      }
      if (product.sizes !== currentValues.sizes) {
        updatedDetails.sizes = currentValues.sizes;
      }

      const newImages = fileList.filter(
        (file) => !initialFileList.some((initFile) => initFile.uid === file.uid)
      );

      let uploadedUrls = [];

      if (newImages.length > 0) {
        setUploading(true);
        const uploadPromises = newImages.map((file) => {
          return uploadFile(file.originFileObj);
        });

        try {
          uploadedUrls = await Promise.all(uploadPromises);
        } catch (uploadError) {
          console.error("Failed to upload new images:", uploadError);
          message.error("Tải ảnh lên thất bại!");
          setUploading(false);
          return;
        }

        setUploading(false);
      }
      const remainingImages = fileList.map((file) => ({
        imageId: parseInt(file.uid),
        imageUrl: file.url || uploadedUrls.shift(),
      }));

      updatedDetails.productImages = remainingImages;

      if (Object.keys(updatedDetails).length > 0) {
        console.log(updatedDetails);
        await updateProduct(product.productID, updatedDetails);
        fetchProductByIds(product.productID);
        setIsEditing(false);
        message.success("Cập nhật thành công!");
      } else {
        toast.info("Không có thay đổi nào để cập nhật.");
      }
    } catch (error) {
      console.error("Error when updating product:", error);
      message.error("Cập nhật thất bại!");
      setUploading(false);
    }
  };
  const handleDelete = async () => {
    try {
      await deleteProduct(product.productID);
      console.log(product.productID);
      message.success("Xóa thành công!");
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error("Xóa thất bại!");
    }
  };

  const onChange = ({ fileList: newFileList }) => {
    console.log("Files after change:", newFileList);
    setFileList(newFileList);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  if (!product) {
    return <LoadingTruck />;
  }

  return (
    <div className="detail-product-admin">
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
                    to={"/admin-page/san-pham/xem-tat-ca-san-pham"}
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
                  <div className="button">
                    <Button
                      className="button1"
                      type="primary"
                      onClick={handleDelete}
                    >
                      Xóa
                    </Button>
                    <Button
                      className="button2"
                      type="primary"
                      style={{ background: "#dec55e" }}
                      onClick={handleEdit}
                    >
                      Chỉnh sửa
                    </Button>
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
                <Modal
                  title="Chỉnh sửa sản phẩm"
                  width={600}
                  open={isEditing}
                  onCancel={() => setIsEditing(false)}
                  onOk={handleUpdate}
                  cancelText="Hủy"
                  okText="Lưu"
                  confirmLoading={uploading}
                >
                  <Form form={form} onFinish={handleUpdate} layout="vertical">
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
                          <Input style={{ width: "100%" }} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Tỷ lệ (%)"
                          name="ratio"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng không để trống",
                            },
                          ]}
                        >
                          <InputNumber
                            min="0"
                            max="5"
                            step="0.1"
                            stringMode
                            className="input"
                            style={{
                              width: "100%",
                            }}
                            placeholder="0"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Tiền Công"
                          name="wagePrice"
                          defaultValue={parseFloat(product.wagePrice)}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng không để trống",
                            },
                          ]}
                        >
                          <InputNumber
                            min="0"
                            max="MAX"
                            step="1"
                            stringMode
                            style={{
                              width: "100%",
                            }}
                            placeholder="100000"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Giá Vốn"
                          name="originalPrice"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng không để trống",
                            },
                          ]}
                        >
                          <InputNumber
                            min="0"
                            max="MAX"
                            step="1"
                            stringMode
                            className="input_price"
                            style={{
                              width: "100%",
                            }}
                            placeholder="0000000"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12} className="info_detail1">
                        <Form.Item
                          label="Hình Dạng (Shape)"
                          name="shapeDiamond"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng không để trống",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Chọn Hình Dạng"
                            style={{ width: "100%", height: "30px" }}
                            defaultValue={product.shapeDiamond}
                          >
                            {[
                              "Round",
                              "Princess",
                              "Radiant",
                              "Emerald",
                              "Asscher",
                              "Marquise",
                              "Oval",
                              "Pearl",
                              "Heart",
                              "Cushion",
                            ].map((shape) => (
                              <Select.Option key={shape} value={shape}>
                                {shape}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
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
                          <InputNumber
                            min="0"
                            max="5"
                            step="0.1"
                            stringMode
                            className="input"
                            style={{ width: "100%" }}
                            placeholder="0"
                          />
                        </Form.Item>
                      </Col>
                      {/* <Col span={8}>
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
                      </Form.Item>
                    </Col> */}
                      <Col span={12}>
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
                        </Form.Item>
                      </Col>
                      <Col span={12}>
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
                          <Input style={{ width: "100%" }} />
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
                          <Input className="input" style={{ width: "100%" }} />
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
                          <InputNumber style={{ width: "100%" }} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Trọng lượng đá tấm"
                          name="stoneWeight"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng không để trống",
                            },
                          ]}
                          className="custom-form-item"
                        >
                          <InputNumber
                            min="0"
                            max="5"
                            step="0.1"
                            stringMode
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Loại vàng" name="goldType">
                          <Input
                            defaultValue={product.goldType}
                            placeholder="Nhập Loại Vàng"
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
                          <Input style={{ width: "100%" }} />
                        </Form.Item>
                      </Col>
                      <Col span={8} className="info_detail2">
                        <Form.Item
                          label="Trọng lượng vàng"
                          name="goldWeight"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng không để trống",
                            },
                          ]}
                        >
                          <InputNumber
                            min="0"
                            max="5"
                            step="0.1"
                            stringMode
                            className="input"
                            style={{ width: "100%" }}
                            placeholder="Nhập Trọng Lượng Vàng"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
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

                      <Col span={24}>
                        <Form.Item
                          name="productImages"
                          valuePropName="fileList"
                        >
                          <ImgCrop rotationSlider>
                            <Upload
                              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload" // Đường dẫn này chỉ là ví dụ, cần thay thế bằng địa chỉ đúng
                              listType="picture-card"
                              fileList={fileList}
                              onChange={onChange}
                              onPreview={handlePreview}
                              onRemove={handleDeleteImage}
                              beforeUpload={() => false}
                            >
                              {fileList.length < 4 && "+ Upload"}
                            </Upload>
                          </ImgCrop>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Modal>
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

export default ProductDetail;
