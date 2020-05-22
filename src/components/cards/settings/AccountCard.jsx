import React, { Fragment } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";

import { Row, Col, Button } from "reactstrap";

import { changeLocale, darkMode, editProfile } from "../../../redux/actions";
import { localeOptions } from "../../../constants/defaultValues";
import ChangePassPopup from "../../popup/ChangePassPopup";
import ChangeNumberPopup from "../../popup/ChangeNumberPopup";

class AccountCall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: JSON.parse(localStorage.getItem("user_id")),
      showPopup: false,
      user: JSON.parse(localStorage.getItem("user")),
      domain: JSON.parse(localStorage.getItem("domain")).split(".")[0],
      userData: { firstName: "", lastName: "" },
    };
  }
  handleChangeFirst(e) {
    this.setState({
      userData: {
        ...this.state.userData,
        firstName: e.target.value,
      },
    });
  }
  handleChangeLast(e) {
    this.setState({
      userData: {
        ...this.state.userData,
        lastName: e.target.value,
      },
    });
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }
  handleChangeLocale = (locale) => {
    this.props.changeLocale(locale);
  };

  handleDarkMode = (color) => {
    this.props.darkMode(color);
  };
  onEditProfile() {
    this.props.editProfile(this.state.userData);
    console.log(this.state.userData);
  }
  render() {
    return (
      <Fragment>
        <Row>
          <Col>
            <div id="settings-card" className="no-gutters mx-0">
              <Row>
                <Col>
                  <div className="inlineBtn-left">
                    <div className="inlinBtn-col-center">
                      <div id="field-top">First name</div>

                      <input
                        className="profile-input"
                        placeholder={this.state.user.firstName}
                        type="text"
                        onChange={this.handleChangeFirst.bind(this)}
                      />
                    </div>
                    <div className="inlinBtn-col-center">
                      <div id="field-top">Last name</div>

                      <input
                        className="profile-input"
                        placeholder={this.state.user.lastName}
                        type="text"
                        onChange={this.handleChangeLast.bind(this)}
                      />
                    </div>
                  </div>

                  <div className="inlineBtn-left">
                    <div className="inlinBtn-col-center">
                      <div id="field-top">Company</div>

                      <input
                        className="profile-input"
                        placeholder={
                          this.state.domain.charAt(0).toUpperCase() +
                          this.state.domain.slice(1)
                        }
                        type="text"
                        onChange={this.handleChangeEmail}
                        disabled
                      />
                    </div>
                    <div className="inlinBtn-col-center">
                      <div id="field-top">Role</div>

                      <input
                        className="profile-input"
                        placeholder=""
                        type="text"
                        onChange={this.handleChangeEmail}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="inlineBtn-left">
                    <div className="inlinBtn-col-center mb-4">
                      <div id="field-top">Work email</div>

                      <input
                        className="profile-input"
                        placeholder={this.state.user.email}
                        type="text"
                        onChange={this.handleChangeEmail}
                        disabled
                      />
                    </div>
                    <div className="inlinBtn-col-center">
                      <div id="field-top">Current password</div>
                      <div className="inlineBtn-center">
                        <div className="profile-input inlineBtn-center">
                          <h3>**********</h3>
                          <Button
                            className="change-button float-right"
                            onClick={this.togglePopup.bind(this)}
                          >
                            Change
                          </Button>
                        </div>
                      </div>
                      <div className="inlineBtn-center">
                        {this.state.showPopup ? (
                          <ChangePassPopup
                            text='Click "Close Button" to hide popup'
                            closePopup={this.togglePopup.bind(this)}
                          />
                        ) : null}
                        {this.state.showPopup ? (
                          <ChangeNumberPopup
                            text='Click "Close Button" to hide popup'
                            closePopup={this.togglePopup.bind(this)}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <h3 className="mt-5" id="field-top">
                    General settings
                  </h3>

                  <Row className="mt-4">
                    <Col className="inlineBtn-center">
                      <h3 className="col-2" id="field-top">
                        Time Zone
                      </h3>{" "}
                      <input
                        className="profile-input-large"
                        placeholder="+1 GMT, Paris France"
                        type="text"
                        onChange={this.handleChangeEmail}
                      />
                    </Col>
                    <Col className="inlineBtn-center pt-4 ml-4">
                      {" "}
                      <h3 id="field-top">Theme</h3>
                      <div className="inlineBtn-left">
                        <Button className="theme-light-button">LIGHT</Button>
                        <Button className="theme-dark-button">DARK</Button>
                      </div>
                    </Col>

                    <Col> </Col>
                  </Row>
                </Col>

                <Col>
                  <div className="profil-card">
                    <img
                      src={
                        "https://huntease-mvp.herokuapp.com/v1/uploads/5ec30cb17b39ec0017b94ab7"
                      }
                      alt={"profile"}
                      className="profile-img"
                    />
                    <h3>
                      {this.state.user.firstName.charAt(0).toUpperCase() +
                        this.state.user.firstName.slice(1) +
                        " " +
                        this.state.user.lastName}
                    </h3>
                    <p>Sales Development Representative</p>
                    <p>
                      {this.state.domain.charAt(0).toUpperCase() +
                        this.state.domain.slice(1)}
                    </p>
                  </div>

                  <div className="change-profil-card inlineBtn-center">
                    <div className="profile-input inlineBtn-center">
                      <img
                        src={require("../../../assets/img/indicatif/flag-fr.png")}
                        alt={"profile"}
                        className="flag-img"
                      />
                      <h3>+213 42137918</h3>{" "}
                      <Button
                        className="change-button float-right"
                        onClick={this.togglePopup.bind(this)}
                      >
                        Change
                      </Button>
                    </div>
                  </div>
                  <div className="inlineBtn-center mt-5 ml-5">
                    {" "}
                    {this.state.userData.firstName != "" &&
                      this.state.userData.lastName != "" && (
                        <Button
                          className="inlineBtn-center mt-5 ml-5 save-changes"
                          onClick={this.onEditProfile.bind(this)}
                        >
                          Save changes
                        </Button>
                      )}
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
    locale,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    changeLocale,
    darkMode,
    editProfile,
  })(AccountCall)
);
