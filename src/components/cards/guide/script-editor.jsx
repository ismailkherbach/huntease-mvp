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
import { connect } from "react-redux";
import {
  addGuide,
  updateGuide,
  getGuide,
  deleteGuide,
} from "../../../redux/actions";
import { Link, withRouter } from "react-router-dom";

import PerfectScrollbar from "react-perfect-scrollbar";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { InstalledAddOnExtensionPage } from "twilio/lib/rest/preview/marketplace/installedAddOn/installedAddOnExtension";
import ReactTagInput from "@pathofdev/react-tag-input";

import "@pathofdev/react-tag-input/build/index.css";

// load theme styles with webpack
require("medium-editor/dist/css/medium-editor.css");
require("medium-editor/dist/css/themes/beagle.css");
const MAX_LENGTH = 5;
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class ScriptEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      showStatus: false,
      searchField: "",
      displayGuide: [{ question: "" }],
      title: "",
      text: "Write something",
      questionsGuide: { questions: [""] },
      updatedGuide: null,
      deletePopup: false,
      propmtIndex: null,
      deletePopupNew: false,
      deletePopupGuide: false,
      tags: [],
    };
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeContenu = this.handleChangeContenu.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDragEndNew = this.onDragEndNew.bind(this);
    this.onTagsChanged = this.onTagsChanged.bind(this);
  }

  onTagsChanged(tags) {
    this.setState({ tags });
  }
  handleChangeTitle(title, medium) {
    this.setState({ title: title });
  }
  handleChangeContenu(contenu) {
    this.setState({ contenu: contenu });
  }
  toggleDeletePopup(propmtIndex) {
    if (!this.state.deletePopup) {
      this.setState({
        deletePopup: !this.state.deletePopup,
        propmtIndex: propmtIndex,
      });
    } else {
      this.setState({
        deletePopup: !this.state.deletePopup,
        propmtIndex: null,
      });
    }
  }

  toggleDeletePopupNew(propmtIndex) {
    if (!this.state.deletePopupNew) {
      this.setState({
        deletePopupNew: !this.state.deletePopupNew,
        propmtIndex: propmtIndex,
      });
    } else {
      this.setState({
        deletePopupNew: !this.state.deletePopupNew,
        propmtIndex: null,
      });
    }
  }

  toggleDeletePopupGuide(propmtIndex) {
    if (!this.state.deletePopupGuide) {
      this.setState({
        deletePopupGuide: !this.state.deletePopupGuide,
        propmtIndex: propmtIndex,
      });
    } else {
      this.setState({
        deletePopupGuide: !this.state.deletePopupGuide,
        propmtIndex: null,
      });
    }
  }
  deletePromptUpdate() {
    this.removeItemUpdate(this.state.propmtIndex);
    this.setState({ deletePopup: !this.state.deletePopup });
  }
  deletePrompt() {
    this.removeItem(this.state.propmtIndex);
    this.setState({ deletePopupNew: !this.state.deletePopupNew });
  }
  deleteGuide() {
    this.onDeleteGuide(this.state.propmtIndex);
    this.setState({ deletePopupGuide: !this.state.deletePopupGuide });
  }
  addClick() {
    this.setState((prevState) => ({
      questions: [...prevState.questions, { question: "" }],
    }));
    console.log(this.state.questions);
    console.log(this.state.displayGuide);
  }
  handleKeyPressNew = (target, index) => {
    if (target.charCode == 13) {
      this.modifyClickNew();
      //   this.refs[index + 1].current.focus();
    }
  };

  handleKeyPress(target) {
    if (target.charCode == 13) {
      this.modifyClick();
    }
  }
  updateAddClick() {
    this.setState((prevState) => ({
      displayGuide: [...prevState.displayGuide, { question: "" }],
    }));
    console.log(this.state.displayGuide);
  }

  onAddGuide = async () => {
    let array = this.state.questionsGuide.questions;
    let clearedArray = array.filter((v) => v != "");
    if (clearedArray.length == 0) {
      alert("Emtpy guide !");
    } else {
      console.log(array);
      if (this.state.title == "") {
        var moment = require("moment-timezone");

        var CurrentDate = moment().format("DD-MM-YYYY");

        let title =
          "GUIDE" + this.props.guide.guides.length + " " + CurrentDate;

        this.props.addGuide({
          title: title,
          questions: clearedArray,
          history: this.props.history,
        });
      } else {
        this.props.addGuide({
          title: this.state.title,
          questions: clearedArray,
          history: this.props.history,
        });
      }
    }
    await this.props.getGuide();
  };

  onUpdateGuide = async () => {
    console.log(this.state.displayGuide);

    let array = this.state.displayGuide.questions;
    let clearedArray = array.filter((v) => v != "");

    this.props.updateGuide({
      title: this.state.displayGuide.title,
      questions: clearedArray,
      id: this.state.displayGuide._id,
    });
    await this.props.getGuide();
  };
  removeItem(i) {
    let arr = this.state.questionsGuide.questions;
    if (arr.length > 1) {
      arr.splice(i, 1);
      console.log(arr);
      this.setState({ arr });
    }
  }

  removeItemUpdate(i) {
    let arr = this.state.displayGuide.questions;
    if (arr.length > 1) {
      arr.splice(i, 1);
      console.log(arr);
      this.setState({ arr });
    }
  }
  onDragEndNew(result) {
    console.log(this.state.questionsGuide.questions);

    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const itemsNew = reorder(
      this.state.questionsGuide.questions,
      result.source.index,
      result.destination.index
    );

    this.setState(
      {
        questionsGuide: {
          ...this.state.questionsGuide,
          questions: [...itemsNew],
        },
      },
      () => {
        console.log(this.state.questionsGuide.questions);
      }
    );

    console.log(itemsNew);
  }

  modifyClickNew() {
    this.setState({
      questionsGuide: {
        ...this.state.questionsGuide,
        questions: [...this.state.questionsGuide.questions, ""],
      },
    });
  }
  handleChange(i, event) {
    console.log(event.length);
    if (event.length <= MAX_LENGTH) {
      let questions = [...this.state.questionsGuide.questions];
      questions[i] = event;

      this.setState({
        questionsGuide: { ...this.state.questionsGuide, questions: questions },
      });
    } else {
      event = event.slice(0, MAX_LENGTH);
    }
  }

  createUI() {
    return (
      <DragDropContext onDragEnd={this.onDragEndNew}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              //style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.questionsGuide.questions.map((item, index) => {
                console.log(item);
                return (
                  <Draggable
                    key={`item1-${index}`}
                    draggableId={`item1-${index}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        className="prompt-field flex fdr aic jcfs"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div
                          className="add-prompt flex fdc aic jcc"
                          onClick={this.modifyClickNew.bind(this)}
                        >
                          <img
                            src={require("../../../assets/img/bx-plus.svg")}
                          />
                        </div>
                        <Editor
                          key={index}
                          className="prompt"
                          tag="pre"
                          value={item || ""}
                          name="question"
                          autoFocus={index + 1 > 2}
                          onChange={this.handleChange.bind(this, index)}
                          onKeyPress={(e) => this.handleKeyPressNew(e, index)}
                          inputRef={this.refs[index]}
                          maxlength={5}
                          options={{
                            toolbar: {
                              buttons: ["bold", "italic", "underline"],
                              maxLength: 5,
                            },
                          }}
                        />
                        {this.state.questionsGuide.questions.length > 1 && (
                          <img
                            className="curs_pointer"
                            src={require(`../../../assets/img/${
                              this.state.deletePopupNew &&
                              index === this.state.propmtIndex
                                ? "deleteRed"
                                : "delete"
                            }.svg`)}
                            onClick={this.toggleDeletePopupNew.bind(
                              this,
                              index
                            )}
                          />
                        )}
                        <img
                          className="option"
                          src={require("../../../assets/img/drag.svg")}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }

  showGuide(guide) {
    this.onResetGuide();
    this.setState({ showStatus: true, displayGuide: guide });
    console.log(this.state.questionsGuide);
    console.log(this.state.displayGuide);
    console.log(this.props.guide.guides);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.displayGuide.questions,
      result.source.index,
      result.destination.index
    );

    this.setState({
      displayGuide: { ...this.state.displayGuide, questions: items },
    });
    console.log(this.state.displayGuide);
  }

  modifyClick() {
    this.setState((prevState) => ({
      displayGuide: {
        ...this.state.displayGuide,
        questions: [...prevState.displayGuide.questions, ""],
      },
    }));
  }

  handleChangeUpdate(i, event) {
    let questions = [...this.state.displayGuide.questions];
    questions[i] = event;
    this.setState({
      displayGuide: {
        ...this.state.displayGuide,
        questions,
      },
    });
    console.log(this.state.displayGuide);
  }
  displayGuide() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              //style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.displayGuide.questions.map((item, index) => (
                <Draggable
                  key={`item-${index}`}
                  draggableId={`item-${index}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      className="prompt-field flex fdr aic jcfs"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div
                        className="add-prompt flex fdc aic jcc"
                        onClick={this.modifyClick.bind(this)}
                      >
                        <img src={require("../../../assets/img/bx-plus.svg")} />
                      </div>
                      <Editor
                        key={index}
                        className="prompt"
                        tag="pre"
                        //  placeholder="write something"
                        text={
                          this.props.guide.guides
                            ? item
                            : "Enter your question here"
                        }
                        value={item || ""}
                        name="question"
                        onChange={this.handleChangeUpdate.bind(this, index)}
                        onKeyPress={this.handleKeyPress.bind(this)}
                        options={{
                          toolbar: { buttons: ["bold", "italic", "underline"] },
                        }}
                      />

                      {this.state.displayGuide.questions.length > 1 && (
                        <img
                          className="optionDrag curs_pointer"
                          src={require(`../../../assets/img/${
                            this.state.deletePopup &&
                            index === this.state.propmtIndex
                              ? "deleteRed"
                              : "delete"
                          }.svg`)}
                          onClick={this.toggleDeletePopup.bind(this, index)}
                        />
                      )}
                      <img
                        className="option"
                        src={require("../../../assets/img/drag.svg")}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
  onDeleteGuide(id) {
    this.props.deleteGuide({ id });
    this.props.getGuide();
  }

  onResetGuide() {
    this.setState({
      questionsGuide: {
        ...this.state.questionsGuide,
        questions: [""],
      },
      displayGuide: { questions: [""] },
      title: "",
    });
  }
  onNewGuide() {
    this.setState({
      displayGuide: { questions: [""] },
      showStatus: false,
      questionsGuide: { questions: [""] },
      title: "",
    });
  }

  handleSearchChange(e) {
    this.setState({ searchField: e.target.value });
  }
  static getDerivedStateFromProps(props, state) {
    // props.getProfile();
  }
  componentDidMount() {
    this.props.getGuide();
  }

  componentWillMount() {
    this.refs = [...Array(15)].map((r) => React.createRef());
  }
  render() {
    const { searchField } = this.state;
    return (
      <Fragment id="droppable">
        {this.state.deletePopup && (
          <div className="popup-container flex fdc aic jcc">
            <div className="deleteGuidePopup flex fdc aic jcc">
              <h4>
                🤚 <span className="Cred">You're deleting this prompt.</span>{" "}
              </h4>
              <div className="flex fdr aic jcc">
                <Button
                  className="Change-profile-btn flex aic jcc"
                  onClick={this.deletePromptUpdate.bind(this)}
                >
                  I'm aware
                </Button>
                <Button
                  className="Change-profile-btn decline flex aic jcc"
                  onClick={this.toggleDeletePopup.bind(this)}
                >
                  Take me back
                </Button>
              </div>
            </div>{" "}
          </div>
        )}

        {this.state.deletePopupNew && (
          <div className="popup-container flex fdc aic jcc">
            <div className="deleteGuidePopup flex fdc aic jcc">
              <h4>
                {" "}
                🤚 <span className="Cred">
                  You're deleting this prompt.
                </span>{" "}
              </h4>
              <div className="flex fdr aic jcc">
                <Button
                  className="Change-profile-btn flex aic jcc"
                  onClick={this.deletePrompt.bind(this)}
                >
                  I'm aware
                </Button>
                <Button
                  className="Change-profile-btn decline flex aic jcc"
                  onClick={this.toggleDeletePopupNew.bind(this)}
                >
                  Take me back
                </Button>
              </div>
            </div>{" "}
          </div>
        )}

        {this.state.deletePopupGuide && (
          <div className="popup-container flex fdc aic jcc">
            <div className="deleteGuidePopup flex fdc aic jcc">
              <h4>
                🤚{" "}
                <span className="Cred">You're deleting all your prompts </span>
              </h4>
              <div className="flex fdr aic jcc">
                <Button
                  className="Change-profile-btn flex aic jcc"
                  onClick={this.deleteGuide.bind(this)}
                >
                  I'm aware
                </Button>
                <Button
                  className="Change-profile-btn decline flex aic jcc"
                  onClick={this.toggleDeletePopupGuide.bind(this)}
                >
                  Take me back
                </Button>
              </div>
            </div>{" "}
          </div>
        )}
        <div className="flex fdc aic jcc">
          <div className="Guide-editor">
            {this.state.showStatus ? (
              <div className="guideTitle flex fdr aic">
                <input
                  className="Title"
                  onChange={this.handleChangeTitle}
                  placeholder={this.state.displayGuide.title}

                  // defaultValue={this.state.displayGuide.title}
                />

                <Button
                  className="Change-profile-btn"
                  onClick={this.onNewGuide.bind(this)}
                >
                  New guide
                </Button>
              </div>
            ) : (
              <div className="guideTitle flex fdr aic">
                <input
                  className="Title"
                  onChange={this.handleChangeTitle}
                  placeholder="Type your title here"
                  maxlength={75}

                  //   defaultValue={this.state.title}
                />

                <Button
                  className="Change-profile-btn"
                  onClick={(e) => this.onResetGuide(e)}
                >
                  Reset guide
                </Button>
              </div>
            )}
            <PerfectScrollbar>
              <div className="scroll-guide">
                {this.state.showStatus && this.displayGuide()}
                {!this.state.showStatus && this.createUI()}
              </div>
            </PerfectScrollbar>{" "}
          </div>
          <div className="Tag-picker">
            <h5 id="card-title">Add your tags</h5>
            <div className="flex fdc aic jcc">
              <ReactTagInput
                className="inputTag"
                tags={this.state.tags}
                onChange={this.onTagsChanged}
              />
              {this.state.showStatus ? (
                <Button
                  className="Save-changes-btn"
                  onClick={this.onUpdateGuide}
                >
                  Save changes
                </Button>
              ) : (
                <Button className="Save-changes-btn" onClick={this.onAddGuide}>
                  Add guide
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="flex fdc aic jcc">
          <Fragment>
            <div className="Search-guide">
              {
                <img
                  className="icon"
                  alt={"search"}
                  src={require("../../../assets/img/bx-search.svg")}
                />
              }
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
            <div className="Guides">
              <h2>Your Guides</h2>

              <PerfectScrollbar>
                <div className="guideWidth scroll-guides">
                  {this.props.guide.loading ? (
                    <div className="flex fdc aic jcc">
                      <Spinner animation="border" />
                    </div>
                  ) : null}
                  {this.props.guide.guides != undefined ? (
                    this.props.guide.guides.length != 0 ? (
                      this.props.guide.guides
                        .filter((x) =>
                          x.title
                            .toLowerCase()
                            .includes(searchField.toLowerCase())
                        )
                        .map((guide, x) => {
                          return (
                            <div
                              className="flex fdr aic jcc curs_pointer"
                              onClick={
                                this.showGuide.bind(this, guide)
                                /*this.showGuide.bind(this, guide)*/
                              }
                            >
                              <img
                                alt="no-guide"
                                src={require("../../../assets/img/bxs-notepad-guide.svg")}
                              />
                              <h5 key={x}> {guide.title}</h5>
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  color="empty"
                                  className="float-right"
                                >
                                  <box-icon
                                    name="dots-vertical-rounded"
                                    color="#8BA3FF"
                                  ></box-icon>
                                </DropdownToggle>
                                <DropdownMenu className="btn mt-1" right>
                                  <DropdownItem>Edit</DropdownItem>
                                  <DropdownItem
                                    onClick={this.toggleDeletePopupGuide.bind(
                                      this,
                                      guide._id
                                    )}
                                  >
                                    Delete
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </div>
                          );
                        })
                    ) : (
                      <div className="flex fdc aic jcc">
                        <img
                          alt="no-guide"
                          src={require("../../../assets/img/no_guide.png")}
                        />
                      </div>
                    )
                  ) : null}
                </div>
              </PerfectScrollbar>
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

export default withRouter(
  connect(mapStateToProps, {
    addGuide,
    getGuide,
    deleteGuide,
    updateGuide,
  })(ScriptEditor)
);
