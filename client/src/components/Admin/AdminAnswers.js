import * as React from 'react';
import styled from 'styled-components'
import axios from 'axios'
import {
    useParams,
  } from "react-router-dom";

const AdminDiv = styled.div`
    height: 100%;
    width: 40%;
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    margin: auto;
`

const Button = styled.button`
  background: black;
  color: white;

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 3px;
  :hover {
    background-color: grey;
  }
`;

export default function Admin() {

    let { teamName } = useParams();

    const [answersList, setAnswersList] = React.useState([])
    const [answerKeyList, setAnswerKeyList] = React.useState([])


    function getAnswers() {
        // axios.get('/api/answers/:teamName')
        //     .then(function(response) {
        //         const tmp = []
        //         for (const question in response.data) {
        //             tmp.push(response.data[question])
        //         }
        //         setAnswersList(tmp)
        //     })
        //     .catch(function(e) {
        //         console.log(e)
        //     })
        // axios.get('/api/answers')
        //     .then(function(response) {
        //         const tmp = []
        //         for (const question in response.data) {
        //             tmp.push(response.data[question])
        //         }
        //         setAnswerKeyList(tmp)
        //     })
        //     .catch(function(e) {
        //         console.log(e)
        //     })
    }
    
    return (
        <AdminDiv>
            <div> {teamName} </div>
            <Button onClick={getAnswers}>Load Answers</Button>
            <ul>
                {answersList.map((answer, i) => {
                    return <li key={i}> {answer} </li>
                })}
            </ul>
            <ul>
                {answerKeyList.map((answer, i) => {
                    return <li key={i}> {answer} </li>
                })}
            </ul>
        </AdminDiv>
    )
}