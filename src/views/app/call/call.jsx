import React, { Fragment } from "react";
import ScriptCard from "../../../components/cards/call/ScriptCard";
import CallCard from "../../../components/cards/call/callCard";
import { Row, Col } from "reactstrap";
export default class Call extends React.Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Col>
            <ScriptCard />
          </Col>
          <Col>
            <CallCard />
          </Col>
        </Row>
      </Fragment>
    );
  }
}
