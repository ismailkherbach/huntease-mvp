import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Formik, Form, Field } from "formik";
import {
  Col,
  Button,
  Input,
  Label,
  FormGroup,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Dropdown,
} from "reactstrap";
import Btn from "../../../components/small.componenets/Btn";
import axios from "axios";
import JoinCompanySecondStep from "./joinCompanySecond";
import { connect } from "react-redux";
import {
  joinTeamMember,
  joinTeamMemberError,
  registerSimpleUser,
} from "../../../redux/actions";
class JoinCompanyFirstStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      password: "",
      teamJoinCode: "",
      secondStepStatus: false,
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
  }
  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
  onJoinTeam = (values) => {
    if (!this.props.loading) {
      if (values.teamJoinCode !== "") {
        this.props.joinTeamMember(values, this.props.history);
      }
    }
  };
  componentDidUpdate() {}
  componentDidMount() {
    if (this.props.authUser.error == "invalid team code") {
      this.setState({ secondStepStatus: true });
    }
  }
  validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Please enter your email address";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  };
  secondStep = () => {
    this.setState({ secondStepStatus: true });
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
    const { teamJoinCode } = this.state;
    const initialValues = { teamJoinCode };
    return (
      <div>
        {this.props.authUser.teamJoinCode.valid != true && (
          <Fragment>
            <div className="auth-container">
              {" "}
              <img
                alt="joinIlust"
                src={require("../../../assets/img/intellectual-property.png")}
              />
              <div className="inlineBtn-center">
                <h3>Ask your administrator for an invitation!</h3>
              </div>
              <Formik initialValues={initialValues} onSubmit={this.onJoinTeam}>
                {({ errors, touched }) => (
                  <Form>
                    <FormGroup>
                      <Field
                        className="auth-input-large"
                        name="teamJoinCode"
                        // validate={this.validateEmail}
                        placeholder="Team code"
                      />
                      {errors.teamCode && touched.teamCode && (
                        <div className="invalid-feedback d-block">
                          {errors.teamCode}
                        </div>
                      )}
                    </FormGroup>
                    <div className="inlineBtn-center">
                      <Button className="btn-get-started">
                        <div className="btn-get-started-text">
                          Join this company{" "}
                        </div>
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>{" "}
            </div>
          </Fragment>
        )}
        {this.props.authUser.teamJoinCode.valid == true && (
          <JoinCompanySecondStep
            dataUser={this.props.authUser.teamJoinCode.user}
            registerUser={this.props.registerSimpleUser}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  return { authUser };
};
export default connect(mapStateToProps, {
  joinTeamMember,
  joinTeamMemberError,
  registerSimpleUser,
})(JoinCompanyFirstStep);
