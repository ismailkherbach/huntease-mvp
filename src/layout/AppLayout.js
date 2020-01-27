import React, { Component } from "react";

import Sidebar from "../containers/navs/Sidebar";
import Topnav from "../containers/navs/Topav";
export default class AppLayout extends Component {
  render() {
    return (
      <div>
        <Topnav />
        <Sidebar />
        <main>
          <div className="container-fluid">{this.props.children}</div>
        </main>
      </div>
    );
  }
}
