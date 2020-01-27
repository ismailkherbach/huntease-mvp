import React from "react";
class ButtonDate extends React.Component {
  render() {
    return (
      <div className="inlineBtn-center">
        <div className={this.props.class}>{this.props.children}</div>
      </div>
    );
  }
}

export default ButtonDate;
