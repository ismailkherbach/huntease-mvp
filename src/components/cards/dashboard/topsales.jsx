import React, { Fragment } from "react";
import IntlMessages from "../../../helpers/IntlMessages";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Col, Row } from "reactstrap";
import { topSalers } from "../../../constants/topSalers";
const TopSales = ({ children }) => {
  return (
    <Fragment>
      <div id="top-weekly-performers">
        <h1 id="card-title">
          {" "}
          <IntlMessages id="topweeklyperformers" />
        </h1>
        <PerfectScrollbar>
          <div className="scroll-topweekly">
            {topSalers.map(topSaler => {
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
                    <Row>
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
      </div>
    </Fragment>
  );
};

export default TopSales;
