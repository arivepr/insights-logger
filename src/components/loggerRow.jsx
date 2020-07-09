import React, {useEffect, useState, memo} from 'react';
import {Flex, FlexItem, FlexItemProps} from '@patternfly/react-core';
import {LOGGER_DATA_COLUMN_ID, LOGGER_INDEX_COLUMN_ID, LOGGER_LINE_NUMBER_INDEX_DELTA} from '../utils/constants';
import classNames from 'classnames';
import './styles/loggerRow.styles.scss';

/* 
    This component (by design of react-window) does not care about what this cell is, the indexes are sent straight from the parent component. 
    We have to setup how to present the data being passed through here. See: getData, part of the logic lies there. 
*/

const LoggerRow = memo(({columnIndex, rowIndex, style, data, setHiglightedRowIndexes, highlightRowIndexes, searchedWordIndexes}) => {
    const {parsedData, loggerRef} = data;
    const [isHiglighted, setIsHiglighted] = useState(false);

    const lookForItemRow = (searchedInput) => {
        console.log('looking for item row: ', searchedInput);
        const searchedIndex = parseInt(searchedInput);
        loggerRef.current.scrollToItem(searchedIndex);

        // searchedInput === "" ? loggerRef.current.scrollToItem(searchedIndex) : null; 
    }


    const getData = (colIndex, rowIndex) => {
       return colIndex == LOGGER_DATA_COLUMN_ID ? parsedData[rowIndex]
            : (colIndex == LOGGER_INDEX_COLUMN_ID) ? (rowIndex + LOGGER_LINE_NUMBER_INDEX_DELTA)
            : '' ;// this would eventually be replaced with time stamp data    
    } 

    const handleHighlightRow = (columnIndex, rowIndex) => {
        console.log('Showeing the Data I need: ', data);
        console.log('My indexes are: ', columnIndex, rowIndex);
        console.log('is it highlighted? ', isHiglighted);


        isHiglighted ? setIsHiglighted(false) : setIsHiglighted(true);
        console.log('is it highlighted? ', isHiglighted);
    }

    const highlightText = () => {
        console.log('Second test completed!!!');
    }

    const cellClassname = classNames( 'ins-logger-cell', {
        'cell__index-column': columnIndex == 0,
        'cell__data-column': columnIndex == 1, 
        'cell__stamp-column': columnIndex == 2 
    }, {
        'cell--highlighted': isHiglighted
    });

    const cellSpanClassname = classNames({
        'cell__index-span': columnIndex == 0,
        'cell__data-span': columnIndex == 1,
        'cell__stamp-span': columnIndex == 2  
    });

        
    // useEffect(() => {
    //     console.log('Trying to see if this effectcssdfas');
    //     // lookForItemRow(searchedInput);
    // }, []);



    return(
        <div style={style} 
            className={cellClassname}
            onClick={() => handleHighlightRow(columnIndex, rowIndex)}>
            <span 
                className={cellSpanClassname}
                onClick={highlightText}>
                {getData(columnIndex, rowIndex)}
            </span>
        </div>
    )
});


export default LoggerRow;