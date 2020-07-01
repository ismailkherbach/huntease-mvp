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
import { Button } from "reactstrap";
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
        <div className="CallBloc">
          <div className="topBloc flex fdr aic jcfs">
            <h2>Calls</h2>
            <h4>350</h4>
          </div>
          <div className="toggleBloc flex fdr aic jcc">
            <Button className="toggle toggleCalls flex fdc aic jcc">
              This week
            </Button>
            <Button className="toggle toggleCalls toggleActive flex fdc aic jcc">
              this month
            </Button>
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
