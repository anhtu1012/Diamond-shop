import {
  Col,
  Row,
  Form,
  Input,
  Image,
  Button,
  Select,
  DatePicker,
  theme,
} from "antd";
import { useParams } from "react-router-dom";
import "./index.scss";
import { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import moment from "moment";
import {
  fetchDiamondById,
  updateDiamond,
} from "../../../../../services/Uservices";
import LoadingTruck from "../../../../components/loading";

function DiamondDetails() {
  const { diamondID } = useParams();
  const [diamond, setDiamond] = useState([]); // Initialize as null
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  console.log(diamondID);
  const fetchDiamondByIds = async (diamondID) => {
    const response = await fetchDiamondById(diamondID);
    const diamondData = response.data;
    setDiamond(diamondData);
    form.setFieldsValue({
      diamondID: diamondData.diamondID,
      diamondName: diamondData.diamondName,
      originPrice: diamondData.originPrice,
      ratio: diamondData.ratio,
      inputDate: moment(diamondData.inputDate, "YYYY-MM-DD"),
      flourescence: diamondData.flourescence,
      shape: diamondData.shape,
      colorLevel: diamondData.colorLevel,
      carat: diamondData.carat,
      clarify: diamondData.clarify,
      dimensions: diamondData.dimensions,
      cut: diamondData.cut,
      color: diamondData.color,
      certificate: diamondData.certificate,
      status: diamondData.status ? "Còn hàng" : "Hết hàng",
      totalPrice: diamondData.totalPrice,
    });
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form values before API call:", values);
      setIsEditing(false);
      const updatedDetails = {
        originPrice: values.originPrice,
        ratio: values.ratio,
        status: values.status === "Còn hàng",
      };
      await updateDiamond(diamond.diamondID, updatedDetails);
      fetchDiamondByIds(diamond.diamondID);
    } catch (error) {
      console.error("Error when updating diamond:", error);
    }
  };

  useEffect(() => {
    fetchDiamondByIds(diamondID);
  }, [diamondID]);

  if (!diamondID) {
    return <LoadingTruck />;
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (!diamond) {
    return <LoadingTruck />;
  }

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <Row>
      <Col span={16}>
        <Content
          style={{
            margin: "0 10px",
          }}
        >
          <div
            style={{
              padding: 16,
              minHeight: 360,
              background: "#EEEEEE",
              borderRadius: borderRadiusLG,
            }}
          >
            <h3 style={{ fontWeight: "500" }}>Thông tin chi tiết kim cương</h3>
            <Form form={form} layout="vertical">
              <Row
                gutter={20}
                className="detail1"
                style={{ padding: "5px 10px" }}
              >
                <Col className="infor-detail" span={12}>
                  <Form.Item
                    label="Mã GIA"
                    name="diamondID"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng không để trống",
                      },
                      {
                        validator: (_, value) =>
                          value && /^\d{10}$/.test(value)
                            ? Promise.resolve()
                            : Promise.reject(
                                new Error("Mã Gia phải chứa đúng 10 chữ số")
                              ),
                      },
                    ]}
                    className="custom-form-item"
                  >
                    <Input readOnly style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col className="infor-detail" span={12}>
                  <Form.Item
                    label="Tên Kim Cương"
                    name="diamondName"
                    rules={[
                      { required: true, message: "Vui lòng không để trống" },
                    ]}
                    className="custom-form-item"
                  >
                    <Input readOnly={!isEditing} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={24} className="infor-detail">
                  <Form.Item
                    label="Giá Nhập (VNĐ)"
                    name="originPrice"
                    rules={[
                      { required: true, message: "Vui lòng không để trống" },
                    ]}
                    className="custom-form-item"
                  >
                    <Input readOnly={!isEditing} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col className="infor-detail" span={12}>
                  <Form.Item
                    label="Tỷ lệ (%)"
                    name="ratio"
                    rules={[
                      { required: true, message: "Vui lòng không để trống" },
                    ]}
                    className="custom-form-item"
                  >
                    <Input readOnly={!isEditing} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col className="infor-detail" span={12}>
                  <Form.Item
                    label="Ngày Nhập"
                    name="inputDate"
                    rules={[
                      { required: true, message: "Vui lòng không để trống" },
                    ]}
                    className="custom-form-item"
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      disabled
                      defaultValue={moment(diamond.inputDate, "YYYY-MM-DD")}
                    />
                  </Form.Item>
                </Col>
                <Col className="infor-detail" span={12}>
                  <Form.Item
                    label="Độ Phát Quang"
                    name="flourescence"
                    rules={[
                      { required: true, message: "Vui lòng không để trống" },
                    ]}
                    className="custom-form-item"
                  >
                    <Input readOnly style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col className="infor-detail" span={12}>
                  <Form.Item
                    label="Hình Dạng"
                    name="shape"
                    rules={[
                      { required: true, message: "Vui lòng không để trống" },
                    ]}
                    className="custom-form-item"
                  >
                    <Input readOnly style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col className="infor-detail" span={12}>
                  <Form.Item
                    label="Cấp Màu (Color)"
                    name="colorLevel"
                    rules={[
                      { required: true, message: "Vui lòng không để trống" },
                    ]}
                    className="custom-form-item"
                  >
                    <Input readOnly style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col className="infor-detail" span={12}>
                  <Form.Item
                    label="Trọng lượng (cts)"
                    name="carat"
                    rules={[
                      { required: true, message: "Vui lòng không để trống" },
                    ]}
                    className="custom-form-item"
                  >
                    <Input readOnly style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col className="infor-detail" span={12}>
                  <Form.Item
                    label="Độ Tinh Khiết (clarify)"
                    name="clarify"
                    rules={[
                      { required: true, message: "Vui lòng không để trống" },
                    ]}
                    className="custom-form-item"
                  >
                    <Input readOnly style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col className="infor-detail" span={12}>
                  <Form.Item
                    label="Kích thước (mm)"
                    name="dimensions"
                    rules={[
                      { required: true, message: "Vui lòng không để trống" },
                    ]}
                    className="custom-form-item"
                  >
                    <Input readOnly style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col className="infor-detail" span={12}>
                  <Form.Item
                    label="Nét Cắt/Độ Bóng/Đối Xứng"
                    name="cut"
                    rules={[
                      { required: true, message: "Vui lòng không để trống" },
                    ]}
                    className="custom-form-item"
                  >
                    <Input readOnly style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col className="infor-detail" span={12}>
                  <Form.Item
                    label="Màu sắc"
                    name="color"
                    rules={[
                      { required: true, message: "Vui lòng không để trống" },
                    ]}
                    className="custom-form-item"
                  >
                    <Input readOnly style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </Content>
      </Col>
      <Col span={8}>
        <Content
          style={{
            margin: "0 10px",
          }}
        >
          <div
            style={{
              padding: 16,
              minHeight: 360,
              background: "#EEEEEE",
              borderRadius: borderRadiusLG,
            }}
          >
            <h3 style={{ fontWeight: "500" }}>Hình ảnh</h3>

            <Row
              gutter={20}
              className="detail1"
              style={{ padding: "5px 10px" }}
            >
              <Col
                className="image-diamond-detail"
                span={24}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Image
                  className="image-diamond"
                  src={diamond.image}
                  alt="Diamond"
                  style={{
                    width: "130px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                />
              </Col>
              <Col className="infor-detail" span={24}>
                <Form.Item
                  label="Kiểm định"
                  name="certificate"
                  rules={[
                    { required: true, message: "Vui lòng không để trống" },
                  ]}
                  className="custom-form-item"
                >
                  <Input
                    className="custom-placeholder"
                    readOnly
                    placeholder={diamond.certificate}
                    style={{ width: "100%", color: "black" }}
                  />
                </Form.Item>
                <Form.Item
                  label="Trạng thái"
                  name="status"
                  rules={[
                    { required: true, message: "Vui lòng không để trống" },
                  ]}
                  className="custom-form-item"
                >
                  {isEditing ? (
                    <Select
                      style={{ width: "100%" }}
                      defaultValue={diamond.status ? "Còn hàng" : "Hết hàng"}
                    >
                      {["Còn hàng", "Hết hàng"].map((status) => (
                        <Select.Option key={status} value={status}>
                          {status}
                        </Select.Option>
                      ))}
                    </Select>
                  ) : (
                    <Input
                      className="custom-placeholder"
                      readOnly
                      placeholder={diamond.status ? "Còn hàng" : "Hết hàng"}
                      style={{ width: "100%" }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col className="infor-detail" span={24}></Col>
              <Col className="infor-detail" span={24}>
                <Form.Item
                  label="Giá Bán (VNĐ)"
                  name="totalPrice"
                  rules={[
                    { required: true, message: "Vui lòng không để trống" },
                  ]}
                  className="custom-form-item"
                >
                  <Input
                    className="custom-placeholder"
                    readOnly
                    placeholder={diamond.totalPrice}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <div
              className="button"
              style={{ display: "flex", justifyContent: "right" }}
            >
              <Button className="button1" type="primary">
                Xóa
              </Button>
              {!isEditing && (
                <Button className="button2" type="primary" onClick={handleEdit}>
                  Chỉnh sửa
                </Button>
              )}
              {isEditing && (
                <Button
                  className="button2"
                  type="primary"
                  onClick={handleUpdate}
                >
                  Lưu
                </Button>
              )}
            </div>
          </div>
        </Content>
      </Col>
    </Row>
  );
}

export default DiamondDetails;
