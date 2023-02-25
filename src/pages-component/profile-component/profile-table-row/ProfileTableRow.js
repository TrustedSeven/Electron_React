import React from "react";
import edit from "../../../assests/images/edit.svg";
import trash from "../../../assests/images/trash.svg";
import copy from "../../../assests/images/copy.svg";
import arc from "../../../assests/images/arc.svg";

class ProfileTableRow extends React.PureComponent {
  render() {
    const { data, onDelete, onCopy, activeRow, onEdit, index, style, onPress } =
      this.props;
    let customStyles = { ...style };
    customStyles["width"] = "99.5%";

    return (
      <div
        data-index={index}
        onClick={(event) => onPress({ event, task: data[index] })}
        style={{
          ...customStyles,
        }}
        className={`profile-table-sticky-header body profile-table-row ${
          activeRow.length > 0 ? "selected-table-row" : ""
        } `}
      >
        <div>{data[index]?.cardDetails?.profileName}</div>
        <div>{data[index]?.cardDetails?.cardName}</div>
        <div>
          <div className="profile-flex-card-no">
            <div>
              <img src={arc} alt="arc-icon" />
            </div>
            <span>
              {`${data[index]?.cardDetails?.cardNumber}`.substring(14)}
            </span>
          </div>
        </div>
        <div style={{ overflowX: "hidden", paddingRight: "10px" }}>
          {!data[index]?.isBillingSameToShipping
            ? data[index]?.billingDetails?.address1
            : data[index]?.shippingDetails?.address1}
        </div>
        <div style={{ overflowX: "hidden" }}>
          {data[index]?.shippingDetails?.address1}
        </div>
        <div>
          <div className="profile-table-row-action-wrapper">
            <img
              onClick={() => onEdit(data[index])}
              src={edit}
              alt="edit-action-icon"
            />
            <img
              onClick={() => onDelete(data[index])}
              src={trash}
              alt="trash-action-icon"
            />
            <img
              onClick={() => onCopy(data[index])}
              src={copy}
              alt="copy-action-icon"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileTableRow;
