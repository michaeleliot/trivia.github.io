// src/App.js
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { TeamName } from './components/TeamName'
import { Trivia } from './components/Trivia'
import { ThankYou } from './components/ThankYou'
import { Admin } from './components/Admin'
import { AdminAnswers } from './components/AdminAnswers'
class App extends Component {
    render() {
        return (
            <div>
              <Switch>
                <Route exact path='/' component={TeamName}/>
                <Route exact path='/trivia' component={Trivia}/>
                <Route exact path='/thankyou' component={ThankYou}/>
                <Route exact path='/admin' component={Admin}/>
                <Route path='/admin/:teamName' component={AdminAnswers}/>
              </Switch>
            </div>
        );
    }
}
export default App
