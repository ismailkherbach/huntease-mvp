import React from "react";
import { Button } from "reactstrap";
import "boxicons";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
  StripeProvider,
  Elements,
} from "react-stripe-elements";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { connect } from "react-redux";
import { pay } from "../../redux/actions";

const stripePromise = loadStripe(
  "pk_test_51GqdyRBXLsKUPQbHXGJsCSA9tJYHPpXDa8Y8dChs4dW20yeQh3HT55oiMNmysRhogzBHWKSHvfCWr5DF9KlkKyfk00CQF8DBeX"
);

class ChangeAddressPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      user: JSON.parse(localStorage.getItem("user")),
      secondStep: false,
      billing_details: {
        address_line1: "",
        address_city: "",
        address_zip: "",
        address_country: "",
      },
      success: false,
    };
    this.handleAdressChange = this.handleAdressChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this);
  }

  handleAdressChange(e) {
    this.setState({
      billing_details: {
        ...this.state.billing_details,
        address_line1: e.target.value,
      },
    });
  }
  handleZipChange(e) {
    this.setState({
      billing_details: {
        ...this.state.billing_details,
        address_zip: e.target.value,
      },
    });
  }
  handleCountryChange(e) {
    this.setState({
      billing_details: {
        ...this.state.billing_details,
        address_country: e.target.value,
      },
    });
  }
  handleCityChange(e) {
    this.setState({
      billing_details: {
        ...this.state.billing_details,
        address_city: e.target.value,
      },
    });
  }

  toggleSecondStep() {
    this.setState({ secondStep: !this.state.secondStep });
  }

  handleChange = ({ error }) => {
    if (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(this.state.billing_details);
    const billing_details = {
      name: this.state.user.firstName + " " + this.state.user.lastName,
      address_line1: this.state.billing_details.address_line1,
      address_city: this.state.billing_details.address_city,
      address_zip: this.state.billing_details.address_zip,
      address_country: this.state.billing_details.address_country,
    };
    if (this.props.stripe) {
      const tokenize = await this.props.stripe.createToken(billing_details);
      this.setState({ success: true });
      setTimeout(() => {
        this.props.closePopup();
      }, 2000);

      console.log(tokenize);
      let selectedPlan = 1;
      let token = tokenize.token.id;
      let billing = { token, selectedPlan };
      this.props.pay(billing);
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  handleSubmitWithSource = async (ev) => {
    ev.preventDefault();
    this.props.stripe.confirmCardPayment(
      "pi_1GqjhbBXLsKUPQbHOLR4S9Zc_secret_faU0lf4aRNUonj2MJ9Hy43LDc",
      {
        payment_method: {
          card: CardNumberElement,
        },
      }
    );
    const tokenize3D = await this.props.stripe.createSource({
      type: "card",
      currency: "eur",
      amount: 100000,
    });
    const cardSource = tokenize3D.source;
    const tokenize3Dresponse = await this.props.stripe.createSource({
      type: "three_d_secure",
      amount: cardSource.amount,
      currency: cardSource.currency,
      three_d_secure: {
        card: cardSource.id,
      },
      redirect: {
        return_url: "http://localhost:3000/app/settings/subscription",
      },
    });
    console.log(tokenize3Dresponse);
  };

  render() {
    return (
      <div className="popup-container flex aic jcc">
        {this.state.success && (
          <div className="paySuccess flex fdc aic jcc">
            <h4>CONGRATULATIONS!</h4>

            <div className="payTicket flex fdc aic jcc">
              <div className="top-width flex fdc aic jcc">
                <p>SUBSCRIPTION DATE</p>
                <h5>21 June, 2020</h5>
              </div>
              <div className="top-width flex fdc aic jcc">
                <p>PLAN</p>
                <h5>GROWTH</h5>
              </div>
              <div className="top-width flex fdc aic jcc">
                <p>SEATS</p>
                <h5>5</h5>
              </div>
              <div className=" top-width flex fdc aic jcc">
                <p>BILLING</p>
                <h5>ANNUAL</h5>
              </div>
              <img src={require("../../assets/img/divider_v.svg")} />

              <div className="top-width flex fdc aic jcc">
                <p>TOTAL</p>
                <h2>€3540</h2>
              </div>
            </div>
          </div>
        )}
        {!this.state.success && (
          <div className="ChangeAddressPopup  flex fdc aic jcc">
            {!this.state.success && (
              <div className="cb_infos  flex fdc aic jcc">
                {!this.state.secondStep && (
                  <div className="inputsPay flex fdc">
                    <div className="paymentDetails flex fdr aifs jcfs">
                      <h4>You're updating your billing address:</h4>
                    </div>
                    <div className="flex fdc aic jcc">
                      <div className="full-input">
                        <label>Address</label>
                        <input
                          type="text"
                          placeholder="Mazouna"
                          onChange={this.handleAdressChange}
                        />
                      </div>
                      <div className="flex fdr aic jcc">
                        <div className="full-input small-input">
                          <label>City</label>
                          <input
                            className="small-input"
                            type="text"
                            placeholder="Mazouna"
                            onChange={this.handleCityChange}
                          />
                        </div>
                        <div className="full-input small-input">
                          <label>Postal/Zip Code</label>
                          <input
                            className="small-input"
                            type="text"
                            placeholder="48002"
                            onChange={this.handleZipChange}
                          />
                        </div>
                      </div>
                      <div className="full-input">
                        <label>Country</label>
                        <input
                          type="text"
                          placeholder="Algeria"
                          onChange={this.handleCountryChange}
                        />
                      </div>
                      <Button
                        className="Change-profile-btn flex aic jcc"
                        onClick={this.toggleSecondStep.bind(this)}
                      >
                        Update my billing address
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}{" "}
      </div>
    );
  }
}

const mapStateToProps = ({ payment }) => {
  return {
    payment,
  };
};

export default connect(mapStateToProps, {
  pay,
})(ChangeAddressPopup);

const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: "14px",

        color: "#A8C4FF",
        letterSpacing: "0.025em",
        "::placeholder": {
          color: "#A8C4FF",
          paddingTop: "10px",
        },
      },
      invalid: {
        color: "red",
      },
    },
  };
};
