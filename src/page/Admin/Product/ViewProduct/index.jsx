
import { SearchOutlined } from "@ant-design/icons";
import {  Button, Input, Select, Space, Table  } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";

const data = [
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
    status: "Còn hàng",
    price: "488.800.000 ₫",
    infor: <Link to={"/"}>Xem chi tiết</Link>,
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
    status: "Hết hàng",
    price: "488.800.000 ₫",
    infor: <Link to={"/"}>Xem chi tiết</Link>,
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
    status: "Còn hàng",
    price: "488.800.000 ₫",
    infor: <Link to={"/"}>Xem chi tiết</Link>,
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
    status: "Hết hàng",
    price: "48.800.000 ₫",
    infor: <Link to={"/"}>Xem chi tiết</Link>,
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
    status: "Còn hàng",
    price: "88.800.000 ₫",
    infor: <Link to={"/"}>Xem chi tiết</Link>,
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
    status: "Hết hàng",
    price: "88.800.000 ₫",
    infor: <Link to={"/"}>Xem chi tiết</Link>,
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
    status: 'Còn hàng',
    price: "68.800.000 ₫",
    infor: <Link to={"/"}>Xem chi tiết</Link>,
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
    status: 'Còn hàng',
    price: "68.800.000 ₫",
    infor: <Link to={"/"}>Xem chi tiết</Link>,
  },
];


function ViewProduct() {

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
        {dataIndex === 'status' ? (
          <Select
            style={{ width: 188, marginBottom: 8, display: 'block' }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(value) => {
              setSelectedKeys(value ? [value] : []);
              confirm();
              setSearchText(value);
              setSearchedColumn(dataIndex);
            }}
          >
            {dropdownOptions.map(option => (
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
            style={{ marginBottom: 8, display: 'block' }}
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
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
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
      ...getColumnSearchProps('id'),
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
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      ...getColumnSearchProps('status', [
        'Còn hàng',
        'Hết hàng',
      ]),
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
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
    </div>
  );
}

export default ViewProduct;
