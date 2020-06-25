import React from "react";
import settingsMenu from "../../constants/settings";
import { Link } from "react-router-dom";
import IntlMessages from "../../helpers/IntlMessages";
import { connect } from "react-redux";
import { getProfile } from "../../redux/actions";
class SettingsNav extends React.Component {
  constructor() {
    super();
    this.state = {
      settingsMenu,
    };
  }

  componentDidMount() {
    this.props.getProfile();
  }
  render() {
    return (
      <div>
        {this.props.profile ? (
          <div className="Settings-navigation flex fdr aic jcc">
            {this.props.profile.role === "user"
              ? this.state.settingsMenu.slice(0, 2).map((item) => {
                  return (
                    <div className="settings-item flex aic jcc fdc">
                      <Link style={{ textDecoration: "none" }} to={item.to}>
                        <h5>
                          <IntlMessages id={item.id} />
                        </h5>
                      </Link>
                    </div>
                  );
                })
              : this.state.settingsMenu.slice(0, 5).map((item) => {
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
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { profile } = settings;
  return {
    profile,
  };
};
export default connect(mapStateToProps, {
  getProfile,
})(SettingsNav);
