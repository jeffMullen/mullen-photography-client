import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseLine from '@mui/material/CssBaseline';
import './scss/styles.scss';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Gallery from './pages/Gallery/Gallery';
import Header from './components/Header/Header';

import { ThemeProvider } from '@mui/material/styles';
import theme from './utils/Theme';

function App() {

  return (
    <>
      <CssBaseLine />
      <ThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <header className="App-header">
              <Header />
            </header>
            <main>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/About" component={About} />
                <Route exact path="/Gallery" component={Gallery} />
              </Switch>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
