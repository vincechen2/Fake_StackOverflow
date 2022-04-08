// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.

const express = require("express");
let mongoose = require("mongoose");
let mongoDB = "mongodb://127.0.0.1:27017/fake_so";
const app = express();
const a = require("cors");
const cors = a();
var Tag = require("./models/tags");
var Answer = require("./models/answers");
var Question = require("./models/questions");

const server = app.listen(8000, () => {
  console.log("Server running");
});
process.on("SIGINT", () => {
  if (db) {
    db.close()
      .then((result) => console.log("DB connection closed"))
      .catch((err) => console.log(err));
  }
  server.close();
  console.log("Server closed. Database instance disconnected");
});

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.on("connected", function () {
  console.log("connected to mongodb://127.0.0.1:27017/fake_so");
});

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/question", (req, res) => {
  Question.find()
    .sort({ ask_date_time: -1 })
    .then((result) => {
      JSON.stringify(result);

      res.send(result);
    });
});
app.get("/answer", (req, res) => {
  Answer.find().then((result) => {
    res.send(JSON.stringify(result));
  });
});
app.get("/tag", (req, res) => {
  Tag.find().then((result) => {
    res.send(JSON.stringify(result));
  });
});

app.get("/", (req, res) => {
  res.send("coool");
});

app.put("/incermentView", (req, res) => {
  Question.findOne({ _id: req.body._id }).then((result) => {
    result.views += 1;
    result.save();
  });
});

app.put("/addAnswerToQuestion", (req, res) => {
  let r = req.body;
  Question.findOne({ _id: r._id }).then((result) => {
    result.answers.unshift(r.answers[0]);
    result.save();
  });
});

app.post("/addTag", (req, res) => {
  let tag = new Tag({ name: req.body.name });

  tag.save();

  res.send(tag);
});

app.post("/addQuestion", (req, res) => {
  let q = req.body;
  let question = new Question({
    title: q.title,
    text: q.text,
    tags: q.tags,
    answers: q.answers,
    asked_by: q.asked_by,
    ask_date_time: q.ask_date_time,
    views: q.views,
  });
  question.save();
  res.send(question);
});
app.post("/addAnswer", (req, res) => {
  let a = req.body;

  let answer = new Answer({
    text: a.text,
    ans_by: a.ans_by,
    ans_date_time: a.ans_date_time,
  });
  answer.save();

  res.send(answer);
});
