import React from 'react';
import logo from './logo.svg';
import data from './data/testData.js';
import Logger from './components/logger';

// import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logger logTitle="Playbook Console Data" data={data}/>
      </header>
    </div>
  );
}

export default App;
