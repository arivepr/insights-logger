import React, {useEffect, useState, memo, useRef} from 'react';
import { VariableSizeGrid as Grid, areEqual } from 'react-window'; // This is something that we'll need for transition to more complete logger
import LoggerRow from '../components/loggerRow';
import LoggerToolbar from './loggerToolbar';
import LoggerHeader from './loggerHeader';
import memoize from 'memoize-one';
import { Stack, StackItem, TextInput,Button } from '@patternfly/react-core';
import Constants from '../utils/constants';
import MLParser from './mlParser';
import YAML from 'yaml';
import './styles/logger.styles.scss';
import './styles/styles.css';
import "@patternfly/react-core/dist/styles/base.css";
import "@patternfly/patternfly/patternfly.css";

// Will export these to a separate file later for all constant variables for the logger
const LOGGER_COLUMNS_AMOUNT = 3;
const LOGGER_DATA_COLUMN_INDEX = 1;
const LOGGER_INDEX_COLUMN_WIDTH = 80;
const LOGGER_DATA_COLUMN_WIDTH = 800;
const LOGGER_STAMP_COLUMN_WIDTH = 102;
const LOGGER_ROW_HEIGHT = 50;

// const {LOGGER_COLUMNS_AMOUNT, LOGGER_INDEX_COLUMN_WIDTH, LOGGER_DATA_COLUMN_WIDTH, LOGGER_ROW_HEIGHT} = Constants;

const cleanUpStringArray = (data) => {
    const cleaninRegEx = new RegExp('(\s+\\+[a-zA-Z])|"|(\n\s)');
    let cleanArray = [];
    let s = "";
    let spaceCounter = 0;

    for (s of data){
        if(!cleaninRegEx.test(s)){
            if (s !== "" ){
                spaceCounter++;
                cleanArray.push(s)
            }
        }
    }   

    return cleanArray;
    // return data;
};

// To be moved as a helper function to mlParser
const parseConsoleOutput = (data) => {
    const stringToSplitWith = "\n";
    const stringifiedData = YAML.stringify(data);
    const cleanString = stringifiedData.split(stringToSplitWith);
    
    return cleanUpStringArray(cleanString);
}

// Wrapping multiple variables around memoization to rerender loggerRow only when these change, and two send both through a single obj. 
const createLoggerDataItem = memoize((parsedData, searchedInput, loggerRef) => ({
    parsedData, 
    searchedInput,
    loggerRef
}));

// includes toolbar will be a boolean flag to check for before adding a toolbar to the logger (need to figure out what the best logic for this would be)
const Logger = memo(({logTitle, includesToolbar, data, isPayloadConsole, searchedKeyword}) => { 
    const [parsedData, setParsedData] = useState([]);
    const [searchedInput, setSearchedInput] = useState('');
    const [foundInputIndexes, setFoundInputIndexes] = useState([]); // Meant to be used to jump back and forth between instances of searched keyword
    const loggerRef = React.useRef();
    const dataToRender = createLoggerDataItem(parsedData, searchedInput, loggerRef); 

    // Need to make sure to use complete separate word for search. 
    // Only the action bottons on the toolbar will look for these instances of searches. 

    useEffect(() => {
        isPayloadConsole 
            ? setParsedData(parseConsoleOutput(data.message.payload.console))
            : setParsedData('');  // We would substitute parseConsoleOutput with something that would parse the correct thing(whatever that is)
    }, []);


    const lookForKeywordRow = () => {
        // Hacky solution to our search problem. This will have to be reworked for jumping between instances of found strings. 
        let rowIndexCounter = 0;
        
        if(!searchedInput == ""){
            for(const row of parsedData){
                const keywordIndexPosition = row.search(searchedInput)
                const foundFlag = keywordIndexPosition === -1 
                        ? false
                        : scrollToKeywordRow(rowIndexCounter);
                
                console.log('Found flag ', foundFlag);

                if (foundFlag)
                    break;
                else 
                    rowIndexCounter++;

                console.log('We are in row: ', rowIndexCounter);
            }
        } else {
            loggerRef.current.scrollToItem(0);
        }
    }


    const scrollToKeywordRow = (rowIndex) => {
        // for now let's just reset the search input, but we want to add to the counter so that we are able to jump back and forth from all iterations of the same keyword
        console.log('Found it at row: ', rowIndex);
        loggerRef.current.scrollToItem(rowIndex, 'start');
        setSearchedInput('');

        return true; 
    }


    const setColumnWidth = (index) => {
        return index === 0 
            ?   LOGGER_INDEX_COLUMN_WIDTH 
            :   index === 2
                ?   LOGGER_STAMP_COLUMN_WIDTH
                :   LOGGER_DATA_COLUMN_WIDTH;
    }


    
    const setRowHeight = (index) => {
        return index % 2 === 0
            ? LOGGER_ROW_HEIGHT
            : LOGGER_ROW_HEIGHT;
    }

    // have to clean up the render method. 
    
    // Gotta figure out how to use itemSize to my advantage
    return(
        <>
            <div className='ins-logger-root-layout' hasGutter>
                <div className='logger__header'>
                    <LoggerHeader 
                        setSearchedInput={setSearchedInput}
                    />
                </div>
                <div className='logger__toolbar'> 
                    <LoggerToolbar />
                </div>
                    <Grid 
                        className='logger__grid'
                        rowCount={parsedData.length}
                        columnCount={LOGGER_COLUMNS_AMOUNT}
                        columnWidth={index => setColumnWidth(index)}
                        rowHeight={index => setRowHeight(index)}
                        height={600}
                        width={1000}
                        itemSize={30}
                        itemCount={parsedData.length}
                        itemData={dataToRender}
                        overscanCount={1}
                        ref={loggerRef}
                    >
                        {LoggerRow}
                    </Grid>
            </div>
        </>
    );
}, areEqual);


Logger.defaultProps =  {
    isPayloadConsole: true,
    includesToolbar: true
};

export default Logger;