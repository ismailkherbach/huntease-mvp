import React, { PureComponent, Fragment } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Account from "./Account";
import Application from "./Application";
import Privacy from "./Privacy";
import Subscription from "./Subscription";
import AppLayout from "../../../layout/AppLayout";
import SettingsLayout from "../../../layout/SettingsLayout";
class Settings extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <div className="dashboard-page">
        <div id="lvl2bg">
          <AppLayout>
            <SettingsLayout>
              <Switch>
                <Redirect
                  exact
                  from={`${match.url}/`}
                  to={`${match.url}/account`}
                />
                <Route path={`${match.url}/account`} component={Account} />
                <Route
                  path={`${match.url}/application`}
                  component={Application}
                />
                <Route path={`${match.url}/privacy`} component={Privacy} />
                <Route
                  path={`${match.url}/subscription`}
                  component={Subscription}
                />
                <Redirect to="/error" />
              </Switch>
            </SettingsLayout>
          </AppLayout>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({}) => {
  return {};
};

export default withRouter(connect(mapStateToProps, {})(Settings));
