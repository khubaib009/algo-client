import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = ({ product }) => {
  const [chartData, setChartData] = useState({
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        height: 400, // Fixed height in options
        width: "100%",
        type: "pie",
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 400, // Smaller width for smaller screens
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    const instrumentCounts = {};

    // Iterate through each product and count instruments
    product.forEach((prod) => {
      if (instrumentCounts[prod.instrument_name]) {
        instrumentCounts[prod.instrument_name]++;
      } else {
        instrumentCounts[prod.instrument_name] = 1;
      }
    });

    // Update chart data when instrument counts change
    const updatedChartData = {
      series: Object.values(instrumentCounts),
      options: {
        ...chartData.options, // Maintain chart options, only update labels
        labels: Object.keys(instrumentCounts),
      },
    };

    setChartData(updatedChartData);
  }, [product]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          width={650}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
