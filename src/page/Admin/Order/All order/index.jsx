import { useEffect, useRef, useState } from "react";
import { Button, Input, Select, Space, Table, Tag, DatePicker } from "antd";
import { Link } from "react-router-dom";
import { getAllOrder } from "../../../../../services/Uservices";
import LoadingTruck from "../../../../components/loading";
import "./index.scss";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

const statusToStep = {
  "Chờ xác nhận": 0,
  "Chờ thanh toán": 1,
  "Chờ giao hàng": 2,
  "Không Thành Công": 3,
  "Đã giao": 4,
  "Đã hủy": 5,
  "Đã hoàn tiền": 5,
};

const getStatusColor = (currentStep) => {
  switch (currentStep) {
    case 0:
      return "#999999";
    case 1:
      return "#FFD700";
    case 2:
      return "#1d7a94";
    case 3:
      return "#ffa500";
    case 4:
      return "#008000";
    case 5:
      return "#FF0000";
    default:
      return "#605c5c";
  }
};

function AllOrder() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [filterStatus, setFilterStatus] = useState("Chờ xác nhận");
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrder = async () => {
    setLoading(true);
    const res = await getAllOrder();
    setDataSource(res.data.data);
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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex, dropdownOptions = []) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        {dataIndex === "orderDate" ? (
          <DatePicker
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0] ? moment(selectedKeys[0], "YYYY-MM-DD") : null}
            onChange={(date, dateString) => {
              setSelectedKeys(dateString ? [dateString] : []);
              confirm();
              setSearchText(dateString);
              setSearchedColumn(dataIndex);
            }}
            style={{ marginBottom: 8, display: "block" }}
          />
        ) : dropdownOptions.length > 0 ? (
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
            onDropdownVisibleChange={(visible) => {
              if (!visible) confirm();
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
      dataIndex === "orderDate"
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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
      ...getColumnSearchProps("orderDate"),
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
          <Link
            to={`/admin-page/don-hang/all/order-detail/${record.orderID}`}
            style={{ fontWeight: "bold" }}
          >
            Xem chi tiết
          </Link>
        </div>
      ),
    },
  ];

  const statusButtons = [
    "Chờ xác nhận",
    "Chờ thanh toán",
    "Chờ giao hàng",
    "Không Thành Công",
    "Đã giao",
    "Đã hủy",
    "Đã hoàn tiền",
  ].map((status) => (
    <Button
      key={status}
      type={filterStatus === status ? "primary" : "default"}
      onClick={() => handleStatusClick(status)}
      style={{
        fontWeight: "bold",
        color: "white",
        marginRight: 2,
        textTransform: "uppercase",
        backgroundColor: getStatusColor(statusToStep[status]),
        border: filterStatus === status ? "3px solid #000" : "none",
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
        border: filterStatus === null ? "3px solid #fff" : "none",
      }}
    >
      Tất cả sản phẩm
    </Button>
  );

  return (
    <div className="all-order">
      <div style={{ marginBottom: 16 }}>{statusButtons}</div>
      {loading ? (
        <LoadingTruck />
      ) : (
        <Table className="table" columns={columns} dataSource={filteredData} />
      )}
    </div>
  );
}

export default AllOrder;