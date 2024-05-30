/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
} from "antd";
import ImgCrop from "antd-img-crop";

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
    "Nhẫn Kim Cương",
    "Bông Tai Kim Cương",
    "Lắc/Vòng Tay Kim Cương",
    "Mặc Dây Chuyền Kim Cương",
  ],
};

const provinceData = ["Trang Sức Cưới", "Trang sức Kim Cương"];

function FormStep1({ onFinish, initialValues }) {
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
      category,
      subcategory,
    });
  };

  return (
    <Form
      onFinish={handleFinish}
      labelCol={{
        span: 24,
      }}
      initialValues={initialValues}
    >
      <Row className="form_step1">
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
            label="Tên sản phẩm"
            name="name"
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
              placeholder="Nhập Tên Sản Phẩm"
            />
          </Form.Item>
          <Form.Item
            label="Giá Tiền"
            name="price"
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
                width: "80%",
              }}
              placeholder="Nhập Giá Sản Phẩm"
              addonAfter={selectAfter}
            />
          </Form.Item>
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
        <Col span={24} className="button_form">
          <button type="submit">Tiếp theo</button>
        </Col>
      </Row>
    </Form>
  );
}

export default FormStep1;
