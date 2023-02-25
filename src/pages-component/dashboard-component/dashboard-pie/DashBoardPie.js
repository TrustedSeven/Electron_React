import React from "react";
import "./styles.css";
import { PieChart } from "react-minimal-pie-chart";
import { AppSpacer } from "../../../component";

function DashBoardPie({ stats }) {
  return (
    <div className="dashboard-pie-chart">
      <div className="dashboard-container-top">
        <h2>Checkout Statistics</h2>
        <span className="text-400">Today</span>
      </div>
      <div className="dashboard-pie-chart-inner">
        <PieChart
          startAngle={90}
          lineWidth={5}
          data={[
            {
              title: "Total carts",
              value: stats["totalCarts"],
              color: "#6fce6d",
            },
            {
              title: "Total checkouts",
              value: stats["totalCheckout"],
              color: "#f0c555",
            },
            {
              title: "Total declines",
              value: stats["totaldecline"],
              color: "#f05555",
            },
          ]}
        />
        <div className="pie-chart-center-container">
          <p className="text-700">$105483</p>
          <AppSpacer space={10} />
          <p className="text-400">Total Money Spent</p>
        </div>
      </div>
      <div className="dashboard-pie-chart-label">
        <div>
          <div className="green-indicator yellow" />
          <span className="text-400">Total Carts</span>
        </div>
        <div className="dashboard-pie-chart-ratio total-cart">
          <span className="text-700">{stats["totalCarts"]}</span>
        </div>
      </div>
      <div className="dashboard-pie-chart-label">
        <div>
          <div className="green-indicator green" />
          <span className="text-400">Total Checkouts</span>
        </div>
        <div className="dashboard-pie-chart-ratio">
          <span className="text-700">{stats["totalCheckout"]}</span>
          <span className="text-400 total">/{stats["totalCarts"]}</span>
        </div>
      </div>
      <div className="dashboard-pie-chart-label" style={{ border: "none" }}>
        <div>
          <div className="green-indicator red" />
          <span className="text-400">Total Declines</span>
        </div>
        <div className="dashboard-pie-chart-ratio">
          <span className="text-700">{stats["totaldecline"]}</span>
          <span className="text-400 total">/{stats["totalCarts"]}</span>
        </div>
      </div>
    </div>
  );
}

export default DashBoardPie;
