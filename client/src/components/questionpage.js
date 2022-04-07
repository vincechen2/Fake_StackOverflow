import React from "react";
import axios from "axios";
export default class QuestionPage extends React.Component {
  render() {
    let questions = this.props.questionList;

    return (
      <div>
        <QHead
          searchList={this.props.searchList}
          searchTagList={this.props.searchTagList}
          saveTag={this.props.saveTag}
          model={this.props.model}
          tag={this.props.tag}
          search={this.props.search}
          askQuestion={this.props.askQuestion}
        ></QHead>
        {questions.map((question, index) => {
          return (
            <QBody
              setSaveQuestion={this.props.setSaveQuestion}
              model={this.props.model}
              key={question._id}
              answerPage={this.props.answerPage}
              question={question}
            ></QBody>
          );
        })}
      </div>
    );
  }
}
class QHead extends React.Component {
  render() {
    let numQuestions = this.props.model.data.questions.length + " Questions";
    let title = "All Questions";
    if (this.props.model.data.questions.length === 1) {
      numQuestions = "1 Question";
    }
    if (this.props.search) {
      numQuestions = this.props.searchList.length + " Questions";
      title = "Search Results";

      if (this.props.searchList.length === 0) {
        title = "No Questions Found";
      }
      if (this.props.searchList.length === 1) {
        numQuestions = "1 Question";
      }
    }

    if (this.props.tag) {
      numQuestions = this.props.searchTagList.length + " Questions";
      title = "[" + this.props.saveTag + "]";
      title += " Results";
      if (this.props.searchTagList.length === 1) {
        numQuestions = "1 Question";
      }
    }

    return (
      <div class="content_header">
        <div id="numQ" class="cc">
          {numQuestions}
        </div>
        <div class="cc" id="all_q">
          {title}
        </div>
        <div>
          <button id="askQues" onClick={this.props.askQuestion}>
            Ask A Question
          </button>
        </div>
      </div>
    );
  }
}
function Left(props) {
  return (
    <div>
      {props.vnum} views <br /> {props.anum} answers{" "}
    </div>
  );
}

class Center extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.setSaveQuestion(this.props.question);
    this.props.question.views += 1;
    axios.put("http://localhost:8000/incermentView", this.props.question);
    this.props.answerPage();
  }
  render() {
    return (
      <div class="cencont">
        <button
          id="foo"
          href="#"
          class="qtitle linkbutton"
          onClick={this.handleClick}
        >
          {this.props.question.title}
        </button>
        <br />
        <br />
        <TagContent model={this.props.model} question={this.props.question} />
      </div>
    );
  }
}
function Right(props) {
  return (
    <div class="right">
      <span class="rightc">Asked By </span>
      <span style={{ color: "blue" }}>
        {props.by}
        <br />
      </span>
      <span class="rightc">On </span>
      <span style={{ color: "lightgreen" }}>
        {props.on}
        <br />
      </span>
      <span class="rightc">At </span>
      <span style={{ color: "lightseagreen" }}>{props.at}</span>
    </div>
  );
}

class TagContent extends React.Component {
  render() {
    let tags = [];

    for (let i = 0; i < this.props.question.tags.length; i++) {
      tags.push(this.props.question.tags[i]);
      if ((i + 1) % 4 === 0) {
        tags.push("space");
      }
    }

    tags.forEach((item, index, arr) => {
      this.props.model.data.tags.forEach((ti, tin, tarr) => {
        if (ti._id === item) {
          arr[index] = ti.name;
        }
      });
    });

    return (
      <div class="tagc">
        {tags.map((item, index) => {
          if (item === "space") {
            return <div key={index} class="fill" />;
          }
          return (
            <div class="tagborder" key={index}>
              {item}
            </div>
          );
        })}
      </div>
    );
  }
}

class QBody extends React.Component {
  render() {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // s[0] contains the date, s[1] contains the time in UTC time
    let s = this.props.question.ask_date_time.split("T");
    let ss = s[0].split("-");
    // removing 0 from months ex, (04 -> 4) so the number can be used in an array
    if (ss[1].charAt(0) === "0") {
      ss[1] = ss[1].charAt(1);
    }
    // same as above but just for format
    if (ss[2].charAt(0) === "0") {
      ss[2] = ss[2].charAt(1);
    }

    let on = months[ss[1]] + " " + ss[2] + ", " + ss[0];
    // splitting hr:min:sec;milli
    let hs = s[1].split(":");
    // Subtracting 4 from hrs to convert to est
    hs[0] -= 4;
    let at = hs[0] + ":" + hs[1];
    return (
      <div class="content">
        <Left
          vnum={this.props.question.views}
          anum={this.props.question.answers.length}
        />
        <Center
          setSaveQuestion={this.props.setSaveQuestion}
          model={this.props.model}
          answerPage={this.props.answerPage}
          question={this.props.question}
        />
        <Right by={this.props.question.asked_by} on={on} at={at} />
      </div>
    );
  }
}
