import React, { Fragment } from "react";

import { Row, Col } from "reactstrap";

class ChoosePlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = { planChoosed: false };
  }
  handleChoosePlan() {
    this.setState({
      planChoosed: !this.state.planChoosed,
    });
  }
  componentDidMount() {}

  render() {
    return (
      <Fragment>
        <div className="top-bloc fdr aic jcc ">
          <div className="trial jcc ">
            <h3>Your free trial ends in 2 days</h3>
          </div>
        </div>
        <div className="buttomBloc flex fdc jcc aic">
          <div className="choosePlan flex fdr jcc aic">
            <div className="progressCircle flex jcc aic">
              {" "}
              <div className="innerBefore"></div>
            </div>
            <div className="progress"></div>
            <div className="progressCircle flex jcc aic">
              {" "}
              <div className="innerBefore"></div>
            </div>
            <div className="progress"></div>
            <div className="progressCircle flex jcc aic">
              {" "}
              <div className="innerBefore"></div>
            </div>{" "}
          </div>
          <div className=" flex fdr jcc aic">
            <h5>Choose plan</h5>
            <h5>Payment</h5>
            <h5>Success</h5>
          </div>
          <div
            className="planDetails"
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
            <div className="procced flex aic jcc">PROCCED</div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default ChoosePlan;
