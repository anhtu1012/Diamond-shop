import { Button, Col, Result, Row } from "antd";
import { Link } from "react-router-dom";
import "./index.scss";
const NotFound = () => (
  <Row className="N404">
    <Col span={24}>
      <Result
        status="404"
        title="404"
        subTitle="Xin lỗi , Chúng tôi không tìm thấy."
        extra={
          <Link to="/">
            <Button type="primary">Quay Lại</Button>
          </Link>
        }
      />
    </Col>
  </Row>
);
export default NotFound;
