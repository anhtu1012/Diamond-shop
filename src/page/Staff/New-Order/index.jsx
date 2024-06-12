import { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Select, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";

const data = [
  {
    key: "1",
    idorder: "OD123456",
    idcus: "US123456",
    email: "trungnguyen@example.com",
    date: "29-5-2024",
    quantity: "2",
    status: "Chờ xác nhận",
    infor: (
      <Link
        to={"/staff-page/new-order-page"}
        style={{ color: "black", fontWeight: 600 }}
      >
        Xem chi tiết
      </Link>
    ),
  },
  {
    key: "2",
    idorder: "OD123457",
    idcus: "US123457",
    email: "huy263672@gmail.com",
    date: "28-5-2024",
    quantity: "2",
    status: "Chờ xác nhận",
    infor: (
      <Link
        to={"/staff-page/new-order-page"}
        style={{ color: "black", fontWeight: 600 }}
      >
        Xem chi tiết
      </Link>
    ),
  },
  {
    key: "3",
    idorder: "OD123458",
    idcus: "US123458",
    email: "hhung263672@gmail.com",
    date: "30-5-2024",
    quantity: "2",
    status: "Chờ xác nhận",
    infor: (
      <Link
        to={"/staff-page/new-order-page"}
        style={{ color: "black", fontWeight: 600 }}
      >
        Xem chi tiết
      </Link>
    ),
  },
  // {
  //   key: "4",
  //   idorder: "OD123459",
  //   idcus: "US123459",
  //   email: "hai263673@gmail.com",
  //   date: "6-5-2024",
  //   quantity: "2",
  //   status: "Đã giao",
  //   infor: (
  //     <Link
  //       to={"/admin-page/don-hang/all/order-detail/OD123459"}
  //       style={{ color: "black", fontWeight: 600 }}
  //     >
  //       Xem chi tiết
  //     </Link>
  //   ),
  // },
  // {
  //   key: "5",
  //   idorder: "OD123460",
  //   idcus: "US123460",
  //   email: "hai263674@gmail.com",
  //   date: "5-5-2024",
  //   quantity: "2",
  //   status: "Đã hủy",
  //   infor: (
  //     <Link
  //       to={"/admin-page/don-hang/all/order-detail/OD123460"}
  //       style={{ color: "black", fontWeight: 600 }}
  //     >
  //       Xem chi tiết
  //     </Link>
  //   ),
  // },
  // {
  //   key: "6",
  //   idorder: "OD123461",
  //   idcus: "US123461",
  //   email: "hai263675@gmail.com",
  //   date: "4-5-2024",
  //   quantity: "2",
  //   status: "Đã giao",
  //   infor: (
  //     <Link
  //       to={"/admin-page/don-hang/all/order-detail/OD123461"}
  //       style={{ color: "black", fontWeight: 600 }}
  //     >
  //       Xem chi tiết
  //     </Link>
  //   ),
  // },
  // {
  //   key: "7",
  //   idorder: "OD123462",
  //   idcus: "US123462",
  //   email: "hai263676@gmail.com",
  //   date: "3-5-2024",
  //   quantity: "2",
  //   status: "Đã hủy",
  //   infor: (
  //     <Link
  //       to={"/admin-page/don-hang/all/order-detail/OD123462"}
  //       style={{ color: "black", fontWeight: 600 }}
  //     >
  //       Xem chi tiết
  //     </Link>
  //   ),
  // },
  // {
  //   key: "8",
  //   idorder: "OD123463",
  //   idcus: "US123463",
  //   email: "hai263677@gmail.com",
  //   date: "2-5-2024",
  //   quantity: "2",
  //   status: "Đã giao",
  //   infor: (
  //     <Link
  //       to={"/admin-page/don-hang/all/order-detail/OD123463"}
  //       style={{ color: "black", fontWeight: 600 }}
  //     >
  //       Xem chi tiết
  //     </Link>
  //   ),
  // },
  // {
  //   key: "9",
  //   idorder: "OD123463",
  //   idcus: "US123463",
  //   email: "hai263677@gmail.com",
  //   date: "3-4-2024",
  //   quantity: "4",
  //   status: "Chờ giao hàng",
  //   infor: (
  //     <Link
  //       to={"/admin-page/don-hang/all/order-detail/OD123463"}
  //       style={{ color: "black", fontWeight: 600 }}
  //     >
  //       Xem chi tiết
  //     </Link>
  //   ),
  // },
  // {
  //   key: "10",
  //   idorder: "OD123463",
  //   idcus: "US123463",
  //   email: "263677@gmail.com",
  //   date: "3-3-2024",
  //   quantity: "3",
  //   status: "Chờ thanh toán",
  //   infor: (
  //     <Link
  //       to={"/admin-page/don-hang/all/order-detail/OD123463"}
  //       style={{ color: "black", fontWeight: 600 }}
  //     >
  //       Xem chi tiết
  //     </Link>
  //   ),
  // },
  // {
  //   key: "11",
  //   idorder: "OD123463",
  //   idcus: "US123463",
  //   email: "hai263677@gmail.com",
  //   date: "3-2-2024",
  //   quantity: "1",
  //   status: "Chờ xác nhận",
  //   infor: (
  //     <Link
  //       to={"/admin-page/don-hang/all/order-detail/OD123463"}
  //       style={{ color: "black", fontWeight: 600 }}
  //     >
  //       Xem chi tiết
  //     </Link>
  //   ),
  // },
];

function PageNewOrder() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex, dropdownOptions) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        {dataIndex === "status" ? (
          <Select
            style={{ width: 188, marginBottom: 8, display: "block" }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(value) => {
              setSelectedKeys(value ? [value] : []);
              confirm();
              setSearchText(value);
              setSearchedColumn(dataIndex);
            }}
          >
            {dropdownOptions.map((option) => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        ) : (
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ marginBottom: 8, display: "block" }}
          />
        )}
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "idorder",
      key: "idorder",
      width: "15%",
      ...getColumnSearchProps("idorder"),
    },
    {
      title: "ID Khách Hàng",
      dataIndex: "idcus",
      key: "idcus",
      width: "10%",
      ...getColumnSearchProps("idcus"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "date",
      key: "date",
      width: "15%",
      ...getColumnSearchProps("date"),
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
      ...getColumnSearchProps("quantity"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "15%",
      ...getColumnSearchProps("status", [
        "Chờ xác nhận",
        "Chờ thanh toán",
        "Chờ giao hàng",
        "Đã giao",
        "Đã hủy",
      ]),
    },
    {
      dataIndex: "infor",
      key: "infor",
      width: "15%",
    },
  ];

  return (
    <div className="all-order">
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default PageNewOrder;
