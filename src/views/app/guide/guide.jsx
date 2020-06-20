import React, { Fragment } from "react";
import { Row, Col } from "reactstrap";
import SearchBar from "../../../components/cards/guide/searchBar";
import GuideHistory from "../../../components/cards/guide/guideHistory";
import ScriptEditor from "../../../components/cards/guide/script-editor";
import TagPicker from "../../../components/cards/guide/tagPicker";
// import TagPicker from "../../../components/cards/guide/tagPicker";
export default class Guide extends React.Component {
  render() {
    return (
      <Fragment>
        <div className="Guide flex fdr aic jcc">
          <ScriptEditor />
        </div>
      </Fragment>
    );
  }
}
