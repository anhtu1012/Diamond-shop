import {
  Col,
  Row,
  Form,
  Input,
  Image,
  Button,
  Select,
  theme,
  Upload,
  Divider,
  Rate,
  message,
  Modal,
  InputNumber,
} from "antd";
import { Link, useParams } from "react-router-dom";
import "./index.scss";
import { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import moment from "moment";
import {
  fetchDiamondById,
  updateDiamond,
  deleteDiamond,
} from "../../../../../services/Uservices";
import LoadingTruck from "../../../../components/loading";
import { PlusOutlined } from "@ant-design/icons";
import { TiArrowBack } from "react-icons/ti";

function DiamondDetails() {
  const { diamondID } = useParams();
  const [diamond, setDiamond] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const fetchDiamondByIds = async (diamondID) => {
    const response = await fetchDiamondById(diamondID);
    const diamondData = response.data;
    setDiamond(diamondData);
    const images = diamondData.image.map((img, index) => ({
      uid: img.image.toString(),
      name: `image${index + 1}.png`,
      status: "done",
      url: img.image,
    }));
    setFileList(images);
    form.setFieldsValue({
      diamondID: diamondData.diamondID,
      diamondName: diamondData.diamondName,
      originPrice: diamondData.originPrice.toLocaleString("en-US", {
        maximumFractionDigits: 0,
      }),
      ratio: diamondData.ratio,
      inputDate: moment(diamondData.inputDate, "YYYY-MM-DD"),
      flourescence: diamondData.flourescence,
      shape: diamondData.shape,
      colorLevel: diamondData.colorLevel,
      carat: diamondData.carat,
      clarify: diamondData.clarify,
      dimensions: diamondData.dimensions,
      cut: diamondData.cut,
      image: diamondData.image,
      color: diamondData.color,
      certificate: diamondData.certificate,
      status: diamondData.status ? "Còn hàng" : "Hết hàng",
      totalPrice: diamondData.totalPrice.toLocaleString("en-US", {
        maximumFractionDigits: 0,
      }),
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      const updatedDetails = {
        diamondName: values.diamondName,
        originPrice: values.originPrice ? values.originPrice.replace(/,/g, "") : "",
        ratio: values.ratio,
        status: values.status === "Còn hàng",
        image: fileList.map(file => file.url),
      };
      await updateDiamond(diamond.diamondID, updatedDetails);
      fetchDiamondByIds(diamond.diamondID);
      setIsEditing(false);
      message.success("Cập nhật thành công!");
    } catch (error) {
      console.error("Error when updating diamond:", error);
      message.error("Cập nhật thất bại!");
    }
  };
  

  const handleUpload = ({ fileList: newFileList }) => {
    console.log("fileList:", fileList);
    console.log("newFileList:", newFileList);
    const updatedFileList = Array.isArray(newFileList) ? newFileList : [];
    setFileList(updatedFileList);
  };

  const handleDeleteImage = (file) => {
    const newFileList = (fileList || []).filter((f) => f.uid !== file.uid);
    setFileList(newFileList);
    message.success("Xóa ảnh thành công!");
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handlePreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const imgWindow = window.open(src);
    imgWindow.document.write(`<img src="${src}" style="width: 100%;" />`);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    fetchDiamondByIds(diamondID);
  }, [diamondID]);

  const handleDelete = async () => {
    try {
      await deleteDiamond(diamond.diamondID);
      message.success("Xóa thành công!");
    } catch (error) {
      console.error("Error deleting diamond:", error);
      message.error("Xóa thất bại!");
    }
  };

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  if (!diamond) {
    return <LoadingTruck />;
  }

  return (
    <Row>
      <Col span={24}>
        <Content
          style={{
            margin: "0 10px",
          }}
        >
          <div
            style={{
              padding: 16,
              minHeight: 360,
              background: "#fff",
              borderRadius: borderRadiusLG,
            }}
          >
            <div
              className="infor-details"
              style={{ marginBottom: "20px", display: "flex" }}
            >
              <h2 style={{ fontWeight: "500" }}>
                Thông tin chi tiết kim cương
              </h2>
              <h2 style={{ fontWeight: "500", marginLeft: "auto" }}>
                <Link
                  to={"/admin-page/san-pham/xem-tat-ca-kim-cuong"}
                  style={{ color: "black", fontWeight: 600 }}
                >
                  <TiArrowBack style={{ justifyContent: "center" }} /> Quay lại
                </Link>
              </h2>
            </div>

            <Row style={{ marginTop: "20px" }}>
              <Col span={12}>
                <Row gutter={8}>
                  <Col span={8}></Col>
                  <Col span={12}>
                    <Image
                      src={diamond.image}
                      alt="Diamond"
                      style={{
                        width: "300px",
                        display: "flex",
                        justifyContent: "start",
                      }}
                    />
                  </Col>
                </Row>
              </Col>

              <Col span={12}>
                <div className="description-product">
                  <h2
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      color: "#15393f",
                      fontWeight: "500",
                      marginBottom: "10px",
                    }}
                  >
                    {diamond.diamondName}
                  </h2>
                  <Rate disabled defaultValue={5} />
                  <h4 style={{ marginTop: "10px", fontWeight: "300" }}>
                    {diamond.diamondID}
                  </h4>
                  <h2
                    style={{
                      display: "flex",
                      fontWeight: "bold",
                      color: "#15393f",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    {diamond.totalPrice.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}{" "}
                    vnđ
                  </h2>
                  <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                      status: diamond.status ? "Còn hàng" : "Hết hàng",
                    }}
                  >
                    <div className="status">
                      <Form.Item
                        label="Trạng thái"
                        name="status"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng không để trống",
                          },
                        ]}
                        className="custom-form-item"
                      >
                        <Input readOnly style={{ width: "50%" }} />
                      </Form.Item>
                    </div>
                  </Form>
                </div>
                <div className="button">
                  <Button
                    className="button1"
                    type="primary"
                    onClick={handleDelete}
                  >
                    Xóa
                  </Button>
                  {!isEditing && (
                    <Button
                      className="button2"
                      type="primary"
                      style={{ background: "#dec55e" }}
                      onClick={handleEdit}
                    >
                      Chỉnh sửa
                    </Button>
                  )}
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Col span={24}>
                <Divider style={{ fontSize: "20px", color: "#15393f" }}>
                  Chi Tiết Sản Phẩm
                </Divider>
                <div className="table-container">
                  <table className="custom-table">
                    <tbody>
                      <tr>
                        <th>CẤP MÀU</th>
                        <td>{diamond.colorLevel}</td>
                      </tr>
                      <tr>
                        <th>ĐỘ TINH KHIẾT</th>
                        <td>{diamond.clarify}</td>
                      </tr>
                      <tr>
                        <th>MÃ GIA</th>
                        <td>{diamond.diamondID}</td>
                      </tr>
                      <tr>
                        <th>MÀU SẮC</th>
                        <td>{diamond.color}</td>
                      </tr>
                      <tr>
                        <th>NÉT CẮT</th>
                        <td>{diamond.cut}</td>
                      </tr>
                      <tr>
                        <th>PHÁT QUANG</th>
                        <td>{diamond.flourescence}</td>
                      </tr>
                      <tr>
                        <th>HÌNH DẠNG</th>
                        <td>{diamond.shape}</td>
                      </tr>
                      <tr>
                        <th>KÍCH THƯỚC (MM)</th>
                        <td>{diamond.dimensions}</td>
                      </tr>
                      <tr>
                        <th>TRỌNG LƯỢNG (CTS)</th>
                        <td>{diamond.carat}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
            <div className="button">
              <Modal
                title="Chỉnh sửa sản phẩm"
                open={isEditing}
                onCancel={handleCancel}
                onOk={handleUpdate}
                cancelText="Hủy"
                okText="Lưu"
              >
                <Form
                  form={form}
                  layout="vertical"
                  initialValues={{
                    diamondName: diamond.diamondName,
                    ratio: diamond.ratio,
                    originPrice: diamond.originPrice.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    }),
                    status: diamond.status ? "Còn hàng" : "Hết hàng",
                  }}
                >
                  <Row gutter={24}>
                    <Col span={24}>
                      <Form.Item
                        label="Tên Kim Cương"
                        name="diamondName"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng không để trống",
                          },
                        ]}
                        className="custom-form-item"
                      >
                        <Input style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                    {/* Add more form fields here */}
                    <Col span={24}>
                      <Form.Item
                        label="Ratio"
                        name="ratio"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng không để trống",
                          },
                        ]}
                        className="custom-form-item"
                      >
                        <Input style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        label="Giá nhập"
                        name="originPrice"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng không để trống",
                          },
                        ]}
                        className="custom-form-item"
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        label="Trạng thái"
                        name="status"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng không để trống",
                          },
                        ]}
                        className="custom-form-item"
                      >
                        <Select style={{ width: "100%" }}>
                          <Select.Option value="Còn hàng">
                            Còn hàng
                          </Select.Option>
                          <Select.Option value="Hết hàng">
                            Hết hàng
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Image
                        src={diamond.image}
                        alt="Diamond"
                        style={{
                          width: "100px",
                          display: "flex",
                          justifyContent: "start",
                        }}
                      />
                    </Col>
                    <Form.Item name="poster" valuePropName="fileList">
                      <Upload
                        listType="picture-card"
                        fileList={fileList}
                        beforeUpload={() => false}
                        onPreview={handlePreview}
                        onChange={handleUpload}
                        onRemove={handleDeleteImage}
                      >
                        {fileList.length >= 8 ? null : uploadButton}
                      </Upload>
                    </Form.Item>
                  </Row>
                </Form>
              </Modal>
            </div>
          </div>
        </Content>
      </Col>
    </Row>
  );
}

export default DiamondDetails;
