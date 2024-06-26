/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
  DatePicker,
} from "antd";
import ImgCrop from "antd-img-crop";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function FormStep1({ onFinish, initialValues }) {
  const [fileList, setFileList] = useState(initialValues?.fileList || []);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [form] = Form.useForm();
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
      setFileList(initialValues.fileList || []);
    }
  }, [initialValues, form]);
  
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const selectAfter = (
    <Select
      defaultValue="VN"
      style={{
        width: 70,
      }}
    >
      <Select.Option value="VN">vnđ</Select.Option>
      <Select.Option value="USD">$</Select.Option>
      <Select.Option value="EUR">€</Select.Option>
      <Select.Option value="CNY">¥</Select.Option>
    </Select>
  );

  const handleFinish = (values) => {
    onFinish({
      ...values,
      fileList,
    });
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      labelCol={{
        span: 24,
      }}
      initialValues={initialValues}
    >
      <Row gutter={6} className="form_step1">
        <Col span={10} className="upload_img">
          <ImgCrop rotationSlider>
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={handlePreview}
              style={{ fontSize: "30px" }}
            >
              {fileList.length < 1 && "+ Upload"}
            </Upload>
          </ImgCrop>
          {previewImage && (
            <Image
              wrapperStyle={{
                display: "none",
              }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </Col>
        <Col span={14} className="info_basic">
          <Form.Item
            label="Mã Kim Cương"
            name="diamondID"
            rules={[
              {
                required: true,
                message: "Vui lòng không để trống",
              },
              {
                pattern: /^[^!@#$%^&*()+=]+$/,
                message: "Vui lòng không nhập kí tự đặc biệt",
              },
              {
                validator: (_, value) =>
                  value && /^\d{5,10}$/.test(value)
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("Mã sản phẩm phải từ 5 đến 10 chữ số")
                      ),
              },
            ]}
          >
            <Input
              className="input"
              allowClear
              placeholder="xxxxxxxxxx"
              maxLength={10}
            />
          </Form.Item>
          <Form.Item
            label="Tên Kim Cương"
            name="diamondName"
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
              placeholder="Nhập Tên Kim Cương"
            />
          </Form.Item>
          <Row>
            <Col span={4}>
              <Form.Item
                label="Tỷ lệ (%)"
                name="ratio"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng không để trống",
                  },
                  {
                    type: "number",
                    min: 0,
                    max: 100,
                    message: "Tỷ lệ phải là một số trong khoảng 0 đến 100",
                  },
                ]}
              >
                <InputNumber
                  className="input"
                  style={{
                    width: "90%",
                  }}
                  placeholder="0"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Giá Nhập"
                name="originPrice"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng không để trống",
                  },
                  {
                    type: "number",
                    min: 0,
                    message: "Giá tiền phải là một số không âm",
                  },
                ]}
              >
                <InputNumber
                  className="input_price"
                  style={{
                    width: "95%",
                  }}
                  placeholder="0000000"
                  addonAfter={selectAfter}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Ngày Nhập"
                name="inputDate"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn ngày",
                  },
                ]}
              >
                <DatePicker
                  className="input"
                  style={{
                    width: "60%",
                  }}
                  placeholder="Chọn ngày"
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={24} className="button_form">
          <button type="submit">Lưu Thông tin</button>
        </Col>
      </Row>
    </Form>
  );
}

export default FormStep1;
