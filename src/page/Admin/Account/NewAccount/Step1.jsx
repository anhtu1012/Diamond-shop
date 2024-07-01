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

const Step1 = ({ onFinish, initialValues }) => {
  const [fileList, setFileList] = useState(initialValues?.fileList || []);
  const [form] = Form.useForm();
  const [wards, setWards] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
      setFileList(initialValues.fileList || []);
    }
  }, [initialValues, form]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleSubmit = async (values) => {
    try {
      const file = fileList[0]?.originFileObj;
      const avata = file ? await uploadFile(file) : null;
      const finalData = {
        ...values,
        avata,
      };
      await createUser(finalData);
      message.success("Tạo tài khoản thành công! Vui lòng check Email.");
      onFinish(finalData);
    } catch (error) {
      message.error("Tạo tài khoản thất bại, vui lòng thử lại!");
      console.log("Upload failed:", error);
    }
  };

  useEffect(() => {
    const provincesList = getProvinces();
    setProvinces(provincesList);
  }, []);

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
    <button
      style={{
        border: 0,
        background: "none",
        width: 200,
        height: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
      }}
      type="button"
    >
      <PlusOutlined style={{ fontSize: 24 }} />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
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
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={initialValues}
          >
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

            <Form.Item
              label="Địa chỉ cụ thể
            "
              name="address"
            >
              <Input placeholder="Địa chỉ cụ thể*" />
            </Form.Item>
          </Form>
        </Col>
        <Col span={10} style={{ marginLeft: "20px" }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={initialValues}
          >
            <Form.Item
              style={{ marginTop: "44px" }}
              label="Mật khẩu"
              name="password"
            >
              <Input placeholder="Mật khẩu*" />
            </Form.Item>
            <Form.Item label="Số điện thoại" name="phone" width={"50%"}>
              <Input placeholder="Số điện thoại" width={"50%"} />
            </Form.Item>
            <Form.Item
              label="Phân quyền"
              name="role"
              rules={[{ required: true, message: "Vui lòng chọn phân quyền!" }]}
            >
              <Select placeholder="Chọn phân quyền">
                <Option value="ROLE_ADMIN">Quản lý</Option>
                <Option value="ROLE_STAFF">Nhân viên bán hàng</Option>
                <Option value="ROLE_DELIVERY">Nhân viên giao hàng</Option>
                <Option value="ROLE_USER">Người dùng</Option>
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
            <button
              className="button-xac-nhan"
              type="submit"
              onClick={handleSubmit}
            >
              Tạo người dùng
            </button>
          </Form>
        </Col>
        <Col span={2}></Col>
      </Row>
    </div>
  );
};

export default Step1;
