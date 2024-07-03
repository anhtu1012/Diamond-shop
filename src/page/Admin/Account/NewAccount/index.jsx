/* eslint-disable react/prop-types */
import {
  Col,
  Form,
  Image,
  Input,
  Row,
  Select,
  Space,
  Upload,
  message,
  Button,
} from "antd";
import "./index.scss";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getDistricts, getProvinces, getWards } from "vietnam-provinces";
import uploadFile from "../../../../utils/upload";
import { createUser } from "../../../../../services/Uservices";

const { Option } = Select;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const NewAccount = () => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [wards, setWards] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    const provincesList = getProvinces();
    setProvinces(provincesList);
  }, []);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleSubmit = async (values) => {
    try {
      const file = fileList[0]?.originFileObj;
      const avatar = file ? await uploadFile(file) : null;

      // Construct detailAddress
      const province = provinces.find((p) => p.code === values.city);
      const district = districts.find((d) => d.code === values.district);
      const ward = wards.find((w) => w.code === values.ward);
      const detailAddress = `${values.address}, ${ward?.name}, ${district?.name}, ${province?.name}`;

      const finalData = {
        ...values,
        avatar,
        detailAddress,
      };

      await createUser(finalData);
      message.success("Tạo tài khoản thành công! Vui lòng check Email.");
    } catch (error) {
      message.error("Tạo tài khoản thất bại, vui lòng thử lại!");
      console.error("Upload failed:", error);
    }
  };

  const handleProvinceChange = (value) => {
    const districtsList = getDistricts(value);
    setDistricts(districtsList);
    setWards([]);
    form.setFieldsValue({ district: undefined, ward: undefined });
  };

  const handleDistrictChange = (value) => {
    const wardsList = getWards(value);
    setWards(wardsList);
    form.setFieldsValue({ ward: undefined });
  };

  const uploadButton = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <PlusOutlined />
      <div>Upload</div>
    </div>
  );

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  return (
    <div className="create-account">
      <div className="title-create-account">
        <h1>Tạo tài khoản</h1>
      </div>
      <Row gutter={24}>
        <Col span={2}></Col>
        <Col span={10}>
          <h3 style={{ fontSize: "20px", marginBottom: "20px" }}>
            Thông tin chi tiết
          </h3>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập thư!" }]}
            >
              <Input placeholder="....@gmail.com" />
            </Form.Item>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Họ" name="firstName">
                  <Input placeholder="Họ*" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Tên" name="lastName">
                  <Input placeholder="Tên" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Tỉnh/TP" name="city">
              <Select
                className="input"
                placeholder="Tỉnh/TP*"
                onChange={handleProvinceChange}
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {provinces.map((province) => (
                  <Option key={province.code} value={province.code}>
                    {province.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Quận/Huyện" name="district">
                  <Select
                    className="input"
                    placeholder="Quận/Huyện*"
                    onChange={handleDistrictChange}
                    disabled={!districts.length}
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {districts.map((district) => (
                      <Option key={district.code} value={district.code}>
                        {district.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Phường/Xã" name="ward">
                  <Select
                    className="input"
                    placeholder="Phường/Xã*"
                    disabled={!wards.length}
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {wards.map((ward) => (
                      <Option key={ward.code} value={ward.code}>
                        {ward.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Địa chỉ cụ thể" name="address">
              <Input placeholder="Địa chỉ cụ thể*" />
            </Form.Item>
          </Form>
        </Col>
        <Col span={10} style={{ marginLeft: "20px", marginTop: "44px" }}>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password placeholder="Mật khẩu*" />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
              ]}
            >
              <Input placeholder="Số điện thoại" />
            </Form.Item>
            <Form.Item
              label="Phân quyền"
              name="role"
              rules={[{ required: true, message: "Vui lòng chọn phân quyền!" }]}
            >
              <Select placeholder="Chọn phân quyền">
                <Option value="1">Quản lý</Option>
                <Option value="2">Nhân viên bán hàng</Option>
                <Option value="3">Nhân viên giao hàng</Option>
                <Option value="4">Người dùng</Option>
              </Select>
            </Form.Item>
            <h3
              style={{
                fontSize: "20px",
                marginBottom: "20px",
                marginTop: "30px",
              }}
            >
              Ảnh đại diện
            </h3>
            <div className="upload_img">
              <Form.Item>
                <Space direction="vertical" size="large">
                  <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-circle"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={onChange}
                  >
                    {fileList.length >= 1 ? null : uploadButton}
                  </Upload>
                  {previewImage && (
                    <Image
                      wrapperStyle={{
                        display: "none",
                      }}
                      preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) =>
                          !visible && setPreviewImage(""),
                      }}
                      src={previewImage}
                    />
                  )}
                </Space>
              </Form.Item>
            </div>
            <Button
              className="button-xac-nhan"
              type="primary"
              htmlType="submit"
            >
              Tạo người dùng
            </Button>
          </Form>
        </Col>
        <Col span={2}></Col>
      </Row>
    </div>
  );
};

export default NewAccount;
