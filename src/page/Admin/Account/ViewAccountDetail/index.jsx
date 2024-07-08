/* eslint-disable no-unused-vars */
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
  Radio,
  Tabs,
  Rate,
} from "antd";
import { Link, useParams } from "react-router-dom";
import "./index.scss";
import { Content } from "antd/es/layout/layout";
import { getDistricts, getWards, provinces } from "vietnam-provinces";
import { TiArrowBack } from "react-icons/ti";
// import uploadFile from "../../../../utils/upload";
import ImgCrop from "antd-img-crop";
import {
  fetchUserById,
  getOrderById,
  updateUser,
} from "../../../../../services/Uservices";
import uploadFile from "../../../../utils/upload";
import LoadingTruck from "../../../../components/loading";
import moment from "moment";
import { GiBigDiamondRing } from "react-icons/gi";
import { IoDiamondOutline } from "react-icons/io5";

const { Option } = Select;
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
function ProfileAccount() {
  const { userID } = useParams();
  const [user, setUser] = useState();
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

  const [data, setData] = useState([]);

  const handleLinkClick = () => {
    setShowPasswordFields(!showPasswordFields);
  };

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

  const fetchUserByIds = async (userID) => {
    const response = await fetchUserById(userID);
    const userData = response.data.data;
    setUser(userData);
    console.log(response.data.data);
    setOriginalValues({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      avata: userData.avata,
      gender: userData.gender,
      address: userData.address,
      phoneNumber: userData.phoneNumber,
      enable: userData.enable,
      password: userData.password,
      yearOfBirth: moment(user.yearOfBirth, "YYYY-MM-DD"),
      role: userData.role.roleID,
      enabled: userData.enable,
    });

    form.setFieldsValue({
      userID: userData.userID,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      avata: userData.avata,
      gender: userData.gender,
      address: userData.address,
      phoneNumber: userData.phoneNumber,
      enable: userData.enable,
      password: userData.password,
      yearOfBirth: moment(user.yearOfBirth, "YYYY-MM-DD"),
      role: userData.role.roleID,
      createAt: moment(user.createAt, "YYYY-MM-DD"),
      enabled: userData.enable,
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
    fetchUserByIds(userID);
  }, [userID]);

  const handleEdit = () => {
    setIsEditing(true);
  };
  const fetchOrderById = async (userID) => {
    try {
      const res = await getOrderById(userID);
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    if (userID) {
      fetchUserByIds(userID);
      fetchOrderById(userID);
    }
  }, [userID]);

  const renderCard = (order, index, buttonText, buttonColor) => {
    const formattedDate = new Date(order.orderDate).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    return (
      <Row className="staff_order_frame" key={index}>
        <Col span={7} className="staff_order_left">
          <div className="new_order_odID">
            <span>OD: {order.orderId}</span>
          </div>
          {order.productCustomize && order.productCustomize.product && (
            <img
              className="img_main"
              src={order.productCustomize.product.productImages[0].imageUrl}
              width={130}
              style={{ marginLeft: "100px" }}
              alt={order.productCustomize.product.productName}
            />
          )}
          {order.productCustomize && order.productCustomize.product && (
            <div style={{ textAlign: "center" }}>
              <Button className="button_custom">
                Size: {order.productCustomize.size}
              </Button>
            </div>
          )}
          {(order.productCustomize?.diamond || order.diamond) && (
            <img
              src={
                order.productCustomize?.diamond?.image || order.diamond?.image
              }
              className={`staff_order_kimg ${
                order.productCustomize?.product
                  ? "staff_order_kimg_kid"
                  : "staff_order_kimg_main"
              }`}
              alt={
                order.productCustomize?.diamond?.diamondName ||
                order.diamond?.diamondName
              }
              style={{ marginLeft: "90px" }}
            />
          )}
        </Col>
        <Col span={11} className="staff_order_right">
          {order.productCustomize && order.productCustomize.product && (
            <div className="info_product">
              <div>
                <GiBigDiamondRing size={25} className="icon_order" />
              </div>
              <div className="info_sub">
                <span>
                  {order.productCustomize.product.productName}
                  {" - "}
                  {order.productCustomize.product.shapeDiamond}{" "}
                  {order.productCustomize.product.dimensionsDiamond} ly
                </span>
                <p style={{ fontWeight: 400, fontSize: "13px" }}>
                  {" "}
                  {order.productCustomize.product.productID}
                </p>
                <Rate
                  disabled
                  defaultValue={order.productCustomize.product.rating}
                  style={{ fontSize: "13px" }}
                />
              </div>
            </div>
          )}
          <div className="info_diamond">
            <div>
              <IoDiamondOutline size={25} className="icon_order" />
            </div>
            <div className="info_sub">
              <p>
                {order.productCustomize?.diamond?.diamondName ||
                  order.diamond.diamondName}
              </p>
              <div style={{ fontWeight: 400, fontSize: "13px" }}>
                <span>
                  Carat:{" "}
                  {order.productCustomize?.diamond?.carat ||
                    order.diamond.carat}
                </span>
                {" - "}
                <span>
                  Tinh Khiết :
                  {order.productCustomize?.diamond?.clarify ||
                    order.diamond.clarify}
                </span>
                {" - "}
                <span>
                  Cấp Màu :
                  {order.productCustomize?.diamond?.colorLevel ||
                    order.diamond.colorLevel}
                </span>
                {" - "}
                Cắt:{" "}
                <span>
                  {order.productCustomize?.diamond?.cut || order.diamond.cut}
                </span>
              </div>
              {order.diamond && (
                <div
                  style={{
                    fontWeight: 400,
                    fontSize: "13px",
                    paddingTop: "3px",
                  }}
                >
                  Kiểm định:{" "}
                  <span style={{ color: "red" }}>
                    {" "}
                    {order.diamond.certificate}{" "}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Col>
        <Col
          span={6}
          style={{ textAlign: "center", fontSize: "20px", fontWeight: "400" }}
        >
          {formattedDate}
        </Col>
        <Col
          span={24}
          style={{ borderBottom: "dashed 1px gray", paddingTop: "10px" }}
        ></Col>
        <Col span={18} className="text-left">
          <span>x {order.quantity} Sản Phẩm</span>
          <div>
            <Link to={`/admin-page/don-hang/all/order-detail/${order.orderId}`}>
              Xem Chi Tiết
            </Link>
          </div>
        </Col>
        <Col span={6} className="text-right">
          <h3>
            {(
              order.productCustomize?.totalPrice || order.diamond.totalPrice
            ).toLocaleString("de-DE", {
              maximumFractionDigits: 2,
            })}{" "}
            đ
          </h3>
          <button className={`status-button green`}>{buttonText}</button>
        </Col>
      </Row>
    );
  };

  const getDeliveredOrders = () => {
    return data?.orders?.filter((order) => order.status === "Đã giao") || [];
  };

  const deliveredOrders = getDeliveredOrders();

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      let updatedDetails = {};
      if (fileList.length > 0 && fileList[0].originFileObj) {
        setUploading(true);
        const avata = await uploadFile(fileList[0].originFileObj);
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
      if (values.phoneNumber !== originalValues.phoneNumber) {
        updatedDetails.phoneNumber = values.phoneNumber;
      }
      if (values.role.roleID !== originalValues.role.roleID) {
        updatedDetails.role.roleID = values.role.roleID;
      }

      if (Object.keys(updatedDetails).length > 0) {
        await updateUser(user.userID, updatedDetails);
        fetchUserByIds(user.userID);
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

  const handleDeleteImage = async (file) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(newFileList);
    message.success("Xóa ảnh thành công!");
  };

  const handleDelete = async () => {
    try {
      //await deleteUser(user.userID);
      message.success("Xóa thành công!");
    } catch (error) {
      console.error("Error deleting diamond:", error);
      message.error("Xóa thất bại!");
    }
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

  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  if (!user) {
    return <LoadingTruck />;
  }

  const genderText = user.gender === "MALE" ? "Nam" : "Nữ";

  const formattedDate = moment(user.yearOfBirth, "YYYY-MM-DD").format(
    "YYYY-MM-DD"
  );
  const formattedCreatAt = moment(user.createAt, "YYYY-MM-DD").format(
    "YYYY-MM-DD"
  );
  const roleMapping = {
    1: "Quản lý",
    2: "Nhân viên giao hàng",
    3: "Nhân viên bán hàng",
    4: "Người dùng",
  };
  const userRole = roleMapping[user.role.roleID];

  return (
    <div className="profile-account">
      <div
        className="infor-details"
        style={{ marginBottom: "20px", display: "flex" }}
      >
        <h2 style={{ fontWeight: "500" }}>
          Thông tin chi tiết tài khoản {user.userID}
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
        <Tabs defaultActiveKey="1" onChange={callback}>
          <Tabs tab="Thông tin chi tiết tài khoản" key="1">
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
                            fontWeight: "bold",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {user.firstName} {user.lastName}
                        </p>
                        {/* <div className="status-button" style={{ marginTop: 10 }}>
                      <input
                        type="checkbox"
                        id="status"
                        checked={user.enable}
                        onChange={(e) => user.setEnable(e.target.checked)}
                      />
                      <label htmlFor="status" className="button"></label>
                    </div> */}

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
                                  onClick={handleUpdate}
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
                          <Row gutter={24}>
                            <Col span={24}>
                              <div className="thong-tin-account">
                                <div className="thong-tin-quan-trong">
                                  <div className="row">
                                    <p>Họ và Tên:</p>
                                    <span>
                                      {user.firstName} {user.lastName}
                                    </span>
                                  </div>
                                  <div className="row">
                                    <p>Email:</p>
                                    <span>{user.email}</span>
                                  </div>
                                  <div className="row">
                                    <p>Giới tính:</p>
                                    <span>{genderText}</span>
                                  </div>
                                  <div className="row">
                                    <p>Sinh nhật:</p>
                                    <span>{formattedDate}</span>
                                  </div>
                                  <div className="row">
                                    <p>Địa chỉ:</p>
                                    <span>{user.address}</span>
                                  </div>
                                  <div className="row">
                                    <p>Số điện thoại:</p>
                                    <span>{user.phoneNumber}</span>
                                  </div>
                                  <div className="row">
                                    <p>Phân quyền:</p>
                                    <span>{userRole}</span>
                                  </div>
                                  <div className="row">
                                    <p>Ngày tạo:</p>
                                    <span>{formattedCreatAt}</span>
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
                        </div>
                      </Content>
                    </Col>
                    <Col span={1}></Col>
                  </Row>

                  <div className="update-profile">
                    <Modal
                      title="Chỉnh sửa tài khoản"
                      open={isEditing}
                      onCancel={() => setIsEditing(false)}
                      onOk={handleSave}
                      cancelText="Hủy"
                      okText="Lưu"
                      confirmLoading={uploading}
                    >
                      <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={{
                          email: user.email,
                          firstName: user.firstName,
                          lastName: user.lastName,
                          address: user.address,
                          phoneNumber: user.phoneNumber,
                          userRole,
                          formattedDate,
                          gender: user.gender,
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
                                {
                                  required: true,
                                  message: "Vui lòng nhập email!",
                                },
                              ]}
                            >
                              <Input placeholder="....@gmail.com" />
                            </Form.Item>
                          </Col>
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
                              <Input placeholder="Tên*" />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={24}>
                          <Col span={12}>
                            <Form.Item
                              label="Giới tính"
                              name="gender"
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập tên nick!",
                                },
                              ]}
                            >
                              <Radio.Group onChange={genderText}>
                                <Radio value="MALE">Nam</Radio>
                                <Radio value="FEMALE">Nữ</Radio>
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              label="Ngày sinh"
                              name="formattedDate"
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập tên nick!",
                                },
                              ]}
                            >
                              <Input defaultValue={formattedDate} />
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
                        </Row>
                        <Row gutter={24}>
                          <Col span={12}>
                            <Form.Item
                              label="Số điện thoại"
                              name="phoneNumber"
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập số điện thoại!",
                                },
                              ]}
                            >
                              <Input placeholder="Số điện thoại" />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              label="Phân quyền"
                              name="userRole"
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
          </Tabs>
          <Tabs tab="Lịch sử mua hàng" key="2">
            <div className="lich-su-mua-hang-detail">
              {deliveredOrders.map((order, index) =>
                renderCard(order, index, "Đã giao", "green")
              )}
            </div>
          </Tabs>
        </Tabs>
      </div>
    </div>
  );
}

export default ProfileAccount;
