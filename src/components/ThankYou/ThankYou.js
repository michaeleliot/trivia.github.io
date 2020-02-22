import * as React from 'react';
import styled from 'styled-components'

const ThankYouDiv = styled.div`
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

export default function ThankYou() {
    return (
        <ThankYouDiv>
            Thank You {localStorage.getItem('teamName')}}. You're answers have been submitted.
        </ThankYouDiv>
    )
}