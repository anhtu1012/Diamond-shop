/* eslint-disable react/prop-types */
import { Form, Input, Row, Col, Select, InputNumber, Button } from "antd";
import { useEffect } from "react";

function FormStep2({ onFinish, initialValues }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      values.certification = "Gia";
      onFinish(values);
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
    }
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
            name="dimensions"
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
            name="colorLevel"
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
          <Form.Item
            label="Kiểm Định"
            name="certificate"
            rules={[{ required: true, message: "Vui lòng không để trống" }]}
          >
            <Select
              placeholder="Chọn Kiểm định"
              style={{ width: "100%", height: "40px" }}
            >
              {["Gia", "Bên Khác"].map((certificate) => (
                <Select.Option key={certificate} value={certificate}>
                  {certificate}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12} className="info_detail1">
          <Form.Item
            label="Phát Quang"
            name="flourescence"
            rules={[{ required: true, message: "Vui lòng không để trống" }]}
          >
            <Select
              placeholder="Chọn Phát Quang"
              style={{ width: "100%", height: "40px" }}
            >
              {["Faint", "Medium", "Strong", "Very strong"].map(
                (flourescence) => (
                  <Select.Option key={flourescence} value={flourescence}>
                    {flourescence} (
                    {flourescence === "Faint"
                      ? "Yếu"
                      : flourescence === "Medium"
                      ? "Trung bình"
                      : flourescence === "Strong"
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
            name="cut"
            rules={[{ required: true, message: "Vui lòng không để trống" }]}
          >
            <Select
              placeholder="Chọn Nét Cắt/Độ Bóng/Đối Xứng"
              style={{ width: "100%", height: "40px" }}
            >
              {["Excellent", "Very good", "Good", "Fair", "Poor"].map((cut) => (
                <Select.Option key={cut} value={cut}>
                  {cut} (
                  {cut === "Excellent"
                    ? "Hoàn hảo"
                    : cut === "Very good"
                    ? "Rất tốt"
                    : cut === "Good"
                    ? "Tốt"
                    : cut === "Fair"
                    ? "Trung bình"
                    : "Kém"}
                  )
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={24} className="info_detail2">
          <Form.Item
            label="Màu Sắc"
            name="color"
            rules={[
              { required: true, message: "Vui lòng không để trống" },
              {
                pattern: /^[^!@#$%^&*()+=]+$/,
                message: "Vui lòng không nhập kí tự đặc biệt",
              },
            ]}
          >
            <Input className="input" allowClear placeholder="Nhập Màu Sắc" />
          </Form.Item>
        </Col>
      </Row>
      <div className="button_form_2">
        <Button type="primary" onClick={handleSubmit}>
          Lưu Thông tin
        </Button>
      </div>
    </Form>
  );
}

export default FormStep2;
