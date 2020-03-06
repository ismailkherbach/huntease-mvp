import React, { Fragment } from "react";
import { Col, Row } from "reactstrap";
import Calls from "../../../components/cards/dashboard/calls";
import Meetings from "../../../components/cards/dashboard/meetings";
import Performance from "../../../components/cards/dashboard/performance";
import Engagement from "../../../components/cards/dashboard/engagement";
import AddTeam from "../../../components/cards/dashboard/emptyTeam";
import TopSales from "../../../components/cards/dashboard/topsales";
export default class Dashboard extends React.Component {
  componentDidMount() {
    document.body.classList.add("background");
  }
  componentWillUnmount() {
    document.body.classList.remove("background");
  }
  render() {
    return (
      <Fragment>
        <Row>
          <Col className="col-4">
            <Performance />
          </Col>
          <Col className="col-3">
            <Calls />
          </Col>
          <Col>
            <Meetings />
          </Col>
        </Row>
        <Row>
          <Col>
            <Engagement />
          </Col>
          <Col>
            <TopSales />
          </Col>
        </Row>
      </Fragment>
    );
  }
}
