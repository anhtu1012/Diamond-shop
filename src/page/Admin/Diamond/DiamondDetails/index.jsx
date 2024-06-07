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
import { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import moment from "moment";
import {
  deleteDiamond,
  fetchDiamondById,
  updateDiamond,
} from "../../../../../services/Uservices";

function DiamondDetails() {
  const { id } = useParams();
  const [diamond, setDiamond] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const loadDiamond = async () => {
      if (id && form) {
        // Ensure id and form are both defined
        try {
          const response = await fetchDiamondById(id);
          if (!response || response.error) {
            message.error("Không tìm thấy thông tin kim cương");
            return;
          }
          setDiamond(response);
          form.setFieldsValue({
            ...response,
            input_date: response.date
              ? moment(response.date, "YYYY-MM-DD")
              : null,
          });
        } catch (error) {
          message.error("Có lỗi xảy ra khi tải thông tin kim cương");
        }
      }
    };

    loadDiamond(); // Call the function directly
  }, [id, form]);
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const formattedDate = values.input_date
        ? values.input_date.format("YYYY-MM-DD")
        : "";
      // Đây là một ví dụ về việc xử lý "positive"
      await updateDiamond(id, { ...values, input_date: formattedDate });
      message.success("Lưu thông tin thành công");
      setIsEditing(false); // Trả về trạng thái không chỉnh sửa
    } catch (error) {
      // Và đây là việc xử lý "negative" nếu việc validate biểu mẫu thất bại
      message.error("Lỗi khi lưu thông tin");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDiamond(id);
      message.success("Xóa kim cương thành công");
      history.goBack(); // Hoặc bạn có thể điều hướng đến một trang mong muốn
    } catch (error) {
      message.error("Lỗi khi xóa kim cương"); // Xử lý "negative"
    }
  };

  if (!diamond) {
    return <div>Đang tải thông tin kim cương...</div>;
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
            <h3 style={{ fontWeight: "500" }}>Thông tin chi tiết kim cương</h3>
            <Form form={form} layout="vertical">
              <Row
                gutter={20}
                className="detail1"
                style={{ padding: "5px 10px" }}
              >
                <Col className="infor-detail" span={12}>
                  <Form.Item
                    label="Mã GIA"
                    name="diamondID"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng không để trống",
                      },
                      {
                        validator: (_, value) =>
                          value && /^\d{10}$/.test(value)
                            ? Promise.resolve()
                            : Promise.reject(
                                new Error("Mã Gia phải chứa đúng 10 chữ số")
                              ),
                      },
                    ]}
                    className="custom-form-item"
                  >
                    <Input
                      defaultValue={diamond.diamondID}
                      readOnly={!isEditing}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col className="infor-detail" span={12}>
                  <Form.Item
                    label="Tên Kim Cương"
                    name="diamondName"
                    rules={[
                      { required: true, message: "Vui lòng không để trống" },
                    ]}
                    className="custom-form-item"
                  >
                    <Input
                      defaultValue={diamond.diamondName}
                      readOnly={!isEditing}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24} className="infor-detail">
                  <Form.Item
                    label="Giá Nhập (VNĐ)"
                    name="originPrice"
                    rules={[
                      { required: true, message: "Vui lòng không để trống" },
                    ]}
                    className="custom-form-item"
                  >
                    <Input
                      defaultValue={diamond.originPrice}
                      readOnly={!isEditing}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col className="infor-detail" span={12}>
                  <Form.Item
                    label="Tỷ lệ (%)"
                    name="ratio"
                    rules={[
                      { required: true, message: "Vui lòng không để trống" },
                    ]}
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
                    name="inputDate"
                    rules={[
                      { required: true, message: "Vui lòng không để trống" },
                    ]}
                    className="custom-form-item"
                  >
                    {isEditing ? (
                      <DatePicker
                        style={{ width: "100%" }}
                        defaultValue={moment(diamond.inputDate, "YYYY-MM-DD")}
                      />
                    ) : (
                      <Input
                        defaultValue={moment(diamond.inputDate, "YYYY-MM-DD")}
                        readOnly
                        style={{ width: "100%", marginRight: "10px" }}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col className="infor-detail" span={12}>
                  <Form.Item
                    label="Độ Phát Quang"
                    name="flourescence"
                    rules={[
                      { required: true, message: "Vui lòng không để trống" },
                    ]}
                    className="custom-form-item"
                  >
                    {isEditing ? (
                      <Select
                        style={{ width: "100%" }}
                        defaultValue={diamond.flourescence}
                      >
                        {["Faint", "Medium", "Strong", "Very Strong"].map(
                          (flourescence) => (
                            <Select.Option
                              key={flourescence}
                              value={flourescence}
                            >
                              {flourescence}
                            </Select.Option>
                          )
                        )}
                      </Select>
                    ) : (
                      <Input
                        defaultValue={diamond.flourescence}
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
                    rules={[
                      { required: true, message: "Vui lòng không để trống" },
                    ]}
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
                    name="colorLevel"
                    rules={[
                      { required: true, message: "Vui lòng không để trống" },
                    ]}
                    className="custom-form-item"
                  >
                    {isEditing ? (
                      <Select
                        style={{ width: "100%" }}
                        defaultValue={diamond.colorLevel}
                      >
                        {["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"].map(
                          (colorLevel) => (
                            <Select.Option key={colorLevel} value={colorLevel}>
                              {colorLevel}
                            </Select.Option>
                          )
                        )}
                      </Select>
                    ) : (
                      <Input
                        defaultValue={diamond.colorLevel}
                        readOnly
                        style={{ width: "100%" }}
                      />
                    )}
                  </Form.Item>

                  <Form.Item
                    label="Trọng lượng (cts)"
                    name="carat"
                    rules={[
                      { required: true, message: "Vui lòng không để trống" },
                    ]}
                    className="custom-form-item"
                  >
                    <Input
                      defaultValue={diamond.carat}
                      readOnly={!isEditing}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col className="infor-detail" span={12}>
                  <Form.Item
                    label="Độ Tinh Khiết (clarify)"
                    name="clarify"
                    rules={[
                      { required: true, message: "Vui lòng không để trống" },
                    ]}
                    className="custom-form-item"
                  >
                    {isEditing ? (
                      <Select
                        style={{ width: "100%" }}
                        defaultValue={diamond.clarify}
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
                        ].map((clarify) => (
                          <Select.Option key={clarify} value={clarify}>
                            {clarify}
                          </Select.Option>
                        ))}
                      </Select>
                    ) : (
                      <Input
                        defaultValue={diamond.clarify}
                        readOnly
                        style={{ width: "100%" }}
                      />
                    )}
                  </Form.Item>

                  <Form.Item
                    label="Kích thước (mm)"
                    name="dimensions"
                    rules={[
                      { required: true, message: "Vui lòng không để trống" },
                    ]}
                    className="custom-form-item"
                  >
                    <Input
                      defaultValue={diamond.dimensions}
                      readOnly={!isEditing}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col className="infor-detail" span={12}>
                  <Form.Item
                    label="Nét Cắt/Độ Bóng/Đối Xứng"
                    name="cut"
                    rules={[
                      { required: true, message: "Vui lòng không để trống" },
                    ]}
                    className="custom-form-item"
                  >
                    <Input
                      defaultValue={diamond.cut}
                      readOnly={!isEditing}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col className="infor-detail" span={12}>
                  <Form.Item
                    label="Màu sắc"
                    name="color"
                    rules={[
                      { required: true, message: "Vui lòng không để trống" },
                    ]}
                    className="custom-form-item"
                  >
                    <Input
                      defaultValue={diamond.color}
                      readOnly={!isEditing}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
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
            <Row
              gutter={20}
              className="detail1"
              style={{ padding: "5px 10px" }}
            >
              <Col
                className="image-diamond-detail"
                span={24}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Image
                  className="image-diamond"
                  src={diamond.image}
                  alt="Diamond"
                  style={{
                    width: "130px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                />
              </Col>
              <Col className="infor-detail" span={24}>
                <Form.Item
                  label="Kiểm định"
                  name="certificate"
                  rules={[
                    { required: true, message: "Vui lòng không để trống" },
                  ]}
                  className="custom-form-item"
                >
                  <Input
                    defaultValue={diamond.certificate}
                    readOnly
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  label="Trạng thái"
                  name="status"
                  rules={[
                    { required: true, message: "Vui lòng không để trống" },
                  ]}
                  className="custom-form-item"
                >
                  {isEditing ? (
                    <Select
                      style={{ width: "100%" }}
                      defaultValue={diamond.status}
                    >
                      {["Còn hàng", "Hết hàng"].map((status) => (
                        <Select.Option key={status} value={status}>
                          {status}
                        </Select.Option>
                      ))}
                    </Select>
                  ) : (
                    <Input
                      defaultValue={diamond.status}
                      readOnly
                      style={{ width: "100%" }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col className="infor-detail" span={24}></Col>
              <Col className="infor-detail" span={24}>
                <Form.Item
                  label="Giá Bán (VNĐ)"
                  name="price"
                  rules={[
                    { required: true, message: "Vui lòng không để trống" },
                  ]}
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
