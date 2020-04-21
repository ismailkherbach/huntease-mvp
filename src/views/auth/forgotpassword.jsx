import React, { Fragment } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import Btn from "../../components/small.componenets/Btn";
import { connect } from "react-redux";
import { forgotPassword } from "../../redux/actions";
class FotgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
  }
  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
  onForgotPassword = (values) => {
    if (!this.props.loading) {
      if (values.email !== "") {
        this.props.forgotPassword(values, this.props.history);
      }
    }
  };

  validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Please enter your email address";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  };
  render() {
    const { email } = this.state;
    const initialValues = { email };

    return (
      <Fragment>
        <main className="auth-container-align">
          <div className="auth-container">
            <h3 className="btn-get-started-text">Reset your password</h3>
            <Formik
              initialValues={initialValues}
              onSubmit={this.onForgotPassword}
            >
              {({ errors, touched }) => (
                <Form>
                  <FormGroup>
                    <Field
                      className="auth-input-large"
                      name="email"
                      validate={this.validateEmail}
                      placeholder="Email"
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </FormGroup>
                  <div className="inlineBtn-center">
                    <Button className="btn-get-started">
                      <div className="btn-get-started-text">
                        Reset your password
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
  const { forgotUserMail, loading, error } = authUser;
  return { forgotUserMail, loading, error };
};

export default connect(mapStateToProps, {
  forgotPassword,
})(FotgotPassword);
