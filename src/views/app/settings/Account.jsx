import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import ScriptEditor from "../../../components/cards/guide/script-editor";
import SearchBar from "../../../components/cards/guide/searchBar";
import GuideHistory from "../../../components/cards/guide/guideHistory";
import AccountCall from "../../../components/cards/settings/AccountCard";
export default class Account extends React.Component {
  render() {
    return (
      <Fragment>
        <AccountCall />{" "}
      </Fragment>
    );
  }
}
