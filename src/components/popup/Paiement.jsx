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

class PaimentPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      user: JSON.parse(localStorage.getItem("user")),
    };
  }

  handleChange = ({ error }) => {
    if (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    const billing_details = {
      name: this.state.user.firstName + " " + this.state.user.lastName,
    };
    if (this.props.stripe) {
      const tokenize = await this.props.stripe.createToken(billing_details);
      console.log(tokenize);
      let selectedPlan = 1;
      let token = tokenize.token.id;
      let billing = { token, selectedPlan };
      this.props.pay(billing);
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    return (
      <div className="popup-container flex aic jcc">
        <div className="paiment-popup flex fdc aic jcc">
          <div className="planChoosed flex fdr aic jcc">
            <div className="pleft">
              <h4>Plan: Huntease Growth</h4>
              <h4>Billing: Annual</h4>
              <h4>Accounts: 5 seats</h4>
            </div>
            <div className="pright">
              <h4>Estimated total:</h4>
              <h2>€3540</h2>
            </div>
          </div>
          <div className="cb_infos flex fdc ">
            <div className="paymentDetails flex fdr aic">
              <img src={require("../../assets/img/paiement_2.png")} />
              <h4>PAYMENT DETAILS</h4>
              <img src={require("../../assets/img/kadna_blue.png")} />
            </div>
            <div className="Notice flex fdr aic">
              <img src={require("../../assets/img/paiement_policy.png")} />
              <h5>
                Influend Payment Protection: Only pay for work you authorize
              </h5>
            </div>
            <div className="flex fdr ">
              <h4>Credit Card Number</h4>
              <img
                className="credit_card_svg"
                src={require("../../assets/img/credit_card.svg")}
              />
            </div>
            <CardNumberElement
              className="cardNumber"
              {...createOptions()}
              onChange={this.handleChange}
            />

            <div className="full-input">
              <label>Name on card </label>
              <input type="text" placeholder="Ismail kherbach" />
            </div>
            <div className="flex cvv fdr aic">
              <div className=" ">
                <h4>Expiration Date </h4>
                <CardExpiryElement
                  className="cardCVV"
                  {...createOptions()}
                  onChange={this.handleChange}
                />{" "}
              </div>
              <div className=" ">
                <h4>CVV Code</h4>
                <CardCVCElement
                  className="cardCVV"
                  {...createOptions()}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="alert-danger" role="alert">
              {this.state.errorMessage}
            </div>
            {this.props.stripe ? (
              <Button
                className="Change-profile-btn flex aic jcc"
                onClick={this.handleSubmit.bind(this)}
              >
                COMPLETE PAYMENT
              </Button>
            ) : (
              ""
            )}
            <div className="flex fdr aic jcc bottom-notice">
              <img src={require("../../assets/img/kadna.png")} />
              <h5>Secure 256-bit SSL Encryption</h5>
            </div>
          </div>
        </div>
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
})(injectStripe(PaimentPopup));

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
