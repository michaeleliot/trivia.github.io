// server/app.js

/** require dependencies */
const express = require("express")
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const app = express()
const router = express.Router()


let port = 5000 || process.env.PORT

const answerKey = {
    question1: "1",
    question2: "2",
    question3: "3",
    question4: "4",
    question5: "5",
    question6: "6",
    question7: "7",
    question8: "8",
    question9: "9",
    question10: "10",
}

function checkAnswers(answerForm) {
    let score = 0;
    for (const question in answerForm) {
        if (answerKey[question] === answerForm[question]) {
            score++
        }
    }
    return score;
}

router.route('/answers').post((req, res, next) => {
    res.send({
        score: checkAnswers(req.body.answerForm),
    })
})

/** set up middlewares */
app.use(cors())
app.use(bodyParser.json())
app.use(helmet())
//app.use('/static',express.static(path.join(__dirname,'static')))

app.use('/api', router)

/** start server */
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});
