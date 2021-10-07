import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Times New Roman';
}
body{
    background-color: ${props => props.theme.body};
    color: ${props => props.theme.color}
}
`
export const lightTheme = {
    body: '#FFFFFF',
    color: 'black',
};
export const darkTheme = {
    color: '#FFFFFF',
    body: 'black',
}