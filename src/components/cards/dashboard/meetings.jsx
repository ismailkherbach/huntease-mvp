import React, { Fragment } from "react";
import IntlMessages from "../../../helpers/IntlMessages";
import { UncontrolledCollapse, Button } from "reactstrap";
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
      <div className="PerMetBloc">
        <div className="topBloc flex fdr aic jcfs">
          <h2>Meetings</h2>
          <h4>350</h4>
        </div>
        <div className="toggleBloc flex fdr aic jcc">
          <Button className="toggle toggleCalls flex fdc aic jcc">
            This week
          </Button>
          <Button className="toggle toggleCalls toggleActive flex fdc aic jcc">
            this month
          </Button>
        </div>
        {
          <PerfectScrollbar>
            {" "}
            <div className="scroll-meeting disable-select">
              <div className="meeting-list">
                {meetings.map((meetingList) => {
                  return (
                    <div>
                      <div
                        className="flex fdr aic jcfs margin-top10 curs_pointer"
                        id={"toggler" + meetingList.id}
                      >
                        <h4 className="mr-4 pb-0">
                          <span className="Bold Cmain txtc flex fdr aic jcc fs11">
                            JUIN
                          </span>
                          <span className="Bold Cmain txtc flex fdr aic jcc fs17">
                            19
                          </span>
                        </h4>
                        <h4>{meetingList.meetingsNumber + " Meetings"}</h4>
                      </div>
                      <UncontrolledCollapse
                        toggler={"toggler" + meetingList.id}
                      >
                        {meetingList.meetingsInfo.map((info) => {
                          return (
                            <div className="mettingInfos flex fdr aifs jcfs">
                              <h5>{info.time + " AM"}</h5>
                              <div className="flex fdc aifs jcfs">
                                <h5>
                                  <span className="Bold Cmain">
                                    {info.name}
                                  </span>
                                </h5>
                                <h5>{info.title}</h5>
                              </div>
                            </div>
                          );
                        })}
                      </UncontrolledCollapse>
                    </div>
                  );
                })}
              </div>
            </div>
          </PerfectScrollbar>
        }
      </div>
    </Fragment>
  );
};
export default Meetings;
