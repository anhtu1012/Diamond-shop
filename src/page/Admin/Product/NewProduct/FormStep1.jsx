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
    form.setFieldsValue({ subcategory: cityData[value][0], productID: "" });
  };

  const handleSubcategoryChange = (value) => {
    setSubcategory(value);
    form.setFieldsValue({ productID: "" });
  };

  const getProductIDRules = () => {
    switch (subcategory) {
      case "Nhẫn Cầu Hôn Kim Cương":
        return [
          { required: true, message: "Vui lòng không để trống" },
          {
            pattern: /^NCH\d{5,10}$/,
            message: "Mã sản phẩm phải là NCH và 5-10 số",
          },
        ];
      case "Nhẫn Cưới Kim Cương":
        return [
          { required: true, message: "Vui lòng không để trống" },
          {
            pattern: /^NC\d{5,10}$/,
            message: "Mã sản phẩm phải là NC và 5-10 số",
          },
        ];
      case "Nhẫn Kim Cương Nam":
        return [
          { required: true, message: "Vui lòng không để trống" },
          {
            pattern: /^NNA\d{5,10}$/,
            message: "Mã sản phẩm phải là NNA và 5-10 số",
          },
        ];
      case "Nhẫn Kim Cương Nữ":
        return [
          { required: true, message: "Vui lòng không để trống" },
          {
            pattern: /^NNU\d{5,10}$/,
            message: "Mã sản phẩm phải là NNU và 5-10 số",
          },
        ];
      case "Bông Tai Kim Cương":
        return [
          { required: true, message: "Vui lòng không để trống" },
          {
            pattern: /^BT\d{5,10}$/,
            message: "Mã sản phẩm phải là BT và 5-10 số",
          },
        ];
      case "Lắc/ Vòng Tay Kim Cương":
        return [
          { required: true, message: "Vui lòng không để trống" },
          {
            pattern: /^LV\d{5,10}$/,
            message: "Mã sản phẩm phải là LV và 5-10 số",
          },
        ];
      case "Mặt Dây Chuyền Kim Cương":
        return [
          { required: true, message: "Vui lòng không để trống" },
          {
            pattern: /^MD\d{5,10}$/,
            message: "Mã sản phẩm phải là MD và 5-10 số",
          },
        ];
      case "Dây Chuyền Kim Cương":
        return [
          { required: true, message: "Vui lòng không để trống" },
          {
            pattern: /^DC\d{5,10}$/,
            message: "Mã sản phẩm phải là DC và 5-10 số",
          },
        ];
      default:
        return [{ required: true, message: "Vui lòng không để trống" }];
    }
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
  }, [initialValues, form]);

  const handleSizesChange = (changedValues, allValues) => {
    if ("sizes" in changedValues) {
      const sizes = allValues.sizes || [];
      const totalQuantity = sizes.reduce(
        (sum, size) => sum + (Number(size.quantity) || 0),
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
          <Form.Item
            label="Mã sản phẩm"
            name="productID"
            rules={getProductIDRules()}
          >
            <Input
              className="input"
              allowClear
              placeholder="Chữ cái đầu + 5 số Ví dụ: NCH5xxxx"
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
            <Col span={5}>
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
            <Col span={6}>
              <Form.Item
                label="Tiền Công"
                name="wagePrice"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng không để trống",
                  },
                  {
                    type: "number",
                    min: 0,
                    message: "Tiền phải lớn hơn 0",
                  },
                ]}
              >
                <InputNumber
                  className="input"
                  style={{
                    width: "92%",
                  }}
                  placeholder="100000"
                />
              </Form.Item>
            </Col>
            <Col span={13}>
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
                    width: "63%",
                  }}
                  placeholder="0000000"
                  addonAfter={selectAfter}
                />
              </Form.Item>
            </Col>
          </Row>
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
                      <Col span={11} key={field.key}>
                        <Space
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
                            name={[field.name, "quantity"]}
                            fieldKey={[field.fieldKey, "quantity"]}
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
