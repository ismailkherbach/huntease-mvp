import React, { Fragment } from "react";
import ScriptCard from "../../../components/cards/call/ScriptCard";
import CallCard from "../../../components/cards/call/callCard";
import { Row, Col } from "reactstrap";
export default class Call extends React.Component {
  render() {
    return (
      <Fragment>
        <div className="Calls-bloc flex fdr aic jcc">
          <ScriptCard />
          {<CallCard />}
        </div>
      </Fragment>
    );
  }
}
