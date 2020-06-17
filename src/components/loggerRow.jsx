import React, {useEffect, memo} from 'react';


const LoggerRow = memo(({index, style, data}) => {
    const  {parsedData, searchedInput, loggerRef} = data;

    console.log('This is our ref obj: ', loggerRef);
    console.log('This is our searched row:', searchedInput);

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