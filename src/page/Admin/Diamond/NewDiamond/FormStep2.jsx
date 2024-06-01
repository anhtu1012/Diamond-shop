/* eslint-disable react/prop-types */
import {
  Form,
  Input,
  Row,
  Col,
  Select,
  InputNumber,
  Button,
  Popconfirm,
} from "antd";
import { useEffect, useState } from "react";

function FormStep2({ onFinish, initialValues }) {
  const [form] = Form.useForm();
  const [confirmVisible, setConfirmVisible] = useState(false);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleConfirm = async () => {
    try {
      const values = await form.validateFields();
      onFinish(values);
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
    }
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      setConfirmVisible(true);
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
    }
  };

  const handleCancel = () => {
    setConfirmVisible(false);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={initialValues}
      labelCol={{ span: 24 }}
    >
      <Row gutter={30} className="form_step2" style={{ padding: "0px 100px " }}>
        <Col span={12} className="info_detail1">
          <Form.Item
            label="Trọng Lượng (Carat)"
            name="carat"
            rules={[{ required: true, message: "Vui lòng không để trống" }]}
          >
            <InputNumber
              className="input"
              allowClear
              placeholder="Nhập Trọng Lượng (Carat)"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col span={12} className="info_detail2">
          <Form.Item
            label="KÍCH THƯỚC (MM)"
            name="size"
            rules={[{ required: true, message: "Vui lòng không để trống" }]}
          >
            <InputNumber
              className="input"
              allowClear
              placeholder="Nhập KÍCH THƯỚC (MM)"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col span={12} className="info_detail1">
          <Form.Item
            label="Cấp Màu (Color)"
            name="color"
            rules={[{ required: true, message: "Vui lòng không để trống" }]}
          >
            <Select
              placeholder="Chọn Cấp Màu"
              style={{ width: "100%", height: "40px" }}
            >
              {["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"].map(
                (color) => (
                  <Select.Option key={color} value={color}>
                    {color}
                  </Select.Option>
                )
              )}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12} className="info_detail2">
          <Form.Item
            label="Độ Tinh Khiết (Clarify)"
            name="clarify"
            rules={[{ required: true, message: "Vui lòng không để trống" }]}
          >
            <Select
              placeholder="Chọn Độ Tinh Khiết"
              style={{ width: "100%", height: "40px" }}
            >
              {[
                "IF",
                "VVS1",
                "VVS2",
                "VS1",
                "VS2",
                "SI1",
                "SI2",
                "I1",
                "I2",
              ].map((clarity) => (
                <Select.Option key={clarity} value={clarity}>
                  {clarity}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12} className="info_detail1">
          <Form.Item
            label="Hình Dạng (Shape)"
            name="shape"
            rules={[{ required: true, message: "Vui lòng không để trống" }]}
          >
            <Select
              placeholder="Chọn Hình Dạng"
              style={{ width: "100%", height: "40px" }}
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
        <Col span={12} className="info_detail2">
          <Form.Item label="Kiểm Định" name="certification">
            <Input className="input" value="Gia" placeholder="Gia" disabled />
          </Form.Item>
        </Col>
        <Col span={12} className="info_detail1">
          <Form.Item
            label="Phát Quang"
            name="fluorescence"
            rules={[{ required: true, message: "Vui lòng không để trống" }]}
          >
            <Select
              placeholder="Chọn Phát Quang"
              style={{ width: "100%", height: "40px" }}
            >
              {["Faint", "Medium", "Strong", "Very strong"].map(
                (fluorescence) => (
                  <Select.Option key={fluorescence} value={fluorescence}>
                    {fluorescence} (
                    {fluorescence === "Faint"
                      ? "Yếu"
                      : fluorescence === "Medium"
                      ? "Trung bình"
                      : fluorescence === "Strong"
                      ? "Mạnh"
                      : "Rất mạnh"}
                    )
                  </Select.Option>
                )
              )}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12} className="info_detail2">
          <Form.Item
            label="Nét Cắt/Độ Bóng/Đối Xứng"
            name="cut_polish_symmetry"
            rules={[{ required: true, message: "Vui lòng không để trống" }]}
          >
            <Select
              placeholder="Chọn Nét Cắt/Độ Bóng/Đối Xứng"
              style={{ width: "100%", height: "40px" }}
            >
              {["Excellent", "Very good", "Good", "Fair", "Poor"].map(
                (grade) => (
                  <Select.Option key={grade} value={grade}>
                    {grade} (
                    {grade === "Excellent"
                      ? "Hoàn hảo"
                      : grade === "Very good"
                      ? "Rất tốt"
                      : grade === "Good"
                      ? "Tốt"
                      : grade === "Fair"
                      ? "Trung bình"
                      : "Kém"}
                    )
                  </Select.Option>
                )
              )}
            </Select>
          </Form.Item>
        </Col>
        <Col span={24} className="info_detail2">
          <Form.Item
            label="Màu Sắc"
            name="color_detail"
            rules={[{ required: true, message: "Vui lòng không để trống" }]}
          >
            <Input className="input" allowClear placeholder="Nhập Màu Sắc" />
          </Form.Item>
        </Col>
      </Row>
      <div className="button_form_2">
        <Popconfirm
          title="Xác nhận"
          description="Xác nhận lại thông tin!"
          visible={confirmVisible}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" onClick={handleSubmit}>
            Hoàn Tất
          </Button>
        </Popconfirm>
      </div>
    </Form>
  );
}

export default FormStep2;
