import React from "react";
import settingsMenu from "../../constants/settings";
import { Link } from "react-router-dom";
import IntlMessages from "../../helpers/IntlMessages";

export default class SettingsNav extends React.Component {
  constructor() {
    super();
    this.state = {
      settingsMenu
    };
  }
  render() {
    return (
      <div id="settings-navigation-card" className="no-gutters mx-0">
        {this.state.settingsMenu.map(item => {
          return (
            <div className="setting-items">

            <Link style={{ textDecoration: "none" }} to={item.to}>
              <h1>
                <IntlMessages id={item.id} />
              </h1>
            </Link>
        </div>  );
        })}
      </div>
    );
  }
}
