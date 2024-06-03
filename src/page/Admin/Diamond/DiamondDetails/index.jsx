import {
  Col,
  Row,
  Form,
  Input,
  Image,
  Button,
  message,
  Select,
  DatePicker,
  theme,
} from "antd";
import { useParams } from "react-router-dom";
import "./index.scss";
import { useState } from "react";
import moment from "moment/moment";
import { Content } from "antd/es/layout/layout";
const initialData = [
  {
    key: "1",
    id: "DM1",
    image: "https://jemmia.vn/wp-content/uploads/2023/09/image-3-1-1-1.png",
    nameDm: "Kim Cương Tự Nhiên EEE",
    gia: "1478963250",
    ratio: "2",
    luminescence: "Faint",
    priceImport: "400.000.000 ₫",
    date: "2024-06-02",
    style: "Round",
    weight: "1.1",
    color: "F",
    purity: "FL",
    accreditation: "GIA",
    status: "Còn hàng",
    size: "6.0",
    price: "488.800.000 ₫",
  },
  {
    key: "2",
    id: "DM2",
    image: "https://jemmia.vn/wp-content/uploads/2023/09/image-3-1-1-1.png",
    nameDm: "Kim Cương Tự Nhiên EEE",
    gia: "1478963250",
    luminescence: "Medium",
    ratio: "2",
    priceImport: "400.000.000 ₫",
    date: "2024-06-02",
    style: "Round",
    weight: "2.0",
    color: "D",
    purity: "VS2",
    accreditation: "GIA",
    status: "Còn hàng",
    size: "3.0",
    price: "488.800.000 ₫",
  },
  {
    key: "3",
    id: "DM3",
    image: "https://jemmia.vn/wp-content/uploads/2023/09/image-3-1-1-1.png",
    nameDm: "Kim Cương Tự Nhiên EEE",
    gia: "1478963250",
    ratio: "2",
    luminescence: "Strong",
    priceImport: "400.000.000 ₫",
    date: "2024-06-02",
    style: "Round",
    weight: "1.0",
    color: "D",
    purity: "VVS1",
    accreditation: "GIA",
    status: "Còn hàng",
    size: "3.6",
    price: "488.800.000 ₫",
  },
  {
    key: "4",
    id: "DM4",
    image: "https://jemmia.vn/wp-content/uploads/2023/09/image-3-1-1-1.png",
    nameDm: "Kim Cương Tự Nhiên EEE",
    gia: "1478963250",
    ratio: "2",
    luminescence: "Faint",
    priceImport: "400.000.000 ₫",
    date: "2024-06-02",
    style: "Round",
    weight: "1.0",
    color: "E",
    purity: "IF",
    accreditation: "GIA",
    status: "Còn hàng",
    size: "2.6",
    price: "48.800.000 ₫",
  },
  {
    key: "5",
    id: "DM5",
    image: "https://jemmia.vn/wp-content/uploads/2023/09/image-3-1-1-1.png",
    nameDm: "Kim Cương Tự Nhiên EEE",
    gia: "1478963250",
    ratio: "2",
    luminescence: "Strong",
    priceImport: "400.000.000 ₫",
    date: "2024-06-02",
    style: "Round",
    weight: "1.0",
    color: "F",
    purity: "FL",
    accreditation: "GIA",
    status: "Còn hàng",
    size: "6.6",
    price: "88.800.000 ₫",
  },
  {
    key: "6",
    id: "DM6",
    image: "https://jemmia.vn/wp-content/uploads/2023/09/image-3-1-1-1.png",
    nameDm: "Kim Cương Tự Nhiên EEE",
    gia: "1478963250",
    ratio: "2",
    luminescence: "Faint",
    priceImport: "400.000.000 ₫",
    date: "2024-06-02",
    style: "Round",
    weight: "1.0",
    color: "F",
    purity: "FL",
    accreditation: "GIA",
    status: "Hết hàng",
    size: "6.6",
    price: "88.800.000 ₫",
  },
  {
    key: "7",
    id: "DM7",
    image: "https://jemmia.vn/wp-content/uploads/2023/09/image-3-1-1-1.png",
    nameDm: "Kim Cương Tự Nhiên EEE",
    gia: "1478963250",
    ratio: "2",
    luminescence: "Faint",
    priceImport: "400.000.000 ₫",
    date: "2024-06-02",
    style: "Round",
    weight: "1.0",
    color: "F",
    purity: "FL",
    accreditation: "GIA",
    status: "Hết hàng",
    size: "6.6",
    price: "68.800.000 ₫",
  },
  {
    key: "8",
    id: "DM8",
    image: "https://jemmia.vn/wp-content/uploads/2023/09/image-3-1-1-1.png",
    nameDm: "Kim Cương Tự Nhiên EEE",
    gia: "1478963250",
    ratio: "2",
    luminescence: "Faint",
    priceImport: "400.000.000 ₫",
    date: "2024-06-02",
    style: "Round",
    weight: "1.5",
    color: "D",
    purity: "FL",
    accreditation: "GIA",
    status: "Hết hàng",
    size: "6.6",
    price: "58.800.000 ₫",
  },
  {
    key: "9",
    id: "DM9",
    image: "https://jemmia.vn/wp-content/uploads/2023/09/image-3-1-1-1.png",
    nameDm: "Kim Cương Tự Nhiên EEE",
    gia: "1478963250",
    ratio: "2",
    luminescence: "Faint",
    priceImport: "400.000.000 ₫",
    date: "2024-06-02",
    style: "Round",
    weight: "1.0",
    color: "F",
    purity: "FL",
    accreditation: "GIA",
    status: "Hết hàng",
    size: "3.3",
    price: "58.800.000 ₫",
  },
  {
    key: "10",
    id: "DM10",
    image: "https://jemmia.vn/wp-content/uploads/2023/09/image-3-1-1-1.png",
    nameDm: "Kim Cương Tự Nhiên EEE",
    gia: "1478963250",
    ratio: "2",
    luminescence: "Faint",
    priceImport: "400.000.000 ₫",
    date: "2024-06-02",
    style: "Round",
    weight: "1.0",
    color: "F",
    purity: "FL",
    accreditation: "GIA",
    status: "Hết hàng",
    size: "6.6",
    price: "488.800.000 ₫",
  },
  {
    key: "11",
    id: "DM11",
    image: "https://jemmia.vn/wp-content/uploads/2023/09/image-3-1-1-1.png",
    nameDm: "Kim Cương Tự Nhiên EEE",
    gia: "1478963250",
    ratio: "2",
    luminescence: "Faint",
    priceImport: "400.000.000 ₫",
    date: "2024-06-02",
    style: "Round",
    weight: "1.0",
    color: "F",
    purity: "FL",
    accreditation: "GIA",
    status: "Hết hàng",
    size: "6.6",
    price: "488.800.000 ₫",
  },
];

function DiamondDetails() {
  const { id } = useParams();
  const diamond = initialData.find((d) => d.id === id);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        // Update your backend with the new values
        console.log("Updated values: ", values);
        setIsEditing(false);
        message.success("Lưu thành công!");
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleDelete = () => {
    // Implement delete functionality here
    message.success("Xóa thành công");
  };

  if (!diamond) {
    return <div>Diamond not found</div>;
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
            <h3 style={{ fontWeight: "400" }}>Thông tin chi tiết kim cương</h3>
            <Row
              gutter={20}
              className="detail1"
              style={{ padding: "5px 10px" }}
            >
              <Col className="infor-detail" span={12}>
                <Form.Item
                  label="Mã GIA"
                  name="gia"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={diamond.gia}
                    readOnly={!isEditing}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col className="infor-detail" span={12}>
                <Form.Item
                  label="Tên Kim Cương"
                  name="nameDm"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={diamond.nameDm}
                    readOnly={!isEditing}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={24} className="infor-detail">
                <Form.Item
                  label="Giá Nhập (VNĐ)"
                  name="priceImport"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={diamond.priceImport}
                    readOnly={!isEditing}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col className="infor-detail" span={12}>
                <Form.Item
                  label="Tỷ lệ (%)"
                  name="ratio"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={diamond.ratio}
                    readOnly={!isEditing}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col className="infor-detail" span={12}>
                <Form.Item
                  label="Ngày Nhập"
                  name="input_date"
                  className="custom-form-item"
                >
                  {isEditing ? (
                    <DatePicker
                      style={{ width: "100%" }}
                      value={moment(diamond.date, "YYYY-MM-DD")}
                      format="YYYY-MM-DD"
                    />
                  ) : (
                    <Input
                      defaultValue={diamond.date}
                      readOnly
                      style={{ width: "100%", marginRight: "10px" }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col className="infor-detail" span={12}>
                <Form.Item
                  label="Độ Phát Quang"
                  name="luminescence"
                  className="custom-form-item"
                >
                  {isEditing ? (
                    <Select
                      style={{ width: "100%" }}
                      defaultValue={diamond.luminescence}
                    >
                      {["Faint", "Medium", "Strong", "Very Strong"].map(
                        (luminescence) => (
                          <Select.Option
                            key={luminescence}
                            value={luminescence}
                          >
                            {luminescence}
                          </Select.Option>
                        )
                      )}
                    </Select>
                  ) : (
                    <Input
                      defaultValue={diamond.luminescence}
                      readOnly
                      style={{ width: "100%" }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col className="infor-detail" span={12}>
                <Form.Item
                  label="Hình Dạng"
                  name="shape"
                  className="custom-form-item"
                >
                  {isEditing ? (
                    <Select
                      style={{ width: "100%" }}
                      defaultValue={diamond.style}
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
                  ) : (
                    <Input
                      defaultValue={diamond.style}
                      readOnly
                      style={{ width: "100%" }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col className="infor-detail" span={12}>
                <Form.Item
                  label="Cấp Màu (Color)"
                  name="color"
                  className="custom-form-item"
                >
                  {isEditing ? (
                    <Select
                      style={{ width: "100%" }}
                      defaultValue={diamond.color}
                    >
                      {["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"].map(
                        (color) => (
                          <Select.Option key={color} value={color}>
                            {color}
                          </Select.Option>
                        )
                      )}
                    </Select>
                  ) : (
                    <Input
                      defaultValue={diamond.color}
                      readOnly
                      style={{ width: "100%" }}
                    />
                  )}
                </Form.Item>

                <Form.Item
                  label="Trọng lượng (cts)"
                  name="weight"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={diamond.weight}
                    readOnly={!isEditing}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col className="infor-detail" span={12}>
                <Form.Item
                  label="Độ Tinh Khiết (Purity)"
                  name="purity"
                  className="custom-form-item"
                >
                  {isEditing ? (
                    <Select
                      style={{ width: "100%" }}
                      defaultValue={diamond.purity}
                    >
                      {[
                        "FL",
                        "IF",
                        "VVS1",
                        "VVS2",
                        "VS1",
                        "VS2",
                        "SI1",
                        "SI2",
                        "I1",
                        "I2",
                        "I3",
                      ].map((purity) => (
                        <Select.Option key={purity} value={purity}>
                          {purity}
                        </Select.Option>
                      ))}
                    </Select>
                  ) : (
                    <Input
                      defaultValue={diamond.purity}
                      readOnly
                      style={{ width: "100%" }}
                    />
                  )}
                </Form.Item>

                <Form.Item
                  label="Kích thước (mm)"
                  name="size"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={diamond.size}
                    readOnly={!isEditing}
                    style={{ width: "100%" }}
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
                  src={diamond.image}
                  alt="Diamond"
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
                      src={diamond.image}
                      alt="Diamond"
                      style={{
                        width: "60px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <Image
                      src={diamond.image}
                      alt="Diamond"
                      style={{
                        width: "60px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <Image
                      src={diamond.image}
                      alt="Diamond"
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
                  label="Kiểm định"
                  name="accreditation"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={diamond.accreditation}
                    readOnly
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  label="Trạng thái"
                  name="status"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={diamond.status}
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
                  label="Giá Bán (VNĐ)"
                  name="price"
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={diamond.price}
                    readOnly={!isEditing}
                    style={{ width: "100%" }}
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

export default DiamondDetails;
