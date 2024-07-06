import { Breadcrumb, Table } from "antd";
import Container from "../../../components/container/Container";
import { Link } from "react-router-dom";
import "./index.scss";
import { useState } from "react";
const columns = [
  {
    title: "Ly",
    dataIndex: "Ly",
    width: "5%",
  },
  {
    title: "Nước Màu",
    dataIndex: "Nước_màu",
    width: "10%",
  },
  {
    title: "Độ Sạch",
    dataIndex: "Độ_sạch",
    width: "10%",
  },
  {
    title: "Giá gốc",
    dataIndex: "Giá gốc",
    width: "15%",
  },
  {
    title: "CTKM Đặc Biệt Giảm 8%",
    dataIndex: "CTKM Đặc Biệt Giảm 8%",
    width: "20%",
  },
];
function BangGiaKimCuong() {
  const [selectedSize, setSelectedSize] = useState(null);

  const priceData = {
    "4 Ly 5": [
      {
        Ly: "4.5",
        Nước_màu: "D",
        Độ_sạch: "IF",
        "Giá gốc": "36,805,000",
        "CTKM Đặc Biệt Giảm 8%": "33,860,000",
      },
      {
        Ly: "4.5",
        Nước_màu: "D",
        Độ_sạch: "VVS1",
        "Giá gốc": "35,305,000",
        "CTKM Đặc Biệt Giảm 8%": "32,480,000",
      },
      {
        Ly: "4.5",
        Nước_màu: "D",
        Độ_sạch: "VVS2",
        "Giá gốc": "31,620,000",
        "CTKM Đặc Biệt Giảm 8%": "29,090,000",
      },
      {
        Ly: "4.5",
        Nước_màu: "D",
        Độ_sạch: "VS1",
        "Giá gốc": "29,120,000",
        "CTKM Đặc Biệt Giảm 8%": "26,790,000",
      },
      {
        Ly: "4.5",
        Nước_màu: "D",
        Độ_sạch: "VS2",
        "Giá gốc": "26,685,000",
        "CTKM Đặc Biệt Giảm 8%": "24,550,000",
      },
      {
        Ly: "4.5",
        Nước_màu: "E",
        Độ_sạch: "IF",
        "Giá gốc": "32,990,000",
        "CTKM Đặc Biệt Giảm 8%": "30,350,000",
      },
      {
        Ly: "4.5",
        Nước_màu: "E",
        Độ_sạch: "VVS1",
        "Giá gốc": "31,468,000",
        "CTKM Đặc Biệt Giảm 8%": "28,950,000",
      },
      {
        Ly: "4.5",
        Nước_màu: "E",
        Độ_sạch: "VVS2",
        "Giá gốc": "29,240,000",
        "CTKM Đặc Biệt Giảm 8%": "26,900,000",
      },
      {
        Ly: "4.5",
        Nước_màu: "E",
        Độ_sạch: "VS1",
        "Giá gốc": "26,979,000",
        "CTKM Đặc Biệt Giảm 8%": "24,820,000",
      },
      {
        Ly: "4.5",
        Nước_màu: "E",
        Độ_sạch: "VS2",
        "Giá gốc": "24,979,000",
        "CTKM Đặc Biệt Giảm 8%": "22,980,000",
      },
      {
        Ly: "4.5",
        Nước_màu: "F",
        Độ_sạch: "IF",
        "Giá gốc": "31,979,000",
        "CTKM Đặc Biệt Giảm 8%": "29,420,000",
      },
      {
        Ly: "4.5",
        Nước_màu: "F",
        Độ_sạch: "VVS1",
        "Giá gốc": "30,539,000",
        "CTKM Đặc Biệt Giảm 8%": "28,095,000",
      },
      {
        Ly: "4.5",
        Nước_màu: "F",
        Độ_sạch: "VVS2",
        "Giá gốc": "27,500,000",
        "CTKM Đặc Biệt Giảm 8%": "25,300,000",
      },
      {
        Ly: "4.5",
        Nước_màu: "F",
        Độ_sạch: "VS1",
        "Giá gốc": "26,468,000",
        "CTKM Đặc Biệt Giảm 8%": "24,350,000",
      },
      {
        Ly: "4.5",
        Nước_màu: "F",
        Độ_sạch: "VS2",
        "Giá gốc": "25,750,000",
        "CTKM Đặc Biệt Giảm 8%": "23,690,000",
      },
      {
        Ly: "4.5",
        Nước_màu: "G",
        Độ_sạch: "VS1",
        "Giá gốc": "25,865,000",
        "CTKM Đặc Biệt Giảm 8%": "23,795,000",
      },
      {
        Ly: "4.5",
        Nước_màu: "G",
        Độ_sạch: "VS2",
        "Giá gốc": "22,990,000",
        "CTKM Đặc Biệt Giảm 8%": "21,150,000",
      },
    ],
    "5 Ly": [
      {
        Ly: "5.0",
        Nước_màu: "D",
        Độ_sạch: "IF",
        "Giá gốc": "74,772,000",
        "CTKM Đặc Biệt Giảm 8%": "68,790,000",
      },
      {
        Ly: "5.0",
        Nước_màu: "D",
        Độ_sạch: "VVS1",
        "Giá gốc": "68,968,000",
        "CTKM Đặc Biệt Giảm 8%": "63,450,000",
      },
      {
        Ly: "5.0",
        Nước_màu: "D",
        Độ_sạch: "VVS2",
        "Giá gốc": "56,250,000",
        "CTKM Đặc Biệt Giảm 8%": "51,750,000",
      },
      {
        Ly: "5.0",
        Nước_màu: "D",
        Độ_sạch: "VS1",
        "Giá gốc": "51,979,000",
        "CTKM Đặc Biệt Giảm 8%": "47,820,000",
      },
      {
        Ly: "5.0",
        Nước_màu: "D",
        Độ_sạch: "VS2",
        "Giá gốc": "48,805,000",
        "CTKM Đặc Biệt Giảm 8%": "44,900,000",
      },
      {
        Ly: "5.0",
        Nước_màu: "E",
        Độ_sạch: "IF",
        "Giá gốc": "64,990,000",
        "CTKM Đặc Biệt Giảm 8%": "59,790,000",
      },
      {
        Ly: "5.0",
        Nước_màu: "E",
        Độ_sạch: "VVS1",
        "Giá gốc": "61,685,000",
        "CTKM Đặc Biệt Giảm 8%": "56,750,000",
      },
      {
        Ly: "5.0",
        Nước_màu: "E",
        Độ_sạch: "VVS2",
        "Giá gốc": "54,240,000",
        "CTKM Đặc Biệt Giảm 8%": "49,900,000",
      },
      {
        Ly: "5.0",
        Nước_màu: "E",
        Độ_sạch: "VS1",
        "Giá gốc": "49,968,000",
        "CTKM Đặc Biệt Giảm 8%": "45,970,000",
      },
      {
        Ly: "5.0",
        Nước_màu: "E",
        Độ_sạch: "VS2",
        "Giá gốc": "47,479,000",
        "CTKM Đặc Biệt Giảm 8%": "43,680,000",
      },
      {
        Ly: "5.0",
        Nước_màu: "F",
        Độ_sạch: "IF",
        "Giá gốc": "60,750,000",
        "CTKM Đặc Biệt Giảm 8%": "55,890,000",
      },
      {
        Ly: "5.0",
        Nước_màu: "F",
        Độ_sạch: "VVS1",
        "Giá gốc": "57,500,000",
        "CTKM Đặc Biệt Giảm 8%": "52,900,000",
      },
      {
        Ly: "5.0",
        Nước_màu: "F",
        Độ_sạch: "VVS2",
        "Giá gốc": "52,740,000",
        "CTKM Đặc Biệt Giảm 8%": "48,520,000",
      },
      {
        Ly: "5.0",
        Nước_màu: "F",
        Độ_sạch: "VS1",
        "Giá gốc": "47,740,000",
        "CTKM Đặc Biệt Giảm 8%": "43,920,000",
      },
      {
        Ly: "5.0",
        Nước_màu: "F",
        Độ_sạch: "VS2",
        "Giá gốc": "46,468,000",
        "CTKM Đặc Biệt Giảm 8%": "42,750,000",
      },
      {
        Ly: "5.0",
        Nước_màu: "G",
        Độ_sạch: "VS1",
        "Giá gốc": "44,479,000",
        "CTKM Đặc Biệt Giảm 8%": "40,920,000",
      },
      {
        Ly: "5.0",
        Nước_màu: "G",
        Độ_sạch: "VS2",
        "Giá gốc": "40,968,000",
        "CTKM Đặc Biệt Giảm 8%": "37,690,000",
      },
    ],
    "5 Ly 4": [
      {
        Ly: "5.4",
        Nước_màu: "D",
        Độ_sạch: "IF",
        "Giá gốc": "125,680,000",
        "CTKM Đặc Biệt Giảm 8%": "115,625,000",
      },
      {
        Ly: "5.4",
        Nước_màu: "D",
        Độ_sạch: "VVS1",
        "Giá gốc": "118,250,000",
        "CTKM Đặc Biệt Giảm 8%": "108,790,000",
      },
      {
        Ly: "5.4",
        Nước_màu: "D",
        Độ_sạch: "VVS2",
        "Giá gốc": "91,990,000",
        "CTKM Đặc Biệt Giảm 8%": "84,630,000",
      },
      {
        Ly: "5.4",
        Nước_màu: "D",
        Độ_sạch: "VS1",
        "Giá gốc": "81,468,000",
        "CTKM Đặc Biệt Giảm 8%": "74,950,000",
      },
      {
        Ly: "5.4",
        Nước_màu: "D",
        Độ_sạch: "VS2",
        "Giá gốc": "71,620,000",
        "CTKM Đặc Biệt Giảm 8%": "65,890,000",
      },
      {
        Ly: "5.4",
        Nước_màu: "E",
        Độ_sạch: "IF",
        "Giá gốc": "99,990,000",
        "CTKM Đặc Biệt Giảm 8%": "91,990,000",
      },
      {
        Ly: "5.4",
        Nước_màu: "E",
        Độ_sạch: "VVS1",
        "Giá gốc": "94,990,000",
        "CTKM Đặc Biệt Giảm 8%": "87,390,000",
      },
      {
        Ly: "5.4",
        Nước_màu: "E",
        Độ_sạch: "VVS2",
        "Giá gốc": "88,468,000",
        "CTKM Đặc Biệt Giảm 8%": "81,390,000",
      },
      {
        Ly: "5.4",
        Nước_màu: "E",
        Độ_sạch: "VS1",
        "Giá gốc": "73,685,000",
        "CTKM Đặc Biệt Giảm 8%": "67,790,000",
      },
      {
        Ly: "5.4",
        Nước_màu: "E",
        Độ_sạch: "VS2",
        "Giá gốc": "66,250,000",
        "CTKM Đặc Biệt Giảm 8%": "60,950,000",
      },
      {
        Ly: "5.4",
        Nước_màu: "F",
        Độ_sạch: "IF",
        "Giá gốc": "93,250,000",
        "CTKM Đặc Biệt Giảm 8%": "85,790,000",
      },
      {
        Ly: "5.4",
        Nước_màu: "F",
        Độ_sạch: "VVS1",
        "Giá gốc": "84,620,000",
        "CTKM Đặc Biệt Giảm 8%": "77,850,000",
      },
      {
        Ly: "5.4",
        Nước_màu: "F",
        Độ_sạch: "VVS2",
        "Giá gốc": "69,539,000",
        "CTKM Đặc Biệt Giảm 8%": "63,975,000",
      },
      {
        Ly: "5.4",
        Nước_màu: "F",
        Độ_sạch: "VS1",
        "Giá gốc": "65,745,000",
        "CTKM Đặc Biệt Giảm 8%": "60,485,000",
      },
      {
        Ly: "5.4",
        Nước_màu: "F",
        Độ_sạch: "VS2",
        "Giá gốc": "61,685,000",
        "CTKM Đặc Biệt Giảm 8%": "56,750,000",
      },
      {
        Ly: "5.4",
        Nước_màu: "G",
        Độ_sạch: "VS1",
        "Giá gốc": "56,979,000",
        "CTKM Đặc Biệt Giảm 8%": "52,420,000",
      },
      {
        Ly: "5.4",
        Nước_màu: "G",
        Độ_sạch: "VS2",
        "Giá gốc": "52,500,000",
        "CTKM Đặc Biệt Giảm 8%": "48,300,000",
      },
    ],
    "6 Ly": [
      {
        Ly: "6.0",
        Nước_màu: "D",
        Độ_sạch: "IF",
        "Giá gốc": "256,468,000",
        "CTKM Đặc Biệt Giảm 8%": "235,950,000",
      },
      {
        Ly: "6.0",
        Nước_màu: "D",
        Độ_sạch: "VVS1",
        "Giá gốc": "237,500,000",
        "CTKM Đặc Biệt Giảm 8%": "218,500,000",
      },
      {
        Ly: "6.0",
        Nước_màu: "D",
        Độ_sạch: "VVS2",
        "Giá gốc": "194,990,000",
        "CTKM Đặc Biệt Giảm 8%": "179,390,000",
      },
      {
        Ly: "6.0",
        Nước_màu: "D",
        Độ_sạch: "VS1",
        "Giá gốc": "172,479,000",
        "CTKM Đặc Biệt Giảm 8%": "158,680,000",
      },
      {
        Ly: "6.0",
        Nước_màu: "D",
        Độ_sạch: "VS2",
        "Giá gốc": "153,250,000",
        "CTKM Đặc Biệt Giảm 8%": "140,990,000",
      },
      {
        Ly: "6.0",
        Nước_màu: "E",
        Độ_sạch: "IF",
        "Giá gốc": "213,979,000",
        "CTKM Đặc Biệt Giảm 8%": "196,860,000",
      },
      {
        Ly: "6.0",
        Nước_màu: "E",
        Độ_sạch: "VVS1",
        "Giá gốc": "199,990,000",
        "CTKM Đặc Biệt Giảm 8%": "183,990,000",
      },
      {
        Ly: "6.0",
        Nước_màu: "E",
        Độ_sạch: "VVS2",
        "Giá gốc": "183,468,000",
        "CTKM Đặc Biệt Giảm 8%": "168,790,000",
      },
      {
        Ly: "6.0",
        Nước_màu: "E",
        Độ_sạch: "VS1",
        "Giá gốc": "158,468,000",
        "CTKM Đặc Biệt Giảm 8%": "145,790,000",
      },
      {
        Ly: "6.0",
        Nước_màu: "E",
        Độ_sạch: "VS2",
        "Giá gốc": "148,805,000",
        "CTKM Đặc Biệt Giảm 8%": "136,900,000",
      },
      {
        Ly: "6.0",
        Nước_màu: "F",
        Độ_sạch: "IF",
        "Giá gốc": "202,990,000",
        "CTKM Đặc Biệt Giảm 8%": "186,750,000",
      },
      {
        Ly: "6.0",
        Nước_màu: "F",
        Độ_sạch: "VVS1",
        "Giá gốc": "186,805,000",
        "CTKM Đặc Biệt Giảm 8%": "171,860,000",
      },
      {
        Ly: "6.0",
        Nước_màu: "F",
        Độ_sạch: "VVS2",
        "Giá gốc": "177,990,000",
        "CTKM Đặc Biệt Giảm 8%": "163,750,000",
      },
      {
        Ly: "6.0",
        Nước_màu: "F",
        Độ_sạch: "VS1",
        "Giá gốc": "150,968,000",
        "CTKM Đặc Biệt Giảm 8%": "138,890,000",
      },
      {
        Ly: "6.0",
        Nước_màu: "F",
        Độ_sạch: "VS2",
        "Giá gốc": "139,990,000",
        "CTKM Đặc Biệt Giảm 8%": "128,790,000",
      },
    ],
    "6 Ly 3": [
      {
        Ly: "6.3",
        Nước_màu: "D",
        Độ_sạch: "IF",
        "Giá gốc": "412,990,000",
        "CTKM Đặc Biệt Giảm 8%": "379,950,000",
      },
      {
        Ly: "6.3",
        Nước_màu: "D",
        Độ_sạch: "VVS1",
        "Giá gốc": "357,990,000",
        "CTKM Đặc Biệt Giảm 8%": "329,350,000",
      },
      {
        Ly: "6.3",
        Nước_màu: "D",
        Độ_sạch: "VVS2",
        "Giá gốc": "285,750,000",
        "CTKM Đặc Biệt Giảm 8%": "262,890,000",
      },
      {
        Ly: "6.3",
        Nước_màu: "D",
        Độ_sạch: "VS1",
        "Giá gốc": "256,979,000",
        "CTKM Đặc Biệt Giảm 8%": "236,420,000",
      },
      {
        Ly: "6.3",
        Nước_màu: "D",
        Độ_sạch: "VS2",
        "Giá gốc": "247,805,000",
        "CTKM Đặc Biệt Giảm 8%": "227,980,000",
      },
      {
        Ly: "6.3",
        Nước_màu: "E",
        Độ_sạch: "IF",
        "Giá gốc": "346,468,000",
        "CTKM Đặc Biệt Giảm 8%": "318,750,000",
      },
      {
        Ly: "6.3",
        Nước_màu: "E",
        Độ_sạch: "VVS1",
        "Giá gốc": "323,250,000",
        "CTKM Đặc Biệt Giảm 8%": "297,390,000",
      },
      {
        Ly: "6.3",
        Nước_màu: "E",
        Độ_sạch: "VVS2",
        "Giá gốc": "271,685,000",
        "CTKM Đặc Biệt Giảm 8%": "249,950,000",
      },
      {
        Ly: "6.3",
        Nước_màu: "E",
        Độ_sạch: "VS1",
        "Giá gốc": "247,805,000",
        "CTKM Đặc Biệt Giảm 8%": "227,980,000",
      },
      {
        Ly: "6.3",
        Nước_màu: "E",
        Độ_sạch: "VS2",
        "Giá gốc": "228,805,000",
        "CTKM Đặc Biệt Giảm 8%": "210,500,000",
      },
      {
        Ly: "6.3",
        Nước_màu: "F",
        Độ_sạch: "IF",
        "Giá gốc": "325,935,000",
        "CTKM Đặc Biệt Giảm 8%": "299,860,000",
      },
      {
        Ly: "6.3",
        Nước_màu: "F",
        Độ_sạch: "VVS1",
        "Giá gốc": "303,805,000",
        "CTKM Đặc Biệt Giảm 8%": "279,500,000",
      },
      {
        Ly: "6.3",
        Nước_màu: "F",
        Độ_sạch: "VVS2",
        "Giá gốc": "260,750,000",
        "CTKM Đặc Biệt Giảm 8%": "239,890,000",
      },
      {
        Ly: "6.3",
        Nước_màu: "F",
        Độ_sạch: "VS1",
        "Giá gốc": "237,990,000",
        "CTKM Đặc Biệt Giảm 8%": "218,950,000",
      },
      {
        Ly: "6.3",
        Nước_màu: "F",
        Độ_sạch: "VS2",
        "Giá gốc": "214,990,000",
        "CTKM Đặc Biệt Giảm 8%": "197,790,000",
      },
      {
        Ly: "6.3 (>=1CT)",
        Nước_màu: "D",
        Độ_sạch: "IF",
        "Giá gốc": "542,120,000",
        "CTKM Đặc Biệt Giảm 8%": "498,750,000",
      },
      {
        Ly: "6.3 (>=1CT)",
        Nước_màu: "D",
        Độ_sạch: "VVS1",
        "Giá gốc": "455,979,000",
        "CTKM Đặc Biệt Giảm 8%": "419,500,000",
      },
      {
        Ly: "6.3 (>=1CT)",
        Nước_màu: "D",
        Độ_sạch: "VVS2",
        "Giá gốc": "383,468,000",
        "CTKM Đặc Biệt Giảm 8%": "352,790,000",
      },
      {
        Ly: "6.3 (>=1CT)",
        Nước_màu: "D",
        Độ_sạch: "VS1",
        "Giá gốc": "325,745,000",
        "CTKM Đặc Biệt Giảm 8%": "299,685,000",
      },
      {
        Ly: "6.3 (>=1CT)",
        Nước_màu: "D",
        Độ_sạch: "VS2",
        "Giá gốc": "308,468,000",
        "CTKM Đặc Biệt Giảm 8%": "283,790,000",
      },
      {
        Ly: "6.3 (>=1CT)",
        Nước_màu: "E",
        Độ_sạch: "IF",
        "Giá gốc": "464,990,000",
        "CTKM Đặc Biệt Giảm 8%": "427,790,000",
      },
      {
        Ly: "6.3 (>=1CT)",
        Nước_màu: "E",
        Độ_sạch: "VVS1",
        "Giá gốc": "378,805,000",
        "CTKM Đặc Biệt Giảm 8%": "348,500,000",
      },
      {
        Ly: "6.3 (>=1CT)",
        Nước_màu: "E",
        Độ_sạch: "VVS2",
        "Giá gốc": "368,968,000",
        "CTKM Đặc Biệt Giảm 8%": "339,450,000",
      },
      {
        Ly: "6.3 (>=1CT)",
        Nước_màu: "E",
        Độ_sạch: "VS1",
        "Giá gốc": "311,685,000",
        "CTKM Đặc Biệt Giảm 8%": "286,750,000",
      },
      {
        Ly: "6.3 (>=1CT)",
        Nước_màu: "E",
        Độ_sạch: "VS2",
        "Giá gốc": "299,990,000",
        "CTKM Đặc Biệt Giảm 8%": "275,990,000",
      },
      {
        Ly: "6.3 (>=1CT)",
        Nước_màu: "F",
        Độ_sạch: "IF",
        "Giá gốc": "389,990,000",
        "CTKM Đặc Biệt Giảm 8%": "358,790,000",
      },
      {
        Ly: "6.3 (>=1CT)",
        Nước_màu: "F",
        Độ_sạch: "VVS1",
        "Giá gốc": "368,995,000",
        "CTKM Đặc Biệt Giảm 8%": "339,475,000",
      },
      {
        Ly: "6.3 (>=1CT)",
        Nước_màu: "F",
        Độ_sạch: "VVS2",
        "Giá gốc": "347,479,000",
        "CTKM Đặc Biệt Giảm 8%": "319,680,000",
      },
      {
        Ly: "6.3 (>=1CT)",
        Nước_màu: "F",
        Độ_sạch: "VS1",
        "Giá gốc": "285,750,000",
        "CTKM Đặc Biệt Giảm 8%": "262,890,000",
      },
      {
        Ly: "6.3 (>=1CT)",
        Nước_màu: "F",
        Độ_sạch: "VS2",
        "Giá gốc": "279,620,000",
        "CTKM Đặc Biệt Giảm 8%": "257,250,000",
      },
    ],
    "6 Ly 8": [
      {
        Ly: "6.8",
        Nước_màu: "D",
        Độ_sạch: "IF",
        "Giá gốc": "683,685,000",
        "CTKM Đặc Biệt Giảm 8%": "628,990,000",
      },
      {
        Ly: "6.8",
        Nước_màu: "D",
        Độ_sạch: "VVS1",
        "Giá gốc": "598,685,000",
        "CTKM Đặc Biệt Giảm 8%": "550,790,000",
      },
      {
        Ly: "6.8",
        Nước_màu: "D",
        Độ_sạch: "VVS2",
        "Giá gốc": "489,990,000",
        "CTKM Đặc Biệt Giảm 8%": "450,790,000",
      },
      {
        Ly: "6.8",
        Nước_màu: "D",
        Độ_sạch: "VS1",
        "Giá gốc": "448,685,000",
        "CTKM Đặc Biệt Giảm 8%": "412,790,000",
      },
      {
        Ly: "6.8",
        Nước_màu: "D",
        Độ_sạch: "VS2",
        "Giá gốc": "433,468,000",
        "CTKM Đặc Biệt Giảm 8%": "398,790,000",
      },
      {
        Ly: "6.8",
        Nước_màu: "E",
        Độ_sạch: "IF",
        "Giá gốc": "541,250,000",
        "CTKM Đặc Biệt Giảm 8%": "497,950,000",
      },
      {
        Ly: "6.8",
        Nước_màu: "E",
        Độ_sạch: "VVS1",
        "Giá gốc": "539,990,000",
        "CTKM Đặc Biệt Giảm 8%": "496,790,000",
      },
      {
        Ly: "6.8",
        Nước_màu: "E",
        Độ_sạch: "VVS2",
        "Giá gốc": "432,500,000",
        "CTKM Đặc Biệt Giảm 8%": "397,900,000",
      },
      {
        Ly: "6.8",
        Nước_màu: "E",
        Độ_sạch: "VS1",
        "Giá gốc": "404,979,000",
        "CTKM Đặc Biệt Giảm 8%": "372,580,000",
      },
      {
        Ly: "6.8",
        Nước_màu: "E",
        Độ_sạch: "VS2",
        "Giá gốc": "346,468,000",
        "CTKM Đặc Biệt Giảm 8%": "318,750,000",
      },
      {
        Ly: "6.8",
        Nước_màu: "F",
        Độ_sạch: "IF",
        "Giá gốc": "498,685,000",
        "CTKM Đặc Biệt Giảm 8%": "458,790,000",
      },
      {
        Ly: "6.8",
        Nước_màu: "F",
        Độ_sạch: "VVS1",
        "Giá gốc": "488,979,000",
        "CTKM Đặc Biệt Giảm 8%": "449,860,000",
      },
      {
        Ly: "6.8",
        Nước_màu: "F",
        Độ_sạch: "VVS2",
        "Giá gốc": "368,250,000",
        "CTKM Đặc Biệt Giảm 8%": "338,790,000",
      },
      {
        Ly: "6.8",
        Nước_màu: "F",
        Độ_sạch: "VS1",
        "Giá gốc": "383,468,000",
        "CTKM Đặc Biệt Giảm 8%": "352,790,000",
      },
      {
        Ly: "6.8",
        Nước_màu: "F",
        Độ_sạch: "VS2",
        "Giá gốc": "346,468,000",
        "CTKM Đặc Biệt Giảm 8%": "318,750,000",
      },
    ],
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };
  return (
    <Container>
      <h2 className="tiu-de">
        Bảng Giá Kim Cương Tự Nhiên Kiểm Định GIA Cập Nhật Mới Nhất 2024
      </h2>
      <Breadcrumb style={{ margin: "16px 0", marginRight: "10px" }}>
        <Breadcrumb.Item>
          <Link to="/">Trang chủ</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          Bảng Giá Kim Cương Tự Nhiên Kiểm Định GIA Cập Nhật Mới Nhất 2024
        </Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="tiu-de2">
        Bảng Giá Kim Cương Tự Nhiên GIA Cập Nhật Mới Nhất 2024
      </h3>
      <div className="picture">
        <img src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/AKimcuongGia.png?alt=media&token=619b14e8-6b1e-4360-bcd3-5d62f3dcb1e4" />
      </div>

      <h2 className="tiu-de3">
        BẢNG GIÁ KIM CƯƠNG TỰ NHIÊN KIỂM ĐỊNH GIA – GIÁ TRỊ TOÀN CẦU
      </h2>
      <h4 className="tiu-de4">(Chính sách VIP, VVIP lên tới 105%)</h4>
      <h4 className="tiu-de4">
        Deal HOT mua kim cương giá tốt cập nhật tháng 5 năm 2024
      </h4>
      <h4 className="tiu-de41">
        Giá bán kim cương có thể thay đổi do thị trường
      </h4>
      <h5 className="tiu-de5">
        Đặc quyền online, Ưu đãi giảm thêm 1.000.000VNĐ cho đơn hàng từ 30 triệu
        áp dụng cho dòng sản phầm kim cương viên từ 4ly 5 đến 6ly.
      </h5>
      <h5 className="tiu-de6">
        Lưu ý: Không áp dụng đồng thời nhiều chương trình ưu đãi. Vui lòng liên
        hệ chuyên gia Diamond tư vấn để có giá chính xác và ưu đãi nhất: 0123
        456 789.
      </h5>
      {/* --------------------------------------------------------------------------------------------------------------- */}

      <div className="size-options">
        <div
          className={`size-option ${selectedSize === "4 Ly" ? "active" : ""}`}
          onClick={() => handleSizeClick("4 Ly")}
        >
          4 Ly
        </div>
        <div
          className={`size-option ${selectedSize === "4 Ly 5" ? "active" : ""}`}
          onClick={() => handleSizeClick("4 Ly 5")}
        >
          4 Ly 5
        </div>
        <div
          className={`size-option ${selectedSize === "5 Ly" ? "active" : ""}`}
          onClick={() => handleSizeClick("5 Ly")}
        >
          5 Ly
        </div>
        <div
          className={`size-option ${selectedSize === "5 Ly 4" ? "active" : ""}`}
          onClick={() => handleSizeClick("5 Ly 4")}
        >
          5 Ly 4
        </div>
        <div
          className={`size-option ${selectedSize === "6 Ly" ? "active" : ""}`}
          onClick={() => handleSizeClick("6 Ly")}
        >
          6 Ly
        </div>
        <div
          className={`size-option ${selectedSize === "6 Ly 3" ? "active" : ""}`}
          onClick={() => handleSizeClick("6 Ly 3")}
        >
          6 Ly 3
        </div>
        <div
          className={`size-option ${selectedSize === "6 Ly 8" ? "active" : ""}`}
          onClick={() => handleSizeClick("6 Ly 8")}
        >
          6 Ly 8
        </div>
        <div
          className={`size-option ${selectedSize === "7 Ly" ? "active" : ""}`}
          onClick={() => handleSizeClick("7 Ly")}
        >
          7 Ly
        </div>
        <div
          className={`size-option ${selectedSize === "7 Ly 2" ? "active" : ""}`}
          onClick={() => handleSizeClick("7 Ly 2")}
        >
          7 Ly 2
        </div>
        <div
          className={`size-option ${selectedSize === "8 Ly" ? "active" : ""}`}
          onClick={() => handleSizeClick("8 Ly")}
        >
          8 Ly
        </div>
        <div
          className={`size-option ${selectedSize === "8 Ly 1" ? "active" : ""}`}
          onClick={() => handleSizeClick("8 Ly 1")}
        >
          8 Ly 1
        </div>
      </div>
      <h3 className="tiu-dekc">GIÁ LẺ KIM CƯƠNG GIA {selectedSize}</h3>
      {selectedSize && priceData[selectedSize] ? (
        <div>
          <Table
            columns={columns}
            dataSource={priceData[selectedSize]}
            bordered
            pagination={false}
            className="custom-table"
          />
        </div>
      ) : (
        <h4 className="tiu-dekc">
          Liên hệ chuyên gia kim cương Diamond để có mức giá tốt nhất Hotline:
          0123 456 789
        </h4>
      )}

      {/* --------------------------------------------------------------------------------------------------------------- */}
      <h5 className="tiu-de7">
        Tại <span className="highlight-text">Diamond</span>, mỗi viên{" "}
        <span className="color-text">kim cương</span> trước khi được trưng bày
        đều trải qua quy trình tuyển chọn gắt gao và kiểm định nghiêm ngặt. Tất
        cả <span className="highlight-text">kim cương</span> tại chúng tôi đều
        được cấp giấy chứng nhận GIA đầy đủ minh bạch về nguồn gốc, có VAT đầy
        đủ, chuẩn bị sẵn sàng cho việc lựa chọn của quý khách.
      </h5>
      <h5 className="tiu-de7">
        Quý khách sẽ được tận hưởng dịch vụ tư vấn chuyên nghiệp ngay khi bước
        chân vào Showroom của Diamond. Đội ngũ nhân viên tư vấn tận tụy của
        chúng tôi sẽ cung cấp{" "}
        <span className="color-text">bảng giá kim cương thiên nhiên GIA </span>
        cập nhật và cạnh tranh, cũng như các thông tin cần thiết để Quý khách
        lựa chọn sản phẩm phù hợp nhất.
      </h5>
      <h5 className="tiu-de7">
        Đặc biệt với dịch vụ thiết kế trang sức theo yêu cầu, quy trình từ thiết
        kế đến chế tác sản phẩm sẽ tuân thủ chặt chẽ theo các tiêu chuẩn mà quý
        khách đề ra, đồng thời hoàn thành trong thời gian nhanh nhất.
      </h5>
      <h5 className="tiu-de7">
        Mọi thông tin chi tiết về các loại{" "}
        <span className="color-text">kim cương</span> có chất lượng 3EX-NONE,
        kim cương có nước G, độ sạch SI trở xuống,{" "}
        <span className="highlight-text">kim cương Fancy Shape</span> hoặc kim
        cương có trọng lượng từ 7ly trở lên, xin quý khách vui lòng liên hệ để
        được hỗ trợ và báo giá cụ thể.
      </h5>
      <h5 className="tiu-de7">
        Chúng tôi hiểu rằng quý khách xứng đáng nhận được{" "}
        <span className="color-text">viên kim cương thiên nhiên</span> viên kim
        cương thiên nhiên tuyệt vời nhất, phù hợp với mọi phân khúc ngân sách
        đầu tư. Với những viên{" "}
        <span className="color-text">
          kim cương thiên nhiên đã được kiểm định bởi GIA,
        </span>{" "}
        , chúng tôi mang đến bảng giá tham khảo chi tiết dựa trên các yếu tố
        <span className="color-text">
          Clarity (Độ sạch), Color (Nước), Fluorescence và None Fluorescence
        </span>
        cho từng kích thước viên kim cương phổ biến.
      </h5>
      <h5 className="tiu-de7">
        Nổi bật với chính sách phục vụ ưu tiên sự hài lòng của quý khách, dịch
        vụ tư vấn 1-1, phòng VIP sang trọng riêng tư, chúng tôi luôn sẵn sàng hỗ
        trợ quý khách tìm kiếm{" "}
        <span className="color-text">kim cương viên</span> thiên nhiên ưng ý
        nhất, tuân thủ chuẩn mực 4Cs và tiêu chí chuyên sâu như Triple X hay
        Fluorescence và None Fluorescence.
      </h5>
      <h5 className="tiu-de7">
        Chúng tôi mời quý khách liên hệ hotline{" "}
        <span className="color-text">0123 456 789</span> và đến trải nghiệm dịch
        vụ để sở hữu những viên kim cương đẳng cấp, là biểu tượng của vẻ đẹp và
        giá trị – đặc biệt dành riêng cho quý khách.
      </h5>
    </Container>
  );
}

export default BangGiaKimCuong;
