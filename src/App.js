import React from 'react';

import Game from './Game.js'
import './App.css';


import Zoomable from './Zoomable.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Zoomable>
        <Game />
        </Zoomable>
      </header>
    </div>
  );
}

export default App;
