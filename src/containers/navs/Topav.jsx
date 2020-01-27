import React from "react";

import { Col } from "reactstrap";

import IntlMessages from "../../helpers/IntlMessages";

export default class Topnav extends React.Component {
  render() {
    //           <p className="d-inline-block ">Ismail kherbach</p>

    return (
      <div className="topnav">
        <img
          alt={"logo"}
          id="logo"
          src={require("../../assets/img/huntease_logo_icon_white.png")}
        />
        <img
          alt={"hamberger"}
          className="d-inline-block ml-4 hamburger"
          src={require("../../assets/img/menu_open.svg")}
        />
        <p className="d-inline-block ml-4 greeting">
          <IntlMessages id="gretting" />
        </p>
      </div>
    );
  }
}
