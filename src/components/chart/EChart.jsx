import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
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
  const items = [
    {
      title: "3,6K",
      user: "Users",
    },
    {
      title: "2m",
      user: "Clicks",
    },
    {
      title: "$772",
      user: "Sales",
    },
    {
      title: "82",
      user: "Items",
    },
  ];

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
          tỉ lệ tăng so với tháng trước <span className="bnb2">{percent}%</span>
        </Paragraph>
        <Paragraph className="lastweek">
          We have created multiple options for you to put together and customise
          into pixel perfect pages.
        </Paragraph>
        <Row gutter={[16, 16]}>
          {items.map((v, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={4}>{v.title}</Title>
                <span>{v.user}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default EChart;
