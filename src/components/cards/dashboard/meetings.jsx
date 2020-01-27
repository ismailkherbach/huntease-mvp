import React, { Fragment } from "react";
import IntlMessages from "../../../helpers/IntlMessages";
import { UncontrolledCollapse } from "reactstrap";
import { meetings } from "../../../constants/meetings";
import PerfectScrollbar from "react-perfect-scrollbar";
const Meetings = ({ children }) => {
  return (
    <Fragment>
      <div id="meetings">
        <h1 id="card-title">
          {" "}
          <IntlMessages id="meeting" />
        </h1>
        <div className="inlineBtn-center">
          <div className="date-filter">Daily</div>
          <div className="date-filter">Weekly</div>
          <div className="date-filter">Monthly</div>
        </div>
        <PerfectScrollbar>
          {" "}
          <div className="scroll-meeting disable-select">
            <div className="meeting-list">
              {meetings.map(meetingList => {
                return (
                  <ul>
                    <div className="inlineBtn-left">
                      <div className="inlineBtn-date">
                        <p className="mr-3 pb-0"> 19</p>
                        <p className="mr-3 pb-0"> Juin</p>
                      </div>
                      <h4 id={"toggler" + meetingList.id}>
                        {meetingList.meetingsNumber + " Meeting"}
                      </h4>
                    </div>
                    <UncontrolledCollapse toggler={"toggler" + meetingList.id}>
                      <li className="ml-5">
                        {meetingList.meetingsInfo.map(info => {
                          return (
                            <li>
                              <p className="mr-4">{info.time + " AM"}</p>
                              <li>
                                <li id="title">{info.name}</li>
                                <li>{info.title}</li>
                              </li>
                            </li>
                          );
                        })}
                      </li>
                    </UncontrolledCollapse>
                  </ul>
                );
              })}
            </div>
          </div>
        </PerfectScrollbar>
      </div>
    </Fragment>
  );
};
export default Meetings;
