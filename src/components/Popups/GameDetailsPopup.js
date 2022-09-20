import React from 'react'
import styled from 'styled-components'
import ChairPopup from './GameDetailsPopup/ChairPopup'
import { maxGamesEvent, sortChairsMatchState } from './GameDetailsPopup/GameDetailsPopup.scripts'
import { pushChairsToState } from '../Content/GameContent/GameScreen/GameScreen.scripts'
import { commandCalls, processCommandJsonGenerator } from '../Content/Misc/Timestamp.scripts' 
import { moveToGameScreen } from '../../App.scripts'
import { kickOutGameHandler } from '../../App.scripts'


const GameDetailsPopup = ({ states, handlers}) => {

    var chairSelected;

    React.useEffect(() => {

        console.log('hit at popuprefresh')
        let arrDisableButtons = Array.from(document.getElementsByClassName('gameDetailsTableButton'));

        if ( ! (states.CurrentPage == 'gameScreen') ) {

            arrDisableButtons.forEach(item => {

                if ( item.parentNode.parentNode.childNodes[1].innerText == 'Free')
                    item.innerText = 'Join';
                else    
                    item.innerText = 'Watch';

                item.style.removeProperty('pointer-events');
                item.style.backgroundColor = 'black';

            });

        }


    }, [states.CurrentPage])

    //when you click on join/watch in the popup
    const detailsTableItemClick = (e) => {
        // debugger;

        chairSelected = parseInt(e.target.parentElement.parentElement.firstChild.lastChild.textContent);

        document.querySelectorAll('.gameDetailsTableButton').forEach(item => {

            if (item !== e.target)
                item.style.backgroundColor = 'black';

        });

        if (window.getComputedStyle(e.target).backgroundColor == 'rgb(0, 0, 0)')
            e.target.style.backgroundColor = '#C0C0C0';
        else    
            e.target.style.backgroundColor = 'black';

    }

    // const closeGameDetailsPopup = () => {

    //     document.getElementById('gameDetails').style.display= 'none';
    //     document.getElementById('container').style.opacity = '1';

    // }

    // const history = useHistory();

    const actionGameDetailsPopup = ( e, states) => {
     
        console.log('match admin ' + states.MatchState.MatchAdmin);
        // console.log(document.getElementById('gameDetailsMatchAdmin').innerText == 'Match Admin');

        //below code works if in gameScreen, so Kick can work for admin
        if ( states.CurrentPage == 'gameScreen' ) {

            // debugger;

            if ( e.target.innerText == 'Kick' ) {

                let userName = e.target.parentNode.parentNode.childNodes[1].innerText;
                let chairNo = e.target.parentNode.parentNode.firstChild.innerText;

                // opening confirmation popup
                document.getElementById('gameDetailsWrapper').style.opacity = 0.5;
                document.getElementById('confirmationMessage').innerHTML = 'Are you sure you want to kick out ' + userName + ' ?';
                document.getElementById('noButtonConfirmation').style.display = 'flex'; 
                document.getElementById('yesButtonConfirmation').style.display = 'flex'; 
                document.getElementById('okButtonConfirmation').style.display = 'none'; 
                
                states.setProcessCommandValues(values => ({
                    ...values,
                    ChairNo: chairNo
                }));

                document.getElementById('popupConfirmation').style.display = 'block';
                document.getElementById('container').style.opacity = '0.5';  

                // console.log('new kick hit');
                // kickOutGameHandler( e, states);
        
            }

        }

        //below code works for other pages, so Join works for everyone
        else {

            //'if' works if it's gameTile
            // if ( document.getElementById('playerLevel').hasAttribute('disabled') ) {
            // if (document.getElementById('gameDetailsMatchAdmin').innerText !== 'Match Admin' ) {
            if ( states.ProcessCommandValues.TileType == 'tableTile' ) {

                states.setProcessCommandValues(values => ({...values, 
                    GroupID: states.ProcessCommandValues.GroupID, 
                    MatchID: states.ProcessCommandValues.MatchID,
                    ChairNo: e.target.parentNode.parentNode.firstChild.lastChild.innerText,
                    EnableAllPass: states.MatchState.EnableAllPass,
                    EnforceFollowSuit: states.PossibleValues.Defaults.EnforceFollowSuit,
                    GameRules: states.PossibleValues.Defaults.GameRules,
                    MaxPlay : states.MatchState.MaxPlay,
                    NumberOfPlayers: states.MatchState.NumberOfPlayers,
                    PlayerLevel: states.MatchState.PlayerLevel,
                    ShowGamePoints: states.MatchState.ShowGamePoints,
                    ShowRemainingPoints: states.MatchState.ShowRemainingPoints,
                    PublicMatch: states.MatchState.PublicMatch,
                    GameDetailsPopupEnd: Math.random()

                }));

                // commandCalls( ["Register", "TakeChairInTable, GetMatchState"], states);
                pushChairsToState(states);

            }    
            //else works if it's a createTile
            else {

                let json = {};

                switch ( document.getElementById('playerLevel').value ) {

                    case 'Beginner'     :   json["PlayerLevel"] = 'B';
                                            break;
                    case 'Intermediate' :   json["PlayerLevel"] = 'I';
                                            break;
                    case 'Expert'       :   json["PlayerLevel"] = 'E';
                                            break;
                    default             :
                        
                }

                switch ( document.getElementById('gameRules').value ) {

                    case 'International':   json["GameRules"] = 'INT';
                                            break;
                    case 'Kerala'       :   json["GameRules"] = 'KER';
                                            break;            
                    default     :
                }
                switch ( document.getElementById('gamePoints').value ) {

                    case 'Show' :   json["ShowGamePoints"] = 'Y';
                                    break;
                    case 'Hide' :   json["ShowGamePoints"] = 'N';
                                    break;            
                    default     :
                }
                switch ( document.getElementById('remainingPoints').value ) {

                    case 'Show' :   json["ShowRemainingPoints"] = 'Y';
                                    break;
                    case 'Hide' :   json["ShowRemainingPoints"] = 'N';
                                    break;            
                    default     :
                }
                switch ( document.getElementById('allPass').value ) {

                    case 'Enabled'  :   json["EnableAllPass"] = 'Y';
                                        break;
                    case 'Disabled' :   json["EnableAllPass"] = 'N';
                                        break;  
                    default         :            

                }

                let currentChair = parseInt(e.target.parentNode.parentNode.firstChild.lastChild.innerText);
                let chairs = [];

                switch ( document.getElementById('numberOfPlayers').value ) {

                    case '4 Player'                     :   json["NumberOfPlayers"] = '4';

                                                            //below is for the initial render of gameScreen
                                                            chairs = [ currentChair, (currentChair + 1) % 4, (currentChair + 2) % 4, (currentChair + 3) % 4];

                                                            for (let i=0 ; i<chairs.length ; i++) {
                                                                if ( chairs[i]==0 )
                                                                    chairs[i] = 4;
                                                            }
                                                            //other matchstate values dont matter now
                                                            states.setMatchState(values => ({
                                                                ...values,
                                                                Chairs: {"1":{"ChairNo":chairs[0],"PlayerName":"Player 1","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"No"},"2":null,"3":{"ChairNo":chairs[1],"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"4":null,"5":{"ChairNo":chairs[2],"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"6":null,"7":{"ChairNo":chairs[3],"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"8":null}
                                                            })
                                                                // {"MatchStatus":"StartNewGame","NumberOfPlayers":4,"AllowedHelpLevel":null,"MaxPlay":"GM12","GameRules":"KER","PlayerLevel":"I","EnforceFollowSuit":"Y","ShowGamePoints":"Y","ShowRemainingPoints":"N","EnableAllPass":"N","PublicMatch":null,"MatchAdmin":"Y","MinimumWaitSeconds":0,"RefreshRequired":"No","LastRefreshTimestamp":"2021-04-28 09:00:00","RefreshCalls":{},"Chairs":{"1":{"ChairNo":chairs[0],"PlayerName":"Player 1","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"No"},"2":null,"3":{"ChairNo":chairs[1],"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"4":null,"5":{"ChairNo":chairs[2],"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"6":null,"7":{"ChairNo":chairs[3],"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"8":null}}
                                                            );
                                                            break;
                    case '6 Player'                     :   json["NumberOfPlayers"] = '6';
                                                            chairs = [ currentChair, (currentChair + 1) % 6, (currentChair + 2) % 6, (currentChair + 3) % 6, (currentChair + 4) % 6, (currentChair + 5) % 6];

                                                            for (let i=0 ; i<chairs.length ; i++) {
                                                                if ( chairs[i]==0 )
                                                                    chairs[i] = 6;
                                                            }
                                                            states.setMatchState(values => ({
                                                                ...values,
                                                                Chairs: {"1":{"ChairNo":chairs[0],"PlayerName":"Player 1","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"No"},"2":{"ChairNo":chairs[1],"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"3":null,"4":{"ChairNo":chairs[2],"PlayerName":"","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"5":{"ChairNo":chairs[3],"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"6":{"ChairNo":chairs[4],"PlayerName":"","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"7":null,"8":{"ChairNo":chairs[5],"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"}}
                                                            })
                                                                // {"MatchStatus":"StartNewGame","NumberOfPlayers":6,"AllowedHelpLevel":null,"MaxPlay":"GM12","GameRules":"KER","PlayerLevel":"I","EnforceFollowSuit":"Y","ShowGamePoints":"Y","ShowRemainingPoints":"N","EnableAllPass":"N","PublicMatch":null,"MatchAdmin":"Yes","MinimumWaitSeconds":0,"RefreshRequired":"No","LastRefreshTimestamp":"2021-04-28 09:00:00","RefreshCalls":{},"Chairs":{"1":{"ChairNo":chairs[0],"PlayerName":"Player 1","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"No"},"2":{"ChairNo":chairs[1],"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"3":null,"4":{"ChairNo":chairs[2],"PlayerName":"","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"5":{"ChairNo":chairs[3],"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"6":{"ChairNo":chairs[4],"PlayerName":"","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"7":null,"8":{"ChairNo":chairs[5],"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"}}}
                                                            );
                                                            break;
                    case '8 Player with 6 cards each'   :   json["NumberOfPlayers"] = '86';
                                                            chairs = [ currentChair, (currentChair + 1) % 8, (currentChair + 2) % 8, (currentChair + 3) % 8, (currentChair + 4) % 8, (currentChair + 5) % 8, (currentChair + 6) % 8, (currentChair + 7) % 8];

                                                            for (let i=0 ; i<chairs.length ; i++) {
                                                                if ( chairs[i]==0 )
                                                                    chairs[i] = 8;
                                                            }
                                                            states.setMatchState(values => ({
                                                                ...values,
                                                                Chairs: {"1":{"ChairNo":chairs[0],"PlayerName":"Player 1","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"No"},"2":{"ChairNo":chairs[1],"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"3":{"ChairNo":chairs[2],"PlayerName":"rohith8194","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"No"},"4":{"ChairNo":chairs[3],"PlayerName":"","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"5":{"ChairNo":chairs[4],"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"6":{"ChairNo":chairs[5],"PlayerName":"","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"7":{"ChairNo":chairs[6],"PlayerName":"rohith8194","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"No"},"8":{"ChairNo":chairs[7],"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"}}
                                                            })
                                                                // {"MatchStatus":"StartNewGame","NumberOfPlayers":6,"AllowedHelpLevel":null,"MaxPlay":"GM12","GameRules":"KER","PlayerLevel":"I","EnforceFollowSuit":"Y","ShowGamePoints":"Y","ShowRemainingPoints":"N","EnableAllPass":"N","PublicMatch":null,"MatchAdmin":"Yes","MinimumWaitSeconds":0,"RefreshRequired":"No","LastRefreshTimestamp":"2021-04-28 09:00:00","RefreshCalls":{},"Chairs":{"1":{"ChairNo":chairs[0],"PlayerName":"Player 1","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"No"},"2":{"ChairNo":chairs[1],"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"3":{"ChairNo":chairs[2],"PlayerName":"rohith8194","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"No"},"4":{"ChairNo":chairs[3],"PlayerName":"","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"5":{"ChairNo":chairs[4],"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"6":{"ChairNo":chairs[5],"PlayerName":"","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"7":{"ChairNo":chairs[6],"PlayerName":"rohith8194","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"No"},"8":{"ChairNo":chairs[7],"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"}}}
                                                            );
                                                            break;
                    case '8 Player with 8 cards each'   :   json["NumberOfPlayers"] = '88';
                                                            chairs = [ currentChair, (currentChair + 1) % 8, (currentChair + 2) % 8, (currentChair + 3) % 8, (currentChair + 4) % 8, (currentChair + 5) % 8, (currentChair + 6) % 8, (currentChair + 7) % 8];

                                                            for (let i=0 ; i<chairs.length ; i++) {
                                                                if ( chairs[i]==0 )
                                                                    chairs[i] = 8;
                                                            }
                                                            states.setMatchState(values => ({
                                                                ...values,
                                                                Chairs: {"1":{"ChairNo":chairs[0],"PlayerName":"rohith8194","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"No"},"2":{"ChairNo":chairs[1],"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"3":{"ChairNo":chairs[2],"PlayerName":"rohith8194","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"No"},"4":{"ChairNo":chairs[3],"PlayerName":"","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"5":{"ChairNo":chairs[4],"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"6":{"ChairNo":chairs[5],"PlayerName":"","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"7":{"ChairNo":chairs[6],"PlayerName":"rohith8194","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"No"},"8":{"ChairNo":chairs[7],"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"}}
                                                            })
                                                                // {"MatchStatus":"StartNewGame","NumberOfPlayers":6,"AllowedHelpLevel":null,"MaxPlay":"GM12","GameRules":"KER","PlayerLevel":"I","EnforceFollowSuit":"Y","ShowGamePoints":"Y","ShowRemainingPoints":"N","EnableAllPass":"N","PublicMatch":null,"MatchAdmin":"Yes","MinimumWaitSeconds":0,"RefreshRequired":"No","LastRefreshTimestamp":"2021-04-28 09:00:00","RefreshCalls":{},"Chairs":{"1":{"ChairNo":chairs[0],"PlayerName":"rohith8194","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"No"},"2":{"ChairNo":chairs[1],"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"3":{"ChairNo":chairs[2],"PlayerName":"rohith8194","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"No"},"4":{"ChairNo":chairs[3],"PlayerName":"","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"5":{"ChairNo":chairs[4],"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"6":{"ChairNo":chairs[5],"PlayerName":"","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"7":{"ChairNo":chairs[6],"PlayerName":"rohith8194","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"No"},"8":{"ChairNo":chairs[7],"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"}}}
                                                            );
                                                            break;            
                    default                             :    

                }
                switch ( document.getElementById('gameDetailsTitle').innerText ) {

                    case 'Start Public Match'           :   json["PublicMatch"] = "Y";
                                                            break;
                    default                             :
                    
                }

                switch ( document.getElementById('maxGames').value ) {

                    case 'Match of 1 game'  :   json["MaxPlay"] = 'GM1';
                                                break;
                    case 'Match of 4 games' :   json["MaxPlay"] = 'GM4';
                                                break;
                    case 'Match of 6 games'  :  json["MaxPlay"] = 'GM6';
                                                break;
                    case 'Match of 8 games'  :  json["MaxPlay"] = 'GM8';
                                                break;
                    case 'Match of 12 games' :  json["MaxPlay"] = 'GM12';
                                                break;
                    case 'Match of 16 games' :  json["MaxPlay"] = 'GM16';
                                                break;
                    case 'Match of 18 games' :  json["MaxPlay"] = 'GM18';
                                                break;
                    case 'Match of 20 games' :  json["MaxPlay"] = 'GM20';
                                                break;
                    case 'Match of 24 games' :  json["MaxPlay"] = 'GM24';
                                                break;
                    case 'Match of 30 games' :  json["MaxPlay"] = 'GM30';
                                                break;
                    case 'Match of 32 games' :  json["MaxPlay"] = 'GM32';
                                                break;
                    case 'Match of 36 games' :  json["MaxPlay"] = 'GM36';
                                                break;
                    case 'Match of 40 games' :  json["MaxPlay"] = 'GM40';
                                                break;
                    case 'Match of 48 games' :  json["MaxPlay"] = 'GM48';
                                                break;

                    case 'Match with target 25 points'  :   json["MaxPlay"] = 'PT25';
                                                            break;
                    case 'Match with target 50 points'  :   json["MaxPlay"] = 'PT50';
                                                            break;
                    case 'Match with target 75 points'  :   json["MaxPlay"] = 'PT75';
                                                            break;
                    case 'Match with target 100 points' :   json["MaxPlay"] = 'PT100';
                                                            break;
                                                
                                                
                    default :    

                }


                states.setProcessCommandValues(values => ({...values, 
                    GroupID: states.ProcessCommandValues.GroupID, 
                    MatchID: '',
                    ChairNo: e.target.parentNode.parentNode.firstChild.lastChild.innerText,
                    EnableAllPass: json["EnableAllPass"],
                    EnforceFollowSuit: states.PossibleValues.Defaults.EnforceFollowSuit,
                    GameRules: json["GameRules"],
                    MaxPlay : json["MaxPlay"],
                    NumberOfPlayers: json["NumberOfPlayers"],
                    PlayerLevel: json["PlayerLevel"],
                    ShowGamePoints: json["ShowGamePoints"],
                    ShowRemainingPoints: json["ShowRemainingPoints"],
                    PublicMatch: json["PublicMatch"],
                    GameDetailsPopupEnd: Math.random()

                }));



            }        


        }


    }



    React.useEffect(() => {

        // console.log(states.ProcessCommandValues);
        
        // runs when join/watch is clicked, below code also won't run in initial render
        if (states.ProcessCommandValues.GameDetailsPopupEnd !== 'init') {

            console.log('popupwindow close');


            try {

                document.getElementById('adContent').style.height = 'calc( 40% - 60px) ';
                document.getElementById('adContent').lastChild.style.height = 'calc( 40% - 60px) '
                document.getElementById('adContent').lastChild.firstChild.style.height = 'calc( 40% - 60px) '
                document.getElementById('adContent').lastChild.firstChild.firstChild.style.height = 'calc( 40% - 60px) '
                document.getElementById('adContent').lastChild.firstChild.firstChild.firstChild.style.height = 'calc( 40% - 60px) '
        
                switch ( document.getElementById('gameDetailsTitle').innerText ) {

                    case 'Start Public Match'   :
                    case 'New Table'            :
                                                    // commandCalls( ["CreateMatch", "TakeChairInTable", "GetMatchState"], states);
                                                    console.log('commandCalls',  ["CreateMatch","TakeChairInTable", "GetMatchState"]);
                                                    break;
                    default                     :
                                                    //if user already in match no need to call TakeChairInTable
                                                    if ( states.ProcessCommandValues.MyMatch == 'Y' ) {                                               
                                                        // commandCalls( ["GetMatchState"], states);
                                                        console.log('commandCalls at join',  ["GetMatchState"]);
                                                    }
                                                    else {
                                                        // commandCalls( ["TakeChairInTable", "GetMatchState"], states);
                                                        console.log('commandCalls at join',  ["TakeChairInTable", "GetMatchState"]);
                                                    }

                }
        
                moveToGameScreen(states);
                console.log('moved to gamescreen')
                handlers.closeGameDetailsPopup();
            }
        
            catch {
                document.getElementById('adContent').style.height = 'calc( 100vh - 60px) ';
                alert('Please enable ads and then refresh to continue!!');
            }
            



           

            // pushChairsToState(states);

        }
       

        
    // }, [states.ProcessCommandValues]);
    }, [states.ProcessCommandValues.GameDetailsPopupEnd]);

    React.useEffect(() => {
        
        if (states.CurrentPage == 'gameScreen'){
            console.log('hit at gameScreenpuchchair');
            pushChairsToState(states);
        }
            // pushChairsToState(states);

    }, [states.MatchState]);



    return (
        <GameDetailsContainer id="gameDetails">
            <GameDetailsContainerWrapper id="gameDetailsWrapper">
            <GameDetailsHeader>
                <GameDetailsTitle id="gameDetailsTitle">
                    New Public Match
                </GameDetailsTitle>

                <GameDetailsAdmin id="gameDetailsMatchAdmin"></GameDetailsAdmin>

                <GameDetailsIcons id="gameDetailsIcons">
                    <Icon id="saveButton" onClick={e => handlers.gameDetailsIconHandler(e) } bg={'others/save-solid.svg'} />
                    <Icon id="deleteButton" onClick={e => handlers.gameDetailsIconHandler(e) } bg={'others/trash-solid.svg'} />
                    <Icon id="resetButton" onClick={e => handlers.gameDetailsIconHandler(e) } bg={'others/reset-solid.svg'} />
                    <Icon id="copyLinkButton" onClick={e => handlers.gameDetailsIconHandler(e) } bg={'others/copy-solid.svg'} />
                </GameDetailsIcons>
            </GameDetailsHeader>
            
            <GameDetailsContent>
                <GameDetailsSheet1>

                    <GameDetailsItem>
                        <GameDetailsLabel>Player Level</GameDetailsLabel>
                        <GameDetailsSelect className="matchDetailsItem" id="playerLevel">
                       
                            {Object.keys(states.PossibleValues.ListOfValues.PlayerLevel).map((item1) => (
	
                                Object.keys(states.PossibleValues.ListOfValues.PlayerLevel[item1]).map((item2) => (
                                    // <p>{console.log(states.PossibleValues.ListOfValues.PlayerLevel[item1][item2])}</p>
                                    <option key={Object.keys(states.PossibleValues.ListOfValues.PlayerLevel)}>{states.PossibleValues.ListOfValues.PlayerLevel[item1][item2]}</option>
                                ))
                            ))}

                            {/* <option>Beginner</option> */}
                        </GameDetailsSelect>
                    </GameDetailsItem>

                    <GameDetailsItem>
                        <GameDetailsLabel>Max Games / Points</GameDetailsLabel>
                        <GameDetailsSelect className="matchDetailsItem" id="maxGames">

                            {/* <option>Match of 12 games</option> */}
                        </GameDetailsSelect>
                    </GameDetailsItem>
                    
                    <GameDetailsItem>
                        <GameDetailsLabel>Game Rules</GameDetailsLabel>
                        <GameDetailsSelect className="matchDetailsItem" id="gameRules">

                            {Object.keys(states.PossibleValues.ListOfValues.GameRules).map((item1) => (
	
                                Object.keys(states.PossibleValues.ListOfValues.GameRules[item1]).map((item2) => (
                                    // <p>{console.log(states.PossibleValues.ListOfValues.PlayerLevel[item1][item2])}</p>
                                    <option  key={Object.keys(states.PossibleValues.ListOfValues.GameRules)}>{states.PossibleValues.ListOfValues.GameRules[item1][item2]}</option>
                                ))
                            ))}

                            {/* <option>Show</option> */}
                        </GameDetailsSelect>
                    </GameDetailsItem>

                    <GameDetailsItem>
                        <GameDetailsLabel>Game Points</GameDetailsLabel>
                        <GameDetailsSelect className="matchDetailsItem" id="gamePoints">

                            {Object.keys(states.PossibleValues.ListOfValues.ShowGamePoints).map((item1) => (
	
                                Object.keys(states.PossibleValues.ListOfValues.ShowGamePoints[item1]).map((item2) => (
                                    // <p>{console.log(states.PossibleValues.ListOfValues.PlayerLevel[item1][item2])}</p>
                                    <option  key={Object.keys(states.PossibleValues.ListOfValues.ShowGamePoints)}>{states.PossibleValues.ListOfValues.ShowGamePoints[item1][item2]}</option>
                                ))
                            ))}

                            {/* <option>Show</option> */}
                        </GameDetailsSelect>
                    </GameDetailsItem>

                    <GameDetailsItem>
                        <GameDetailsLabel>Remaining Points</GameDetailsLabel>
                        <GameDetailsSelect className="matchDetailsItem" id="remainingPoints">

                            {Object.keys(states.PossibleValues.ListOfValues.ShowRemainingPoints).map((item1) => (
	
                                Object.keys(states.PossibleValues.ListOfValues.ShowRemainingPoints[item1]).map((item2) => (
                                    // <p>{console.log(states.PossibleValues.ListOfValues.PlayerLevel[item1][item2])}</p>
                                    <option  key={Object.keys(states.PossibleValues.ListOfValues.ShowRemainingPoints)} >{states.PossibleValues.ListOfValues.ShowRemainingPoints[item1][item2]}</option>
                                ))
                            ))}

                            {/* <option>Show</option> */}
                        </GameDetailsSelect>
                    </GameDetailsItem>

                    <GameDetailsItem>
                        <GameDetailsLabel>All Pass</GameDetailsLabel>
                        <GameDetailsSelect className="matchDetailsItem" id="allPass">

                            {Object.keys(states.PossibleValues.ListOfValues.EnableAllPass).map((item1) => (
	
                                Object.keys(states.PossibleValues.ListOfValues.EnableAllPass[item1]).map((item2) => (
                                    // <p>{console.log(states.PossibleValues.ListOfValues.PlayerLevel[item1][item2])}</p>
                                    <option  key={Object.keys(states.PossibleValues.ListOfValues.EnableAllPass)} >{states.PossibleValues.ListOfValues.EnableAllPass[item1][item2]}</option>
                                ))
                            ))}

                            {/* <option>Disabled</option> */}
                        </GameDetailsSelect>
                    </GameDetailsItem>

                    <GameDetailsItem>
                        <GameDetailsLabel>Number of Players</GameDetailsLabel>
                        <GameDetailsSelect onChange={() => maxGamesEvent(states, 'popupClick')} className="matchDetailsItem" id="numberOfPlayers">

                            {Object.keys(states.PossibleValues.ListOfValues.NumberOfPlayers).map((item1) => (
	
                                Object.keys(states.PossibleValues.ListOfValues.NumberOfPlayers[item1]).map((item2) => (
                                    // <p>{console.log(states.PossibleValues.ListOfValues.PlayerLevel[item1][item2])}</p>
                                    <option key={Object.keys(states.PossibleValues.ListOfValues.NumberOfPlayers)} >{states.PossibleValues.ListOfValues.NumberOfPlayers[item1][item2]}</option>
                                ))
                            ))}

                            {/* <option>8 players with 8 cards each</option> */}
                        </GameDetailsSelect>
                    </GameDetailsItem>

                    {/* <GameDetailsItem>
                        <GameDetailsLabel>Match Admin</GameDetailsLabel>
                        <GameDetailsSelect className="matchDetailsItem" id="matchAdmin">
                            <option>rohith8194</option>
                        </GameDetailsSelect>
                    </GameDetailsItem> */}
                    
                
                </GameDetailsSheet1>
                
                <GameDetailsSheet2>

                    <GameDetailsTable>
                        <GameDetailsTableHeading>
                            <TableHeadingItem>Chair No</TableHeadingItem>
                            <TableHeadingItem>Chair Status</TableHeadingItem>
                            <TableHeadingItem>Action</TableHeadingItem>
                        </GameDetailsTableHeading>

                        {/* {Object.keys(states.MatchState.Chairs).map((item) => ( */}

                        {/* {sortChairsMatchState()} */}

                        {states.PopupChairs.map((item) => (
                            // console.log(states.MatchState.Chairs[item])
                            // <ChairPopup key={item.ChairNo} bg={(item.ChairNo % 2) == 0 ? '#F0F0F0' : '#E0E0E0' } chairInfo={states.MatchState.Chairs[item]} detailsTableItemClick={detailsTableItemClick} />
                            <ChairPopup key={item.ChairNo} bg={(item.ChairNo % 2) == 0 ? '#F0F0F0' : '#E0E0E0' } chairInfo={item} states={states} handlers={{detailsTableItemClick, actionGameDetailsPopup}} />

                        ))}

                
                    </GameDetailsTable>

                </GameDetailsSheet2>

            </GameDetailsContent>
    
                <GameDetailsFooter>
                    <GameDetailsFooterButton onClick={() => handlers.closeGameDetailsPopup()} float={'left'} bg={'#808080'} >Cancel</GameDetailsFooterButton>
                    {/* <GameDetailsFooterButton onClick={() => actionGameDetailsPopup()} float={'right'} bg={'#373737'}>Next</GameDetailsFooterButton> */}
                </GameDetailsFooter>

            </GameDetailsContainerWrapper>
        </GameDetailsContainer>
    )
}

const GameDetailsContainer = styled.div`

    @media (max-width: 480px) {
        height: 620px;
        width: 320px;
        top: calc( (100vh - 620px) / 2 );
        left: calc( (100vw - 320px) / 2 );
    }
    @media (min-width: 481px) and (max-width: 720px) {
        height: 600px;
        width: 480px;
        top: calc( (100vh - 600px) / 2 );
        left: calc( (100vw - 480px) / 2 );
    }
    @media (min-width: 721px) and (max-width: 991px) {
        height: 600px;
        width: 90%;
        top: calc( (100vh - 600px) / 2 );
        left: calc( (100vw - 90%) / 2 );
    }
    @media (min-width: 992px) {
        height: 600px;
        width: 900px;
        top: calc( (100vh - 600px) / 2 );
        left: calc( (100vw - 900px) / 2 );
    }

    display: none;
    background-color: white;
    // height: 600px;
    // width: 900px;
    position: fixed;
    // top: calc( (100vh - 600px) / 2 );
    // left: calc( (100vw - 900px) / 2 );
    z-index: 2;
    // color: #808080;
`

const GameDetailsContainerWrapper = styled.div`
    height: 100%;
    width: 100%;
`

const GameDetailsHeader = styled.div`
    // background-color: red;
    // height: 15%;

    @media (max-width: 480px) {
        height: 20%;
    }
    @media (min-width: 481px) and (max-width: 720px) {
        height: 30%;
    }
    @media (min-width: 721px) and (max-width: 991px) {
        height: 15%;
    }
    @media (min-width: 992px) {
        height: 15%;
    }

    width: 100%;
    display: flex;
    flex-wrap: wrap;
    position: relative;
`

const GameDetailsTitle = styled.div`
    // background-color: purple;
    // height: 100%;
    // width: 40%;

    @media (max-width: 480px) {
        height: 50%;
        width: 60%;
    }
    @media (min-width: 481px) and (max-width: 720px) {
        height: 50%;
        width: 60%;
    }
    @media (min-width: 721px) and (max-width: 991px) {
        height: 100%;
        width: 40%;
    }
    @media (min-width: 992px) {
        height: 100%;
        width: 40%;
    }

    // float: left;
    display: flexbox;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    font-weight: 600;
    color: #373737;
    // position: absolute;
    // left: 0;
`

const GameDetailsIcons = styled.div`
    // background-color: blue;
    // height: 100%;
    // width: 30%;

    @media (max-width: 480px) {
        height: 50%;
        width: 100%;
    }
    @media (min-width: 481px) and (max-width: 720px) {
        height: 50%;
        width: 100%;
    }
    @media (min-width: 721px) and (max-width: 991px) {
        height: 100%;
        width: 40%;
    }
    @media (min-width: 992px) {
        height: 100%;
        width: 40%;
    }

    // float: right;
    display: flexbox;
    flex-wrap: wrap;
    // position: absolute;
    // right: 0;
    display: none;
`

const GameDetailsAdmin = styled.div`
    // height: 100%;
    // width: 30%;

    @media (max-width: 480px) {
        height: 50%;
        width: 40%;
    }
    @media (min-width: 481px) and (max-width: 720px) {
        height: 50%;
        width: 40%;
    }
    @media (min-width: 721px) and (max-width: 991px) {
        height: 100%;
        width: 20%;
    }
    @media (min-width: 992px) {
        height: 100%;
        width: 20%;
    }

    // background-color: red;
    // float: right;
    font-size: 16px;
    font-weight: 600;
    color: #373737;
    display: flex;
    justify-content: center;
    align-items: center;
    // position: absolute;
    // right: 25%;
`

const Icon = styled.div`
    background: url(${props => props.bg});
    height: 100%;
    width: 20%;
    margin-left: 4%;
    background-repeat: no-repeat;
    background-position: center;

    @media (max-width: 480px) {
        background-size: 40%;
    }
    @media (min-width: 481px) and (max-width: 720px) {
        background-size: 40%;
    }
    @media (min-width: 721px) and (max-width: 991px) {
        background-size: 40%;
    }
    @media (min-width: 992px) {
        background-size: 40%;
    }

    // background-size: 50%;
    cursor: pointer;
`

const GameDetailsContent = styled.div`
    // background-color: green;
    // height: 70%;

    @media (max-width: 480px) {
        height: 65%;
    }
    @media (min-width: 481px) and (max-width: 720px) {
        height: 55%;
    }
    @media (min-width: 721px) and (max-width: 991px) {
        height: 70%;
    }
    @media (min-width: 992px) {
        height: 70%;
    }

    width: 100%;
    display: flexbox;
    flex-wrap: wrap;
    overflow-y: scroll;
`

const GameDetailsSheet1 = styled.div`
    // background-color: green;
    height: 100%;
    // width: 50%;

    @media (max-width: 480px) {
        width: 100%;
    }
    @media (min-width: 481px) and (max-width: 720px) {
        width: 100%;
    }
    @media (min-width: 721px) and (max-width: 991px) {
        width: 50%;
    }
    @media (min-width: 992px) {
        width: 50%;
    }

    display: flex;
    flex-wrap: wrap;
`

const GameDetailsItem = styled.div`
    // height: 9%;
    width: 90%;

    @media (max-width: 480px) {
        height: 13%;
        margin-top: 0%;
    }
    @media (min-width: 481px) and (max-width: 720px) {
        height: 9%;
        margin-top: 3%;
    }
    @media (min-width: 721px) and (max-width: 991px) {
        height: 9%;
        margin-top: 3%;
    }
    @media (min-width: 992px) {
        height: 9%;
        margin-top: 3%;
    }

    display: flexbox;
    flex-wrap: wrap;
    position: relative;
    left: 5%;
    // margin-top: 3%;
`

const GameDetailsLabel = styled.div`
    // height: 100%;

    @media (max-width: 480px) {
        height: 50%;
        width: 100%
    }
    @media (min-width: 481px) and (max-width: 720px) {
        height: 100%;
        width: 40%;
    }
    @media (min-width: 721px) and (max-width: 991px) {
        height: 100%;
        width: 40%;
    }
    @media (min-width: 992px) {
        height: 100%;
        width: 40%;
    }

    // width: 40%;
    display: flexbox;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    color: #373737;
`

const GameDetailsSelect = styled.select`
    // height: 100%;
    // width: 60%;

    @media (max-width: 480px) {
        width: 100%;
        height: 50%;
    }
    @media (min-width: 481px) and (max-width: 720px) {
        width: 225px;
        height: 100%;
    }
    @media (min-width: 721px) and (max-width: 991px) {
        width: 170px;
        height: 100%;
    }
    @media (min-width: 992px) {
        width: 230px;
        height: 100%;
    }


    font-size: 14px;
    border: 1px solid gray;
    outline: none;
    padding-left: 10px;
    font-size: 14px;
    border-radius: 5px;
    // -moz-appearance:none;

`

const GameDetailsSheet2 = styled.div`
    // background-color: limegreen;
    height: 100%;
    // width: 50%;

    @media (max-width: 480px) {
        width: 100%;
    }
    @media (min-width: 481px) and (max-width: 720px) {
        width: 100%;
    }
    @media (min-width: 721px) and (max-width: 991px) {
        width: 50%;
    }
    @media (min-width: 992px) {
        width: 50%;
    }

    display: flex;
    justify-content: center;
    align-items: center;
`

const GameDetailsTable = styled.div`
    // background-color: green;
    height: 95%;
    width: 90%;
`

const GameDetailsTableHeading = styled.div`
    background-color: black;
    height: 12%;
    width: 100%;
    color: white;
    display: flexbox;
    flex-wrap: wrap;
`

const TableHeadingItem = styled.div`
    height: 100%;
    width : 33.33%;
    display: flexbox;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
`

// const GameDetailsTableItem = styled.div`
//     background-color: ${props => props.bg};
//     height: 11%;
//     width: 100%;
//     color: #373737;
//     display: flexbox;
//     flex-wrap: wrap;
// `

// const TableItem = styled.div`
//     height: 100%;
//     width: 33.33%;
//     display: flexbox;
//     justify-content: center;
//     align-items: center;
//     font-size: 16px;
//     font-weight: 600;
// `

// const ChairIcon = styled.div`
//     height: 100%;
//     width: 35px;
//     background: url(others/chair-solid.svg);
//     background-repeat: no-repeat;
//     background-position: center;
//     background-size: 50%;
// `

// const ChairNumber = styled.div`
//     height: 30px;
//     width: 30px;
//     border: 2px solid #808080;
//     border-radius: 50%;
//     display: flexbox;
//     justify-content: center;
//     align-items: center;
// `

// const TableItemButton = styled.div`
//     height: 75%;
//     width: 60%;
//     background-color: black;
//     color: white;
//     font-size: 14px;
//     border-radius: 5px;
//     display: flexbox;
//     justify-content: center;
//     align-items: center;
//     cursor: pointer;

//     // &:hover {
//     //     background-color: #606060;
//     //     transition: 0.3s;
//     // }

// `

const GameDetailsFooter = styled.div`
    // background-color: blue;
    height: 15%;
    width: 100%;
`

const GameDetailsFooterButton = styled.a`
    background-color: ${props => props.bg};
    height: 60%;
    // width: 15%;

    @media (max-width: 480px) {
        width: 40%;
    }
    @media (min-width: 481px) and (max-width: 720px) {
        width: 40%;
    }
    @media (min-width: 721px) and (max-width: 991px) {
        width: 15%;
    }
    @media (min-width: 992px) {
        width: 15%;
    }

    
    color: white;
    display: flexbox;
    align-items: center;
    justify-content: center;
    float: ${props => props.float};
    top: 15%;
    position: relative;
    // below line makes sure button at left is 2% from left, on right is 2% from right
    ${props => props.float}: 5%;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
`

export default GameDetailsPopup
