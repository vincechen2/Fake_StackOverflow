import React from "react";
import Navbar from "./navbar.js";
import QuestionPage from "./questionpage.js";
import AnswerPage from "./answerpage.js";
import AnswerQuestionPage from "./answerquestionpage";
import AskQuestionPage from "./askquestionpage";
import TagPage from "./tagpage";
import axios from "axios";

export default class FakeStackOverflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "questionPage",
      searchList: [],
      saveQuestion: undefined,
      searchTagList: [],
      saveTag: undefined,

      loading: true,
    };
    this.tagPage = this.tagPage.bind(this);
    this.questionPage = this.questionPage.bind(this);
    this.askQuestionPage = this.askQuestionPage.bind(this);
    this.answerPage = this.answerPage.bind(this);
    this.answerQuestionPage = this.answerQuestionPage.bind(this);
    this.searchPage = this.searchPage.bind(this);
    this.tagResultsPage = this.tagResultsPage.bind(this);
    this.setSearchList = this.setSearchList.bind(this);
    this.setSaveQuestion = this.setSaveQuestion.bind(this);
    this.setSaveTag = this.setSaveTag.bind(this);
    this.setSearchTagList = this.setSearchTagList.bind(this);
    this.createModel = this.createModel.bind(this);
    this.updateModel = this.updateModel.bind(this);
    this.setQuestionModel = this.setQuestionModel.bind(this);
    this.setTagModel = this.setTagModel.bind(this);
    this.setAnswerModel = this.setAnswerModel.bind(this);
  }
  setSearchTagList(x) {
    this.setState({ searchTagList: x });
  }
  setSaveTag(x) {
    this.setState({ saveTag: x });
  }
  setSaveQuestion(x) {
    this.setState({ saveQuestion: x });
  }
  setSearchList(list) {
    this.setState({ searchList: list });
  }
  tagPage() {
    this.setState({ page: "tagPage" });
  }
  questionPage() {
    this.setState({ page: "questionPage" });
  }
  askQuestionPage() {
    this.setState({ page: "askQuestionPage" });
  }
  answerPage() {
    this.setState({ page: "answerPage" });
  }
  answerQuestionPage() {
    this.setState({ page: "answerQuestionPage" });
  }
  searchPage() {
    this.setState({ page: "searchPage" });
  }
  tagResultsPage() {
    this.setState({ page: "tagResultsPage" });
  }
  setAnswerModel(a) {
    this.state.model.data.answers.push(a);
    this.setState({ model: this.state.model });
  }
  setQuestionModel(q) {
    this.state.model.data.questions.push(q);

    this.setState({ model: this.state.model });
  }
  setTagModel(t) {
    this.state.model.data.tags.push(t);

    this.setState({ model: this.state.model });
  }

  async createModel() {
    const qm = await axios.get("http://localhost:8000/question");
    const am = await axios.get("http://localhost:8000/answer");
    const tm = await axios.get("http://localhost:8000/tag");

    let m = {
      data: {
        questions: qm.data,
        tags: tm.data,
        answers: am.data,
      },
    };

    return m;
  }

  async updateModel() {
    this.setState({ loading: true });
    this.setState({ model: undefined });
    const m = await this.createModel();
    this.setState({ model: m });
    console.log(this.state.model);
    if (this.state.model != undefined) {
      this.setState({ loading: false });
    } else {
      this.setState({ loading: true });
    }
  }

  async componentDidMount() {
    await this.updateModel();
  }

  render() {
    if (!this.state.loading) {
      switch (this.state.page) {
        case "tagPage":
          return (
            <div>
              <Navbar
                saveTag={this.state.saveTag}
                searchList={this.setSearchList}
                model={this.state.model}
                tb={true}
                qb={false}
                searchPage={this.searchPage}
                question={this.questionPage}
                tag={this.tagPage}
              ></Navbar>
              <TagPage
                setSaveTag={this.setSaveTag}
                setSearchTagList={this.setSearchTagList}
                model={this.state.model}
                tagResultsPage={this.tagResultsPage}
                askQuestion={this.askQuestionPage}
              />
            </div>
          );
        case "questionPage":
          return (
            <div>
              <Navbar
                saveTag={this.state.saveTag}
                searchList={this.setSearchList}
                model={this.state.model}
                tb={false}
                qb={true}
                searchPage={this.searchPage}
                question={this.questionPage}
                tag={this.tagPage}
              ></Navbar>
              <QuestionPage
                searchTagList={this.state.searchTagList}
                setSaveQuestion={this.setSaveQuestion}
                model={this.state.model}
                questionList={this.state.model.data.questions}
                search={false}
                answerPage={this.answerPage}
                askQuestion={this.askQuestionPage}
              ></QuestionPage>
            </div>
          );
        case "askQuestionPage":
          return (
            <div>
              <Navbar
                saveTag={this.state.saveTag}
                searchList={this.setSearchList}
                model={this.state.model}
                tb={false}
                qb={false}
                searchPage={this.searchPage}
                question={this.questionPage}
                tag={this.tagPage}
              ></Navbar>
              <AskQuestionPage
                setTagModel={this.setTagModel}
                updateModel={this.updateModel}
                model={this.state.model}
                setQuestionModel={this.setQuestionModel}
                questionPage={this.questionPage}
              ></AskQuestionPage>
            </div>
          );
        case "answerPage":
          return (
            <div>
              <Navbar
                saveTag={this.state.saveTag}
                searchList={this.setSearchList}
                model={this.state.model}
                tb={false}
                qb={false}
                searchPage={this.searchPage}
                question={this.questionPage}
                tag={this.tagPage}
              ></Navbar>
              <AnswerPage
                model={this.state.model}
                saveQuestion={this.state.saveQuestion}
                answerQuestionPage={this.answerQuestionPage}
                askQuestion={this.askQuestionPage}
              />
            </div>
          );
        case "answerQuestionPage":
          return (
            <div>
              <Navbar
                saveTag={this.state.saveTag}
                searchList={this.setSearchList}
                model={this.state.model}
                tb={false}
                qb={false}
                searchPage={this.searchPage}
                question={this.questionPage}
                tag={this.tagPage}
              ></Navbar>
              <AnswerQuestionPage
                setQuestionModel={this.setQuestionModel}
                setAnswerModel={this.setAnswerModel}
                updateModel={this.updateModel}
                model={this.state.model}
                saveQuestion={this.state.saveQuestion}
                answerPage={this.answerPage}
              />
            </div>
          );
        case "searchPage":
          return (
            <div>
              <Navbar
                saveTag={this.state.saveTag}
                searchList={this.setSearchList}
                model={this.state.model}
                tb={false}
                qb={false}
                searchPage={this.searchPage}
                question={this.questionPage}
                tag={this.tagPage}
              ></Navbar>
              <QuestionPage
                model={this.state.model}
                setSaveQuestion={this.setSaveQuestion}
                questionList={this.state.searchList}
                search={true}
                searchList={this.state.searchList}
                answerPage={this.answerPage}
                askQuestion={this.askQuestionPage}
              ></QuestionPage>
            </div>
          );
        case "tagResultsPage":
          return (
            <div>
              <Navbar
                saveTag={this.state.saveTag}
                searchList={this.setSearchList}
                model={this.state.model}
                tb={false}
                qb={false}
                searchPage={this.searchPage}
                question={this.questionPage}
                tag={this.tagPage}
              ></Navbar>
              <QuestionPage
                saveTag={this.state.saveTag}
                searchTagList={this.state.searchTagList}
                model={this.state.model}
                setSaveQuestion={this.setSaveQuestion}
                questionList={this.state.searchTagList}
                search={false}
                tag={true}
                answerPage={this.answerPage}
                askQuestion={this.askQuestionPage}
              ></QuestionPage>
            </div>
          );
        default:
          return (
            <div>
              <Navbar
                saveTag={this.state.saveTag}
                searchList={this.setSearchList}
                model={this.state.model}
                tb={false}
                qb={true}
                searchPage={this.searchPage}
                question={this.questionPage}
                tag={this.tagPage}
              ></Navbar>
              <QuestionPage
                searchTagList={this.state.searchTagList}
                setSaveQuestion={this.setSaveQuestion}
                model={this.state.model}
                questionList={this.state.model.data.questions}
                search={false}
                answerPage={this.answerPage}
                askQuestion={this.askQuestionPage}
              ></QuestionPage>
            </div>
          );
      }
    }

    return null;
  }
}
