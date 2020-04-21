import React from "react";
import axios from "axios";
const Twilio = require("twilio-client");

class CallTwilio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      muted: false,
      log: "Connecting...",
      countryCode: "213",
      currentNumber: "550207141",
      onPhone: false,
    };
    this.handleToggleCall = this.handleToggleCall.bind(this);
  }

  componentDidMount() {
    var self = this;

    console.log(Twilio.Connection);
    Twilio.Device.setup(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InNjb3BlOmNsaWVudDpvdXRnb2luZz9hcHBTaWQ9QVA0MGYyMWU5MDkyNDExYzcwZGNkYzY2NjY1Nzc4NjY4OSIsImlzcyI6IkFDNjlhODk2YTVhNzBlM2UxZTUzOGYyNmExODc3YTY1OTIiLCJleHAiOjE1ODc0MTUyNjIsImlhdCI6MTU4NzQxMTY2Mn0.gwbSMOHnOQDnWjn2L7SITJOTeAwKpo0cNslyC22mUYo",
      { audio: true }
    );
    Twilio.Device.ready(function() {
      self.log = "Connected";
    });

    // Fetch Twilio capability token from our Node.js server

    // Configure event handlers for Twilio Device
    Twilio.Device.disconnect(function() {
      self.setState({
        onPhone: false,
        log: "Call ended.",
      });
    });
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
      navigator.mediaDevices
        .getUserMedia(constraints)

        .catch(function(err) {
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
      this.setState({ log: "Calling " + n });
    } else {
      // hang up call in progress
      Twilio.Device.disconnectAll();
    }
  }
  render() {
    return (
      <div>
        <div>
          <div className="inlineBtn-center mt-5">
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

          <div className="call-section inlineBtn-center ">
            <div className="icon-call-section">
              <box-icon name="face" type="solid" color="#8BA3FF"></box-icon>
            </div>

            <div className="icon-call-section">
              <box-icon
                name="video-recording"
                type="solid"
                color="#8BA3FF"
              ></box-icon>
            </div>
            <div className="icon-call-section">
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
                  : "icon-call-section"
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
