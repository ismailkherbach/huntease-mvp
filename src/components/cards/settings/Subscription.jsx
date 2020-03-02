import React, { Fragment } from "react";
import { Row, Col } from "reactstrap";
import Terms from "./Terms";
import Helps from "./Helps";

const SubscriptionContent = ({ children }) => {
  return (
    <Fragment>
      <Row>
        <Col>
          <Row>
            <div id="subscription-card">
              <h3>Hello mister ismail your are in a free trial</h3>
            </div>
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
export default SubscriptionContent;
