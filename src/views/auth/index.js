import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import UserLayout from "../../layout/UserLayout";
import login from "./login";
import register from "./register";
import forgotPassword from "./forgotpassword";
import { render } from "@testing-library/react";

class User extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.body.classList.add("background");
  }
  componentWillUnmount() {
    document.body.classList.remove("background");
  }

  render() {
    const { match } = this.props;
    return (
      <div className="authback">
        <UserLayout>
          <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/login`} />
            <Route path={`${match.url}/login`} component={login} />
            <Route path={`${match.url}/register`} component={register} />
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
