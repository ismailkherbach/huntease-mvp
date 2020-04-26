import React, { Fragment } from "react";
import BarChart from "../../chart/Bar";
import Btn from "./../../small.componenets/Btn";
import {
  unclickedDate,
  clickedDate,
  unclickedDateLarge,
  clickedDateLarge,
} from "../../../constants/buttonStatus";
import IntlMessages from "../../../helpers/IntlMessages";
import { connect } from "react-redux";
import { getCalls } from "../../../redux/actions";
class Calls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getCalls();
    console.log(this.props.dashboard);
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
            <Btn class={clickedDateLarge}>This week</Btn>
            <Btn class={unclickedDateLarge}>This month</Btn>
          </div>
          {barData && barLabels && (
            <BarChart barData={barData} barLabels={barLabels} />
          )}
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ dashboard }) => {
  return {
    dashboard,
  };
};
export default connect(mapStateToProps, {
  getCalls,
})(Calls);

//         <BarChart />
