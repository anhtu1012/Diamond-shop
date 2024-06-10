/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { Result, Button, message } from "antd";
import { FcReadingEbook } from "react-icons/fc";
import uploadFile from "../../../../utils/upload";
import moment from "moment";
import { createDiamond } from "../../../../../services/Uservices";

function Confirm({ onFinish, combinedData }) {
  const handleConfirm = async () => {
    try {
      const file = combinedData.fileList[0].originFileObj;
      const imageUrl = await uploadFile(file);
      const formattedDate = moment(combinedData.inputDate).format("YYYY-MM-DD");
      const finalData = {
        diamondID: combinedData.diamondID,
        diamondName: combinedData.diamondName,
        carat: combinedData.carat,
        certificate: combinedData.certificate,
        clarify: combinedData.clarify,
        shape: combinedData.shape,
        color: combinedData.color,
        colorLevel: combinedData.colorLevel,
        cut: combinedData.cut,
        dimensions: combinedData.dimensions,
        flourescence: combinedData.flourescence,
        image: imageUrl,
        inputDate: formattedDate,
        originPrice: combinedData.originPrice,
        ratio: combinedData.ratio,
      };
      // Call the API to create the diamond
      await createDiamond(finalData);
      message.success("Tạo Kim Cương Thành Công!");
      console.log(finalData);
      onFinish(finalData);
    } catch (errorInfo) {
      console.log("Upload failed:", errorInfo);
    }
  };
  return (
    <div className="button_form_2">
      <Result
        icon={<FcReadingEbook size={200} />}
        title="Kiểm tra thông tin 1 lần nữa! Trước khi bấm xác nhận"
        extra={
          <Button type="primary" onClick={handleConfirm}>
            Xác nhận
          </Button>
        }
      />
    </div>
  );
}

export default Confirm;

// /* eslint-disable react/prop-types */
// /* eslint-disable react/jsx-key */
// import { Popconfirm, Result } from "antd";
// import { Button } from "antd"; // Thêm import này
// import { useState } from "react";
// import { FcReadingEbook } from "react-icons/fc";

// function Confirm({ onFinish, combinedData }) {
//   // Thêm form1 và form2 vào props
//   const [confirmVisible, setConfirmVisible] = useState(false);

//   const handleConfirm = async () => {
//     try {
//       console.log(combinedData);
//       onFinish(combinedData);
//       setConfirmVisible(false); // Ẩn popconfirm sau khi xác nhận
//     } catch (errorInfo) {
//       console.log("Validation failed:", errorInfo);
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       setConfirmVisible(true);
//     } catch (errorInfo) {
//       console.log("Validation failed:", errorInfo);
//     }
//   };

//   const handleCancel = () => {
//     setConfirmVisible(false);
//   };

//   return (
//     <div className="button_form_2">
//       <Popconfirm
//         title="Xác nhận"
//         description="Xác nhận lại thông tin!"
//         visible={confirmVisible}
//         onConfirm={handleConfirm}
//         onCancel={handleCancel}
//         okText="Yes"
//         cancelText="No"
//       >
//         <Result
//           icon={<FcReadingEbook size={200} />}
//           title="Kiểm tra thông tin 1 lần nữa! Trước khi bấm xác nhận"
//           extra={
//             <Button type="primary" onClick={handleSubmit}>
//               Xác nhận
//             </Button>
//           }
//         />
//       </Popconfirm>
//     </div>
//   );
// }

// export default Confirm;
