import React from 'react'
import styled from 'styled-components'
import { commandCalls } from '../../../Misc/Timestamp.scripts';

const GameScreenCards = ({states}) => {

    const cardClickHandler = (e) => {

        if (states.MatchState.MatchStatus == 'PlayCard') {

            // let selectedCards = Array.from(document.getElementsByClassName('selectedCard'));
            let selectedCards = Array.from(document.getElementsByClassName('playerHandCard'));
            selectedCards.forEach(item => {
                item.style.removeProperty('margin-bottom');
                // item.classList.remove('selectedCard');
            })

            e.target.style.marginBottom = '25px';
            // e.target.classList.add('selectedCard');


            let cardSelected = e.target.getAttribute('data-card');

            states.setProcessCommandValues(values => ({
                ...values,
                MyCardID: cardSelected
            }))

        }
        
    }

    React.useEffect(() => {

        console.log(states.ProcessCommandValues.MyCardID);

        if ( states.ProcessCommandValues.MyCardID !== 'init' ) {

            console.log('commandCalls', ["PlayCard", "GetMatchState"]);
            commandCalls( ["PlayCard", "GetMatchState"], states);


        }

    }, [states.ProcessCommandValues.MyCardID])

    return (
        <GameScreenCardsContainer id="gameScreenCardsContainer">
            
            {Object.keys(states.CurrentPlayerHand).map(suit => {

                // console.log(suit);

                return <CardGroup key={suit}>
                    
                    {Object.keys(states.CurrentPlayerHand[suit]).map(card => {

                        // console.log(states.CardDeck[states.CurrentPlayerHand[suit][card]]);
                        // console.log(states.CurrentPlayerHand[suit][card]);
                        return <Card key={card} className="playerHandCard" onClick={e => cardClickHandler(e)} data-card={states.CurrentPlayerHand[suit][card]} bg={states.CardDeck[states.CurrentPlayerHand[suit][card]]} />;

                })}</CardGroup>;

            })}

        </GameScreenCardsContainer>
    )
}

const GameScreenCardsContainer = styled.div`
    width: 100%;
    height: 25%;
    // background-color: red;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    overflow-y: auto;
`

const CardGroup = styled.div`
    width: auto;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    // margin-left: 25px;
    @media (max-width: 480px) {
        margin-left: 5px;
    }
    @media (min-width: 481px) and (max-width: 720px) {
        margin-left: 10px;
    }
    @media (min-width: 721px) and (max-width: 991px) {
        margin-left: 10px;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
        margin-left: 20px;
    }
    @media (min-width: 1200px) {
        margin-left: 25px;
    }
 
`

const Card = styled.div`
    // width: 111px;
    // height: 150px;

    @media (max-width: 379px) {
        width: 35px;
        margin-left: 2px;
    }
    @media (min-width: 380px) and (max-width: 480px) {
        width: 42px;
        margin-left: 2px;
    }
    @media (min-width: 481px) and (max-width: 720px) {
        width: 53px;
        margin-left: 2px;
    }
    @media (min-width: 721px) and (max-width: 991px) {
        width: 48px;
        margin-left: 2px;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
        width: 75px;
        margin-left: 3px;
    }
    @media (min-width: 1200px) {
        width: 96px;
        margin-left: 5px;
    }
 
    // width: 96px;
    height: 130px;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    // background-color: blue;
    // background-image: url(others/spadesJ.PNG);
    background-image: url(${props => props.bg});

    // margin-left: 5px;
    cursor: pointer;
    transition: 0.3s;
`

export default GameScreenCards
