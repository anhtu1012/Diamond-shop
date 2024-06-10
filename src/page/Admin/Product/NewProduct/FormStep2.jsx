/* eslint-disable react/prop-types */
import {
  Form,
  Input,
  Row,
  Col,
  Radio,
  Select,
  InputNumber,
  Button,
} from "antd";

function FormProductStep2({ onFinish, initialValues }) {
  const [form] = Form.useForm();
  const option = [
    {
      value: "Nhẫn",
      label: "Nhẫn",
    },
    {
      value: "Lắc/Vòng tay",
      label: "Lắc/Vòng tay",
    },
    {
      value: "Mặt dây chuyền",
      label: "Mặt dây chuyền",
    },
    {
      value: "Bông tai",
      label: "Bông tai",
    },
  ];

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onFinish(values);
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      initialValues={initialValues}
      labelCol={{
        span: 24,
      }}
    >
      <Row
        gutter={30}
        className="form_stepp2"
        style={{ padding: "0px 100px " }}
      >
        <Col span={12} className="info_detail2">
          <Form.Item label="Loại sản phẩm" name="productType">
            <Select
              style={{
                width: "100%",
                height: "40px",
              }}
              placeholder="Nhập Loại sản phẩm"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={option}
            />
          </Form.Item>
        </Col>
        <Col span={12} className="info_detail2">
          <Form.Item label="Chất liệu khác" name="message">
            <Input
              className="input"
              allowClear
              placeholder="Nhập Chất Liệu Khác Sản Phẩm"
            />
          </Form.Item>
        </Col>
        <Col span={12} className="info_detail1">
          <Form.Item
            label="Hình Dạng (Shape)"
            name="shapeDiamond"
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
            label="KÍCH THƯỚC (MM)"
            name="dimensionsDiamond"
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
        <Col span={12} className="info_detail2">
          <Form.Item
            label="Loại vàng"
            name="goldType"
            rules={[
              {
                required: true,
                message: "Vui lòng không để trống",
              },
              {
                pattern: /^[^!@#$%^&*()+=]+$/,
                message: "Vui lòng không nhập kí tự đặc biệt",
              },
            ]}
          >
            <Input className="input" allowClear placeholder="Nhập Loại Vàng" />
          </Form.Item>
        </Col>
        <Col span={12} className="info_detail2">
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
              className="input"
              allowClear
              placeholder="Nhập Trọng Lượng Vàng"
            />
          </Form.Item>
        </Col>
        <Col span={8} className="info_detail2">
          <Form.Item
            label="Loại đá tấm"
            name="bathStone"
            rules={[
              {
                required: true,
                message: "Vui lòng không để trống",
              },
              {
                pattern: /^[^!@#$%^&*()+=]+$/,
                message: "Vui lòng không nhập kí tự đặc biệt",
              },
            ]}
          >
            <Input
              className="input"
              allowClear
              placeholder="Nhập Loại đá Tấm"
            />
          </Form.Item>
        </Col>
        <Col span={8} className="info_detail2">
          <Form.Item
            label="Số lượng đá tấm"
            name="quantityStonesOfDiamond"
            rules={[
              {
                required: true,
                message: "Vui lòng không để trống",
              },
              {
                type: "number",
                min: 0,
                message: "Phải là một số không âm",
              },
            ]}
          >
            <InputNumber
              className="input"
              allowClear
              placeholder="Nhập Số Lượng Đá Tấm"
            />
          </Form.Item>
        </Col>
        <Col span={8} className="info_detail2">
          <Form.Item
            label="Trọng lượng đá (ct)"
            name="stoneWeight"
            rules={[
              {
                required: true,
                message: "Vui lòng không để trống",
              },
              {
                type: "number",
                min: 0,
                message: "Phải là một số không âm",
              },
            ]}
          >
            <InputNumber
              className="input"
              allowClear
              placeholder="Nhập Trọng Lượng Đá"
            />
          </Form.Item>
        </Col>

        <Col span={24} className="info_detail2">
          <Form.Item label="Tuổi vàng" name="oldGold">
            <Radio.Group>
              <Radio value="10k">10k</Radio>
              <Radio value="14k">14k</Radio>
              <Radio value="18k">18k</Radio>
              <Radio value="22k">22k</Radio>
              <Radio value="24k">24k</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <></>
      <div className="button_form_2">
        <Button type="primary" htmlType="submit">
          Lưu Thông tin
        </Button>
      </div>
    </Form>
  );
}

export default FormProductStep2;
