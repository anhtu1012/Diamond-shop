import { Button, Image, Input, Select, Space, Table } from "antd";
import { Link } from "react-router-dom";
import "./index.scss";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { getDiamonds } from "../../../../../services/Uservices";




function ViewDiamond() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [dataSource, setDataSource] = useState([]);
  async function fetchDiamonds() {
    const reponse = await getDiamonds();
    setDataSource(reponse.data);
  }
  useEffect(function () {
    fetchDiamonds();
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
        {dropdownOptions.length > 0 ? (
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
    // Xóa các sản phẩm đã chọn và cập nhật state `data`
    const newData = dataSource.filter((item) => !selectedRowKeys.includes(item.key));
    setDataSource(newData); // Cập nhật state `data`
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
      dataIndex: "diamondID",
      key: "diamondID",
      width: "12.5%",
      ...getColumnSearchProps("diamondID"),
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      width: "10%",
      render: (image) => <Image src={image} width={100} />,
    },
    {
      title: "Hình dạng",
      dataIndex: "shape",
      key: "shape",
      width: "10%",
      ...getColumnSearchProps("shape", [
        "Round",
        "Princess",
        "Radiant",
        "Emerald",
        "Asscher",
        "Marquise",
        "Oval",
        "Pearl",
        "Heart",
        "Cushion",
      ]),
    },
    {
      title: "Trọng lượng (cts)",
      dataIndex: "carat",
      key: "carat",
      width: "10%",
      ...getColumnSearchProps("carat"),
    },
    {
      title: "Cấp màu",
      dataIndex: "colorLevel",
      key: "colorLevel",
      width: "10%",
      ...getColumnSearchProps("colorLevel", [
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
      dataIndex: "clarify",
      key: "clarify",
      width: "10%",
      ...getColumnSearchProps("clarify", [
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
      dataIndex: "certificate",
      key: "certificate",
      width: "10%",
      className: "custom-column-header",
      ...getColumnSearchProps("certificate"),
    },
    {
      title: "Kích thước (mm)",
      dataIndex: "dimensions",
      key: "dimensions",
      width: "10%",
      ...getColumnSearchProps("dimensions"),
    },
    {
      title: "Giá",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: "10%",
      sorter: (a, b) =>
        parseInt(a.totalPrice) -
        parseInt(b.totalPrice),
      ...getColumnSearchProps("totalPrice"),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "10%",
      render: (text, record) => (
        <div style={{ textAlign: "center" }}>
        <Link to={`/admin-page/san-pham/xem-tat-ca-kim-cuong/daimond-detail/${record.diamondID}`}>
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
          dataSource={dataSource}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
}

export default ViewDiamond;
