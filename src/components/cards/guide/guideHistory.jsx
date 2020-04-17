import React, { Fragment } from "react";
import "boxicons";

const GuideHistory = ({ children }) => {
  return (
    <Fragment>
      <div id="guide-history-card">
        <h5 id="card-title">Your Guides</h5>
        <div className="historyCard">
          <box-icon name="notepad" type="solid" color="#091ad4"></box-icon>

          <p>Guide N°01</p>
        </div>
        <div className="historyCard">
          <box-icon name="notepad" type="solid" color="#091ad4"></box-icon>

          <p>Guide N°02</p>
        </div>
        <div className="historyCard">
          <box-icon name="notepad" type="solid" color="#091ad4"></box-icon>
          <p>Guide N°03</p>
        </div>
      </div>
    </Fragment>
  );
};
export default GuideHistory;
