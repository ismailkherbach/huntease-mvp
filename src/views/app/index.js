import React, { PureComponent, Fragment } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Dashboard from "./dashboard/dashboard";
import Call from "./call/call";
import Guide from "./guide/guide";
import Settings from "./settings";
import AppLayout from "../../layout/AppLayout";
import Fullscreen from "react-full-screen";

class App extends React.Component {
  constructor(props) {
    super();

    this.state = {
      isFull: false
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
        onChange={isFull => this.setState({ isFull })}
      >
        <div className="dashboard-page">
          <div id="lvl2bg">
            <AppLayout>
              <Switch>
                <Redirect
                  exact
                  from={`${match.url}/`}
                  to={`${match.url}/dashboards`}
                />
                <Route path={`${match.url}/dashboards`} component={Dashboard} />
                <Route path={`${match.url}/call`} component={Call} />
                <Route path={`${match.url}/guide`} component={Guide} />
                <Route path={`${match.url}/settings`} component={Settings} />
                <Redirect to="/error" />
              </Switch>
            </AppLayout>
          </div>
        </div>
      </Fullscreen>
    );
  }
}
const mapStateToProps = ({}) => {
  return {};
};

export default withRouter(connect(mapStateToProps, {})(App));
