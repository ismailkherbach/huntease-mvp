import React, { Fragment } from "react";
import PerformanceGraph from "../../chart/Line";
import IntlMessages from "../../../helpers/IntlMessages";
import ButtonDate from "../../small.componenets/Btn";
import { unclickedDate, clickedDate } from "../../../constants/buttonStatus";
import { connect } from "react-redux";
import { getPerformance } from "../../../redux/actions";
import { Button } from "reactstrap";
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
        <div className="PerMetBloc flex fdc aic">
          <div className="topBloc flex fdr aic jcfs">
            <h2>Performance</h2>
            {/* <h4>22%</h4>*/}
          </div>
          {/*    <div className="toggleBloc flex fdr aic jcc">
            <Button className="toggle flex fdc aic jcc">Weekly</Button>
            <Button className="toggle toggleActive flex fdc aic jcc">
              Monthly
            </Button>
            <Button className="toggle compare flex aic jcc">Compare</Button>
    </div>*/}
          <div className="flex fdc aic jcc">
            <img src={require("../../../assets/img/emptyPer.svg")} />
          </div>
          {/*<PerformanceGraph lineData={lineData} lineLabels={lineLabels} />*/}
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
