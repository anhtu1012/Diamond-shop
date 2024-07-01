import { useEffect, useState } from "react";
import {
  getRevenveCustomize,
  getRevenveDiamond,
} from "../../../../services/Uservices";

// Custom hook to fetch data
function useFetchData() {
  const [dataD, setDataD] = useState([]);
  const [dataC, setDataC] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resD = await getRevenveDiamond();
        const resC = await getRevenveCustomize();
        setDataD(resD.data.data);
        setDataC(resC.data.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return { dataD, dataC };
}

// Line chart configuration
export default function LChartConfig() {
  const { dataD, dataC } = useFetchData();

  const lineChart = {
    series: [
      {
        name: "Kim Cương",
        data: dataD,
        offsetY: 0,
      },
      {
        name: "Sản phẩm tùy chỉnh",
        data: dataC,
        offsetY: 0,
      },
    ],

    options: {
      chart: {
        width: "100%",
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: ["#8c8c8c"],
          },
          formatter: function (val) {
            return (val / 1000000).toFixed(0); 
          },
        },
      },
      xaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: Array(12).fill("#8c8c8c"),
          },
        },
        categories: [
          "T1",
          "T2",
          "T3",
          "T4",
          "T5",
          "T6",
          "T7",
          "T8",
          "T9",
          "T10",
          "T11",
          "T12",
        ],
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val.toLocaleString("vi-VN") + " vnđ";
          },
        },
      },
    },
  };

  return lineChart;
}
