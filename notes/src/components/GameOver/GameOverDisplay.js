import React from 'react';
import { GameDisplayStyle, GameButtonStyle } from './GameOverDisplayStyle';

const GameOverDisplay = ({ score, startGame }) => {
  return (
    <GameDisplayStyle>
      Game Over. Your score: {score}. Congratulations!!!
      <GameButtonStyle onClick={startGame}>Start new game</GameButtonStyle>
    </GameDisplayStyle>
  )
}

export default GameOverDisplay;
