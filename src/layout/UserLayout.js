import React, { Component } from "react";
import TopNavUser from "../containers/navs/TopNavUser";
export default class AppLayout extends Component {
  render() {
    return (
      <div className="auth-bloc">
        <TopNavUser />
        <main>
          <div className="auth-contour flex fdc aic jcc">
            {this.props.children}
          </div>
        </main>
      </div>
    );
  }
}
