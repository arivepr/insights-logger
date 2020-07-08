import React, {useState} from 'react';
import {Button, ButtonVariant, TextInput} from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons'
import "@patternfly/react-core/dist/styles/base.css";
import "@patternfly/patternfly/patternfly.css";
import './styles/loggerHeader.styles.scss';



const LoggerHeader = ({setSearchedInput}) => {
    const [userInput, setUserInput] = useState('')
    let value = userInput;

    const handleChange = (value) => {
        setUserInput(value);
    }

    const handleSubmit = () => {
        setSearchedInput(userInput);
        console.log('This is now my searched input: ', userInput)
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