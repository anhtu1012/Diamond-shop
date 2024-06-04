import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import "./index.scss";

const validateMessages = {
  required: "${label} không được để trống",
  types: {
    email: "Vui lòng điền đúng ${label}!",
    number: "Số điện thoại có 10 số",
  },
};

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    setMessage(
      "Nếu Email hoặc Số Điện Thoại này tồn tại trong hệ thống, vui lòng xem Email hoặc SĐT để nhận mã OTP."
    );
    setStep(2);
  };

  const handleSubmitOtp = (e) => {
    e.preventDefault();
    console.log("OTP:", otp);
    setMessage("OTP đã được xác nhận. Bạn có thể đặt lại mật khẩu.");
  };

  const handleBackToEmail = () => {
    setStep(1);
    setEmail("");
    setOtp("");
    setMessage("");
  };

  return (
    <div>
      <div className="back-home-page">
        <button type="button" className="back-button">
          <Link to="/" className="no-underline">
            Quay lại Diamond King
          </Link>
        </button>
        <div className="logo-back">
          <Link to="/">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/Logo-phong-trang.png?alt=media&token=f7f1e2f9-3b82-40c2-b02c-eeb19d88fb4c"
              alt="logo"
            />
          </Link>
        </div>
      </div>

      <div className="forgot-password-container">
        <h2>Quên Mật Khẩu</h2>
        {step === 1 ? (
          <Form onSubmitCapture={handleSubmitEmail}>
            <h4 style={{ fontWeight: 400 }}>Nhập Email hoặc SĐT:</h4>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                placeholder="..@gmail.com hoặc (+84)..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Gửi
            </Button>
          </Form>
        ) : (
          <Form onSubmitCapture={handleSubmitOtp}>
            <h4 style={{ fontWeight: 400 }}>Nhập OTP:</h4>
            <Form.Item
              name="otp"
              rules={[
                {
                  required: true,
                  message: validateMessages.required.replace("${label}", "OTP"),
                },
              ]}
            >
              <Input
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Link onClick={handleBackToEmail} style={{ gap: "8px" }}>
              Quay lại
            </Link>
            <Button type="primary" htmlType="submit">
              Xác nhận OTP
            </Button>
          </Form>
        )}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
