import React, { Fragment } from "react";
import { Col, Button } from "reactstrap";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions";
import axios from "axios";
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: ""
    };

    this.handleChangeFirst = this.handleChangeFirst.bind(this);
    this.handleChangeLast = this.handleChangeLast.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChangeFirst(e) {
    this.setState({ firstname: e.target.value });
  }
  handleChangeLast(e) {
    this.setState({ lastname: e.target.value });
  }
  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onUserRegister = () => {
    this.props.registerUser(this.state, this.props.history);
  };

  /*handleSubmit = () => {
    axios({
      method: "post",
      url: "http://localhost:5000/api/v1/auth/register",
      data: {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password
      }
    }).then(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  };*/

  render() {
    return (
      <Fragment>
        <main>
          <div className="auth-container">
            {" "}
            <h3 className="signin-text">Creat your account</h3>
            <Col>
              <input
                className="auth-input"
                placeholder="Nom"
                type="text"
                onChange={this.handleChangeFirst}
              />
            </Col>{" "}
            <Col>
              <input
                className="auth-input"
                placeholder="Prenom"
                type="text"
                onChange={this.handleChangeLast}
              />
            </Col>{" "}
            <Col>
              <input
                className="auth-input"
                placeholder="Work Email"
                type="text"
                onChange={this.handleChangeEmail}
              />
            </Col>{" "}
            <Col>
              <input
                className="auth-input"
                placeholder="Paasword"
                type="password"
                onChange={this.handleChangePassword}
              />
            </Col>
            <Button
              className="btn-get-started"
              style={{
                backgroundColor: "#ffc371",
                border: "none",
                borderRadius: "15px"
              }}
              onClick={this.onUserRegister}
            >
              <div
                className="btn-get-started-text"
                onClick={this.onUserRegister}
              >
                Get started
              </div>
            </Button>
            <div className="condition-term">
              <p>By creating an account, you agree to our Terms of</p>
              <p>Service and Privacy Policy</p>
              <p> Or continue with: </p>
            </div>
            <Button
              style={{
                backgroundColor: "#0177b5",
                border: "none",
                borderRadius: "15px"
              }}
              onClick={this.handleSubmit}
            >
              <div className="linkedinbtn">
                {" "}
                <img
                  alt={"linkedin"}
                  src={require("../../assets/img/linkedinbtn.svg")}
                />
                <h3>Sign in with Linkedin</h3>
              </div>
            </Button>
          </div>
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading };
};

export default connect(mapStateToProps, {
  registerUser
})(Register);
