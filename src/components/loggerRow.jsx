import React, {useEffect, memo} from 'react';
import {Flex, FlexItem, FlexItemProps} from '@patternfly/react-core';



const LoggerRow = memo(({index, style, data}) => {
    const  {parsedData, searchedInput, loggerRef} = data;

    const lookForItemRow = (searchedInput) => {
        console.log('looking for item row: ', searchedInput);
        const searchedIndex = parseInt(searchedInput);
        loggerRef.current.scrollToItem(searchedIndex);

        // searchedInput === "" ? loggerRef.current.scrollToItem(searchedIndex) : null; 
    }

    // lookForItemRow(searchedInput);
    
    // useEffect(() => {
    //     console.log('Trying to see if this effectcssdfas');
    //     // lookForItemRow(searchedInput);
    // }, []);

    return(
        <div style={style}>
            {index}:{"    "}{parsedData[index]}
        </div>
    )
});


export default LoggerRow;