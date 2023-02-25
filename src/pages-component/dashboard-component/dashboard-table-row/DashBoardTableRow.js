import React from "react";
import "./styles.css";
import xbox from "../../../assests/images/xbox.svg";

function DashBoardTableRow({ data }) {
  return (
    <div className="dashboard-table-stick-header body">
      <div>
        <div id="product-container">
          <img src={data["productImage"] || xbox} alt="product-preview" />
          <span className="text-500">{data["productName"]}</span>
        </div>
      </div>
      <div>{data["checkoutSite"]}</div>
      <div>{data["productSize"]}</div>
      <div>{data["checkoutTime"]}</div>
    </div>
  );
}

export default DashBoardTableRow;
