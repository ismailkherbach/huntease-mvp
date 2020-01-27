import React, { Component } from "react";
import TopNavUser from "../containers/navs/TopNavUser";
export default class AppLayout extends Component {
  render() {
    return (
      <div>
        <TopNavUser />
        <main>
          <div className="container-fluid">{this.props.children}</div>
        </main>
      </div>
    );
  }
}
