import React, { Fragment } from "react";
import PerformanceGraph from "../../chart/Line";
import IntlMessages from "../../../helpers/IntlMessages";
import ButtonDate from "../../small.componenets/Btn";
import { unclickedDate, clickedDate } from "../../../constants/buttonStatus";

const Performance = ({ children }) => {
  return (
    <Fragment>
      <div id="performance" className="no-gutters mx-0">
        {" "}
        <h1 id="card-title">
          {" "}
          <IntlMessages id="performance" />
        </h1>
        <div className="inlineBtn-left">
          <ButtonDate class={unclickedDate}>Weekly</ButtonDate>
          <ButtonDate class={unclickedDate}>Monthly</ButtonDate>
        </div>
        <PerformanceGraph />
      </div>
    </Fragment>
  );
};
export default Performance;

// <PerformanceGraph />
