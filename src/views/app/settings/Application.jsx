import React, { Fragment } from "react";
import { Row, Col } from "reactstrap";
import ApplicationCard from "../../../components/cards/settings/ApplicationCard";
export default class Application extends React.Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Col>
            <ApplicationCard />
          </Col>
        </Row>
      </Fragment>
    );
  }
}
