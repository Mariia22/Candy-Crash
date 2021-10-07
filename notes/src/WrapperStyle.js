import styled from 'styled-components';

export const WrapperStyle = styled.div`
    display: flex;
    flex-direction: column;
    color: ${props => props.color};
    background-color: ${props => props.color};
`