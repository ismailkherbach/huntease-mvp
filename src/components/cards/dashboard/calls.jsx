import React, { Fragment } from "react";
import BarChart from "../../chart/Bar";
import Btn from "./../../small.componenets/Btn";
import IntlMessages from "../../../helpers/IntlMessages";

const Calls = ({ children }) => {
  return (
    <Fragment>
      <div id="calls" className="no-gutters mx-0">
        {" "}
        <h1 id="card-title">
          {" "}
          <IntlMessages id="calls" />
        </h1>
        <div className="inlineBtn-center">
          <Btn class={"date-filter-clicked"}>Weekly</Btn>
          <Btn class={"date-filter"}>Monthly</Btn>
        </div>
        <BarChart />
      </div>
    </Fragment>
  );
};
export default Calls;

//         <BarChart />
