import React, { Fragment } from "react";
import AccountCall from "../../../components/cards/settings/AccountCard";
export default class Account extends React.Component {
  render() {
    return (
      <Fragment>
        <div className="flex aifs jcfs fdc">
          <AccountCall />
        </div>
      </Fragment>
    );
  }
}
