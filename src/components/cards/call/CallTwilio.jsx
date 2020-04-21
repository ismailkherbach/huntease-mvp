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
    this.handleToggleMute = this.handleToggleMute.bind(this);
  }

  componentDidMount() {
    var self = this;
    axios
      .get("https://radiant-bastion-46195.herokuapp.com/token")
      .then((response) => {
        console.log(response.data.token);
        const { token } = response.data.token;
        Twilio.Device.setup(response.data.token, {
          audioConstraints: true,
          audioHelper: true,
          pstream: true,
        });
      })
      .catch((error) => {
        console.log(error);
        self.setState({ log: "Could not fetch token, see console.log" });
      });

    Twilio.Device.disconnect(function() {
      self.setState({
        onPhone: false,
        log: "Call ended.",
      });
    });

    Twilio.Device.ready(function() {
      self.log = "Connected";
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
