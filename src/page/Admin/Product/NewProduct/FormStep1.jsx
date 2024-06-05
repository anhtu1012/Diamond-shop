/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Upload,
} from "antd";
import ImgCrop from "antd-img-crop";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const cityData = {
  "Trang Sức Cưới": ["Nhẫn Cầu Hôn Kim Cương", "Nhẫn Cưới Kim Cương"],
  "Trang sức Kim Cương": [
    "Nhẫn Kim Cương Nam",
    "Nhẫn Kim Cương Nữ",
    "Bông Tai Kim Cương",
    "Lắc/ Vòng Tay Kim Cương",
    "Mặt Dây Chuyền Kim Cương",
    "Dây Chuyền Kim Cương",
  ],
};

const provinceData = ["Trang Sức Cưới", "Trang sức Kim Cương"];

function FormProductStep1({ onFinish, initialValues }) {
  const [fileList, setFileList] = useState(initialValues?.fileList || []);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [category, setCategory] = useState(
    initialValues?.category || provinceData[0]
  );
  const [subcategory, setSubcategory] = useState(
    initialValues?.subcategory || cityData[provinceData[0]][0]
  );

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

  const handleCategoryChange = (value) => {
    setCategory(value);
    setSubcategory(cityData[value][0]);
  };

  const handleSubcategoryChange = (value) => {
    setSubcategory(value);
  };

  const handleFinish = (values) => {
    onFinish({
      ...values,
      fileList,
      brand: "Diamond",
      subcategory,
    });
  };
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      quantity: initialValues?.quantity,
    });
    // Khi component lần đầu đươc mount, thiết lập giá trị cho 'quantity' trên form
  }, [initialValues, form]);

  const handleSizesChange = (changedValues, allValues) => {
    if ("sizes" in changedValues) {
      const sizes = allValues.sizes || [];
      const totalQuantity = sizes.reduce(
        (sum, size) => sum + (Number(size.quantitySize) || 0),
        0
      );
      form.setFieldsValue({ quantity: totalQuantity });
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      labelCol={{
        span: 24,
      }}
      initialValues={initialValues}
      onValuesChange={handleSizesChange}
    >
      <Row className="form_stepp1">
        <Col span={12} className="info_basicc">
          <Form.Item
            label="Mã sản phẩm"
            name="productID"
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
              placeholder="Nhập Mã Sản Phẩm"
            />
          </Form.Item>
          <Form.Item
            label="Tên sản phẩm"
            name="productName"
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
              placeholder="Nhập Tên Sản Phẩm"
            />
          </Form.Item>
          <Row>
            <Col span={8}>
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
            <Col span={12}>
              <Form.Item
                label="Giá Vốn"
                name="originalPrice"
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
          </Row>
          <Form.Item label="Chuyên mục" name="category">
            <div className="category-select-container">
              <Select
                className="category-select"
                value={category}
                onChange={handleCategoryChange}
                options={provinceData.map((province) => ({
                  label: province,
                  value: province,
                }))}
              />
              <Select
                className="category-select"
                value={subcategory}
                onChange={handleSubcategoryChange}
                options={cityData[category].map((city) => ({
                  label: city,
                  value: city,
                }))}
              />
            </div>
          </Form.Item>
        </Col>
        <Col span={12} className="info_basicc">
          <Form.Item label="Thương hiệu" name="brand">
            <Input
              className="input"
              value="Diamond"
              placeholder="Diamond"
              disabled
            />
          </Form.Item>
          <Form.Item label="Số lượng tổng" name="quantity">
            <InputNumber
              className="input"
              placeholder="Số lượng tổng"
              disabled
            />
          </Form.Item>
          <Form.Item label="Kích thước">
            <Form.List name="sizes">
              {(fields, { add, remove }) => (
                <div>
                  <div style={{ marginBottom: 16 }}>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                      style={{ height: "40px" }}
                    >
                      Thêm kích thước
                    </Button>
                  </div>
                  <Row>
                    {fields.map((field) => (
                      <Col span={11}>
                        <Space
                          key={field.key}
                          style={{
                            display: "flex",
                            alignContent: "center",
                            marginBottom: 8,
                          }}
                          align="start"
                        >
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
                            <InputNumber placeholder="Kích thước" min={1} />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            name={[field.name, "quantitySize"]}
                            fieldKey={[field.fieldKey, "quantitySize"]}
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập số lượng",
                              },
                            ]}
                          >
                            <InputNumber placeholder="Số lượng" min={1} />
                          </Form.Item>
                          <MinusCircleOutlined
                            onClick={() => remove(field.name)}
                          />
                        </Space>
                      </Col>
                    ))}
                  </Row>
                </div>
              )}
            </Form.List>
          </Form.Item>

          <Form.Item>
            <ImgCrop rotationSlider>
              <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={handlePreview}
                style={{ fontSize: "30px" }}
              >
                {fileList.length < 4 && "+ Upload"}
              </Upload>
            </ImgCrop>
          </Form.Item>
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
        <Col span={24} className="button_form">
          <button type="submit">Tiếp theo</button>
        </Col>
      </Row>
    </Form>
  );
}

export default FormProductStep1;
