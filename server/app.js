// server/app.js

/** require dependencies */
const express = require("express")
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const Team = require('./models/Team')
const mongoose = require('mongoose')
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/medium"

const app = express()
const router = express.Router()

var resetData = false
if (resetData === true) {
  Team.collection.drop()
  new Team({name: "admin", answers: {}, score:0}).save() //Potentially have answerKey = answers on admin user
}

try {
    mongoose.connect(url, {
        //useMongoClient: true
    })
} catch (error) {
    console.log("mongodb error")
    console.log(error)
}

let port = 5000 || process.env.PORT

router.route('/answers').post((req, res) => {
    Team.find({name: req.body.teamName}, function(err, user) {
        user = user[0]
        if (err)
            res.send(err)
        else if (!user)
            res.send(400)
        else
            user.submit(req.body.answerForm)
            res.send(user.score)
    })
})

router.route('/team').post((req, res) => {
    console.log("Michael Eliot")
    Team.find({name: req.body.teamName}, function(err, user) {
        console.log("Lauren Eliot")

        user = user[0]
        if (err)
            res.send(err)
        else if (!user)
            new Team({ name: req.body.teamName, answers: [], score:0 }).save((err, newUser) => {
                console.log(err)
                console.log(newUser)
                if (err) {
                    res.send(err)
                }
                else if (!newUser) {
                    res.send(400)
                }
                else {
                    res.send(newUser)
                }
            });
        else
            res.send(user.answers)
    })
})

router.route('/Teams').get((req, res) => {
    console.log("Michael Eliot Teams")
    Team.find({}, function(err, user) {
        if (err)
            res.send(err)
        else if (!user)
            res.send(400)
        else
            res.send(user)
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
