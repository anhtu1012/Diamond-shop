import { useEffect, useState } from "react";

import { Button, Table, Tag } from "antd";

import { Link } from "react-router-dom";
import { getNewOrder } from "../../../../services/Uservices";
import LoadingTruck from "../../../components/loading";

const statusToStep = {
  "Đơn đang nhận giao": 1,

  "Đã giao": 2,
};

const getStatusColor = (currentStep) => {
  switch (currentStep) {
    case 1:
      return "#33CC33"; // Green
    case 2:
      return "#008000"; // Dark Green

    default:
      return "#FFD700"; // Default Yellow
  }
};
function CapNhatDon() {
  const [filterStatus, setFilterStatus] = useState("Đơn đang nhận giao");
  const [dataSource, seDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNewOrder  = async () => {
    setLoading(true);
    const res = await getNewOrder ();
    seDataSource(res.data);
    console.log(dataSource);
    setLoading(false);
  };

  useEffect(() => {
    fetchNewOrder();
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
      width: "10%",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "fullName",
      key: "fullName",
      width: "15%",
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
      width: "15%",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "10%",
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
          {record.status === "Đơn đang nhận giao" ? (
            <Link
              to={`/delivery-page/chi-tiet-don-hang/${record.orderID}`}
              style={{ fontWeight: "bold" }}
            >
              Xem chi tiết
            </Link>
          ) : (
            <Link
              to={`/delivery-page/don-hang/order-detail/${record.orderID}`}
              style={{ fontWeight: "bold" }}
            >
              Xem chi tiết
            </Link>
          )}
        </div>
      ),
    },
  ];

  const statusButtons = ["Đơn đang nhận giao", "Đã giao"].map((status) => (
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

export default CapNhatDon;
