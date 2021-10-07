import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, lightTheme, darkTheme } from './GlobalStyle';
import { WrapperStyle } from './WrapperStyle';
import ToggleButton from './components/ToggleButton/ToggleButton';

function App() {
  const [theme, setTheme] = useState(false);

  return (
    <ThemeProvider theme={theme === false ? lightTheme : darkTheme}>
      <GlobalStyle />
      <WrapperStyle>
        <ToggleButton onChange={(event) => setTheme(event.target.checked)} />
        <h1>Notes</h1>
      </WrapperStyle>
    </ThemeProvider>
  );
}

export default App;
