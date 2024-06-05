import { useEffect, useState } from "react";
import { Form, Input, Button, message, theme, Select } from "antd";
import { useParams } from "react-router-dom";
import "./index.scss";
import { Content } from "antd/es/layout/layout";

const data = [
  {
    key: "1",
    id: "US123457",
    name: "Nguyễn Văn A",
    email: "a@gmail.com",
    date: "29-5-2024",
    phone: "0123456789",
    role: "Người dùng",
    address: "Tp Hồ chí Minh",
  },
  {
    key: "2",
    id: "US123457",
    name: "Nguyễn Văn B",
    email: "b@gmail.com",
    date: "28-5-2024",
    phone: "0684981532",
    role: "Người dùng",
    address: "Tp Hồ chí Minh",
  },
  {
    key: "3",
    id: "ST123457",
    name: "Nguyễn Văn C",
    email: "c2@gmail.com",
    date: "30-5-2024",
    phone: "0984961522",
    role: "Nhân viên bán hàng",
    address: "Tp Hồ chí Minh",
  },
  {
    key: "4",
    id: "ST123457",
    name: "Nguyễn Văn D",
    email: "d@gmail.com",
    date: "6-5-2024",
    phone: "0215645644",
    role: "Nhân viên bán hàng",
    address: "Tp Hồ chí Minh",
  },
  {
    key: "5",
    id: "STD123457",
    name: "Nguyễn Văn E",
    email: "e@gmail.com",
    date: "5-5-2024",
    phone: "0245449656",
    role: "Nhân viên giao hàng",
    address: "Tp Hồ chí Minh",
  },
  {
    key: "6",
    id: "STD123457",
    name: "Nguyễn Văn F",
    email: "f@gmail.com",
    date: "4-5-2024",
    phone: "0684613213",
    role: "Nhân viên giao hàng",
    address: "Tp Hồ chí Minh",
  },
  {
    key: "7",
    id: "ST123327",
    name: "Nguyễn Văn G",
    email: "g263676@gmail.com",
    date: "3-5-2024",
    phone: "0549515546",
    role: "Nhân viên bán hàng",
    address: "Tp Hồ chí Minh",
  },
  {
    key: "8",
    id: "US154457",
    name: "Nguyễn Văn H",
    email: "h@gmail.com",
    date: "2-5-2024",
    phone: "0246547892",
    role: "Người dùng",
    address: "Tp Hồ chí Minh",
  },
  {
    key: "9",
    id: "ST123787",
    name: "Nguyễn Văn J",
    email: "j@gmail.com",
    date: "3-4-2024",
    phone: "0184566911",
    role: "Nhân viên bán hàng",
    address: "Tp Hồ chí Minh",
  },
  {
    key: "10",
    id: "US129557",
    name: "Nguyễn Văn Q",
    email: "q@gmail.com",
    date: "3-3-2024",
    phone: "0213254581",
    role: "Người dùng",
    address: "Tp Hồ chí Minh",
  },
  {
    key: "11",
    id: "US15862",
    name: "Nguyễn Văn T",
    email: "tai263677@gmail.com",
    date: "3-2-2024",
    phone: "01321312312",
    role: "Người dùng",
    address: "Tp Hồ chí Minh",
  },
];

function ViewAccountDetail() {
  const { id } = useParams();
  const account = data.find((d) => d.id === id);

  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (account) {
      form.setFieldsValue({
        id: account.id,
        name: account.name,
        email: account.email,
        date: account.date,
        phone: account.phone,
        role: account.role,
        address: account.address,
      });
    }
  }, [account, form]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        // Update your backend with the new values
        console.log("Updated values: ", values);
        setIsEditing(false);
        message.success("Lưu thành công!");
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleDelete = () => {
    // Implement delete functionality here
    message.success("Xóa thành công");
  };

  if (!account) {
    return <div>Account not found</div>;
  }

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <div className="profile-account">
      <p style={{ fontWeight: "500", fontSize: "20px", marginBottom: "10px" }}>
        Thông tin chi tiết tài khoản
      </p>
      <div className="avatar-nabvar">
        <div className="nabvar-1">
          <Content>
            <div
              style={{
                padding: 16,
                minHeight: 50,
                background: "#CCC",
                borderRadius: 0,
              }}
            ></div>
          </Content>
        </div>
        <div className="nabvar-2">
          <Content>
            <div
              style={{
                padding: 16,
                minHeight: 50,
                marginBottom: "10px",
                background: "#EEE",
                borderRadius: borderRadiusLG,
              }}
            >
              <Form form={form} layout="vertical">
                <Form.Item
                  name="name"
                  label="Họ và Tên"
                  rules={[
                    { required: true, message: "Vui lòng không để trống" },
                  ]}
                >
                  <Input readOnly={!isEditing} />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Vui lòng không để trống" },
                  ]}
                >
                  <Input readOnly={!isEditing} />
                </Form.Item>
                <Form.Item
                  name="date"
                  label="Ngày tạo"
                  rules={[
                    { required: true, message: "Vui lòng không để trống" },
                  ]}
                >
                  <Input readOnly={!isEditing} />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label="Số điện thoại"
                  rules={[
                    { required: true, message: "Vui lòng không để trống" },
                  ]}
                >
                  <Input readOnly={!isEditing} />
                </Form.Item>
                <Form.Item
                  name="role"
                  label="Quyền hạn"
                  rules={[
                    { required: true, message: "Vui lòng không để trống" },
                  ]}
                >
                  {isEditing ? (
                    <Select
                      style={{ width: "100%" }}
                      defaultValue={account.role}
                    >
                      {[
                        "Người dùng",
                        "Nhân viên bán hàng",
                        "Nhân viên giao hàng",
                      ].map((role) => (
                        <Select.Option key={role} value={role}>
                          {role}
                        </Select.Option>
                      ))}
                    </Select>
                  ) : (
                    <Input
                      defaultValue={account.role}
                      readOnly
                      style={{ width: "100%" }}
                    />
                  )}
                </Form.Item>
                <Form.Item
                  name="address"
                  label="Địa chỉ"
                  rules={[
                    { required: true, message: "Vui lòng không để trống" },
                  ]}
                >
                  <Input readOnly={!isEditing} />
                </Form.Item>
                {isEditing ? (
                  <Button type="primary" onClick={handleSave}>
                    Lưu
                  </Button>
                ) : (
                  <Button type="primary" onClick={handleEdit}>
                    Chỉnh sửa
                  </Button>
                )}
                <Button
                  type="primary"
                  onClick={handleDelete}
                  style={{ marginLeft: "10px", background: "red" }}
                >
                  Xóa
                </Button>
              </Form>
            </div>
          </Content>
        </div>
      </div>
    </div>
  );
}

export default ViewAccountDetail;
