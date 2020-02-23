import * as React from 'react';
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import './trivia.css';

const blackAnswerForm = {
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
    question6: '',
    question7: '',
    question8: '',
    question9: '',
    question10: '',
}

const TriviaFormWrapper = styled.div`
    width: ${window.screen.width < 500 ? '90%' : '40%'};
    position: absolute;
    background-color: grey;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    margin: auto;
    border-radius: 5px;
    background-color: #ccc;
    padding: 20px;
    overflow: auto;
`

export default function Trivia() {
    let history = useHistory();
    const [answerForm, setAnswers] = React.useState(() => {
        const initialState = localStorage.getItem('answers') === null ? blackAnswerForm : JSON.parse(localStorage.getItem('answers'))
        return initialState
    })   
    

    const updateField = e => {
        setAnswers({
          ...answerForm,
          [e.target.name]: e.target.value
        });
      };

    const formSubmit = function(event) {
        event.preventDefault();
        localStorage.setItem('answers', JSON.stringify(answerForm))
        axios.post('/api/answers', {
            answerForm,
            teamName: localStorage.getItem('teamName')
        })
        .then(function(response) {
            localStorage.setItem('score', response.data)
            history.push('/thankyou')
        })
        .catch(function(e) {
            console.log(e)
        })
    }
    return (
        <TriviaFormWrapper>
            <form onSubmit={formSubmit}>
                <label htmlFor="question1"> Question 1:</label>
                <input type="text" name="question1" value={answerForm.question1} onChange={updateField}></input>
                <label htmlFor="question2"> Question 2:</label>
                <input type="text" name="question2" value={answerForm.question2} onChange={updateField}></input>
                <label htmlFor="question3"> Question 3:</label>
                <input type="text" name="question3" value={answerForm.question3} onChange={updateField}></input>
                <label htmlFor="question4"> Question 4:</label>
                <input type="text" name="question4" value={answerForm.question4} onChange={updateField}></input>
                <label htmlFor="question5"> Question 5:</label>
                <input type="text" name="question5" value={answerForm.question5} onChange={updateField}></input>
                <label htmlFor="question6"> Question 6:</label>
                <input type="text" name="question6" value={answerForm.question6} onChange={updateField}></input>
                <label htmlFor="question7"> Question 7:</label>
                <input type="text" name="question7" value={answerForm.question7} onChange={updateField}></input>
                <label htmlFor="question8"> Question 8:</label>
                <input type="text" name="question8" value={answerForm.question8} onChange={updateField}></input>
                <label htmlFor="question9"> Question 9:</label>
                <input type="text" name="question9" value={answerForm.question9} onChange={updateField}></input>
                <label htmlFor="question10"> Question 10:</label>
                <input type="text" name="question10" value={answerForm.question10} onChange={updateField}></input>
                <input type="submit" value="Submit"></input>
            </form> 
        </TriviaFormWrapper>
    )
}