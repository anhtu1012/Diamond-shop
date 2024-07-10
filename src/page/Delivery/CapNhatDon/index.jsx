import { useEffect, useState } from "react";
import { Button, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { getAllOrder } from "../../../../services/Uservices";
import LoadingTruck from "../../../components/loading";

const statusToStep = {
  "Chờ giao hàng": 1,
  "Không Thành Công": 2,
  "Đã giao": 3,
  "Đã hoàn tiền": 4,
};

const getStatusColor = (currentStep) => {
  switch (currentStep) {
    case 1:
      return "#33CC33"; // Green
    case 2:
      return "#FFA500"; //  Orange
    case 3:
      return "#008000"; // Dark Green
    case 4:
      return "#FF0000"; // Red
  }
};
function CapNhatDon() {
  const [filterStatus, setFilterStatus] = useState("Chờ giao hàng");
  const [dataSource, seDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

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
          {record.status === "Chờ giao hàng" ||
          record.status === "Không Thành Công" ? (
            <Link
              to={`/delivery-page/don-hang-moi/chi-tiet-don-hang/${record.orderID}`}
              style={{ fontWeight: "bold" }}
            >
              Xem chi tiết
            </Link>
          ) : (
            <Link
              to={`/delivery-page/chi-tiet-don-hang/${record.orderID}`}
              style={{ fontWeight: "bold" }}
            >
              Xem chi tiết
            </Link>
          )}
        </div>
      ),
    },
  ];
  // ------------------------------------------------------------------------------------------------
  const statusButtons = [
    "Chờ giao hàng",
    "Không Thành Công",
    "Đã giao",
    "Đã hoàn tiền",
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
