import React, { Fragment } from "react";
import IntlMessages from "../../../helpers/IntlMessages";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Col, Row } from "reactstrap";
import { topSalers } from "../../../constants/topSalers";
import { connect } from "react-redux";
import { getTeam } from "../../../redux/actions";
class TopSales extends React.Component {
  constructor(props) {
    super(props);
  }
  getTopsaler = async () => {
    await this.props.getTeam();
    await console.log(this.props.dashboard.topSales);
  };
  componentDidMount() {
    this.props.getTeam();
    console.log(this.props.dashboard.topSales);
  }
  render() {
    const { topSales } = this.props.dashboard;
    return (
      <Fragment>
        <div className="TopPerBloc">
          <div className="topBloc flex fdr aic jcfs">
            <h2>Top Weekly Performers</h2>
          </div>
          {/*    <PerfectScrollbar>
            <div className="scroll-topweekly topsale">
              {topSalers.map((topSaler) => {
                return (
                  <Row className="no-gutters mx-0">
                    <Col className="col-1 mx-4">
                      <img src={topSaler.badge} alt={topSaler.id} />
                    </Col>
                    <Col className="mx-0 col-2 ">
                      {" "}
                      <img src={topSaler.picture} alt={topSaler.id} />
                    </Col>
                    <Col className="ml-4">
                      <Row className="mt-2">
                        <h4>{topSaler.name}</h4>
                      </Row>
                      <Row>
                        <p>{topSaler.point + " points"}</p>
                      </Row>
                    </Col>
                  </Row>
                );
              })}
            </div>
          </PerfectScrollbar>
            */}{" "}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ dashboard }) => {
  return {
    dashboard,
  };
};
export default connect(mapStateToProps, {
  getTeam,
})(TopSales);
