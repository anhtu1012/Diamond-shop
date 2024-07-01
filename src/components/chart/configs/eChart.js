import { useEffect, useState } from "react";
import { getTotalRevenve } from "../../../../services/Uservices";
function useFetchData() {
  const [dataE, setDataE] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTotalRevenve();
        setDataE(res.data.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return dataE;
}
export default function EChartConfig() {
  const dataE = useFetchData();
  const eChart = {
    series: [
      {
        name: "Tổng",
        data: dataE,
        color: "#fff",
      },
    ],

    options: {
      chart: {
        type: "bar",
        width: "100%",
        height: "auto",

        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "65%",
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
      },
      grid: {
        show: true,
        borderColor: "#ccc",
        strokeDashArray: 2,
      },
      xaxis: {
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
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: Array(12).fill("#fff"),
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: Array(12).fill("#fff"),
          },
          formatter: function (val) {
            return (val / 1000000).toFixed(0);
          },
        },
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
  return eChart;
}
