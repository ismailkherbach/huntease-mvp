import React, { Fragment } from "react";
import Calls from "../../../components/cards/dashboard/calls";
import Meetings from "../../../components/cards/dashboard/meetings";
import Performance from "../../../components/cards/dashboard/performance";
import Engagement from "../../../components/cards/dashboard/engagement";
import TopSales from "../../../components/cards/dashboard/topsales";
export default class Dashboard extends React.Component {
  componentDidMount() {
    document.body.classList.add("background");
  }
  componentWillUnmount() {
    document.body.classList.remove("background");
  }
  render() {
    return (
      <Fragment>
        <div className="Dashboard">
          <div className="Dashboard-container flex fdr aic jcc">
            <Performance />
            <Calls />
            <Meetings />
            <Engagement />
            <TopSales />
          </div>
        </div>
        {/*  <div className="inlineBtn-center">
          <Performance />
          <Calls />
          <Meetings />
        </div>
        <div className="inlineBtn-center">
          <Engagement />
          <TopSales />
    </div>*/}
      </Fragment>
    );
  }
}
