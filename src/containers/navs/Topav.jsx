import React from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { Button } from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { darkMode } from "../../redux/actions";

class Topnav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: ""
    };
  }
  handleDarkMode = color => {
    this.props.darkMode(color);
  };
  render() {
    //           <p className="d-inline-block ">Ismail kherbach</p>

    return (
      <div className="topnav">
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
          <IntlMessages id="gretting" />
        </p>
        <Button className="btn-dark ml-4" onClick={this.handleDarkMode("dark")}>
          Dark mode
        </Button>
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
