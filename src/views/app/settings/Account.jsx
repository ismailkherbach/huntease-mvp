import React, { Fragment } from "react";
import AccountCall from "../../../components/cards/settings/AccountCard";
export default class Account extends React.Component {
  render() {
    return (
      <Fragment>
        <div className="inlineBtn-center">
          <AccountCall />{" "}
        </div>
      </Fragment>
    );
  }
}
