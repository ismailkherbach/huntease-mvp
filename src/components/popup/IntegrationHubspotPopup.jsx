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
      <div className="popup-integration">
        <div className="popup_inner-integration">
          <h4 className="float-right" onClick={this.props.closePopup}>
            x
          </h4>

          <h4>Hubspot integration</h4>
          <div className="inlineBtn-left ml-4">
            <img
              alt={"hubspot"}
              src={require("../../assets/img/hubspot.svg")}
            />
            <div className="inlinetBtn-center mt-3">
              <h5>Hubspot</h5>
              <p>{this.props.call.message}</p>
            </div>
          </div>
          <div className="inlineBtn-center">
            <Formik initialValues={initialValues} onSubmit={this.onIntegrate}>
              {({ errors, touched }) => (
                <Form class>
                  <FormGroup>
                    <Field
                      className={
                        errors.apiKey && touched.apiKey
                          ? "auth-input-large-error"
                          : "auth-input-large"
                      }
                      name="apiKey"
                      validate={this.validateApiKey}
                      placeholder="API Key"
                    />
                  </FormGroup>

                  <div className="inlineBtn-center">
                    <Button className="confirm-btn">
                      {this.props.call.loading ? (
                        <Spinner animation="border" />
                      ) : (
                        "Integrate"
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>{" "}
          </div>
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
