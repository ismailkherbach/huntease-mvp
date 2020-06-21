import React, { Fragment } from "react";
//import { Row, Col } from "reactstrap";
import PaimentPopup from "../../../popup/Paiement";
import { StripeProvider, Elements } from "react-stripe-elements";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { applyDiscount, getPlans } from "../../../../redux/actions";
import Switch from "react-switch";

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
      checked: null,
      promoCode: "",
      checked: false,
    };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }
  handleChoosePlan(checked) {
    this.setState({
      planChoosed: !this.state.planChoosed,
      progressStatus: "checked_stp1",
      checked: !this.state.checked,
    });
  }
  handleKeyPress = (event) => {
    if (event.key === "ENTER") {
      this.setState({
        showPopup: !this.state.showPopup,
      });
    }
  };
  handleChangePromo(e) {
    this.setState({
      promoCode: e.target.value,
    });
  }

  onDiscount = () => {
    let promoCode = this.state.promoCode;
    this.props.applyDiscount({ promoCode });
    console.log(promoCode);
  };
  SetChecked() {
    this.setState({ checked: !this.state.checked });
  }
  componentDidMount() {
    this.props.getPlans();
  }

  render() {
    return (
      <Fragment>
        {this.state.showPopup ? (
          <StripeProvider
            apiKey={
              "pk_test_51GqdyRBXLsKUPQbHXGJsCSA9tJYHPpXDa8Y8dChs4dW20yeQh3HT55oiMNmysRhogzBHWKSHvfCWr5DF9KlkKyfk00CQF8DBeX"
            }
          >
            <Elements id="cardElement" stripe={stripePromise}>
              <PaimentPopup
                text='Click "Close Button" to hide popup'
                closePopup={this.togglePopup.bind(this)}
                plan={this.props.payment.plans[0]}
                discount={
                  this.props.payment.discount != null
                    ? this.props.payment.discount
                    : false
                }
              />
            </Elements>
          </StripeProvider>
        ) : null}
        <div className="Top-Action-Bloc flex fdr aic jcc">
          <h2>Your free trial ends in 2 days</h2>
        </div>
        <div className="Plans-bloc flex fdc jcc aic">
          <div className="choosePlan flex fdc jcc aic">
            <img
              className="checked_stp"
              src={require(`../../../../assets/img/${this.state.progressStatus}.png`)}
            />
            <div className="flex fdr jcc aic">
              <p>Choose plan</p>
              <p>Payment</p>
              <p>Success</p>
            </div>
          </div>
          <div className="flex fdr aic jcc">
            {" "}
            <div
              className={
                this.state.planChoosed && this.state.checked == 1
                  ? "Plan Choosed flex aic jcc fdc"
                  : "Plan flex aic jcc fdc"
              }
              onClick={this.handleChoosePlan.bind(this, 1)}
            >
              <h5 className="flex aic jcc">
                {this.props.payment.plans
                  ? this.props.payment.plans[0].name
                  : ""}
              </h5>
              <h2 className="Price">
                €
                {this.props.payment.plans
                  ? this.props.payment.plans[0].price
                  : ""}
                /mo
              </h2>
              <p>Learn more about this plan</p>
              <div
                className={
                  this.state.planChoosed && this.state.checked == 1
                    ? "discount AtiveDiscount flex aic jcc"
                    : "discount flex aic jcc"
                }
              >
                <p>Save 10% off</p>
              </div>
            </div>
          </div>
          <div className="Toggle flex fdr aic jcc">
            <p>Monthly</p>
            <Switch
              offColor="#D6DCF4"
              onColor="#D6DCF4"
              width={41}
              height={19}
              offHandleColor="#0026BC"
              onHandleColor="#0026BC"
              uncheckedIcon={false}
              checkedIcon={false}
              className="toggle"
              onChange={this.SetChecked.bind(this)}
              checked={this.state.checked}
            />
            <h5>Annually (Save 10%)</h5>
          </div>
          <div className="PromoCode flex fdc jcfs">
            <h5>Got a promo code?</h5>
            <div className="flex fdr aic">
              <input
                name="codePromo"
                placeholder="Promo code"
                onChange={(e) => this.handleChangePromo(e)}
              />
              <Button
                className="Change-profile-btn flex aic jcc"
                onClick={this.onDiscount}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
        {this.state.planChoosed && (
          <div className="ProccedBloc flex fdr jcc aic">
            <p>
              Estimated total of the upgrade <b>(+ €1200) </b>5 seats
            </p>
            <Button
              className="Change-profile-btn flex aic jcc"
              onClick={this.togglePopup.bind(this)}
            >
              PROCCED
            </Button>
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ payment }) => {
  return {
    payment,
  };
};

export default connect(mapStateToProps, {
  applyDiscount,
  getPlans,
})(ChoosePlan);
