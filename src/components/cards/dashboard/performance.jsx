import React, { Fragment } from "react";
import PerformanceGraph from "../../chart/Line";
import IntlMessages from "../../../helpers/IntlMessages";
import ButtonDate from "../../small.componenets/Btn";
import { unclickedDate } from "../../../constants/buttonStatus";
import { connect } from "react-redux";
import { getPerformance } from "../../../redux/actions";
class Performance extends React.Component {
  componentDidMount() {
    this.props.getPerformance();
  }
  render() {
    const { lineData, lineLabels } = this.props.dashboard;
    //console.log(lineData);
    //console.log(lineLabels);

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
          <PerformanceGraph lineData={lineData} lineLabels={lineLabels} />
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
  getPerformance
})(Performance);

// <PerformanceGraph />
