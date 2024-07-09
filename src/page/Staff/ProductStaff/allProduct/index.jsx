import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Select, Space, Table, Tag } from "antd";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import "./index.scss";
import { getProducts } from "../../../../../services/Uservices";

const statusToStep = {
  "Còn hàng": 1,
  "Hết hàng": 0,
};

const getStatusColor = (currentStep) => {
  switch (currentStep) {
    case 0:
      return "#FFCC33"; // Yellow
    case 1:
      return "#33CC33"; // Green
    default:
      return "#FFCC33"; // Default Yellow
  }
};

function ViewProductS() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [dataSource, setDataSource] = useState([]);

  async function fetchProducts() {
    const response = await getProducts();
    const formattedData = response.data.map((item, index) => ({
      ...item,
      key: index, // Ensure each item has a unique key
      category: item.category.categoryName,
      status: item.status ? "Còn hàng" : "Hết hàng",
    }));
    setDataSource(formattedData);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

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
        {dataIndex === "status" || dataIndex === "category" ? (
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
      <SearchOutlined style={{ color: filtered ? "black" : undefined }} />
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

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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
      dataIndex: "productID",
      key: "productID",
      width: "15%",
      ...getColumnSearchProps("productID"),
    },
    {
      title: "Hình ảnh",
      dataIndex: "productImages",
      key: "productImages",
      width: "15%",
      render: (productImages) =>
        productImages && productImages.length > 0 ? (
          <img
            src={productImages[0].imageUrl}
            alt="Product"
            style={{ width: "100px", height: "auto" }}
          />
        ) : null,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
      width: "20%",
      ...getColumnSearchProps("productName"),
    },
    {
      title: "Phân loại",
      dataIndex: "category",
      key: "category",
      width: "15%",
      ...getColumnSearchProps("category", [
        "Nhẫn cầu hôn kim cương",
        "Nhẫn cưới kim cương",
        "Nhẫn kim cương",
        "Bông tai kim cương",
        "Lắc/Vòng tay kim cương",
        "Mặt dây chuyền kim cương",
      ]),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "10%",
      ...getColumnSearchProps("status", ["Còn hàng", "Hết hàng"]),
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
      title: "Giá (VNĐ)",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: "15%",
      sorter: (a, b) => parseInt(a.totalPrice) - parseInt(b.totalPrice),
      render: (text) =>
        parseInt(text).toLocaleString("vi-VN", {
          maximumFractionDigits: 0,
        }),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "10%",
      render: (text, record) => (
        <div style={{ textAlign: "center" }}>
          <Link
            to={`/staff-page/xem-san-pham/chi-tiet-san-pham/${record.productID}`}
          >
            Xem chi tiết
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
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
          className="table"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
}

export default ViewProductS;
