import React from "react";
import play from "../../../assests/images/play.svg";
import edit from "../../../assests/images/edit.svg";
import trash from "../../../assests/images/trash.svg";
import copy from "../../../assests/images/copy.svg";
import stop from "../../../assests/images/rstop.svg";

class ActionColumn extends React.PureComponent {
  constructor() {
    super();
    this.state = { isPlaying: false };
  }

  componentDidMount() {
    if (this.props.data["active"]) {
      this.setState({ isPlaying: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.data["active"] !== prevProps.data["active"]) {
      this.setState({ isPlaying: true });
    }
  }

  handleTogle() {
    const { isPlaying } = this.state;
    const { data } = this.props;
    this.setState({ isPlaying: !isPlaying });
    if (!isPlaying) {
      this.props.onStart(data);
    } else {
      this.props.onStop(data);
    }
  }

  render() {
    const { data, onDelete, onCopy, onEdit } = this.props;

    return (
      <div className="task-table-row-action">
        {!this.state.isPlaying ? (
          <img
            onClick={this.handleTogle.bind(this)}
            src={play}
            alt="play-icon"
          />
        ) : (
          <img
            onClick={this.handleTogle.bind(this)}
            src={stop}
            alt="stop-icon"
          />
        )}

        <img onClick={() => onEdit(data)} src={edit} alt="edit-icon" />
        <img onClick={() => onDelete(data)} src={trash} alt="trash-icon" />
        <img onClick={() => onCopy(data)} src={copy} alt="copy-icon" />
      </div>
    );
  }
}

export default ActionColumn;
