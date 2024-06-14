import {
  Button,
  Col,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Rate,
  Row,
  Upload,
  message,
  theme,
} from "antd";
import ImgCrop from "antd-img-crop";
import { Content } from "antd/es/layout/layout";
import moment from "moment";
import { useEffect, useState } from "react";
import { TiArrowBack } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";
import {
  deleteDiamond,
  fetchDiamondById,
  updateDiamond,
} from "../../../../../services/Uservices";
import LoadingTruck from "../../../../components/loading";

import "./index.scss";
import uploadFile from "../../../../utils/upload";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function DiamondDetails() {
  const { diamondID } = useParams();
  const [fileList, setFileList] = useState([]);
  const [diamond, setDiamond] = useState(null);
  const [originalValues, setOriginalValues] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchDiamondByIds(diamondID);
  }, [diamondID]);

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

  const fetchDiamondByIds = async (diamondID) => {
    const response = await fetchDiamondById(diamondID);
    const diamondData = response.data;
    setDiamond(diamondData);
    setOriginalValues({
      diamondName: diamondData.diamondName,
      originPrice: diamondData.originPrice,
      ratio: diamondData.ratio,
      image: diamondData.image,
    });

    form.setFieldsValue({
      diamondID: diamondData.diamondID,
      diamondName: diamondData.diamondName,
      originPrice: diamondData.originPrice.toLocaleString("vi-VN", {
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
      totalPrice: diamondData.totalPrice.toLocaleString("vi-VN", {
        maximumFractionDigits: 0,
      }),
    });

    setFileList([
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: diamondData.image,
      },
    ]);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      let updatedDetails = {};

      // Check if the image needs to be updated
      let imageUrl = originalValues.image;
      if (fileList.length > 0 && fileList[0].originFileObj) {
        setUploading(true);
        imageUrl = await uploadFile(fileList[0].originFileObj);
        setUploading(false);
        updatedDetails.image = imageUrl;
      }

      if (values.diamondName !== originalValues.diamondName) {
        updatedDetails.diamondName = values.diamondName;
      }
      if (values.originPrice !== originalValues.originPrice) {
        updatedDetails.originPrice = values.originPrice;
      }
      if (values.ratio !== originalValues.ratio) {
        updatedDetails.ratio = values.ratio;
      }

      if (Object.keys(updatedDetails).length > 0) {
        await updateDiamond(diamond.diamondID, updatedDetails);
        fetchDiamondByIds(diamond.diamondID);
        setIsEditing(false);
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

  const handleDeleteImage = async (file) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(newFileList);
    message.success("Xóa ảnh thành công!");
  };

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
                    {diamond.totalPrice.toLocaleString("vi-VN", {
                      maximumFractionDigits: 0,
                    })}{" "}
                    vnđ
                  </h2>
                  <Form
                    form={form}
                    onFinish={handleUpdate}
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
                onCancel={() => setIsEditing(false)}
                onOk={handleUpdate}
                cancelText="Hủy"
                okText="Lưu"
                confirmLoading={uploading}
              >
                <Form
                  form={form}
                  layout="vertical"
                  initialValues={{
                    diamondName: diamond.diamondName,
                    ratio: diamond.ratio,
                    originPrice: diamond.originPrice.toLocaleString("vi-VN", {
                      maximumFractionDigits: 0,
                    }),
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

                    <Form.Item name="image" valuePropName="fileList">
                      <ImgCrop rotationSlider>
                        <Upload
                          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                          listType="picture-card"
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
      </Col>
    </Row>
  );
}

export default DiamondDetails;
