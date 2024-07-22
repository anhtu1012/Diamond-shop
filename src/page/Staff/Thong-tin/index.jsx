/* eslint-disable no-unused-vars */
import {
  Button,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Upload,
  message,
} from "antd";
import Container from "../../../components/container/Container";
import uploadFile from "../../../utils/upload";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import { Option } from "antd/es/mentions";
import { getDistricts, getWards, provinces } from "vietnam-provinces";
import {
  changePass,
  fetchUserById,
  updateUser,
} from "../../../../services/Uservices";
import LoadingTruck from "../../../components/loading";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/counterSlice";
import moment from "moment/moment";
import { useForm } from "antd/es/form/Form";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function ThongTinStaff() {
  const user = useSelector(selectUser);
  const [form] = Form.useForm();
  const [userr, setUserr] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [originalcurrentValues, setOriginalcurrentValues] = useState({});
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [changeForm] = useForm();

  const fetchUserByIds = async () => {
    const response = await fetchUserById(user.userID);
    const userData = response.data.data;
    setUserr(userData);

    const addressParts = userData.address.split(", ").reverse();

    const addressDetails = {
      province: addressParts[0] || "",
      district: addressParts[1] || "",
      ward: addressParts[2] || "",
      detailAddress: addressParts[3] || "",
    };
    setOriginalcurrentValues({
      firstName: userData.firstName,
      lastName: userData.lastName,
      fullName: `${userData.firstName} ${userData.lastName}`,
      avata: userData.avata,
      gender: userData.gender,
      address: userData.address,
      phone: userData.phone,
      password: userData.password,
      yearOfBirth: moment(userData.yearOfBirth, "YYYY-MM-DD"),
      ...addressDetails,
    });

    form.setFieldsValue({
      userID: userData.userID,
      firstName: userData.firstName,
      lastName: userData.lastName,
      fullName: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      avata: userData.avata,
      gender: userData.gender,
      address: userData.address,
      phone: userData.phone,
      enable: userData.enable,
      password: userData.password,
      yearOfBirth: moment(userData.yearOfBirth, "YYYY-MM-DD"),
      role: userData.role.roleID,
      ...addressDetails,
    });
    setFileList([
      {
        uid: "1",
        name: "avata",
        status: "done",
        url: userData.avata,
      },
    ]);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    fetchUserByIds();
  }, []);
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
  function handleOk() {
    changeForm.submit();
  }
  const handleChangePass = async (values) => {
    try {
      const passValues = {
        oldPassWord: values.oldPassWord,
        newPassWord: values.newPassWord,
      };
      const res = await changePass(user.userID, passValues);
      if (res.data.message === "Update password successfully") {
        message.success("Đổi mật khẩu thành công");
        setShowPasswordFields(false);
        changeForm.resetFields();
      } else {
        message.error("Mẩu khẩu cũ không chính xác");
      }
    } catch (error) {
      message.error(`Đổi mật khẩu thất bại: ${error.message}`);
    }
  };
  const handleUpdate = async () => {
    try {
      const formValues = await form.validateFields();

      const { province, district, ward, detailAddress } = formValues;

      const selectedProvince = provinces.find((p) => p.code === province);
      const selectedDistrict = districts.find((d) => d.code === district);
      const selectedWard = wards.find((w) => w.code === ward);
      const fullAddress = `${detailAddress}, ${
        selectedWard ? selectedWard.name + ", " : ""
      }${selectedDistrict ? selectedDistrict.name + ", " : ""}${
        selectedProvince ? selectedProvince.name : ""
      }`;

      const currentValues = await form.validateFields();
      let updatedDetails = {};

      if (fileList.length > 0 && fileList[0].originFileObj) {
        setUploading(true);
        const avata = await uploadFile(fileList[0].originFileObj);
        setUploading(false);
        updatedDetails.avata = avata;
      }
      if (userr.firstName !== currentValues.firstName) {
        updatedDetails.firstName = currentValues.firstName;
      }
      if (userr.lastName !== currentValues.lastName) {
        updatedDetails.lastName = currentValues.lastName;
      }
      if (userr.address !== fullAddress) {
        updatedDetails.address = fullAddress;
      }
      if (userr.phoneNumber !== currentValues.phone) {
        updatedDetails.phoneNumber = currentValues.phone;
      }
      if (userr.gender !== currentValues.gender) {
        updatedDetails.gender = currentValues.gender;
      }
      if (userr.yearOfBirth !== currentValues.yearOfBirth) {
        updatedDetails.yearOfBirth = currentValues.yearOfBirth;
      }
      if (Object.keys(updatedDetails).length > 0) {
        console.log(updatedDetails);
        await updateUser(userr.userID, updatedDetails);
        fetchUserByIds(userr.userID);
        setIsEditing(false);
        message.success("Cập nhật thành công!");
      } else {
        message.info("Không có thay đổi nào để cập nhật.");
      }
    } catch (error) {
      console.error("Error when updating user:", error);
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

  const onFinish = (currentValues) => {
    console.log("Received currentValues: ", currentValues);
  };

  const [value, setValue] = useState(1);
  const onChangeGender = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  if (!userr) {
    return <LoadingTruck />;
  }

  const genderText = userr.gender === "MALE" ? "Nam" : "Nữ";
  const formattedDate = moment(userr.yearOfBirth, "YYYY-MM-DD").format(
    "YYYY-MM-DD"
  );

  return (
    <Container>
      <div className="tong-trang-detail">
        <div className="thong-tin-tai-khoan">
          <div className="user-phan-chia">
            <Row gutter={24} className="thong-tin-chi-tiet-tai-khoan-tong">
              <Col span={8} xs={24} sm={8}>
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
                  style={{ marginTop: "-10px", textAlign: "center" }}
                >
                  <p
                    style={{
                      fontSize: "25px",
                      fontWeight: "400",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {userr.firstName} {userr.lastName}
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
                          <Form form={changeForm} onFinish={handleChangePass}>
                            <Form.Item
                              name="oldPassWord"
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập mật khẩu!",
                                },
                              ]}
                              hasFeedback
                            >
                              <Input.Password placeholder="Mật khẩu Cũ..." />
                            </Form.Item>
                            <Form.Item
                              name="newPassWord"
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập mật khẩu!",
                                },
                                {
                                  pattern: new RegExp(
                                    "^(?=.*[A-Za-z])(?=.*\\d).{8,}$"
                                  ),
                                  message:
                                    "Mật khẩu phải dài ít nhất 8 ký tự và bao gồm ít nhất một chữ số và một chữ cái.",
                                },
                              ]}
                              hasFeedback
                            >
                              <Input.Password
                                className="input"
                                placeholder="Mật khẩu Mới"
                              />
                            </Form.Item>
                            <Form.Item
                              name="confirmPassword"
                              dependencies={["newPassWord"]}
                              hasFeedback
                              rules={[
                                {
                                  required: true,
                                  message: "Nhập lại mật khẩu!!!",
                                },
                                ({ getFieldValue }) => ({
                                  validator(_, value) {
                                    if (
                                      !value ||
                                      getFieldValue("newPassWord") === value
                                    ) {
                                      return Promise.resolve();
                                    }
                                    return Promise.reject(
                                      new Error("Mật khẩu không hợp lệ!")
                                    );
                                  },
                                }),
                              ]}
                            >
                              <Input.Password
                                className="input"
                                placeholder="Xác nhận lại mật khẩu..."
                              />
                            </Form.Item>
                          </Form>
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
                            onClick={handleOk}
                            style={{
                              background: "#15393f",
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
              <Col span={12} sm={12} xs={24}>
                <div className="thong-tin-chi-tiet-tai-khoan">
                  <Row gutter={24}>
                    <Col span={18}>
                      <div className="gioi-thieu-va-chinh-sua">
                        <h2 style={{ textAlign: "start", fontWeight: "500" }}>
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
                    Xem và quản lý thông tin cá nhân và thông tin liên lạc của
                    bạn
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
                      initialcurrentValues={{
                        email: userr.email,
                        firstName: userr.firstName,
                        lastName: userr.lastName,
                        phone: userr.phone,
                        address: userr.address,
                        gender: userr.gender,
                        yearOfBirth: moment(userr.yearOfBirth, "YYYY-MM-DD"),

                        formattedDate,
                      }}
                    >
                      <Row gutter={24}>
                        <Col span={12}>
                          <Form.Item label="Họ" name="firstName">
                            <Input placeholder="Họ*" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Tên" name="lastName">
                            <Input placeholder="Tên*" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Giới tính" name="gender">
                            <Radio.Group
                              onChange={onChangeGender}
                              value={userr.gender}
                            >
                              <Radio value="MALE">Nam</Radio>
                              <Radio value="FEMALE">Nữ</Radio>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            label="Ngày sinh"
                            name="yearOfBirth"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng chọn Ngày sinh!",
                              },
                            ]}
                          >
                            <DatePicker
                              disabled={!isEditing}
                              format="YYYY-MM-DD"
                              style={{ width: "100%" }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item label="Tỉnh/Thành phố" name="province">
                        <Select
                          className="input"
                          placeholder="Tỉnh/TP*"
                          onChange={handleProvinceChange}
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
                        <Col span={12}>
                          <Form.Item
                            label="Địa Chỉ cụ thể"
                            name="detailAddress"
                          >
                            <Input
                              className="input"
                              placeholder="Địa chỉ cụ thể*"
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[
                              {
                                required: true,
                                message: "Xin hãy nhập vào SĐT!",
                              },
                              {
                                pattern: /^[0-9]{10}$/,
                                message: "Số điện thoại chỉ được nhập số!",
                              },
                            ]}
                          >
                            <Input placeholder="Số điện thoại*" />
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
                        <Col span={8} xs={24} sm={8}>
                          <p style={{ fontSize: "16px", fontWeight: "400" }}>
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
                          <p style={{ fontSize: "14px", fontWeight: "300" }}>
                            Họ
                          </p>
                          <p style={{ fontSize: "16px" }}>{userr.firstName}</p>
                          <p
                            style={{
                              fontSize: "14px",
                              fontWeight: "300",
                              marginTop: "10px",
                            }}
                          >
                            Tên
                          </p>
                          <p style={{ fontSize: "16px" }}>{userr.lastName}</p>
                          <p
                            style={{
                              fontSize: "14px",
                              fontWeight: "300",
                              marginTop: "10px",
                            }}
                          >
                            Giới tính
                          </p>
                          <p style={{ fontSize: "16px" }}>{genderText}</p>
                          <p
                            style={{
                              fontSize: "14px",
                              fontWeight: "300",
                              marginTop: "10px",
                            }}
                          >
                            Ngày sinh
                          </p>
                          <p style={{ fontSize: "16px" }}>{formattedDate}</p>
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
                          <p style={{ fontSize: "14px", fontWeight: "300" }}>
                            Email
                          </p>
                          <p style={{ fontSize: "16px" }}>{userr.email}</p>
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
                            Số điện thoại
                          </p>
                          <p style={{ fontSize: "16px" }}>{userr.phone}</p>
                          <p
                            style={{
                              fontSize: "14px",
                              fontWeight: "300",
                              marginTop: "10px",
                            }}
                          >
                            Địa chỉ
                          </p>
                          <p style={{ fontSize: "16px" }}>{userr.address}</p>
                        </Col>
                      </Row>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ThongTinStaff;
