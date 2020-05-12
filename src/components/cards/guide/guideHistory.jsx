import React, { Fragment } from "react";
import { connect } from "react-redux";
import { getGuide } from "../../../redux/actions";
import "boxicons";
class GuideHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          {this.props.guide.guides != undefined
            ? this.props.guide.guides.map((guide) => {
                return (
                  <div className="historyCard">
                    <box-icon
                      name="notepad"
                      type="solid"
                      color="#091ad4"
                    ></box-icon>

                    <p>{guide.title}</p>
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
  return {
    guide,
  };
};

export default connect(mapStateToProps, {
  getGuide,
})(GuideHistory);
