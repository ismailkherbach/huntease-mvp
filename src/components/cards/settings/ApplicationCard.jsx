import React, { Fragment } from "react";
import { Row, Col } from "reactstrap";
import Terms from "./Terms";
import Helps from "./Helps";

const ApplicationCard = ({ children }) => {
  return (
    <Fragment>
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
            </Row>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};
export default ApplicationCard;
