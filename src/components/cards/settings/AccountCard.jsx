import React, { Fragment } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";

import { Row, Col, Button } from "reactstrap";

import {
  changeLocale,
  darkMode,
  editProfile,
  getProfile,
  addPhoneNumber,
} from "../../../redux/actions";
import { localeOptions } from "../../../constants/defaultValues";
import ChangePassPopup from "../../popup/ChangePassPopup";
import ChangeNumberPopup from "../../popup/ChangeNumberPopup";
import { API_URL } from "../../../utils/utils";
import axios from "axios";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const user = JSON.parse(localStorage.getItem("user"));
let client = undefined;

if (user) {
  client = new W3CWebSocket(
    `wss://radiant-bastion-46195.herokuapp.com/${user.id}`
  );
}
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
      phone: null,
      verifictionBloc: false,
      verifictionSuccess: false,
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
    await this.getProfile();
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
  async onEditProfile() {
    this.props.editProfile(this.state.userData);
    console.log(this.state.userData);
    await this.props.getProfile();
  }
  onAddPhoneNumber() {
    let phone = this.state.phone;
    this.props.addPhoneNumber({ phone });
    //  this.setState({ verifictionBloc: true });
  }
  handleChangePhone(e) {
    this.setState({
      phone: e.target.value,
    });
  }
  /* static getDerivedStateFromProps(props, state) {
    props.getProfile();
  }*/
  toggleVerification() {
    this.setState({
      verifictionBloc: true,
    });
    setTimeout(() => {
      this.setState({
        verifictionBloc: false,
      });
    }, 3000);
  }
  componentDidMount() {
    this.props.getProfile();
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (phone) => {
      console.log(phone.data);
      if (phone.data === "verification_success") {
        this.setState({ verifictionSuccess: true });
      }

      //this.handleChangeEmotion(emotionPacket.data)
    };
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
                  {/*this.state.showPopup ? (
                    <ChangeNumberPopup
                      text='Click "Close Button" to hide popup'
                      closePopup={this.togglePopup.bind(this)}
                    />
                  ) : null*/}
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
            <div className="rightBloc flex fdc aic jcc">
              <div className="Profil-right flex fdc aic jcc">
                <div className="pictureUpload">
                  <div className="mask"></div>

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

                {this.props.profile ? (
                  <h3>
                    {firstName.charAt(0).toUpperCase() +
                      firstName.slice(1) +
                      " " +
                      lastName}
                  </h3>
                ) : (
                  ""
                )}
                <h5>Sales Development Representative</h5>
                <h5>
                  {this.state.domain.charAt(0).toUpperCase() +
                    this.state.domain.slice(1)}
                </h5>
              </div>
              <div className="Add-number-bloc flex fdc aic jcc margin-top20">
                <div className="flex fdr aic jcc">
                  {" "}
                  <img
                    src={require("../../../assets/img/notice.svg")}
                    alt={"profile"}
                  />
                  <h4>Please add your phone number</h4>
                </div>
                <p>
                  Huntease allows you to make cold-calls directly using your
                  phone number.
                </p>
                <div className="full-input flex fdr aic jcc">
                  <input
                    placeholder="054213798"
                    onChange={this.handleChangePhone.bind(this)}
                  />{" "}
                  <Button
                    className="Change-profile-btn"
                    onClick={this.onAddPhoneNumber.bind(this)}
                  >
                    Change
                  </Button>
                </div>
              </div>
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
        {this.state.verifictionBloc && (
          <div className="popup-container flex fdc aic jcc">
            {!this.state.verifictionSuccess && (
              <div className="verificationBloc flex fdc aic jcc">
                <div className="flex fdr aic jcc">
                  <img
                    src={require("../../../assets/img/ionic-ios-call.svg")}
                  />
                  <h5>Verification code</h5>
                </div>
                <p>
                  Please type the verification code into your dialer when you
                  receive the verification call.
                </p>
                {this.props.code ? <h2>{this.props.code}</h2> : ""}
              </div>
            )}
            {this.state.verifictionSuccess && (
              <div className="verificationBloc  flex fdc aic jcc">
                <div className="flex success fdc aic jcc">
                  <h2>WOO-HOO!</h2>
                  <p>
                    You now can use{" "}
                    <span className="Cmain">+1 787 623 1455</span> to perform
                    calls with Huntease.
                  </p>
                  <Button className="Change-profile-btn">
                    Start making calls
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale, profile, code } = settings;
  return {
    locale,
    profile,
    code,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    changeLocale,
    darkMode,
    editProfile,
    getProfile,
    addPhoneNumber,
  })(AccountCall)
);

const clickId = `fileUploader_huntease2020`;
