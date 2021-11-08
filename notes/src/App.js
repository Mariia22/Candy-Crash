import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, lightTheme, darkTheme } from './GlobalStyle';
import { WrapperStyle, HeaderStyle, GameStyle, GameImg } from './WrapperStyle';
import Logo from './images/logo.png';
import Empty from './images/empty.png';
import Fox from './images/fox.png';
import Hippo from './images/hippo.png';
import Crab from './images/crab.png';
import Frog from './images/frog.png';
import Rabbit from './images/rabbit.png';
import Penguin from './images/penguin.png';
import ToggleButton from './components/ToggleButton/ToggleButton';
import ScoreDisplay from './components/Score/ScoreDisplay';
import LivesDisplay from './components/Lives/LivesDisplay';

const width = 8;
const colors = [Fox, Hippo, Crab, Frog, Rabbit, Penguin];

function App() {
  const [theme, setTheme] = useState(false);
  const [boardArray, setBoard] = useState([]);
  const [replaceBlock, setReplaceBlock] = useState(null);
  const [dropBlock, setDropBlock] = useState(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(20);


  function fillBoard() {
    const board = [];
    for (let i = 0; i < width * width; i++) {
      board.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    setBoard(board);
  }

  function endGame() {
    alert("End Game")
  }

  function checkFourBlocksOnRow() {
    const exceptionForFour = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 61, 62, 63];
    for (let i = 0; i < boardArray.length; i++) {
      const optionalArray = [i, i + 1, i + 2, i + 3];
      const color = boardArray[i];
      const isBlank = boardArray[i] === Empty;
      if (exceptionForFour.includes(i)) continue;
      if (optionalArray.every(index => boardArray[index] === color) && !isBlank) {
        setScore(score => score + 40);
        optionalArray.forEach(index => boardArray[index] = Empty);
        return true;
      }
    }
  }

  function checkThreeBlocksOnRow() {
    const exceptionForThree = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63];
    for (let i = 0; i < boardArray.length; i++) {
      const optionalArray = [i, i + 1, i + 2];
      const color = boardArray[i];
      const isBlank = boardArray[i] === Empty;
      if (exceptionForThree.includes(i)) continue;
      if (optionalArray.every(index => boardArray[index] === color) && !isBlank) {
        setScore(score => score + 30);
        optionalArray.forEach(index => boardArray[index] = Empty);
        return true;
      }
    }
  }

  function checkFourBlocksOnColumns() {
    for (let i = 0; i <= 47; i++) {
      const optionalArray = [i, i + width, i + 2 * width, i + 3 * width];
      const color = boardArray[i];
      const isBlank = boardArray[i] === Empty;
      if (optionalArray.every(index => boardArray[index] === color) && !isBlank) {
        setScore(score => score + 40);
        optionalArray.forEach(index => boardArray[index] = Empty);
        return true;
      }
    }
  }

  function checkThreeBlocksOnColumns() {
    for (let i = 0; i <= 53; i++) {
      const optionalArray = [i, i + width, i + 2 * width];
      const color = boardArray[i];
      const isBlank = boardArray[i] === Empty;
      if (optionalArray.every(index => boardArray[index] === color) && !isBlank) {
        setScore(score => score + 30);
        optionalArray.forEach(index => boardArray[index] = Empty);
        return true;
      }
    }
  }

  function replaceEmptyValues() {
    for (let i = 0; i < boardArray.length - width; i++) {
      const isFirstLine = [0, 1, 2, 3, 4, 5, 6, 7]
      if (isFirstLine.includes(i) && (boardArray[i] === Empty)) {
        boardArray[i] = colors[Math.floor(Math.random() * colors.length)];
      }
      else {
        if (boardArray[i + width] === Empty) {
          boardArray[i + width] = boardArray[i];
          boardArray[i] = Empty;
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
    if (dropBlockId && valueMotion.includes(replaceBlockId)) {
      boardArray[dropBlockId] = replaceBlock.getAttribute('src');
      boardArray[replaceBlockId] = dropBlock.getAttribute('src');
    }
    const isCheckFourRows = checkFourBlocksOnRow();
    const isCheckFourColumns = checkFourBlocksOnColumns();
    const isCheckThreeRows = checkThreeBlocksOnRow();
    const isCheckThreeColumns = checkThreeBlocksOnColumns();
    if (isCheckThreeRows || isCheckFourRows || isCheckFourColumns || isCheckThreeColumns) {
      if (lives === 0) {
        endGame();
      }
      setLives(lives => lives - 1);
      setReplaceBlock(null);
      setDropBlock(null);
    }
    else {
      boardArray[dropBlockId] = dropBlock.getAttribute('src');
      boardArray[replaceBlockId] = replaceBlock.getAttribute('src');
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
        <HeaderStyle>
          <img src={Logo} width="200px" height="100px" />
          <ToggleButton onChange={(event) => setTheme(event.target.checked)} />
        </HeaderStyle>
        <GameStyle>
          {boardArray.map((color, index) =>
            <GameImg src={color}
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
        <ScoreDisplay score={score} />
        <LivesDisplay lives={lives} />
      </WrapperStyle>
    </ThemeProvider>
  );
}

export default App;
