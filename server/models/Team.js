const mongoose = require('mongoose')

//IMPORTANT: All answers should be in lower case only
const answerKey = {
    question1: "a", //Answer to Question 1
    question2: "B",
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
        if (answerKey[question].toLowerCase() === c[question]) {
            score++
        }
    }
    this.set('score', score)
    return this.save()
}
module.exports = mongoose.model('Team', TeamSchema)
