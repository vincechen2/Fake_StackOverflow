import React from "react";
import axios from "axios";

export default class AnswerQuestionPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    if (this.addAnswer() === -1) {
      return;
    }
    this.props.answerPage();
  }
  async addAnswer() {
    let errcon = document.getElementById("errora");
    while (errcon.firstChild) {
      errcon.removeChild(errcon.lastChild);
    }
    let ansText = document.getElementById("aT").value.trim();
    let ansUser = document.getElementById("aU").value.trim();
    let len1 = this.props.model.data.answers.length + 1;

    let error = false;
    if (ansText.length === 0) {
      let msg = document.createElement("p");
      msg.className = "errormsgs";
      msg.innerHTML = "Answer text cannot be empty";
      errcon.appendChild(msg);
      error = true;
    }

    if (ansUser.length > 15) {
      let msg = document.createElement("p");
      msg.className = "errormsgs";
      msg.innerHTML = "User can not be more than 15 characters";
      errcon.appendChild(msg);
      error = true;
    }
    if (error) {
      return -1;
    }

    const newA = {
      text: ansText,
      ans_by: ansUser,
      ans_date_time: new Date(),
    };

    let id = await axios.post("http://localhost:8000/addAnswer", newA);

    this.props.saveQuestion.answers.push(id.data._id);
    console.log(this.props.saveQuestion);
    console.log(this.props.model.data);
    axios.put(
      "http://localhost:8000/addAnswerToQuestion",
      this.props.saveQuestion
    );
    console.log(id.data);
    this.props.setAnswerModel(id.data);
  }
  render() {
    return (
      <div class="wrapper">
        <div id="errora"></div>
        <h2>Answer Text</h2>
        <br />

        <textarea name="Atext" id="aT" cols="30" rows="15"></textarea>

        <br />
        <br />
        <br />
        <br />
        <h2>Username</h2>
        <p class="sp">Should not be more than 15 characters</p>
        <textarea name="Auser" id="aU" cols="30" rows="5 "></textarea>
        <br />
        <br />
        <br />
        <br />
        <br />

        <button class="postButton" id="postAns" onClick={this.handleClick}>
          Post Answer
        </button>
      </div>
    );
  }
}
