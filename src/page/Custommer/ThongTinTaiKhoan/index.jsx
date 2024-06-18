import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Row,
  Select,
  Space,
  Tabs,
  Upload,
  message,
} from "antd";
import Container from "../../../components/container/Container";
import uploadFile from "../../../utils/upload";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./index.scss";
import { Option } from "antd/es/mentions";
import { getDistricts, getWards, provinces } from "vietnam-provinces";

const data = [
  {
    key: "1",
    id: "US123457",
    avata:
      "https://blog.maika.ai/wp-content/uploads/2024/02/anh-meo-meme-11.jpg",
    firstName: "Nguyễn",
    lastName: " Thanh Hải ",
    enabled: "",
    createAt: "12-12-2024",
    email: "a@gmail.com",
    address: "Phước Long A, Tp Thủ Đức, Hồ chí Minh",
    date: "29-5-2024",
    phone: "0123456789",
    role: "Người dùng",
  },
];

function callback(key) {
  console.log(key);
}

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function AccountDetail() {
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

  const handleCancel = () => {
    setIsEditing(false);
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
      if (values.firstName !== originalValues.firstName) {
        updatedDetails.originPrice = values.originPrice;
      }
      if (values.lastName !== originalValues.lastName) {
        updatedDetails.lastName = values.lastName;
      }
      if (values.address !== originalValues.address) {
        updatedDetails.address = values.address;
      }
      if (values.phone !== originalValues.phone) {
        updatedDetails.phone = values.phone;
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

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
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
    <div>
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleLinkClick = () => {
    setShowPasswordFields(!showPasswordFields);
  };

  const onFinish = (values) => {
    console.log("Received values: ", values);
  };

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

  if (!account) {
    return <div>Account not found</div>;
  }

  return (
    <Container>
      <div className="tong-trang-detail">
        <div className="thong-tin-tai-khoan">
          <div className="thong-tin-gioi-thieu">
            <div className="baner-detail">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/baner-detail2.jpg?alt=media&token=892ddab4-8ef0-43b7-9a66-0c2ac26f0599"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              />
              <div className="user-name-on-banner">
                <h2 style={{ fontWeight: "400", textAlign: "start" }}>
                  Xin chào!
                </h2>
                <h1 style={{ fontWeight: "400" }}>
                  {account.firstName} {account.lastName}
                </h1>
              </div>
            </div>
          </div>
          <div className="user-phan-chia">
            <Tabs defaultActiveKey="1" onChange={callback}>
              <Tabs tab="Thông tin chi tiết tài khoản" key="1">
                <Row gutter={24} className="thong-tin-chi-tiet-tai-khoan-tong">
                  <Col span={2}></Col>
                  <Col span={8}>
                    <h2 style={{ textAlign: "start", fontWeight: "500" }}>
                      Ảnh đại diện
                    </h2>
                    <div className="upload_image">
                      <Form.Item name="avata">
                        <Space direction="vertical" size="large">
                          <Upload
                            className="custom-upload"
                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                            listType="picture-circle"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={onChange}
                            onRemove={handleDeleteImage}
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
                          fontWeight: "400",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {account.firstName} {account.lastName}
                      </p>

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
                  <Col span={12}>
                    <div className="thong-tin-chi-tiet-tai-khoan">
                      <Row gutter={24}>
                        <Col span={18}>
                          <div className="gioi-thieu-va-chinh-sua">
                            <h2
                              style={{ textAlign: "start", fontWeight: "500" }}
                            >
                              Thông tin chi tiết tài khoản
                            </h2>
                          </div>
                        </Col>
                        <Col
                          span={6}
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Button
                            type="primary"
                            className="button-xac-nhan-cus"
                            onClick={handleEdit}
                            style={{ background: "#15393f" }}
                          >
                            Chỉnh sửa
                          </Button>
                        </Col>
                      </Row>

                      <h3 style={{ fontWeight: "400", fontSize: "14px" }}>
                        Xem và quản lý thông tin cá nhân và thông tin liên lạc
                        của bạn
                      </h3>

                      <div className="tai-khoan-cua-ban"></div>
                    </div>
                    <div
                      className="thong-tin-cua-nguoi-dung"
                      style={{ marginTop: "40px" }}
                    >
                      {isEditing ? (
                        <Form
                          form={form}
                          layout="vertical"
                          confirmLoading={uploading}
                          onFinish={onFinish}
                          initialValues={{
                            firstName: account.firstName,
                            lastName: account.lastName,
                            phone: account.phone,
                            address: account.address,
                          }}
                        >
                          <Row gutter={24}>
                            <Col span={24}>
                              <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                  {
                                    required: true,
                                    message: "Vui lòng nhập email!",
                                  },
                                ]}
                              >
                                <Input placeholder="....@gmail.com" readOnly />
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
                          <Form.Item
                            label="Tỉnh/TP"
                            name="city"
                            rules={[
                              {
                                required: true,
                                message: "Xin hãy chọn Tỉnh/TP!",
                              },
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
                                <Option
                                  key={province.code}
                                  value={province.code}
                                >
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
                            <Col
                              span={24}
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <div className="button-xoa-cus">
                                {" "}
                                <Button
                                  type="primary"
                                  className="button-xóa-cus"
                                  onClick={handleCancel}
                                  style={{
                                    background: "#fff",
                                    color: "black",
                                    boxShadow: "1px 1px 1px 1px",
                                  }}
                                >
                                  Hủy
                                </Button>
                              </div>
                              <div
                                className="button-xac-nhan-cus"
                                style={{ marginLeft: "10px" }}
                              >
                                <Button
                                  type="primary"
                                  className="button-xac-nhan-cus"
                                  onClick={handleUpdate}
                                  style={{
                                    background: "#15393f",
                                    boxShadow: "1px 1px 1px 1px",
                                  }}
                                >
                                  Lưu
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      ) : (
                        <div
                          className="thong-tin-cua-nguoi-dung"
                          style={{ marginTop: "40px" }}
                        >
                          <Row gutter={24}>
                            <Col span={8}>
                              <p
                                style={{ fontSize: "16px", fontWeight: "400" }}
                              >
                                Thông tin
                              </p>
                            </Col>

                            <Col
                              span={8}
                              className="name-user-detail"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                              }}
                            >
                              <p
                                style={{ fontSize: "14px", fontWeight: "300" }}
                              >
                                Họ
                              </p>
                              <p style={{ fontSize: "16px" }}>
                                {account.firstName}
                              </p>
                              <p
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "300",
                                  marginTop: "10px",
                                }}
                              >
                                Tên
                              </p>
                              <p style={{ fontSize: "16px" }}>
                                {account.lastName}
                              </p>
                              <p
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "300",
                                  marginTop: "10px",
                                }}
                              >
                                Số điện thoại
                              </p>
                              <p style={{ fontSize: "16px" }}>
                                {account.phone}
                              </p>
                            </Col>

                            <Col
                              span={8}
                              className="name-user-detail"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                              }}
                            >
                              <p
                                style={{ fontSize: "14px", fontWeight: "300" }}
                              >
                                Email
                              </p>
                              <p style={{ fontSize: "16px" }}>
                                {account.email}
                              </p>
                              <p
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "300",
                                  marginTop: "10px",
                                }}
                              >
                                Mật khẩu
                              </p>
                              <p style={{ fontSize: "16px" }}>**********</p>
                              <p
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "300",
                                  marginTop: "10px",
                                }}
                              >
                                Địa chỉ
                              </p>
                              <p style={{ fontSize: "16px" }}>
                                {account.address}
                              </p>
                            </Col>
                          </Row>
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col span={2}></Col>
                </Row>
              </Tabs>
              <Tabs tab="Lịch sử mua hàng" key="2">
                <Row gutter={24}>
                  <Col span={2}></Col>
                  <Col span={20} className="lich-su-mua-hang">
                    <p style={{ fontWeight: "500", fontSize: "20px" }}>
                      Đơn hàng từng mua
                    </p>
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
                  </Col>
                  <Col span={2}></Col>
                </Row>
              </Tabs>
            </Tabs>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default AccountDetail;
