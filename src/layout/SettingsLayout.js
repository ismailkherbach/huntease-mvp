import React, { Component } from "react";

import SettingsNav from "../containers/navs/SettingsNav";
export default class SettingsLayout extends Component {
  render() {
    return (
      <div>
        <SettingsNav />
        <main>
          <div className="container-fluid">{this.props.children}</div>
        </main>
      </div>
    );
  }
}
