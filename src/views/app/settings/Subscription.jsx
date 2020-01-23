import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import ScriptEditor from "../../../components/cards/guide/script-editor";
import SearchBar from "../../../components/cards/guide/searchBar";
import GuideHistory from "../../../components/cards/guide/guideHistory";
import SubscriptionContent from "../../../components/cards/settings/Subscription";
export default class Subscription extends React.Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Col>
            <SubscriptionContent />
          </Col>
        </Row>
      </Fragment>
    );
  }
}
