import React, { Fragment } from "react";
import { Button } from "reactstrap";

const TagPicker = ({ children }) => {
  return (
    <Fragment>
      <div id="tags-card">
        <h5 id="card-title">Add your tags</h5>
        <div className="inlineBtn-col-center">
          <input
            className="tag-input-large"
            placeholder="Write your tags here and hit enter to save them"
            type="text"
          />
          <Button className="save-changes">Save changes</Button>
        </div>
      </div>
    </Fragment>
  );
};
export default TagPicker;
