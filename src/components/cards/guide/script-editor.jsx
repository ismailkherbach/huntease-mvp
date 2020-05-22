import React, { Fragment } from "react";
import Editor from "react-medium-editor";
import {
  Spinner,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Col,
  Button,
} from "reactstrap";
import Draggable from "react-draggable";
import { connect } from "react-redux";
import { addGuide, getGuide, deleteGuide } from "../../../redux/actions";

// load theme styles with webpack
require("medium-editor/dist/css/medium-editor.css");
require("medium-editor/dist/css/themes/default.css");
class ScriptEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      showStatus: false,
      searchField: "",
      displayGuide: [{ question: "" }],
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
    console.log(this.state.displayGuide);
  }

  updateAddClick() {
    this.setState((prevState) => ({
      displayGuide: [...prevState.displayGuide, { question: "" }],
    }));
    console.log(this.state.displayGuide);
  }

  handleClick() {
    this.setState({ text: "" });
  }

  onAddGuide = () => {
    console.log({ title: this.state.title, questions: this.state.questions });
    this.props.addGuide({
      title: this.state.title,
      questions: this.state.questions,
    });
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
          text={"Enter your question here"}
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

  showGuide(guide) {
    this.setState({ showStatus: true, displayGuide: guide });
  }

  displayGuide() {
    return this.state.displayGuide.questions.map((e, i) => (
      <div className="inlineBtn-left mb-3">
        <div id="btn-add" onClick={this.addClick.bind(this)}>
          +
        </div>
        <Editor
          key={i}
          id="prompt"
          tag="pre"
          text={this.props.guide.guides ? e : "Enter your question here"}
          value={e || ""}
          name="question"
          onChange={this.handleChange.bind(this, i)}
          options={{
            toolbar: { buttons: ["bold", "italic", "underline"] },
          }}
        />
      </div>
    ));
  }
  onDeleteGuide(id) {
    this.props.deleteGuide({ id });
    //this.props.getGuide();
  }

  handleChange(i, event) {
    let questions = [...this.state.questions];
    questions[i] = event;
    this.setState({ questions });
  }
  handleSearchChange(e) {
    this.setState({ searchField: e.target.value });
  }
  componentDidMount() {
    this.props.getGuide();
    if (this.props.guide.guides) {
    }
  }

  render() {
    const { searchField } = this.state;
    return (
      <Fragment>
        <div className="inlineBtn-col-center">
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

            {this.state.showStatus ? this.displayGuide() : this.createUI()}
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
        </div>
        <div className="inlineBtn-col-center">
          <Fragment>
            <div id="search-bar-guide">
              <img
                className="icon"
                alt={"search"}
                src={require("../../../assets/img/search.svg")}
              />
              <input
                alt={"search"}
                placeholder="Enter your search here"
                type="text"
                src={require("../../../assets/img/search.svg")}
                onChange={this.handleSearchChange.bind(this)}
              />
            </div>
          </Fragment>
          <Fragment>
            <div id="guide-history-card">
              <h5 id="card-title">Your Guides</h5>
              {this.props.guide.loading ? (
                <div className="inlineBtn-center">
                  <Spinner animation="border" />
                </div>
              ) : null}
              {this.props.guide.guides != undefined ? (
                this.props.guide.guides.length != 0 ? (
                  this.props.guide.guides
                    .filter((x) =>
                      x.title.toLowerCase().includes(searchField.toLowerCase())
                    )
                    .map((guide, x) => {
                      return (
                        <div className="historyCard inlineBtn-col-center ml-4">
                          <box-icon
                            name="notepad"
                            type="solid"
                            color="#091ad4"
                          ></box-icon>

                          <p
                            key={x}
                            onClick={
                              this.showGuide.bind(this, guide)
                              /*this.showGuide.bind(this, guide)*/
                            }
                          >
                            {" "}
                            {guide.title}
                          </p>
                          <Col className="float-right">
                            {" "}
                            <UncontrolledDropdown>
                              <DropdownToggle
                                color="empty"
                                className="float-right"
                              >
                                <box-icon
                                  name="dots-vertical-rounded"
                                  color="#254ebe"
                                ></box-icon>
                              </DropdownToggle>
                              <DropdownMenu className="btn mt-1" right>
                                <DropdownItem>Edit</DropdownItem>
                                <DropdownItem
                                  onClick={this.onDeleteGuide.bind(
                                    this,
                                    guide._id
                                  )}
                                >
                                  Delete
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </Col>
                        </div>
                      );
                    })
                ) : (
                  <div className="inlineBtn-col-center mt-5">
                    <img
                      className="empty-guide mt-5"
                      alt="no-guide"
                      src={require("../../../assets/img/no_guide.png")}
                    />
                    <Button className="add-guide mt-4">+ Add guide</Button>
                  </div>
                )
              ) : null}
            </div>
          </Fragment>
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
  deleteGuide,
})(ScriptEditor);
