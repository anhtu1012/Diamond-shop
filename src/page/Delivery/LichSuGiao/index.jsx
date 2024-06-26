import { Table, Tag } from "antd";

import { Link } from "react-router-dom";

const data = [
  {
    key: "1",
    odID: "OD123456",
    idcus: "US123456",
    email: "hai263672@gmail.com",
    date: "29-5-2024",
    quantity: "2",
    status: "Đã giao",
    infor: (
      <Link
        to={"/delivery-page/lich-su-giao-hang/da-giao"}
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
    status: "Đã giao",
    infor: (
      <Link
        to={"/delivery-page/lich-su-giao-hang/da-giao"}
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
    status: "Đã giao",
    infor: (
      <Link
        to={"/delivery-page/lich-su-giao-hang/da-giao"}
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
        to={"/delivery-page/lich-su-giao-hang/da-giao"}
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
        to={"/delivery-page/lich-su-giao-hang/da-giao"}
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
        to={"/delivery-page/lich-su-giao-hang/da-giao"}
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
        to={"/delivery-page/lich-su-giao-hang/da-giao"}
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
        to={"/delivery-page/lich-su-giao-hang/da-giao"}
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
    status: "Đã giao",
    infor: (
      <Link
        to={"/delivery-page/lich-su-giao-hang/da-giao"}
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
    status: "Đã giao",
    infor: (
      <Link
        to={"/delivery-page/lich-su-giao-hang/da-giao"}
        style={{ color: "#e4bd7b", fontWeight: 600 }}
      >
        Xem chi tiết
      </Link>
    ),
  },
];

const statusToStep = {
  "Đã giao": 0,
  "Đã hủy": 1,
};

const getStatusColor = (currentStep) => {
  switch (currentStep) {
    case 0:
      return "#008000"; // Yellow
    case 1:
      return "#FF0000"; // Green
    default:
      return "#FFD700"; // Default Yellow
  }
};

function LichSuGiao() {
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

  return (
    <div className="all-order">
      <Table className="table" columns={columns} dataSource={data} />
    </div>
  );
}
export default LichSuGiao;
