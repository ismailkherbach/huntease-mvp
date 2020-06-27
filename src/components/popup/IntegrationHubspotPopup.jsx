import React from "react";
import { FormGroup, Button, Spinner } from "reactstrap";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { integrateHubspot, getIntegration } from "../../redux/actions";
import "boxicons";
class IntegrationHubspotPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiKey: "" };
  }

  onIntegrate = (values) => {
    this.props.integrateHubspot(values);
  };
  validateApiKey = (value) => {
    let error;
    if (!value) {
      error = "Please enter your api key";
    } else if (value.length < 3) {
      error = "Value must be longer than 3 characters";
    }
    return error;
  };

  render() {
    const { apiKey } = this.state;
    const initialValues = { apiKey };
    return (
      <div className="popup-container flex aic jcc">
        <div className="popup_inner-integration flex fdc jcc">
          <div className="flex fdr aic jcfs">
            <div className="topBloc flex fdr aic">
              {" "}
              <img
                alt={"hubspot"}
                src={require("../../assets/img/hubspot.svg")}
              />
              <div className="flex fdc aifs jcfs">
                <h4>Hubspot</h4>
                <h5>CRM</h5>
              </div>
            </div>
            <img
              className="curs_pointer"
              onClick={this.props.closePopup}
              alt={"hubspot"}
              src={require("../../assets/img/bx-x.svg")}
            />
          </div>
          <h5>
            Please paste your HubSpot API key in order to complete the
            integration.
          </h5>
          <div className="flex fdc aic jcc">
            <Formik initialValues={initialValues} onSubmit={this.onIntegrate}>
              {({ errors, touched }) => (
                <Form>
                  <FormGroup>
                    <Field
                      className={
                        errors.apiKey && touched.apiKey
                          ? "auth-input-large-error"
                          : "auth-input-large"
                      }
                      name="apiKey"
                      validate={this.validateApiKey}
                      placeholder="Your API key goes here"
                    />
                  </FormGroup>

                  <div className="flex fdr aic jcc">
                    <Button
                      className="Change-profile-btn generateApi"
                      target="_blank"
                      href="https://app.hubspot.com/api-key/"
                    >
                      Generate my API Key
                    </Button>
                    <Button className="Change-profile-btn">
                      {this.props.call.loading ? (
                        <Spinner animation="border" />
                      ) : (
                        "Integrate Hubspot"
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>{" "}
          </div>
          <p>
            You have to be a HubSpot{" "}
            <span className="Corange Bold">Super Admin</span> to be able to
            generate an API key.
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ call }) => {
  return {
    call,
  };
};

export default connect(mapStateToProps, {
  integrateHubspot,
})(IntegrationHubspotPopup);
