import React, {useState, useEffect} from 'react';
import { AngleLeftIcon, AngleRightIcon, AngleDownIcon, AngleUpIcon, AngleDoubleDownIcon, AngleDoubleUpIcon } from '@patternfly/react-icons';
import classNames from 'classnames';
import './styles/loggerToolbar.styles.scss';
// import "@patternfly/react-core/dist/styles/base.css";
import "@patternfly/patternfly/patternfly.css";


const LoggerToolbar = ({searchedWordIndexes, itemCount, scrollToRow, rowInFocus, setRowInFocus}) => {
    // const []
    let searchInput = '';


    const handlePageDown = () => {
        scrollToRow(itemCount);
    }

    const handlePageUp = () => {
        scrollToRow(0);
    }

    const handleSkipUp = () => {

    }

    const handleSkipDown = () => {

    }

    const handleNextSearchItem = () => {
        let oldIndex = searchedWordIndexes.indexOf(rowInFocus);

        if(oldIndex >= searchedWordIndexes.length-1)
            return null;
        
        setRowInFocus(searchedWordIndexes[++oldIndex]);        
    }

    const handlePrevSearchItem = () => {
        let oldIndex = searchedWordIndexes.indexOf(rowInFocus);

        if(oldIndex <= 0)
            return null;

        setRowInFocus(searchedWordIndexes[--oldIndex]);
    }


    const renderSearchButtons = () => {
        if(searchedWordIndexes.length >= 2) {
            return(
                <>
                    {/* <span className='toolbar__label toolbar--left-hand'>Searching: {`${searchInput}`} </span> */}
                    <AngleLeftIcon className='toolbar__icons toolbar--left-hand' id='lookUp'  onClick={handlePrevSearchItem}/>
                    <AngleRightIcon className='toolbar__icons toolbar--left-hand' id='lookDown' onClick={handleNextSearchItem}/>
                </>
            );
        }
    }

    // The span needs to appear and dissapear depending on whether the logger includes a searchbar or not
    // The lookUp/lookDown arrows need to be conditionally rendered depending on whether logger includes a searchbar or not
    return(
        <> 
            <div className='ins-logger-toolbar'>
                    {renderSearchButtons()}
                    <AngleDoubleUpIcon className='toolbar__icons toolbar--right-hand' id='pageUp' onClick={handlePageUp}/>
                    <AngleDoubleDownIcon className='toolbar__icons toolbar--right-hand' id='pageDown' onClick={handlePageDown}/>
                    <AngleUpIcon className='toolbar__icons toolbar--right-hand' id='skipUp'/>
                    <AngleDownIcon className='toolbar__icons toolbar--right-hand' id='skipDown'/>
            </div>
        </>
    );

}


export default LoggerToolbar;