import React from 'react'
import styled from 'styled-components'
import OvalTable from './OvalTable/OvalTable'
import GameScreenCards from './GameScreenCards/GameScreenCards'
import { keyframes } from 'styled-components'
import './GameScreen.css'

import GameSummary from './GameSummary/GameSummary'

import { useState } from 'react'
import { commandCalls, processCommandJsonGenerator } from '../../Misc/Timestamp.scripts'
import { checkPlaceBid, checkBidTitle } from '../../../../App.scripts'
import { arrangeGameIcons } from '../../../NavBar/NavBar.scripts'
// import {getTimestamp} from '../../Misc/Timestamp.scripts'

// var chairDetails = [];
var interval;
var currentTimestamp;
var newTimestamp;

const GameScreen = ({ states, handlers }) => {

    const gameScreenDetailsArrowHandler = () => {

        console.log('arrow click');

        // keeps flipping the arrow
        document.getElementById('gameScreenDetailsArrowImage').classList.toggle("rotateImage");

        if ( document.getElementById('gameScreenDetails').style.width == '0px' ) {
            
            var containerWidth = document.getElementById("container").clientWidth;

            switch ( true ) {

                case ( containerWidth >= 721 )  :
                                                    document.getElementById('gameScreenDetails').style.width = '275px';
                                                    break;
                case (  containerWidth >= 481 && containerWidth <= 720 )  :
                                                    document.getElementById('gameScreenDetails').style.width = '250px';
                                                    break;
                case ( containerWidth <= 480 )  :
                                                    document.getElementById('gameScreenDetails').style.width = '225px';
                                                    break;
                default :

            }

        } 
        else
            document.getElementById('gameScreenDetails').style.width = '0px';


        document.getElementById('gameScreenDetailsArrow').style.right = document.getElementById('gameScreenDetails').style.width;

    }

    React.useEffect(() => {

        if ( states.CurrentPage == 'gameScreen') { 
            
            // document.getElementById('navBarMatchDetails').innerText = document.getElementById('gameDetailsTitle').innerText + " (Game 0 of 12)";
            // document.getElementById('navBarMatchDetails').innerText = "Table #" + states.MatchScoreboard.TableNo + " (" + states.MatchScoreboard.MatchGamesPoints + ")";

            if ( (document.getElementById("container").clientWidth >= 721) )
                document.getElementById('navBarMatchDetails').style.display = 'block';
            else 
                document.getElementById('navBarMatchDetails').style.display = 'none';
            
            // document.getElementById('navBarLeaveGame').style.right = ( parseInt(getComputedStyle(document.getElementById('navBarMatchDetails')).width) + 100 ).toString() + 'px';
            document.getElementById('navBarLeaveGame').style.display = 'block';

            // document.getElementById('navBarInfoIcon').style.right = ( parseInt(getComputedStyle(document.getElementById('navBarLeaveGame')).right) + 75 ).toString() + 'px';
            document.getElementById('navBarInfoIcon').style.display = 'block';

            // document.getElementById('navBarRefresh').style.right = ( parseInt(getComputedStyle(document.getElementById('navBarInfoIcon')).right) + 75 ).toString() + 'px';
            document.getElementById('navBarRefresh').style.display = 'block';

            arrangeGameIcons();


            // Array.from(document.getElementsByClassName('gameChair')).forEach(item => {
            
            //     if( item.getAttribute('data-trickstarter') == 'Y')
            //         trickStarterChair = item;

            // });
            checkBidTitle();
            checkPlaceBid();

        }
        

        //works like componentWillUnmount
        return function unMount() {
            // clearInterval(interval);
            // document.getElementById('navBarMatchDetails').innerText = '';

            // if ( states.CurrentPage !== 'gameScreen' ) {
            //     document.getElementById('navBarMatchDetails').style.display = 'none';
            //     document.getElementById('navBarLeaveGame').style.display = 'none';
            //     document.getElementById('navBarInfoIcon').style.display = 'none';
            //     document.getElementById('navBarRefresh').style.display = 'none';
            // }

        }


    });

    React.useEffect(() => {

        // removing at start to make sure all are in sync
        Array.from(document.getElementsByClassName('gameChair')).forEach(item => item.classList.remove('blinking'));
        
        // timeout to make sure everthing has been rendered
        setTimeout(() => {
            
            Array.from(document.getElementsByClassName('gameChair')).forEach(item => {

                if( item.getAttribute('data-playerturn') == 'Y') 
                    // add class blinker
                    item.classList.add('blinking');

            });

        }, 100);

    }, [states.MatchState])

    React.useEffect(() => {

        // if ( states.CurrentPage == 'gameScreen' ) {
            document.getElementById('navBarMatchDetails').innerText = "Table #" + states.MatchScoreboard.TableNo + " (" + states.MatchScoreboard.MatchGamesPoints + ")";
            
            arrangeGameIcons();

            // document.getElementById('navBarLeaveGame').style.right = ( parseInt(getComputedStyle(document.getElementById('navBarMatchDetails')).width) + 100 ).toString() + 'px';
            // document.getElementById('navBarInfoIcon').style.right = ( parseInt(getComputedStyle(document.getElementById('navBarLeaveGame')).right) + 75 ).toString() + 'px';
            // document.getElementById('navBarRefresh').style.right = ( parseInt(getComputedStyle(document.getElementById('navBarInfoIcon')).right) + 75 ).toString() + 'px';

        // }
    }, [states.MatchScoreboard])

    return (
        <GameScreenContainer id="gameScreenContainer" >

            {/* GameArea code start */}

            <GameScreenMain>

                <GameScreenTable id="gameScreenTable">

                <OvalTable id="ovalTable" states={states} />

                <ChairUser id="userChair" className="gameChair" data-playerturn={states.MatchState.Chairs[1].PlayerTurn} bg={(parseInt(states.MatchState.Chairs[1].ChairNo) % 2 ) == 0 ? '#ffff99' : '#ffc299'}  >
                   
                    {(states.MatchState.Chairs[1].TrickStarter == 'Y') ? <TrickStarterFlag /> : <></>}        
                    
                    <ChairNum>{states.MatchState.Chairs[1].ChairNo }</ChairNum>
                    <ChairName>
                        {states.MatchState.Chairs[1].PlayerName === "" ? "Free" : states.MatchState.Chairs[1].PlayerName }
                    </ChairName>

                    <LastBid className="lastBid">
                        <LastBidPart>{states.MatchState.Chairs[1].LastBid !== undefined ? states.MatchState.Chairs[1].LastBid[1] : ""}</LastBidPart>
                        <LastBidPart>{states.MatchState.Chairs[1].LastBid !== undefined ? states.MatchState.Chairs[1].LastBid[2] : ""}</LastBidPart>
                        <LastBidPart>{states.MatchState.Chairs[1].LastBid !== undefined ? states.MatchState.Chairs[1].LastBid[3] : ""}</LastBidPart>
                    </LastBid>

                </ChairUser>

                
                {   
                    Object.keys(states.GameChairs).map(item => (
                    // GameChairs.map(item => (
                                                                    
                        <ChairOthers className="othersChair gameChair" key={Object.keys(states.GameChairs)[item]} bg={(parseInt(states.GameChairs[item].Details.ChairNo) % 2 ) == 0 ? '#ffff99' : '#ffc299'} data-playerturn={states.GameChairs[item].Details.PlayerTurn} left={states.GameChairs[item].Location.left} top={states.GameChairs[item].Location.top} >
                        
                            {(states.GameChairs[item].Details.TrickStarter == 'Y') ? <TrickStarterFlag /> : <></>}  
                        
                            <ChairNum>{states.GameChairs[item].Details.ChairNo}</ChairNum>
                            <ChairName>
                                {states.GameChairs[item].Details.PlayerName === "" ? "Free" : states.GameChairs[item].Details.PlayerName }
                            </ChairName>

                            <LastBid className="lastBid">
                                <LastBidPart>{states.GameChairs[item].Details.LastBid !== "" ? states.GameChairs[item].Details.LastBid[1] : ""}</LastBidPart>
                                <LastBidPart>{states.GameChairs[item].Details.LastBid !== "" ? states.GameChairs[item].Details.LastBid[2] : ""}</LastBidPart>
                                <LastBidPart>{states.GameChairs[item].Details.LastBid !== "" ? states.GameChairs[item].Details.LastBid[3] : ""}</LastBidPart>
                            </LastBid>

                            {/* <ChairKick className="kickChair" onClick={e => handlers.kickOutGameHandler( e, states)}/> */}
                        </ChairOthers>                        

                    ))
                }
                
                </GameScreenTable>

                <GameScreenCards states={states} />

            </GameScreenMain>
            
            {/* Side Boxes code start */}

            <GameScreenDetails id="gameScreenDetails">
                <GameScreenBox1 id="test1">
                    {/* <GameScreenBoxHeading>Table #36 Summary (Game 0 of 12)</GameScreenBoxHeading> */}
                    <GameScreenBox1Line bg={'#B0B0B0'}>
                        <GameScreenBox1LineItem >Team&nbsp;A</GameScreenBox1LineItem>
                        <GameScreenBox1LineItem >Team&nbsp;B</GameScreenBox1LineItem>
                    </GameScreenBox1Line>
                    <GameScreenBox1Line bg={'#E0E0E0'} >
                        <GameScreenBox1LineItem >{states.MatchScoreboard.TeamAMatchPoints}</GameScreenBox1LineItem>
                        <GameScreenBox1LineItem >{states.MatchScoreboard.TeamBMatchPoints}</GameScreenBox1LineItem>
                    </GameScreenBox1Line>
                </GameScreenBox1> 

                <GameSummary states={states} />



                {/* <GameScreenBox2 id="test2">
                    <GameScreenBoxHeading>Game Summary</GameScreenBoxHeading>
                    <GameScreenBoxContent>
                        <GameScreenBox2Line bg={'#B0B0B0'} >Game started</GameScreenBox2Line>
                        <GameScreenBox2Line bg={'#E0E0E0'} >Move 1 complete</GameScreenBox2Line>
                        <GameScreenBox2Line bg={'#B0B0B0'} >Player 2 next move</GameScreenBox2Line>
                        <GameScreenBox2Line bg={'#E0E0E0'} >Move 2 complete</GameScreenBox2Line>
                        <GameScreenBox2Line bg={'#B0B0B0'} >Player 3 next move</GameScreenBox2Line>
                        <GameScreenBox2Line bg={'#E0E0E0'} >Move 3 complete</GameScreenBox2Line>
                        <GameScreenBox2Line bg={'#B0B0B0'} >Move 4 complete</GameScreenBox2Line>
                    </GameScreenBoxContent>
                </GameScreenBox2>  */}
                
                {/* <GameScreenBox2>
                    <GameScreenBoxHeading>Chat</GameScreenBoxHeading>
                    
                    <ChatboxInput>
                        <ChatboxIcon bg={'/others/grin-solid.svg'} />
                        <ChatboxLine>
                            <ChatInput />
                        </ChatboxLine>
                        <ChatboxIcon bg={'/others/send-solid.svg'} />
                    </ChatboxInput>

                </GameScreenBox2>  */}
            </GameScreenDetails>

            <GameScreenDetailsArrow id="gameScreenDetailsArrow" onClick={() => gameScreenDetailsArrowHandler()} >
                <GameScreenDetailsArrowImage id="gameScreenDetailsArrowImage" />
            </GameScreenDetailsArrow>  
        
        </GameScreenContainer>
    )
}

const GameScreenContainer = styled.div`
    height: 100%;
    width: 100%;
    // display: flex;
    display:none;
    flex-wrap: wrap;
    // position: relative;
    z-index: 0;
`

const GameScreenMain = styled.div`
    // background-color: red;
    height: 100%;
    width: 100%;
    display: flexbox;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position: relative;
`

const GameScreenTable = styled.div`
    height: 75%;
    width: 100%;
    position: relative;
    display: flexbox;
    justify-content: center;
    align-items: center;
`

const TrickStarterFlag = styled.div`
    height: 40px;
    width: 40px;
    // position: absolute;
    /* background-color: gray; */
    background-image: url(others/flag-solid.svg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 70%;
    // top: calc( 45% - 40px );
    // left: 82.80%;
`

// const OvalTable = styled.div`
//     width: 60%;
//     height: 60%;
//     background-color: green;
//     border: 15px solid darkred;
//     border-radius: 200px;
// `

// const GameScreenCards = styled.div`
//     width: 100%;
//     height: 30%;
//     // background-color: red;
// `

const GameScreenDetails = styled.div`
    background-color: #95C8D8;
    // height: 100%;
    // width: 25%;
    display: flexbox;
    flex-wrap: wrap;
    // align-items: center;
    justify-content: center;

    @media (max-width: 480px) {
        height: calc( 80vh - 60px );
    }
    @media (min-width: 481px) and (max-width: 720px) {
        height: calc( 80vh - 60px );
    }
    @media (min-width: 721px) {
        height: 60%;
    }

    // height: 60%;
    width: 275px;
    position: fixed;
    right: 0px;
    transition: 0.5s;
    z-index: 1;
`

// const GameScreenBoxHeading = styled.div`
//     background-color: black;
//     color: white;
//     height: 50px;
//     width: 100%;
//     display: flexbox;
//     justify-content: center;
//     align-items: center;
//     font-size: 14px;
//     font-weight: 600;
// `

// const GameScreenBoxContent = styled.div`
//     overflow-y: auto;
//     height: calc( 100% - 50px );
//     width: 100%;
// `

const GameScreenBox1 = styled.div`
    background-color: #E0E0E0;
    height: 20%;
    width: 90%;
    // overflow-y: auto;
    max-height: 120px;

    position: relative;
    top: 5%;
`

const GameScreenBox1Line = styled.div`
    background-color: ${props => props.bg};
    width: 100%;
    // height: calc( (100% - 50px) / 2 );
    height: 50%;
    display: flexbox;
    flex-wrap: wrap;
`

const GameScreenBox1LineItem = styled.div`
    width: 50%;
    height: 100%;
    display: flexbox;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
`

const GameScreenDetailsArrow = styled.div`
    width: 35px;
    height: 35px;
    // top: calc( 30% + 17.5px );
    right: 0px;

    @media (max-width: 480px) {
        top: calc( (80vh - 25px) / 2 );
        // right: 225px;
    }
    @media (min-width: 481px) and (max-width: 720px) {
        top: calc( (80vh - 25px) / 2 );
        // right: 250px;
    }
    @media (min-width: 721px) {
        top: calc( 30% + 17.5px );
        // right: 275px;
    }


    background-color: #7CB9E8;
    cursor: pointer;

    // transform: rotate(180deg);
    position: absolute;
    // background-image: url(others/angle-left-solid.svg);
    // background-repeat: no-repeat;
    // background-position: center;
    // background-size: 50%;
    border-radius: 50% 0% 0% 50%;
`

const GameScreenDetailsArrowImage = styled.div`
    width: 100%;
    height: 100%;

    // transform: rotate(180deg);    
    background-image: url(others/angle-left-solid.svg);
    background-repeat: no-repeat;
    // background-position: center;
    background-position-y: center;
    background-position-x: 20%;
    background-size: 50%;

    transition: 0.5s;
`

// const GameScreenBox2 = styled.div`
//     background-color: #E0E0E0;
//     height: 65%;
//     width: 90%;
//     // overflow-y: auto;
//     max-height: 225px;
//     position: relative;
//     // top: 5%;
// `

// const GameScreenBox2Line = styled.div`
//     background-color: ${props => props.bg};
//     width: calc( 100% - 10px );
//     height: calc( 100% / 6 );
//     font-size: 14px;
//     font-weight: 600;
//     display: flex;
//     align-items: center;
//     padding-left: 10px;
// `

const ChatboxInput = styled.div`
    height: calc( 100% / 6 );
    width: 100%;
    display: flexbox;
    flex-wrap: wrap;
    background-color: white;
    position: absolute;
    bottom: 0;
`

const ChatboxIcon = styled.div`
    height: 100%;
    width: 15%;
    background: url(${props => props.bg});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 60%;
`

const ChatboxLine = styled.div`
    height: 100%;
    width: 70%;
    // background-color: limegreen;
`

const ChatInput = styled.input`
    height: 100%;
    width: 100%;
    outline: none;
    box-sizing: border-box;
    border: 0px;
    padding: 5px;
`

const ChairUser = styled.div`
    height: 10%;
    width: 30%;
    background-color: ${props => props.bg};
    position: absolute;
    // bottom: calc( ( 15% - 15px ) / 2 );
    top: 87%;
    left: 35%;
    border-radius: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`

const ChairOthers = styled.div`
    height: 10%;
    width: 15%;
    background-color: ${props => props.bg};
    position: absolute;
    // top: calc( ( 15% - 15px ) / 2 );
    top: ${props => props.top};
    left: ${props => props.left};
    // right: ${props => props.right};
    border-radius: 20px;
    display: flexbox;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`

const ChairKick = styled.div`
    height: 25px;
    width: 25px;
    background-color: red;
    position: absolute;
    border-radius: 50%;

    right: 5%;
    background-image: url(others/kick-solid.svg);
    background-size: 60%;
    background-position: center;
    background-repeat: no-repeat;
}
`

// const ChairOthersBottom = styled.div`
//     height: 10%;
//     width: 15%;
//     background-color: ${props => props.bg};
//     position: absolute;
//     // bottom: calc( ( 15% - 15px ) / 2 );
//     top: ${props => props.top};
//     left: ${props => props.left};
//     // right: ${props => props.right};
//     border-radius: 20px;
//     display: flexbox;
//     flex-wrap: wrap;
//     justify-content: center;
//     align-items: center;
// `

const ChairNum = styled.div`
    display: flexbox;
    align-items: center;
    justify-content: center;
    height: 25px;
    width: 25px;
    font-size: 14px;
    font-weight: 600;
    border: 2px solid gray;
    border-radius: 50%;
    // margin-left: 5px;
`

const ChairName = styled.div`
    display: flexbox;
    align-items: center;
    // justify-content: center;
    padding-left: 5px;
    // height: 100%;
    height: 50%;
    width: auto;
    max-width: 50%;
    overflow-x: hidden;
    font-size: 14px;
    font-weight: 600;
`

const LastBid = styled.div`
    // background-color: red;
    height: 25px;
    width: 75px;
    display: flex;
    flex-wrap: wrap;
    margin-left: 5px;
    display: none;
`

const LastBidPart = styled.div`
    // background-color: yellow;
    height: 100%;
    width: 25px;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;

    // background-image: url(${props => props.bg});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 75%;

`

export default GameScreen
