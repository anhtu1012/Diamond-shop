/* eslint-disable react/jsx-key */
import { Steps } from "antd";
import { BsImage } from "react-icons/bs";
import { useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdEditCalendar } from "react-icons/md";
import FormStep1 from "./FormStep1";
import "./index.scss";
import FormStep2 from "./FormStep2";
import Success from "./Success";

function NewDiamond() {
  const [form1, setForm1] = useState(null);
  const [form2, setForm2] = useState(null);
  const [current, setCurrent] = useState(0);

  const onFinishFormStep1 = (value) => {
    setForm1(value);
    setCurrent(1);
  };

  const onFinishFormStep2 = (value) => {
    const combinedData = { ...form1, ...value };
    console.log("Combined Data:", combinedData);
    setForm2(value);
    setCurrent(2);
  };

  const createAnotherProduct = () => {
    setForm1(null);
    setForm2(null);
    setCurrent(0);
  };

  const isStepDisabled = (stepNumber) => {
    if (current === 2) return true;
    if (stepNumber === 1) return form1 === null;
    if (stepNumber === 2) return form1 === null || form2 === null;
    return false;
  };

  const items = [
    {
      title: "Bước 1",
      icon: <BsImage size={30} />,
      description: "Thông tin cơ bản",
      disabled: isStepDisabled(0),
    },
    {
      title: "Bước 2",
      icon: <MdEditCalendar size={30} />,
      description: "Thông tin chi tiết",
      disabled: isStepDisabled(1),
    },
    {
      title: "Thành công",
      icon: <FaRegCircleCheck size={30} />,
      disabled: isStepDisabled(2),
    },
  ];

  const forms = [
    <FormStep1 onFinish={onFinishFormStep1} initialValues={form1} />, // Giả sử bạn cũng có hàm onBackFromStep1
    <FormStep2 onFinish={onFinishFormStep2} initialValues={form2} />,
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
        />
      </div>
      <div>{forms[current]}</div>
    </div>
  );
}

export default NewDiamond;
