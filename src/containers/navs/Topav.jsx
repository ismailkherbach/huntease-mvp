import React from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { Button, Row, Col } from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { darkMode } from "../../redux/actions";
import ProfilePopup from "../../components/popup/ProfilePopup";

class Topnav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "",
      greetingTo: JSON.parse(localStorage.getItem("user_id")),
      showPopup: false
    };
  }
  handleDarkMode = color => {
    this.props.darkMode(color);
  };

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  render() {
    //           <p className="d-inline-block ">Ismail kherbach</p>

    return (
      <div className="topnav">
        <Row className="inlineBtn-center">
          <Col>
            {" "}
            <img
              alt={"logo"}
              id="logo"
              src={require("../../assets/img/huntease_logo_icon_white.png")}
            />
            <img
              alt={"hamberger"}
              className="d-inline-block ml-4 hamburger"
              src={require("../../assets/img/menu_open.svg")}
            />
            <p className="d-inline-block ml-4 greeting">
              <IntlMessages id="gretting" />{" "}
              {localStorage.getItem("user_id")
                ? this.state.greetingTo.firstname +
                  " " +
                  this.state.greetingTo.lastname
                : ""}
            </p>
          </Col>
          <Col className="inlineBtn-col col-3">
            {" "}
            <p
              className="d-inline-block ml-4 disable-select"
              onClick={this.togglePopup.bind(this)}
            >
              {" "}
              {localStorage.getItem("user_id")
                ? this.state.greetingTo.firstname +
                  " " +
                  this.state.greetingTo.lastname
                : ""}
            </p>
          </Col>
        </Row>

        {this.state.showPopup ? (
          <ProfilePopup
            text='Click "Close Button" to hide popup'
            closePopup={this.togglePopup.bind(this)}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale } = settings;
  return {
    locale
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    darkMode
  })(Topnav)
);
/*   <Button className="btn-dark ml-4" onClick={this.handleDarkMode("dark")}>
 Dark mode
 </Button> */
