/* eslint-disable react/jsx-key */
import { Steps } from "antd";
import { BsImage } from "react-icons/bs";
import { useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdEditCalendar } from "react-icons/md";
import "./indexx.scss";
import FormProductStep2 from "./FormStep2";
import Success from "./Success";
import FormProductStep1 from "./FormStep1";
import { PiEyesFill } from "react-icons/pi";
import Confirm from "./Confirm";

function NewProduct() {
  const [form1, setForm1] = useState(null);
  const [form2, setForm2] = useState(null);
  const [current, setCurrent] = useState(0);
  const [combinedData, setCombinedData] = useState(null);

  const onFinishFormStep1 = (value) => {
    setCombinedData({ ...combinedData, ...value });
    setForm1(value);
    setCurrent(1);
  };

  const onFinishFormStep2 = (value) => {
    setCombinedData({ ...form1, ...value });
    setForm2(value);
    setCurrent(2);
  };
  const handleFinishConfirm = ({ form1Data, form2Data }) => {
    setForm1(form1Data);
    setForm2(form2Data);
    setCurrent(3); // Chuyển sang bước thành công sau khi xác nhận
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
      title: "Bước 3",
      icon: <PiEyesFill size={30} />,
      description: "Xác Nhận Thông tin",
      disabled: isStepDisabled(2),
    },
    {
      title: "Thành công",
      icon: <FaRegCircleCheck size={30} />,
      disabled: true,
    },
  ];

  const forms = [
    <FormProductStep1 onFinish={onFinishFormStep1} initialValues={form1} />,
    <FormProductStep2 onFinish={onFinishFormStep2} initialValues={form2} />,
    <Confirm onFinish={handleFinishConfirm} combinedData={combinedData} />,
    <Success
      productName={form1?.productName}
      productId={form1?.productID}
      onCreateAnother={createAnotherProduct}
    />,
    <></>,
  ];

  return (
    <div style={{ minHeight: "500px" }}>
      <div>
        <h2 style={{ textAlign: "center", fontSize: "30px" }}>Tạo Sản Phẩm</h2>
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

export default NewProduct;
