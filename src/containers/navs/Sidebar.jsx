import React from "react";
import menuItems from "../../constants/menu";
import { Link, withRouter } from "react-router-dom";
import "boxicons";
import IntlMessages from "../../helpers/IntlMessages";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions";
import { injectIntl } from "react-intl";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems,
      menuHover: false,
      menuOn: null,
      x: 0,
      link: null,
    };
  }

  handleLogout = () => {
    this.props.logoutUser(this.props.history);
  };

  handleHoverOn(id) {
    this.setState({ menuHover: true, menuOn: id });
  }

  handleHoverOff() {
    this.setState({ menuHover: false });
  }
  handleClick(x) {
    this.setState({
      x: x,
    });
  }

  componentDidMount() {
    if (this.props.history.location.pathname == "/app/dashboards") {
      this.handleClick(0);
    }
    if (this.props.history.location.pathname == "/app/guide") {
      this.handleClick(1);
    }
    if (this.props.history.location.pathname == "/app/call") {
      this.handleClick(2);
    }
    if (this.props.history.location.pathname == "/app/settings") {
      this.handleClick(3);
    }
  }

  render() {
    return (
      <div className="sidenav no-gutters disable-select">
        <ul>
          {this.state.menuItems.map((item, x) => {
            return (
              <Link
                key={item.id}
                to={item.to}
                style={{ textDecoration: "none" }}
              >
                <li
                  key={item.id}
                  onMouseEnter={this.handleHoverOn.bind(this, x)}
                  onMouseLeave={this.handleHoverOff.bind(this)}
                  onClick={this.handleClick.bind(this, x)}
                  className={`flex fdc aic jcc ${
                    this.state.x === x ? "clicked" : ""
                  }`}
                >
                  <box-icon
                    name={item.icon}
                    type="solid"
                    color={
                      (this.state.menuHover && this.state.menuOn == x) ||
                      this.state.x === x
                        ? "#ffc371"
                        : "#8BA3FF"
                    }
                  ></box-icon>

                  <h5>{item.id} </h5>
                </li>
              </Link>
            );
          })}
          <li
            className="flex fdc aic jcc Loggout curs_pointer"
            onClick={() => this.handleLogout()}
            key="logoutItem"
            onMouseEnter={this.handleHoverOn.bind(this, "logoutItem")}
            onMouseLeave={this.handleHoverOff.bind(this)}
          >
            {" "}
            <box-icon
              name="log-out"
              type="solid"
              color={
                this.state.menuHover && this.state.menuOn == "logoutItem"
                  ? "#ffc371"
                  : "#8BA3FF"
              }
            ></box-icon>
            <h5>{"Logout"} </h5>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({}) => {
  return {};
};
export default injectIntl(
  withRouter(connect(mapStateToProps, { logoutUser })(Sidebar))
);
