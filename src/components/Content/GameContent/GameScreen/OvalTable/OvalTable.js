import React from 'react'
import styled from 'styled-components'
import BiddingKeyboard from './BiddingKeyboard/BiddingKeyboard'

import { commandCalls } from '../../../Misc/Timestamp.scripts'

const discardCardsLoc = {"1":{"top":"calc( 100% - 100px )", "left":"calc( (100% - 74px) / 2)"}, "2":{"top":"calc( 100% - 100px )", "left":"calc( 100% - 74px )"}, "3":{"top":"calc( (100% - 100px) / 2 )", "left":"calc( 100% - 74px )"}, "4":{"top":"0", "left":"calc( 100% - 74px )"}, "5":{"top":"0", "left":"calc( (100% - 100px) / 2 )"}, "6":{"top":"0", "left":"0"}, "7":{"top":"calc( (100% - 100px) / 2)", "left":"0"}, "8":{"top":"calc( 100% - 100px )", "left":"0"}, };

const OvalTable = ({states}) => {

    const newGameHandler = () => {

        console.log('command calls ', ["StartNewGame", "GetMatchState"]);
        commandCalls(["StartNewGame", "GetMatchState"], states);

    }

    const foldGameHandler = () => {

        console.log('commandCalls', ["FoldDiscardedCards"]);
        commandCalls(["FoldDiscardedCards"], states);

    }

    React.useEffect(() => {

        // if ( (states.CurrentPage == 'gameScreen') ) {

        document.getElementById('bidActionFoldButton').style.display = 'none';


            setTimeout(() => {
                
                switch ( states.MatchState.MatchStatus ) {

                    case 'StartNewGame'     :   // code to display only ovalTableNewGame
                                                document.getElementById('ovalTableNewGame').style.display = 'flex';
                                                document.getElementById('biddingKeyboard').style.display = 'none';  
                                                document.getElementById('discardCards').style.display = 'none';                                          
                                                break;
                    case 'PlaceBid'         :   // code to display only biddingKeyboard
                                                document.getElementById('ovalTableNewGame').style.display = 'none';
                                                document.getElementById('biddingKeyboard').style.display = 'flex';   
                                                document.getElementById('discardCards').style.display = 'none';     
                                                break;
                    case 'PlayCard'         :   // code to display only discardedCards
                                                document.getElementById('ovalTableNewGame').style.display = 'none';
                                                document.getElementById('biddingKeyboard').style.display = 'none';   
                                                document.getElementById('discardCards').style.display = 'flex';
                                                break;  
                    case 'Fold'             :   // code to display discardedCards and foldButton
                                                document.getElementById('ovalTableNewGame').style.display = 'none';
                                                document.getElementById('biddingKeyboard').style.display = 'none';   
                                                document.getElementById('discardCards').style.display = 'flex';

                                                // display fold button only if it's the user's turn
                                                if ( states.MatchState.Chairs[1].PlayerTurn == 'Y' ) {
                                                    
                                                    document.getElementById('bidActionFoldButton').style.display = 'flex';
                                                    
                                                    // below code makes sure fold button isn't clickable for atleast 3 seconds
                                                    document.getElementById('bidActionFoldButton').style.pointerEvents = 'none';
                                                    setTimeout(() => document.getElementById('bidActionFoldButton').style.removeProperty('pointer-events'), 3 * 1000)

                                                    // if no one clicks fold in 10s, auto click
                                                    setTimeout(() => {

                                                        if ( states.MatchState.MatchStatus == 'Fold')
                                                            document.getElementById('bidActionFoldButton').click();

                                                    }, 10 * 1000)

                                                }                                               
                                                break;

                    default                 :   document.getElementById('ovalTableNewGame').style.display = 'none';
                                                document.getElementById('biddingKeyboard').style.display = 'none'; 
                                                document.getElementById('discardCards').style.display = 'none';     

                }
            }, 100);

        // }

    // })
    }, [states.MatchState])

    return (
        <OvalTableContainer id="ovalTable">
            
            {/* below is the code for start new game screen */}

            <OvalTableNewGame id="ovalTableNewGame">
                Click to start <NewGameButton id="newGameButton" onClick={() => newGameHandler()}>New Game</NewGameButton>
            </OvalTableNewGame>

            {/* below is the code for biddingKeyboard */}

            <BiddingKeyboard states={states} />

            <BidAction id="bidActionFoldButton" className="actions" data-bidvalue='fold' onClick={() => foldGameHandler()} top="calc( (100% - 50px) * 0.5  )" left="calc( (100% - 90px) / 2 )" >Fold</BidAction>

            {/* below is the code for discardCards */}

            <DiscardCards id="discardCards">
                {Object.keys(states.DiscardCards).map(card => {

                    if ( card !== null )
                        return <Card key={card} className="discaredCard" top={discardCardsLoc[card].top} left={discardCardsLoc[card].left} bg={states.CardDeck[states.DiscardCards[card]]} />;

                })}
            </DiscardCards>
        
        </OvalTableContainer>
    )
}

const OvalTableContainer = styled.div`
    width: 62%;
    height: 65%;

    // @media (max-width: 480px) {
       
    // }
    // @media (min-width: 481px) and (max-width: 720px) {
        
    // }
    // @media (min-width: 721px) and (max-width: 991px) {
        
    // }
    @media (min-width: 992px) and (max-width: 1199px) {
        min-width: 550px;
        min-height: 300px;
    }
    @media (min-width: 1200px) {
        min-width: 650px;
        min-height: 300px;
    }

    //above min width is a temp value
    // height: 250px;
    background-color: green;
    border: 15px solid darkred;
    border-radius: 200px;

    display: flex;
    justify-content: center;
    align-items: center;
`
const OvalTableNewGame = styled.div`
    height: 25%;
    width: 50%;
    // background-color: red;
    font-size: 18px;
    color: white;
    font-weight: 600;

    display: none;
    // display: flex;
    justify-content: center;
    align-items: center;
`

const NewGameButton = styled.div`
    height: 50px;
    width: 120px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    margin-left: 25px;
    border-radius: 5px;
    color: black;
    cursor: pointer;
`

const DiscardCards = styled.div`
    height: 100%;
    width: 65%;
    // background-color: blue;
    // opacity: 0.7;
    position: relative;
    display: none;
    z-index: 1;
`

const Card = styled.div`
    width: 74px;
    height: 100px;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    // background-color: blue;
    // background-image: url(others/spadesJ.PNG);
    background-image: url(${props => props.bg});

    position: absolute;
    top: ${props => props.top};
    left: ${props => props.left};

    // margin-left: 5px;
    // cursor: pointer;
    // transition: 0.3s;
`

const BidAction = styled.div`
    height: 50px;
    width: 90px;
    background-color: white;
    font-size: 16px;
    font-weight: 600;
    position: absolute;
    top: ${props => props.top};
    left: ${props => props.left};
    border-radius: 5px;

    // display: flex;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 2;
`

export default OvalTable
