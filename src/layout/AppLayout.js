import React, { Component } from "react";

import Sidebar from "../containers/navs/Sidebar";
import Topnav from "../containers/navs/Topav";
export default class AppLayout extends Component {
  render() {
    return (
      <div className="flex fdc aic jcfs">
        <Topnav />
        <main className="main-contour flex fdr aifs jcc">
          <Sidebar />
          <div className="">{this.props.children}</div>
        </main>
      </div>
    );
  }
}
