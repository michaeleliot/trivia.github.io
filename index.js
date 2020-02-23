// server/app.js

/** require dependencies */
const express = require("express")
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const Team = require('./server/models/Team')
const mongoose = require('mongoose')
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/medium"
var path = require('path');

const app = express()

app.use(express.static(path.join(__dirname, 'client/build')));


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

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
})

app.post('/api/answers', (req, res) => {
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

app.post('/api/team', (req, res) => {
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

app.get('/api/Teams', (req, res) => {
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
let port = 5000 || process.env.PORT
app.use(cors())
app.use(bodyParser.json())
app.use(helmet())

/** start server */
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});
