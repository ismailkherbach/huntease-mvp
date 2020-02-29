import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Account from "./Account";
import Application from "./Application";
import Privacy from "./Privacy";
import Subscription from "./Subscription";
// import AppLayout from "../../../layout/AppLayout";
import SettingsLayout from "../../../layout/SettingsLayout";
export default class Settings extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <SettingsLayout>
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/account`} />
          <Route path={`${match.url}/account`} component={Account} />
          <Route path={`${match.url}/application`} component={Application} />
          <Route path={`${match.url}/privacy`} component={Privacy} />
          <Route path={`${match.url}/subscription`} component={Subscription} />
          <Redirect to="/error" />
        </Switch>
      </SettingsLayout>
    );
  }
}
