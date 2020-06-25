import React, { Fragment } from "react";

import { Row, Col, Button } from "reactstrap";
import { connect } from "react-redux";
import { getPaimentHistory, getCardInfo } from "../../../../redux/actions";
import { StripeProvider, Elements } from "react-stripe-elements";
import { loadStripe } from "@stripe/stripe-js";
import CancelSubscriptionPopup from "../../../popup/CancelSubscriptionPopup";
import ChangeAddressPopup from "../../../popup/ChangeAddress";
import ChangeCardPopup from "../../../popup/ChangeCard";

const stripePromise = loadStripe(
  "pk_test_51GqdyRBXLsKUPQbHXGJsCSA9tJYHPpXDa8Y8dChs4dW20yeQh3HT55oiMNmysRhogzBHWKSHvfCWr5DF9KlkKyfk00CQF8DBeX"
);
class Subscribed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [
        {
          Date: "Mar 27, 2020",
          Amount: "Wasif",
          Status: 21,
          Transaction_ID: "wasif@email.com",
          Invoice: "PDF",
        },
        {
          Date: "Mar 27, 2020",
          Amount: "Wasif",
          Status: 21,
          Transaction_ID: "wasif@email.com",
          Invoice: "PDF",
        },
      ],
      changeAddress: false,
      changeCard: false,
      cancelSubscription: false,
    };
  }

  renderTableData() {
    return this.state.students.map((student, index) => {
      const { Date, Amount, Status, Transaction_ID, Invoice } = student; //destructuring
      return (
        <tr key={Date}>
          <td>{Date}</td>
          <td>{Amount}</td>
          <td>{Status}</td>
          <td>{Transaction_ID}</td>
          <td>{Invoice}</td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    let header = Object.keys(this.state.students[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }
  togglePopup() {
    this.setState({
      changeAddress: !this.state.changeAddress,
    });
  }
  togglePopupCard() {
    this.setState({
      changeCard: !this.state.changeCard,
    });
  }
  togglePopupCancel() {
    this.setState({
      cancelSubscription: !this.state.cancelSubscription,
    });
  }
  componentDidMount() {
    this.props.getPaimentHistory();
    this.props.getCardInfo();
    console.log(this.props.payment.cardInfo);
  }

  render() {
    return (
      <Fragment>
        {this.state.changeCard ? (
          <StripeProvider
            apiKey={
              "pk_test_51GqdyRBXLsKUPQbHXGJsCSA9tJYHPpXDa8Y8dChs4dW20yeQh3HT55oiMNmysRhogzBHWKSHvfCWr5DF9KlkKyfk00CQF8DBeX"
            }
          >
            <Elements id="cardElement" stripe={stripePromise}>
              <ChangeCardPopup
                text='Click "Close Button" to hide popup'
                closePopup={this.togglePopupCard.bind(this)}
              />
            </Elements>
          </StripeProvider>
        ) : null}
        {this.state.changeAddress ? (
          <ChangeAddressPopup
            text='Click "Close Button" to hide popup'
            closePopup={this.togglePopup.bind(this)}
          />
        ) : null}

        {this.state.cancelSubscription ? (
          <CancelSubscriptionPopup
            text='Click "Close Button" to hide popup'
            closePopup={this.togglePopupCancel.bind(this)}
          />
        ) : null}
        <div className="Top-Action-Bloc flex fdr aic jcfs">
          <div className="leftTop margin-left30 floatLeft">
            <h5>Current plan</h5>
            <h2>Huntease Growth</h2>
          </div>
          <div className="rightTop floatRight flex aic jcc fdc">
            <Button className="Change-profile-btn">Change plan </Button>
            <p onClick={this.togglePopupCancel.bind(this)}>
              Cancel Subscription
            </p>{" "}
          </div>
        </div>
        <div className="Billing-History">
          <div className="flex fdr aic jcfs">
            <div className="leftBottom">
              <h4>Billing</h4>
              <h3 className="margin-top30">
                Your next payment will be due on<b> Jan 25th, 2021</b>
              </h3>
            </div>
            <div className="rightBottom ">
              <Button
                className="Change-profile-btn flex aic jcc"
                onClick={this.togglePopup.bind(this)}
              >
                Change address
              </Button>
            </div>{" "}
          </div>
          <div className="flex fdr aic jcfs">
            <div className="margin-top35 margin-bottom35 leftBottom">
              <h4>Payment Information</h4>
              <div className="flex fdr aic">
                <img
                  src={require("../../../../assets/img/billing_master.png")}
                />
                <h3 className="padding-left10 padding-right30">
                  {this.props.payment.cardInfo
                    ? this.props.payment.cardInfo.brand +
                      " ending with ****" +
                      this.props.payment.cardInfo.last4
                    : ""}
                </h3>
                <img src={require("../../../../assets/img/bxs-lock.svg")} />
              </div>
            </div>
            <div className="rightBottom ">
              <Button
                className="Change-profile-btn flex aic jcc"
                onClick={this.togglePopupCard.bind(this)}
              >
                Change payment
              </Button>
            </div>
          </div>
          <div className="scd-bloc fdr ">
            <div className="left ">
              <h4>Billing History</h4>
            </div>
          </div>
          <div className="History-Table">
            <table>
              <tbody>
                <tr>{this.renderTableHeader()}</tr>
                {this.renderTableData()}
              </tbody>
            </table>
          </div>
        </div>
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
  getPaimentHistory,
  getCardInfo,
})(Subscribed);
