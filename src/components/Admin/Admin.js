import * as React from 'react';
import styled from 'styled-components'
import axios from 'axios'

const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api"


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

function byScore(a, b) {
    return b.score - a.score
}

export default function Admin() {
    const [teamsList, setTeamsList] = React.useState([])

    function refreshTeams() {
        axios.get(`${url}/teams`)
            .then(function(response) {
                const tmp = []
                for (const team in response.data) {
                    tmp.push(response.data[team])
                    console.log(tmp)
                }
                setTeamsList(tmp)
            })
            .catch(function(e) {
                console.log(e)
            })
    }
    
    return (
        <AdminDiv>
            <Button onClick={refreshTeams}>Refresh Teams</Button>
            <ul>
                {teamsList.sort(byScore).map((team, i) => {
                    return <li key={i}> {team.name} : {team.score} </li>
                })}
            </ul>

        </AdminDiv>
    )
}