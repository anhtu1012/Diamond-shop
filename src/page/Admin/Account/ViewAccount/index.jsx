import { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { Select } from "antd";

import { getAllUser } from "../../../../../services/Uservices";
import { Link } from "react-router-dom";

function ViewAccount() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [dataSource, setDataSource] = useState([]);
  const [filterRole, setFilterRole] = useState(null);

  async function handledGetAllUser() {
    try {
      const response = await getAllUser();
      setDataSource(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    handledGetAllUser();
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

  const handleStatusClick = (role) => {
    setFilterRole(role);
  };

  const getColumnSearchProps = (dataIndex = []) => ({
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
            {[
              "Người dùng",
              "Nhân viên giao hàng",
              "Nhân viên bán hàng",
              "Quản lý",
            ].map((option) => (
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

  const roleUser = {
    "Người dùng": 0,
    "Quản lý": 1,
    "Nhân viên giao hàng": 2,
    "Nhân viên bán hàng": 3,
  };

  const getRoleColor = (roleUser) => {
    switch (roleUser) {
      case 0:
        return "#33CCFF"; // Light Blue
      case 1:
        return "#FF0000"; // Red
      case 2:
        return "#33CC33"; // Green
      case 3:
        return "#FFD700"; // Yellow
      default:
        return "#FFD700"; // Default Yellow
    }
  };

  const renderRoleName = (roleID) => {
    const roleNames = {
      1: "Quản lý",
      2: "Nhân viên giao hàng",
      3: "Nhân viên bán hàng",
      4: "Người dùng",
    };
    return roleNames[roleID] || "Unknown";
  };

  const columns = [
    {
      dataIndex: "avata",
      key: "avata",
      width: "10%",
      render: (avata) => (
        <Avatar
          src={avata}
          alt="avatar"
          style={{ marginLeft: "20px", width: "50px", height: "50px" }}
        />
      ),
    },
    {
      title: "ID Tài khoản",
      dataIndex: "userID",
      key: "userID",
      width: "10%",
      ...getColumnSearchProps("userID"),
    },
    {
      title: "Tên",
      dataIndex: "firstName",
      key: "firstName",
      width: "15%",
      ...getColumnSearchProps("firstName"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Quyền hạn",
      dataIndex: "role",
      key: "role",
      width: "15%",
      render: (role) => renderRoleName(role?.roleID),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "10%",
      render: (text, record) => (
        <div style={{ textAlign: "center" }}>
          <Link
            to={`/admin-page/tai-khoan/xem-tat-ca-tai-khoan/chi-tiet-tai-khoan/${record.userID}`}
            style={{ fontWeight: "bold" }}
          >
            Xem chi tiết
          </Link>
        </div>
      ),
    },
  ];

  const roleButtons = [
    "Người dùng",
    "Quản lý",
    "Nhân viên bán hàng",
    "Nhân viên giao hàng",
  ].map((role) => (
    <Button
      key={role}
      type={filterRole === role ? "primary" : "default"}
      onClick={() => handleStatusClick(role)}
      style={{
        fontWeight: "bold",
        color: "white",
        marginRight: 5,
        textTransform: "uppercase",
        backgroundColor: getRoleColor(roleUser[role]),
      }}
    >
      {role}
    </Button>
  ));

  roleButtons.push(
    <Button
      key="all"
      type={filterRole === null ? "primary" : "default"}
      onClick={() => handleStatusClick(null)}
      style={{
        fontWeight: "bold",
        marginRight: 5,
        color: "white",
        textTransform: "uppercase",
        backgroundColor: "black",
      }}
    >
      Tất cả tài khoản
    </Button>
  );

  const filteredDataSource = filterRole
    ? dataSource.filter(
        (user) => renderRoleName(user.role?.roleID) === filterRole
      )
    : dataSource;

  return (
    <div className="all-account">
      <div style={{ marginBottom: 16 }}>{roleButtons}</div>
      <Table
        className="table"
        columns={columns}
        dataSource={filteredDataSource}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default ViewAccount;
