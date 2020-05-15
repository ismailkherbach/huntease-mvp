import React, { Fragment } from "react";
import {
  Spinner,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { connect } from "react-redux";
import { getGuide, deleteGuide } from "../../../redux/actions";
import "boxicons";
class GuideHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onDeleteGuide(id) {
    this.props.deleteGuide(id);
  }

  componentDidMount() {
    this.props.getGuide();
  }
  componentWillUpdate() {}
  render() {
    return (
      <Fragment>
        <div id="guide-history-card">
          <h5 id="card-title">Your Guides</h5>
          {this.props.loading ? (
            <div className="inlineBtn-center">
              <Spinner animation="border" />
            </div>
          ) : null}
          {this.props.guides != undefined
            ? this.props.guides.map((guide) => {
                return (
                  <div className="historyCard">
                    <box-icon
                      name="notepad"
                      type="solid"
                      color="#091ad4"
                    ></box-icon>

                    <p>{guide.title}</p>
                    <UncontrolledDropdown className="ml-5">
                      <DropdownToggle color="empty" className="float-right">
                        <box-icon
                          className="float-right"
                          name="dots-vertical-rounded"
                        ></box-icon>
                      </DropdownToggle>
                      <DropdownMenu className="mt-3" right>
                        <DropdownItem>Edit</DropdownItem>
                        <DropdownItem
                          onClick={this.onDeleteGuide.bind(this, guide._id)}
                        >
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
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

export default connect(mapStateToProps, {
  getGuide,
  deleteGuide,
})(GuideHistory);
