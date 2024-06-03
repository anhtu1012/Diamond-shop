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
    id: "MS123",
    image: "https://jemmia.vn/wp-content/uploads/2024/05/1_cam_03-copy.jpg",
    name: "NHẪN KIM CƯƠNG NỮ 18K 01141N",
    category: "Nhẫn cầu hôn kim cương",
    mainstone: "Round 5ly",
    typestone: "Kim cương",
    numbergem: "28",
    gold: "Vàng trắng",
    age: "18k",
    weight: "0.92",
    status: "Còn hàng",
    price: "488.800.000 ₫",
  },
  {
    key: "2",
    id: "MS456",
    image: "https://jemmia.vn/wp-content/uploads/2022/05/R41.3-1-scaled-1.jpg",
    name: "NHẪN KIM CƯƠNG NAM 18K",
    category: "Nhẫn kim cương",
    mainstone: "Round 5ly",
    typestone: "Kim cương",
    numbergem: "28",
    gold: "Vàng trắng",
    age: "18k",
    weight: "0.92",
    status: "Hết hàng",
    price: "488.800.000 ₫",
  },
  {
    key: "3",
    id: "MS789",
    image: "https://jemmia.vn/wp-content/uploads/2024/04/1-copy-9.jpg",
    name: "BÔNG TAI KIM CƯƠNG 18K",
    category: "Bông tai kim cương",
    mainstone: "Round 5ly",
    typestone: "Kim cương",
    numbergem: "28",
    gold: "Vàng trắng",
    age: "18k",
    weight: "0.92",
    status: "Còn hàng",
    price: "488.800.000 ₫",
  },
  {
    key: "4",
    id: "MS159",
    image:
      "https://jemmia.vn/wp-content/uploads/2024/02/vong-tay-kim-cuong-18k-LT2022082803-3.jpg",
    name: "VÒNG TAY KIM CƯƠNG 18K",
    category: "Lắc/Vòng tay kim cương",
    mainstone: "Round 5ly",
    typestone: "Kim cương",
    numbergem: "28",
    gold: "Vàng trắng",
    age: "18k",
    weight: "0.92",
    status: "Hết hàng",
    price: "48.800.000 ₫",
  },
  {
    key: "5",
    id: "MS753",
    image: "https://jemmia.vn/wp-content/uploads/2024/04/2-copy-7.jpg",
    name: "MẶT DÂY CHUYỀN KIM CƯƠNG 18K",
    mainstone: "Round 5ly",
    typestone: "Kim cương",
    numbergem: "28",
    gold: "Vàng trắng",
    age: "18k",
    category: "Mặt dây chuyền kim cương",
    weight: "0.92",
    status: "Còn hàng",
    price: "88.800.000 ₫",
  },
  {
    key: "6",
    id: "MS258",
    image: "https://jemmia.vn/wp-content/uploads/2024/05/1_cam_03-2.jpg",
    name: "NHẪN CẦU HÔN KIM CƯƠNG 18K WRA00159",
    category: "Nhẫn cầu hôn kim cương",
    mainstone: "Round 5ly",
    typestone: "Kim cương",
    numbergem: "28",
    gold: "Vàng trắng",
    age: "18k",
    weight: "0.92",
    status: "Hết hàng",
    price: "88.800.000 ₫",
  },
  {
    key: "7",
    id: "MS165",
    image: "https://jemmia.vn/wp-content/uploads/2024/04/3-copy-4.jpg",
    name: "NHẪN CƯỚI KIM CƯƠNG 18K",
    category: "Nhẫn cưới kim cương",
    mainstone: "Round 5ly",
    typestone: "Kim cương",
    numbergem: "28",
    gold: "Vàng trắng",
    age: "18k",
    weight: "0.92",
    status: "Còn hàng",
    price: "68.800.000 ₫",
  },
];

function ProductDetail() {
  const { id } = useParams();
  const product = initialData.find((d) => d.id === id);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = () => {
    // Here, you would update the data in your backend with the new values
    setIsEditing(false); // Exit editing mode
    message.success("Lưu thành công!");
  };
  const handleDelete = () => {
    // Implement delete functionality here
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
                  name="name"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={product.name}
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
                  name="id"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={product.id}
                    className="input"
                    readOnly={!isEditing}
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={24} className="infor-detail">
                <Form.Item
                  label="Loại sản phẩm"
                  name="category"
                  className="custom-form-item"
                >
                  {isEditing ? (
                    <Select
                      style={{ width: "100%" }}
                      defaultValue={product.category}
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
                      defaultValue={product.category}
                      readOnly
                      style={{ width: "100%" }}
                    />
                  )}
                </Form.Item>
              </Col>

              <Col className="infor-detail" span={12}>
                <Form.Item
                  label="Kích thước đá chủ"
                  name="mainstone"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={product.mainstone}
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
                  name="typestone"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={product.typestone}
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
                  name="numbergem"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={product.numbergem}
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
                  name="gold"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={product.gold}
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
                  name="age"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={product.age}
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
                  name="weight"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={product.weight}
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
                  src={product.image}
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
                  <Col span={12}>
                    <Image
                      src={product.image}
                      alt="Product"
                      style={{
                        width: "60px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <Image
                      src={product.image}
                      alt="Product"
                      style={{
                        width: "60px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <Image
                      src={product.image}
                      alt="Product"
                      style={{
                        width: "60px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    />
                  </Col>
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
