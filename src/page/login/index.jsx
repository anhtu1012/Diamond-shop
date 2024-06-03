/* eslint-disable react/prop-types */
import {
  Button,
  Col,
  Form,
  Input,
  Radio,
  Row,
  message,
  notification,
} from "antd";
import "./index.scss";
import { useState, useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import { FcGoogle } from "react-icons/fc";
import { FaSquareFacebook } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../../services/Uservices";

function LoginPage({ setUser, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form] = useForm();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const switchToSignUp = () => {
    setIsLogin(false);
    form.resetFields();
  };

  const switchToSignIn = () => {
    setIsLogin(true);
    form.resetFields();
  };

  useEffect(() => {
    loadReCaptchaScript();
  }, []);

  const loadReCaptchaScript = () => {
    const existingScript = document.getElementById("recaptcha-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js";
      script.async = true;
      script.defer = true;
      script.id = "recaptcha-script";
      document.body.appendChild(script);
    }
  };

  const handleOK = () => {
    if (validateCaptcha()) {
      handleLogin(form.getFieldsValue());
    }
  };

  const handleLogin = async (values) => {
    const recaptchaResponse = window.grecaptcha.getResponse();
    if (!recaptchaResponse) {
      notification.error({
        message: "Xác Thực",
        description: "Vui lòng xác nhận bạn không phải là Robot",
      });
      return;
    }

    try {
      const res = await loginApi(
        values.email,
        values.password,
        recaptchaResponse
      );
      console.log(res.data.message);
      const usertoken = res.data.token;

      localStorage.setItem("token", usertoken);
      const base64Url = usertoken.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(window.atob(base64));
      setUser(payload);
      onLoginSuccess();

      // Reset captcha
      window.grecaptcha.reset();

      setLoginError("");

      setTimeout(() => {
        if (payload.role[0].authority === "ROLE_ADMIN") {
          navigate("/admin-page");
          message.success("Chào mừng bạn đến Admin");
        } else if (payload.role[0].authority === "ROLE_STAFF") {
          console.log("/staff-page");
          message.success("Chào mừng bạn đến Staff");
        } else if (payload.role[0].authority === "ROLE_DELIVERY") {
          console.log("/delivery-page");
          message.success("Chào mừng bạn đến DELIVERY");
        } else if (payload.role[0].authority === "ROLE_USER") {
          console.log("/");
          message.success("Chào mừng bạn đến DIAMOND KING");
        }
      }, 1000);
    } catch (error) {
      if (error.response) {
        setLoginError(error.response.data.message);
        notification.error({
          message: "Đăng Nhập không thành công",
          description: error.response.data.message,
        });
      } else {
        notification.error({
          message: "Đăng Nhập không thành công",
          description: "Đã xảy ra lỗi trong quá trình đăng nhập",
        });
      }
      window.grecaptcha.reset();
    }
  };

  const validateCaptcha = () => {
    const recaptchaResponse = window.grecaptcha.getResponse();
    if (recaptchaResponse) {
      notification.success({
        message: "Thành công",
        description: "Bạn đã xác minh hình ảnh xác thực thành công.",
      });
      return true;
    } else {
      notification.error({
        message: "Xác Thực",
        description: "Vui lòng xác nhận bạn không phải là Robot",
      });
      return false;
    }
  };

  return (
    <div className={isLogin ? "container" : "container active"}>
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
                  labelCol={{ span: 24 }}
                  form={form}
                  className="login_form"
                  onFinish={handleLogin}
                >
                  <Form.Item
                    name={"email"}
                    rules={[
                      {
                        type: "email",
                        message: "E-mail! không hợp lệ",
                      },
                      { required: true, message: "Vui lòng nhập E-mail!" },
                    ]}
                    validateStatus={loginError ? "error" : ""}
                  >
                    <Input className="input" placeholder="Email..." />
                  </Form.Item>
                  <Form.Item
                    name={"password"}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu!",
                      },
                    ]}
                    validateStatus={loginError ? "error" : ""}
                    help={loginError}
                  >
                    <Input.Password
                      className="input"
                      placeholder="Mật khẩu..."
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
                  <Form.Item>
                    <div
                      className="g-recaptcha"
                      data-sitekey="6LciZqApAAAAAOULYxe_lEOrY7dQ47gjli-TpYBo"
                      style={{ display: "flex", justifyContent: "center" }}
                    ></div>
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
                    labelCol={{ span: 24 }}
                    form={form}
                    className="login_form"
                    onFinish={handleLogin}
                  >
                    <Form.Item
                      name={"email"}
                      rules={[
                        {
                          type: "email",
                          message: "E-mail! không hợp lệ!!!",
                        },
                        {
                          required: true,
                          message: "Vui lòng nhập E-mail!",
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
                          message: "Vui lòng nhập mật khẩu!",
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
                        placeholder="Mật khẩu..."
                      />
                    </Form.Item>
                    <Form.Item
                      name={"confirmPassword"}
                      dependencies={["password"]}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Nhập lại mật khẩu!!!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
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
                    <Form.Item>
                      <div
                        className="g-recaptcha"
                        data-sitekey="6LciZqApAAAAAOULYxe_lEOrY7dQ47gjli-TpYBo"
                        style={{ display: "flex", justifyContent: "center" }}
                      ></div>
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
                  Bạn mới biết đến Diamond?{" "}
                  <a href="#" onClick={switchToSignUp} className="switch_link">
                    Đăng kí
                  </a>
                </span>
              ) : (
                <span>
                  Bạn đã có tài khoản Diamond?{" "}
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
