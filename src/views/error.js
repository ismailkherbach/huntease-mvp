import React from "react";

export default class Error extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="error flex fdc aic jcc">
          <img src={require("../assets/img/404.svg")} />
        </div>
      </React.Fragment>
    );
  }
}
