import React from "react";
import "./dashboard-table.css";
import DashBoardTableRow from "../dashboard-table-row/DashBoardTableRow";
import { fetchCheckoutTableState } from "../../../features/counterSlice";
import { useSelector } from "react-redux";
function DashBoardTable() {
  const list = useSelector(fetchCheckoutTableState);

  return (
    <div className="dashboard-table-container">
      <h2 className="text-700">Recent Checkouts</h2>
      <div className="dashboard-table-stick-header">
        <div className="text-400">Product</div>
        <div className="text-400">Site</div>
        <div className="text-400">Size</div>
        <div className="text-400">Date</div>
      </div>
      <div className="dashboard-table-container-scroll">
        {list?.map((data, i) => (
          <DashBoardTableRow
            {...{ data }}
            key={`dashboard-table-row-key-${i}`}
          />
        ))}
      </div>
    </div>
  );
}

export default DashBoardTable;
