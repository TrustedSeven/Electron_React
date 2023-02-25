import React from "react";
import { useSelector } from "react-redux";
import { AppSpacer } from "../../component";
import { fetchDasboardStatisticsState } from "../../features/counterSlice";
import {
  DashBoardPageLineGraph,
  DashBoardPagePieGraph,
  DashboardPageScrollTable,
  DashBoardPageTop,
} from "../../pages-component";
import "./dashboard.css";

function Dashboard() {
  const stats = useSelector(fetchDasboardStatisticsState);
  return (
    <div className="dashboard-container">
      <div className="dashboard-container-left">
        <DashBoardPageTop />
        <DashboardPageScrollTable />
      </div>
      <div className="dashboard-container-right">
        <AppSpacer space={40} />
        <DashBoardPageLineGraph />
        <AppSpacer space={20} />
        <DashBoardPagePieGraph {...{ stats }} />
      </div>
    </div>
  );
}

export default Dashboard;
