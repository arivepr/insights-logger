import React, {useEffect, useState, memo} from 'react';
import {Flex, FlexItem, FlexItemProps} from '@patternfly/react-core';
import Constants from '../utils/constants';
import classNames from 'classnames';
import './styles/loggerRow.styles.scss';

/* 
    This component (by design of react-window) does not care about what this cell is, the indexes are sent straight from the parent component. 
    We have to setup how to present the data being passed through here. See: getData, part of the logic lies there. 
*/

const LoggerRow = memo(({columnIndex, rowIndex, style, data}) => {
    const {parsedData, searchedInput, loggerRef} = data;
    const {LOGGER_DATA_COLUMN_ID, LOGGER_INDEX_COLUMN_ID} = Constants;
    const {isHiglighted, setIsHiglighted} = useState(false);

    const lookForItemRow = (searchedInput) => {
        console.log('looking for item row: ', searchedInput);
        const searchedIndex = parseInt(searchedInput);
        loggerRef.current.scrollToItem(searchedIndex);

        // searchedInput === "" ? loggerRef.current.scrollToItem(searchedIndex) : null; 
    }


    const getData = (colIndex, rowIndex) => {
       return colIndex == LOGGER_DATA_COLUMN_ID ? parsedData[rowIndex]
            : (colIndex == LOGGER_INDEX_COLUMN_ID) ? rowIndex
            : '' ;// this would eventually be replaced with time stamp data    
    } 


    const highlightRow = () => {
        console.log('Test completed!');
    }

    const highlightText = () => {
        console.log('Second test completed!!!');
    }

    const cellClassname = classNames( 'ins-logger-cell', {
        'cell--index-column': columnIndex == 0,
        'cell--data-column': columnIndex == 1, 
        'cell--stamp-column': columnIndex == 2 
    });

    const cellSpanClassname = classNames({
        'cell__index': columnIndex == 0,
        'cell__data': columnIndex == 1,
        'cell__stamp': columnIndex == 2  
    });
    
    // lookForItemRow(searchedInput);
    
    // useEffect(() => {
    //     console.log('Trying to see if this effectcssdfas');
    //     // lookForItemRow(searchedInput);
    // }, []);

    return(
        <div style={style} 
            className={cellClassname}
            onClick={highlightRow}>
            <span 
                className={cellSpanClassname}
                onClick={highlightText}>
                {getData(columnIndex, rowIndex)}
            </span>
        </div>
    )
});


export default LoggerRow;