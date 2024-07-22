import { useEffect, useState } from "react";

import { Table } from "antd";

import { Link } from "react-router-dom";
import { getAllOrder } from "../../../../services/Uservices";
import LoadingTruck from "../../../components/loading";
import "./index.scss";

function Stores() {
  const [dataSource, seDataSource] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const fetchAllOrder = async () => {
    setLoading(true);
    const res = await getAllOrder();
    seDataSource(
      res.data.data.filter((item) => item.status === "Đến cửa hàng lấy")
    );
    console.log(dataSource);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllOrder();
  }, []);

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

  return (
    <div className="all-order">
      {loading ? (
        <LoadingTruck /> // Show LoadingTruck while loading
      ) : (
        <Table className="table" columns={columns} dataSource={dataSource} />
      )}
    </div>
  );
}
export default Stores;
