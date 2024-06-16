import { Col, Form, Image, Input, Row, Select, Space, Upload } from "antd";
import "./index.scss";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getDistricts, getProvinces, getWards } from "vietnam-provinces";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../../../redux/features/counterSlice";
import { useSelector } from "react-redux";

const { Option } = Select;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const NewAccount = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  //const dispatch = useDispatch();
  const [wards, setWards] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const user = useSelector(selectUser);
  console.log(user);
  // const handleLoginSuccess = (user) => {
  //   dispatch(login(user));
  // };

  useEffect(() => {
    if (user) {
      switch (user.role[0].authority) {
        case "ROLE_ADMIN":
          break;
        case "ROLE_STAFF":
          console.log(user.role[0].authority);
          break;
        case "ROLE_DELIVERY":
          break;
        case "ROLE_USER":
          break;
        default:
          break;
      }
    }
  }, [user, navigate]);

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

  const handleSubmit = (values) => {
    console.log("Received values: ", values);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

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
                <Form.Item
                  label="Họ"
                  name="firstName"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên nick!" },
                  ]}
                >
                  <Input placeholder="Họ*" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Tên"
                  name="lastName"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên nick!" },
                  ]}
                >
                  <Input placeholder="Tên" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Tỉnh/TP"
              name="city"
              rules={[{ required: true, message: "Xin hãy chọn Tỉnh/TP!" }]}
            >
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
                <Form.Item
                  label="Quận/Huyện"
                  name="district"
                  rules={[
                    { required: true, message: "Xin hãy chọn Quận/Huyện!" },
                  ]}
                >
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
                <Form.Item
                  label="Phường/Xã"
                  name="ward"
                  rules={[
                    { required: true, message: "Xin hãy chọn Phường/Xã!" },
                  ]}
                >
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
              rules={[
                { required: true, message: "Xin hãy nhập vào Địa chỉ cụ thể!" },
              ]}
            >
              <Input placeholder="Địa chỉ cụ thể*" />
            </Form.Item>
          </Form>
        </Col>
        <Col span={10} style={{ marginLeft: "20px" }}>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              style={{ marginTop: "44px" }}
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input placeholder="Mật khẩu*" />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              width={"50%"}
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
              ]}
            >
              <Input placeholder="Số điện thoại" width={"50%"} />
            </Form.Item>
            <Form.Item
              label="Phân quyền"
              name="role"
              rules={[{ required: true, message: "Vui lòng chọn phân quyền!" }]}
            >
              <Select placeholder="Chọn phân quyền">
                <Option value="ROLE_ADMIN">Admin</Option>
                <Option value="ROLE_STAFF">Staff</Option>
                <Option value="ROLE_DELIVERY">Delivery</Option>
                <Option value="ROLE_USER">User</Option>
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
                    onChange={handleChange}
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
            <button className="button-xac-nhan" type="submit">
              Tạo người dùng
            </button>
          </Form>
        </Col>
        <Col span={2}></Col>
      </Row>
    </div>
  );
};

export default NewAccount;
