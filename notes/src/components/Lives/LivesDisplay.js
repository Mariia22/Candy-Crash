import React from 'react';
import { LivesDisplayStyle, LivesDisplayTextStyle } from './LivesDisplayStyle';

const LivesDisplay = ({ lives }) => {
  return (
    <LivesDisplayStyle>
      <LivesDisplayTextStyle>Lives: {lives}</LivesDisplayTextStyle>
    </LivesDisplayStyle>
  )
}

export default LivesDisplay
