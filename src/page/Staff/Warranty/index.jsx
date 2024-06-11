import { AutoComplete, Button, Col, DatePicker, Form, Input, Row } from "antd";
import { useState } from "react";
import "./index.scss";
import Container from "../../../components/container/Container";
const Warranty = () => {
  const [email, setEmail] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [form] = Form.useForm();

  const handleBlur = () => {
    if (!email.endsWith("@gmail.com")) {
      setEmail(email + "@gmail.com");
    }
  };

  const onFinish = (values) => {
    console.log("Received values: ", values);
  };

  const handleEmailChange = (value) => {
    setEmail(value);

    if (value && !value.includes("@")) {
      setSuggestions([`${value}@gmail.com`]);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div>
      <Container>
        <div>
          <h2 style={{ fontWeight: "bold", fontSize: "28px" }}>
            Phiếu Bảo Hành
          </h2>
          <div className="bao-hanh">
            <h3 className="bao-hanh1">1. Thông Tin Bảo Hành</h3>
            <p className="bao-hanh2">Thời gian bảo hành: 12 tháng</p>
            <p className="bao-hanh2">
              Điều kiện áp dụng: Bảo hành chỉ áp dụng cho các lỗi do sản phẩm
              hoặc quá trình sản xuất.
            </p>
            <Row>
              <Col span={12}>
                <h3 className="bao-hanh3"> Thông tin người mua</h3>
                <Form form={form} onFinish={onFinish} labelCol={{ span: 24 }}>
                  <Form.Item
                    name="name"
                    label="Họ và Tên"
                    rules={[
                      { required: true, message: "Xin hãy nhập vào Name!" },
                    ]}
                  >
                    <Input
                      className="input"
                      placeholder="Họ và tên:"
                      style={{ width: "350px", height: "40px" }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[
                      { required: true, message: "Xin hãy nhập vào SĐT!" },
                      {
                        pattern: /^\d+$/,
                        message: "Số điện thoại chỉ được nhập số!",
                      },
                    ]}
                  >
                    <Input
                      className="input"
                      placeholder="Số điện thoại:"
                      style={{ width: "350px", height: "40px" }}
                      type="tel"
                    />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "Xin hãy nhập vào Email!" },
                    ]}
                  >
                    <AutoComplete
                      options={suggestions.map((email) => ({ value: email }))}
                      onChange={handleEmailChange}
                      value={email}
                      onBlur={handleBlur}
                    >
                      <Input
                        className="input"
                        placeholder="Email:"
                        style={{ width: "350px", height: "40px" }}
                      />
                    </AutoComplete>
                  </Form.Item>

                  <Form.Item
                    name="birthdate"
                    label="Ngày sinh"
                    rules={[
                      {
                        required: true,
                        message: "Xin hãy nhập vào Ngày sinh!",
                      },
                    ]}
                  >
                    <DatePicker
                      className="input"
                      placeholder="Ngày sinh:"
                      style={{ width: "350px", height: "40px" }}
                      format="DD/MM/YYYY"
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col span={12}>
                <h3 className="bao-hanh3">Thông tin sản phẩm</h3>
                <Form
                  form={form}
                  onFinish={onFinish}
                  style={{ padding: "25px 30px" }}
                  labelCol={{ span: 24 }} // Đặt labelCol cho toàn bộ Form
                >
                  <Form.Item
                    name="productInfo"
                    label="Tên sản phẩm:"
                    rules={[
                      {
                        required: true,
                        message: "Xin hãy nhập vào tên sản phẩm!",
                      },
                    ]}
                  >
                    <Input
                      className="input"
                      placeholder="Tên sản phẩm:"
                      style={{ width: "350px", height: "40px" }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="productCode"
                    label="Mã sản phẩm:"
                    rules={[
                      {
                        required: true,
                        message: "Xin hãy nhập vào mã sản phẩm!",
                      },
                    ]}
                  >
                    <Input
                      className="input"
                      placeholder="Mã sản phẩm:"
                      style={{ width: "350px", height: "40px" }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="purchaseDate"
                    label="Ngày mua:"
                    rules={[
                      { required: true, message: "Xin hãy nhập vào ngày mua!" },
                    ]}
                  >
                    <DatePicker
                      className="input"
                      placeholder="Ngày mua:"
                      style={{ width: "350px", height: "40px" }}
                      format="DD/MM/YYYY"
                    />
                  </Form.Item>

                  <Form.Item
                    name="productPrice"
                    label="Giá sản phẩm:"
                    rules={[
                      {
                        required: true,
                        message: "Xin hãy nhập vào giá sản phẩm!",
                      },
                    ]}
                  >
                    <Input
                      className="input"
                      placeholder="Giá sản phẩm:"
                      style={{ width: "350px", height: "40px" }}
                      type="number"
                    />
                  </Form.Item>
                </Form>
              </Col>
            </Row>

            <div>
              <h3 className="bao-hanh1">2. Liên Hệ</h3>
              <p className="bao-hanh2">
                Nếu có bất kỳ vấn đề hoặc yêu cầu hỗ trợ nào, vui lòng liên hệ:
              </p>
              <p className="bao-hanh2">Số điện thoại: 0123456789</p>
              <p className="bao-hanh2">Email: diamondshop@example.com</p>
            </div>
            <div>
              <h3 className="bao-hanh1">3. Hướng Dẫn Sử Dụng Sản Phẩm</h3>
              <p className="bao-hanh2">
                Bạn có thể tải xuống hướng dẫn sử dụng sản phẩm tại đây:{" "}
                <a href="/huong-dan-su-dung">Hướng dẫn sử dụng</a>
              </p>
            </div>
            <div>
              <h3 className="bao-hanh1">4. Chính Sách Hoàn Trả</h3>
              <p className="bao-hanh2">
                Chúng tôi cam kết hoàn trả 100% tiền mặt trong vòng 30 ngày nếu
                sản phẩm không đáp ứng được nhu cầu của bạn.Thông tin chi tiết
                tại <a href="/chinh-sach-doi-tra">Chính Sách Hoàn Trả</a>
              </p>
            </div>
            <div>
              <h3 className="bao-hanh1">5. Câu Hỏi Thường Gặp</h3>
              <p className="bao-hanh2">
                Xem thêm câu hỏi thường gặp liên quan đến bảo hành của chúng tôi
                tại <a href="/faq">FAQs</a>
              </p>
            </div>
          </div>
        </div>
      </Container>

      <div className="nut-nhan">
        <Button type="primary" className="black-button">
          <span>In phiếu</span>
        </Button>

        <Button type="primary" className="black-button">
          <span>Gửi Email</span>
        </Button>
      </div>
    </div>
  );
};

export default Warranty;
