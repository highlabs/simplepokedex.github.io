import React, { Component } from 'react';
import './App.css';

import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'

class App extends Component {
  render() {
    var test = process.env.PUBLIC_URL
    return (
      <BrowserRouter basename={'https://1994mateus.github.io/simplepokedex.github.io/'}>
        <div className="App">
          <Routes />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
