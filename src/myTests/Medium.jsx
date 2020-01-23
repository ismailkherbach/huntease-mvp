import React from "react";
import Editor from "react-medium-editor";

// load theme styles with webpack
require("medium-editor/dist/css/medium-editor.css");
require("medium-editor/dist/css/themes/default.css");

// ES module

// CommonJS enviroment
// var Editor = require('react-medium-editor').default;
export default class Medium extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "Fusce dapibus, tellus ac cursus commodo"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(text, medium) {
    this.setState({ text: text });
  }

  render() {
    return (
      <div className="app">
        <Editor
          tag="pre"
          text={this.state.text}
          onChange={this.handleChange}
          options={{ toolbar: { buttons: ["bold", "italic", "underline"] } }}
        />
        <Editor text={this.state.text} onChange={this.handleChange} />
      </div>
    );
  }
}
