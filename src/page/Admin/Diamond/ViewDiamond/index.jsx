
import {  Table  } from "antd";
import { Link } from "react-router-dom";

const data = [
  {
    key: "1",
    id: "DM1",
    image: (
      <img
        src="https://jemmia.vn/wp-content/uploads/2023/09/image-3-1-1-1.png"
        style={{ width: "100px" }}
      />
    ),
    style: "Round",
    weight: "1.1",
    color: "F",
    purity: "FL",
    accreditation: "GIA",
    size: "6.0",
    price: "488.800.000 ₫",
    infor: <Link to={"/"}>Xem chi tiết</Link>,
  },
  {
    key: "2",
    id: "DM2",
    image: (
      <img
        src="https://jemmia.vn/wp-content/uploads/2023/09/image-3-1-1-1.png"
        style={{ width: "100px" }}
      />
    ),
    style: "Round",
    weight: "2.0",
    color: "D",
    purity: "VS2",
    accreditation: "GIA",
    size: "3.0",
    price: "488.800.000 ₫",
    infor: <Link to={"/"}>Xem chi tiết</Link>,
  },
  {
    key: "3",
    id: "DM3",
    image: (
      <img
        src="https://jemmia.vn/wp-content/uploads/2023/09/image-3-1-1-1.png"
        style={{ width: "100px" }}
      />
    ),
    style: "Round",
    weight: "1.0",
    color: "D",
    purity: "VVS1",
    accreditation: "GIA",
    size: "3.6",
    price: "488.800.000 ₫",
    infor: <Link to={"/"}>Xem chi tiết</Link>,
  },
  {
    key: "4",
    id: "DM4",
    image: (
      <img
        src="https://jemmia.vn/wp-content/uploads/2023/09/image-3-1-1-1.png"
        style={{ width: "100px" }}
      />
    ),
    style: "Round",
    weight: "1.0",
    color: "E",
    purity: "IF",
    accreditation: "GIA",
    size: "2.6",
    price: "48.800.000 ₫",
    infor: <Link to={"/"}>Xem chi tiết</Link>,
  },
  {
    key: "5",
    id: "DM5",
    image: (
      <img
        src="https://jemmia.vn/wp-content/uploads/2023/09/image-3-1-1-1.png"
        style={{ width: "100px" }}
      />
    ),
    style: "Round",
    weight: "1.0",
    color: "F",
    purity: "FL",
    accreditation: "GIA",
    size: "6.6",
    price: "88.800.000 ₫",
    infor: <Link to={"/"}>Xem chi tiết</Link>,
  },
  {
    key: "6",
    id: "DM6",
    image: (
      <img
        src="https://jemmia.vn/wp-content/uploads/2023/09/image-3-1-1-1.png"
        style={{ width: "100px" }}
      />
    ),
    style: "Round",
    weight: "1.0",
    color: "F",
    purity: "FL",
    accreditation: "GIA",
    size: "6.6",
    price: "88.800.000 ₫",
    infor: <Link to={"/"}>Xem chi tiết</Link>,
  },
  {
    key: "7",
    id: "DM7",
    image: (
      <img
        src="https://jemmia.vn/wp-content/uploads/2023/09/image-3-1-1-1.png"
        style={{ width: "100px" }}
      />
    ),
    style: "Round",
    weight: "1.0",
    color: "F",
    purity: "FL",
    accreditation: "GIA",
    size: "6.6",
    price: "68.800.000 ₫",
    infor: <Link to={"/"}>Xem chi tiết</Link>,
  },
  {
    key: "8",
    id: "DM8",
    image: (
      <img
        src="https://jemmia.vn/wp-content/uploads/2023/09/image-3-1-1-1.png"
        style={{ width: "100px" }}
      />
    ),
    style: "Round",
    weight: "1.5",
    color: "D",
    purity: "FL",
    accreditation: "GIA",
    size: "6.6",
    price: "58.800.000 ₫",
    infor: <Link to={"/"}>Xem chi tiết</Link>,
  },
  {
    key: "9",
    id: "DM9",
    image: (
      <img
        src="https://jemmia.vn/wp-content/uploads/2023/09/image-3-1-1-1.png"
        style={{ width: "100px" }}
      />
    ),
    style: "Round",
    weight: "1.0",
    color: "F",
    purity: "FL",
    accreditation: "GIA",
    size: "3.3",
    price: "58.800.000 ₫",
    infor: <Link to={"/"}>Xem chi tiết</Link>,
  },
  {
    key: "10",
    id: "DM10",
    image: (
      <img
        src="https://jemmia.vn/wp-content/uploads/2023/09/image-3-1-1-1.png"
        style={{ width: "100px" }}
      />
    ),
    style: "Round",
    weight: "1.0",
    color: "F",
    purity: "FL",
    accreditation: "GIA",
    size: "6.6",
    price: "488.800.000 ₫",
    infor: <Link to={"/"}>Xem chi tiết</Link>,
  },
  {
    key: "11",
    id: "DM11",
    image: (
      <img
        src="https://jemmia.vn/wp-content/uploads/2023/09/image-3-1-1-1.png"
        style={{ width: "100px" }}
      />
    ),
    style: "Round",
    weight: "1.0",
    color: "F",
    purity: "FL",
    accreditation: "GIA",
    size: "6.6",
    price: "488.800.000 ₫",
    infor: <Link to={"/"}>Xem chi tiết</Link>,
  },
];


function ViewDiamond() {
  
  const columns = [
    {
      title: "Mã số",
      dataIndex: "id",
      key: "id",
      width: "10%",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      width: "10%",
    },
    {
      title: "Hình dạng",
      dataIndex: "style",
      key: "style",
      width: "10%",
    },
    {
      title: "Trọng lương (cts)",
      dataIndex: "weight",
      key: "weight",
      width: "10%",
    },
    {
      title: "Cấp màu",
      dataIndex: "color",
      key: "color",
      width: "10%",
    },
    {
      title: "Độ tinh khiết",
      dataIndex: "purity",
      key: "purity",
      width: "10%",
    },
    {
      title: "Kiểm định",
      dataIndex: "accreditation",
      key: "accreditation",
      width: "10%",
    },
    {
      title: "Kích thước (mm)",
      dataIndex: "size",
      key: "size",
      width: "10%",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: "10%",
      sorter: (a, b) =>
        parseInt(a.price.replace(/\D/g, "")) -
        parseInt(b.price.replace(/\D/g, "")),
    },
    {
      dataIndex: "infor",
      key: "infor",
      width: "10%",
    },
  ];

  return (
    <div className="all-diamond">
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
    </div>
  );
}

export default ViewDiamond;
