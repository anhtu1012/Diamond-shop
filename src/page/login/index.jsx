import { Col, Row } from "antd";
import { useEffect } from "react";
import Login from "../../components/login";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { selectUser, login } from "../../redux/features/counterSlice";
function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log(user);
  const handleLoginSuccess = (user) => {
    dispatch(login(user));
  };

  useEffect(() => {
    if (user) {
      switch (user.role[0].authority) {
        case "ROLE_ADMIN":
          navigate("/admin-page");
          break;
        case "ROLE_STAFF":
          navigate("/staff-page");
          console.log(user.role[0].authority);
          break;
        case "ROLE_DELIVERY":
          navigate("/delivery-page");
          break;
        case "ROLE_USER":
          navigate("/");
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
          <Login onLoginSuccess={handleLoginSuccess} />
        </Col>
      </Row>
    </div>
  );
}

export default LoginPage;
