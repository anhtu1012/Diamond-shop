/* eslint-disable react/prop-types */
import { Button, Result } from "antd";

const Success = ({ email, onCreateAnother }) => (
  <Result
    status="success"
    title="Bạn đã tạo mới tài khoản thành công"
    subTitle={`Email: ${email}`}
    extra={[
      <Button type="primary" key="console">
        Kết Thúc
      </Button>,
      <Button key="buy" onClick={onCreateAnother}>
        Tạo Tiếp
      </Button>,
    ]}
  />
);

export default Success;
