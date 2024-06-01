import { Button, Input, Select, Space, Table } from "antd";
import { Link } from "react-router-dom";
import "./index.scss";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

const initialData = [
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
        {dataIndex === "color" || dataIndex === "purity" ? (
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
  const [data, setData] = useState(initialData); // Chuyển `data` vào state
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    // Xóa các sản phẩm đã chọn và cập nhật state `data`
    const newData = data.filter((item) => !selectedRowKeys.includes(item.key));
    setData(newData); // Cập nhật state `data`
    setSelectedRowKeys([]);
    setLoading(false);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;
  const columns = [
    {
      title: "Mã số",
      dataIndex: "id",
      key: "id",
      width: "12.5%",
      ...getColumnSearchProps("id"),
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
      ...getColumnSearchProps("style"),
    },
    {
      title: "Trọng lượng (cts)",
      dataIndex: "weight",
      key: "weight",
      width: "10%",
      ...getColumnSearchProps("weight"),
    },
    {
      title: "Cấp màu",
      dataIndex: "color",
      key: "color",
      width: "10%",
      ...getColumnSearchProps("color", [
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
      ]),
    },
    {
      title: "Độ tinh khiết",
      dataIndex: "purity",
      key: "purity",
      width: "10%",
      ...getColumnSearchProps("purity", [
        "IF",
        "VVS1",
        "VVS2",
        "VS1",
        "VS2",
        "SI1",
        "SI2",
        "I1",
        "I2",
      ]),
    },
    {
      title: "Kiểm định",
      dataIndex: "accreditation",
      key: "accreditation",
      width: "10%",
      className: "custom-column-header",
      ...getColumnSearchProps("accreditation"),
    },
    {
      title: "Kích thước (mm)",
      dataIndex: "size",
      key: "size",
      width: "10%",
      ...getColumnSearchProps("size"),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: "10%",
      sorter: (a, b) =>
        parseInt(a.price.replace(/\D/g, "")) -
        parseInt(b.price.replace(/\D/g, "")),
      ...getColumnSearchProps("price"),
    },
    {
      dataIndex: "infor",
      key: "infor",
      width: "10%",
    },
  ];

  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
        >
          Xóa sản phẩm
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Đã chọn ${selectedRowKeys.length} sản phẩm` : ""}
        </span>
      </div>
      <div className="all-product">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
}

export default ViewDiamond;
