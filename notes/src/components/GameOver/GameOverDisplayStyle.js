import styled from 'styled-components';

export const GameDisplayStyle = styled.div`
margin: 6rem auto;
width: 100%;
height: 500px;
font-weight: bold;
font-size: 2.8rem;
`;

export const GameButtonStyle = styled.button`
width: 10rem;
height: 3rem;
margin: 1rem 0;
background: linear-gradient(#ff7c48, #fd435b);
border: none;
color: ${props => props.theme.color};
`;

export const GameDisplayInf = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
color: #ff7c48
`;