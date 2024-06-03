/* eslint-disable react/prop-types */
import {
  Form,
  Input,
  Row,
  Col,
  Radio,
  Select,
  InputNumber,
  Popconfirm,
  Button,
} from "antd";
import { useState } from "react";

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
  const [confirmVisible, setConfirmVisible] = useState(false);
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
      labelCol={{
        span: 24,
      }}
    >
      <Row gutter={30} className="form_step2" style={{ padding: "0px 100px " }}>
        <Col span={12} className="info_detail1">
          <Form.Item
            label="Thương hiệu"
            name="brand"
            rules={[
              {
                required: true,
                message: "Vui lòng không để trống",
              },
            ]}
          >
            <Input
              className="input"
              allowClear
              placeholder="Nhập Tên Thương Hiệu"
            />
          </Form.Item>
        </Col>
        <Col span={12} className="info_detail2">
          <Form.Item
            label="Kích thước đá chủ"
            name="mainStoneSize"
            rules={[
              {
                required: true,
                message: "Vui lòng không để trống",
              },
            ]}
          >
            <Input
              className="input"
              allowClear
              placeholder="Nhập Kích Thước Đá Chủ"
            />
          </Form.Item>
        </Col>
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
          <Form.Item label="Chất liệu khác" name="otherMaterial">
            <Input
              className="input"
              allowClear
              placeholder="Nhập Chất Liệu Khác Sản Phẩm"
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
            name="paveStoneType"
            rules={[
              {
                required: true,
                message: "Vui lòng không để trống",
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
            name="paveStoneQuantity"
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
          <Form.Item label="Tuổi vàng" name="goldAge">
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
            Tạo Sản Phẩm
          </Button>
        </Popconfirm>
      </div>
    </Form>
  );
}

export default FormProductStep2;
