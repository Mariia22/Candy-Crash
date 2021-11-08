import { createGlobalStyle } from 'styled-components';
import lightBackImage from './images/background.png';
import darkBackImage from './images/darkbackground.jpeg';

export const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Times New Roman';
}
body{
  font-size: 20px;
    background-color: ${props => props.theme.body} ;
    background-image: url(${props => props.theme.backgroundImg});
    background-repeat: no-repeat;
    background-size: cover;
    color: ${props => props.theme.color}
}
img{
  margin:0;
  padding:0;
}
`
export const lightTheme = {
  body: '#FFFFFF',
  color: 'black',
  backgroundImg: lightBackImage,
};

export const darkTheme = {
  color: '#FFFFFF',
  body: 'black',
  backgroundImg: darkBackImage,
}