import React, { Fragment } from "react";

class CallProcess extends React.Component {
  render() {
    return (
      <Fragment>
        <div className="float-center inlineBtn-col mt-4">
          <img src={require("../../../assets/img/0.jpeg")} alt="avatar" />
          <h5>Ismail kherbach</h5>
          <h4>CTO At Huntease</h4>
          <h5 className="mt-4 mb-5">00:57</h5>

          <div className="inlineBtn-center pt-5">
            <div className="icon">
              <img
                src={require("../../../assets/img/call/record.png")}
                alt="record"
              />
            </div>
            <div className="icon">
              {" "}
              <img
                src={require("../../../assets/img/call/timer.png")}
                alt="timer"
              />
            </div>
            <div className="icon">
              {" "}
              <img
                src={require("../../../assets/img/call/mic.png")}
                alt="mic"
              />
            </div>
            <div className="icon">
              {" "}
              <img
                src={require("../../../assets/img/call/call.png")}
                alt="call"
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default CallProcess;
