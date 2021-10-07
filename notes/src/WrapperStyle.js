import styled from 'styled-components';

export const WrapperStyle = styled.div`
    display: flex;
    flex-direction: column;
    color: ${props => props.color || props.theme.colors.fontColor};
    background-color: ${props => props.color || props.theme.colors.backgroundColor};
`