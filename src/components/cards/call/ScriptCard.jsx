import React, { Fragment } from "react";
import Btn from "../../small.componenets/Btn";
import { Button } from "reactstrap";
const ScriptCard = ({ children }) => {
  return (
    <Fragment>
      <div id="calls-card">
        <div className="inlineBtn-left">
          <Button className="btn">
            <box-icon name="notepad" type="solid" color="#254ebe"></box-icon>
            <h3 className="btn-text">Choose a guide</h3>
          </Button>
          <Button className="btn-clicked">
            <box-icon name="notepad" type="solid" color="#8BA3FF"></box-icon>
            <h3 className="btn-text-clicked">Continue without guide</h3>
          </Button>
        </div>
      </div>
    </Fragment>
  );
};
export default ScriptCard;
