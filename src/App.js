import React from 'react';
import logo from './logo.svg';
import data from './data/testData.js';
import Logger from './components/logger';
import {Card, CardTitle, CardBody, CardFooter, CardHeader} from "@patternfly/react-core";

// import './App.css';

// Will use this component to run a demo application for the logger component. 
function App() {
  return (
    <div className="App">
      <header className="App-header">
      {/* <Card style={{width: "800px", margin: "100px"}}> 
                <CardHeader>
                    <CardTitle>
                        <div className='loggerHeaderDiv'>
                            {logTitle}
                            <TextInput value={searchedInput} type="text" onChange={handleInputChange}
                                aria-label="Search" />
                            <Button variant="primary" onClick={lookForKeywordRow}>Search</Button>
                        </div>   
                    </CardTitle> 
                </CardHeader> 
                
        */}
          <Logger logTitle="Playbook Console Data" data={data}/>
      </header>
    </div>
  );
}

export default App;
