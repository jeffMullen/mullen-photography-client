import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import CssBaseLine from '@mui/material/CssBaseline';
import './scss/styles.scss';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Gallery from './pages/Gallery/Gallery';
import Header from './components/Header/Header';

import { ThemeProvider } from '@mui/material/styles';
import { StoreProvider, useStoreContext } from './utils/GlobalState';
import theme from './utils/Theme';

function App() {


  return (
    <>
      <CssBaseLine />
      <StoreProvider>
        <ThemeProvider theme={theme}>
            <div className="App">
              {/* <header className="App-header"> */}
                <Header />
              {/* </header> */}
              <main>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/About" component={About} />
                  <Route exact path="/Gallery" component={Gallery} />
                </Switch>
              </main>
            </div>
        </ThemeProvider>
      </StoreProvider>
    </>
  );
}

export default App;
