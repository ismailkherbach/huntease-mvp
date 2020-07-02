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
          <PerfectScrollbar>
            <div className="scroll-topsales">
              <div className="salesList flex fdr aic jcc">
                <div className="topBloc speceficMargin flex fdc aic jcc">
                  <img
                    className="crown crownSmall"
                    src={require("../../../assets/img/awesome-crown2.svg")}
                  />

                  <img
                    className="picture small"
                    src={require("../../../assets/img/topsales.svg")}
                  />

                  <img
                    className="rank rankSmall"
                    src={require("../../../assets/img/2nd.svg")}
                  />
                </div>
                <div className="topBloc flex fdc aic jcc">
                  <img
                    className="crown"
                    src={require("../../../assets/img/awesome-crown.svg")}
                  />

                  <img
                    className="picture"
                    src={require("../../../assets/img/topsales.svg")}
                  />

                  <img
                    className="rank"
                    src={require("../../../assets/img/1st.svg")}
                  />
                </div>
                <div className="topBloc speceficMargin flex fdc aic jcc">
                  <img
                    className="crown crownSmall"
                    src={require("../../../assets/img/awesome-crown3.svg")}
                  />

                  <img
                    className="picture small"
                    src={require("../../../assets/img/topsales.svg")}
                  />

                  <img
                    className="rank rankSmall"
                    src={require("../../../assets/img/3rd.svg")}
                  />
                </div>
              </div>
              <div className=" flex fdr aic jcc">
                <div className="infosBloc flex fdc aic jcc">
                  <p>Ismail kherbach</p>
                  <h5>5000 pts</h5>
                </div>{" "}
                <div className="infosBloc flex fdc aic jcc">
                  <p>Ismail kherbach</p>
                  <h5>5000 pts</h5>
                </div>{" "}
                <div className="infosBloc flex fdc aic jcc">
                  <p>Ismail kherbach</p>
                  <h5>5000 pts</h5>
                </div>
              </div>
              <div className="flex fdc aifs jcfs">
                <div className="listing flex fdr aic jcfs">
                  <div className="ranking flex fdc aic jcc">
                    <h4>4</h4>
                  </div>
                  <img src={require("../../../assets/img/topsales.svg")} />
                  <p>Ismail kherbach</p>
                  <h5>2001 points</h5>
                </div>
                <div className="listing flex fdr aifs jcfs">
                  <div className="ranking flex fdc aic jcc">
                    <h4>4</h4>
                  </div>
                  <img src={require("../../../assets/img/topsales.svg")} />
                  <p>Ismail kherbach</p>
                  <h5>2001 points</h5>
                </div>{" "}
                <div className="listing flex fdr aifs jcfs">
                  <div className="ranking flex fdc aic jcc">
                    <h4>4</h4>
                  </div>
                  <img src={require("../../../assets/img/topsales.svg")} />
                  <p>Ismail kherbach</p>
                  <h5>2001 points</h5>
                </div>{" "}
                <div className="listing flex fdr aifs jcfs">
                  <div className="ranking flex fdc aic jcc">
                    <h4>4</h4>
                  </div>
                  <img src={require("../../../assets/img/topsales.svg")} />
                  <p>Ismail kherbach</p>
                  <h5>2001 points</h5>
                </div>{" "}
                <div className="listing flex fdr aifs jcfs">
                  <div className="ranking flex fdc aic jcc">
                    <h4>4</h4>
                  </div>
                  <img src={require("../../../assets/img/topsales.svg")} />
                  <p>Ismail kherbach</p>
                  <h5>2001 points</h5>
                </div>{" "}
              </div>
            </div>
          </PerfectScrollbar>
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
