import styled from 'styled-components';

export const WrapperStyle = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    color: ${props => props.color};
    background-color: ${props => props.color};
`;

export const WrapperGame = styled.div`
    display: flex;
    flex-direction: column;
`;

export const HeaderStyle = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
margin: 3rem 2rem 0.5rem 2rem;
`;

export const HeaderSign = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const HeaderText = styled.div`
 margin: 0 20px;
 font-weight: bold;
 font-size: 2.8rem;
`;

export const GameStyle = styled.div`
    display: flex;
    flex-wrap:wrap;
    width: 565px; 
    height: 580px;
    margin:40px;
    background-color: #ffffff;
    padding: 0.1rem;
`;
export const GameImg = styled.img`
  width: 70px; 
  height: 70px;
  border: 1px solid green;
`;

export const WrapperDisplay = styled.div`
    display: flex;
    flex-direction: column;
    font-weight: bold;
`;