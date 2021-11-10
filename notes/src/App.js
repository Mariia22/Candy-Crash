import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, lightTheme, darkTheme } from './GlobalStyle';
import { WrapperStyle, WrapperDisplay, WrapperGame, HeaderStyle, HeaderSign, HeaderText, GameStyle, GameImg } from './WrapperStyle';
import Empty from './images/empty.png';
import Candy from './images/candy.png';
import Candy6 from './images/candy6.png';
import Candy2 from './images/candy2.png';
import Candy3 from './images/candy3.png';
import Candy4 from './images/candy4.png';
import Candy5 from './images/candy5.png';
import ToggleButton from './components/ToggleButton/ToggleButton';
import ScoreDisplay from './components/Score/ScoreDisplay';
import LivesDisplay from './components/Lives/LivesDisplay';
import GameOverDisplay from './components/GameOver/GameOverDisplay';

const width = 8;
const colors = [Candy, Candy2, Candy3, Candy4, Candy5, Candy6];

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
  function startGame() {
    fillBoard();
    setScore(0);
    setLives(2);
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
      setReplaceBlock(null);
      setDropBlock(null);
      setLives(lives => lives - 1);
    }
    else {
      boardArray[dropBlockId] = dropBlock.getAttribute('src');
      boardArray[replaceBlockId] = replaceBlock.getAttribute('src');
    }
  }

  useEffect(() => {
    startGame()
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
      <HeaderStyle>
        <HeaderSign>
          <img src={Candy2} width='50px' height='50px' />
          <HeaderText>CANDY CRASH</HeaderText>
          <img src={Candy} width='50px' height='50px' />
        </HeaderSign>
        <ToggleButton onChange={(event) => setTheme(event.target.checked)} />
      </HeaderStyle>
      <WrapperStyle>
        <WrapperGame>
          {lives === 0 ? <GameOverDisplay score={score} startGame={startGame} /> : (
            <>
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
            </>
          )}
        </WrapperGame>
        <WrapperDisplay>
          <ScoreDisplay score={score} />
          <LivesDisplay lives={lives} />
        </WrapperDisplay>
      </WrapperStyle>
    </ThemeProvider>
  );
}

export default App;
