import { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import { Select } from "antd";

const data = [
  {
    key: "1",
    id: "US123457",
    image:
      "https://blog.maika.ai/wp-content/uploads/2024/02/anh-meo-meme-11.jpg",
    name: "Nguyễn Văn A",
    email: "a@gmail.com",
    date: "29-5-2024",
    phone: "0123456789",
    role: "Người dùng",
    infor: (
      <Link
        to={
          "/admin-page/tai-khoan/xem-tat-ca-tai-khoan/chi-tiet-tai-khoan/US123457"
        }
        style={{ fontWeight: 600 }}
      >
        Xem chi tiết
      </Link>
    ),
  },
  {
    key: "2",
    id: "US1233457",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpPU1Ncrizcs1ZayuGEFFB8lrMnyUC7ZnJdg&shttps://blog.maika.ai/wp-content/uploads/2024/02/anh-meo-meme-5.jpg",
    name: "Nguyễn Văn B",
    email: "b@gmail.com",
    date: "28-5-2024",
    phone: "0684981532",
    role: "Người dùng",
    infor: (
      <Link
        to={
          "/admin-page/tai-khoan/xem-tat-ca-tai-khoan/chi-tiet-tai-khoan/US1233457"
        }
        style={{ fontWeight: 600 }}
      >
        Xem chi tiết
      </Link>
    ),
  },
  {
    key: "3",
    id: "ST1234337",
    image:
      "https://blog.maika.ai/wp-content/uploads/2024/02/anh-meo-meme-5.jpg",
    name: "Nguyễn Văn C",
    email: "c2@gmail.com",
    date: "30-5-2024",
    phone: "0984961522",
    role: "Nhân viên bán hàng",
    infor: (
      <Link
        to={
          "/admin-page/tai-khoan/xem-tat-ca-tai-khoan/chi-tiet-tai-khoan/ST1234337"
        }
        style={{ fontWeight: 600 }}
      >
        Xem chi tiết
      </Link>
    ),
  },
  {
    key: "4",
    id: "ST123457",
    name: "Nguyễn Văn D",
    email: "d@gmail.com",
    image:
      "https://blog.maika.ai/wp-content/uploads/2024/02/anh-meo-meme-8.jpg",
    date: "6-5-2024",
    phone: "0215645644",
    role: "Nhân viên bán hàng",
    infor: (
      <Link
        to={
          "/admin-page/tai-khoan/xem-tat-ca-tai-khoan/chi-tiet-tai-khoan/ST123457"
        }
        style={{ fontWeight: 600 }}
      >
        Xem chi tiết
      </Link>
    ),
  },
  {
    key: "5",
    id: "STD123657",
    name: "Nguyễn Văn E",
    image:
      "https://blog.maika.ai/wp-content/uploads/2024/02/anh-meo-meme-10.jpg",
    email: "e@gmail.com",
    date: "5-5-2024",
    phone: "0245449656",
    role: "Nhân viên giao hàng",
    infor: (
      <Link
        to={
          "/admin-page/tai-khoan/xem-tat-ca-tai-khoan/chi-tiet-tai-khoan/STD123657"
        }
        style={{ fontWeight: 600 }}
      >
        Xem chi tiết
      </Link>
    ),
  },
  {
    key: "6",
    id: "US12347",
    image:
      "https://blog.maika.ai/wp-content/uploads/2024/02/anh-meo-meme-11.jpg",
    name: "Nguyễn Văn A",
    email: "a@gmail.com",
    date: "29-5-2024",
    phone: "0123456789",
    role: "Người dùng",
    infor: (
      <Link
        to={
          "/admin-page/tai-khoan/xem-tat-ca-tai-khoan/chi-tiet-tai-khoan/US12347"
        }
        style={{ fontWeight: 600 }}
      >
        Xem chi tiết
      </Link>
    ),
  },
];

function ViewAccount() {
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
        {dataIndex === "role" ? (
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
      dataIndex: "image",
      key: "image",
      width: "10%",
      render: (url) => (
        <Avatar
          src={url}
          alt="avatar"
          style={{ marginLeft: "20px", width: "50px", height: "50px" }}
        />
      ),
    },
    {
      title: "ID Tài khoản",
      dataIndex: "id",
      key: "id",
      width: "10%",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Họ và Tên",
      dataIndex: "name",
      key: "name",
      width: "15%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Ngày tạo",
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
      title: "Quyền hạn",
      dataIndex: "role",
      key: "role",
      width: "15%",
      ...getColumnSearchProps("role", [
        "Người dùng",
        "Nhân viên bán hàng",
        "Nhân viên giao hàng",
      ]),
    },
    {
      dataIndex: "infor",
      key: "infor",
      width: "15%",
    },
  ];

  return (
    <div className="all-account">
      <Table className="table" columns={columns} dataSource={data} />
    </div>
  );
}

export default ViewAccount;
