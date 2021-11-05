import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, lightTheme, darkTheme } from './GlobalStyle';
import { WrapperStyle, GameStyle, GameImg } from './WrapperStyle';
import ToggleButton from './components/ToggleButton/ToggleButton';

const width = 8;
const colors = ['red', 'yellow', 'blue', 'purple', 'orange', 'green'];

function App() {
  const [theme, setTheme] = useState(false);
  const [boardArray, setBoard] = useState([]);
  const [replaceBlock, setReplaceBlock] = useState(null);
  const [dropBlock, setDropBlock] = useState(null);


  function fillBoard() {
    const board = [];
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

  function replaceEmptyValues() {
    for (let i = 0; i < boardArray.length - width; i++) {
      const isFirstLine = [0, 1, 2, 3, 4, 5, 6, 7]
      if (isFirstLine.includes(i) && (boardArray[i] === '')) {
        boardArray[i] = colors[Math.floor(Math.random() * colors.length)];
      }
      else {
        if (boardArray[i + width] === '') {
          boardArray[i + width] = boardArray[i];
          boardArray[i] = '';
        }
      }
    }
  }

  function dragStart(e) {
    setDropBlock(e.target);
  }

  function dragDrop(e) {
    setReplaceBlock(e.target);
  }

  function dragEnd() {
    let dropBlockId = parseInt(dropBlock.getAttribute('data-id'));
    let replaceBlockId = parseInt(replaceBlock.getAttribute('data-id'));
    const valueMotion = [dropBlockId + 1, dropBlockId - 1, dropBlockId + width, dropBlockId - width];
    if (valueMotion.includes(replaceBlockId)) {
      boardArray[dropBlockId] = replaceBlock.style.backgroundColor;
      boardArray[replaceBlockId] = dropBlock.style.backgroundColor;
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
      deleteThreeBlocksOnColumns();
      replaceEmptyValues();
      setBoard([...boardArray]);
    }, 100)
    return () => clearInterval(timer);
  }, [deleteFourBlocksOnRow, deleteFourBlocksOnColumns, deleteThreeBlocksOnRow, deleteThreeBlocksOnColumns, replaceEmptyValues, boardArray])

  return (
    <ThemeProvider theme={theme === false ? lightTheme : darkTheme}>
      <GlobalStyle />
      <WrapperStyle>
        <ToggleButton onChange={(event) => setTheme(event.target.checked)} />
        <h1>Candy Crash</h1>
        <GameStyle>
          {boardArray.map((color, index) =>
            <GameImg style={{ backgroundColor: color }}
              key={index}
              alt={color}
              data-id={index}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={e => e.preventDefault()}
              onDragEnter={e => e.preventDefault()}
              onDragLeave={e => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}

            />)}
        </GameStyle>
      </WrapperStyle>
    </ThemeProvider>
  );
}

export default App;
