import React, { Fragment } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";

import { Row, Col, Button } from "reactstrap";

import {
  changeLocale,
  darkMode,
  editProfile,
  getProfile,
} from "../../../redux/actions";
import { localeOptions } from "../../../constants/defaultValues";
import ChangePassPopup from "../../popup/ChangePassPopup";
import ChangeNumberPopup from "../../popup/ChangeNumberPopup";
import { API_URL } from "../../../utils/utils";
import axios from "axios";
class AccountCall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: JSON.parse(localStorage.getItem("user_id")),
      showPopup: false,
      user: JSON.parse(localStorage.getItem("user")),
      domain: JSON.parse(localStorage.getItem("domain")).split(".")[0],
      userData: { firstName: "", lastName: "" },
      image: null,
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.uploadPicture = this.uploadPicture.bind(this);
  }

  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    console.log(file);
    reader.onloadend = () => {
      this.setState({
        image: file,
      });
      console.log(this.state.image);
    };

    reader.readAsDataURL(file);

    this.uploadPicture({
      file,
    });
    // Clear the form and state for the next input.
    //  this.state.image = null;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.uploadPicture({
      image: this.state.image,
    });
    // Clear the form and state for the next input.
    this.state.image = null;
  }

  async uploadPicture(newItem) {
    let bodyFormdata = new FormData();
    bodyFormdata.append("file", newItem.file);
    const response = await axios({
      method: "put",
      url: API_URL + `user/`,
      data: bodyFormdata,
      headers: {
        authorization: JSON.parse(localStorage.getItem("user_id")),
      },
    });
    console.log(response);
    console.log(newItem.file);
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
  componentDidMount() {
    this.props.getProfile();
  }
  render() {
    const { email, lastName, firstName, picture, phone } = this.props.profile;
    return (
      <Fragment>
        <div className="MyProfile flex fdr">
          <div>
            <div className="flex aifs fdr">
              <div className="flex fdc margin-right30 margin-bottom20">
                <h5>First name</h5>
                <input
                  className="profile-input"
                  placeholder={firstName}
                  type="text"
                  onChange={this.handleChangeFirst.bind(this)}
                />
              </div>
              <div className="flex fdc">
                <h5>Last name</h5>

                <input
                  className="profile-input"
                  placeholder={lastName}
                  type="text"
                  onChange={this.handleChangeLast.bind(this)}
                />
              </div>
            </div>
            <div className="flex aifs fdr">
              <div className="flex fdc margin-right30 margin-bottom20">
                <h5>Company</h5>

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
              <div className="flex fdc">
                <h5>Role</h5>

                <input
                  className="profile-input"
                  placeholder=""
                  type="text"
                  onChange={this.handleChangeEmail}
                  disabled
                />
              </div>
            </div>
            <div className="flex aifs fdr">
              <div className="flex fdc margin-right30 margin-bottom20">
                <h5>Work email</h5>

                <input
                  className="profile-input"
                  placeholder={email}
                  type="text"
                  onChange={this.handleChangeEmail}
                  disabled
                />
              </div>
              <div className="flex fdc">
                <h5>Current password</h5>
                <div className="Change-input flex fdr aic jcfs">
                  <h5>**********</h5>
                  <Button
                    className="Change-profile-btn"
                    onClick={this.togglePopup.bind(this)}
                  >
                    Change
                  </Button>
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
            <div className="general-settings margin-top50">
              <h4>
                General settings{" "}
                <span>
                  {" "}
                  <img src={require("../../../assets/img/separator.svg")} />
                </span>
              </h4>
              <div className="flex fdr aic jcfs margin-top25 margin-bottom25">
                <h5>Time Zone</h5>
                <input
                  className="profile-input-large"
                  placeholder="+1 GMT, Paris France"
                  type="text"
                  onChange={this.handleChangeEmail}
                />{" "}
              </div>
              <div className="flex fdr aic jcfs">
                <h5>Theme</h5>
                <div className="flex fdr aic jcc">
                  <Button className="Change-theme-btn">LIGHT</Button>
                  <Button className="Change-theme-btnDark">
                    DARK{" "}
                    <span className="comming-soon">
                      {" "}
                      <img
                        src={require("../../../assets/img/comming_soon.svg")}
                      />
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex fdc">
            {" "}
            <div className="Profil-right flex fdc aic jcc">
              <div className="pictureUpload">
                <img
                  src={`https://huntease-mvp.herokuapp.com/v1/uploads/${picture}`}
                  alt={"profile"}
                  className="profile-img"
                />

                <img
                  className="upload"
                  src={require("../../../assets/img/bxs-camera.svg")}
                  onClick={() => {
                    document.getElementById(clickId).click();
                  }}
                />
                <input
                  type="file"
                  id={clickId}
                  onChange={this.handleImageChange}
                  style={{ display: "none" }}
                />
              </div>

              <h3>
                {this.state.user.firstName.charAt(0).toUpperCase() +
                  this.state.user.firstName.slice(1) +
                  " " +
                  this.state.user.lastName}
              </h3>
              <h5>Sales Development Representative</h5>
              <h5>
                {this.state.domain.charAt(0).toUpperCase() +
                  this.state.domain.slice(1)}
              </h5>
            </div>
            <div className="Add-number { flex fdr aic jcfs margin-top20">
              <img
                src={require("../../../assets/img/indicatif/flag-fr.png")}
                alt={"profile"}
              />
              <h4>+{phone}</h4>{" "}
              <Button
                className="Change-profile-btn"
                onClick={this.togglePopup.bind(this)}
              >
                Change
              </Button>
            </div>
          </div>
          {this.state.userData.firstName != "" &&
            this.state.userData.lastName != "" && (
              <Button
                className="Save-changes-btn"
                onClick={this.onEditProfile.bind(this)}
              >
                Save changes
              </Button>
            )}
        </div>
        <div className=""> </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale, profile } = settings;
  return {
    locale,
    profile,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    changeLocale,
    darkMode,
    editProfile,
    getProfile,
  })(AccountCall)
);

const clickId = `fileUploader_huntease2020`;
