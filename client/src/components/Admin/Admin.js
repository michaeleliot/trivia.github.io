import * as React from 'react';
import styled from 'styled-components'
import axios from 'axios'
import { Link } from "react-router-dom";

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
    const [teamsList, setTeamsList] = React.useState([])

    function byScore(a, b) {
        return b.score - a.score
    }

    function refreshTeams() {
        axios.get('/api/teams')
            .then(function(response) {
                const tmp = []
                for (const team in response.data) {
                    tmp.push(response.data[team])
                }
                setTeamsList(tmp)
            })
            .catch(function(e) {
                console.log(e)
            })
    }
    return (
        <AdminDiv>
            <Button onClick={refreshTeams}>Load Teams</Button>
            <ul>
                {teamsList.sort(byScore).map((team, i) => {
                    return <li key={i}> <Link to={`/admin/${team.name}`}>{team.name}</Link> : {team.score} </li>
                })}
            </ul>
        </AdminDiv>
    )
}