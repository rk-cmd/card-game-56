import React from 'react'
import styled from 'styled-components'
import { moveToHomepage } from '../../App.scripts'
import { commandCalls } from '../Content/Misc/Timestamp.scripts'

const ConfirmationPopup = ({states}) => {

    const popupClick = (e) => {

        // debugger;
        switch(e.target.id) {

            case 'noButtonConfirmation' :   
                                            break;
            case 'yesButtonConfirmation':   
                                            let text = document.getElementById('confirmationMessage').innerText;

                                            if ( text.indexOf('Are you sure you want to kick out') == 0) {
                                                console.log('commandCalls', ["KickOutPlayer"] );
                                                commandCalls( ["KickOutPlayer"], states);
                                            
                                            }


                                            else {
                                                switch ( document.getElementById('confirmationMessage').innerText ) {
                                                    
                                                    case 'Are you sure you want to leave the game?'     :
                                                                                                            // leaveGameHandler(states);
                                                                                                            console.log('commandCalls', ["PlayerLeaveMatch"], states);
                                                                                                            commandCalls( ["PlayerLeaveMatch"], states);                                                                                                        
                                                                                                            break;
                                                    case 'Are you sure you want to delete the match?'   :
                                                                                                            console.log('commandCalls', ["DeleteMatch"]);
                                                                                                            commandCalls( ["DeleteMatch"], states);
                                                                                                            break;
                                                    case 'Are you sure you want to reset the match?'    :
                                                                                                            console.log('commandCalls', ["ResetMatch", "GetMatchState"]);
                                                                                                            commandCalls( ["ResetMatch", "GetMatchState"], states);
                                                                                                            // setTimeout(() =>
                                                                                                            //     states.setProcessCommandValues(values => ({
                                                                                                            //         ...values,
                                                                                                            //         MatchIDTS: Math.random()
                                                                                                            //     })), 2.5 * 1000);
                                                                                                            break;                                                

                                                    default:
                                                }
                                            }
                                            break;
            case 'okButtonConfirmation' :   
                                            break;
            default:
        }

        document.getElementById('gameDetailsWrapper').style.opacity = '1';
        document.getElementById('popupConfirmation').style.display = 'none';
        document.getElementById('container').style.opacity = '1';  

    }

    return (
        <ConfirmationContainer id="popupConfirmation">
            <PopupMessage id="confirmationMessage" >placeholder</PopupMessage>
            <PopupAction>
                <PopupButton id="noButtonConfirmation" onClick={(e) => popupClick(e)} left='5%' bg='#808080' color='white' >No</PopupButton>
                <PopupButton id="okButtonConfirmation" onClick={(e) => popupClick(e)} left='37.5%' bg='#303030' color='white' >OK</PopupButton>
                <PopupButton id="yesButtonConfirmation" onClick={(e) => popupClick(e)} left='45%' bg='#303030' color='white' >Yes</PopupButton>
            </PopupAction>
        </ConfirmationContainer>
    )
}

const ConfirmationContainer = styled.div`
    height: 35%;
    width: 45%;
    background-color: lightgray;
    position: absolute;
    top: 32.5%;
    left: 25%;
    display: none;

    font-weight: 600;
    font-size: 18px;
    z-index: 3;
`

const PopupMessage = styled.div`
    height: 55%;
    width: 100%;
    // background-color: blue;
    display: flex;
    justify-content: center;
    align-items: center
`

const PopupAction = styled.div`
    height: 45%;
    width: 100%;
    // background-color: red;
    display: flex;
`

const PopupButton = styled.div`
    height: 60%;
    width: 25%;
    background-color: ${props => props.bg};
    color: ${props => props.color};
    // float: ${props => props.float};
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 16px;

    position: relative;
    top: 20%;
    left: ${props => props.left};
    cursor: pointer;
`

export default ConfirmationPopup
