import React, { Component } from 'react';
import './App.css';

import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'

class App extends Component {
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="App">
          <Routes />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
