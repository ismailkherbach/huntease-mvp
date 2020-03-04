import React, { Fragment } from "react";
import BarChart from "../../chart/Bar";
import Btn from "./../../small.componenets/Btn";
import { unclickedDate, clickedDate } from "../../../constants/buttonStatus";
import IntlMessages from "../../../helpers/IntlMessages";
import { connect } from "react-redux";
import { getCalls } from "../../../redux/actions";
class Calls extends React.Component {
  componentDidMount() {
    this.props.getCalls();
  }
  render() {
    const { barData, barLabels } = this.props.dashboard;
    return (
      <Fragment>
        <div id="calls">
          {" "}
          <h1 id="card-title-right" className="float-right">
            Total: 605
          </h1>{" "}
          <h1 id="card-title">
            {" "}
            <IntlMessages id="calls" />
          </h1>
          <div className="inlineBtn-center">
            <Btn class={clickedDate}>Weekly</Btn>
            <Btn class={unclickedDate}>Monthly</Btn>
          </div>
          <BarChart barData={barData} barLabels={barLabels} />
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ dashboard }) => {
  return {
    dashboard
  };
};
export default connect(mapStateToProps, {
  getCalls
})(Calls);

//         <BarChart />
