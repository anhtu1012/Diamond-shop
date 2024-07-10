import { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import { Button, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

import moment from "moment";
import { getWarrantyAllCard } from "../../../../services/Uservices";
import LoadingTruck from "../../../components/loading";

function ViewWarrantyAdmin() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [dataSource, setDataSource] = useState([]);

  async function getAllWarranty() {
    const response = await getWarrantyAllCard();
    const warrantyData = response.data;
    setDataSource(warrantyData);
    console.log(warrantyData);
  }

  useEffect(() => {
    getAllWarranty();
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

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
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
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
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
      title: "Mã Bảo Hành",
      dataIndex: "warrantyCardID",
      key: "warrantyCardID",
      ...getColumnSearchProps("warrantyCardID"),
    },
    {
      title: "ID Tài Khoản",
      dataIndex: "userId",
      key: "userId",
      ...getColumnSearchProps("userId"),
    },
    {
      title: "Mã Sản Phẩm",
      dataIndex: "objectId",
      key: "objectId",
      ...getColumnSearchProps("objectId"),
    },
    {
      title: "Ngày Tạo",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
      render: (text) => moment(text).format("YYYY-MM-DD"),
      sorter: (a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Ngày Đến Hạn",
      dataIndex: "expirationDate",
      key: "expirationDate",
      render: (text) => moment(text).format("YYYY-MM-DD"),
      sorter: (a, b) => new Date(a.expirationDate) - new Date(b.expirationDate),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "10%",
      render: (text, record) => (
        <div style={{ textAlign: "center" }}>
          <Link
            to={`/admin-page/view-bao-hanh/xem-chi-tiet-bao-hanh/${record.warrantyCardID}`}
            style={{ fontWeight: "bold" }}
          >
            Xem chi tiết
          </Link>
        </div>
      ),
    },
  ];

  if (!dataSource.length) {
    return <LoadingTruck />;
  }

  return (
    <div className="xem-bao-hanh">
      <Table
        className="table"
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default ViewWarrantyAdmin;
