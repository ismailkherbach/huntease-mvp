import React, { Fragment } from "react";
import Editor from "react-medium-editor";
import { Input, Button } from "reactstrap";
import Draggable from "react-draggable";
import { connect } from "react-redux";
import { addGuide, getGuide } from "../../../redux/actions";
// load theme styles with webpack
require("medium-editor/dist/css/medium-editor.css");
require("medium-editor/dist/css/themes/default.css");
class ScriptEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Give this guide a title",
      questions: [{ question: "" }],
    };
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeContenu = this.handleChangeContenu.bind(this);
  }

  handleChangeTitle(title, medium) {
    this.setState({ title: title });
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
    this.setState((prevState) => ({
      questions: [...prevState.questions, { question: "" }],
    }));
    console.log(this.state.questions);
  }

  handleClick() {
    this.setState({ text: "" });
  }

  onAddGuide = () => {
    console.log(this.state);
    this.props.addGuide(this.state);
  };
  createUI() {
    return this.state.questions.map((el, i) => (
      <div className="inlineBtn-left mb-3">
        <div id="btn-add" onClick={this.addClick.bind(this)}>
          +
        </div>
        <Editor
          key={i}
          id="prompt"
          tag="pre"
          text={
            this.props.guide.guides
              ? this.props.guide.guides[0].questions[0]
              : "Enter your question here"
          }
          value={el.question || ""}
          name="question"
          onChange={this.handleChange.bind(this, i)}
          options={{
            toolbar: { buttons: ["bold", "italic", "underline"] },
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
  componentDidMount() {
    this.props.getGuide();
    if (this.props.guide.guides) {
      console.log(this.props.guide.guides[0].questions);
    }
  }

  render() {
    return (
      <Fragment>
        <div id="guide-conv-card">
          <Editor
            id="card-title"
            tag="pre"
            text={this.state.title}
            onChange={this.handleChangeTitle}
            options={{
              toolbar: { buttons: ["bold", "italic", "underline"] },
            }}
          />

          {this.createUI()}
        </div>
        <div id="tags-card">
          <h5 id="card-title">Add your tags</h5>
          <div className="inlineBtn-col-center">
            <input
              className="tag-input-large"
              placeholder="Write your tags here and hit enter to save them"
              type="text"
            />
            <Button className="save-changes" onClick={this.onAddGuide}>
              Save changes
            </Button>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ guide }) => {
  return {
    guide,
  };
};

export default connect(mapStateToProps, {
  addGuide,
  getGuide,
})(ScriptEditor);
