import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, lightTheme, darkTheme } from './GlobalStyle';
import { WrapperStyle, GameStyle, GameImg } from './WrapperStyle';
import ToggleButton from './components/ToggleButton/ToggleButton';

const width = 8;

function App() {
  const [theme, setTheme] = useState(false);
  const [boardArray, setBoard] = useState([]);


  function fillBoard() {
    const board = [];
    const colors = ['red', 'yellow', 'blue', 'purple', 'orange', 'green'];
    for (let i = 0; i < width * width; i++) {
      board.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    setBoard(board)
  }

  function deleteFourBlocksOnRow() {
    for (let i = 0; i < boardArray.length; i++) {
      const optionalArray = [i, i + 1, i + 2, i + 3];
      let defineColor = boardArray[i];
      const isExeption = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 61, 62, 63];
      if (isExeption.includes(i)) continue;
      if (optionalArray.every(index => boardArray[index] === defineColor)) {
        optionalArray.forEach(index => boardArray[index] = '');
      }
    }
  }

  function deleteThreeBlocksOnRow() {
    for (let i = 0; i < boardArray.length; i++) {
      const optionalArray = [i, i + 1, i + 2];
      let defineColor = boardArray[i];
      const isExeption = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63];
      if (isExeption.includes(i)) continue;
      if (optionalArray.every(index => boardArray[index] === defineColor)) {
        optionalArray.forEach(index => boardArray[index] = '');
      }
    }
  }

  function deleteFourBlocksOnColumns() {
    for (let i = 0; i < 47; i++) {
      const optionalArray = [i, i + width, i + 2 * width, i + 3 * width];
      let defineColor = boardArray[i];
      if (optionalArray.every(index => boardArray[index] === defineColor)) {
        optionalArray.forEach(index => boardArray[index] = '');
      }
    }
  }

  function deleteThreeBlocksOnColumns() {
    for (let i = 0; i < 53; i++) {
      const optionalArray = [i, i + width, i + 2 * width];
      let defineColor = boardArray[i];
      if (optionalArray.every(index => boardArray[index] === defineColor)) {
        optionalArray.forEach(index => boardArray[index] = '');
      }
    }
  }

  useEffect(() => {
    fillBoard()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      deleteFourBlocksOnRow();
      deleteFourBlocksOnColumns();
      deleteThreeBlocksOnRow();
      deleteThreeBlocksOnColumns()
      setBoard([...boardArray]);
    }, 100)
    return () => clearInterval(timer);
  }, [deleteFourBlocksOnRow, deleteFourBlocksOnColumns, deleteThreeBlocksOnRow, deleteThreeBlocksOnColumns, boardArray])

  return (
    <ThemeProvider theme={theme === false ? lightTheme : darkTheme}>
      <GlobalStyle />
      <WrapperStyle>
        <ToggleButton onChange={(event) => setTheme(event.target.checked)} />
        <h1>Candy Crash</h1>
        <GameStyle>
          {boardArray.map((color, index) =>
            <GameImg style={{ backgroundColor: color }} key={index} />)}
        </GameStyle>
      </WrapperStyle>
    </ThemeProvider>
  );
}

export default App;
