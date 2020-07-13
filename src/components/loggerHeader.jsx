import React, {useState} from 'react';
import {Button, ButtonVariant, TextInput} from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons'
import './styles/loggerHeader.styles.scss';



const LoggerHeader = ({setSearchedInput, searchForKeyword}) => {
    const [searchedInput, setUserInput] = useState('')
    let value = searchedInput;

    const handleChange = (value) => {
        setUserInput(value);
    }

    const handleSubmit = () => {
        setSearchedInput(searchedInput);
        console.log('This is now my searched input: ', searchedInput)
        searchForKeyword();
        
    }

    return (
        <>
            <TextInput 
                type='text' 
                value={value} 
                onChange={handleChange} 
                className='ins-logger-header__search'    
            />
            <Button
                onClick={handleSubmit}
                className='ins-header__btn'
                variant='control'
            >
                <SearchIcon />
            </Button>
            {/* <span>Pinned Rows: </span> */}
        </>
    )
}

export default LoggerHeader;