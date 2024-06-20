import { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { Select } from "antd";

import { Link } from "react-router-dom";
import { getAllUserStaff } from "../../../../services/Uservices";

function ViewUser() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [dataSource, setDataSource] = useState([]);

  async function handledGetAllUser() {
    try {
      const response = await getAllUserStaff();
      if (response && response.data && Array.isArray(response.data.data)) {
        setDataSource(response.data.data);
        console.log(response.data.data);
      } else {
        console.error("Unexpected API response structure:", response);
      }
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

  const filteredDataSource = dataSource.filter(
    (user) => user.role && user.role.roleID === 4
  );

  const renderRoleName = (roleID) => {
    const roleNames = {
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
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: "15%",
      ...getColumnSearchProps("phone"),
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
            to={`/staff-page/tai-khoan/xem-tat-ca-tai-khoan/${record.userID}`}
            style={{ fontWeight: "bold" }}
          >
            Xem chi tiết
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="all-account">
      <Table
        className="table"
        columns={columns}
        dataSource={filteredDataSource}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default ViewUser;
