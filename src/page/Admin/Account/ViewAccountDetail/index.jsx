import { Image } from "antd";
import "./index.scss";
import { Content } from "antd/es/layout/layout";

function ViewAccountDetail() {
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
                borderRadius: 0,
              }}
            ></div>
          </Content>
        </div>
        <div className="avata-user">
          <Image className="avata"
          style={{borderRadius: '50%', width: '80px'}}
            width={200}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
      </div>
    </div>
  );
}

export default ViewAccountDetail;
