import React, {useState, useEffect} from 'react';
import { Toolbar , ToolbarItem, ToolbarContent } from '@patternfly/react-core';
import { Button, ButtonVariant, InputGroup, TextInput } from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons';
import { AngleLeftIcon, AngleRightIcon, AngleDownIcon, AngleUpIcon, AngleDoubleDownIcon, AngleDoubleUpIcon } from '@patternfly/react-icons';
import './styles/loggerToolbar.styles.scss';
// import "@patternfly/react-core/dist/styles/base.css";
import "@patternfly/patternfly/patternfly.css";


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
        <> 
            <div className='ins-logger-toolbar'>
                    {/* <span className='toolbar__label toolbar--left-hand'>Instances of: {`${searchInput}`}</span> */}
                    <AngleLeftIcon className='toolbar__icons toolbar--left-hand' id='lookUp'/>
                    <AngleRightIcon className='toolbar__icons toolbar--left-hand' id='lookDown'/>
                    <AngleDoubleUpIcon className='toolbar__icons toolbar--right-hand' id='pageUp' onClick={handlePageUp}/>
                    <AngleDoubleDownIcon className='toolbar__icons toolbar--right-hand' id='pageDown' onClick={handlePageDown}/>
                    <AngleUpIcon className='toolbar__icons toolbar--right-hand' id='skipUp'/>
                    <AngleDownIcon className='toolbar__icons toolbar--right-hand' id='skipDown'/>
            </div>
        </>
    );

}


export default LoggerToolbar;