import React from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import app from "./views/app";
import main from "./views";
import user from "./views/auth";
import Error from "./views/error";
import settings from "./views/app/settings";
import { IntlProvider } from "react-intl";
import AppLocale from "./lang";

class App extends React.Component {
  render() {
    const { locale } = this.props;
    const currentAppLocale = AppLocale[locale];
    return (
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <React.Fragment>
          <Router>
            <Switch>
              <Route path="/app" component={app} />
              <Route path="/" exact component={main} />
              <Route path="/user" component={user} />
              <Route path="/app/settings" component={settings} />

              <Route path="/error" exact component={Error} />
              <Redirect to="/error" />
            </Switch>
          </Router>
        </React.Fragment>
      </IntlProvider>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale } = settings;
  return { locale };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(App);
