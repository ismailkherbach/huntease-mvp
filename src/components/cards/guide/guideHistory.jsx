import React, { Fragment } from "react";

const GuideHistory = ({ children }) => {
  return (
    <Fragment>
      <div id="guide-history-card">
        <h5 id="card-title">Recent Conversational Guides</h5>
        <div className="historyCard">
          <img
            className="icon"
            alt={"search"}
            src={require("../../../assets/img/folder.svg")}
          />
          <p>Guide N°01</p>
        </div>
        <div className="historyCard">
          <img
            className="icon"
            alt={"search"}
            src={require("../../../assets/img/folder.svg")}
          />
          <p>Guide N°02</p>
        </div>
        <div className="historyCard">
          <img
            className="icon"
            alt={"search"}
            src={require("../../../assets/img/folder.svg")}
          />
          <p>Guide N°03</p>
        </div>

        <h5 id="card-title">Guides Sorted by tags</h5>

        <div className="historyCard">
          <img
            className="icon"
            alt={"search"}
            src={require("../../../assets/img/folder-open.svg")}
          />
          <p>CEO</p>
        </div>
        <div className="historyCard">
          <img
            className="icon"
            alt={"search"}
            src={require("../../../assets/img/folder-open.svg")}
          />
          <p>SDR</p>
        </div>
        <div className="historyCard">
          <img
            className="icon"
            alt={"search"}
            src={require("../../../assets/img/folder-open.svg")}
          />
          <p>Undifined</p>
        </div>
      </div>
    </Fragment>
  );
};
export default GuideHistory;
