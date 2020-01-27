import React from "react";
import menuItems from "../../constants/menu";
import { Link } from "react-router-dom";
import IntlMessages from "../../helpers/IntlMessages";

export default class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      menuItems
    };
  }
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
        </ul>
      </div>
    );
  }
}
