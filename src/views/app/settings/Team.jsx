import React, { Fragment } from "react";
import TeamManagement from "../../../components/cards/settings/TeamManagement";
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
