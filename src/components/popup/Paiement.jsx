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

class PaimentPopup extends React.Component {
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

  async loadStripe() {
    const stripePromise = await loadStripe(
      "pk_test_51GqdyRBXLsKUPQbHXGJsCSA9tJYHPpXDa8Y8dChs4dW20yeQh3HT55oiMNmysRhogzBHWKSHvfCWr5DF9KlkKyfk00CQF8DBeX"
    );
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
    console.log(ev);
    const billing_details = {
      name: this.state.user.firstName + " " + this.state.user.lastName,
      address_line1: this.state.billing_details.address_line1,
      address_city: this.state.billing_details.address_city,
      address_zip: this.state.billing_details.address_zip,
      address_country: this.state.billing_details.address_country,
    };
    const cardElement = this.props.elements.getElement("card");
    console.log(this.props.elements);
    console.log(cardElement);
    this.props.stripe.confirmCardPayment(
      "pi_1GqjhbBXLsKUPQbHOLR4S9Zc_secret_faU0lf4aRNUonj2MJ9Hy43LDc",
      {
        payment_method: {
          card: cardElement,
          billing_details: billing_details,
        },
      }
    );
    const tokenize3D = await this.props.stripe.createSource({
      type: "card",
      currency: "eur",
      amount: 100,
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
          <div className="paiment-popup flex fdc aic jcc">
            {!this.state.success && (
              <div className="planChoosed flex fdr aic jcc">
                <div className="top-width flex fdc aic jcc">
                  <p>PLAN</p>
                  <h5>{this.props.plan.name}</h5>
                </div>
                <div className="top-width flex fdc aic jcc">
                  <p>SEATS</p>
                  <h5>5</h5>
                </div>
                <div className=" top-width flex fdc aic jcc">
                  <p>BILLING</p>
                  <h5>ANNUAL</h5>
                </div>
                <img src={require("../../assets/img/divider.svg")} />

                <div className="top-width flex fdc aic jcc">
                  <p>TOTAL</p>
                  <h2>
                    €
                    {this.props.discount != false
                      ? this.props.plan.price - this.props.discount
                      : this.props.plan.price}
                  </h2>
                </div>
              </div>
            )}

            {!this.state.success && (
              <div className="cb_infos flex fdc aic jcc">
                {!this.state.secondStep && (
                  <div className="inputsPay flex fdc">
                    <div className="paymentDetails flex fdr aifs jcfs">
                      <img src={require("../../assets/img/paiement_1.svg")} />
                      <h4>PERSONAL INFORMATION</h4>
                      <img src={require("../../assets/img/kadna_blue.png")} />
                    </div>
                    <div className="flex fdc aic jcc">
                      <div className="flex fdr aic jcc">
                        <div className="full-input small-input">
                          <label>First name</label>
                          <input
                            className="small-input"
                            type="text"
                            placeholder="Kherbach"
                          />
                        </div>
                        <div className="full-input small-input">
                          <label>Last name</label>
                          <input
                            className="small-input"
                            type="text"
                            placeholder="Ismail"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="billingAddress flex fdr aifs jcfs">
                      <p>BILLING ADDRESS</p>
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
                      {this.props.stripe ? (
                        <Button
                          className="Change-profile-btn flex aic jcc"
                          onClick={this.toggleSecondStep.bind(this)}
                        >
                          NEXT
                          <img
                            src={require("../../assets/img/awesome-arrow-right.svg")}
                          />
                        </Button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                )}{" "}
                {this.state.secondStep && (
                  <div className="flex fdc" ref="">
                    <div className="flex fdc aic jcc">
                      <Button
                        className="Change-profile-btn  previous flex aic jcc"
                        onClick={this.toggleSecondStep.bind(this)}
                      >
                        <img
                          src={require("../../assets/img/awesome-arrow-right.svg")}
                        />
                        PREVIOUS
                      </Button>
                    </div>
                    <div className="paymentDetails flex fdr aifs jcfs">
                      <img src={require("../../assets/img/paiement_2.svg")} />
                      <h4>PAYMENT DETAILS</h4>
                      <img src={require("../../assets/img/kadna_blue.png")} />
                    </div>

                    <div className="full-input">
                      <label>Credit Card Number</label>
                      <CardNumberElement
                        className="cardNumber"
                        {...createOptions()}
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className="flex cvv fdr aic">
                      <div className="full-input small-input">
                        <label>Security Code</label>
                        <CardCVCElement
                          className="cardCVV"
                          {...createOptions()}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="full-input small-input">
                        <label>Expiration date</label>
                        <CardExpiryElement
                          className="cardCVV small-input"
                          {...createOptions()}
                          onChange={this.handleChange}
                        />{" "}
                      </div>
                    </div>
                    <div className="alert-danger" role="alert">
                      {this.state.errorMessage}
                    </div>
                    <div className="flex fdc aic jcc">
                      {this.props.stripe ? (
                        <Button
                          className="Change-profile-btn pay flex aic jcc"
                          onClick={this.handleSubmit.bind(this)}
                        >
                          COMPLETE PAYMENT
                        </Button>
                      ) : (
                        ""
                      )}
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
