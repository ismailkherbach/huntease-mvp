import React from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { Button, Row, Col } from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { darkMode, getProfile } from "../../redux/actions";
import ProfilePopup from "../../components/popup/ProfilePopup";

class Topnav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "",
      greetingTo: JSON.parse(localStorage.getItem("user_id")),
      showPopup: false,
    };
  }
  handleDarkMode = (color) => {
    this.props.darkMode(color);
  };

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }
  componentDidMount() {
    this.props.getProfile();
  }
  render() {
    //           <p className="d-inline-block ">Ismail kherbach</p>

    return (
      <div className="topnav-main flex aic jcc fdr">
        <img
          alt={"logo"}
          id="logo"
          src={require("../../assets/img/huntease_logo_icon_white.png")}
        />
        <div className="navcontainer flex fdr aic jcc">
          <h3 className="d-inline-block greeting">
            Good morning{" "}
            {this.props.profile &&
              this.props.profile.firstName.charAt(0).toUpperCase() +
                this.props.profile.firstName.slice(1) +
                " " +
                this.props.profile.lastName}
          </h3>

          {this.props.profile ? (
            <h5>
              {this.props.profile.firstName.charAt(0).toUpperCase() +
                this.props.profile.firstName.slice(1) +
                " " +
                this.props.profile.lastName}
            </h5>
          ) : (
            ""
          )}
          <img
            alt={"logo"}
            className="avatar"
            src={`https://huntease-mvp.herokuapp.com/v1/uploads/${this.props.profile.picture}`}
          />
        </div>
      </div>
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
    darkMode,
    getProfile,
  })(Topnav)
);
/*   <Button className="btn-dark ml-4" onClick={this.handleDarkMode("dark")}>
 Dark mode
 </Button> */
