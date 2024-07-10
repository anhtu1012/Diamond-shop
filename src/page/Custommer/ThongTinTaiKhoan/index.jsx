/* eslint-disable no-unused-vars */
import {
  Button,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  Menu,
  Radio,
  Rate,
  Row,
  Select,
  Space,
  Table,
  Tabs,
  Upload,
  message,
} from "antd";
import Container from "../../../components/container/Container";
import uploadFile from "../../../utils/upload";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./index.scss";
import { Option } from "antd/es/mentions";
import { getDistricts, getWards, provinces } from "vietnam-provinces";
import { IoDiamondOutline } from "react-icons/io5";
import { GiBigDiamondRing } from "react-icons/gi";
import {
  changePass,
  fetchUserById,
  getOrderById,
  getWarrantyCard,
  searchWarranty,
  updateUser,
} from "../../../../services/Uservices";
import LoadingTruck from "../../../components/loading";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/counterSlice";
import moment from "moment/moment";
import { useForm } from "antd/es/form/Form";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

const { Search } = Input;
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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [dataSource, setDataSource] = useState([]);
  const [changeForm] = useForm();
  const fetchOderById = async () => {
    const res = await getOrderById(user.userID);
    setData(res.data);
  };

  useEffect(() => {
    fetchOderById();
  }, []);

  useEffect(() => {
    const fetchWarrantyCart = async () => {
      try {
        const res = await getWarrantyCard(user.userID);
        setDataSource(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWarrantyCart();
  }, []);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
  };

  async function searchWarrantys(query) {
    console.log("Searching for:", query);
    if (query) {
      try {
        const response = await searchWarranty(query);
        console.log("Search results:", response.data);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  }

  const searchMenu = (
    <Menu>
      {Array.isArray(searchResults) && searchResults.length > 0 ? (
        searchResults.map((item) => (
          <Menu.Item key={item.warrantyCardID}>
            <Link
              to={`/giay-bao-hanh/${item.warrantyCardID}`}
              onClick={toggleSearch}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div>{item.warrantyCardID || item.objectId}</div>
              </div>
            </Link>
          </Menu.Item>
        ))
      ) : (
        <Menu.Item key="no-results">No results found</Menu.Item>
      )}
    </Menu>
  );
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Mã Bảo Hành",
      dataIndex: "warrantyCardID",
      key: "warrantyCardID",
      width: "10%",
      ...getColumnSearchProps("warrantyCardID"),
    },
    {
      title: "Mã Sản Phẩm",
      dataIndex: "objectId",
      key: "objectId",
      width: "10%",
      ...getColumnSearchProps("objectId"),
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
      width: "15%",
      sorter: (a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate),
      sortDirections: ["descend", "ascend"],
      render: (text) =>
        new Date(text).toLocaleString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "expirationDate",
      key: "expirationDate",
      width: "15%",
      sorter: (a, b) => new Date(a.expirationDate) - new Date(b.expirationDate),
      sortDirections: ["descend", "ascend"],
      render: (text) =>
        new Date(text).toLocaleString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "10%",
      render: (text, record) => (
        <div style={{ textAlign: "center" }}>
          <Link
            to={`/giay-bao-hanh/${record.warrantyCardID}`}
            style={{ fontWeight: "bold" }}
          >
            Xem chi tiết
          </Link>
        </div>
      ),
    },
  ];

  const renderCard = (order, index, buttonText, buttonColor) => {
    const formattedDate = new Date(order.orderDate).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Sử dụng định dạng 24 giờ thay vì AM/PM
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
              style={{ marginLeft: "10px" }}
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
            <Link to={`/don-hang/chi-tiet-don-hang/${order.orderId}`}>
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
  const deliveredOrders = getDeliveredOrders();

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
                  {userr.firstName} {userr.lastName}
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
                              <Form
                                form={changeForm}
                                onFinish={handleChangePass}
                              >
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
                          initialcurrentValues={{
                            email: userr.email,
                            firstName: userr.firstName,
                            lastName: userr.lastName,
                            phone: userr.phone,
                            address: userr.address,
                            gender: userr.gender,
                            yearOfBirth: moment(
                              userr.yearOfBirth,
                              "YYYY-MM-DD"
                            ),

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
                                {userr.firstName}
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
                                {userr.lastName}
                              </p>
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
                              <p style={{ fontSize: "16px" }}>
                                {formattedDate}
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
                              <p style={{ fontSize: "16px" }}>
                                {userr.address}
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
                    <div className="lich-su-mua-hang-detail">
                      {deliveredOrders.map((order, index) =>
                        renderCard(order, index, "Đã giao", "green")
                      )}
                    </div>
                  </Col>
                  <Col span={2}></Col>
                </Row>
              </Tabs>
              <Tabs tab="Phiếu bảo hành" key="3">
                <Row gutter={24}>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <Search
                      placeholder="Nhập Mã Bảo Hành"
                      enterButton="Search"
                      size="large"
                      style={{ width: "30%" }}
                      onSearch={searchWarrantys}
                      className="custom-search"
                    />
                    {isSearchVisible && searchMenu}
                  </Col>
                  <Col span={24} style={{ paddingTop: "25px" }}>
                    {loading ? (
                      <LoadingTruck /> // Show LoadingTruck while loading
                    ) : (
                      <Table
                        className="table"
                        columns={columns}
                        dataSource={dataSource}
                      />
                    )}
                  </Col>
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
