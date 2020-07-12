import React, { Fragment } from "react";
import IntlMessages from "../../../helpers/IntlMessages";
import CircleChart from "../../chart/Circle";
import ButtonDate from "../../small.componenets/Btn";
import { unclickedDate, clickedDate } from "../../../constants/buttonStatus";
import { Row, Col, Button } from "reactstrap";
import { connect } from "react-redux";
import { getEngagement } from "../../../redux/actions";

class Engagement extends React.Component {
  getEngagementFilter(critaria) {
    this.props.getEngagementFilter(critaria);
  }
  componentDidMount() {
    this.props.getEngagement();
  }
  render() {
    const {
      answeredCalls,
      talkDuration,
      callsPastTwo,
      conversionRate,
    } = this.props.dashboard;
    return (
      <div className="EngBloc">
        {" "}
        <div className="topBloc flex fdr aic jcc">
          <h2>Engagement Rate</h2>
        </div>
        <div class="flex fdc aic jcc">
          <img src={require("../../../assets/img/emptyEng.svg")} />
        </div>
        {/*
        <div className="topBloc flex fdr aic jcc">
          <h2>Engagement Rate</h2>
          <div className="toggleBloc flex fdr aic jcc">
            <Button className="toggle flex fdc aic jcc">Daily</Button>
            <Button className="toggle flex fdc aic jcc">Weekly</Button>
            <Button className="toggle toggleActive flex fdc aic jcc">
              Monthly
            </Button>
          </div>
        </div>
        <div className="rightSection flex fdr aic jcc">
          <div>
            <CircleChart />
          </div>
          <div className="section flex fdc aifs jcc">
            <div className="flex fdr aic jcc">
              <img alt="pt" src={require("../../../assets/img/blue_pt.png")} />
              <h5>Answered calls</h5>
            </div>
            <h2>{answeredCalls}</h2>

            <div className="flex fdc aifs jcc">
              <h5>Talk duration</h5>
              <h2>{talkDuration}</h2>
            </div>
          </div>

          <div className="flex fdc aifs jcc">
            <div className="flex fdr aic jcfs">
              <img
                alt="pt"
                src={require("../../../assets/img/orange_pt.png")}
              />
              <h5>Calls past 2 minutes</h5>
            </div>
            <h2>{callsPastTwo}</h2>

            <div className="flex fdc aifs jcc">
              <h5>Conversion Rate</h5>
              <h2>{conversionRate}</h2>
            </div>
          </div>
        </div>
*/}{" "}
      </div>
    );
  }
}

const mapStateToProps = ({ dashboard }) => {
  return {
    dashboard,
  };
};
export default connect(mapStateToProps, {
  getEngagement,
})(Engagement);
