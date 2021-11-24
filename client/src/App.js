import * as React from 'react';
import CssBaseLine from '@mui/material/CssBaseline';
import './scss/styles.scss';
import Header from './components/Header/Header';

import { ThemeProvider } from '@mui/material/styles';
import theme from './utils/Theme';

function App() {

  console.log(theme)
  return (
    <>
      <CssBaseLine />
      <ThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <Header />
          </header>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
