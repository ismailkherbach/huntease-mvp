import React, { Fragment } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import Btn from "../../components/small.componenets/Btn";
import { connect } from "react-redux";
import { resetPassword } from "../../redux/actions";
class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
      token: "",
    };
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }
  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }
  onResetPassword = (values) => {
    if (!this.props.loading) {
      if (values.password !== "" && values.password == values.confirmPassword) {
        let resetPasswordCode = values.token;
        let newPassword = values.password;
        let history = this.props.history;
        this.props.resetPassword({ resetPasswordCode, newPassword, history });
      }
    }
  };
  validatePassword = (value) => {
    let error;
    if (!value) {
      error = "Please enter your password";
    } else if (value.length < 7) {
      error = "Value must be longer than 8 characters";
    }
    return error;
  };
  componentWillMount() {
    this.setState({ token: this.props.match.params.token });
  }
  render() {
    const { password, confirmPassword, token } = this.state;
    const initialValues = { password, confirmPassword, token };

    return (
      <Fragment>
        <main className="auth-container-align">
          <div className="auth-container inlineBtn-col-center">
            {" "}
            <h3 className="btn-get-started-textt">Change your password</h3>
            <Formik
              initialValues={initialValues}
              onSubmit={this.onResetPassword}
            >
              {({ errors, touched }) => (
                <Form class>
                  <FormGroup>
                    <Field
                      className={
                        errors.password && touched.password
                          ? "auth-input-large-error"
                          : "auth-input-large"
                      }
                      type="password"
                      name="password"
                      validate={this.validatePassword}
                      placeholder="New password"
                    />
                    <div className="inlineBtn-col-left">
                      <Field
                        className={
                          errors.confirmPassword && touched.confirmPassword
                            ? "auth-input-large-error"
                            : "auth-input-large"
                        }
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm new password"
                        validate={this.validatePassword}
                      />
                      {errors.password && touched.password && (
                        <p className="error-message">{errors.password}</p>
                      )}
                    </div>

                    {this.props.authUser.error && (
                      <div className="inlineBtn-center">
                        <div className="error-block">
                          {this.props.authUser.error}
                        </div>
                      </div>
                    )}
                  </FormGroup>
                  <div className="inlineBtn-center">
                    <Button className="btn-get-started">
                      <div className="btn-get-started-text">
                        Change your password
                      </div>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>{" "}
            <div className="condition-term">
              <Link to={"/user/login"}>
                <p>Go back to Sign in</p>
              </Link>
            </div>
          </div>
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  return { authUser };
};

export default connect(mapStateToProps, {
  resetPassword,
})(ResetPassword);
