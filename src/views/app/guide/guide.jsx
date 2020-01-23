import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import SearchBar from "../../../components/cards/guide/searchBar";
import GuideHistory from "../../../components/cards/guide/guideHistory";
import ScriptEditor from "../../../components/cards/guide/script-editor";
import TagPicker from "../../../components/cards/guide/tagPicker";
export default class Guide extends React.Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Col>
            <ScriptEditor />
          </Col>
          <Col>
            <Row>
              <SearchBar />
            </Row>
            <Row>
              <Row>
                <GuideHistory />
              </Row>
              <Row>
                <TagPicker />
              </Row>
            </Row>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
