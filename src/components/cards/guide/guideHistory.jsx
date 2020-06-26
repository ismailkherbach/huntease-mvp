import React, { Fragment } from "react";
import {
  Spinner,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Col,
} from "reactstrap";
import { connect } from "react-redux";
import { getGuide, deleteGuide } from "../../../redux/actions";
import { Link, withRouter } from "react-router-dom";

import "boxicons";
class GuideHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onDeleteGuide(id) {
    let history = this.props.history;
    console.log(history);
    this.props.deleteGuide({ id, history });
  }

  componentDidMount() {
    this.props.getGuide();
  }
  componentWillUpdate() {
    console.log(this.props.history);
  }
  render() {
    return (
      <Fragment>
        <div id="guide-history-card">
          <h5 id="card-title">Your Guides</h5>
          {this.props.loading ? (
            <div className="inlineBtn-center">
              <div className="loading-block" />{" "}
            </div>
          ) : null}
          {this.props.guides != undefined
            ? this.props.guides.map((guide) => {
                return (
                  <div className="historyCard inlineBtn-col-center">
                    <box-icon
                      name="notepad"
                      type="solid"
                      color="#091ad4"
                    ></box-icon>

                    <p>{guide.title}</p>
                    <Col className="float-right">
                      {" "}
                      <UncontrolledDropdown>
                        <DropdownToggle color="empty" className="float-right">
                          <box-icon
                            name="dots-vertical-rounded"
                            color="#254ebe"
                          ></box-icon>
                        </DropdownToggle>
                        <DropdownMenu className="btn mt-1" right>
                          <DropdownItem>Edit</DropdownItem>
                          <DropdownItem
                            onClick={this.onDeleteGuide.bind(this, guide._id)}
                          >
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </Col>
                  </div>
                );
              })
            : ""}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ guide }) => {
  const { guides, loading } = guide;

  return {
    guides,
    loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getGuide,
    deleteGuide,
  })(GuideHistory)
);
