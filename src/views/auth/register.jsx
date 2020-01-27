import React, { Fragment } from "react";
import { Col, Button } from "reactstrap";
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginButton: true,
      firstname: "",
      lastname: "",
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    console.log(e.target.value);
  }

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
                onChange={this.handleChange}
              />
            </Col>{" "}
            <Col>
              <input
                className="auth-input"
                placeholder="Prénom"
                type="text"
                onChange={this.handleChange}
              />
            </Col>{" "}
            <Col>
              <input
                className="auth-input"
                placeholder="Work Email"
                type="text"
                onChange={this.handleChange}
              />
            </Col>{" "}
            <Col>
              <input
                className="auth-input"
                placeholder="Paasword"
                type="text"
                onChange={this.handleChange}
              />
            </Col>
            <Button
              className="btn-get-started"
              style={{
                backgroundColor: "#ffc371",
                border: "none",
                borderRadius: "15px"
              }}
            >
              <div className="btn-get-started-text">Get started</div>
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
