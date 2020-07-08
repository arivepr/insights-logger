import React, {useState, useEffect} from 'react';
import { Toolbar , ToolbarItem, ToolbarContent } from '@patternfly/react-core';
import { Button, ButtonVariant, InputGroup, TextInput } from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons';
import { AngleLeftIcon, AngleRightIcon, AngleDoubleDownIcon, AngleDoubleUpIcon } from '@patternfly/react-icons';
import './styles/loggerToolbar.styles.scss';
// import "@patternfly/react-core/dist/styles/base.css";
import "@patternfly/patternfly/patternfly.css";


const LoggerToolbar = (props) => {
    const {setSearchedInput} = props;
    let searchInput = '';

    const handleInputText = (input) => {
        setSearchedInput(input);
    }

    const handleChange = () => {
        console.log(searchInput);
    }
    
    const getToolbarSearchItems = () => {
        // This function will determine whether or not we will be displaying the inputs for moving through the iterable search indexes (for inputted keywords)
    }

    // The span needs to appear and dissapear depending on whether the logger includes a searchbar or not


    return(
        <> 
            <div className='ins-logger-toolbar'>
                    {/* <div className='toolbar__action-buttons'> */} 
                        <span className='toolbar__label toolbar--left-hand'></span>
                        <AngleLeftIcon className='toolbar__icons toolbar--left-hand' id='lookUp'/>
                        <AngleRightIcon className='toolbar__icons toolbar--left-hand' id='lookDown'/>
                        <AngleDoubleUpIcon className='toolbar__icons toolbar--right-hand' id='pageUp'/>
                        <AngleDoubleDownIcon className='toolbar__icons toolbar--right-hand' id='pageDown'/>
                    {/* </div> */}
            </div>
        </>
    );

}


export default LoggerToolbar;