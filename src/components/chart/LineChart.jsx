import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import LChartConfig from "./configs/lineChart";
function LineChart() {
  const { Title, Paragraph } = Typography;
  const lineChart = LChartConfig();
  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Doanh Thu</Title>
          <Paragraph className="lastweek">
            so với ngày hôm qua <span className="bnb2">+30%</span>
          </Paragraph>
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
