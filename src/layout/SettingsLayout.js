import React, { Component } from "react";

import SettingsNav from "../containers/navs/SettingsNav";
export default class SettingsLayout extends Component {
  render() {
    return (
      <div className="Settings">
        <div className="flex fdc aifs jcfs">
          <SettingsNav />
        </div>
        <main className="flex fdc aic jcc">
          <div className="Settings-container"> {this.props.children}</div>
        </main>
      </div>
    );
  }
}
