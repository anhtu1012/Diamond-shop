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
  Modal,
  Collapse,
} from "antd";
import { Link, useParams } from "react-router-dom";
import "./index.scss";
import { Content } from "antd/es/layout/layout";
import { getDistricts, getWards, provinces } from "vietnam-provinces";
import { TiArrowBack } from "react-icons/ti";
import uploadFile from "../../../../utils/upload";
import ImgCrop from "antd-img-crop";

const { Option } = Select;

const data = [
  {
    key: "1",
    id: "US123457",
    avata:
      "https://blog.maika.ai/wp-content/uploads/2024/02/anh-meo-meme-11.jpg",
    firstName: "Văn A",
    lastName: "Nguyễn ",
    enabled: "",
    createAt: "12-12-2024",
    birthDay: "13-01-2003",
    gender: "Nam",
    email: "a@gmail.com",
    address: "Phước Long A, Tp Thủ Đức, Hồ chí Minh",
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
function ProfileAccount() {
  const { id } = useParams();
  const account = data.find((d) => d.id === id);

  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [originalValues, setOriginalValues] = useState({});
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  useEffect(() => {
    if (account) {
      setOriginalValues({
        email: account.email,
        firstName: account.firstName,
        lastName: account.lastName,
        address: account.address,
        phone: account.phone,
        avata: account.avata,
        role: account.role.roleID,
        birthDay: account.birthDay,
        gender: account.gender,
      });
      form.setFieldsValue({
        id: account.id,
        avata: account.avata,
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        date: account.date,
        phone: account.phone,
        role: account.role,
        address: account.address,
        birthDay: account.birthDay,
        gender: account.gender,
      });
      if (account.avata) {
        const newFileList = [
          {
            uid: "id",
            name: "avata",
            status: "done",
            url: account.avata,
          },
        ];
        setFileList(newFileList);
        setPreviewImage(account.avata);
      }
    }
  }, [account, form]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleDeleteImage = async (file) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(newFileList);
    message.success("Xóa ảnh thành công!");
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

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      let updatedDetails = {};

      // Check if the image needs to be updated
      let avata = originalValues.avata;
      if (fileList.length > 0 && fileList[0].originFileObj) {
        setUploading(true);
        avata = await uploadFile(fileList[0].originFileObj);
        setUploading(false);
        updatedDetails.avata = avata;
      }

      if (values.email !== originalValues.email) {
        updatedDetails.email = values.email;
      }
      if (values.firstName !== originalValues.firstName) {
        updatedDetails.originPrice = values.originPrice;
      }
      if (values.lastName !== originalValues.lastName) {
        updatedDetails.lastName = values.lastName;
      }
      if (values.birthDay !== originalValues.birthDay) {
        updatedDetails.birthDay = values.birthDay;
      }
      if (values.gender !== originalValues.gender) {
        updatedDetails.gender = values.gender;
      }
      if (values.address !== originalValues.address) {
        updatedDetails.address = values.address;
      }
      if (values.phone !== originalValues.phone) {
        updatedDetails.phone = values.phone;
      }
      if (values.role.roleID !== originalValues.role.roleID) {
        updatedDetails.role.roleID = values.role.roleID;
      }

      if (Object.keys(updatedDetails).length > 0) {
        // await updateAccount(account.userID, updatedDetails);
        // fetchAccountByIds(account.userID);
        // setIsEditing(false);
        message.success("Cập nhật thành công!");
      } else {
        message.info("Không có thay đổi nào để cập nhật.");
      }
    } catch (error) {
      console.error("Error when updating diamond:", error);
      message.error("Cập nhật thất bại!");
      setUploading(false);
    }
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
    <div>
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onFinish = (values) => {
    console.log("Received values: ", values);
  };

  if (!account) {
    return <div>Account not found</div>;
  }

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const renderProductItem = (
    index,
    name,
    code,
    imgDM,
    nameDM,
    codeDM,
    price,
    imageUrl
  ) => (
    <div className="cart_product_frame" key={index}>
      <Row className="cart_product_item">
        <div className="cart_detail">
          <Col span={2}></Col>
          <Col span={6} className="img_cart">
            <img src={imageUrl} width={95} />
            {imgDM && (
              <img
                src={imgDM}
                style={{ display: imgDM === null ? "none" : "block" }}
                className="cart_product_imgdm"
                alt={nameDM}
              />
            )}
          </Col>
          <Col span={16} className="infor">
            <div className="infor_detail">
              <div style={{ paddingBottom: "20px" }}>
                <p>{name}</p>
                <span>{code}</span>
              </div>
              <p>{nameDM}</p>
              <span>{codeDM}</span>
            </div>
            <p className="price" style={{ textAlign: "end" }}>
              {price}
            </p>
          </Col>
        </div>
      </Row>
    </div>
  );

  const products = [
    {
      name: "NHẪN KIM CƯƠNG 18K SUPER VIP",
      code: "NKC1241",
      imgDM: "https://igg.vn/images/upload/34201813229polished-diamond.png",
      nameDM: "KIm cuong ne",
      codeDM: "0000000",
      price: "510,000,000",
      imageUrl:
        "https://glosbejewelry.net/upload/image/Nhan-kim-cuong%20(10).jpg",
    },
    {
      name: "NHẪN KIM CƯƠNG NỮ 18K VIP",
      code: "NKC12341241",
      imgDM: "",
      nameDM: "",
      codeDM: "",
      price: "500,000,000",
      imageUrl:
        "https://glosbejewelry.net/upload/image/Nhan-kim-cuong%20(10).jpg",
    },
  ];

  const handleLinkClick = () => {
    setShowPasswordFields(!showPasswordFields);
  };

  return (
    <div className="profile-account">
      <div
        className="infor-details"
        style={{ marginBottom: "20px", display: "flex" }}
      >
        <h2 style={{ fontWeight: "500" }}>
          Thông tin chi tiết tài khoản {account.id}
        </h2>
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
                  <Col span={1}></Col>
                  <Col span={6}>
                    <div className="upload_image">
                      <Form.Item name="avata">
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
                              wrapperStyle={{ display: "none" }}
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
                    <div
                      className="name"
                      style={{ marginTop: "-40px", textAlign: "center" }}
                    >
                      <p
                        style={{
                          fontSize: "25px",
                          fontWeight: "bold",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {account.lastName} {account.firstName}
                      </p>
                      <div className="status-button">
                        <input type="checkbox" id="status" />
                        <label htmlFor="status" className="button"></label>
                      </div>

                      <Link
                        to="#"
                        className="doi-mat-khau"
                        style={{ color: "#e4bd7b" }}
                        onClick={handleLinkClick}
                      >
                        {showPasswordFields ? "Đổi mật khẩu" : "Đổi mật khẩu"}
                      </Link>
                      {showPasswordFields && (
                        <Row gutter={24} style={{ justifyContent: "center" }}>
                          <Col span={24}>
                            <div
                              className="nhap-mat-khau-moi"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <Input
                                placeholder="Mật khẩu cũ"
                                style={{ marginTop: "10px", width: "200px" }}
                              />
                              <Input
                                placeholder="Mật khẩu mới"
                                style={{ marginTop: "10px", width: "200px" }}
                              />
                              <Input
                                placeholder="Nhập lại mật khẩu mới"
                                style={{ marginTop: "10px", width: "200px" }}
                              />
                            </div>
                            <Col
                              span={24}
                              className="button-doi-matkhau"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <Button
                                type="primary"
                                onClick={handleSave}
                                style={{
                                  background: "#15393f",
                                  marginTop: "10px",
                                }}
                              >
                                Đổi mật khẩu
                              </Button>
                            </Col>
                          </Col>
                        </Row>
                      )}
                    </div>
                    <div
                      className="change-password"
                      style={{ marginTop: "10px" }}
                    ></div>
                  </Col>
                  <Col span={16} style={{ marginTop: "10px" }}>
                    <Content>
                      <div
                        style={{
                          padding: 16,
                          minHeight: 50,
                          marginBottom: "10px",
                          background: "#fff",
                          borderRadius: borderRadiusLG,
                          boxShadow: "0px 0px 4px",
                        }}
                      >
                        <Form form={form} layout="vertical">
                          <Row gutter={24}>
                            <Col span={24}>
                              <div className="thong-tin-account">
                                <div className="thong-tin-quan-trong">
                                  <div className="row">
                                    <p>Họ và Tên:</p>
                                    <span>
                                      {account.lastName} {account.firstName}
                                    </span>
                                  </div>
                                  <div className="row">
                                    <p>Email:</p>
                                    <span>{account.email}</span>
                                  </div>
                                  <div className="row">
                                    <p>Giới tính:</p>
                                    <span>{account.gender}</span>
                                  </div>
                                  <div className="row">
                                    <p>Sinh nhật:</p>
                                    <span>{account.birthDay}</span>
                                  </div>
                                  <div className="row">
                                    <p>Địa chỉ:</p>
                                    <span>{account.address}</span>
                                  </div>
                                  <div className="row">
                                    <p>Số điện thoại:</p>
                                    <span>{account.phone}</span>
                                  </div>
                                  <div className="row">
                                    <p>Phân quyền:</p>
                                    <span>{account.role}</span>
                                  </div>
                                  <div className="row">
                                    <p>Ngày tạo:</p>
                                    <span>{account.createAt}</span>
                                  </div>
                                </div>
                              </div>
                            </Col>

                            <Col
                              span={24}
                              className="button-user"
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <Row gutter={24}>
                                <Col span={24} style={{ marginTop: "-20px" }}>
                                  <Button
                                    type="primary"
                                    className="button-xac-nhan"
                                    onClick={handleEdit}
                                    style={{ background: "#15393f" }}
                                  >
                                    Chỉnh sửa
                                  </Button>
                                  <Button
                                    type="primary"
                                    className="button-xac-nhan"
                                    onClick={handleDelete}
                                    style={{
                                      marginLeft: "10px",
                                      background: "red",
                                    }}
                                  >
                                    Xóa
                                  </Button>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Form>
                      </div>
                    </Content>
                  </Col>
                  <Col span={1}></Col>
                </Row>
                <Row gutter={24}>
                  <Col span={1}></Col>
                  <Col span={22} className="dropdown">
                    <Collapse
                      size="small"
                      style={{ width: "100%", border: "none" }}
                      items={[
                        {
                          key: "1",
                          label: (
                            <strong style={{ fontSize: "16px" }}>
                              Lịch sử đơn hàng
                            </strong>
                          ),
                          children: (
                            <pre style={{ whiteSpace: "pre-wrap" }}>
                              <div className="cart_product_list">
                                {products.map((product, index) =>
                                  renderProductItem(
                                    index,
                                    product.name,
                                    product.code,
                                    product.imgDM,
                                    product.nameDM,
                                    product.codeDM,
                                    product.price,
                                    product.imageUrl
                                  )
                                )}
                              </div>
                            </pre>
                          ),
                        },
                      ]}
                    />
                  </Col>
                  <Col span={1}></Col>
                </Row>
              </Form>
              <div className="update-profile">
                <Modal
                  title="Chỉnh sửa tài khoản"
                  open={isEditing}
                  onCancel={() => setIsEditing(false)}
                  onOk={handleUpdate}
                  cancelText="Hủy"
                  okText="Lưu"
                  confirmLoading={uploading}
                >
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                      email: account.email,
                      firstName: account.firstName,
                      lastName: account.lastName,
                      address: account.address,
                      phone: account.phone,
                      role: account.role.roleID,
                      birthDay: account.birthDay,
                      gender: account.gender,
                    }}
                  >
                    <Form.Item
                      name="avata"
                      valuePropName="fileList"
                      className="avata-user"
                    >
                      <ImgCrop rotationSlider>
                        <Upload
                          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                          listType="picture-circle"
                          fileList={fileList}
                          onChange={onChange}
                          onPreview={handlePreview}
                          onRemove={handleDeleteImage}
                          style={{ fontSize: "30px" }}
                        >
                          {fileList.length < 1 && "+ Upload"}
                        </Upload>
                      </ImgCrop>
                    </Form.Item>
                    <Row gutter={24}>
                      <Col span={24}>
                        <Form.Item
                          label="Email"
                          name="email"
                          rules={[
                            { required: true, message: "Vui lòng nhập email!" },
                          ]}
                        >
                          <Input placeholder="....@gmail.com" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Họ"
                          name="lastName"
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
                          name="firstName"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập tên nick!",
                            },
                          ]}
                        >
                          <Input placeholder="Tên*" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          label="Ngày sinh"
                          name="firstName"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập tên nick!",
                            },
                          ]}
                        >
                          <Input placeholder="Tên*" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Tên"
                          name="firstName"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập tên nick!",
                            },
                          ]}
                        >
                          <Input placeholder="Tên*" />
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
                        onChange={handleProvinceChange}
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
                            onChange={handleDistrictChange}
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
                      <Col span={24}>
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
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={12}>
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
                          <Input placeholder="Số điện thoại" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Phân quyền"
                          name="role"
                          readOnly
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng chọn phân quyền!",
                            },
                          ]}
                        >
                          <Select placeholder="Chọn phân quyền">
                            <Option value="ROLE_ADMIN">Quản lý</Option>
                            <Option value="ROLE_STAFF">
                              Nhân viên bán hàng
                            </Option>
                            <Option value="ROLE_DELIVERY">
                              Nhân viên giao hàng
                            </Option>
                            <Option value="ROLE_USER">Người dùng</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Modal>
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
              </div>
            </div>
          </Content>
        </div>
      </div>
    </div>
  );
}

export default ProfileAccount;
