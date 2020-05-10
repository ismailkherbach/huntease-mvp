import React, { Fragment } from "react";
import PerformanceGraph from "../../chart/Line";
import IntlMessages from "../../../helpers/IntlMessages";
import ButtonDate from "../../small.componenets/Btn";
import { unclickedDate, clickedDate } from "../../../constants/buttonStatus";
import { connect } from "react-redux";
import { getPerformance } from "../../../redux/actions";
class Performance extends React.Component {
  constructor(props) {
    super(props);
    this.state = { emptyBlock: true };
  }
  componentDidMount() {
    this.props.getPerformance();
    console.log(this.props.dashboard);
  }
  render() {
    const { lineData, lineLabels } = this.props.dashboard;
    //console.log(lineData);
    //console.log(lineLabels);

    return (
      <Fragment>
        <div id="performance" className="no-gutters mx-0">
          {" "}
          <h1 id="card-title-performance" className="float-right">
            44,5%
          </h1>
          <h1 id="card-title">
            {" "}
            <IntlMessages id="performance" />
          </h1>
          <div className="inlineBtn-left">
            <ButtonDate class={unclickedDate}>Weekly</ButtonDate>
            <ButtonDate class={unclickedDate}>Monthly</ButtonDate>
            <ButtonDate class={"compare-performance"}>Compare</ButtonDate>
          </div>
          <PerformanceGraph lineData={lineData} lineLabels={lineLabels} />
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
  getPerformance,
})(Performance);

// <PerformanceGraph />
