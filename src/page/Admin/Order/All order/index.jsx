import { useEffect, useState } from "react";

import { Button, Table, Tag } from "antd";

import { Link } from "react-router-dom";

import { getAllOrder } from "../../../../../services/Uservices";
import LoadingTruck from "../../../../components/loading";

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
  const [dataSource, seDataSource] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const fetchAllOrder = async () => {
    setLoading(true);
    const res = await getAllOrder();
    seDataSource(res.data);
    console.log(dataSource);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllOrder();
  }, []);
  const handleStatusClick = (status) => {
    setFilterStatus(status);
  };

  const filteredData = filterStatus
    ? dataSource.filter((item) => item.status === filterStatus)
    : dataSource;

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderID",
      key: "orderID",
      width: "15%",
    },
    {
      title: "ID Khách Hàng",
      dataIndex: "fullName",
      key: "fullName",
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
      dataIndex: "orderDate",
      key: "orderDate",
      width: "15%",
      sorter: (a, b) => new Date(a.orderDate) - new Date(b.orderDate),
      sortDirections: ["descend", "ascend"],
      render: (text) =>
        new Date(text).toLocaleString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
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
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "10%",
      render: (text, record) => (
        <div style={{ textAlign: "center" }}>
          {record.status === "Chờ xác nhận" ? (
            <Link
              to={`/staff-page/chi-tiet-don-hang/${record.orderID}`}
              style={{ fontWeight: "bold" }}
            >
              Xem chi tiết
            </Link>
          ) : (
            <Link
              to={`/staff-page/don-hang/order-detail/${record.orderID}`}
              style={{ fontWeight: "bold" }}
            >
              Xem chi tiết
            </Link>
          )}
        </div>
      ),
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
      {loading ? (
        <LoadingTruck /> // Show LoadingTruck while loading
      ) : (
        <Table className="table" columns={columns} dataSource={filteredData} />
      )}
    </div>
  );
}
export default AllOrder;
