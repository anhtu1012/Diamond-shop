import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import LChartConfig from "./configs/lineChart";
import { useEffect, useState } from "react";
import { getCompareDay } from "../../../services/Uservices";
function LineChart() {
  const { Title, Paragraph } = Typography;
  const lineChart = LChartConfig();
  const [compareDay, setCompareDay] = useState(0);
  useEffect(() => {
    const fetchFetCompareDay = async () => {
      const res = await getCompareDay();
      setCompareDay(res.data.data);
    };
    fetchFetCompareDay();
  }, [compareDay]);
  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Doanh Thu</Title>
          {compareDay !== null ? (
            <Paragraph className="lastweek">
              so với ngày hôm qua <span className="bnb2">{compareDay}%</span>
            </Paragraph>
          ) : (
            ""
          )}
        </div>
        <div className="sales">
          <ul>
            <li>
              <MinusOutlined /> Kim Cương
            </li>
            <li>
              <MinusOutlined /> Sản phẩm Tùy Chỉnh
            </li>
          </ul>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={lineChart.series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
