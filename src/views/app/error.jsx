import React, { Fragment } from "react";

export default class Error extends React.Component {
  render() {
    return (
      <div className="error flex fdc aic jcc">
        <img src={require("../../assets/home_assets/404.svg")} />
      </div>
    );
  }
}
