import { AutoComplete, Button, DatePicker, Form, Input } from "antd";
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
            Phiếu Bảo Hành Viên Kim Cương
          </h2>
          <Form form={form} onFinish={onFinish} labelCol={{ span: 24 }}>
            <div className="bao-hanh">
              <h3 className="bao-hanh1">1. Thông Tin Khách Hàng</h3>
              <Form.Item
                name="customerName"
                label="Họ và Tên"
                rules={[
                  { required: true, message: "Xin hãy nhập vào Họ và Tên!" },
                ]}
              >
                <Input className="input" placeholder="Họ và Tên:" />
              </Form.Item>
              <Form.Item
                name="address"
                label="Địa chỉ"
                rules={[
                  { required: true, message: "Xin hãy nhập vào Địa chỉ!" },
                ]}
              >
                <Input className="input" placeholder="Địa chỉ:" />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập vào Số điện thoại!",
                  },
                  {
                    pattern: /^\d+$/,
                    message: "Số điện thoại chỉ được nhập số!",
                  },
                ]}
              >
                <Input
                  className="input"
                  placeholder="Số điện thoại:"
                  type="tel"
                />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Xin hãy nhập vào Email!" }]}
              >
                <AutoComplete
                  options={suggestions.map((email) => ({ value: email }))}
                  onChange={handleEmailChange}
                  value={email}
                  onBlur={handleBlur}
                >
                  <Input className="input" placeholder="Email:" />
                </AutoComplete>
              </Form.Item>

              <h3 className="bao-hanh1">2. Thông Tin Sản Phẩm</h3>
              <Form.Item
                name="productName"
                label="Tên sản phẩm"
                rules={[
                  { required: true, message: "Xin hãy nhập vào Tên sản phẩm!" },
                ]}
              >
                <Input className="input" placeholder="Tên sản phẩm:" />
              </Form.Item>
              <Form.Item
                name="productCode"
                label="Mã sản phẩm"
                rules={[
                  { required: true, message: "Xin hãy nhập vào Mã sản phẩm!" },
                ]}
              >
                <Input className="input" placeholder="Mã sản phẩm:" />
              </Form.Item>
              <Form.Item
                name="carat"
                label="Trọng lượng (Carat)"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập vào Trọng lượng (Carat)!",
                  },
                ]}
              >
                <Input className="input" placeholder="Trọng lượng (Carat):" />
              </Form.Item>
              <Form.Item
                name="clarity"
                label="Độ tinh khiết"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập vào Độ tinh khiết!",
                  },
                ]}
              >
                <Input className="input" placeholder="Độ tinh khiết:" />
              </Form.Item>
              <Form.Item
                name="color"
                label="Màu sắc"
                rules={[
                  { required: true, message: "Xin hãy nhập vào Màu sắc!" },
                ]}
              >
                <Input className="input" placeholder="Màu sắc:" />
              </Form.Item>
              <Form.Item
                name="cut"
                label="Cắt gọt"
                rules={[
                  { required: true, message: "Xin hãy nhập vào Cắt gọt!" },
                ]}
              >
                <Input className="input" placeholder="Cắt gọt:" />
              </Form.Item>
              <Form.Item
                name="certificateCode"
                label="Mã chứng nhận"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập vào Mã chứng nhận!",
                  },
                ]}
              >
                <Input className="input" placeholder="Mã chứng nhận:" />
              </Form.Item>

              <h3 className="bao-hanh1">3. Thời Gian Bảo Hành</h3>
              <Form.Item name="warrantyPeriod" label="Bảo hành">
                <Input
                  className="input"
                  placeholder="Bảo hành: 24 tháng từ ngày mua"
                  disabled
                />
              </Form.Item>
              <Form.Item
                name="purchaseDate"
                label="Ngày mua"
                rules={[
                  { required: true, message: "Xin hãy nhập vào Ngày mua!" },
                ]}
              >
                <DatePicker
                  className="input"
                  placeholder="Ngày mua:"
                  format="DD/MM/YYYY"
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                name="warrantyExpiry"
                label="Ngày hết hạn bảo hành"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập vào Ngày hết hạn bảo hành!",
                  },
                ]}
              >
                <DatePicker
                  className="input"
                  placeholder="Ngày hết hạn bảo hành:"
                  format="DD/MM/YYYY"
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <h3 className="bao-hanh1">4. Điều Kiện Áp Dụng</h3>
              <p className="bao-hanh2">
                Điều kiện bảo hành: Bảo hành chỉ áp dụng cho các lỗi liên quan
                đến chất lượng kim cương như độ tinh khiết, màu sắc, và cắt gọt
                không đúng với mô tả ban đầu.
              </p>
              <p className="bao-hanh2">
                Điều kiện không bảo hành: Không áp dụng bảo hành cho các hư hỏng
                do tác động vật lý (va đập, rơi vỡ), mất mát, hoặc các tổn thất
                do việc sử dụng không đúng cách.
              </p>

              <h3 className="bao-hanh1">5. Quyền Lợi Của Khách Hàng</h3>
              <p className="bao-hanh2">
                Sửa chữa: Miễn phí sửa chữa hoặc điều chỉnh kim cương trong thời
                gian bảo hành.
              </p>
              <p className="bao-hanh2">
                Đổi trả: Đổi kim cương mới nếu phát hiện lỗi từ nhà sản xuất.
              </p>
              <p className="bao-hanh2">
                Hoàn tiền: Hoàn tiền 100% nếu sản phẩm không đáp ứng đúng các
                tiêu chí chất lượng đã cam kết.
              </p>

              <h3 className="bao-hanh1">6. Quy Định Và Điều Kiện</h3>
              <p className="bao-hanh2">
                Bảo quản phiếu: Phiếu bảo hành phải được giữ nguyên vẹn, không
                rách, không chỉnh sửa. Mất phiếu sẽ không được cấp lại.
              </p>
              <p className="bao-hanh2">
                Kiểm định lại: Khách hàng có thể yêu cầu kiểm định lại chất
                lượng kim cương tại các trung tâm được ủy quyền nếu có nghi ngờ
                về chất lượng.
              </p>
              <p className="bao-hanh2">
                Điều kiện bảo hành: Chỉ áp dụng cho các lỗi được xác định là do
                nhà sản xuất, không áp dụng cho các lỗi do sử dụng không đúng
                cách hoặc do tai nạn.
              </p>

              <h3 className="bao-hanh1">7. Liên Hệ</h3>
              <p className="bao-hanh2">Số điện thoại: 0123456789</p>
              <p className="bao-hanh2">Email: support@diamondstore.com</p>
              <p className="bao-hanh2">
                Địa chỉ bảo hành: 456 Đường XYZ, Phường UVW, Quận RST, Thành phố
                OPQ
              </p>

              <h3 className="bao-hanh1">8. Hướng Dẫn Sử Dụng Sản Phẩm</h3>
              <p className="bao-hanh2">
                Làm sạch: Sử dụng dung dịch làm sạch chuyên dụng cho kim cương,
                tránh các hóa chất mạnh.
              </p>
              <p className="bao-hanh2">
                Bảo quản: Lưu trữ kim cương ở nơi khô ráo, tránh tiếp xúc trực
                tiếp với nhiệt độ cao hoặc các vật liệu cứng khác.
              </p>

              <h3 className="bao-hanh1">9. Chính Sách Hoàn Trả</h3>
              <p className="bao-hanh2">
                Cam kết hoàn trả: Hoàn trả 100% tiền mặt trong vòng 30 ngày nếu
                sản phẩm không đáp ứng được nhu cầu của bạn.
              </p>
              <p className="bao-hanh2">
                Điều kiện hoàn trả: Sản phẩm phải còn nguyên vẹn và đầy đủ chứng
                nhận.
              </p>

              <h3 className="bao-hanh1">10. Câu Hỏi Thường Gặp</h3>
              <p className="bao-hanh2">
                Xem thêm câu hỏi thường gặp: Thông tin chi tiết và câu trả lời
                cho các thắc mắc liên quan đến bảo hành tại{" "}
                <a href="/gioi-thieu-ve-diamond">FAQs</a>.
              </p>

              <h3 className="bao-hanh1">11. Xác Nhận</h3>
              <p className="bao-hanh2">Chữ ký khách hàng: ________________</p>
              <p className="bao-hanh2">Chữ ký nhân viên: ________________</p>
              <hr />
              <h3 className="bao-hanh1">Ghi Chú Thêm</h3>
              <p className="bao-hanh2">
                Thông tin kiểm định: Viên kim cương này đã được kiểm định bởi
                Viện Đá Quý Hoa Kỳ (GIA). Phiếu kiểm định kèm theo sản phẩm.
              </p>
              <Form.Item
                name="note"
                label="Thông tin kiểm định"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập vào Thông tin kiểm định!",
                  },
                ]}
              >
                <Input className="input" placeholder="Mã chứng nhận:" />
              </Form.Item>

              <div className="nut-nhan">
                <Button
                  type="primary"
                  className="black-button"
                  htmlType="submit"
                >
                  In phiếu
                </Button>
                <Button
                  type="primary"
                  className="black-button"
                  onClick={() => form.submit()}
                >
                  Gửi Email
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Warranty;
