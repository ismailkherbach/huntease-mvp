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

const AuthRoute = ({ component: Component, authUser, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authUser ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/user/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends React.Component {
  render() {
    const { locale, loginUser } = this.props;

    const currentAppLocale = AppLocale[locale];
    return (
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <React.Fragment>
          <Router>
            <Switch>
              <AuthRoute path="/app" authUser={loginUser} component={app} />
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

const mapStateToProps = ({ authUser, settings }) => {
  const { user: loginUser } = authUser;
  const { locale } = settings;
  return { loginUser, locale };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(App);
