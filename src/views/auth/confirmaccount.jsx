import React, { Fragment } from "react";
import { Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { confirmAccount } from "../../redux/actions";
class ConfirmAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
    };
  }

  componentWillMount() {
    this.setState({ token: this.props.match.params.confirmToken }, () => {
      let confirmToken = this.state.token;
      let history = this.props.history;
      this.props.confirmAccount({
        confirmToken,
        history,
      });
    });
  }
  render() {
    return (
      <Fragment>
        <div className="auth-bloc-container flex fdc aic jcc">
          <h2>Account confirmation</h2>
          {this.props.authUser.loading ? (
            <div className="inlineBtn-center">
              <Spinner animation="border" />
            </div>
          ) : null}
          {this.props.authUser.error && <p>{this.props.authUser.error}</p>}
          <div className="condition-term">
            <Link to={"/user/login"}>
              <p>Go back to Sign in</p>
            </Link>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  return { authUser };
};

export default connect(mapStateToProps, {
  confirmAccount,
})(ConfirmAccount);
