import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import useFetchData from "./configs/eChart";
import { useEffect, useState } from "react";
import { getCompareMonth } from "../../../services/Uservices";

function EChart() {
  const { Title, Paragraph } = Typography;
  const eChart = useFetchData();
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    const fetchPercent = async () => {
      const res = await getCompareMonth();
      setPercent(res.data.data);
    };
    fetchPercent();
  }, [percent]);
  
  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={220}
        />
      </div>
      <div className="chart-vistior">
        <Title level={5}>Tổng Doanh Thu Từng Tháng</Title>
        <Paragraph className="lastweek">
          tỉ lệ tăng so với tháng trước{" "}
          <span className="bnb2" style={{ color: percent < 0 ? "red" : "" }}>
            {percent}%
          </span>
        </Paragraph>
        <Paragraph className="lastweek">
          Đây là bảng doanh thu của cửa hàng trong 1 năm (12 tháng).
        </Paragraph>
      </div>
    </>
  );
}

export default EChart;
