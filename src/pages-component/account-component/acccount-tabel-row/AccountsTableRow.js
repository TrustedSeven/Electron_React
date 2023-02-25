import React, { PureComponent } from "react";
import edit from "../../../assests/images/edit.svg";
import trash from "../../../assests/images/trash.svg";

class AccountsTableRow extends PureComponent {
  render() {
    const { index, onDelete, activeRow, onEdit, data, style, onPress, obj } =
      this.props;
    let customStyles = { ...style };
    customStyles["width"] = "99.5%";
    let acc = data[index]?.account?.split(":");

    return (
      <div
        data-index={index}
        onClick={(event) => onPress({ row: data[index], event })}
        style={{
          ...customStyles,
        }}
        className={`account-table-stick-header body   account-table-row  ${
          activeRow.length > 0 ? "selected-table-row" : ""
        } `}
      >
        <div>{index + 1}</div>
        <div style={{ width: "26%" }}>{acc[0] || "johndoe@gmail.com"}</div>
        <div>
          {obj["passwordStatus"] ? (
            <input
              readOnly
              type="password"
              className="passsord-holder"
              value={acc[1]}
            />
          ) : (
            acc[1]
          )}
        </div>
        <div>
          <div className="account-table-row-actions">
            <img
              onClick={() => onEdit(data[index])}
              src={edit}
              alt="edit-icon"
            />
            <img
              onClick={() => onDelete(data[index])}
              src={trash}
              alt="trash-icon"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AccountsTableRow;
