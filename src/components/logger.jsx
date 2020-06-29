import React, {useEffect, useState, memo, useRef} from 'react';
import { FixedSizeList as List, areEqual} from "react-window";
import { VariableSizeGrid as Grid } from 'react-window'; // This is something that we'll need for transition to more complete logger
import LoggerRow from '../components/loggerRow';
import LoggerToolbar from './loggerToolbar';
import memoize from 'memoize-one';
import { Toolbar , ToolbarItem, ToolbarContent } from '@patternfly/react-core';
import { Stack, StackItem, TextInput,Button } from '@patternfly/react-core';
import {Flex, FlexItem, FlexItemProps} from '@patternfly/react-core';
import Constants from '../utils/constants';
import MLParser from './mlParser';
import YAML from 'yaml';

import './styles/logger.styles.scss';
import './styles/styles.css';
import "@patternfly/react-core/dist/styles/base.css";

// Will export these to a separate file later for all constant variables for the logger
const LOGGER_COLUMNS_AMOUNT = 3;
const LOGGER_DATA_COLUMN_INDEX = 1;
const LOGGER_INDEX_COLUMN_WIDTH = 50;
const LOGGER_DATA_COLUMN_WIDTH = 850;
const LOGGER_STAMP_COLUMN_WIDTH = 100;
const LOGGER_ROW_HEIGHT = 50;

// const {LOGGER_COLUMNS_AMOUNT, LOGGER_INDEX_COLUMN_WIDTH, LOGGER_DATA_COLUMN_WIDTH, LOGGER_ROW_HEIGHT} = Constants;

const cleanUpStringArray = (data) => {
    const cleaninRegEx = new RegExp('(\s+\\+[a-zA-Z])|"|(\n\s)');
    let cleanArray = [];
    let s = "";
    let spaceCounter = 0;

    // for (s of data){
    //     if(!cleaninRegEx.test(s)){
    //         if (s !== "" || s){
    //             spaceCounter++;
    //             cleanArray.push(s)
    //         }
    //     }
    // }   

    // return cleanArray;
    return data;
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


const Logger = memo(({logTitle, data, isPayloadConsole}) => {
    const [parsedData, setParsedData] = useState([]);
    const [searchedInput, setSearchedInput] = useState('');
    const [foundInputIndexes, setFoundInputIndexes] = useState([]); // Meant to be used to jump back and forth between instances of searched keyword
    const loggerRef = React.useRef();
    const dataToRender = createLoggerDataItem(parsedData, searchedInput, loggerRef); 


    useEffect(() => {
        isPayloadConsole 
            ? setParsedData(parseConsoleOutput(data.message.payload.console))
            : setParsedData('');  // We would substitute parseConsoleOutput with something that would parse the correct thing(whatever that is)
    }, []);


    const handleInputChange = (inputValue) => {
        setSearchedInput(inputValue);
    }


    const lookForKeywordRow = () => {
        // Hacky solution to our search problem. This will have to be reworked for jumping between instances of found strings. 
        let rowIndexCounter = 0;
        
        if(!searchedInput == ""){
            console.log('This is my searched input: ', searchedInput);

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
        const adjustedColumnWidth = index === 0 || index == 2
            ?   LOGGER_INDEX_COLUMN_WIDTH // can use same size for both timestamp and index
            :   LOGGER_DATA_COLUMN_WIDTH;
        
        return adjustedColumnWidth;
    }

    
    const setRowHeight = (index) => {
        const adjustedRowHeight = index % 2 === 0
            ? LOGGER_ROW_HEIGHT
            : LOGGER_ROW_HEIGHT;

        return adjustedRowHeight;
    }
    
    // Gotta figure out how to use itemSize to my advantage
    return(
        <>
            <Stack className='logger-stack' hasGutter>
                <StackItem>
                    <Flex className='ins-loggerToolbar' flex={{default: 'flex_4'}}  direction={{default: 'column'}}>
                        <Flex>
                            <FlexItem className='ins-loggerToolbar__title'> {logTitle} </FlexItem>
                        </Flex>
                        <Flex>
                            <FlexItem>
                                <LoggerToolbar 
                                    className='ins-loggerToolbar__search'
                                    setSearchedInput={setSearchedInput}    
                                    foundInputIndexes={foundInputIndexes}
                                />
                            </FlexItem>   
                        </Flex> 
                    </Flex>
                </StackItem>
                <StackItem>
                    <Grid 
                        className='loggerGrid'
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
                </StackItem>
            </Stack>
        </>
    );
}, areEqual);


Logger.defaultProps =  {
    isPayloadConsole: true
};

export default Logger;