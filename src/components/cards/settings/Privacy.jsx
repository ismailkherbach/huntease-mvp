import React, { Fragment } from "react";
import { Row, Col, Input } from "reactstrap";
import Terms from "./Terms";
import Helps from "./Helps";

const PrivacySetting = ({ children }) => {
  return (
    <Fragment>
      <Row>
        <Col>
          <Row>
            <div id="privacy-card">
              <Col>
                <Row>
                  <Col>
                    <div id="field-top">Email address</div>
                    <div className="inlineBtn-left">
                      <Input id="field" className="mr-5" />
                      <div id="field-button">Change Email</div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div id="field-top">Current password</div>
                    <div className="inlineBtn-left">
                      <Input id="field" className="mr-5" />
                      <div id="field-button">Change password</div>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <div id="field-top">New password</div>
                    <Input id="field" />
                  </Col>

                  <Col>
                    <div id="field-top">Confirm password</div>
                    <Input id="field" />
                  </Col>
                </Row>
              </Col>
            </div>
          </Row>{" "}
          <Row>
            <div id="twofactor-card"></div>
          </Row>
        </Col>
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
export default PrivacySetting;
