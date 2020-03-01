import React, { Fragment } from "react";
import Editor from "react-medium-editor";
import { Input } from "reactstrap";

// load theme styles with webpack
require("medium-editor/dist/css/medium-editor.css");
require("medium-editor/dist/css/themes/default.css");
export default class ScriptEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "Give this guide a title",
      contenu: "Enter a question or a prompt",
      values: [],
      questions: [{ question: "" }]
    };
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeContenu = this.handleChangeContenu.bind(this);
  }

  handleChangeTitle(text, medium) {
    this.setState({ text: text });
  }
  handleChangeContenu(contenu) {
    this.setState({ contenu: contenu });
  }

  handleChange(i, event) {
    let values = [...this.state.values];
    console.log(values);
    values[i] = event.target.value;
    this.setState({ values });
  }

  addClick() {
    this.setState(prevState => ({
      questions: [...prevState.questions, { question: "" }]
    }));
    console.log(this.state.questions);
  }
  createUI() {
    return this.state.questions.map((el, i) => (
      <div className="inlineBtn-left">
        <div id="btn-add" onClick={this.addClick.bind(this)}>
          +
        </div>
        <Editor
          key={i}
          id="prompt"
          tag="pre"
          text={this.state.contenu}
          value={el.question || ""}
          name="question"
          onChange={this.handleChange.bind(this, i)}
          options={{
            toolbar: { buttons: ["bold", "italic", "underline"] }
          }}
        />
      </div>
    ));
  }

  handleChange(i, event) {
    let questions = [...this.state.questions];
    questions[i] = event;
    this.setState({ questions });
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
          {this.createUI()}
        </div>
      </Fragment>
    );
  }
}
