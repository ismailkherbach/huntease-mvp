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
    };
  }

  handleLogout = () => {
    this.props.logoutUser(this.props.history);
  };

  render() {
    return (
      <div className="sidenav no-gutters disable-select">
        <ul>
          {this.state.menuItems.map((item) => {
            return (
              <Link
                key={item.id}
                to={item.to}
                style={{ textDecoration: "none" }}
              >
                <li key={item.id}>
                  <box-icon
                    name={item.icon}
                    type="solid"
                    color="#8ba2ff96"
                  ></box-icon>

                  <IntlMessages id={item.id} />
                </li>
              </Link>
            );
          })}
          <li id="logout" onClick={() => this.handleLogout()}>
            {" "}
            <box-icon name="log-out" type="solid" color="#8ba2ff96"></box-icon>
            <IntlMessages id="logout" />
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
