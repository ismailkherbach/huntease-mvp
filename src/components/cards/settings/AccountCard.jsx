import React, { Fragment } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";

import {
  Row,
  Col,
  Input,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Button
} from "reactstrap";
import Terms from "./Terms";
import Helps from "./Helps";
import { changeLocale, darkMode } from "../../../redux/actions";
import { localeOptions } from "../../../constants/defaultValues";

class AccountCall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: JSON.parse(localStorage.getItem("user_id"))
    };
  }
  handleChangeLocale = locale => {
    this.props.changeLocale(locale);
  };

  handleDarkMode = color => {
    this.props.darkMode(color);
  };

  render() {
    return (
      <Fragment>
        <Row>
          <Col>
            <div id="settings-card" className="no-gutters mx-0">
              <Row>
                <Col>
                  <div className="inlineBtn-left mt-3">
                    <div className="inlinBtn-col-center">
                      <div id="field-top">First name</div>

                      <input
                        className="profile-input"
                        placeholder=""
                        type="text"
                        onChange={this.handleChangeEmail}
                      />
                    </div>
                    <div className="inlinBtn-col-center">
                      <div id="field-top">First name</div>

                      <input
                        className="profile-input"
                        placeholder=""
                        type="text"
                        onChange={this.handleChangeEmail}
                      />
                    </div>
                  </div>

                  <div className="inlineBtn-left">
                    <div className="inlinBtn-col-center">
                      <div id="field-top">First name</div>

                      <input
                        className="profile-input"
                        placeholder=""
                        type="text"
                        onChange={this.handleChangeEmail}
                      />
                    </div>
                    <div className="inlinBtn-col-center">
                      <div id="field-top">First name</div>

                      <input
                        className="profile-input"
                        placeholder=""
                        type="text"
                        onChange={this.handleChangeEmail}
                      />
                    </div>
                  </div>

                  <div className="inlineBtn-left">
                    <div className="inlinBtn-col-center">
                      <div id="field-top">First name</div>

                      <input
                        className="profile-input"
                        placeholder=""
                        type="text"
                        onChange={this.handleChangeEmail}
                      />
                    </div>
                    <div className="inlinBtn-col-center">
                      <div id="field-top">First name</div>

                      <input
                        className="profile-input"
                        placeholder=""
                        type="text"
                        onChange={this.handleChangeEmail}
                      />
                    </div>
                  </div>
                  <Row>
                    <Col>
                      {" "}
                      <h3 id="field-top">Time Zone</h3>
                    </Col>

                    <Col>
                      {" "}
                      <input
                        className="profile-input-large"
                        placeholder=""
                        type="text"
                        onChange={this.handleChangeEmail}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <div className="profil-card">
                    <img
                      src={require("../../../assets/img/0.jpeg")}
                      alt={"profile"}
                      className="profile-img"
                    />
                    <h3>Lori Powell</h3>
                    <p>Sales Development Representative</p>
                    <p>Amazon</p>
                  </div>

                  <div className="profil-card inlineBtn-center">
                    <input
                      className="profile-input"
                      placeholder="+213 541 1379"
                      type="text"
                      onChange={this.handleChangeEmail}
                    />
                    <Button className="change-button">Change</Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale } = settings;
  return {
    locale
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    changeLocale,
    darkMode
  })(AccountCall)
);
