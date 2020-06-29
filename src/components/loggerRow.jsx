import React, {useEffect, memo} from 'react';
import {Flex, FlexItem, FlexItemProps} from '@patternfly/react-core';
import Constants from '../utils/constants';

/* 
    This component (by design of react-window) does not care about what this cell is, the indexes are sent straight from the parent component. 
    We have to setup how to present the data being passed through here. See: getData, part of the logic lies there. 
*/

const LoggerRow = memo(({columnIndex, rowIndex, style, data}) => {
    const {parsedData, searchedInput, loggerRef} = data;
    const {LOGGER_DATA_COLUMN_ID, LOGGER_INDEX_COLUMN_ID} = Constants;

    const lookForItemRow = (searchedInput) => {
        console.log('looking for item row: ', searchedInput);
        const searchedIndex = parseInt(searchedInput);
        loggerRef.current.scrollToItem(searchedIndex);

        // searchedInput === "" ? loggerRef.current.scrollToItem(searchedIndex) : null; 
    }


    const getData = (colIndex, rowIndex) => {
        console.log('Testing our data retrieval: ', colIndex, rowIndex);
        console.log('Our two constants are: ', LOGGER_DATA_COLUMN_ID);
        console.log(LOGGER_INDEX_COLUMN_ID);
               

       return colIndex == LOGGER_DATA_COLUMN_ID ? parsedData[rowIndex]
            : (colIndex == LOGGER_INDEX_COLUMN_ID) ? rowIndex
            : '' ;// this would eventually be replaced with time stamp data    
    } 

    const setStyle = (columnIndex, rowIndex) => {
        // Depending on what column it is, give a specific style
        // if there is a searchedRow, verify if this is the one, and style accordingly
    }


    // lookForItemRow(searchedInput);
    
    // useEffect(() => {
    //     console.log('Trying to see if this effectcssdfas');
    //     // lookForItemRow(searchedInput);
    // }, []);

    return(
        <div style={style}>
            {/* {rowIndex}:{"    "}{parsedData[rowIndex]} */}
            {/* test: {rowIndex}, {columnIndex} */}
            {/* {(columnIndex, rowIndex) => getData(columnIndex, rowIndex)} */}
            {getData(columnIndex, rowIndex)}
        </div>
    )
});


export default LoggerRow;