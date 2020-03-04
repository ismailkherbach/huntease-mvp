import React, { Fragment } from "react";
import IntlMessages from "../../../helpers/IntlMessages";
import CircleChart from "../../chart/Circle";
import ButtonDate from "../../small.componenets/Btn";
import { unclickedDate, clickedDate } from "../../../constants/buttonStatus";
import { Row, Col } from "reactstrap";
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
      conversionRate
    } = this.props.dashboard;
    return (
      <div id="engagement-rate">
        {" "}
        <Row>
          <Col>
            <h1 id="card-title">
              {" "}
              <IntlMessages id="engagementRate" />
            </h1>
          </Col>
          <Col>
            <div className="inlineBtn-right mt-2 mr-4">
              <ButtonDate class={unclickedDate}>Daily</ButtonDate>
              <ButtonDate class={clickedDate}>Weekly</ButtonDate>
              <ButtonDate class={unclickedDate}>Monthly</ButtonDate>
            </div>
          </Col>
        </Row>
        <Row className="mt-4 ml-4">
          <Col>
            <CircleChart />
          </Col>
          <Col className="no-gutters mx-0 col-3">
            <div className="stats">
              <div className="inlineBtn-left">
                <img
                  alt="pt"
                  src={require("../../../assets/img/blue_pt.png")}
                />
                <p>Answered calls</p>
              </div>
              <h3>{answeredCalls}</h3>
            </div>
            <div className="stats pt-4">
              <p>Talk duration</p>
              <h3>{talkDuration}</h3>
            </div>
          </Col>
          <Col className="no-gutters mx-0">
            <div className="stats">
              <div className="inlineBtn-left">
                <img
                  alt="pt"
                  src={require("../../../assets/img/orange_pt.png")}
                />
                <p>Calls past 2 minutes</p>
              </div>
              <h3>{callsPastTwo}</h3>
            </div>
            <div className="stats pt-4">
              <p>Conversion Rate</p>
              <h3>{conversionRate}</h3>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ dashboard }) => {
  return {
    dashboard
  };
};
export default connect(mapStateToProps, {
  getEngagement
})(Engagement);
