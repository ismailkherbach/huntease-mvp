import React from "react";

import {
  Col,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Button
} from "reactstrap";

import { connect } from "react-redux";

import IntlMessages from "../../helpers/IntlMessages";

export default class Topnav extends React.Component {
  render() {
    //           <p className="d-inline-block ">Ismail kherbach</p>

    return (
      <div>
        <Col className="topnav">
          <img
            id="logo"
            src={require("../../assets/img/huntease_logo_icon_white.png")}
          />
          <img
            className="d-inline-block ml-4 hamburger"
            src={require("../../assets/img/menu_open.svg")}
          />
          <p className="d-inline-block ml-4 greeting">
            <IntlMessages id="gretting" />
          </p>
        </Col>
      </div>
    );
  }
}
