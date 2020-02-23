import * as React from 'react';
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'



const TeamNameForm = styled.div`
    height: 5em;
    width: 40%;
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    margin: auto;
`

export default function TeamName() {
    let history = useHistory();
    const [teamName, setTeamName] = React.useState("");
    const formSubmit = function(event) {
        event.preventDefault();
        if (teamName === "admin") {
            history.push('/admin')
        } else {
            axios.post('/api/team', {
                teamName
            })
            .then(function(response) {
                if (response.data.question1)
                    localStorage.setItem('answers', JSON.stringify(response.data))
                else {
                    localStorage.clear() 
                }
                
                localStorage.setItem('teamName', teamName);
                history.push('/trivia')
            })
            .catch(function(e) {
                console.log(e)
            })
        }

    }

    return (
        <TeamNameForm>
            <form onSubmit={formSubmit}>
                <label htmlFor="team-name">Team Name:</label>
                <input type="text" name="team-name" value={teamName} onChange={e => setTeamName(e.target.value)}></input>
                <input type="submit" value="Submit"></input>
            </form> 
        </TeamNameForm>
    )
}