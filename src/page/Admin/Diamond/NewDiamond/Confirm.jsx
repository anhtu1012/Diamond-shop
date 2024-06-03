/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { Result, Button } from "antd";
import { FcReadingEbook } from "react-icons/fc";

function Confirm({ onFinish, combinedData }) {
  const handleConfirm = async () => {
    try {
      console.log(combinedData);
      onFinish(combinedData);
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
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
