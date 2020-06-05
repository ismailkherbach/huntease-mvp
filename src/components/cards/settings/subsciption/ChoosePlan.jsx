import React, { Fragment } from "react";
//import { Row, Col } from "reactstrap";
import PaimentPopup from "../../../popup/Paiement";
import { StripeProvider, Elements } from "react-stripe-elements";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51GqdyRBXLsKUPQbHXGJsCSA9tJYHPpXDa8Y8dChs4dW20yeQh3HT55oiMNmysRhogzBHWKSHvfCWr5DF9KlkKyfk00CQF8DBeX"
);

class ChoosePlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planChoosed: false,
      showPopup: false,
      progressStatus: "unchecked_stp1",
    };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }
  handleChoosePlan() {
    this.setState({
      planChoosed: !this.state.planChoosed,
      progressStatus: "checked_stp1",
    });
  }
  componentDidMount() {}

  render() {
    return (
      <Fragment>
        {this.state.showPopup ? (
          <StripeProvider
            apiKey={
              "pk_test_51GqdyRBXLsKUPQbHXGJsCSA9tJYHPpXDa8Y8dChs4dW20yeQh3HT55oiMNmysRhogzBHWKSHvfCWr5DF9KlkKyfk00CQF8DBeX"
            }
          >
            <Elements stripe={stripePromise}>
              <PaimentPopup
                text='Click "Close Button" to hide popup'
                closePopup={this.togglePopup.bind(this)}
              />
            </Elements>
          </StripeProvider>
        ) : null}
        <div className="top-bloc fdr aic jcc ">
          <div className="trial jcc ">
            <h3>Your free trial ends in 2 days</h3>
          </div>
        </div>
        <div className="buttomBloc flex fdc jcc aic">
          <div className="choosePlan flex fdc jcc aic">
            <img
              className="checked_stp"
              src={require(`../../../../assets/img/${this.state.progressStatus}.png`)}
            />
            <div className="flex fdr jcc aic">
              <h5>Choose plan</h5>
              <h5>Payment</h5>
              <h5>Success</h5>
            </div>
          </div>

          <div
            className={
              this.state.planChoosed ? "planDetails-clicked" : "planDetails"
            }
            onClick={this.handleChoosePlan.bind(this)}
          >
            <h5 className="Title">Huntease Growth</h5>
            <h5 className="Price">$59/mo</h5>
            <p>Learn more about this plan</p>
          </div>

          <div className="PromoCode flex fdc jcfs">
            <h2>Got a promo code?</h2>
            <div className="flex fdr aic">
              <input name="codePromo" placeholder="Promo code" />
              <div className="billing_btn flex aic jcc">
                <h2>Apply</h2>
              </div>
            </div>
          </div>
        </div>
        {this.state.planChoosed && (
          <div className="ButtomPricing flex fdr jcc aic">
            <h4>Estimated total of the upgrade (+ $1200) 5 seats</h4>
            <div
              className="procced flex aic jcc"
              onClick={this.togglePopup.bind(this)}
            >
              PROCCED
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default ChoosePlan;
