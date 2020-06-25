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
      general: true,
      endOfCall: false,
      audio: null,
      emotions: {
        Happiness: "",
        Fear: "",
        Sadness: "",
        Anger: "",
        Neutrality: "",
      },
      visibleLeadId: {
        emails: ["nazim.zidi23@gmail.com"],
        firstName: "nazim",
        id: "5ecd0f9b2fb22200171d7014",
        jobtitle: "CEO",
        lastName: "zidi",
        phones: { fixe: [], other: [] },
        picture:
          "https://huntease-mvp.herokuapp.com/v1/uploads/5ecd0f9a2fb22200171d7011",
        status: "NEW",
        website: null,
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
    this.getMicrophone();

    /* console.log(this.props.visibleLeadId);
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
    };*/
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
    return (
      <div className="leadDisplay flex fdc aic jcc">
        <div className="inCallTopBloc flex fdc aic jcc ">
          <p>IN A CALL</p>
          {this.state.audio ? (
            <AudioAnalyser audio={this.state.audio} />
          ) : (
            <div className="emptyAudio">{""}</div>
          )}
          <img src={this.props.visibleLeadId.picture} />
          <h2>
            {this.props.visibleLeadId.firstName +
              " " +
              this.props.visibleLeadId.lastName.split("(")[0]}
          </h2>
          <h5>{this.props.visibleLeadId.jobtitle}</h5>
          <h3>00:22</h3>
          <div className="toggleWindow flex fdr aic jcc">
            <h5 className="curs_pointer" onClick={this.handleToggleGeneral}>
              General info
            </h5>
            <h5>|</h5>
            <h5>Activity</h5>
          </div>
        </div>
        {this.state.general ? (
          <PerfectScrollbar>
            <div className="scroll-lead ">
              <div className="flex fdc aic jcc">
                <div className="social flex fdr aic jcc">
                  <img
                    className="float-right"
                    alt="empty-leads"
                    src={require("../../../assets/img/bxl-linkedin-square.svg")}
                  />
                  <h5>Linkedin</h5>
                  <img
                    className="float-right"
                    alt="empty-leads"
                    src={require("../../../assets/img/feather-globe.svg")}
                  />
                  <h5>Website</h5>
                  <Button className="Save-changes-btn">View in Hubspot</Button>
                </div>
                <div className="full-input flex fdr aic jcc">
                  <img
                    className="float-right"
                    alt="empty-leads"
                    src={require("../../../assets/img/bxs-phone.svg")}
                  />

                  <select>
                    {this.props.visibleLeadId.phones.fixe.map((phone) => {
                      if (phone != null) {
                        return <option>{phone}</option>;
                      } else return;
                    })}
                    {this.props.visibleLeadId.phones.other.map((phone) => {
                      if (phone != null) {
                        return <option>{phone}</option>;
                      } else return;
                    })}
                  </select>
                </div>
                <div className="full-input flex fdr aic jcc">
                  <img
                    className="float-right"
                    alt="empty-leads"
                    src={require("../../../assets/img/bxs-envelope.svg")}
                  />

                  <select>
                    {this.props.visibleLeadId.emails.map((email) => {
                      return <option>{email}</option>;
                    })}
                  </select>
                </div>
                <div className="leadStatus flex fdc aifs jcc">
                  <h4>Lead status</h4>
                </div>

                <div className="Status flex fdr aifs jcfs">
                  {leadStatus.map((status, i) => {
                    return (
                      <div
                        className={`StatusOne ${
                          this.props.visibleLeadId.status === leadKey[i]
                            ? "activeStatus"
                            : ""
                        } flex fdr aic jcc`}
                      >
                        {status}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </PerfectScrollbar>
        ) : (
          ""
        )}
        <div className="callSection flex fdr aic jcc">
          <div className="callBloc flex fdc aic jcc">
            <div className="callIcon flex fdc aic jcc">
              <img
                className="float-right"
                alt="empty-leads"
                src={require("../../../assets/img/callRecord.svg")}
              />
            </div>
            <p>Record</p>
          </div>
          <div className="callBloc flex fdc aic jcc">
            <div className="callIcon flex fdc aic jcc">
              <img
                className="float-right"
                alt="empty-leads"
                src={require("../../../assets/img/bxs-microphone-off.svg")}
              />
            </div>
            <p>Mute</p>
          </div>
          <div className="callBloc flex fdc aic jcc">
            <div className="callIcon flex fdc aic jcc">
              <img
                className="float-right"
                alt="empty-leads"
                src={require("../../../assets/img/bxs-time-five.svg")}
              />
            </div>
            <p>Later</p>
          </div>
          <div className="callBloc flex fdc aic jcc">
            <div className="callIcon callIconEnd flex fdc aic jcc">
              <img
                className="float-right"
                alt="empty-leads"
                src={require("../../../assets/img/bxs-phone-end.svg")}
              />
            </div>
            <p>End</p>
          </div>
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

const leadStatus = [
  "New",
  "Open",
  "Unqualified",
  "Connected",
  "Open deal",
  "In progress",
  "Attempted to contact",
  "Bad timing",
];

const leadKey = [
  "NEW",
  "OPEN",
  "UNQUALIFIED",
  "CONNECTED",
  "OPEN_DEAL",
  "IN_PROGRESS",
  "ATTEMPTED_TO_CONTACT",
  "BAD_TIMING",
];
