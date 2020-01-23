import React, { PureComponent, Fragment } from "react";
import BarChart from "../../chart/Bar";
import IntlMessages from "../../../helpers/IntlMessages";
import { Button } from "reactstrap";

const Calls = ({ children }) => {
  return (
    <Fragment>
      <div id="calls">
        {" "}
        <h1 id="card-title">
          {" "}
          <IntlMessages id="calls" />
        </h1>
        <div className="inlineBtn-center">
          <div className="date-filter">Daily</div>
          <div className="date-filter">Weekly</div>
          <div className="date-filter">Monthly</div>
        </div>
        <BarChart />
      </div>
    </Fragment>
  );
};
export default Calls;

//         <BarChart />
