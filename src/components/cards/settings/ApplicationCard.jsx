import React, { Fragment } from "react";
import { Row, Col } from "reactstrap";
import Terms from "./Terms";
import Helps from "./Helps";

const ApplicationCard = ({ children }) => {
  return (
    <Fragment>
      <Row>
        <div className="settings-card">
          <Col>
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
                <div id="btn">Integrate</div>
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
                <div id="btn">Integrate</div>
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
                <div id="btn">Integrate</div>
              </Col>
            </Row>
            <Row>
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
                <div id="btn">Integrate</div>
              </Col>
              <Col id="application-card">
                <img
                  alt={"slack"}
                  src={require("../../../assets/img/slack.svg")}
                />
                <h2>Slack</h2>
                <p>
                  Phasellus finibus enim nulla, quis ornare odio facilisis eu.
                  Suspendisse ornare ante sit amet arcu semper,{" "}
                </p>
                <div id="btn">Integrate</div>
              </Col>
              <Col id="application-card">
                <img
                  alt={"googletasks"}
                  src={require("../../../assets/img/googletasks.svg")}
                />
                <h2>Google Tasks</h2>
                <p>
                  Phasellus finibus enim nulla, quis ornare odio facilisis eu.
                  Suspendisse ornare ante sit amet arcu semper,{" "}
                </p>
                <div id="btn">Integrate</div>
              </Col>
            </Row>
          </Col>
        </div>

        <Col>
          <Row>
            <div id="profil-card"></div>
          </Row>
          <Row className="pt-0">
            <Terms />
          </Row>
          <Row>
            <Helps />
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};
export default ApplicationCard;
