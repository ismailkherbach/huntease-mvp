import React, { Fragment } from "react";

import { Row, Col } from "reactstrap";

class Subscribed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [
        {
          Date: 1,
          Amount: "Wasif",
          Status: 21,
          Transaction_ID: "wasif@email.com",
          Invoice: "PDF",
        },
        {
          Date: 2,
          Amount: "Wasif",
          Status: 21,
          Transaction_ID: "wasif@email.com",
          Invoice: "PDF",
        },
        {
          Date: 3,
          Amount: "Wasif",
          Status: 21,
          Transaction_ID: "wasif@email.com",
          Invoice: "PDF",
        },
        {
          Date: 4,
          Amount: "Wasif",
          Status: 21,
          Transaction_ID: "wasif@email.com",
          Invoice: "PDF",
        },
      ],
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

  componentDidMount() {}

  render() {
    return (
      <Fragment>
        <div className="top-bloc fdr aic ">
          <div className="left ">
            <h5>Current plan</h5>
            <h3>Huntease Growth</h3>
          </div>
          <div className="top-bloc fdr aic jcfe ">
            <div className="right ">
              <div className="billing_btn flex aic jcc">
                <h5>Change plan</h5>
              </div>
              <p>Cancel Subscription</p>{" "}
            </div>
          </div>
        </div>
        <div className="scd-bloc fdr ">
          <div className="left ">
            <h5>Billing</h5>
            <p>
              Your next payment will be due on<span>Jan 25th, 2021</span>
            </p>
          </div>
          <div className=" aic jcfe ">
            <div className="right ">
              <div className="billing_btn flex aic jcc">
                <h5>Change address</h5>
              </div>
            </div>
          </div>{" "}
        </div>
        <div className="scd-bloc fdr">
          <div className="left aic">
            <h5>Payment Information</h5>
            <div className="flex fdr aic">
              <img src={require("../../../../assets/img/billing_master.png")} />
              <p>Master Card ending with ****0814</p>
            </div>
          </div>
          <div className=" aic jcfe ">
            <div className="right ">
              <div className="billing_btn flex aic jcc">
                <h5>Change payment</h5>
              </div>
            </div>
          </div>{" "}
        </div>
        <div className="scd-bloc fdr ">
          <div className="left ">
            <h5>Billing History</h5>
          </div>
        </div>

        <table id="paymentHistory">
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default Subscribed;
