import React from "react";
import "./styles.css";
import edit from "../../../assests/images/edit.svg";
import trash from "../../../assests/images/trash.svg";
import opener from "../../../assests/images/bopener.svg";

class SessionTableRow extends React.PureComponent {
  render() {
    const { index, onDelete, activeRow, onEdit, data, onPress, obj, style } =
      this.props;
    let customStyles = { ...style };
    customStyles["width"] = "99.5%";
    let sessionArr = data[index]?.account?.split(":");

    return (
      <div
        data-index={index}
        onClick={(event) => onPress({ row: data[index], event })}
        style={{
          ...customStyles,
        }}
        className={`account-table-stick-header body session-table session-table-row ${
          activeRow.length > 0 ? "selected-table-row" : ""
        }`}
      >
        <div style={{ width: "10%" }}>{index + 1}</div>
        <div style={{ width: "25%" }}>{sessionArr[0]}</div>
        <div style={{ width: "25%", marginLeft: "-5px" }}>
          {obj["passwordStatus"] ? (
            <input readOnly type="password" value={sessionArr[1]} />
          ) : (
            <input readOnly type="text" value={sessionArr[1]} />
          )}
        </div>
        <div
          className="session-status-col"
          style={
            data[index]?.status === "Idle"
              ? {
                  color: "var(--app-yellow)",
                  marginLeft: "-10px",
                }
              : { width: "27%" }
          }
        >
          {data[index]?.status}
        </div>
        <div className="sesion-table-row-action-wrapper">
          <img src={opener} alt="action-opener-icon" />
          <img
            onClick={() => onEdit(data[index])}
            src={edit}
            alt="action-edit-icon"
          />
          <img
            onClick={() => onDelete(data[index])}
            src={trash}
            alt="action-trash-icon"
          />
        </div>
      </div>
    );
  }
}

export default SessionTableRow;
