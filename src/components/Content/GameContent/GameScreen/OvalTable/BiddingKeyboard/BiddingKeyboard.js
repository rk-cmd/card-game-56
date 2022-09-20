import React from 'react'
import styled from 'styled-components'
import { checkBidTitle } from '../../../../../../App.scripts';
import { commandCalls } from '../../../../Misc/Timestamp.scripts';

var currentBid = "";

const BiddingKeyboard = ({states}) => {

    // below function called when bid buttons are clicked
    const bidButtonHandler = (e) => {

        // if ( states.MatchState.Chairs[1].PlayerTurn == 'Y' ) {

            // below code makes sure currentBid variable value is reset if previous call was double, pass, clear
            // switch (currentBid) {

            //     case 'double'   :
            //     case 'redouble' :
            //     case 'allpass'  :
            //     case 'reset'    :
            //                         currentBid = "";
            //     default         :

            // }


            currentBid += e.target.getAttribute('data-bidvalue');

            states.setProcessCommandValues(values =>({
                ...values,
                MyBid: currentBid
            }))
    
        // }

        // setTimeout(() => states.setBiddingKeyboardValues({"suits":{"0":"hearts","1":"clubs","2":"diams","3":"noos","4":"notr"},"numbers":{"0":29,"1":30,"2":31,"3":32,"4":33,"5":34,"6":35,"7":36,"8":37,"9":38,"10":39,"11":40,"12":41,"13":42,"14":43,"15":44,"16":45,"17":46,"18":47,"19":48,"20":49,"21":50,"22":51,"23":52,"24":53,"25":54,"26":55,"27":56},"actions":{"0":"+","1":"+1","2":"+2","3":"+3","4":"+4","5":"pass","6":"reset"},"others":{},"myBid":""}), 5000);

        
    }

    const bidActionHandler = (e) => {
        // if ( states.MatchState.Chairs[1].PlayerTurn == 'Y' ) {

            switch ( e.target.innerText ) {
                
                case 'Double'   :   
                                    // console.log('Double');
                                    currentBid = e.target.getAttribute('data-bidvalue');
                                    break;
                case 'Re-Double':   
                                    // console.log('Double');
                                    currentBid = e.target.getAttribute('data-bidvalue');
                                    break;
                case 'Pass'     :   
                                    // console.log('Pass');
                                    if ( currentBid == '28' )
                                        currentBid += e.target.getAttribute('data-bidvalue');
                                    else
                                        currentBid = e.target.getAttribute('data-bidvalue');
                                    break;
                case 'All Pass'     :   
                                    // console.log('Pass');
                                    currentBid = e.target.getAttribute('data-bidvalue');
                                    break;
                case 'Clear'    :   
                                    // console.log('Clear');
                                    currentBid = e.target.getAttribute('data-bidvalue');
                                    // send code to clear, delete below temp code


                                    // document.getElementById('biddingKeyboardTitle').innerText = 'Place your Bid';

                                    // document.getElementById('bidActionPassClear').innerText = 'Pass';
                                    // document.getElementById('bidActionPassClear').setAttribute('data-bidvalue', 'pass');



                                    break;
                case 'Reconfirm':   
                                    currentBid += e.target.getAttribute('data-bidvalue');
                                    break;
                // case 'Fold'     :   
                                    // console.log('commandCalls', ["FoldDiscardedCards"]);
                                    // commandCalls(["FoldDiscardedCards"], states);
                                    // currentBid += e.target.getAttribute('data-bidvalue');
                                    // break;
                default:

            }

            // console.log(currentBid);

            states.setProcessCommandValues(values =>({
                ...values,
                MyBid: currentBid
            }))

        // }
        // setTimeout(() => states.setBiddingKeyboardValues({"suits":{"0":"hearts","1":"clubs","2":"diams","3":"noos","4":"notr"},"numbers":{"0":29,"1":30,"2":31,"3":32,"4":33,"5":34,"6":35,"7":36,"8":37,"9":38,"10":39,"11":40,"12":41,"13":42,"14":43,"15":44,"16":45,"17":46,"18":47,"19":48,"20":49,"21":50,"22":51,"23":52,"24":53,"25":54,"26":55,"27":56},"actions":{"0":"+","1":"+1","2":"+2","3":"+3","4":"+4","5":"double","6":"reset","7":"allpass"},"others":{},"myBid":""}), 1000);
        // states.setBiddingKeyboardValues({"suits":{},"numbers":{},"actions":{},"others":{"0":"reconfirm"},"myBid":"double"})
        // states.setBiddingKeyboardValues({"suits":{},"numbers":{},"actions":{"0":"reset"},"others":{"0":"reconfirm"},"myBid":"pass","MessagePart1":"Confirm your bid","MessagePart2":null,"MessagePart3":null});
        // states.setMatchState({"MatchStatus":"PlaceBid","NumberOfPlayers":4,"AllowedHelpLevel":null,"MaxPlay":"GM8","GameRules":"INT","PlayerLevel":"I","EnforceFollowSuit":"Y","ShowGamePoints":"Y","ShowRemainingPoints":"Y","EnableAllPass":"N","PublicMatch":null,"MatchAdmin":"Y","MinimumWaitSeconds":0,"RefreshRequired":"N","LastRefreshTimestamp":"2021-04-28 09:00:00","ElapsedSeconds":957,"RefreshCalls":{"0": "GetCurrentPlayerHand","1": "CallBiddingKeyboard","2": "GetMatchScoreBoard","3": "GetDiscardCards"},"Chairs":{"1":{"ChairNo":3,"PlayerName":"federer","PlayerTeam":"A","PlayerTurn":"N","MatchAdmin":"N","TrickStarter":"Y","ChairEmpty":"N","LastBid":{"1":"diams","2":"+2","3":"(42)"}},"2":null,"3":{"ChairNo":4,"PlayerName":"nadal","PlayerTeam":"B","PlayerTurn":"Y","MatchAdmin":"Y","TrickStarter":"N","ChairEmpty":"N","LastBid":{"1":"spades","2":"+2","3":"(32)"}},"4":null,"5":{"ChairNo":1,"PlayerName":"djokovic","PlayerTeam":"A","PlayerTurn":"N","MatchAdmin":"N","TrickStarter":"N","ChairEmpty":"N","LastBid":{"1":"spades","2":"+2","3":"(32)"}},"6":null,"7":{"ChairNo":2,"PlayerName":"AJM","PlayerTeam":"B","PlayerTurn":"N","MatchAdmin":"N","TrickStarter":"N","ChairEmpty":"N","LastBid":{"1":"diams","2":"+2","3":"(32)"}},"8":null}})
        // states.setMatchState({"MatchStatus":"PlaceBid","NumberOfPlayers":4,"AllowedHelpLevel":null,"MaxPlay":"GM8","GameRules":"INT","PlayerLevel":"I","EnforceFollowSuit":"Y","ShowGamePoints":"Y","ShowRemainingPoints":"Y","EnableAllPass":"N","PublicMatch":null,"MatchAdmin":"Y","MinimumWaitSeconds":0,"RefreshRequired":"N","LastRefreshTimestamp":"2021-04-28 09:00:00","ElapsedSeconds":957,"RefreshCalls":{"0": "GetCurrentPlayerHand","1": "CallBiddingKeyboard","2": "GetMatchScoreBoard","3": "GetDiscardCards"},"Chairs":{"1":{"ChairNo":3,"PlayerName":"federer","PlayerTeam":"A","PlayerTurn":"N","MatchAdmin":"N","TrickStarter":"Y","ChairEmpty":"N","LastBid":""},"2":null,"3":{"ChairNo":4,"PlayerName":"nadal","PlayerTeam":"B","PlayerTurn":"Y","MatchAdmin":"Y","TrickStarter":"N","ChairEmpty":"N","LastBid":""},"4":null,"5":{"ChairNo":1,"PlayerName":"djokovic","PlayerTeam":"A","PlayerTurn":"N","MatchAdmin":"N","TrickStarter":"N","ChairEmpty":"N","LastBid":""},"6":null,"7":{"ChairNo":2,"PlayerName":"AJM","PlayerTeam":"B","PlayerTurn":"N","MatchAdmin":"N","TrickStarter":"N","ChairEmpty":"N","LastBid":""},"8":null}})

    }

    React.useEffect(() => {

        document.getElementById('bidActionDoubleRedouble').style.display = 'none';
        document.getElementById('bidActionAllPass').style.display = 'none';
        document.getElementById('bidActionClear').style.display = 'none';
        document.getElementById('bidActionPass').style.display = 'none';
        document.getElementById('bidActionReconfirmed').style.display = 'none';
        // document.getElementById('bidActionFoldButton').style.display = 'none';

        // if ( (states.BiddingKeyboardValues.myBid == '')  || (states.ProcessCommandValues.MyBid == 'reset') ) 
        //     currentBid = '';
        // else    
        //     currentBid = states.BiddingKeyboardValues.myBid;




        // if others field is empty, since it's used for reconfirm
        // if ( Object.keys(states.BiddingKeyboardValues.others).length == 0 ) {

            {Object.keys(states.BiddingKeyboardValues.actions).forEach(item => {

                // below code is for initializing display of bidActionButtons 

                switch( states.BiddingKeyboardValues.actions[item] ) {

                    case 'double'   :   document.getElementById('bidActionDoubleRedouble').style.display = 'flex';
                                        document.getElementById('bidActionDoubleRedouble').innerText = 'Double';
                                        document.getElementById('bidActionDoubleRedouble').setAttribute('data-bidvalue', 'double');
                                        break;
                    case 'redouble' :   document.getElementById('bidActionDoubleRedouble').style.display = 'flex';
                                        document.getElementById('bidActionDoubleRedouble').innerText = 'Re-Double';
                                        document.getElementById('bidActionDoubleRedouble').setAttribute('data-bidvalue', 'redouble');
                                        break;
                    case 'allpass'  :
                                        document.getElementById('bidActionAllPass').style.display = 'flex';
                                        break;
                    case 'pass'     :   document.getElementById('bidActionPass').style.display = 'flex';
                                        // document.getElementById('bidActionPassClear').innerText = 'Pass';
                                        // document.getElementById('bidActionPassClear').setAttribute('data-bidvalue', 'pass')
                                        break;

                    case 'reset'    :   document.getElementById('bidActionClear').style.display = 'flex';
                                        // document.getElementById('bidActionPassClear').innerText= 'Clear';
                                        // document.getElementById('bidActionPassClear').setAttribute('data-bidvalue', 'reset');
                                        break;
                    default     :   

                }

            })}

        // }
        // else runs when reconfirm is present
        // else {
            Object.keys(states.BiddingKeyboardValues.others).forEach(item => {

                switch ( states.BiddingKeyboardValues.others[item] ) {

                    case 'reconfirm'    :   document.getElementById('bidActionReconfirmed').style.display = 'flex';
                                            break;
                    default :

                }
                
            })
            
        // }

        //  if complete bid
        //      put myBid as MyBid and call CallBiddingKeyboard

        if ( states.BiddingKeyboardValues.CompleteBid !== 'Y' ) {

        //     // call CallBiddingKeyboard with same ProcessCommand MyBid value
        //     // console.log('commandCalls', ["CallBiddingKeyboard"]);
        //     // commandCalls(["CallBiddingKeyboard"], states);

        //     // states.setProcessCommandValues(values => ({
        //     //     ...values,
        //     //     MyBid: states.BiddingKeyboardValues.myBid
        //     // }))

        // }
        // else {

            // currentBid value should be directly taken from values sent by backend
            currentBid = states.BiddingKeyboardValues.myBid;
            
            console.log(currentBid)

            states.setProcessCommandValues(values => ({
                ...values,
                MyBid: ""
            }))

            // states.setProcessCommandValues(values => ({
            //     ...values,
            //     MyBid: states.BiddingKeyboardValues.myBid
            // }))
        }

            

        checkBidTitle();

    }, [states.BiddingKeyboardValues])

    React.useEffect(() => {

        

        if ( (states.ProcessCommandValues.MyBid !== '') ) {

            console.log(states.ProcessCommandValues.MyBid);
            console.log('commandCalls', ["CallBiddingKeyboard"]);
            // commandCalls(["CallBiddingKeyboard"], states);
            // reset myBid inside ProcessCommand, currentBid doesn't change
            // states.setProcessCommandValues(values => ({
            //     ...values,
            //     MyBid: ""
            // }))
        }

    }, [states.ProcessCommandValues.MyBid])

    React.useEffect(() => {

        // below is the code for resetting ProcessCommand MyBid when MatchStatus is PlayCard

        if ( states.MatchState.MatchStatus == 'PlayCard' ) {

            states.setProcessCommandValues(values => ({
                ...values,
                MyBid: ""
            }))

        }

        

    }, [states.MatchState])

    return (
        <BiddingKeyboardContainer id="biddingKeyboard">
                
            <BiddingKeyboardButtons>

                <BiddingKeyboardTitle id="biddingKeyboardTitle">
                    <TitlePart className="biddingKeyboardTitlePart" >{states.BiddingKeyboardValues.MessagePart1}</TitlePart>
                    <TitlePart className="biddingKeyboardTitlePart" >{states.BiddingKeyboardValues.MessagePart2}</TitlePart>
                    <TitlePart className="biddingKeyboardTitlePart" >{states.BiddingKeyboardValues.MessagePart3}</TitlePart>
                </BiddingKeyboardTitle>

                <BiddingKeyboardButtonsSuits id="biddingKeyboardSuits" >

                    {Object.keys(states.BiddingKeyboardValues.suits).map(item => {

                        switch  ( states.BiddingKeyboardValues.suits[item] ) {

                            case 'hearts'   :
                                                return <BidButton key={item} className="bidButton suit" data-bidvalue="hearts" bg={"https://www.56cardgameonline.com/newdesign/others/hearts.PNG"} onClick={e => bidButtonHandler(e)} ></BidButton>
                            case 'clubs'    :
                                                return <BidButton key={item} className="bidButton suit" data-bidvalue="clubs" bg={"https://www.56cardgameonline.com/newdesign/others/clubs.PNG"} onClick={e => bidButtonHandler(e)} ></BidButton>
                            case 'spades'   :
                                                return <BidButton key={item} className="bidButton suit" data-bidvalue="spades" bg={"https://www.56cardgameonline.com/newdesign/others/spades.PNG"} onClick={e => bidButtonHandler(e)} ></BidButton>
                            case 'diams'    :
                                                return <BidButton key={item} className="bidButton suit" data-bidvalue="diams" bg={"https://www.56cardgameonline.com/newdesign/others/diams.PNG"} onClick={e => bidButtonHandler(e)} ></BidButton>
                            case 'noos'     :
                                                return <BidButton key={item} className="bidButton suit" data-bidvalue="NS" onClick={e => bidButtonHandler(e)} >NS</BidButton>
                            case 'notr'     :
                                                return <BidButton key={item} className="bidButton suit" data-bidvalue="NT" onClick={e => bidButtonHandler(e)} >NT</BidButton>
                            default         :

                        }

                    })}

                </BiddingKeyboardButtonsSuits>

                <BiddingKeyboardButtonsActions id="biddingKeyboardActions" >

                    {Object.keys(states.BiddingKeyboardValues.actions).map(item => {

                        switch( states.BiddingKeyboardValues.actions[item] ) {

                            case 'double'   : 
                            case 'redouble' :  
                            case 'allpass'  :   
                            case 'pass'     :   
                            case 'reset'    :
                                                return;

                            default         :   return <BidButton key={item} className="bidButton actions" data-bidvalue={states.BiddingKeyboardValues.actions[item]} onClick={e => bidButtonHandler(e)} >{states.BiddingKeyboardValues.actions[item]}</BidButton>

                        }
            
                    })}

                </BiddingKeyboardButtonsActions>

                <BiddingKeyboardButtonsNumbers id="biddingKeyboardNumbers" >

                    {Object.keys(states.BiddingKeyboardValues.numbers).map(item => 
                        <BidButton key={item} className="bidButton numbers" data-bidvalue={states.BiddingKeyboardValues.numbers[item]} onClick={e => bidButtonHandler(e)} >{states.BiddingKeyboardValues.numbers[item]}</BidButton>
                    )}

                </BiddingKeyboardButtonsNumbers>

                <BidAction id="bidActionReconfirmed" className="actions" data-bidvalue='reconfirmed' onClick={e => bidActionHandler(e)} top="calc( (100% - 50px) * 0.5  )" left="calc( (100% - 90px) / 2 )" >Reconfirm</BidAction>


            </BiddingKeyboardButtons>

            <BiddingKeyboardAction>

                <BidAction id="bidActionDoubleRedouble" className="actions" data-bidvalue='double' onClick={e => bidActionHandler(e)} top="calc( (100% - 200px) * 0.35 )" left="calc( (100% - 90px) / 2 )" >Double</BidAction>
                <BidAction id="bidActionAllPass" className="actions" data-bidvalue='allpass' onClick={e => bidActionHandler(e)} top="calc( ( (100% - 200px) * 0.45 ) + 50px )" left="calc( (100% - 90px) / 2 )" >All Pass</BidAction>
                <BidAction id="bidActionClear" className="actions" data-bidvalue='reset' onClick={e => bidActionHandler(e)} top="calc( ( (100% - 200px) * 0.55 ) + 100px )" left="calc( (100% - 90px) / 2 )" >Clear</BidAction>
                <BidAction id="bidActionPass" className="actions" data-bidvalue='pass' onClick={e => bidActionHandler(e)} top="calc( ( (100% - 200px) * 0.65 ) + 150px )" left="calc( (100% - 90px) / 2 )" >Pass</BidAction>

            </BiddingKeyboardAction>

            {/* <BidAction id="bidActionFoldButton" className="actions" data-bidvalue='fold' onClick={e => bidActionHandler(e)} top="calc( (100% - 50px) * 0.5  )" left="calc( (100% - 90px) / 2 )" >Fold</BidAction> */}


        </BiddingKeyboardContainer>
    )
}

const BiddingKeyboardContainer = styled.div`
    height: 100%;
    width: 100%;
    // display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    display: none;
    overflow-y: auto;
`

const BiddingKeyboardButtons = styled.div`
    // height: 100%;
    // width: calc( 80% - 100px );
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    // background-color: red;

    @media (max-width: 480px) {
        height: 100%;
        width: calc( 100% );
    }
    @media (min-width: 481px) and (max-width: 720px) {
        height: 100%;
        width: calc( 100% );
    }
    @media (min-width: 721px) and (max-width: 991px) {
        height: 100%;
        width: calc( 100% );
    }
    @media (min-width: 992px) {
        height: 100%;
        width: calc( 80% - 100px );
    }
`

const BiddingKeyboardTitle = styled.div`
    height: 15%;
    // width: calc( 80% - 100px );
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    // background-color: purple;

    @media (max-width: 480px) {
        font-size: 14px;
    }
    @media (min-width: 481px) and (max-width: 720px) {
        font-size: 16px;
    }
    @media (min-width: 721px) and (max-width: 991px) {
        font-size: 18px;        
    }

    font-size: 18px;
    font-weight: 600;
    color: white;
`

const TitlePart = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex;
    height: 100%;
    // background-color: yellow;
    margin-left: 15px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 60%;
    color: white;
`

const BiddingKeyboardAction = styled.div`
    // height: 100%;
    // width: calc( 20% );
    // background-color: blue;
    position: relative;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    @media (max-width: 480px) {
        height: 100%;
        width: calc( 100% );
    }
    @media (min-width: 481px) and (max-width: 720px) {
        height: 100%;
        width: calc( 100% );
    }
    @media (min-width: 721px) and (max-width: 991px) {
        height: 100%;
        width: calc( 70% );
    }
    @media (min-width: 992px) {
        height: 100%;
        width: calc( 20% );
    }
`

const BidButton = styled.div`
    // height: 35px;
    // width: 35px;

    @media (max-width: 480px) {
        height: 20px;
        width: 22px;
        font-size: 13px;
    }
    @media (min-width: 481px) and (max-width: 720px) {
        height: 30px;
        width: 30px;
        font-size: 16px;
    }
    @media (min-width: 721px) and (max-width: 991px) {
        height: 30px;
        width: 30px;
        font-size: 16px;
    }
    @media (min-width: 992px) {
        height: 35px;
        width: 35px;
        font-size: 18px;
    }

    background-color: white;
    margin-left: 10px;
    border-radius: 5px;

    // font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    background-image: url(${props => props.bg});
    background-size: 75%;
    background-repeat: no-repeat;
    background-position: center;
`

const BidAction = styled.div`
    // height: 50px;
    // width: 90px;
    background-color: white;
    // font-size: 16px;
    font-weight: 600;
    // position: absolute;
    // top: ${props => props.top};
    // left: ${props => props.left};
    border-radius: 5px;

    @media (max-width: 480px) {
        height: 40px;
        width: 75px;
        font-size: 14px;
        margin: 10px;
    }
    @media (min-width: 481px) and (max-width: 720px) {
        height: 50px;
        width: 90px;
        font-size: 14px;
        margin: 10px;
    }
    @media (min-width: 721px) and (max-width: 991px) {
        height: 50px;
        width: 90px;
        font-size: 16px;
        margin: 10px;
    }
    @media (min-width: 992px) {
        height: 50px;
        width: 90px;
        font-size: 16px;
    }

    // display: flex;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

const BiddingKeyboardButtonsSuits = styled.div`
    height: 14%;
    width: 100%;
    // background-color: yellow;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`

const BiddingKeyboardButtonsActions = styled.div`
    height: 14%;
    width: 100%;
    // background-color: lightblue;    
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`

const BiddingKeyboardButtonsNumbers = styled.div`
    height: 55%;
    width: 100%;
    // background-color: gray;
    margin-top: 1%;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`

export default BiddingKeyboard
