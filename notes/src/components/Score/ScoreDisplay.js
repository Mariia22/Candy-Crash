import React from 'react';
import { ScoreDisplayStyle, ScoreDisplayStyleText } from './ScoreDisplayStyle';

const ScoreDisplay = ({ score }) => {
  return (
    <ScoreDisplayStyle>
      <ScoreDisplayStyleText>Score: {score}</ScoreDisplayStyleText>
    </ScoreDisplayStyle>
  )
}

export default ScoreDisplay
