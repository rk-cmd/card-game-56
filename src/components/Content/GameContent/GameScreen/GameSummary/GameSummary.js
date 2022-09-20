import React from 'react'
import styled from 'styled-components'

import { stringToSuit } from '../../../../../App.scripts'

const GameSummary = ({states}) => {


    React.useEffect(() => {

        
        // console.log(states.MatchScoreboard)
        // document.getElementById('navBarMatchDetails').innerText = "Table #" + states.MatchScoreboard.TableNo + " (" + states.MatchScoreboard.MatchGamesPoints + ")";

        if ( states.CurrentPage == 'gameScreen' ) {

            document.getElementById('gameToStart').style.display = 'none';
            document.getElementById('biddingInProgress').style.display = 'none';
            document.getElementById('gameInProgress').style.display = 'none';
            document.getElementById('gameCompleted').style.display = 'none';

            switch ( states.MatchScoreboard.GameStatus ) {

                case 'Game to start'        :
                                                document.getElementById('gameToStart').style.display = 'flex';
                                                break;
                case 'Bidding in progress'  :
                                                document.getElementById('biddingInProgress').style.display = 'flex';
                                                stringToSuit('biddingInProgressValue');
                                                break;
                case 'Game in progress'     :
                                                document.getElementById('gameInProgress').style.display = 'flex';
                                                stringToSuit('bidWonValueInProgress');
                                                break;
                case 'Game completed'       :   document.getElementById('gameCompleted').style.display = 'flex';
                                                stringToSuit('bidWonValueCompleted');
                                                break;
                default :

            }

            

        }

    }, [states.MatchScoreboard])

    React.useEffect(() => {

        // inside biddingInProgressValue, don't display a bidPart if it has no value code below

        Array.from(document.getElementsByClassName('bidInProgressValuePart')).forEach(item => (item.innerText == "" ? item.style.display='none' : item.style.display='flex'));



    })

    return (
        <GameScreenBox2 id="test2">
            <GameScreenBoxHeading>Game&nbsp;Summary</GameScreenBoxHeading>
            <GameScreenBoxContent>

                <GameToStart id="gameToStart">Game to start</GameToStart>

                <BiddingInProgress id="biddingInProgress">
                    <BiddingInProgressTitle>Bidding in progress</BiddingInProgressTitle>
                    <BiddingInProgressValueTitle bg={states.MatchScoreboard.CurrentHighestBidTeam == 'A' ? '#ffc299' : '#ffff99' }>
                        
                        <BiddingInProgressValueTitlePart>Highest Bid by : </BiddingInProgressValueTitlePart>
                        <BiddingInProgressValueTitlePart>{states.MatchScoreboard.CurrentHighestBidPlayer == undefined ? "" : states.MatchScoreboard.CurrentHighestBidPlayer}</BiddingInProgressValueTitlePart>
                        
                    </BiddingInProgressValueTitle>
                    <BiddingInProgressValue id="biddingInProgressValue" bg={states.MatchScoreboard.CurrentHighestBidTeam == 'A' ? '#ffc299' : '#ffff99' }>
                        {/* <BiddingInProgressPart>{states.MatchScoreboard.CurrentTrump == undefined ? "" : states.MatchScoreboard.CurrentTrump}</BiddingInProgressPart> */}
                        {/* <BiddingInProgressPart>{states.MatchScoreboard.CurrentHighestBidValue == undefined ? "" : states.MatchScoreboard.CurrentHighestBidValue}</BiddingInProgressPart> */}
                        <BiddingInProgressPart className="bidInProgressValuePart" >{states.MatchScoreboard.CurrentHighestBid == undefined ? "" : states.MatchScoreboard.CurrentHighestBid[1]}</BiddingInProgressPart>
                        <BiddingInProgressPart className="bidInProgressValuePart" >{states.MatchScoreboard.CurrentHighestBid == undefined ? "" : states.MatchScoreboard.CurrentHighestBid[2]}</BiddingInProgressPart>
                        <BiddingInProgressPart className="bidInProgressValuePart" >{states.MatchScoreboard.CurrentHighestBid == undefined ? "" : states.MatchScoreboard.CurrentHighestBid[3]}</BiddingInProgressPart>
                    </BiddingInProgressValue>
                </BiddingInProgress>

                <GameInProgress id="gameInProgress">
                    <GameTitle>Game in progress</GameTitle>
                    <BidWonDetails>
                        <BidWonDesc bg={states.MatchScoreboard.FinalBidWinningTeam == 'A' ? '#ffc299' : '#ffff99' }>Bid won by : {states.MatchScoreboard.FinalBidWinningPlayer == undefined ? "" : states.MatchScoreboard.FinalBidWinningPlayer}</BidWonDesc>
                        <BidWonValue id="bidWonValueInProgress"  bg={states.MatchScoreboard.FinalBidWinningTeam == 'A' ? '#ffc299' : '#ffff99' }>
                            <BidWonValuePart>{states.MatchScoreboard.FinalBidTrump == undefined ? "" : states.MatchScoreboard.FinalBidTrump}</BidWonValuePart>
                            <BidWonValuePart>{states.MatchScoreboard.FinalBidValue == undefined ? "" : states.MatchScoreboard.FinalBidValue}</BidWonValuePart>
                        </BidWonValue>
                    </BidWonDetails>
                    <GamePointsDetails>
                        <GamePointsPart left={"10%"} bg={"#ffc299"}>{states.MatchScoreboard.TeamAGamePoints == undefined ? "" : states.MatchScoreboard.TeamAGamePoints}</GamePointsPart>
                        <GamePointsPart left={"65%"} bg={"#ffff99"}>{states.MatchScoreboard.TeamBGamePoints == undefined ? "" : states.MatchScoreboard.TeamBGamePoints}</GamePointsPart>
                    </GamePointsDetails>
                    <RemainingPointsDetails>Remaining Points : {states.MatchScoreboard.RemainingPoints == undefined ? "" : states.MatchScoreboard.RemainingPoints}</RemainingPointsDetails>
                    <FirstDoubled bg={states.MatchScoreboard.FinalBidDoubledTeam == 'A' ? '#ffc299' : '#ffff99' }>First doubled player : {states.MatchScoreboard.FinalBidDoubledPlayer == undefined ? "" : states.MatchScoreboard.FinalBidDoubledPlayer}</FirstDoubled>
                    <FirstRedoubled bg={states.MatchScoreboard.FinalBidRedoubledTeam == 'A' ? '#ffc299' : '#ffff99' }>First re-doubled player : {states.MatchScoreboard.FinalBidRedoubledPlayer == undefined ? "" : states.MatchScoreboard.FinalBidRedoubledPlayer}</FirstRedoubled>
                </GameInProgress>

                <GameCompleted id="gameCompleted"> 
                    <GameTitle>Game completed</GameTitle>
                        <BidWonDetails>
                            <BidWonDesc  bg={states.MatchScoreboard.FinalBidWinningTeam == 'A' ? '#ffc299' : '#ffff99' }>Bid won by : Team {states.MatchScoreboard.FinalBidWinningTeam == undefined ? "" : states.MatchScoreboard.FinalBidWinningTeam}</BidWonDesc>
                            <BidWonValue id="bidWonValueCompleted" bg={states.MatchScoreboard.FinalBidWinningTeam == 'A' ? '#ffc299' : '#ffff99' }>
                                <BidWonValuePart>{states.MatchScoreboard.FinalBidValue == undefined ? "" : states.MatchScoreboard.FinalBidValue}</BidWonValuePart>
                            </BidWonValue>
                        </BidWonDetails>
                        <GamePointsDetails>
                            <GamePointsPart left={"10%"} bg={"#ffc299"}>{states.MatchScoreboard.TeamAGamePoints == undefined ? "" : states.MatchScoreboard.TeamAGamePoints}</GamePointsPart>
                            <GamePointsPart left={"65%"} bg={"#ffff99"}>{states.MatchScoreboard.TeamBGamePoints == undefined ? "" : states.MatchScoreboard.TeamBGamePoints}</GamePointsPart>
                        </GamePointsDetails>
                        <MatchPointsDetails bg={states.MatchScoreboard.MatchPointsAddedToTeam == 'A' ? '#ffc299' : '#ffff99' }>Match Points Added : {states.MatchScoreboard.MatchPointsAdded == undefined ? "" : states.MatchScoreboard.MatchPointsAdded}</MatchPointsDetails>
                </GameCompleted>

                {/* <GameScreenBox2Line bg={'#B0B0B0'} >Game started</GameScreenBox2Line>
                <GameScreenBox2Line bg={'#E0E0E0'} >Move 1 complete</GameScreenBox2Line>
                <GameScreenBox2Line bg={'#B0B0B0'} >Player 2 next move</GameScreenBox2Line>
                <GameScreenBox2Line bg={'#E0E0E0'} >Move 2 complete</GameScreenBox2Line>
                <GameScreenBox2Line bg={'#B0B0B0'} >Player 3 next move</GameScreenBox2Line>
                <GameScreenBox2Line bg={'#E0E0E0'} >Move 3 complete</GameScreenBox2Line>
                <GameScreenBox2Line bg={'#B0B0B0'} >Move 4 complete</GameScreenBox2Line> */}
            </GameScreenBoxContent>
        </GameScreenBox2> 
    )
}

const GameScreenBox2 = styled.div`
    background-color: #E0E0E0;
    height: 65%;
    width: 90%;
    // overflow-y: auto;
    max-height: 225px;
    position: relative;
    // top: 5%;
`

const GameScreenBoxHeading = styled.div`
    background-color: black;
    color: white;
    height: 50px;
    width: 100%;
    display: flexbox;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
`

const GameScreenBoxContent = styled.div`
    overflow-y: auto;
    height: calc( 100% - 50px );
    width: 100%;
`

const GameScreenBox2Line = styled.div`
    background-color: ${props => props.bg};
    width: calc( 100% - 10px );
    height: calc( 100% / 6 );
    font-size: 14px;
    font-weight: 600;
    display: flex;
    align-items: center;
    padding-left: 10px;
`

const GameToStart = styled.div`
    display: none;
    align-items: center;
    justify-content: center;
    
    height: 100%;
    font-size: 16px;
    font-weight: 600;
`

const BiddingInProgress = styled.div`
    display: none;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    height: 100%;
    padding-bottom: 5%;
`

const BiddingInProgressTitle = styled.div`
    width: 100%;
    height: 30%;
    // background-color: red;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
`

const BiddingInProgressValueTitle = styled.div`
    height: 35%;
    width: 75%;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.bg};
    border-radius: 5px 5px 0px 0px;
`

const BiddingInProgressValueTitlePart = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const BiddingInProgressValue = styled.div`
    width: 75%;
    height: 35%;
    display: flex;
    flex-wrap: wrap;
    background-color: ${props => props.bg};
    border-radius: 0px 0px 5px 5px;
    justify-content: center;
`

const BiddingInProgressPart = styled.div`
    // width: 50%;
    width: calc( 100% / 3 );
    height: 100%;
    font-size: 22px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    // background-color: orange;

    background-repeat: no-repeat;
    background-position: center;
    background-size: 52%;
`

const GameInProgress = styled.div`
    display: none;
    flex-wrap: wrap;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding-bottom: 5%;
`

const GameTitle = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 15%;
    font-size: 14px;
    font-weight: 600;
    // background-color: red;
`

const BidWonDetails = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`

const BidWonDesc = styled.div`
    width: 95%;
    height: 35%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 600;
    background-color: ${props => props.bg};
    border-radius: 5px 5px 0px 0px;
`

const BidWonValue = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 95%;
    height: 65%;
    background-color: ${props => props.bg};
    border-radius: 0px 0px 5px 5px;
`

const BidWonValuePart = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 30%;
    font-size: 16px;
    font-weight: 600;
    background-color: ${props => props.bg};

    background-repeat: no-repeat;
    background-position: center;
    background-size: 50%;
`

const FirstDoubled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 95%;
    height: 20%;
    border-radius: 5px;
    margin: 5px 0px 5px 0px;
    font-size: 14px;
    font-weight: 600;
    background-color: ${props => props.bg};
`

const FirstRedoubled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 95%;
    height: 20%;
    border-radius: 5px;
    margin: 5px 0px 5px 0px;
    font-size: 14px;
    font-weight: 600;
    background-color: ${props => props.bg};
`

const GamePointsDetails = styled.div`
    display:flex;
    flex-wrap: wrap;
    align-items: center;
    // justify-content: center;
    height: 35%;
    width: 100%;
    position: relative;
`

const GamePointsPart = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80%;
    width: 25%;
    background-color: ${props => props.bg};
    position: absolute;
    left: ${props => props.left};
    font-size: 18px;
    font-weight: 600;
    border-radius: 30%;
`

const RemainingPointsDetails = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 20%;
    font-size: 14px;
    font-weight: 600;
    // background-color: yellow;
`

const GameCompleted = styled.div`
    display: none;
    flex-wrap: wrap;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding-bottom: 5%;
`

const MatchPointsDetails = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 95%;
    height: 20%;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 600;
    background-color: ${props => props.bg};
`

export default GameSummary
