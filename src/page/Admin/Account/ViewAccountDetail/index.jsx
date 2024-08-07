/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import {
  Form,
  Button,
  message,
  theme,
  Select,
  Upload,
  Space,
  Image,
  Row,
  Col,
  Tabs,
  Rate,
} from "antd";
import { Link, useParams } from "react-router-dom";
import "./index.scss";
// import uploadFile from "../../../../utils/upload";
import {
  fetchUserById,
  getOrderById,
  lockUser,
  updateUser,
} from "../../../../../services/Uservices";
import moment from "moment";
import { GiBigDiamondRing } from "react-icons/gi";
import { IoDiamondOutline } from "react-icons/io5";
import LoadingTruck from "../../../../components/loading";
import { TiArrowBack } from "react-icons/ti";
import { Content } from "antd/es/layout/layout";

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
  const [originalValues, setOriginalValues] = useState({});
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  const [data, setData] = useState([]);

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

  const handleLockUser = async () => {
    try {
      console.log();
      await lockUser(user.userID);
      message.success("Khóa thành công!");
    } catch (error) {
      console.log("Error to lock User", error);
      message.error("Khóa tài khoản không thành công!");
    }
  };

  const fetchUserByIds = async (userID) => {
    const response = await fetchUserById(userID);
    const userData = response.data.data;
    setUser(userData);
    console.log(response.data.data);
    const addressParts = user.address.split(",");

    const addressDetails = {
      province: addressParts[3] || "",
      district: addressParts[2] || "",
      ward: addressParts[1] || "",
      detailAddress: addressParts[0] || "",
    };
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
      ...addressDetails,
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
    fetchUserByIds();
  }, []);

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

  const uploadButton = (
    <div>
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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
                        <Button
                          className="button1"
                          type="primary"
                          onClick={handleLockUser}
                        >
                          Khóa
                        </Button>
                      </div>
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
                                    <span>{user.phone}</span>
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
