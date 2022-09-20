import React from 'react'
import styled from 'styled-components'

import {Navigation, NavBarButton, NavBarLogo, NavBarText, NavBarMatchDetails, NavBarIcon,NavBarLeaveGame, NavBarInfoIcon} from './NavBar/NavBar.style'
import {sideNavOpenClose} from './NavBar/NavBar.scripts'
import { moveToHomepage } from '../App.scripts'
import { commandCalls } from './Content/Misc/Timestamp.scripts'

const NavBar = ({theme, states, handlers}) => {


    const leaveButtonClick = () => {

        document.getElementById('confirmationMessage').innerHTML = 'Are you sure you want to leave the game?';
        document.getElementById('noButtonConfirmation').style.display = 'flex'; 
        document.getElementById('yesButtonConfirmation').style.display = 'flex'; 
        document.getElementById('okButtonConfirmation').style.display = 'none'; 
        
        document.getElementById('popupConfirmation').style.display = 'block';
        document.getElementById('container').style.opacity = '0.5';  

        // handlers.leaveGameHandler(states);

    }

    const infoIconHandler = () => {

        let arrDisableButtons = Array.from(document.getElementsByClassName('gameDetailsTableButton'));

        if ( states.MatchState.MatchAdmin == 'Y' ) {
            
            // below code finds which one is admin's chair
            let adminChair;

            for ( let i=1 ; i<=Object.keys(states.MatchState.Chairs).length ; i++ ) {

                if ( states.MatchState.Chairs[i] !== null ) {
            
                    if ( states.MatchState.Chairs[i].MatchAdmin == 'Y' ) 
                        adminChair = states.MatchState.Chairs[i].ChairNo;
            
                }

            }

            arrDisableButtons.forEach(item => {
                item.style.removeProperty('pointer-events');
                item.style.backgroundColor = 'black';

                //below code replaces buttons on popup
                if ( item.parentNode.parentNode.childNodes[1].innerText == 'Free')
                    item.innerText = 'Free';
                else {
                    // debugger;   

                    if ( item.parentNode.parentNode.firstChild.innerText == adminChair)
                        item.innerText = 'In Game';
                    else
                        item.innerText = 'Kick';
                }

                // debugger;
            });
        
        }
        else {

            arrDisableButtons.forEach(item => {
                item.style.pointerEvents = 'none';
                item.style.backgroundColor = '#C0C0C0';

                if ( item.parentNode.parentNode.childNodes[1].innerText == 'Free')
                    item.innerText = 'Free';
                else    
                    item.innerText = 'In Game';

            });

        }

        document.getElementById('gameDetails').style.display = "block";
        document.getElementById('container').style.opacity = '0.5';

    }

    const refreshIconHandler = () => {

        console.log("commandCalls", ["GetMatchState"]);
        commandCalls( ["GetMatchState"], states);

    }

    return (
        <Navigation background={theme.NavBarBackground} >
            <NavBarButton id="navBarButton" onClick={() => sideNavOpenClose(theme.NavBarButtonBackgroundSelected)}>&#9776;</NavBarButton>
            <NavBarLogo  onClick={() => moveToHomepage(states)} ></NavBarLogo>
            <NavBarText id="navBarText" fontColor={theme.NavBarFontColor} >Card Game Online</NavBarText>

            {/* <NavBarInfoIcon id="navBarInfoIcon" onClick={() => infoIconHandler()}/> */}
            {/* <NavBarLeaveGame id="navBarLeaveGame" onClick={() => leaveButtonClick()} /> */}

            <NavBarIcon id="navBarRefresh" onClick={() => refreshIconHandler()} bg={'others/refresh-solid.svg'}/>
            <NavBarIcon id="navBarInfoIcon" onClick={() => infoIconHandler()} bg={'others/gear-solid.svg'}/>
            <NavBarIcon id="navBarLeaveGame" onClick={() => leaveButtonClick()} bg={'others/leave-solid.svg'}/>

            <NavBarMatchDetails id="navBarMatchDetails" ></NavBarMatchDetails>
        </Navigation>
    )
}

export default NavBar
