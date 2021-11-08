import styled from 'styled-components';
import GameOver from './../../images/gameover.png'

export const GameDisplayStyle = styled.div`
margin: 5rem auto;
width: 50%;
height: 500px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: white;
color: #c41217;
font-size: 2rem;
background-image:url(${GameOver});
background-repeat: no-repeat;
background-size: cover;
`;

export const GameButtonStyle = styled.button`
width: 5rem;
height: 2rem
`;