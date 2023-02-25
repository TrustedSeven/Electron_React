import React, { useRef, useState, useEffect } from "react";
import "./styles.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { fetchDashboardAnalyticsState } from "../../../features/counterSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const labels = ["Non 5", "Nov 6", "Nov 7", "Nov 8", "Nov 9"];

ChartJS.defaults.font.size = 14;
ChartJS.defaults.font.family = "SF-400";
ChartJS.defaults.font.style = "normal";

function DashboardLineChart() {
  const chartRef = useRef(null);
  const [bgColor, setBgColor] = useState("");
  const lineDataObj = useSelector(fetchDashboardAnalyticsState);
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) {
      return;
    }
    let backgroundColor = createBackgroundGradients(chart.ctx, chart.chartArea);
    setBgColor(backgroundColor);
  }, []);

  return (
    <div>
      <div className="dashboard-container-top">
        <h2>Analytics</h2>
      </div>
      <Line
        ref={chartRef}
        data={{
          labels: lineDataObj.xAxis || labels,
          datasets: [
            {
              label: "Dataset 1",
              data: [22, 15, 10, 40, 45, 50, 30, 20],
              borderColor: "#598dc5",
              backgroundColor: bgColor,
              tension: 0.5,
              fill: true,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: false,
            },
            tooltip: {
              mode: "index",
            },
          },
          animations: {
            tension: {
              duration: 1000,
              easing: "linear",
            },
          },
          maintainAspectRatio: true,
          hover: {
            intersect: false,
          },
          elements: {
            line: {
              tension: 1,
            },
            point: {
              radius: 0,
            },
          },
          scales: {
            y: {
              ticks: {
                color: "#517FB4",
                stepSize: 10,
              },
              grid: {
                display: true,
                borderDash: [6],
                borderColor: "rgb(17, 25, 48)",
                color: function () {
                  return "rgba(81, 127, 180, 0.7)";
                },
                tickColor: "rgb(17, 25, 48)",
              },
              min: 0,
              max: 50,
            },
            x: {
              grid: {
                display: false,
                borderDash: [5],
                color: "#ffffff",
              },

              ticks: {
                color: "#517FB4",
              },
            },
          },
        }}
      />
    </div>
  );
}

export default DashboardLineChart;

function createBackgroundGradients(ctx, area) {
  const gradient = ctx.createLinearGradient(0, area.top, 0, area.bottom);
  gradient.addColorStop(0, "#598dc5");
  gradient.addColorStop(0.5, " rgba(89, 141, 197, 0.15)");
  gradient.addColorStop(1, "rgba(89, 141, 197, 0)");
  return gradient;
}
