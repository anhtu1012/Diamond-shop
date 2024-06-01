/* eslint-disable react/prop-types */
import { Button, Col, Form, Input, Radio, Row } from "antd";
import "./index.scss";
import { useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { FcGoogle } from "react-icons/fc";
import { FaSquareFacebook } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../../services/Uservices";
function LoginPage({ setUser, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const switchToSignUp = () => {
    setIsLogin(false);
    form.resetFields();
  };

  const switchToSignIn = () => {
    setIsLogin(true);
    form.resetFields();
  };
  const [form] = useForm();
  function handleOK() {
    form.submit();
  }

  const navigate = useNavigate(); // Hook useNavigate
  // Updated handleLogin function
  const handleLogin = async (values) => {
    try {
      const res = await loginApi(values.email, values.password);
      console.log(res.data.message);
      const usertoken = res.data.token; // Lấy token từ response

      localStorage.setItem("token", usertoken);
      // Tách JWT thành các phần và giải mã payload
      const base64Url = usertoken.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(window.atob(base64));
      setUser(payload);
      onLoginSuccess(); // Gọi hàm onLoginSuccess để tắt modal
      setTimeout(() => {
        if (payload.role[0].authority === "ROLE_ADMIN") {
          navigate("/admin-page");
        }
        if (payload.role[0].authority === "ROLE_STAFF") {
          console.log("/staff-page");
        }
        if (payload.role[0].authority === "ROLE_USER") {
          console.log("/");
        }
      }, 1000);
    } catch (error) {
      // Kiểm tra xem response có tồn tại hay không và in ra message lỗi
      if (error.response) {
        console.error("Sai nè:", error.response.data.message);
      } else {
        console.error("An error occurred during login:", error);
      }
    }
  };
  return (
    <div className={isLogin ? "container" : "container active"}>
      {/* Phần mô tả có thể dựa trên trạng thái đăng nhập hoặc đăng ký */}
      <Row>
        <Col span={12} className="col_img" xs={0} sm={0} md={0} lg={12} xl={12}>
          <div className="item">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/DiamonLogin.png?alt=media&token=0ca9fb28-da90-4da0-a437-2301d33a763e"
              alt=""
              width={480}
              height={561}
            />
          </div>
        </Col>
        <Col span={12} xs={24} sm={24} md={24} lg={12} xl={12}>
          <div className="login_section">
            {isLogin ? (
              <div className="form_box login">
                <h2 className="login_titel">ĐĂNG NHẬP</h2>
                <Form
                  labelCol={{
                    span: 24,
                  }}
                  form={form}
                  className="login_form"
                  onFinish={handleLogin}
                >
                  <Form.Item
                    name={"email"}
                    rules={[
                      {
                        type: "email",
                        message: "The input is not valid E-mail!",
                      },
                      {
                        required: true,
                        message: "Please input your E-mail!",
                      },
                    ]}
                  >
                    <Input className="input" placeholder="Email..." />
                  </Form.Item>
                  <Form.Item
                    name={"password"}
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      className="input"
                      placeholder="Password..."
                    />
                  </Form.Item>
                  <Form.Item>
                    <Row align="middle">
                      <Col span={12} style={{ textAlign: "left" }}>
                        <Link to="/">Quên mật khẩu</Link>
                      </Col>
                      <Col span={12} style={{ textAlign: "right" }}>
                        <Form.Item
                          name="remember"
                          valuePropName="checked"
                          noStyle
                        >
                          <Radio>Ghi nhớ tài khoản</Radio>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                </Form>

                <Button
                  type="primary"
                  className="login_button"
                  onClick={handleOK}
                >
                  Đăng Nhập
                </Button>
                <div className="login_or">
                  <h2> -------------------- Hoặc ------------------</h2>
                </div>
                <Row gutter={6} className="login_socicals">
                  <Col span={12} xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Button className="login_social">
                      <FcGoogle />
                      Google
                    </Button>
                  </Col>
                  <Col span={12} xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Button className="login_social">
                      <FaSquareFacebook color="blue" />
                      Facebook
                    </Button>
                  </Col>
                </Row>
              </div>
            ) : (
              <div className="form_box register">
                <div className="form_box login">
                  <h2 className="login_titel">ĐĂNG KÝ</h2>
                  <Form
                    labelCol={{
                      span: 24,
                    }}
                    form={form}
                    className="login_form"
                    onFinish={handleLogin}
                  >
                    <Form.Item
                      name={"email"}
                      rules={[
                        {
                          type: "email",
                          message: "The input is not valid E-mail!",
                        },
                        {
                          required: true,
                          message: "Please input your E-mail!",
                        },
                      ]}
                    >
                      <Input className="input" placeholder="Email..." />
                    </Form.Item>
                    <Form.Item
                      name={"password"}
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                        {
                          pattern: new RegExp("^(?=.*[A-Za-z])(?=.*\\d).{8,}$"),
                          message:
                            "Mật khẩu phải dài ít nhất 8 ký tự và bao gồm ít nhất một chữ số và một chữ cái.",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input.Password
                        className="input"
                        placeholder=" Password..."
                      />
                    </Form.Item>
                    <Form.Item
                      name={"confirmPassword"}
                      dependencies={["password"]}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "The new password that you entered do not match!"
                              )
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        className="input"
                        placeholder="Confirm Password ..."
                      />
                    </Form.Item>
                  </Form>
                  <Button
                    type="primary"
                    className="login_button"
                    onClick={handleOK}
                  >
                    Đăng Ký
                  </Button>
                  <div className="login_or">
                    <h2> -------------------- Hoặc ------------------</h2>
                  </div>
                  <Row gutter={6} className="login_socicals">
                    <Col span={12} xs={24} sm={24} md={24} lg={12} xl={12}>
                      <Button className="login_social">
                        <FcGoogle />
                        Google
                      </Button>
                    </Col>
                    <Col span={12} xs={24} sm={24} md={24} lg={12} xl={12}>
                      <Button className="login_social">
                        <FaSquareFacebook color="blue" />
                        Facebook
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            )}
            <div className="link">
              {isLogin ? (
                <span>
                  Bạn mới biết đến Diamond ?{" "}
                  <a href="#" onClick={switchToSignUp} className="switch_link">
                    Đăng kí
                  </a>
                </span>
              ) : (
                <span>
                  Bạn đã có tài khoản Diamond ?{" "}
                  <a href="#" onClick={switchToSignIn} className="switch_link">
                    Đăng Nhập
                  </a>
                </span>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default LoginPage;
