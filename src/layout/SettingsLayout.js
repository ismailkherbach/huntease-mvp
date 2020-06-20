import React, { Component } from "react";

import SettingsNav from "../containers/navs/SettingsNav";
export default class SettingsLayout extends Component {
  render() {
    return (
      <div className="Settings flex fdc aic jcc">
        <SettingsNav />
        <main>
          <div className="Settings-container"> {this.props.children}</div>
        </main>
      </div>
    );
  }
}
