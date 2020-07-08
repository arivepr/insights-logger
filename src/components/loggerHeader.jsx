import React, {useState} from 'react';
import {Button, ButtonVariant, TextInput} from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons'
import "@patternfly/react-core/dist/styles/base.css";
import "@patternfly/patternfly/patternfly.css";
import './styles/loggerHeader.styles.scss';



const LoggerHeader = ({setSearchedInput}) => {
    let searchInput = '';


    const handleChange = (input) => {
        searchInput+= input;
    }

    const handleSubmit = () => {
        setSearchedInput(searchInput);
        console.log('This is now my searched input: ', searchInput)
    }

    return (
        <>
            {/* <TextInput 
                type='text' 
                value={searchInput} 
                onChange={handleChange} 
                className='ins-logger-header__search'    
                placeholder='Search...' 
            /> */}
            <input 
                type='text' 
                value={searchInput} 
                onChange={handleChange} 
                className='ins-logger-header__search'    
                placeholder='Search...' 
                variant='control'
            />
            <Button
                onClick={handleSubmit}
                className='header__search-btn'
                variant='control'
            >
                <SearchIcon />
            </Button>
            {/* <span>Pinned Rows: </span> */}
        </>
    )
}

export default LoggerHeader;