import axios from "axios";
import React from "react";

export default class AskQuestionPage extends React.Component {
  constructor(props) {
    super(props);
    this.addQuestion = this.addQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  async handleClick() {
    if ((await this.addQuestion()) === -1) {
      return;
    }
    this.props.questionPage();
  }

  async addQuestion() {
    let qtitle = document.getElementById("tI").value.trim();
    let qText = document.getElementById("qI").value.trim();
    let qts = document.getElementById("ttI").value.trim();
    let quser = document.getElementById("uI").value.trim();

    let errcon = document.getElementById("errors");
    while (errcon.firstChild) {
      errcon.removeChild(errcon.lastChild);
    }
    let error = false;
    if (qtitle.length === 0) {
      let msg = document.createElement("p");
      msg.className = "errormsgs";
      msg.innerHTML = "Title can not be empty";
      errcon.appendChild(msg);
      error = true;
    }
    if (qText.length === 0) {
      let msg = document.createElement("p");
      msg.className = "errormsgs";
      msg.innerHTML = "Text can not be empty";
      errcon.appendChild(msg);
      error = true;
    }
    if (qts.length === 0) {
      let msg = document.createElement("p");
      msg.className = "errormsgs";
      msg.innerHTML = "Tags can not be empty";
      errcon.appendChild(msg);
      error = true;
    }

    if (qtitle.length > 100) {
      let msg = document.createElement("p");
      msg.className = "errormsgs";
      msg.innerHTML = "Title can not be over 100 words";
      errcon.appendChild(msg);
      error = true;
    }
    if (quser.length > 15) {
      let msg = document.createElement("p");
      msg.className = "errormsgs";
      msg.innerHTML = "Username can not be more than 15 characters";
      errcon.appendChild(msg);
      error = true;
    }

    if (error) {
      return -1;
    }

    // split tag list by spaces
    let tlist = qts.split(" ");

    // filter out duplicates
    tlist = tlist.map((item) => item.toLowerCase());
    tlist = tlist.filter(function (item, pos) {
      return tlist.indexOf(item) === pos;
    });

    // check if tag already exists in model
    for (let i = 0; i < tlist.length; i++) {
      if (tlist[i] === "") {
        continue;
      }
      let bool = true;
      for (let y = 0; y < this.props.model.data.tags.length; y++) {
        if (
          tlist[i].toLowerCase() ===
          this.props.model.data.tags[y].name.toLowerCase()
        ) {
          bool = false;
        }
      }
      // if tag doesn't exists add a new tag
      if (bool) {
        const newTag = {
          name: tlist[i],
        };
        let id = await axios.post("http://localhost:8000/addTag", newTag);
        this.props.setTagModel(id.data);
        tlist[i] = id.data._id;
      }
    }

    // Convert tag name to corresponding id
    tlist.forEach((item, index) => {
      this.props.model.data.tags.forEach((item2, index2) => {
        if (item === item2.name.toLowerCase()) {
          tlist[index] = item2._id;
        }
      });
    });

    const newQ = {
      title: qtitle,
      text: qText,
      tags: tlist,
      answers: [],
      asked_by: quser,
      ask_date_time: new Date(),
      views: 0,
    };
    let x = await axios.post("http://localhost:8000/addQuestion", newQ);

    this.props.setQuestionModel(x.data);
  }

  render() {
    return (
      <div class="wrapper">
        <div id="errors"></div>
        <h2>Question Title</h2>
        <p class="sp">Title should not be more than 100 characters</p>
        <textarea name="titleI" id="tI" cols="30" rows="7"></textarea>

        <br />
        <br />
        <br />
        <br />
        <h2>Question Text</h2>
        <p class="sp">Add details.</p>
        <textarea name="qtextI" id="qI" cols="30" rows="15"></textarea>
        <br />
        <br />
        <br />
        <br />
        <h2>Tags</h2>
        <p class="sp">Add Keywords separated by whitespace.</p>
        <textarea id="ttI" name="tagsI" cols="30" rows="7"></textarea>
        <br />
        <br />
        <br />
        <br />
        <h2>Username</h2>
        <p class="sp">Should not be more than 15 characters.</p>
        <textarea name="userI" id="uI" cols="30" rows="5"></textarea>

        <br />
        <br />
        <br />
        <br />
        <button class="postButton" id="postButton" onClick={this.handleClick}>
          Post Question
        </button>
      </div>
    );
  }
}
