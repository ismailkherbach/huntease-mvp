import React from "react";
import settingsMenu from "../../constants/settings";
import { Link } from "react-router-dom";
import IntlMessages from "../../helpers/IntlMessages";

export default class SettingsNav extends React.Component {
  constructor() {
    super();
    this.state = {
      settingsMenu,
    };
  }
  render() {
    return (
      <div className="Settings-navigation flex fdr aic jcc">
        {this.state.settingsMenu.slice(0, 5).map((item) => {
          return (
            <div className="settings-item flex aic jcc fdc">
              <Link style={{ textDecoration: "none" }} to={item.to}>
                <h5>
                  <IntlMessages id={item.id} />
                </h5>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}
