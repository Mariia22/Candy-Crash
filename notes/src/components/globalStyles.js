import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Times New Roman';
}
`
export const theme = {
    colors: {
        backgroundColor: '#FFFFFF',
        headerColor: '#7C7C7C',
        fontColor: 'black',
        backgroundNote: 'yellow',
        backgroundNewNote: 'green'
    }
}
export default GlobalStyle;