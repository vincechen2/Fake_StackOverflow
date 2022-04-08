import React from "react";
export default class AnswerPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.answerQuestionPage();
  }
  render() {
    let answers = [];
    this.props.saveQuestion.answers.forEach((item) => {
      this.props.model.data.answers.forEach((ans) => {
        if (item === ans._id) {
          answers.push(ans);
        }
      });
    });

    return (
      <div>
        <AnsHead
          saveQuestion={this.props.saveQuestion}
          askQuestion={this.props.askQuestion}
        />
        <AnswerPageQuestion saveQuestion={this.props.saveQuestion} />
        {answers.map((answer) => {
          return (
            <AnswerContent
              key={answer._id}
              text={answer.text}
              by={answer.ans_by}
              date={answer.ans_date_time}
            />
          );
        })}
        <div class="ansbutton">
          <button id="ansb" onClick={this.handleClick}>
            Answer Question
          </button>
        </div>
      </div>
    );
  }
}

class AnsHead extends React.Component {
  render() {
    return (
      <div>
        <div class="content_header_ans">
          <div id="numA" class="cc">
            {this.props.saveQuestion.answers.length} Answers
          </div>
          <div class="cc" id="aq_title">
            {this.props.saveQuestion.title}
          </div>
          <div>
            <button id="askQues2" onClick={this.props.askQuestion}>
              Ask A Question{" "}
            </button>
          </div>
        </div>
        <div id="question_text"></div>
        <div id="answer_content"></div>
      </div>
    );
  }
}
class AnswerPageQuestion extends React.Component {
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
    let s = this.props.saveQuestion.ask_date_time.split("T");
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
      <div id="question_text">
        <div class="content">
          <div>{this.props.saveQuestion.views} Views</div>
          <div>{this.props.saveQuestion.text}</div>
          <div>
            <span class="rightc">Asked By </span>
            <span style={{ color: "blue" }}>
              {this.props.saveQuestion.asked_by}
              <br />
            </span>

            <span class="rightc">On </span>
            <span style={{ color: "lightgreen" }}>
              {on}
              <br />
            </span>
            <span class="rightc">At </span>
            <span style={{ color: "lightseagreen" }}>
              {at}
              <br />
            </span>
          </div>
        </div>
      </div>
    );
  }
}
class AnswerContent extends React.Component {
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
    let s = this.props.date.split("T");

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
      <div class="acontent">
        <div>{this.props.text}</div>
        <div>
          <span class="rightc">Ans By </span>
          <span style={{ color: "blue" }}>
            {this.props.by}
            <br />
          </span>

          <span class="rightc">On </span>
          <span style={{ color: "lightgreen" }}>
            {on}
            <br />
          </span>
          <span class="rightc">At </span>
          <span style={{ color: "lightseagreen" }}>
            {at}
            <br />
          </span>
        </div>
      </div>
    );
  }
}
