import React, {useState, useEffect} from 'react';
import { Toolbar , ToolbarItem, ToolbarContent } from '@patternfly/react-core';
import { Button, ButtonVariant, InputGroup, TextInput } from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons';
import { FaAngleDown} from '@patternfly/react-icons';
import './styles/loggerToolbar.styles.scss';
// import "@patternfly/react-core/dist/styles/base.css";
import "@patternfly/patternfly/patternfly.css";


const LoggerToolbar = (props) => {
    const {setSearchedInput} = props;
    let searchInput = '';

    const handleInputText = (input) => {
        setSearchedInput(input);
    }

    const handleSubmit = () => {
        
    }

    const handleChange = () => {
        console.log(searchInput);
    }

    
    return(
        <> 
            <div className='ins-logger-toolbar'>
                    {/* <input 
                        type='text' 
                        value={searchInput} 
                        onChange={handleChange} 
                        className='toolbar__search'    
                        placeholder='Search...' 
                    />
                    <Button
                        variant={ButtonVariant.control}
                        onClick={handleSubmit}
                        className='toolbar__search-btn'
                    /> */}
                    <i className='far fa-angle-down'></i>
            </div>
        </>
    );

    // return(
    //     <div className='ins-logger-toolbar'>
    //         <TextInput className="toolbar__search" placeholder='Search...' />
    //     </div>
    // );


    // const items =
    //     <>
    //         <ToolbarItem className='ins-logger-toolbar__header'>
    //             <InputGroup>
    //                 <TextInput className='toolbar--text-input' name='textInput1' id='textInput1' type='search' arial-label='search-input-label' placeholder='Search...'/>
    //                 <Button variant='control' aria-label="search button for search input">
    //                     <SearchIcon />
    //                 </Button>
    //             </InputGroup>
    //         </ToolbarItem>
    //     </>
    // ;

    // return <Toolbar id='toolbar' className='ins-logger-toolbar'><ToolbarContent>{items}</ToolbarContent></Toolbar>
}


export default LoggerToolbar;