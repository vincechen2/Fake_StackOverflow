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
    // split word by white space
    let ss = s.split(" ");
    // Strings contains only the text without brackets
    // tags contains only the text in between brackets
    let strings = [];
    let tags = [];
    ss.forEach((item, index) => {
      if (item.charAt(0) === "[" && item.charAt(item.length - 1) === "]") {
        tags.push(item.substring(1, item.length - 1).toLowerCase());
      } else {
        strings.push(item.toLowerCase());
      }
    });

    // compare tags in search to tags in data
    // If there is a match push the id onto tags array else remove the tag from tags array
    tags.forEach((item, index) => {
      let x = false;
      this.props.model.data.tags.forEach((item2, index2) => {
        if (item === item2.name) {
          tags.splice(index, 1, item2._id);
          x = true;
        }
      });
      if (!x) {
        tags.splice(index, 1);
      }
    });

    // add the questions with the same tag id as those stored in tags to an array
    const validQuestions = [];
    tags.forEach((item, index) => {
      this.props.model.data.questions.forEach((item2, index2) => {
        item2.tags.forEach((item3, index2) => {
          if (item3 === item) {
            validQuestions.push(item2);
          }
        });
      });
    });

    // iterate through all the questions and if title or text contains any of the valid strings then include that question
    this.props.model.data.questions.forEach((item2, index2) => {
      strings.forEach((item, index) => {
        if (
          item2.title.toLowerCase().includes(item) ||
          item2.text.toLowerCase().includes(item)
        ) {
          validQuestions.push(item2);
        }
      });
    });

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
