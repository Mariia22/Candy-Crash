import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, lightTheme, darkTheme } from './GlobalStyle';
import { WrapperStyle, GameStyle, GameImg } from './WrapperStyle';
import ToggleButton from './components/ToggleButton/ToggleButton';

function App() {
  const [theme, setTheme] = useState(false);
  const [board, setBoard] = useState([]);


  function fillBoard() {
    const width = 8;
    const boardArray = [];
    const colors = ['red', 'yellow', 'blue', 'purple', 'orange', 'green'];
    for (let i = 0; i < width * width; i++) {
      boardArray.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    setBoard(boardArray)
  }

  useEffect(() => {
    fillBoard()
  }, [])

  return (
    <ThemeProvider theme={theme === false ? lightTheme : darkTheme}>
      <GlobalStyle />
      <WrapperStyle>
        <ToggleButton onChange={(event) => setTheme(event.target.checked)} />
        <h1>Candy Crash</h1>
        <GameStyle>
          {board.map((color, index) =>
            <GameImg style={{ backgroundColor: color }} key={index} />)}
        </GameStyle>
      </WrapperStyle>
    </ThemeProvider>
  );
}

export default App;
