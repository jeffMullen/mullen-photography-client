import * as React from 'react';
import CssBaseLine from '@mui/material/CssBaseline';
import './scss/styles.scss';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';

import { ThemeProvider } from '@mui/material/styles';
import theme from './utils/Theme';

function App() {

  return (
    <>
      <CssBaseLine />
      <ThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <Header />
          </header>
          <main>
            <Home />
          </main>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
