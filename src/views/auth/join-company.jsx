import React, { Fragment } from "react";
import ReactDOM from "react-dom";

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
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions";
import Btn from "../../components/small.componenets/Btn";
import axios from "axios";
import AddCompanyFirstStep from "./steps/addCompanyFirst";
import JoinCompanyFirstStep from "./steps/joinCompanyFirst";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

class JoinCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      joinCompany: false,
      addCompany: true,
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
  addCompanyStatus = () => {
    this.setState({ addCompany: true, joinCompany: false });
  };
  joinCompanyStatus = () => {
    this.setState({ addCompany: false, joinCompany: true });
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
      <div className="flex aic jcc fdr">
        <div className="flex fdc aic jcc">
          <Link to={"/user/add-company"}>
            <div
              className="Register-type flex aic jcc"
              onClick={this.addCompanyStatus}
            >
              <h4> Add a company</h4>
            </div>
          </Link>

          <div
            className="Register-typeActive flex aic jcc"
            onClick={this.joinCompanyStatus}
          >
            <h4> Join a company</h4>
          </div>
        </div>

        <JoinCompanyFirstStep />
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading };
};

export default connect(mapStateToProps, {
  registerUser,
})(JoinCompany);
