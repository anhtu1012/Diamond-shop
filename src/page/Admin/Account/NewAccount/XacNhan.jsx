/* eslint-disable react/prop-types */
import { Button, Result, message } from "antd";
import uploadFile from "../../../../utils/upload";
import { FcReadingEbook } from "react-icons/fc";
import { createUser } from "../../../../../services/Uservices";

function XacNhan({ onFinish, combinedData }) {
  const handledXacNhan = async () => {
    try {
      const file = combinedData.fileList[0].originFileObj;
      const avata = await uploadFile(file);
      const finalData = {
        firstName: combinedData.firstName,
        lastName: combinedData.lastName,
        email: combinedData.email,
        password: combinedData.password,
        phone: combinedData.phone,
        address: combinedData.address,
        avata: avata,
        role: combinedData.role,
      };
      await createUser(finalData);
      message.success("Tạo tài khoản thành công! Vui lòng check Email.");
      console.log(finalData);
      onFinish(finalData);
    } catch (error) {
      message.error("Tạo tài khoản thất bại, vui lòng thử lại!");
      console.log("Upload failed:", error);
    }
  };

  return (
    <div>
      <div className="button_form_2">
        <Result
          icon={<FcReadingEbook size={200} />}
          title="Kiểm tra thông tin 1 lần nữa! Trước khi bấm xác nhận"
          extra={
            <Button type="primary" onClick={handledXacNhan}>
              Xác nhận
            </Button>
          }
        />
      </div>
    </div>
  );
}

export default XacNhan;
