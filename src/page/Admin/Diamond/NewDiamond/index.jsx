/* eslint-disable react/jsx-key */
import { Steps } from "antd";
import { BsImage } from "react-icons/bs";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdEditCalendar } from "react-icons/md";
import FormStep1 from "./FormStep1";
import "../NewDiamond/index.scss";
import FormStep2 from "./FormStep2";
import Success from "./Success";
import Confirm from "./Confirm";
import { PiEyesFill } from "react-icons/pi";

function NewDiamond() {
  const [form1, setForm1] = useState(null);
  const [form2, setForm2] = useState(null);
  const [current, setCurrent] = useState(0);
  const [combinedData, setCombinedData] = useState(null);

  const onFinishFormStep1 = (value) => {
    setForm1(value);
    setCurrent(1);
  };

  const onFinishFormStep2 = (value) => {
    setCombinedData({ ...form1, ...value });
    setForm2(value);
    setCurrent(2);
  };

  const handleFinishConfirm = (finalData) => {
    setCombinedData(finalData);
    setCurrent(3); // Move to success step
  };

  const createAnotherProduct = () => {
    setForm1(null);
    setForm2(null);
    setCurrent(0);
  };

  const isStepDisabled = (stepNumber) => {
    if (current === 3) return true;
    if (stepNumber === 1) return form1 === null;
    if (stepNumber === 2) return form1 === null || form2 === null;
    return false;
  };
  const getStepIconStyle = (stepIndex) => {
    if (stepIndex <= current) {
      return { color: "green" }; // All preceding steps turn blue
    } 
  };
  const items = [
    {
      title: <span style={{ fontWeight: "bold" }}>Bước 1</span>,
      icon: <BsImage style={getStepIconStyle(0)} size={30} />,
      description: (
        <span style={{ color: "gray", fontWeight: "bold" }}>
          Thông tin cơ bản
        </span>
      ),
      disabled: isStepDisabled(0),
    },
    {
      title: <span style={{ fontWeight: "bold" }}>Bước 2</span>,
      icon: <MdEditCalendar style={getStepIconStyle(1)} size={30} />,
      description: (
        <span style={{ color: "gray", fontWeight: "bold" }}>
          Thông tin chi tiết
        </span>
      ),
      disabled: isStepDisabled(1),
    },
    {
      title: <span style={{ fontWeight: "bold" }}>Bước 3</span>,
      icon: <PiEyesFill style={getStepIconStyle(2)} size={30} />,
      description: (
        <span style={{ color: "gray", fontWeight: "bold" }}>
          Xác Nhận Thông tin
        </span>
      ),
      disabled: isStepDisabled(2),
    },
    {
      title: <span style={{ fontWeight: "bold" }}>Thành công</span>,
      icon: <FaCheckCircle size={30} />,
      description: "", 
      disabled: true,
    },
  ];

  const forms = [
    <FormStep1 onFinish={onFinishFormStep1} initialValues={form1} />,
    <FormStep2 onFinish={onFinishFormStep2} initialValues={form2} />,
    <Confirm onFinish={handleFinishConfirm} combinedData={combinedData} />,
    <Success
      productName={form1?.diamond_name}
      productId={form1?.diamond_id}
      onCreateAnother={createAnotherProduct}
    />,
    <></>,
  ];

  return (
    <div style={{ minHeight: "500px" }}>
      <div>
        <h2 style={{ textAlign: "center", fontSize: "30px" }}>Tạo Kim Cương</h2>
      </div>
      <div>
        <Steps
          current={current}
          onChange={setCurrent}
          items={items}
          style={{ padding: "32px 150px" }}
          size="small" // Đặt size là small để không có nút chọn trực tiếp
        />
      </div>
      <div>{forms[current]}</div>
    </div>
  );
}

export default NewDiamond;
