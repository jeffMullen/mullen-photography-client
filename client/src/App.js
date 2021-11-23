import * as React from 'react';
import CssBaseLine from '@mui/material/CssBaseline';
import './scss/styles.scss';
import Header from './components/Header/Header';

function App() {
  return (
    <>
      <CssBaseLine />
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
      </div>
    </>
  );
}

export default App;
