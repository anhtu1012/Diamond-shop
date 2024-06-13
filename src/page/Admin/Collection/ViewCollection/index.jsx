import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Select, Space, Table } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import "./index.scss";

const data = [
  {
    key: "1",
    id: "BTS2023023097",
    image: (
      <img
        src="https://jemmia.vn/wp-content/uploads/2023/03/bo-trang-suc-kim-cuong-18k-bts2023023097.jpg"
        style={{ width: "100px" }}
      />
    ),
    name: "BỘ SƯU TẬP MÙA XUÂN KIM CƯƠNG 18K – CAMELLIA",
    status: "Còn hàng",
    price: "488.800.000 ₫",
    infor: <Link to={"/"} style={{color: 'black', fontWeight: 600}}>Xem chi tiết</Link>,
  },
  {
    key: "2",
    id: "BTS2022092838",
    image: (
      <img
        src="https://jemmia.vn/wp-content/uploads/2022/10/bo-trang-suc-kim-cuong-18k-bts2022092838.jpg"
        style={{ width: "100px" }}
      />
    ),
    name: "BỘ SƯU TẬP MÙA HẠ KIM CƯƠNG 18K – CLARITY LOVE",
    status: "Hết hàng",
    price: "388.800.000 ₫",
    infor: <Link to={"/"} style={{color: 'black', fontWeight: 600}}>Xem chi tiết</Link>,
  },
  {
    key: "3",
    id: "BTS3642154685",
    image: (
      <img
        src="https://jemmia.vn/wp-content/uploads/2022/10/SET00956-600x600.jpg"
        style={{ width: "100px" }}
      />
    ),
    name: "BỘ SƯU TẬP MÙA THU KIM CƯƠNG 18K – LOVE KNOT",
    status: "Còn hàng",
    price: "288.800.000 ₫",
    infor: <Link to={"/"} style={{color: 'black', fontWeight: 600}}>Xem chi tiết</Link>,
  },
  {
    key: "4",
    id: "BTS2022102885",
    image: (
      <img
        src="https://jemmia.vn/wp-content/uploads/2022/08/SET00947.jpg"
        style={{ width: "100px" }}
      />
    ),
    name: "BỘ SƯU TẬP MÙA ĐÔNG KIM CƯƠNG 18K – STELLA",
    status: "Hết hàng",
    price: "400.800.000 ₫",
    infor: <Link to={"/"} style={{color: 'black', fontWeight: 600}}>Xem chi tiết</Link>,
  },
  {
    key: "8",
    id: "SET 0092",
    image: (
      <img
        src="https://jemmia.vn/wp-content/uploads/2024/01/bo-trang-suc-kim-cuong-lotus-fashion-06.jpg"
        style={{ width: "100px" }}
      />
    ),
    name: "BỘ TRANG SỨC KIM CƯƠNG LOTUS FASHION 06",
    status: "Còn hàng",
    price: "68.800.000 ₫",
    infor: <Link to={"/"} style={{color: 'black', fontWeight: 600}}>Xem chi tiết</Link>,
  },
];

function ViewCollection() {
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
      title: "Mã số",
      dataIndex: "id",
      key: "id",
      width: "10%",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      width: "15%",
    },
    {
      title: "Tên bộ sưu tập",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "15%",
      ...getColumnSearchProps("status", ["Còn hàng", "Hết hàng"]),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: "15%",
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
    <div className="all-product">
      <Table className="table"
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default ViewCollection;
