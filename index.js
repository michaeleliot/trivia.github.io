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
const router = express.Router()

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
    Team.find({name: req.body.teamName}, function(err, user) {

        user = user[0]
        if (err)
            res.send(err)
        else if (!user)
            new Team({ name: req.body.teamName, answers: [], score:0 }).save((err, newUser) => {
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

router.route('/teams').get((req, res) => {
    console.log(req)
    console.log(res)
    Team.find({}, function(err, user) {
        console.log(err)
        console.log(user)
        if (err)
            res.send(err)
        else if (!user)
            res.send(400)
        else
            res.send(user)
    })
})

router.route('*').get((req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
})

/** set up middlewares */
let port = process.env.PORT || 5000 
app.use(cors())
app.use(bodyParser.json())
app.use(helmet())

//app.use('/static',express.static(path.join(__dirname,'static')))

app.use('/api', router)

/** start server */
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});
