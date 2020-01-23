import React, { PureComponent, Fragment } from "react";
import { Col, Row } from "reactstrap";
import TopSales from "../../../components/cards/dashboard/topsales";
import Calls from "../../../components/cards/dashboard/calls";
import Meetings from "../../../components/cards/dashboard/meetings";
import Performance from "../../../components/cards/dashboard/performance";
import Engagement from "../../../components/cards/dashboard/engagement";
import emptyTeam from "../../../components/cards/dashboard/emptyTeam";
import AddTeam from "../../../components/cards/dashboard/emptyTeam";
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
          <Col>
            <Performance />
          </Col>
          <Col>
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
            <AddTeam />{" "}
          </Col>
        </Row>
      </Fragment>
    );
  }
}
