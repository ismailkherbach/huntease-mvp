import React, { Fragment } from "react";
import IntlMessages from "../../../helpers/IntlMessages";
import { UncontrolledCollapse } from "reactstrap";
import { meetings } from "../../../constants/meetings";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  unclickedDate,
  clickedDate,
  unclickedDateLarge,
  clickedDateLarge,
} from "../../../constants/buttonStatus";
import Btn from "./../../small.componenets/Btn";

const Meetings = ({ children }) => {
  return (
    <Fragment>
      <div id="meetings">
        <h1 id="card-title-right" className="float-right">
          Total: 20
        </h1>

        <h1 id="card-title">
          {" "}
          <IntlMessages id="meeting" />
        </h1>
        <div className="inlineBtn-center">
          <Btn class={clickedDateLarge}>This week</Btn>
          <Btn class={unclickedDateLarge}>This month</Btn>
        </div>
        <PerfectScrollbar>
          {" "}
          <div className="scroll-meeting disable-select">
            <div className="meeting-list">
              {meetings.map((meetingList) => {
                return (
                  <ul>
                    <div className="inlineBtn-left">
                      <div className="inlineBtn-date">
                        <h4 className="mr-3 pb-0"> Juin</h4>
                        <p className="mr-3 pb-0"> 19</p>
                      </div>
                      <h4 id={"toggler" + meetingList.id}>
                        {meetingList.meetingsNumber + " MEETINGS"}
                      </h4>
                    </div>
                    <UncontrolledCollapse toggler={"toggler" + meetingList.id}>
                      <li className="ml-5">
                        {meetingList.meetingsInfo.map((info) => {
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
