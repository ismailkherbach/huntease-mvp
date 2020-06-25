import React, { Fragment } from "react";
import TeamManagement from "../../../components/cards/settings/TeamManagement";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

export default class Team extends React.Component {
  render() {
    return (
      <Fragment>
        <div className="TeamManagment">
          <TeamManagement />
        </div>
      </Fragment>
    );
  }
}

withRouter(Team);
