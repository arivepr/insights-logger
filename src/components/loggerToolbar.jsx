import React, {useState, useEffect} from 'react';
import { Toolbar , ToolbarItem, ToolbarContent } from '@patternfly/react-core';
import { Button, ButtonVariant, InputGroup, TextInput } from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons';
import "@patternfly/react-core/dist/styles/base.css";


const LoggerToolbar = (props) => {
    const {setSearchedInput} = props;
    


    const items =
        <>
            <ToolbarItem>
                <InputGroup>
                    <TextInput name='textInput1' id='textInput1' type='search' arial-label='search-input-label' placeholder='Search...'/>
                    <Button variant='control' aria-label="search button for search input">
                        <SearchIcon />
                    </Button>
                </InputGroup>
            </ToolbarItem>
        </>
    ;

    return <Toolbar id='toolbar'><ToolbarContent>{items}</ToolbarContent></Toolbar>
}


export default LoggerToolbar;