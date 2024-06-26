/* eslint-disable react/jsx-key */
import { Steps } from "antd";
import { BsImage } from "react-icons/bs";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { PiEyesFill } from "react-icons/pi";
import Step1 from "./Step1";
import XacNhan from "./XacNhan";
import Success from "./Success";

function NewAccount() {
  const [form, setForm] = useState(null);
  const [current, setCurrent] = useState(0);
  const [combinedData, setCombinedData] = useState(null);

  const onFinishFormStep = (value) => {
    setForm(value);
    setCurrent(1);
  };

  const handleFinishConfirm = (finalData) => {
    setCombinedData(finalData);
    setCurrent(2); // Move to success step
  };

  const createAnotherUser = () => {
    setForm(null);
    setCurrent(0);
  };

  const isStepDisabled = (stepNumber) => {
    if (current === 2) return true;
    if (stepNumber === 1) return form === null;
    return false;
  };

  const items = [
    {
      title: <span style={{ fontWeight: "bold" }}>Bước 1</span>,
      icon: <BsImage size={30} />,
      description: (
        <span style={{ color: "gray", fontWeight: "bold" }}>Thông tin</span>
      ),
      disabled: isStepDisabled(0),
    },
    {
      title: <span style={{ fontWeight: "bold" }}>Bước 3</span>,
      icon: <PiEyesFill size={30} />,
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
      description: "", // No description needed here
      disabled: true,
    },
  ];

  const forms = [
    <Step1 onFinish={onFinishFormStep} initialValues={form} />,
    <XacNhan onFinish={handleFinishConfirm} combinedData={combinedData} />,
    <Success
      email={form?.email}
      password={form?.password}
      onCreateAnother={createAnotherUser}
    />,
    <></>,
  ];

  return (
    <div style={{ minHeight: "500px" }}>
      <div>
        <h2 style={{ textAlign: "center", fontSize: "30px" }}>Tạo Tài Khoản</h2>
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

export default NewAccount;
