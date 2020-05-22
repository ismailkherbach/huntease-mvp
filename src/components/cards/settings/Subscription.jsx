import React, { Fragment } from "react";

import { Row, Col } from "reactstrap";
import styled from "styled-components";

const Wrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  svg {
    width: 100%;
    polygon {
      fill: #f2f2f2;
    }
    polyline {
      stroke: #777;
      stroke-width: 2.5;
      fill: none;
    }
  }
`;
class SubscriptionContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: JSON.parse(localStorage.getItem("user_id")),
      points: [
        [0, 50],
        [1, 51],
        [2, 50.5],
        [3, 56],
        [4, 50],
      ],
    };
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Col>
            <div id="settings-card" className="no-gutters mx-0">
              <Wrapper>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 287 100">
                  <polygon
                    points={`${this.state.points.map(
                      (p) => " " + p[0] + "," + p[1]
                    )} 287,100 0,100`}
                  />
                  <polyline
                    points={`${this.state.points.map(
                      (p) => " " + p[0] + "," + p[1]
                    )}`}
                  />
                </svg>
              </Wrapper>
            </div>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default SubscriptionContent;
