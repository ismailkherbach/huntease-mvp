import React from "react";
import settingsMenu from "../../constants/settings";
import { Link, withRouter } from "react-router-dom";
import IntlMessages from "../../helpers/IntlMessages";
import { connect } from "react-redux";
import { getProfile } from "../../redux/actions";
class SettingsNav extends React.Component {
  constructor() {
    super();
    this.state = {
      settingsMenu,
      x: 0,
    };
  }

  handleClick(x) {
    this.setState({
      x: x,
    });
  }

  componentDidMount() {
    this.props.getProfile();
    console.log(this.props.history.location.pathname);
    if (this.props.history.location.pathname == "/app/settings/account") {
      this.handleClick(0);
    }
    if (this.props.history.location.pathname == "/app/settings/application") {
      this.handleClick(1);
    }
    if (this.props.history.location.pathname == "/app/settings/team") {
      this.handleClick(2);
    }
    if (this.props.history.location.pathname == "/app/settings/subscription") {
      this.handleClick(3);
    }
  }
  render() {
    return (
      <div>
        {this.props.profile ? (
          <div className="Settings-navigation flex fdr aic jcc">
            {this.props.profile.role === "user"
              ? this.state.settingsMenu.slice(0, 2).map((item, i) => {
                  return (
                    <div
                      onClick={this.handleClick.bind(this, i)}
                      className={`settings-item flex aic jcc fdc curs_pointer ${
                        this.state.x === i ? "active" : ""
                      }`}
                    >
                      <Link style={{ textDecoration: "none" }} to={item.to}>
                        <h5>
                          <IntlMessages id={item.id} />
                        </h5>
                      </Link>
                    </div>
                  );
                })
              : this.state.settingsMenu.slice(0, 5).map((item, i) => {
                  return (
                    <div
                      onClick={this.handleClick.bind(this, i)}
                      className={`settings-item flex aic jcc fdc curs_pointer ${
                        this.state.x === i ? "active" : ""
                      }`}
                    >
                      {" "}
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
export default withRouter(
  connect(mapStateToProps, {
    getProfile,
  })(SettingsNav)
);
