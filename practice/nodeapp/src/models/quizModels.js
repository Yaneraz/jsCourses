var mongoose = require('mongoose');

var QuizList = mongoose.Schema({
  uid: String,
  state: String,
  list: [Object]
});

//var Quiz = mongoose.Schema({
//  Q: String,
//  A: [String]
//});

var AnswerCollection = mongoose.Schema({
  uid: String,
  Qid: String
});

module.exports = mongoose.model('Quiz', QuizList)