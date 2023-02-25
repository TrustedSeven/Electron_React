import React, { PureComponent } from "react";
import edit from "../../../assests/images/edit.svg";
import trash from "../../../assests/images/trash.svg";
import copy from "../../../assests/images/copy.svg";

class ProxyTableRow extends PureComponent {
  render() {
    const { onEdit, onDelete, onCopy, activeRow, data, index, style, onPress } =
      this.props;
    let proxy = data[index]?.title?.split(":");
    let customStyles = { ...style };
    customStyles["width"] = "99.5%";

    return (
      <div
        onClick={(event) => onPress({ event, row: data[index] })}
        style={{
          ...customStyles,
        }}
        className={`proxy-table-stick-header body proxy   proxy-table-row ${
          activeRow.length > 0 ? "selected-table-row" : ""
        } `}
      >
        <div>
          {proxy !== undefined &&
            (proxy.length === 0
              ? proxy[0]
              : proxy[1] !== undefined
              ? `${proxy[0]}:${proxy[1]}`
              : `${proxy[0]}`)}
        </div>
        <div>{proxy?.length >= 3 ? proxy[2] : "n/a"}</div>
        <div>{proxy?.length >= 4 ? proxy[3] : "n/a"}</div>
        <div>
          <div className="proxy-table-row-actions proxy">
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
            <img
              onClick={() => onCopy(data[index])}
              src={copy}
              alt="copy-icon"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ProxyTableRow;
