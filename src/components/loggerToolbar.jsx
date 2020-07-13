import React, {useState, useEffect} from 'react';
import { Toolbar , ToolbarItem, ToolbarContent, Level, LevelItem } from '@patternfly/react-core';
import { Button, ButtonVariant, InputGroup, TextInput } from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons';
import { AngleLeftIcon, AngleRightIcon, AngleDownIcon, AngleUpIcon, AngleDoubleDownIcon, AngleDoubleUpIcon } from '@patternfly/react-icons';
import './styles/loggerToolbar.styles.scss';


const LoggerToolbar = ({searchedWordIndexes, itemCount, itemsPerPage, loggerRef, isSearching}) => {
    let searchInput = '';

    const getToolbarSearchItems = () => {
        // This function will determine whether or not we will be displaying the inputs for moving through the iterable search indexes (for inputted keywords)
    }

    const handlePageDown = () => {
        console.log('Moving down! --- Heres my loggerRef: ', loggerRef);
        console.log('Heres my item count: ', itemCount);
        loggerRef.current.scrollToItem({
            columnIndex:1,
            rowIndex: itemCount
        });
    }

    const handlePageUp = () => {
        loggerRef.current.scrollToItem({
            columnIndex:1,
            rowIndex:0
        })
    }

    const handleSkipUp = () => {

    }

    const handleSkipDown = () => {

    }
    // The span needs to appear and dissapear depending on whether the logger includes a searchbar or not
    // The lookUp/lookDown arrows need to be conditionally rendered depending on whether logger includes a searchbar or not

    return(
        <Level className='logger__toolbar'>
            <LevelItem>{/* <span className='toolbar__label toolbar--left-hand'>Instances of: {`${searchInput}`}</span> */}
                <Button variant='plain' aria-label='Look up' className='toolbar__icons'><AngleLeftIcon id='lookUp'/></Button>
                <Button variant='plain' aria-label='Look down' className='toolbar__icons'><AngleRightIcon id='lookDown'/></Button>
            </LevelItem>
            <LevelItem>
                <Button variant='plain' aria-label='Skip up' className='toolbar__icons'><AngleUpIcon id='skipUp'/></Button>
                <Button variant='plain' aria-label='Skip down' className='toolbar__icons'><AngleDownIcon id='skipDown'/></Button>
                <Button variant='plain' aria-label='Page up' className='toolbar__icons' onClick={handlePageUp}><AngleDoubleUpIcon id='pageUp'/></Button>
                <Button variant='plain' aria-label='Page down' className='toolbar__icons' onClick={handlePageDown}><AngleDoubleDownIcon id='skipDown'/></Button>
            </LevelItem>
        </Level>
    );

}


export default LoggerToolbar;