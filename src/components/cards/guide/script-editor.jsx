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

// load theme styles with webpack
require("medium-editor/dist/css/medium-editor.css");
//require("medium-editor/dist/css/themes/default.css");
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
      title: "Give this guide a title",
      text: "Write something",
      questionsGuide: { questions: [""] },
      updatedGuide: null,
      deletePopup: false,
      propmtIndex: null,
      deletePopupNew: false,
      deletePopupGuide: false,
    };
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeContenu = this.handleChangeContenu.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDragEndNew = this.onDragEndNew.bind(this);
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
  handleKeyPressNew(target) {
    if (target.charCode == 13) {
      this.modifyClickNew();
    }
  }

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

  onAddGuide = () => {
    console.log({
      title: this.state.title,
      questions: this.state.questionsGuide.questions,
    });
    this.props.addGuide({
      title: this.state.title,
      questions: this.state.questionsGuide.questions,
      history: this.props.history,
    });
    this.props.getGuide();
  };

  onUpdateGuide = () => {
    console.log(this.state.displayGuide);
    this.props.updateGuide({
      title: this.state.displayGuide.title,
      questions: this.state.displayGuide.questions,
      id: this.state.displayGuide._id,
    });
  };
  removeItem(i) {
    let arr = this.state.questionsGuide.questions;
    arr.splice(i, 1);
    console.log(arr);
    this.setState({ arr });
  }

  removeItemUpdate(i) {
    let arr = this.state.displayGuide.questions;
    arr.splice(i, 1);
    console.log(arr);
    this.setState({ arr });
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
    let questions = [...this.state.questionsGuide.questions];
    questions[i] = event;
    this.setState({
      questionsGuide: { ...this.state.questionsGuide, questions: questions },
    });
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
                          //text={this.state.text}

                          /* These are the default options for anchor form,
                             if nothing is passed this is what it used */
                          placeholder
                          value={item || ""}
                          name="question"
                          onChange={this.handleChange.bind(this, index)}
                          onKeyPress={this.handleKeyPressNew.bind(this)}
                          options={{
                            toolbar: {
                              buttons: ["bold", "italic", "underline"],
                            },
                          }}
                        />
                        <img
                          className="curs_pointer"
                          src={require(`../../../assets/img/${
                            this.state.deletePopupNew &&
                            index === this.state.propmtIndex
                              ? "deleteRed"
                              : "delete"
                          }.svg`)}
                          onClick={this.toggleDeletePopupNew.bind(this, index)}
                        />
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

  componentDidMount() {
    console.log(this.props.guide.guides);
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
                        placeholder="write something"
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
      questionsGuide: { questions: [""] },
    });
  }
  onNewGuide() {
    this.setState({
      displayGuide: { questions: [""] },
      showStatus: false,
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
    if (this.props.guide.guides) {
    }
  }

  render() {
    const { searchField } = this.state;
    return (
      <Fragment>
        {this.state.deletePopup && (
          <div className="popup-container flex fdc aic jcc">
            <div className="deleteGuidePopup flex fdc aic jcc">
              <h4>🤚 You're deleting this prompt. </h4>
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
              <h4>🤚 You're deleting this prompt. </h4>
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
              <h4>🤚 You're deleting all your prompts </h4>
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
                <Editor
                  className="Title"
                  tag="pre"
                  // text={this.state.title}
                  onChange={this.handleChangeTitle}
                  options={{
                    toolbar: { buttons: ["bold", "italic", "underline"] },
                  }}
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
                <Editor
                  className="Title"
                  tag="pre"
                  // text={this.state.title}
                  onChange={this.handleChangeTitle}
                  options={{
                    toolbar: { buttons: ["bold", "italic", "underline"] },
                  }}
                />

                <Button
                  className="Change-profile-btn"
                  onClick={this.onResetGuide.bind(this)}
                >
                  Reset guide
                </Button>
              </div>
            )}
            <PerfectScrollbar>
              <div className="scroll-guide">
                {this.state.showStatus ? this.displayGuide() : this.createUI()}
              </div>
            </PerfectScrollbar>{" "}
          </div>
          <div className="Tag-picker">
            <h5 id="card-title">Add your tags</h5>
            <div className="flex fdc aic jcc">
              <input
                className="tag-input-large"
                placeholder="Write your tags here and hit enter to save them"
                type="text"
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
              {/*  <img
                className="icon"
                alt={"search"}
                src={require("../../../assets/img/search.svg")}
            />*/}
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
                        <div
                          className="flex fdr aic jcc curs_pointer"
                          onClick={
                            this.showGuide.bind(this, guide)
                            /*this.showGuide.bind(this, guide)*/
                          }
                        >
                          <box-icon
                            name="notepad"
                            type="solid"
                            color="#091ad4"
                          ></box-icon>
                          <h5 key={x}> {guide.title}</h5>
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
