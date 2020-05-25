import React from "react";
import axios from "axios";
import { Button } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import AudioAnalyser from "./AudioAnalyser";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const Twilio = require("twilio-client");
const user = JSON.parse(localStorage.getItem("user"));
const client = new W3CWebSocket(
  `ws://radiant-bastion-46195.herokuapp.com/${user.id}`
);
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
      audio: null,
      emotions: {
        Happiness: "",
        Fear: "",
        Sadness: "",
        Anger: "",
        Neutrality: "",
      },
    };
    this.handleToggleCall = this.handleToggleCall.bind(this);
    this.handleToggleMute = this.handleToggleMute.bind(this);
    this.handleToggleGeneral = this.handleToggleGeneral.bind(this);
    this.toggleMicrophone = this.toggleMicrophone.bind(this);
    this.stopIt = this.stopIt.bind(this);
  }

  handleChangeEmotion(emotion) {
    this.setState({
      emotions: {
        Happiness: Math.round(emotion.Happiness.toFixed(4) * 100 * 10) / 10,
        Fear: Math.round(emotion.Fear.toFixed(4) * 100 * 10) / 10,
        Sadness: Math.round(emotion.Sadness.toFixed(4) * 100 * 10) / 10,
        Anger: Math.round(emotion.Anger.toFixed(4) * 100 * 10) / 10,
        Neutrality: Math.round(emotion.Neutrality.toFixed(4) * 100 * 10) / 10,
      },
    });
    console.log(this.state.emotions);
  }
  async getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    await this.setState({ audio });
  }
  async stopIt() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: false,
    });
    this.setState({ audio });
  }
  async getEmotions() {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (emotionPacket) => {
      console.log(emotionPacket);
    };
  }
  stopMicrophone() {
    this.state.audio.getTracks().forEach((track) => track.stop());
    this.setState({ audio: null });
  }

  toggleMicrophone() {
    if (this.state.audio) {
      this.stopMicrophone();
    } else {
      this.getMicrophone();
    }
  }
  fetchToken = async () => {
    var self = this;

    //console.log(localStorage.getItem("twilioToken"));
    Twilio.Device.setup(JSON.parse(localStorage.getItem("twilioToken")), {
      audioConstraints: true,
      audioHelper: true,
      pstream: true,
    });

    /*await axios
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
*/
    this.getMicrophone();

    await this.handleToggleCall();

    Twilio.Device.disconnect(function() {
      self.setState({
        onPhone: false,
        audio: false,
        log: "Call ended.",
      });
    });

    Twilio.Device.ready(function() {
      self.log = "Connected";
    });
  };
  componentDidMount() {
    console.log(this.props.visibleLeadId);
    this.fetchToken();
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (emotionPacket) => {
      let myData = JSON.parse(emotionPacket.data);
      //console.log(myData.data);
      this.handleChangeEmotion(myData.data);

      //this.handleChangeEmotion(emotionPacket.data)
    };
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
    var audio = !this.state.audio;
    this.setState({ muted: muted, audio: audio });
    Twilio.Device.activeConnection().mute(muted);
  }
  // Make an outbound call with the current number,
  // or hang up the current call
  handleToggleCall = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    var constraints = { audio: true, video: false };
    navigator.mediaDevices.getUserMedia(constraints).catch(function(err) {
      console.log(err.name + ": " + err.message);
    });
    if (!this.state.onPhone) {
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
        id: user.id,
      });

      this.setState({ log: "Calling" });
    } else {
      // hang up call in progress
      Twilio.Device.disconnectAll();
    }
  };
  render() {
    const Sadness = this.state.emotions.Sadness;
    let bloc;
    if (Sadness == "") {
      bloc = (
        <div className="icon-call-section" onClick={this.handleToggleGeneral}>
          <box-icon name="face" type="solid" color="#8BA3FF"></box-icon>
        </div>
      );
    } else {
      if (Sadness < 40) {
        bloc = (
          <div
            className="icon-call-section-emotion-sad-law"
            onClick={this.handleToggleGeneral}
          >
            <box-icon name="face" type="solid" color="white"></box-icon>
          </div>
        );
      }
      if (Sadness > 40 && Sadness < 65) {
        bloc = (
          <div
            className="icon-call-section-emotion-sad-medium "
            onClick={this.handleToggleGeneral}
          >
            <box-icon name="face" type="solid" color="white"></box-icon>
          </div>
        );
      }
      if (Sadness > 65) {
        bloc = (
          <div
            className="icon-call-section-emotion-sad-high"
            onClick={this.handleToggleGeneral}
          >
            <box-icon name="face" type="solid" color="white"></box-icon>
          </div>
        );
      }
    }
    return (
      <div>
        <div className="firstBlock">
          <h5>{this.state.log}</h5>
          {this.state.audio ? (
            <AudioAnalyser audio={this.state.audio} />
          ) : (
            <div className="emptyAudio">{"Hello"}</div>
          )}
          <img alt="avatar" src={this.props.visibleLeadId.picture} />
          <h3>
            {" "}
            {this.props.visibleLeadId.firstName +
              " " +
              this.props.visibleLeadId.lastName.split("(")[0]}
          </h3>
          <p>{this.props.visibleLeadId.jobtitle}</p>
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
                <div className="inlineBtn-col-center mt-2">
                  <div className="email-dropdown inlineBtn-center">
                    <img src={require("../../../assets/img/bxs-phone.png")} />
                    <input
                      className="lead-input"
                      placeholder={this.props.visibleLeadId.phones.fixe[1]}
                      type="text"
                      disabled
                    />{" "}
                  </div>

                  <div className="email-dropdown inlineBtn-center">
                    <img
                      src={require("../../../assets/img/bxs-envelope.png")}
                    />

                    <input
                      className="lead-input"
                      placeholder={this.props.visibleLeadId.emails[0]}
                      type="text"
                      disabled
                    />
                  </div>
                </div>
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
              <div className="inlineBtn-col-center mt-1">
                <div className="emotion-block">
                  <h4 className="mb-3">Lead emotions</h4>

                  <h3>
                    {this.state.emotions.Sadness == ""
                      ? "... Waiting ..."
                      : this.state.emotions.Sadness + " %"}
                  </h3>
                  {/*  <img
                    alt="emotion"
                    src={require("../../../assets/img/emotion-green.svg")}
                  />*/}
                </div>
              </div>
            </div>
          )}
          <div className="call-section inlineBtn-center">
            <div className="inline-col-center">
              {bloc}
              <p>
                {" "}
                {this.state.emotions.Sadness == ""
                  ? "..."
                  : this.state.emotions.Sadness + " %"}
              </p>
            </div>
            <div className="inline-col-center">
              <div className="icon-call-section">
                <box-icon
                  name="video-recording"
                  type="solid"
                  color="#8BA3FF"
                ></box-icon>
              </div>
              <p>Record</p>
            </div>
            <div className="inline-col-center">
              <div
                className="icon-call-section"
                onClick={this.handleToggleMute}
              >
                <box-icon
                  name={!this.state.audio ? "microphone-off" : "microphone"}
                  type="solid"
                  color="#8BA3FF"
                ></box-icon>
              </div>
              <p>Mute</p>
            </div>
            <div className="inline-col-center">
              <div className="icon-call-section">
                <box-icon
                  name="time-five"
                  type="solid"
                  color="#8BA3FF"
                ></box-icon>
              </div>
              <p>Later</p>
            </div>
            <div className="inline-col-center">
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
              <p>End</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CallTwilio;
