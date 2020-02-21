const mongoose = require('mongoose')
const answerKey = {
    question1: "1", //Answer to Question 1
    question2: "2",
    question3: "3",
    question4: "4",
    question5: "5",
    question6: "6",
    question7: "7",
    question8: "8",
    question9: "9",
    question10:"10" //Answer to Question 10
}
let TeamSchema = new mongoose.Schema(
    {
        name: String,
        answers: {},
        score: String
    }
);

TeamSchema.methods.submit = function(c) {
    this.set('answers', c)
    let score = 0;
    for (const question in answerKey) {
        if (answerKey[question] === c[question]) {
            score++
        }
    }
    console.log("Score before set")
    console.log(score)
    this.set('score', score)
    console.log("Score after set")
    console.log(score)
    return this.save()
}
module.exports = mongoose.model('Team', TeamSchema)
