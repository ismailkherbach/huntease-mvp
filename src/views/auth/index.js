import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import UserLayout from "../../layout/UserLayout";
import login from "./login";
import addCompany from "./add-company";
import joinCompany from "./join-company";
import forgotPassword from "./forgotpassword";
import resetpassword from "./resetpassword";
import confirmaccount from "./confirmaccount";

class User extends React.Component {
  componentDidMount() {
    document.body.classList.add("background");
  }
  componentWillUnmount() {
    document.body.classList.remove("background");
  }

  render() {
    const { match } = this.props;
    return (
      <div>
        <UserLayout>
          <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/login`} />
            <Route path={`${match.url}/login`} component={login} />
            <Route path={`${match.url}/add-company`} component={addCompany} />
            <Route path={`${match.url}/join-company`} component={joinCompany} />
            <Route
              path={`${match.url}/reset-password/:token`}
              component={resetpassword}
            />
            <Route
              path={`${match.url}/confirm-account/:confirmToken`}
              component={confirmaccount}
            />

            <Route
              path={`${match.url}/forgot-password`}
              component={forgotPassword}
            />
            <Redirect to="/error" />
          </Switch>
        </UserLayout>
      </div>
    );
  }
}

export default User;
