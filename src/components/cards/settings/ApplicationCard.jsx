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
        <div className="Applications flex fdr aic jcfs">
          <div className="App-card flex aic fdc jcc">
            <div className="flex fdc aifs jcfs">
              <div className="flex fdr aifs jcfs">
                <img
                  alt={"hubspot"}
                  src={require("../../../assets/img/hubspot.svg")}
                />
                <div className="flex fdc aifs jcfs">
                  <h2>Hubspot</h2>
                  <h5>CRM</h5>
                </div>
              </div>
              <p>
                Phasellus finibus enim nulla, quis ornare odio facilisis eu.
                Suspendisse ornare ante sit amet arcu semper,{" "}
              </p>
            </div>
            {this.props.call.integrationStatus == "hubspot" ? (
              <div
                className="integrate-button flex fdc aic jcc"
                onClick={this.onRemoveIntegration.bind(this)}
              >
                Remove
              </div>
            ) : (
              <div
                className="integrate-button flex fdc aic jcc"
                onClick={this.togglePopup.bind(this)}
              >
                + Integrate
              </div>
            )}
          </div>
          <div className="App-card flex aic fdc jcc blured disable-select">
            <div className="flex fdc aifs jcfs">
              <div className="flex fdr aifs jcfs">
                <img
                  alt={"hubspot"}
                  src={require("../../../assets/img/pipdrive.svg")}
                />
                <div className="flex fdc aifs jcfs">
                  <h2>Pipdrive</h2>
                  <h5>CRM</h5>
                </div>
              </div>
              <p>
                Phasellus finibus enim nulla, quis ornare odio facilisis eu.
                Suspendisse ornare ante sit amet arcu semper,{" "}
              </p>
            </div>
            {this.props.call.integrationStatus == "hubspot" ? (
              <div
                className="integrate-button flex fdc aic jcc"
                //onClick={this.onRemoveIntegration.bind(this)}
              >
                Remove
              </div>
            ) : (
              <div
                className="integrate-button flex fdc aic jcc disable-select"
                onClick={this.togglePopup.bind(this)}
              >
                + Integrate
              </div>
            )}
          </div>
          <div className="App-card flex aic fdc jcc blured disable-select">
            <div className="flex fdc aifs jcfs">
              <div className="flex fdr aifs jcfs">
                <img
                  alt={"hubspot"}
                  src={require("../../../assets/img/salesforce.svg")}
                />
                <div className="flex fdc aifs jcfs">
                  <h2>Salesforce</h2>
                  <h5>CRM</h5>
                </div>
              </div>
              <p>
                Phasellus finibus enim nulla, quis ornare odio facilisis eu.
                Suspendisse ornare ante sit amet arcu semper,{" "}
              </p>
            </div>
            {this.props.call.integrationStatus == "hubspot" ? (
              <div
                className="integrate-button flex fdc aic jcc"
                // onClick={this.onRemoveIntegration.bind(this)}
              >
                Remove
              </div>
            ) : (
              <div
                className="integrate-button flex fdc aic jcc"
                onClick={this.togglePopup.bind(this)}
              >
                + Integrate
              </div>
            )}
          </div>
          <div className="App-card flex aic fdc jcc blured disable-select">
            <div className="flex fdc aifs jcfs">
              <div className="flex fdr aifs jcfs">
                <img
                  alt={"hubspot"}
                  src={require("../../../assets/img/gong.svg")}
                />
                <div className="flex fdc aifs jcfs">
                  <h2>Gong.io</h2>
                  <h5>CRM</h5>
                </div>
              </div>
              <p>
                Phasellus finibus enim nulla, quis ornare odio facilisis eu.
                Suspendisse ornare ante sit amet arcu semper,{" "}
              </p>
            </div>
            {this.props.call.integrationStatus == "hubspot" ? (
              <div
                className="integrate-button flex fdc aic jcc"
                // onClick={this.onRemoveIntegration.bind(this)}
              >
                Remove
              </div>
            ) : (
              <div
                className="integrate-button flex fdc aic jcc"
                onClick={this.togglePopup.bind(this)}
              >
                + Integrate
              </div>
            )}
          </div>
        </div>
        <div className="Applications flex fdr aic jcfs disable-select">
          <div className="App-card flex aic fdc jcc blured">
            <div className="flex fdc aifs jcfs">
              <div className="flex fdr aifs jcfs">
                <img
                  alt={"hubspot"}
                  src={require("../../../assets/img/zapier.svg")}
                />
                <div className="flex fdc aifs jcfs">
                  <h2>Zapier</h2>
                  <h5>CRM</h5>
                </div>
              </div>
              <p>
                Phasellus finibus enim nulla, quis ornare odio facilisis eu.
                Suspendisse ornare ante sit amet arcu semper,{" "}
              </p>
            </div>
            {this.props.call.integrationStatus == "hubspot" ? (
              <div
                className="integrate-button flex fdc aic jcc"
                // onClick={this.onRemoveIntegration.bind(this)}
              >
                Remove
              </div>
            ) : (
              <div
                className="integrate-button flex fdc aic jcc"
                onClick={this.togglePopup.bind(this)}
              >
                + Integrate
              </div>
            )}
          </div>
          <div className="App-card flex aic fdc jcc blured">
            <div className="flex fdc aifs jcfs">
              <div className="flex fdr aifs jcfs">
                <img
                  alt={"hubspot"}
                  src={require("../../../assets/img/calender.svg")}
                />
                <div className="flex fdc aifs jcfs">
                  <h2>G. Calendar</h2>
                  <h5>CRM</h5>
                </div>
              </div>
              <p>
                Phasellus finibus enim nulla, quis ornare odio facilisis eu.
                Suspendisse ornare ante sit amet arcu semper,{" "}
              </p>
            </div>
            {this.props.call.integrationStatus == "hubspot" ? (
              <div
                className="integrate-button flex fdc aic jcc"
                //  onClick={this.onRemoveIntegration.bind(this)}
              >
                Remove
              </div>
            ) : (
              <div
                className="integrate-button flex fdc aic jcc"
                onClick={this.togglePopup.bind(this)}
              >
                + Integrate
              </div>
            )}
          </div>
          <div className="App-card flex aic fdc jcc blured">
            <div className="flex fdc aifs jcfs">
              <div className="flex fdr aifs jcfs">
                <img
                  alt={"hubspot"}
                  src={require("../../../assets/img/calandly.svg")}
                />
                <div className="flex fdc aifs jcfs">
                  <h2>Calandly</h2>
                  <h5>CRM</h5>
                </div>
              </div>
              <p>
                Phasellus finibus enim nulla, quis ornare odio facilisis eu.
                Suspendisse ornare ante sit amet arcu semper,{" "}
              </p>
            </div>
            {this.props.call.integrationStatus == "hubspot" ? (
              <div
                className="integrate-button flex fdc aic jcc"
                //  onClick={this.onRemoveIntegration.bind(this)}
              >
                Remove
              </div>
            ) : (
              <div
                className="integrate-button flex fdc aic jcc"
                onClick={this.togglePopup.bind(this)}
              >
                + Integrate
              </div>
            )}
          </div>
          <div className="App-card flex aic fdc jcc blured">
            <div className="flex fdc aifs jcfs">
              <div className="flex fdr aifs jcfs">
                <img
                  alt={"hubspot"}
                  src={require("../../../assets/img/gtasks.svg")}
                />
                <div className="flex fdc aifs jcfs">
                  <h2>Google Tasks</h2>
                  <h5>CRM</h5>
                </div>
              </div>
              <p>
                Phasellus finibus enim nulla, quis ornare odio facilisis eu.
                Suspendisse ornare ante sit amet arcu semper,{" "}
              </p>
            </div>
            {this.props.call.integrationStatus == "hubspot" ? (
              <div
                className="integrate-button flex fdc aic jcc"
                //     onClick={this.onRemoveIntegration.bind(this)}
              >
                Remove
              </div>
            ) : (
              <div
                className="integrate-button flex fdc aic jcc"
                onClick={this.togglePopup.bind(this)}
              >
                + Integrate
              </div>
            )}
          </div>
        </div>
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
