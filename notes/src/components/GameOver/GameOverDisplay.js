import React from 'react';
import { GameDisplayStyle, GameButtonStyle, GameDisplayInf } from './GameOverDisplayStyle';

const GameOverDisplay = ({ score, startGame }) => {
  return (
    <GameDisplayStyle>
      <GameDisplayInf>
        <p>GAME OVER</p>
        <p>YOUR SCORE {score}</p>
        <GameButtonStyle onClick={startGame}>START NEW GAME</GameButtonStyle>
      </GameDisplayInf>
    </GameDisplayStyle>
  )
}

export default GameOverDisplay;
