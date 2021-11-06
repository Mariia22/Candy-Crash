import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, lightTheme, darkTheme } from './GlobalStyle';
import { WrapperStyle, GameStyle, GameImg } from './WrapperStyle';
import ToggleButton from './components/ToggleButton/ToggleButton';

const width = 8;
const colors = ['red', 'yellow', 'blue', 'purple', 'orange', 'green'];
let isChecked;

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

  function deleteRepeateBlocks(optionalArray, color) {
    if (optionalArray.every(index => boardArray[index] === color)) {
      optionalArray.forEach(index => boardArray[index] = '');
      isChecked = true;
    }
  }

  function checkFourBlocksOnRow() {
    isChecked = false;
    const exceptionForFour = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 61, 62, 63];
    for (let i = 0; i < boardArray.length; i++) {
      const optionalArray = [i, i + 1, i + 2, i + 3];
      if (exceptionForFour.includes(i)) continue;
      deleteRepeateBlocks(optionalArray, boardArray[i]);
    }
    return isChecked;
  }

  function checkThreeBlocksOnRow() {
    isChecked = false;
    const exceptionForThree = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63];
    for (let i = 0; i < boardArray.length; i++) {
      const optionalArray = [i, i + 1, i + 2];
      if (exceptionForThree.includes(i)) continue;
      deleteRepeateBlocks(optionalArray, boardArray[i]);
    }
    return isChecked;
  }

  function checkFourBlocksOnColumns() {
    isChecked = false;
    for (let i = 0; i <= 47; i++) {
      const optionalArray = [i, i + width, i + 2 * width, i + 3 * width];
      deleteRepeateBlocks(optionalArray, boardArray[i])
    }
    return isChecked;
  }

  function checkThreeBlocksOnColumns() {
    isChecked = false;
    for (let i = 0; i <= 53; i++) {
      const optionalArray = [i, i + width, i + 2 * width];
      deleteRepeateBlocks(optionalArray, boardArray[i])
    }
    return isChecked;
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
    boardArray[dropBlockId] = replaceBlock.style.backgroundColor;
    boardArray[replaceBlockId] = dropBlock.style.backgroundColor;
    const valueMotion = [dropBlockId + 1, dropBlockId - 1, dropBlockId + width, dropBlockId - width];
    const isCheckThreeRows = checkThreeBlocksOnRow();
    const isCheckFourRows = checkFourBlocksOnRow();
    const isCheckFourColumns = checkFourBlocksOnColumns();
    const isCheckThreeColumns = checkThreeBlocksOnColumns()
    if (dropBlockId &&
      (isCheckThreeRows || isCheckFourRows || isCheckFourColumns || isCheckThreeColumns)
      && valueMotion.includes(replaceBlockId)) {
      setReplaceBlock(null);
      setDropBlock(null)
    }
    else {
      boardArray[dropBlockId] = dropBlock.style.backgroundColor;
      boardArray[replaceBlockId] = replaceBlock.style.backgroundColor;
    }
  }

  useEffect(() => {
    fillBoard()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      checkFourBlocksOnRow();
      checkFourBlocksOnColumns();
      checkThreeBlocksOnRow();
      checkThreeBlocksOnColumns();
      replaceEmptyValues();
      setBoard([...boardArray]);
    }, 200)
    return () => clearInterval(timer);
  }, [checkFourBlocksOnRow, checkFourBlocksOnColumns, checkThreeBlocksOnColumns, checkThreeBlocksOnRow, replaceEmptyValues, boardArray])

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
