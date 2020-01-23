import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import ScriptEditor from "../../../components/cards/guide/script-editor";
import SearchBar from "../../../components/cards/guide/searchBar";
import GuideHistory from "../../../components/cards/guide/guideHistory";
import PrivacySetting from "../../../components/cards/settings/Privacy";
export default class Privacy extends React.Component {
  render() {
    return (
      <Fragment>
        <PrivacySetting />
      </Fragment>
    );
  }
}
