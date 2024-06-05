import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Select, Space, Table } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import "./index.scss";

const initialData = [
  {
    key: "1",
    id: "MS123",
    image: (
      <img
        src="https://jemmia.vn/wp-content/uploads/2024/05/1_cam_03-copy.jpg"
        style={{ width: "100px" }}
      />
    ),
    name: "NHẪN KIM CƯƠNG NỮ 18K 01141N",
    category: "Nhẫn cầu hôn kim cương",
    status: "Còn hàng",
    price: "488.800.000 ₫",
    infor: (
      <Link
        to={"/admin-page/san-pham/xem-tat-ca-san-pham/product-detail/MS123"}
        style={{color: 'black', fontWeight: 600}}>
        Xem chi tiết
      </Link>
    ),
  },
  {
    key: "2",
    id: "MS456",
    image: (
      <img
        src="https://jemmia.vn/wp-content/uploads/2022/05/R41.3-1-scaled-1.jpg"
        style={{ width: "100px" }}
      />
    ),
    name: "NHẪN KIM CƯƠNG NAM 18K",
    category: "Nhẫn kim cương",
    status: "Hết hàng",
    price: "488.800.000 ₫",
    infor: (
      <Link
        to={"/admin-page/san-pham/xem-tat-ca-san-pham/product-detail/MS456"}
        style={{color: 'black', fontWeight: 600}}>
        Xem chi tiết
      </Link>
    ),
  },
  {
    key: "3",
    id: "MS789",
    image: (
      <img
        src="https://jemmia.vn/wp-content/uploads/2024/04/1-copy-9.jpg"
        style={{ width: "100px" }}
      />
    ),
    name: "BÔNG TAI KIM CƯƠNG 18K",
    category: "Bông tai kim cương",
    status: "Còn hàng",
    price: "488.800.000 ₫",
    infor: (
      <Link
        to={"/admin-page/san-pham/xem-tat-ca-san-pham/product-detail/MS789"}
        style={{color: 'black', fontWeight: 600}}>
        Xem chi tiết
      </Link>
    ),
  },
  {
    key: "4",
    id: "MS159",
    image: (
      <img
        src="https://jemmia.vn/wp-content/uploads/2024/02/vong-tay-kim-cuong-18k-LT2022082803-3.jpg"
        style={{ width: "100px" }}
      />
    ),
    name: "VÒNG TAY KIM CƯƠNG 18K",
    category: "Lắc/Vòng tay kim cương",
    status: "Hết hàng",
    price: "48.800.000 ₫",
    infor: (
      <Link
        to={"/admin-page/san-pham/xem-tat-ca-san-pham/product-detail/MS159"}
        style={{color: 'black', fontWeight: 600}}>
        Xem chi tiết
      </Link>
    ),
  },
  {
    key: "5",
    id: "MS753",
    image: (
      <img
        src="https://jemmia.vn/wp-content/uploads/2024/04/2-copy-7.jpg"
        style={{ width: "100px" }}
      />
    ),
    name: "MẶT DÂY CHUYỀN KIM CƯƠNG 18K",
    category: "Mặt dây chuyền kim cương",
    status: "Còn hàng",
    price: "88.800.000 ₫",
    infor: (
      <Link
        to={"/admin-page/san-pham/xem-tat-ca-san-pham/product-detail/MS753"}
        style={{color: 'black', fontWeight: 600}}>
        Xem chi tiết
      </Link>
    ),
  },
  {
    key: "6",
    id: "MS258",
    image: (
      <img
        src="https://jemmia.vn/wp-content/uploads/2024/05/1_cam_03-2.jpg"
        style={{ width: "100px" }}
      />
    ),
    name: "NHẪN CẦU HÔN KIM CƯƠNG 18K WRA00159",
    category: "Nhẫn cầu hôn kim cương",
    status: "Hết hàng",
    price: "88.800.000 ₫",
    infor: (
      <Link
        to={"/admin-page/san-pham/xem-tat-ca-san-pham/product-detail/MS258"}
        style={{color: 'black', fontWeight: 600}}>
        Xem chi tiết
      </Link>
    ),
  },
  {
    key: "7",
    id: "MS165",
    image: (
      <img
        src="https://jemmia.vn/wp-content/uploads/2024/04/3-copy-4.jpg"
        style={{ width: "100px" }}
      />
    ),
    name: "NHẪN CƯỚI KIM CƯƠNG 18K",
    category: "Nhẫn cưới kim cương",
    status: "Còn hàng",
    price: "68.800.000 ₫",
    infor: (
      <Link
        to={"/admin-page/san-pham/xem-tat-ca-san-pham/product-detail/MS165"}
        style={{color: 'black', fontWeight: 600}}   >
        Xem chi tiết
      </Link>
    ),
  },
];

function ViewProduct() {
  const [data, setData] = useState(initialData); // Add state to manage data
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
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    // Delete selected items
    const newData = data.filter((item) => !selectedRowKeys.includes(item.key));
    setData(newData); // Update the data state
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
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
      width: "15%",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      width: "15%",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...getColumnSearchProps("name"),
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
      width: "20%",
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

export default ViewProduct;
