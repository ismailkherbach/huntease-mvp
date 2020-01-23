import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SettingsNav from "../containers/navs/SettingsNav";
class SettingsLayout extends Component {
  render() {
    return (
      <div>
        <SettingsNav />
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
  connect(mapStateToProps, mapActionToProps)(SettingsLayout)
);
