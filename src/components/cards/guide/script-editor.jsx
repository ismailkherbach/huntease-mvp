import React, { Fragment } from "react";
import Editor from "react-medium-editor";

// load theme styles with webpack
require("medium-editor/dist/css/medium-editor.css");
require("medium-editor/dist/css/themes/default.css");
export default class ScriptEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "Give this guide a title",
      contenu: ""
    };
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeContenu = this.handleChangeContenu.bind(this);
  }

  handleChangeTitle(text, medium) {
    this.setState({ text: text });
  }
  handleChangeContenu(contenu, medium) {
    this.setState({ contenu: contenu });
  }
  render() {
    return (
      <Fragment>
        <div id="guide-conv-card">
          <Editor
            id="card-title"
            tag="pre"
            text={this.state.text}
            onChange={this.handleChangeTitle}
            options={{
              toolbar: { buttons: ["bold", "italic", "underline"] }
            }}
          />
          <Editor
            id="card-title"
            tag="pre"
            text={"Inter a prompt or a question"}
            onChange={this.handleChangeTitle}
            options={{
              toolbar: { buttons: ["bold", "italic", "underline"] }
            }}
          />
        </div>
      </Fragment>
    );
  }
}
