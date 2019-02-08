import React, { Component } from 'react';
import './App.css';

import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'

class App extends Component {
  render() {
    var url = process.env.PUBLIC_URL
    return (
      <BrowserRouter basename={url}>
        <div className="App">
          <Routes />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
