import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Row,
  Select,
  message,
  theme,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { useParams } from "react-router-dom";
import "./index.scss";
import { useState } from "react";

const initialData = [
  {
    key: "1",
    productID: "MS123",
    imageUrl:
      "https://jemmia.vn/wp-content/uploads/2024/04/1_cam_01-copy-4.jpg",
    productName: "MẶT DÂY CHUYỀN KIM CƯƠNG 18K",
    category: {
      categoryName: "Mặt dây chuyền kim cương",
    },
    productType: "Dây chuyền",
    shapeDiamond: "Round",
    dimensionsDiamond: "5.0",
    brand: "Diamond",
    bathStone: "Kim cương",
    quantityStonesOfDiamond: "28",
    goleType: "Vàng trắng",
    oldGold: "18k",
    ratio: "0.5",
    goldWeight: "0.92",
    status: "Còn hàng",
    stoneWeight: "1.6",
    originalPrice: "400.800.000 ₫",
    price: "488.800.000 ₫",
    sizes: [
      {
        sizeValue: 41,
        quantitySize: 3,
      },
      {
        sizeValue: 40,
        quantitySize: 10,
      },
      {
        sizeValue: 42,
        quantitySize: 7,
      },
    ],
    thumbnails: [
      {
        imageUrl:
          "https://locphuc.com.vn/Content/Images/082022/DFH0225ANW.WG01A/day-chuyen-kim-cuong-DFH0225ANW-WG01A-g1.jpg",
      },
      {
        imageUrl:
          "https://locphuc.com.vn/Content/Images/082022/DFH0225ANW.WG01A/day-chuyen-kim-cuong-DFH0225ANW-WG01A-g2.jpg",
      },
      {
        imageUrl:
          "https://locphuc.com.vn/Content/Images/082022/DFH0225ANW.WG01A/day-chuyen-kim-cuong-DFH0225ANW-WG01A-g4.jpg",
      },
    ],
  },
  {
    key: "2",
    productID: "MS456",
    imageUrl:
      "https://jemmia.vn/wp-content/uploads/2022/05/R41.3-1-scaled-1.jpg",
    productName: "NHẪN KIM CƯƠNG NAM 18K",
    category: {
      categoryName: "Nhẫn kim cương",
    },
    productType: "Nhẫn",
    shapeDiamond: "Round",
    bathStone: "Kim cương",
    dimensionsDiamond: "5.0",
    quantityStonesOfDiamond: "28",
    brand: "Diamond",
    goleType: "Vàng trắng",
    ratio: "0.5",
    oldGold: "18k",
    goldWeight: "0.92",
    status: "Hết hàng",
    stoneWeight: "1.6",
    originalPrice: "400.800.000 ₫",
    price: "488.800.000 ₫",
    sizes: [
      {
        sizeValue: 41,
        quantitySize: 3,
      },
      {
        sizeValue: 40,
        quantitySize: 10,
      },
      {
        sizeValue: 42,
        quantitySize: 7,
      },
    ],
    thumbnails: [
      {
        imageUrl:
          "https://locphuc.com.vn/Content/Images/082022/DFH0225ANW.WG01A/day-chuyen-kim-cuong-DFH0225ANW-WG01A-g1.jpg",
      },
      {
        imageUrl:
          "https://locphuc.com.vn/Content/Images/082022/DFH0225ANW.WG01A/day-chuyen-kim-cuong-DFH0225ANW-WG01A-g2.jpg",
      },
      {
        imageUrl:
          "https://locphuc.com.vn/Content/Images/082022/DFH0225ANW.WG01A/day-chuyen-kim-cuong-DFH0225ANW-WG01A-g4.jpg",
      },
    ],
  },
];

function ProductDetail() {
  const { productID } = useParams();
  const product = initialData.find((d) => d.productID === productID);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = () => {
    setIsEditing(false);
    message.success("Lưu thành công!");
  };
  const handleDelete = () => {
    message.success("Xóa thành công");
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

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
            <Row
              gutter={20}
              className="detail1"
              style={{ padding: "5px 10px" }}
            >
              <Col className="infor-detail" span={12}>
                <Form.Item
                  label="Tên Sản Phẩm"
                  name="productName"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={product.productName}
                    className="input"
                    readOnly={!isEditing}
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col className="infor-detail" span={12}>
                <Form.Item
                  label="Mã sản phẩm"
                  name="productID"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={product.productID}
                    className="input"
                    readOnly={!isEditing}
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12} className="infor-detail">
                <Form.Item
                  label="Loại sản phẩm"
                  name="category"
                  className="custom-form-item"
                >
                  {isEditing ? (
                    <Select
                      style={{ width: "100%" }}
                      defaultValue={product.category.categoryName}
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
                      defaultValue={product.category.categoryName}
                      readOnly
                      style={{ width: "100%" }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={12} className="infor-detail">
                <Form.Item
                  label="Phân loại"
                  name="productType"
                  className="custom-form-item"
                >
                  {isEditing ? (
                    <Select
                      style={{ width: "100%" }}
                      defaultValue={product.productType}
                    >
                      {["Nhẫn", "Lắc/Vòng tay", "Dây chuyền", "Bông tai"].map(
                        (productType) => (
                          <Select.Option key={productType} value={productType}>
                            {productType}
                          </Select.Option>
                        )
                      )}
                    </Select>
                  ) : (
                    <Input
                      defaultValue={product.productType}
                      readOnly
                      style={{ width: "100%" }}
                    />
                  )}
                </Form.Item>
              </Col>

              <Col className="infor-detail" span={12}>
                <Form.Item
                  label="Kích thước đá chủ"
                  name="dimensionsDiamond"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={product.dimensionsDiamond}
                    className="input"
                    readOnly={!isEditing}
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col className="infor-detail" span={12}>
                <Form.Item
                  label="Loại đá tẩm"
                  name="bathStone"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={product.bathStone}
                    className="input"
                    readOnly={!isEditing}
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col className="infor-detail" span={12}>
                <Form.Item
                  label="Số lượng đá tẩm"
                  name="quantityStonesOfDiamond"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={product.quantityStonesOfDiamond}
                    className="input"
                    readOnly={!isEditing}
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col className="infor-detail" span={12}>
                <Form.Item
                  label="Loại vàng"
                  name="goleType"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={product.goleType}
                    className="input"
                    readOnly={!isEditing}
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col className="infor-detail" span={12}>
                <Form.Item
                  label="Tuổi vàng"
                  name="oldGold"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={product.oldGold}
                    className="input"
                    readOnly={!isEditing}
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col className="infor-detail" span={12}>
                <Form.Item
                  label="Trọng lượng vàng"
                  name="goldWeight"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={product.goldWeight}
                    className="input"
                    readOnly={!isEditing}
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col className="infor-detail" span={12}>
                <Form.Item
                  label="Thương hiệu"
                  name="brand"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={product.brand}
                    className="input"
                    readOnly={!isEditing}
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col className="infor-detail" span={12}>
                <Form.Item
                  label="Tỉ lệ"
                  name="ratio"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={product.ratio}
                    className="input"
                    readOnly={!isEditing}
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col className="infor-detail" span={12}>
                <Form.Item
                  label="Trọng lượng đá"
                  name="stoneWeight"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={product.stoneWeight}
                    className="input"
                    readOnly={!isEditing}
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </Col>
              {product.sizes.map((size, index) => (
                <Col key={index} className="infor-detail" span={12}>
                  <Form.Item
                    label={`Size ${size.sizeValue}`}
                    className="custom-form-item"
                  >
                    <Input
                      defaultValue={size.quantitySize}
                      className="input"
                      readOnly
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                </Col>
              ))}
              <Col className="infor-detail" span={12}>
                <Form.Item
                  label="Giá gốc"
                  name="originalPrice"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={product.originalPrice}
                    className="input"
                    readOnly={!isEditing}
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
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
            <h3 style={{ fontWeight: "400" }}>Hình ảnh</h3>
            <Row
              gutter={20}
              className="detail1"
              style={{ padding: "5px 10px" }}
            >
              <Col span={12}>
                <Image
                  src={product.imageUrl}
                  alt="Product"
                  style={{
                    width: "130px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                />
              </Col>
              <Col span={12}>
                <Row>
                  {product.thumbnails.map((thumbnail, index) => (
                    <Col span={12} key={index}>
                      <Image
                        src={thumbnail.imageUrl}
                        alt={`Thumbnail ${index + 1}`}
                        style={{
                          width: "60px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      />
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col className="infor-detail" span={24}>
                <Form.Item
                  label="Trạng thái"
                  name="status"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={product.status}
                    className="input"
                    readOnly
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col className="infor-detail" span={24}>
                <Form.Item
                  label="Giá bán"
                  name="price"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={product.price}
                    className="input"
                    readOnly={!isEditing}
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <div
              className="button"
              style={{ display: "flex", justifyContent: "right" }}
            >
              <Button className="button1" type="primary" onClick={handleDelete}>
                Xóa
              </Button>
              {!isEditing && (
                <Button className="button2" type="primary" onClick={handleEdit}>
                  Chỉnh sửa
                </Button>
              )}
              {isEditing && (
                <Button className="button2" type="primary" onClick={handleSave}>
                  Lưu
                </Button>
              )}
            </div>
          </div>
        </Content>
      </Col>
    </Row>
  );
}

export default ProductDetail;
