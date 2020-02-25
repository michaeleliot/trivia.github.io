const mongoose = require('mongoose')

//IMPORTANT: All answers should be in lower case only
const answerKey = require('./answerKey.json')

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
