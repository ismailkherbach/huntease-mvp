import React, { Fragment } from "react";
import { Row, Col } from "reactstrap";
import Terms from "./Terms";
import Helps from "./Helps";
import { connect } from "react-redux";
import {
  integrateHubspot,
  getIntegrations,
  deleteIntegration,
} from "../../../redux/actions";
import IntegrationHubspotPopup from "../../popup/IntegrationHubspotPopup";

class ApplicationCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showPopup: false };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  onRemoveIntegration() {
    this.props.deleteIntegration();
  }
  componentWillMount() {
    this.props.getIntegrations();
  }
  render() {
    return (
      <Fragment>
        {this.state.showPopup ? (
          <IntegrationHubspotPopup
            text='Click "Close Button" to hide popup'
            closePopup={this.togglePopup.bind(this)}
          />
        ) : null}

        <Row>
          <Col>
            <div id="settings-card" className="no-gutters mx-0">
              <Row>
                <Col id="application-card">
                  <img
                    alt={"hubspot"}
                    src={require("../../../assets/img/hubspot.svg")}
                  />
                  <h2>Hubspot</h2>
                  <p>
                    Phasellus finibus enim nulla, quis ornare odio facilisis eu.
                    Suspendisse ornare ante sit amet arcu semper,{" "}
                  </p>

                  {this.props.call.integrationStatus == "hubspot" ? (
                    <div
                      className="btn-remove"
                      onClick={this.onRemoveIntegration.bind(this)}
                    >
                      - Remove
                    </div>
                  ) : (
                    <div
                      className="btn-integrate"
                      onClick={this.togglePopup.bind(this)}
                    >
                      + Integrate
                    </div>
                  )}
                </Col>

                <Col id="application-card">
                  <img
                    alt={"zapier"}
                    src={require("../../../assets/img/zapier.svg")}
                  />
                  <h2>Zapier</h2>
                  <p>
                    Phasellus finibus enim nulla, quis ornare odio facilisis eu.
                    Suspendisse ornare ante sit amet arcu semper,{" "}
                  </p>
                  <div className="btn-integrate"> + Integrate</div>
                </Col>
                <Col id="application-card">
                  <img
                    alt={"zapier"}
                    src={require("../../../assets/img/zapier.svg")}
                  />
                  <h2>Zapier</h2>
                  <p>
                    Phasellus finibus enim nulla, quis ornare odio facilisis eu.
                    Suspendisse ornare ante sit amet arcu semper,{" "}
                  </p>
                  <div className="btn-integrate"> + Integrate</div>
                </Col>
                <Col id="application-card">
                  <img
                    alt={"calendly"}
                    src={require("../../../assets/img/calendly.svg")}
                  />
                  <h2>Calendly</h2>
                  <p>
                    Phasellus finibus enim nulla, quis ornare odio facilisis eu.
                    Suspendisse ornare ante sit amet arcu semper,{" "}
                  </p>
                  <div className="btn-integrate"> + Integrate</div>
                </Col>
              </Row>

              <Row>
                <Col id="application-card">
                  <img
                    alt={"hubspot"}
                    src={require("../../../assets/img/hubspot.svg")}
                  />
                  <h2>Hubspot</h2>
                  <p>
                    Phasellus finibus enim nulla, quis ornare odio facilisis eu.
                    Suspendisse ornare ante sit amet arcu semper,{" "}
                  </p>
                  <div className="btn-integrate"> + Integrate</div>
                </Col>

                <Col id="application-card">
                  <img
                    alt={"googlecalander"}
                    src={require("../../../assets/img/googlecalander.svg")}
                  />
                  <h2>Google Calander</h2>
                  <p>
                    Phasellus finibus enim nulla, quis ornare odio facilisis eu.
                    Suspendisse ornare ante sit amet arcu semper,{" "}
                  </p>
                  <div className="btn-integrate"> + Integrate</div>
                </Col>
                <Col id="application-card">
                  <img
                    alt={"zapier"}
                    src={require("../../../assets/img/zapier.svg")}
                  />
                  <h2>Zapier</h2>
                  <p>
                    Phasellus finibus enim nulla, quis ornare odio facilisis eu.
                    Suspendisse ornare ante sit amet arcu semper,{" "}
                  </p>
                  <div className="btn-integrate"> + Integrate</div>
                </Col>
                <Col id="application-card">
                  <img
                    alt={"calendly"}
                    src={require("../../../assets/img/calendly.svg")}
                  />
                  <h2>Calendly</h2>
                  <p>
                    Phasellus finibus enim nulla, quis ornare odio facilisis eu.
                    Suspendisse ornare ante sit amet arcu semper,{" "}
                  </p>
                  <div className="btn-integrate"> + Integrate</div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ call }) => {
  return {
    call,
  };
};

export default connect(mapStateToProps, {
  getIntegrations,
  deleteIntegration,
})(ApplicationCard);
