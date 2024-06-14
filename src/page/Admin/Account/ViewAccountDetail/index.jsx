import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  message,
  theme,
  Select,
  Upload,
  Space,
  Image,
  Row,
  Col,
} from "antd";
import { Link, useParams } from "react-router-dom";
import "./index.scss";
import { Content } from "antd/es/layout/layout";
import { districts, provinces, wards } from "vietnam-provinces";
import { TiArrowBack } from "react-icons/ti";

const { Option } = Select;

const data = [
  {
    key: "1",
    id: "US123457",
    image:
      "https://blog.maika.ai/wp-content/uploads/2024/02/anh-meo-meme-11.jpg",
    name: "Nguyễn Văn A",
    email: "a@gmail.com",
    date: "29-5-2024",
    phone: "0123456789",
    role: "Người dùng",
  },
  {
    key: "2",
    id: "US1233457",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpPU1Ncrizcs1ZayuGEFFB8lrMnyUC7ZnJdg&shttps://blog.maika.ai/wp-content/uploads/2024/02/anh-meo-meme-5.jpg",
    name: "Nguyễn Văn B",
    email: "b@gmail.com",
    date: "28-5-2024",
    phone: "0684981532",
    role: "Người dùng",
  },
  {
    key: "3",
    id: "ST1234337",
    image:
      "https://blog.maika.ai/wp-content/uploads/2024/02/anh-meo-meme-5.jpg",
    name: "Nguyễn Văn C",
    email: "c2@gmail.com",
    date: "30-5-2024",
    phone: "0984961522",
    role: "Nhân viên bán hàng",
  },
  {
    key: "4",
    id: "ST123457",
    name: "Nguyễn Văn D",
    email: "d@gmail.com",
    image:
      "https://blog.maika.ai/wp-content/uploads/2024/02/anh-meo-meme-8.jpg",
    date: "6-5-2024",
    phone: "0215645644",
    role: "Nhân viên bán hàng",
  },
  {
    key: "5",
    id: "STD123657",
    name: "Nguyễn Văn E",
    image:
      "https://blog.maika.ai/wp-content/uploads/2024/02/anh-meo-meme-10.jpg",
    email: "e@gmail.com",
    date: "5-5-2024",
    phone: "0245449656",
    role: "Nhân viên giao hàng",
  },
  {
    key: "6",
    id: "US12347",
    image:
      "https://blog.maika.ai/wp-content/uploads/2024/02/anh-meo-meme-11.jpg",
    name: "Nguyễn Văn A",
    email: "a@gmail.com",
    date: "29-5-2024",
    phone: "0123456789",
    role: "Người dùng",
  },
];

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
function ViewAccountDetail() {
  const { id } = useParams();
  const account = data.find((d) => d.id === id);

  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    if (account) {
      form.setFieldsValue({
        id: account.id,
        image: account.image,
        name: account.name,
        email: account.email,
        date: account.date,
        phone: account.phone,
        role: account.role,
        address: account.address,
      });
      if (account.image) {
        const newFileList = [
          {
            uid: "id",
            name: "image",
            status: "done",
            url: account.image,
          },
        ];
        setFileList(newFileList);
        setPreviewImage(account.image);
      }
    }
  }, [account, form]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Updated values: ", values);
        setIsEditing(false);
        message.success("Lưu thành công!");
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleDelete = () => {
    message.success("Xóa thành công");
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  const uploadButton = (
    <div>
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  if (!account) {
    return <div>Account not found</div>;
  }

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <div className="profile-account">
      <div
        className="infor-details"
        style={{ marginBottom: "20px", display: "flex" }}
      >
        <h2 style={{ fontWeight: "500" }}>Thông tin chi tiết kim cương</h2>
        <h2 style={{ fontWeight: "500", marginLeft: "auto" }}>
          <Link
            to={"/admin-page/tai-khoan/xem-tat-ca-tai-khoan"}
            style={{ color: "black", fontWeight: 600 }}
          >
            <TiArrowBack style={{ justifyContent: "center" }} /> Quay lại
          </Link>
        </h2>
      </div>
      <div className="avatar-nabvar">
        <div className="nabvar">
          <Content>
            <div
              style={{
                padding: 16,
                minHeight: 50,
                marginBottom: "10px",
                background: "#fff",
                borderRadius: borderRadiusLG,
              }}
            >
              <Form form={form} layout="vertical">
                <Row gutter={24}>
                  <Col span={2}></Col>
                  <Col span={10}>
                    <Form form={form} layout="vertical">
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          { required: true, message: "Vui lòng nhập thư!" },
                        ]}
                      >
                        <Input placeholder="....@gmail.com" />
                      </Form.Item>
                      <Row gutter={24}>
                        <Col span={12}>
                          <Form.Item
                            label="Họ"
                            name="firstName"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập tên nick!",
                              },
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
                              {
                                required: true,
                                message: "Vui lòng nhập tên nick!",
                              },
                            ]}
                          >
                            <Input placeholder="Tên" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item
                        label="Tỉnh/TP"
                        name="city"
                        rules={[
                          { required: true, message: "Xin hãy chọn Tỉnh/TP!" },
                        ]}
                      >
                        <Select
                          className="input"
                          placeholder="Tỉnh/TP*"
                          showSearch
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
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
                              {
                                required: true,
                                message: "Xin hãy chọn Quận/Huyện!",
                              },
                            ]}
                          >
                            <Select
                              className="input"
                              placeholder="Quận/Huyện*"
                              showSearch
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              {districts.map((district) => (
                                <Option
                                  key={district.code}
                                  value={district.code}
                                >
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
                              {
                                required: true,
                                message: "Xin hãy chọn Phường/Xã!",
                              },
                            ]}
                          >
                            <Select
                              className="input"
                              placeholder="Phường/Xã*"
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
                        label="Địa chỉ cụ thể"
                        name="address"
                        rules={[
                          {
                            required: true,
                            message: "Xin hãy nhập vào Địa chỉ cụ thể!",
                          },
                        ]}
                      >
                        <Input placeholder="Địa chỉ cụ thể*" />
                      </Form.Item>
                      <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập số điện thoại!",
                          },
                        ]}
                      >
                        <Input placeholder="Số điện thoại" />
                      </Form.Item>
                    </Form>
                  </Col>
                  <Col span={10} style={{ marginLeft: "20px" }}>
                    <Form form={form} layout="vertical">
                      <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập mật khẩu!",
                          },
                        ]}
                      >
                        <Input placeholder="Mật khẩu*" />
                      </Form.Item>
                      <Row gutter={24}>
                        <Col span={12}>
                          <Form.Item
                            label="Phân quyền"
                            name="role"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng chọn phân quyền!",
                              },
                            ]}
                          >
                            <Select placeholder="Chọn phân quyền">
                              <Option value="ROLE_ADMIN">Admin</Option>
                              <Option value="ROLE_STAFF">Staff</Option>
                              <Option value="ROLE_DELIVERY">Delivery</Option>
                              <Option value="ROLE_USER">User</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            label="ID tài khoản"
                            name="id"
                            rules={[{ required: true }]}
                          >
                            <Input placeholder="ID tài khoản*" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item
                        label="Trạng thái"
                        name="enabled"
                        rules={[{ required: true }]}
                      >
                        <Input defaultValue={"Hoạt động"} />
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
                      <div className="upload_image">
                        <Form.Item name="image">
                          <Space direction="vertical" size="large">
                            <Upload
                              className="custom-upload"
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
                                  onVisibleChange: (visible) =>
                                    setPreviewOpen(visible),
                                  afterOpenChange: (visible) =>
                                    !visible && setPreviewImage(""),
                                }}
                                src={previewImage}
                              />
                            )}
                          </Space>
                        </Form.Item>
                      </div>
                    </Form>
                    <div className="button-container">
                      {isEditing ? (
                        <Button
                          type="primary"
                          className="button-xac-nhan"
                          onClick={handleSave}
                        >
                          Lưu
                        </Button>
                      ) : (
                        <Button
                          type="primary"
                          className="button-xac-nhan"
                          onClick={handleEdit}
                        >
                          Chỉnh sửa
                        </Button>
                      )}
                      <Button
                        type="primary"
                        className="button-xac-nhan"
                        onClick={handleDelete}
                        style={{ marginLeft: "10px", background: "red" }}
                      >
                        Xóa
                      </Button>
                    </div>
                  </Col>
                  <Col span={2}></Col>
                </Row>
              </Form>
            </div>
          </Content>
        </div>
      </div>
    </div>
  );
}

export default ViewAccountDetail;
