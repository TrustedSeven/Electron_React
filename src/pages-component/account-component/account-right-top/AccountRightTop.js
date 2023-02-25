import "./styles.css";
import upload from "../../../assests/images/upload.svg";
function AccountRightTop({ data }) {
  return (
    <div className="task-right-top-container">
      <div className="task-right-top-stats">
        <p>
          {data.type === "account-group"
            ? data?.accountList?.length || 0
            : data?.sessionList?.length || 0}
          {"\t\t"}Accounts
        </p>
        <div className="accounts-export-btn btn">
          <img src={upload} alt="upload-icon" />
          <span>Export</span>
        </div>
      </div>
      <div className="task-right-top-flex-container">
        <div className="task-right-top-left">
          <h2>{data.title || "Select Account / Session Group"}</h2>
        </div>
      </div>
    </div>
  );
}

export default AccountRightTop;
