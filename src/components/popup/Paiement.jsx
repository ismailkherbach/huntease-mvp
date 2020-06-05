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

  handleSubmit = (evt) => {
    evt.preventDefault();
    const billing_details = {
      name: this.state.user.firstName + " " + this.state.user.lastName,
    };
    if (this.props.stripe) {
      this.props.stripe
        .createToken(billing_details)
        .then((response) => console.log(response));
      console.log(evt);
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    return (
      <div className="popup-paiement">
        <div className="planChoosed flex fdr aic jcc">
          <div className="pleft">
            <h5>Plan: Huntease Growth</h5>
            <h5>Billing: Annual</h5>
            <h5>Accounts: 5 seats</h5>
          </div>
          <div className="pright">
            <h5>Estimated total:</h5>
            <h2>$3540</h2>
          </div>
        </div>
        <div className="cb_infos flex fdc ">
          <div className="flex fdr aic  ">
            <img src={require("../../assets/img/paiement_2.png")} />
            <div className="Ttile">PAYMENT DETAILS</div>
            <img src={require("../../assets/img/kadna_blue.png")} />
          </div>
          <div className="Notice flex fdr aic">
            <img src={require("../../assets/img/paiement_policy.png")} />
            Influend Payment Protection: Only pay for work you authorize
          </div>
          <div className="flex fdr ">
            <div className="Ttile">Credit Card Number</div>
            <img
              className="float-right"
              src={require("../../assets/img/credit_cards.png")}
            />
          </div>
          <div className="card_inputs">
            <CardNumberElement
              className="cardNumber"
              {...createOptions()}
              onChange={this.handleChange}
            />
          </div>

          <div className="flex fdr ">
            <div className="Ttile">Name on card </div>
          </div>
          <div className="card_inputs">
            <input type="text" placeholder="" />
          </div>
          <div className="flex cvv fdr aic">
            <div className=" ">
              <div className="Ttile">Expiration Date </div>
              <CardExpiryElement
                className="cardCVV"
                {...createOptions()}
                onChange={this.handleChange}
              />{" "}
            </div>
            <div className=" ">
              <div className="Ttile">CVV Code</div>
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
          <div
            className="payNow flex aic jcc"
            onClick={this.handleSubmit.bind(this)}
          >
            COMPLETE PAYMENT
          </div>
          <div className="flex fdr aic jcc bottom-notice">
            <img src={require("../../assets/img/kadna.png")} />
            <p>Secure 256-bit SSL Encryption</p>
          </div>
        </div>
      </div>
    );
  }
}

export default injectStripe(PaimentPopup);

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
