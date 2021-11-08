import styled from 'styled-components';

export const WrapperStyle = styled.div`
    display: flex;
    flex-direction: column;
    color: ${props => props.color};
    background-color: ${props => props.color};
`
export const HeaderStyle = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin: 0.5rem 2rem 0.5rem 2rem;
`;

export const GameStyle = styled.div`
    display: flex;
    flex-wrap:wrap;
    width: 560px; 
    height: 560px;
    margin:40px;
`
export const GameImg = styled.img`
  width: 70px; 
  height: 70px;
`