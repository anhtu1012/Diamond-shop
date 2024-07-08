import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, notification } from "antd";
import "./index.scss";
import { forgetPassword } from "../../../services/Uservices";

const validateMessages = {
  required: "${label} không được để trống",
  types: {
    email: "Vui lòng điền đúng định dạng Email!",
    phone: "Vui lòng điền đúng định dạng Số Điện Thoại!",
  },
};

const ForgotPassword = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);

  const handleCredentialChange = (e) => {
    setEmailOrPhone(e.target.value);
  };

  const handleSubmitCredential = async () => {
    console.log("Credential:", emailOrPhone);
    await handleForgetPassword(emailOrPhone);
    setStep(2);
  };

  const handleBackToCredential = () => {
    setStep(1);
    setEmailOrPhone("");
    setOtp("");
    setMessage("");
  };

  const handleForgetPassword = async (value) => {
    try {
      await forgetPassword({ emailOrPhone: value });
    } catch (error) {
      console.error("Error forgetting password:", error);
    }
  };

  const handleSubmitOtp = async (values) => {
    console.log("OTP:", values.otp);
    notification.info({
      message: "Vui lòng xem Email hoặc SĐT để nhận mã OTP",
      duration: null,
    });
    setStep(3);
  };
  // const handleResetPassword = async () => {
  //   if (newPassword !== confirmPassword) {
  //     setMessage("Mật khẩu xác nhận không trùng khớp");
  //     return;
  //   }
  //   try {
  //     // Gọi API để đặt lại mật khẩu mới
  //     // Sử dụng newPassword và emailOrPhone để đặt lại mật khẩu
  //     // Lưu ý: Cần truyền đúng định dạng của dữ liệu được yêu cầu bởi API
  //     await resetPassword({ emailOrPhone, newPassword });
  //     setMessage("Mật khẩu đã được đặt lại thành công!");
  //   } catch (error) {
  //     console.error("Error resetting password:", error);
  //     setMessage("Đã xảy ra lỗi khi đặt lại mật khẩu.");
  //   }
  // };

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
        <h2 style={{ fontWeight: "bold" }}>Quên Mật Khẩu</h2>
        {step === 1 ? (
          <Form onFinish={handleSubmitCredential}>
            <h4 style={{ fontWeight: 400 }}>Nhập Email hoặc SĐT:</h4>
            <Form.Item
              name="emailOrPhone"
              rules={[
                {
                  required: true,
                  message: validateMessages.required.replace(
                    "${label}",
                    "Email hoặc SĐT"
                  ),
                },
                {
                  validator: (_, value) => {
                    // Check if the value is either an email or a phone number
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    const phoneRegex = /^\d{10,11}$/;
                    if (!emailRegex.test(value) && !phoneRegex.test(value)) {
                      return Promise.reject(
                        "Vui lòng nhập đúng định dạng Email hoặc Số Điện Thoại!"
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                placeholder="Nhập Email hoặc SĐT"
                value={emailOrPhone}
                onChange={handleCredentialChange}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Gửi
            </Button>
          </Form>
        ) : step === 2 ? (
          <Form onFinish={handleSubmitOtp}>
            <h4 style={{ fontWeight: 600, paddingBottom: "10px" }}>
              Nhập OTP:
            </h4>

            <Form.Item
              name="otp"
              rules={[
                {
                  required: true,
                  message: validateMessages.required.replace("${label}", "OTP"),
                },
              ]}
              hasFeedback
              validateStatus="success"
            >
              <Input.OTP
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Link
              onClick={handleBackToCredential}
              style={{ gap: "8px", color: "red" }}
            >
              Quay lại
            </Link>
            <Button type="primary" htmlType="submit">
              Xác nhận OTP
            </Button>
          </Form>
        ) : (
          <Form>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                {
                  pattern: new RegExp("^(?=.*[A-Za-z])(?=.*\\d).{8,}$"),
                  message:
                    "Mật khẩu phải dài ít nhất 8 ký tự và bao gồm ít nhất một chữ số và một chữ cái.",
                },
              ]}
              hasFeedback
            >
              <Input.Password className="input" placeholder="Mật khẩu mới..." />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Nhập lại mật khẩu!!!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu không hợp lệ!"));
                  },
                }),
              ]}
            >
              <Input.Password
                className="input"
                placeholder="Xác nhận lại mật khẩu..."
              />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Đặt lại mật khẩu
            </Button>
          </Form>
        )}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
