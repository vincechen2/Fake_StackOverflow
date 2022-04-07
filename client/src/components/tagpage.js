import React from "react";

export default class TagPage extends React.Component {
  render() {
    const tagLists = [];
    let j = this.props.model.data.tags.length / 3;
    for (let i = 0; i < j; i++) {
      tagLists.push([]);
    }
    j = 0;
    for (let i = 1; i <= this.props.model.data.tags.length; i++) {
      tagLists[j].push(this.props.model.data.tags[i - 1]);
      if (i % 3 === 0) {
        j++;
      }
    }

    return (
      <div>
        <TagHeader
          model={this.props.model}
          askQuestion={this.props.askQuestion}
        ></TagHeader>
        {tagLists.map((item, index) => {
          return (
            <TagPageContent
              setSaveTag={this.props.setSaveTag}
              setSearchTagList={this.props.setSearchTagList}
              model={this.props.model}
              tagResultsPage={this.props.tagResultsPage}
              key={index}
              tags={item}
            />
          );
        })}
      </div>
    );
  }
}
class TagHeader extends React.Component {
  render() {
    return (
      <div class="content_header">
        <div id="numQ" class="cc">
          {this.props.model.data.tags.length} Tags
        </div>
        <div class="cc" id="all_q">
          All Tags
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
class TagPageContent extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(itemt) {
    const temp = [];

    this.props.model.data.questions.forEach((item, index, arr) => {
      item.tags.forEach((item2, index2) => {
        if (item2 === itemt._id) {
          temp.push(item);
        }
      });
    });
    this.props.setSaveTag(itemt.name);

    this.props.setSearchTagList(temp);

    this.props.tagResultsPage();
  }
  render() {
    return (
      <div class="tagcontent">
        {this.props.tags.map((item, index) => {
          let count = 0;

          this.props.model.data.questions.forEach((item2, index2) => {
            item2.tags.forEach((item3, index3) => {
              if (item3 === item._id) {
                count++;
                return;
              }
            });
          });
          return (
            <div key={item._id}>
              <button
                class="taglink linkbutton"
                onClick={() => this.handleClick(item)}
              >
                {item.name}
              </button>
              <p>{count} questions</p>
            </div>
          );
        })}
      </div>
    );
  }
}
