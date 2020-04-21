import React from "react";
import axios from "axios";
import { Button } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

const Twilio = require("twilio-client");
class CallTwilio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      muted: false,
      log: "Waiting for call",
      countryCode: "213",
      currentNumber: "550207141",
      onPhone: false,
      emotionAnalytics: true,
      general: false,
    };
    this.handleToggleCall = this.handleToggleCall.bind(this);
    this.handleToggleMute = this.handleToggleMute.bind(this);
    this.handleToggleGeneral = this.handleToggleGeneral.bind(this);
  }
  fetchToken = async () => {
    await axios
      .get("https://radiant-bastion-46195.herokuapp.com/token")
      .then((response) => {
        console.log(response.data.token);
        Twilio.Device.setup(response.data.token, {
          audioConstraints: true,
          audioHelper: true,
          pstream: true,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ log: "Could not fetch token, see console.log" });
      });
  };
  componentDidMount() {
    var self = this;
    this.fetchToken();

    Twilio.Device.disconnect(function() {
      self.setState({
        onPhone: false,
        log: "Call ended.",
      });
    });

    Twilio.Device.ready(function() {
      self.log = "Connected";
    });

    this.handleToggleCall();
  }
  // Handle country code selection
  handleChangeCountryCode(countryCode) {
    this.setState({ countryCode: countryCode });
  }

  // Handle number input
  handleChangeNumber(e) {
    this.setState({
      currentNumber: e.target.value,
      isValidNumber: /^([0-9]|#|\*)+$/.test(
        e.target.value.replace(/[-()\s]/g, "")
      ),
    });
  }
  handleToggleGeneral() {
    var general = !this.state.general;
    var emotionAnalytics = !this.state.emotionAnalytics;
    this.setState({ general: general, emotionAnalytics: emotionAnalytics });
  }
  // Handle muting
  handleToggleMute() {
    var muted = !this.state.muted;

    this.setState({ muted: muted });
    Twilio.Device.activeConnection().mute(muted);
  }
  // Make an outbound call with the current number,
  // or hang up the current call
  handleToggleCall() {
    if (!this.state.onPhone) {
      var constraints = { audio: true, video: false };
      navigator.mediaDevices.getUserMedia(constraints).catch(function(err) {
        console.log(err.name + ": " + err.message);
      });
      this.setState({
        muted: false,
        onPhone: true,
      });
      // make outbound call with current number
      var n =
        "+" +
        this.state.countryCode +
        this.state.currentNumber.replace(/\D/g, "");

      Twilio.Device.connect({
        number: n,
        audioConstraints: { audio: true, video: false },
      });
      this.setState({ log: "Calling" });
    } else {
      // hang up call in progress
      Twilio.Device.disconnectAll();
    }
  }
  render() {
    return (
      <div>
        <div className="firstBlock">
          <h5>{this.state.log}</h5>
          <img alt="avatar" src={require("../../../assets/img/0.jpeg")} />
          <h3>Ismail kherbach</h3>
          <p>Tech lead</p>
          <h2>{this.state.log}</h2>

          <div className="inlineBtn-center">
            <p onClick={this.handleToggleGeneral}>General</p>
            <p> | </p>
            <p>Activity</p>
          </div>
        </div>
        <div>
          {this.state.general && (
            <PerfectScrollbar>
              <div className="scroll-lead">
                <div className="inlineBtn-center mt-4">
                  <div className="inlineBtn-center">
                    <box-icon
                      name="linkedin-square"
                      type="logo"
                      color="#091ad4"
                    ></box-icon>
                    <h4>LinkedIn</h4>
                  </div>
                  <div className="inlineBtn-center">
                    <box-icon name="world" color="#091ad4"></box-icon>
                    <h4>Website</h4>
                  </div>
                  <Button className="hubspot">View in hubspot</Button>
                </div>
                <input
                  className="lead-input"
                  placeholder="+44 7911123456"
                  type="text"
                />{" "}
                <input
                  className="lead-input"
                  placeholder="gi_kherbach@esi.dz"
                  type="text"
                />
                <div className="leadStatus">
                  <h4>Lead status</h4>
                  <div className="inlineBtn-left">
                    <div className="lead-status">New</div>
                    <div className="lead-status">Open</div>
                    <div className="lead-status">Unqualified</div>
                    <div className="lead-status">Connected</div>{" "}
                    <div className="lead-status">Open deal</div>{" "}
                  </div>
                  <div className="inlineBtn-left">
                    <div className="lead-status">In progress</div>
                    <div className="lead-status-active">
                      Attempted to contact
                    </div>
                    <div className="lead-status">Bad time</div>
                  </div>
                </div>
              </div>
            </PerfectScrollbar>
          )}
          {this.state.emotionAnalytics && (
            <div className="inlineBtn-center mt-5 mb-5">
              <div className="inlineBtn-col-center mt-3">
                <div className="emotion-block">
                  <h3>+30</h3>
                  <h4>Enthusiasm</h4>
                  <img
                    alt="emotion"
                    src={require("../../../assets/img/emotion-green.svg")}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="call-section inlineBtn-center ">
            <div
              className="icon-call-section"
              onClick={this.handleToggleGeneral}
            >
              <box-icon name="face" type="solid" color="#8BA3FF"></box-icon>
            </div>

            <div className="icon-call-section">
              <box-icon
                name="video-recording"
                type="solid"
                color="#8BA3FF"
              ></box-icon>
            </div>
            <div className="icon-call-section" onClick={this.handleToggleMute}>
              <box-icon
                name={this.state.muted ? "microphone-off" : "microphone"}
                type="solid"
                color="#8BA3FF"
              ></box-icon>
            </div>
            <div className="icon-call-section">
              <box-icon
                name="time-five"
                type="solid"
                color="#8BA3FF"
              ></box-icon>
            </div>
            <div
              onClick={this.handleToggleCall}
              className={
                this.state.onPhone
                  ? "icon-call-section-off"
                  : "icon-call-section-start"
              }
            >
              <box-icon name="phone" type="solid" color="white"></box-icon>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CallTwilio;
