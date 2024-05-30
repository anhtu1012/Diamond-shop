/* eslint-disable react/prop-types */
import { Button, Result } from "antd";

const Success = ({ productName, productPrice, onCreateAnother }) => (
  <Result
    status="success"
    title="Bạn đã tạo mới sản phẩm thành công"
    subTitle={`Tên Sản Phẩm: ${productName} - Giá: ${productPrice} vnđ. Cloud server configuration takes 1-5 minutes, please wait.`}
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
