import { useState } from "react";

import { Button, Table, Tag } from "antd";

import { Link } from "react-router-dom";

const data = [
  {
    key: "1",
    odID: "OD123456",
    idcus: "US123456",
    email: "hai263672@gmail.com",
    date: "29-5-2024",
    quantity: "2",
    status: "Chờ xác nhận",
    infor: (
      <Link
        to={"/admin-page/don-hang/all/order-detail/OD123456"}
        style={{ color: "#e4bd7b", fontWeight: 600 }}
      >
        Xem chi tiết
      </Link>
    ),
  },
  {
    key: "2",
    odID: "OD123457",
    idcus: "US123457",
    email: "huy263672@gmail.com",
    date: "28-5-2024",
    quantity: "2",
    status: "Chờ thanh toán",
    infor: (
      <Link
        to={"/staff-page/don-hang/all/order-detail/OD123457"}
        style={{ color: "#e4bd7b", fontWeight: 600 }}
      >
        Xem chi tiết
      </Link>
    ),
  },
  {
    key: "3",
    odID: "OD123458",
    idcus: "US123458",
    email: "hhung263672@gmail.com",
    date: "30-5-2024",
    quantity: "2",
    status: "Chờ xác nhận",
    infor: (
      <Link
        to={"/staff-page/don-hang/all/order-detail/OD123458"}
        style={{ color: "#e4bd7b", fontWeight: 600 }}
      >
        Xem chi tiết
      </Link>
    ),
  },
  {
    key: "4",
    odID: "OD123459",
    idcus: "US123459",
    email: "hai263673@gmail.com",
    date: "6-5-2024",
    quantity: "2",
    status: "Đã giao",
    infor: (
      <Link
        to={"/staff-page/don-hang/all/order-detail/OD123459"}
        style={{ color: "#e4bd7b", fontWeight: 600 }}
      >
        Xem chi tiết
      </Link>
    ),
  },
  {
    key: "5",
    odID: "OD123460",
    idcus: "US123460",
    email: "hai263674@gmail.com",
    date: "5-5-2024",
    quantity: "2",
    status: "Đã hủy",
    infor: (
      <Link
        to={"/staff-page/don-hang/all/order-detail/OD123460"}
        style={{ color: "#e4bd7b", fontWeight: 600 }}
      >
        Xem chi tiết
      </Link>
    ),
  },
  {
    key: "6",
    odID: "OD123461",
    idcus: "US123461",
    email: "hai263675@gmail.com",
    date: "4-5-2024",
    quantity: "2",
    status: "Đã giao",
    infor: (
      <Link
        to={"/staff-page/don-hang/all/order-detail/OD123461"}
        style={{ color: "#e4bd7b", fontWeight: 600 }}
      >
        Xem chi tiết
      </Link>
    ),
  },
  {
    key: "7",
    odID: "OD123462",
    idcus: "US123462",
    email: "hai263676@gmail.com",
    date: "3-5-2024",
    quantity: "2",
    status: "Đã hủy",
    infor: (
      <Link
        to={"/staff-page/don-hang/all/order-detail/OD123462"}
        style={{ color: "#e4bd7b", fontWeight: 600 }}
      >
        Xem chi tiết
      </Link>
    ),
  },
  {
    key: "8",
    odID: "OD123463",
    idcus: "US123463",
    email: "hai263677@gmail.com",
    date: "2-5-2024",
    quantity: "2",
    status: "Đã giao",
    infor: (
      <Link
        to={"/staff-page/don-hang/all/order-detail/OD123463"}
        style={{ color: "#e4bd7b", fontWeight: 600 }}
      >
        Xem chi tiết
      </Link>
    ),
  },
  {
    key: "9",
    odID: "OD123463",
    idcus: "US123463",
    email: "hai263677@gmail.com",
    date: "3-4-2024",
    quantity: "4",
    status: "Chờ giao hàng",
    infor: (
      <Link
        to={"/staff-page/don-hang/all/order-detail/OD123463"}
        style={{ color: "#e4bd7b", fontWeight: 600 }}
      >
        Xem chi tiết
      </Link>
    ),
  },
  {
    key: "10",
    odID: "OD123463",
    idcus: "US123463",
    email: "263677@gmail.com",
    date: "3-3-2024",
    quantity: "3",
    status: "Chờ thanh toán",
    infor: (
      <Link
        to={"/admin-page/don-hang/all/order-detail/OD123463"}
        style={{ color: "#e4bd7b", fontWeight: 600 }}
      >
        Xem chi tiết
      </Link>
    ),
  },
  {
    key: "11",
    odID: "OD123463",
    idcus: "US123463",
    email: "hai263677@gmail.com",
    date: "3-2-2024",
    quantity: "1",
    status: "Chờ xác nhận",
    infor: (
      <Link
        to={"/admin-page/don-hang/all/order-detail/OD123463"}
        style={{ color: "#e4bd7b", fontWeight: 600 }}
      >
        Xem chi tiết
      </Link>
    ),
  },
];

const statusToStep = {
  "Chờ xác nhận": 0,
  "Chờ thanh toán": 0,
  "Chờ giao hàng": 1,
  "Đang giao": 1,
  "Đã giao": 2,
  "Đã hủy": 3,
};

const getStatusColor = (currentStep) => {
  switch (currentStep) {
    case 0:
      return "#FFD700"; // Yellow
    case 1:
      return "#33CC33"; // Green
    case 2:
      return "#008000"; // Dark Green
    case 3:
      return "#FF0000"; // Red
    default:
      return "#FFD700"; // Default Yellow
  }
};

function AllOrder() {
  const [filterStatus, setFilterStatus] = useState("Chờ xác nhận");

  const handleStatusClick = (status) => {
    setFilterStatus(status);
  };

  const filteredData = filterStatus
    ? data.filter((item) => item.status === filterStatus)
    : data;

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "odID",
      key: "odID",
      width: "15%",
    },
    {
      title: "ID Khách Hàng",
      dataIndex: "idcus",
      key: "idcus",
      width: "10%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "date",
      key: "date",
      width: "15%",
      sorter: (a, b) =>
        new Date(a.date.split("-").reverse().join("-")) -
        new Date(b.date.split("-").reverse().join("-")),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Số lượng sản phẩm",
      dataIndex: "quantity",
      key: "quantity",
      width: "10%",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (text) => {
        const currentStep = statusToStep[text];
        return (
          <Tag
            color={getStatusColor(currentStep)}
            key={text}
            style={{ fontWeight: "bold" }}
          >
            {text.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      dataIndex: "infor",
      key: "infor",
      width: "15%",
    },
  ];

  const statusButtons = [
    "Chờ xác nhận",
    "Chờ thanh toán",
    "Chờ giao hàng",
    "Đã giao",
    "Đã hủy",
  ].map((status) => (
    <Button
      key={status}
      type={filterStatus === status ? "primary" : "default"}
      onClick={() => handleStatusClick(status)}
      style={{
        fontWeight: "bold",
        color: "white",
        marginRight: 5,
        textTransform: "uppercase",
        backgroundColor: getStatusColor(statusToStep[status]),
      }}
    >
      {status}
    </Button>
  ));

  statusButtons.push(
    <Button
      key="all"
      type={filterStatus === null ? "primary" : "default"}
      onClick={() => handleStatusClick(null)}
      style={{
        fontWeight: "bold",
        marginRight: 5,
        color: "white",
        textTransform: "uppercase",
        backgroundColor: "black",
      }}
    >
      Tất cả sản phẩm
    </Button>
  );

  return (
    <div className="all-order">
      <div style={{ marginBottom: 16 }}>{statusButtons}</div>
      <Table className="table" columns={columns} dataSource={filteredData} />
    </div>
  );
}
export default AllOrder;
