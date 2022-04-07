import React from "react";

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (e.key !== "Enter") {
      return;
    }
    this.doSearch();
    this.props.searchPage();
    document.getElementById("search").value = "";
  }

  doSearch() {
    let s = document.getElementById("search").value;
    const x = [];
    // split word by white space
    let strings = s.split(" ");
    // push from the search value onto x
    for (let i = 0; i < strings.length; i++) {
      if (
        strings[i].charAt(0) === "[" &&
        strings[i].charAt(strings[i].length - 1) === "]"
      ) {
        x.push(strings[i].substring(1, strings[i].length - 1).toLowerCase());
      }
    }

    const validQuestions = [];
    const tidList = [];
    // if the tag names in x match the tag names in model.tags then push the id to tidlist
    if (x !== undefined && x.length !== 0) {
      for (let i = 0; i < x.length; i++) {
        for (let j = 0; j < this.props.model.data.tags.length; j++) {
          if (this.props.model.data.tags[j].name.toLowerCase() === x[i]) {
            tidList.push(this.props.model.data.tags[j].tid);
          }
        }
      }
      // if the tag ids in the question matches those in tidlist, push the question onto validQuestions
      for (let i = 0; i < tidList.length; i++) {
        for (let j = 0; j < this.props.model.data.questions.length; j++) {
          for (
            let k = 0;
            k < this.props.model.data.questions[j].tags.length;
            k++
          ) {
            if (tidList[i] === this.props.model.data.questions[j].tags[k]._id) {
              validQuestions.push(this.props.model.data.questions[j]);
            }
          }
        }
      }
    }
    const words = [];
    // words contains all the string in the search value that don't start and end with []
    for (let i = 0; i < strings.length; i++) {
      if (
        strings[i].charAt(0) !== "[" &&
        strings[i].charAt(strings[i].length - 1) !== "]"
      ) {
        words.push(strings[i].toLowerCase());
      }
    }

    for (let i = 0; i < words.length; i++) {
      for (let j = 0; j < this.props.model.data.questions.length; j++) {
        let tempt = this.props.model.data.questions[j].title
          .toLowerCase()
          .split(" ");
        let tempx = this.props.model.data.questions[j].text
          .toLowerCase()
          .split(" ");
        if (tempt.includes(words[i]) || tempx.includes(words[i])) {
          validQuestions.push(this.props.model.data.questions[j]);
        }
      }
    }
    const nodupes = validQuestions.filter(function (item, pos) {
      return validQuestions.indexOf(item) === pos;
    });

    this.props.searchList(nodupes);
  }

  render() {
    let quest = (
      <button href="#" id="qbutton" onClick={this.props.question}>
        Questions
      </button>
    );
    if (this.props.qb) {
      quest = (
        <button
          href="#"
          id="qbutton"
          style={{ backgroundColor: "rgb(2, 129, 232)" }}
          onClick={this.props.question}
        >
          Questions
        </button>
      );
    }
    let tag = (
      <button href="#" id="tagButton" onClick={this.props.tag}>
        Tags
      </button>
    );
    if (this.props.tb) {
      tag = (
        <button
          href="#"
          id="tagButton"
          onClick={this.props.tag}
          style={{ backgroundColor: "rgb(2, 129, 232)" }}
        >
          Tags
        </button>
      );
    }
    return (
      <header>
        <div class="navb">
          {quest}
          {tag}
          <h1 id="nt">Fake Stack Overflow</h1>
          <input
            class="bb"
            type="text"
            placeholder="Search ..."
            name="search"
            id="search"
            onKeyUp={this.handleClick}
          ></input>
        </div>
      </header>
    );
  }
}
