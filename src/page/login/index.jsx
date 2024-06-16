import { Col, Row, message } from "antd";
import { useEffect } from "react";
import Login from "../../components/login";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { selectUser } from "../../redux/features/counterSlice";
function LoginPage() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  console.log(user);

  useEffect(() => {
    if (user) {
      switch (user.role[0].authority) {
        case "ROLE_ADMIN":
          navigate("/admin-page");
          message.success("Chào mừng bạn đến Admin");
          break;
        case "ROLE_STAFF":
          navigate("/staff-page");
          message.success("Chào mừng bạn đến Staff");
          break;
        case "ROLE_DELIVERY":
          navigate("/delivery-page");
          message.success("Chào mừng bạn đến DELIVERY");
          break;
        case "ROLE_USER":
          navigate("/");
          message.success("Chào mừng bạn đến DIAMOND KING");
          break;
        default:
          break;
      }
    }
  }, [user, navigate]);

  return (
    <div className="container-fluidd">
      <Row>
        <Col span={24}>
          <Login />
        </Col>
      </Row>
    </div>
  );
}

export default LoginPage;
