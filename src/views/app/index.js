import React, { Suspense } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import AppLayout from "../../layout/AppLayout";
import Fullscreen from "react-full-screen";
const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "Dashboard" */ "./dashboard/dashboard")
);
const Guide = React.lazy(() =>
  import(/* webpackChunkName: "Guide" */ "./guide/guide")
);
const Call = React.lazy(() =>
  import(/* webpackChunkName: "Call" */ "./call/call")
);
const Settings = React.lazy(() =>
  import(/* webpackChunkName: "Settings" */ "./settings")
);
export default class App extends React.Component {
  constructor(props) {
    super();

    this.state = {
      isFull: false,
    };
  }

  goFull = () => {
    this.setState({ isFull: true });
  };

  render() {
    const { match } = this.props;

    return (
      <Fullscreen
        enabled={this.state.isFull}
        onChange={(isFull) => this.setState({ isFull })}
      >
        <div className="main-bloc">
          <AppLayout>
            <Suspense fallback={<div className="loading" />}>
              <Switch>
                <Redirect
                  exact
                  from={`${match.url}/`}
                  to={`${match.url}/dashboards`}
                />
                <Route
                  path={`${match.url}/dashboards`}
                  render={(props) => <Dashboard {...props} />}
                />
                <Route
                  path={`${match.url}/call`}
                  render={(props) => <Call {...props} />}
                />
                <Route
                  path={`${match.url}/guide`}
                  render={(props) => <Guide {...props} />}
                />
                <Route
                  path={`${match.url}/settings`}
                  render={(props) => <Settings {...props} />}
                />
                <Redirect to="/error" />
              </Switch>
            </Suspense>
          </AppLayout>
        </div>
      </Fullscreen>
    );
  }
}
