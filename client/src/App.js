import * as React from 'react';
import CssBaseLine from '@mui/material/CssBaseline';
import './scss/styles.scss';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <React.Fragment>
      <CssBaseLine />
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
      </div>
    </React.Fragment>
  );
}

export default App;
