import React from "react";
import menuItems from "../../constants/menu";
import { Link, withRouter } from "react-router-dom";

import IntlMessages from "../../helpers/IntlMessages";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems
    };
  }

  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");

    this.props.history.push("/user/login");
  };
  render() {
    return (
      <div className="sidenav disable-select">
        <ul>
          {this.state.menuItems.map(item => {
            return (
              <Link
                key={item.id}
                to={item.to}
                style={{ textDecoration: "none" }}
              >
                <li key={item.id}>
                  <img alt={"icon"} src={item.icon} />
                  <IntlMessages id={item.id} />
                </li>
              </Link>
            );
          })}
          <li id="logout" onClick={this.handleLogout}>
            {" "}
            <img
              alt={"icon"}
              src={require("../../components/svg/logout.svg")}
            />
            <IntlMessages id="logout" />
          </li>
        </ul>
      </div>
    );
  }
}

export default withRouter(Sidebar);
