import styled from 'styled-components';

export const WrapperStyle = styled.div`
    display: flex;
    flex-direction: column;
    color: ${props => props.color};
    background-color: ${props => props.color};
`
export const GameStyle = styled.div`
    display: flex;
    flex-wrap:wrap;
    width: 640px; 
    height: 640px;
    margin:50px;
`
export const GameImg = styled.img`
  width: 80px; 
  height: 80px;
`