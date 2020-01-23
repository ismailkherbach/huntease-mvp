import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Sidebar from "../containers/navs/Sidebar";
import Topnav from "../containers/navs/Topav";
class AppLayout extends Component {
  render() {
    return (
      <div>
        <Topnav />
        <Sidebar />
        <main>
          <div className="container-fluid">{this.props.children}</div>
        </main>
      </div>
    );
  }
}
const mapStateToProps = ({}) => {
  return {};
};
const mapActionToProps = {};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(AppLayout)
);
