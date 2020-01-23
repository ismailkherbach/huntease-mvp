import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import ScriptEditor from "../../../components/cards/guide/script-editor";
import SearchBar from "../../../components/cards/guide/searchBar";
import GuideHistory from "../../../components/cards/guide/guideHistory";
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
