import React from "react";
import axios from "axios";
import { Button } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import AudioAnalyser from "./AudioAnalyser";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { endCall } from "../../../redux/actions";
import { connect } from "react-redux";

const Twilio = require("twilio-client");
const user = JSON.parse(localStorage.getItem("user"));
const client = new W3CWebSocket(
  `wss://radiant-bastion-46195.herokuapp.com/${user.id}`
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
      endOfCall: false,
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

  handleEndCall() {
    this.props.endCall("hello");
    Twilio.Device.disconnectAll();
    this.setState({
      endOfCall: true,
      emotionAnalytics: false,
    });
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
      console.log(emotionPacket);

      let response = JSON.parse(emotionPacket.data);
      console.log(emotionPacket);
      if (response.type == "call_emotions") {
        this.handleChangeEmotion(response.data);
      }

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
    let emotionsSmily = (
      <div className="inlineBtn-center-emotion">
        {" "}
        <div className="inlineBtn-col-center mx-2">
          {" "}
          <svg
            class="sad"
            width="15px"
            height="15px"
            viewBox="0 0 44 44"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
          >
            <g
              id="sad"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
              transform="translate(0, 0)"
            >
              <circle id="body" fill="#E23D18" cx="22" cy="22" r="22"></circle>
              <g id="face" transform="translate(13.000000, 20.000000)">
                <g class="face">
                  <path
                    d="M7,4 C7,5.1045695 7.8954305,6 9,6 C10.1045695,6 11,5.1045695 11,4"
                    class="mouth"
                    stroke="#2C0E0F"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    transform="translate(9.000000, 5.000000) rotate(-180.000000) translate(-9.000000, -5.000000) "
                  ></path>
                  <ellipse
                    class="right-eye"
                    fill="#2C0E0F"
                    cx="16.0941176"
                    cy="1.75609756"
                    rx="1.90588235"
                    ry="1.75609756"
                  ></ellipse>
                  <ellipse
                    class="left-eye"
                    fill="#2C0E0F"
                    cx="1.90588235"
                    cy="1.75609756"
                    rx="1.90588235"
                    ry="1.75609756"
                  ></ellipse>
                </g>
              </g>
            </g>
          </svg>
          <h5 className="emo-result">
            {" "}
            {this.state.emotions.Anger == ""
              ? "..."
              : this.state.emotions.Anger + " %"}
          </h5>{" "}
        </div>
        <div className="inlineBtn-col-center mx-2">
          {" "}
          <svg
            class="neutral"
            width="15px"
            height="15px"
            viewBox="0 0 44 44"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
          >
            <g>
              <circle id="body" fill="#F9AC1B" cx="22" cy="22" r="22"></circle>
              <g class="face">
                <g transform="translate(13.000000, 20.000000)" fill="#2C0E0F">
                  <g class="mouth">
                    <g transform="translate(9, 5)">
                      <rect x="-2" y="0" width="4" height="2" rx="2"></rect>
                    </g>
                  </g>
                  <ellipse
                    class="right-eye"
                    cx="16.0941176"
                    cy="1.75"
                    rx="1.90588235"
                    ry="1.75"
                  ></ellipse>
                  <ellipse
                    class="left-eye"
                    cx="1.90588235"
                    cy="1.75"
                    rx="1.90588235"
                    ry="1.75"
                  ></ellipse>
                </g>
              </g>
            </g>
          </svg>
          <h5 className="emo-result">
            {" "}
            {this.state.emotions.Sadness == ""
              ? "..."
              : this.state.emotions.Sadness + " %"}
          </h5>
        </div>
        <div className="inlineBtn-col-center mx-2">
          {" "}
          <svg
            class="fine"
            width="15px"
            height="15px"
            viewBox="0 0 44 44"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
          >
            <g
              id="fine-emotion"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <g id="fine">
                <circle
                  id="body"
                  fill="#1988E3"
                  cx="22"
                  cy="22"
                  r="22"
                ></circle>
                <g class="matrix" transform="translate(22.000000, 32.000000)">
                  <g class="face-container">
                    <g class="face" transform="translate(-9, -12)">
                      <g class="face-upAndDown">
                        <g class="eyes">
                          <ellipse
                            class="right-eye"
                            fill="#2C0E0F"
                            cx="16.0941176"
                            cy="1.75609756"
                            rx="1.90588235"
                            ry="1.75609756"
                          ></ellipse>
                          <ellipse
                            class="left-eye"
                            fill="#2C0E0F"
                            cx="1.90588235"
                            cy="1.75609756"
                            rx="1.90588235"
                            ry="1.75609756"
                          ></ellipse>
                        </g>
                        <path
                          d="M6.18823529,4.90499997 C6.18823529,5.95249999 7.48721095,7 9.08957864,7 C10.6919463,7 11.990922,5.95249999 11.990922,4.90499997"
                          id="mouth"
                          stroke="#2C0E0F"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
          <h5 className="emo-result">
            {" "}
            {this.state.emotions.Fear == ""
              ? "..."
              : this.state.emotions.Fear + " %"}
          </h5>
        </div>
        <div className="inlineBtn-col-center mx-2">
          {" "}
          <svg
            class="happy"
            width="44px"
            height="44px"
            viewBox="0 0 44 44"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
          >
            <g
              id="Happy"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
              transform="translate(0, 0)"
            >
              <circle id="Body" fill="#248C37" cx="22" cy="22" r="22"></circle>
              <g class="scaleFace">
                <g class="face">
                  <ellipse
                    id="Eye-right"
                    fill="#2C0E0F"
                    cx="29.0875"
                    cy="21.75"
                    rx="1.89926471"
                    ry="1.75"
                  ></ellipse>
                  <ellipse
                    id="Eye-left"
                    fill="#2C0E0F"
                    cx="14.8992647"
                    cy="21.75"
                    rx="1.89926471"
                    ry="1.75"
                  ></ellipse>
                  <path
                    d="M21.8941176,27.8819633 C24.8588235,27.8819632 25.4941176,25.5404999 25.4941176,24.5648901 C25.4941176,23.5892803 24.4352941,23.9795242 22.1058824,23.9795242 C19.7764706,23.9795242 18.2941176,23.5892803 18.2941176,24.5648901 C18.2941176,25.5404999 18.9294118,27.8819633 21.8941176,27.8819633 Z"
                    id="Mouth"
                    fill="#2C0E0F"
                  ></path>
                  <ellipse
                    id="Tung"
                    fill="#E23D18"
                    cx="21.8941176"
                    cy="26.4390244"
                    rx="1.69411765"
                    ry="0.780487805"
                  ></ellipse>
                </g>
              </g>
            </g>
          </svg>
          <h5 className="emo-result">
            {" "}
            {this.state.emotions.Happiness == ""
              ? "..."
              : this.state.emotions.Happiness + " %"}
          </h5>
        </div>
      </div>
    );
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

          {this.state.endOfCall && (
            <div className="inlineBtn-col-center mt-4">
              <img src={require("../../../assets/img/hand_shake.png")} />
              <h3 className="mt-1">You did well</h3>
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
                  <div className="lead-status-active">Attempted to contact</div>
                  <div className="lead-status">Bad time</div>
                </div>
              </div>
            </div>
          )}

          {this.state.emotionAnalytics && (
            <div>
              <div className="inlineBtn-center mt-5 mb-5">
                <div className="inlineBtn-col-center mt-1">
                  <div className="emotion-block">
                    {/*<h4 className="mb-3">Lead emotions</h4>*/}

                    {emotionsSmily}
                    {/*  <img
                    alt="emotion"
                    src={require("../../../assets/img/emotion-green.svg")}
                  />*/}
                  </div>
                </div>
              </div>
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

                {this.state.onPhone && (
                  <div className="inline-col-center">
                    <div
                      onClick={this.handleEndCall.bind(this)}
                      className="icon-call-section-off"
                    >
                      <box-icon
                        name="phone"
                        type="solid"
                        color="white"
                      ></box-icon>
                    </div>
                    <p>End</p>
                  </div>
                )}

                {!this.state.onPhone && (
                  <div className="inline-col-center">
                    <div
                      onClick={this.handleToggleCall}
                      className="icon-call-section-start"
                    >
                      <box-icon
                        name="phone"
                        type="solid"
                        color="white"
                      ></box-icon>
                    </div>
                    <p>End</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ call }) => {
  return {
    call,
  };
};

export default connect(mapStateToProps, {
  endCall,
})(CallTwilio);
