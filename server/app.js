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

var resetData = true
if (resetData === true) {
  Team.collection.drop()
  new Team({name: "admin", answers: {}, score:0}).save() //Potentially have answerKey = answers on admin user
}

try {
    mongoose.connect(url, {
        //useMongoClient: true
    })
} catch (error) {

}


let port = 5000 || process.env.PORT

router.route('/answers').post((req, res, next) => {
    Team.find({name: req.body.teamName}, function(err, user) {
        user = user[0]
        if (err)
            res.send(err)
        else if (!user)
            res.send(400)
        else
            user.submit(req.body.answerForm)
            res.send(user.score)
        next()
    })
})

router.route('/team').post((req, res, next) => {
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
        next()
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
