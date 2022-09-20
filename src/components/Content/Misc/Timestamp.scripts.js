import React from 'react';
import {sortTables} from '../GameContent/GameTables/GameTables.scripts'
import { moveToHomepage, moveToGameScreen } from '../../../App.scripts'


var refreshUrl = 'https://www.56cardgameonline.com/56game/get_tables.php';
var timestampUrl = 'https://www.56cardgameonline.com/newdesign/api/get_timestamp.php';

// var currentTimestamp = getTimestamp(timestampUrl);
var currentTimestamp;
var newTimestamp;
var flagTS = 0;

var userId = "";
var csrf = "";
var returnCode;
var tries = 0;
var prevCommand1 = "";
var prevCommand2 = "";
var prevCommand3 = "";

var matchId ="";
var interval;
var refreshCallsArray = [];
// test code start

export const startGetTimestampLoop = (states) => {

    interval = setInterval(() => {

        // getTimestamp(states);
        // console.log('getTimestamp call')
     
    }, 1.5 * 1000);

}

export const stopGetTimestampLoop = () => {

    clearInterval(interval);

}

// test code end

export const getTimestamp = ( states) => {

    fetch(timestampUrl).then(function (response) {
            // The API call was successful!
            return response.json();
        }).then(function (data) {
            // This is the JSON from our response
            //console.log(data);
            // return data;

            if (!flagTS) {
                currentTimestamp = data;
                newTimestamp = data;
                flagTS = 1;

                console.log('commandCalls' , ["Register", "GetMenu", "GetTables", "GetPossibleValues", "GetDeckCards"]);                
                commandCalls( ["Register", "GetMenu", "GetTables", "GetPossibleValues", "GetDeckCards"], states);

            }
            

            newTimestamp = data;

            if ( currentTimestamp["aets"] < newTimestamp["aets"] ) {

                currentTimestamp = newTimestamp;
                
                console.log(states)

                switch ( states.CurrentPage ) {

                case 'homepage'     :
                                        if ( document.getElementById('gameDetails').style.display !== 'block' ) {
                                            console.log('commandCalls' , ["GetTables"]);
                                            commandCalls( ["GetTables"], states);
                                        }
                                        else {
                                            console.log('commandCalls', ["GetMatchState"]);
                                            commandCalls( ["GetMatchState"], states);
                                        }
                                        break;
                case 'gameScreen'   :
                                        console.log('commandCalls', ["GetMatchState"]);
                                        commandCalls( ["GetMatchState"], states);
                                        break;
                default:
                }
            }

        }).catch(function (err) {
            // There was an error
            console.warn('Something went wrong.', err);
    });

}




export const commandCalls = ( commandArray, states) => {

    // stopGetTimestampLoop();

	asyncCall( commandArray, states).catch(e => {
	
		if ( ++tries < 10 )
			commandCalls( commandArray, states);

	});

}

const asyncCall = async ( commandArray, states) => {

	let result;
    let prevCall;

    //keep popping things in commandArray from beginning till everything is called
	while ( commandArray.length > 0 ) {
	
		result = await processCommandJsonGenerator( commandArray[0], states);
		console.log(result);
        console.log(states);

        if ( commandArray[0] == 'GetMatchState' ) {
            states.setProcessCommandValues(values => ({
                ...values,
                LastRefreshTimestamp: currentTimestamp["aets"]
            }))
        }

		//below commands pops item from beginning of array
		commandArray.shift();

        // if ( commandArray.length == 1 )
            // prevCall = commandArray[0];
	}

    // startGetTimestampLoop(states);
    // setTimeout(() => {
    //     console.log('timed out states' + states)
    // }, 1000)
    // if ( prevCall == 'GetMatchState' ) {
    //     states.setProcessCommandValues(values => ({
    //         ...values,
    //         LastRefreshTimestamp: currentTimestamp["aets"]
    //     }))
    // }

}
//test code end



const processCommandAPI = ( command, processCommandJson, states) => {

	return new Promise(( resolve, reject) => {

		fetch('https://www.56cardgameonline.com/newdesign/api/process_command.php', {
    			method: 'POST', // or 'PUT'
    			headers: {
        			'Content-Type': 'application/json',
    				},
    			body: JSON.stringify( processCommandJson ),
			})
			.then(response => response.text())
			.then(data => {

                // updateAuthentication( command, data, states);

    				let json = {"userId": "", "csrf": "", "returnCode": 0}

			    	json.userId = JSON.parse(data).Control.UserID;
    				json.csrf = JSON.parse(data).Control.CSRF;
    				json.returnCode = JSON.parse(data).Control.returnCode;

    				// states.setProcessCommandValues(values => ({
        			// 	...values,
        			// 	userId      :   JSON.parse(data).Control.UserID,
        			// 	csrf        :   JSON.parse(data).Control.CSRF,
        			// 	returnCode  :   JSON.parse(data).Control.returnCode
    				// }));

                    userId = JSON.parse(data).Control.UserID;
    				csrf = JSON.parse(data).Control.CSRF;

    				console.log('Success:', JSON.parse(data), json.userId, json.csrf, json.returnCode);

    				if( json.returnCode == 0 ) {

        				switch( command ) {

            				case "Register" :   
                                                // app initialization, move to game if you were already part of a game
                                                // states.setCurrentPage( JSON.parse(data).Control.CurrentPage );
                                                states.setProcessCommandValues(values => ({
                                                    ...values,
                                                    GroupID: JSON.parse(data).GroupID,
                                                    MatchID: JSON.parse(data).MatchID,
                                                    CurrentPageTS: 'firstCall'
                                                }))

                                                // below code is to make sure adContent space is reduced
                                                if ( JSON.parse(data).Control.CurrentPage == 'gameScreen' )
                                                    setTimeout(() => moveToGameScreen(states), 1500)

                                                // timeout is given because the above setState functions are async
                                                // setTimeout(() => { 
                                                //     if ( JSON.parse(data).Control.CurrentPage == 'gameScreen' )
                                                //         commandCalls( ["GetMatchState"], states);
                                                // }, 300);

	                               				break;
            				case "GetMenu"  :   
                                                var menuJson = [];
                                				Object.keys(JSON.parse(data).Menu).forEach((item) => {
                                    					menuJson.push(JSON.parse(data).Menu[item])
                                				});
                                				states.setSideNavItems(menuJson);
                                				// processCommandAPI( "GetTables", states);
                                				break;
            				case "GetTables":   
                                				var tableJson = {};
                                				tableJson = JSON.parse(data).HomeTiles;
                                				sortTables( tableJson, states.setTableContent);
                                				break;

            				case "GetPossibleValues"    :   
                                            				states.setPossibleValues( JSON.parse(data).Output );
                                            				break;
            				case "CreateMatch"          :   // capture matchid and add it to state
                                            				let matchID = JSON.parse(data).Output.MatchID;
                                                            matchId = JSON.parse(data).Output.MatchID;
                                            				states.setProcessCommandValues(values => ({
                                                				...values,
                                                				MatchID: matchID
                                            				}))
                                            				break;

            				case "TakeChairInMatch"     :   // do nothing
                                            				break;

                            case "GetDeckCards"         :   // update card deck
                                                            states.setCardDeck( JSON.parse(data).CardDeck );
                                            				break;

            				case "GetMatchState"        :   // capture match details, rules, add it to state
                                            				states.setMatchState( JSON.parse(data).MatchState );

                                                            refreshCallsArray = [];
                                                            Object.keys( JSON.parse(data).MatchState.RefreshCalls ).forEach(item => refreshCallsArray.push( JSON.parse(data).MatchState.RefreshCalls[item] ));
                                                            
                                                            setTimeout(() => {
                                                                states.setProcessCommandValues(values => ({
                                                                    ...values,
                                                                    RefreshCallsArray: refreshCallsArray
                                                                }))
                                                            }, JSON.parse(data).MatchState.MinimumWaitSeconds * 1000 );
                                                            // commandCalls( refreshCallsArray, states);

                                                            // states.setProcessCommandValues(values => ({
                                                            //     ...values,
                                                            //     LastRefreshTimestamp: currentTimestamp["aets"]
                                                            // }))

                                            				break;

                            case "FoldDiscardedCars"    :   // do nothing
                                                            break;

                            case "GetMatchScoreBoard"   :   // update matchScoreboard
                                                            states.setMatchScoreboard( JSON.parse(data).ScoreBoard );
                                                            break;                                

                            case "PlayerLeaveMatch"     :
                                                            document.getElementById('confirmationMessage').innerHTML = 'Match left successfully!!';
                                                            document.getElementById('noButtonConfirmation').style.display = 'none'; 
                                                            document.getElementById('yesButtonConfirmation').style.display = 'none'; 
                                                            document.getElementById('okButtonConfirmation').style.display = 'flex'; 
                                                            
                                                            document.getElementById('popupConfirmation').style.display = 'block';
                                                            document.getElementById('container').style.opacity = '0.5'; 
                                                            
                                                            moveToHomepage(states);
                                                            console.log('move to homepage');

                                                            setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
                                                            break;

                            case "StartNewGame"         :   // do nothing                                                            
                                                            break;    
                                                            
                            case "CallBiddingKeyboard"  :   // update BiddingKeyboardValues
                                                            states.setBiddingKeyboardValues( JSON.parse(data).Keyboard );
                                                            break;                                

                            case "ResetMatch"           :   
                                                            document.getElementById('confirmationMessage').innerHTML = 'Match reset successfully!!';
                                                            document.getElementById('noButtonConfirmation').style.display = 'none'; 
                                                            document.getElementById('yesButtonConfirmation').style.display = 'none'; 
                                                            document.getElementById('okButtonConfirmation').style.display = 'flex'; 
                                                            
                                                            document.getElementById('popupConfirmation').style.display = 'block';
                                                            document.getElementById('gameDetailsWrapper').style.opacity = 0.5;
                                                            break;

                            case "GetCurrentPlayerHand" :   // update CurrentPlayerHand
                                                            states.setCurrentPlayerHand( JSON.parse(data).CurrentPlayerHand );
                                                            break;

                            case "GetDiscardCards"      :   // update DiscardCards
                                                            states.setDiscardCards( JSON.parse(data).DiscardCards );
                                                            break;

                            case "GetListWatchers"      :   // update ListWatchers
                                                            break;

                            case "ChangeMatch"          :
                                                            document.getElementById('confirmationMessage').innerHTML = 'Match settings changed successfully!!';
                                                            document.getElementById('noButtonConfirmation').style.display = 'none'; 
                                                            document.getElementById('yesButtonConfirmation').style.display = 'none'; 
                                                            document.getElementById('okButtonConfirmation').style.display = 'flex'; 
                                                            
                                                            document.getElementById('popupConfirmation').style.display = 'block';
                                                            document.getElementById('gameDetailsWrapper').style.opacity = 0.5;

                                                            

                                                            document.getElementById('gameDetails').style.display= 'none';
                                                            document.getElementById('container').style.opacity = '1';

                                                            break;

                            case "DeleteMatch"          :
                                                            document.getElementById('confirmationMessage').innerHTML = 'Match deleted successfully!!';
                                                            document.getElementById('noButtonConfirmation').style.display = 'none'; 
                                                            document.getElementById('yesButtonConfirmation').style.display = 'none'; 
                                                            document.getElementById('okButtonConfirmation').style.display = 'flex'; 
                                                            
                                                            document.getElementById('popupConfirmation').style.display = 'block';
                                                            document.getElementById('gameDetailsWrapper').style.opacity = 0.5;
                                                            moveToHomepage(states);
                                                            console.log('move to homepage');

                                                            document.getElementById('gameDetails').style.display= 'none';
                                                            document.getElementById('container').style.opacity = '1';
                                                            break;

                            case "KickOutPlayer"        :
                                                            document.getElementById('confirmationMessage').innerHTML = 'Player kicked out successfully!!';
                                                            document.getElementById('noButtonConfirmation').style.display = 'none'; 
                                                            document.getElementById('yesButtonConfirmation').style.display = 'none'; 
                                                            document.getElementById('okButtonConfirmation').style.display = 'flex'; 
                                                            
                                                            document.getElementById('popupConfirmation').style.display = 'block';
                                                            document.getElementById('gameDetailsWrapper').style.opacity = 0.5;
                                                            break;

                            case 'PlayCard'             :   // do nothing;
                                                            break;
					
					default			    :
                        
        			}

				resolve('pcCallSuccess ' + command);

    			}

    			else {
        			console.log(tries + ' tries');

                    //switching through error return codeds
                    switch( json.returnCode ) {

                        case 126    :
                                        // invalid match, go to gameScreen
                                        moveToHomepage(states);
                                        console.log('move to homepage');

                                        break;
                        case 9999   :
                        case 9996   :
                                        // invalid session, go to login screen
                                        window.location.href = "https://www.56cardgameonline.com/newdesign/api/login.php";
                                        // window.location.href = "https://www.56cardgameonline.com/56game/56gamelogin.php";
                                        break;
                        default     :
                        
                    }

                    if ( ++tries < 10)
    				    reject({ "command": command, "states": states});
                    else
                        resolve('pcCallFailed');
 
    			}
    
    		})
    		.catch((error) => {
        		console.error('Error:', error);
			    reject({ "commandArray": command, "states": states});
    		});

	});

}

export const processCommandJsonGenerator = ( command, states) => {

    console.log('at processCommandJsonGen ' + command + " ");
    console.log(states);

    // if previousCommand2 is CreateMatch  don't enter
    // if previousCommand1 is CreateMatch and previousCommand2 is TakeChair don't enter
    // please note that unlike CreateMatch, ChangeMatch doesn't need the below sync code since 
    // MatchState gives the correct MatchID initially itself unlike CreateMatch, where it's generated
    // when CreateMatch is called

    // if ( ! ( (prevCommand2 == "CreateMatch") || ( ( prevCommand1 == "CreateMatch" ) && ( prevCommand2 == "TakeChairInTable" ) ) ) )
    //     matchId = states.ProcessCommandValues.MatchID;


    // prevCommand1 = prevCommand2;
    // prevCommand2 = command;



    if ( ! ( (prevCommand3 == "CreateMatch") || ( ( prevCommand2 == "CreateMatch" ) && ( prevCommand3 == "TakeChairInTable" ) ) || ( ( prevCommand1 == "CreateMatch" ) && ( prevCommand2 == "TakeChairInTable" ) && ( prevCommand3 == "GetMatchState" ) ) ) )
        matchId = states.ProcessCommandValues.MatchID;

        console.log("matchid " + matchId);

    //prevCommand3 is the latest prevCall, prevCommand1 is the oldest
    prevCommand2 = prevCommand3;
    prevCommand1 = prevCommand2;
    prevCommand3 = command;

    var processCommandJson = {
                                "Control": {
                                "UserID": userId,
                                "CSRF": csrf,
                                "Command": command,
                                "Comment": null,
                                "returnCode": null,
                                "CurrentPage": states.CurrentPage
                                }
                            }

    switch(command) {

        case 'CreateMatch'      :
                                    processCommandJson["Parameters"]                        = {};
                                    processCommandJson["Parameters"]["GroupID"]             = states.ProcessCommandValues.GroupID;
                                    processCommandJson["Parameters"]["MatchID"]             = states.ProcessCommandValues.MatchID;
                                    processCommandJson["Parameters"]["AllowedHelpLevel"]    = states.ProcessCommandValues.AllowedHelpLevel;
                                    processCommandJson["Parameters"]["MaxPlay"]             = states.ProcessCommandValues.MaxPlay;
                                    processCommandJson["Parameters"]["NumberOfPlayers"]     = states.ProcessCommandValues.NumberOfPlayers;
                                    processCommandJson["Parameters"]["GameRules"]           = states.ProcessCommandValues.GameRules;
                                    processCommandJson["Parameters"]["PlayerLevel"]         = states.ProcessCommandValues.PlayerLevel;
                                    processCommandJson["Parameters"]["EnforceFollowSuit"]   = states.ProcessCommandValues.EnforceFollowSuit;
                                    processCommandJson["Parameters"]["ShowGamePoints"]      = states.ProcessCommandValues.ShowGamePoints;
                                    processCommandJson["Parameters"]["ShowRemainingPoints"] = states.ProcessCommandValues.ShowRemainingPoints;
                                    processCommandJson["Parameters"]["EnableAllPass"]       = states.ProcessCommandValues.EnableAllPass;
                                    processCommandJson["Parameters"]["PublicMatch"]         = states.ProcessCommandValues.PublicMatch;
                                    break;

        case 'TakeChairInTable' :   
                                    processCommandJson["Parameters"]                        = {};
                                    processCommandJson["Parameters"]["GroupID"]             = states.ProcessCommandValues.GroupID;
                                    processCommandJson["Parameters"]["MatchID"]             = matchId;
                                    processCommandJson["Parameters"]["ChairNo"]             = states.ProcessCommandValues.ChairNo;
                                    break;                  
        
        case "GetDeckCards"     :   //do nothing
                                    break;

        case 'GetMatchState'    :   
                                    processCommandJson["Parameters"]                        = {};
                                    processCommandJson["Parameters"]["GroupID"]             = states.ProcessCommandValues.GroupID;
                                    processCommandJson["Parameters"]["MatchID"]             = matchId;
                                    processCommandJson["Parameters"]["LastRefreshTimestamp"]= states.ProcessCommandValues.LastRefreshTimestamp;
                                    processCommandJson["Parameters"]["MyMatch"]             = states.ProcessCommandValues.MyMatch;
                                    break;

        case 'FoldDiscardedCards'   :   
                                    processCommandJson["Parameters"]                        = {};
                                    processCommandJson["Parameters"]["GroupID"]             = states.ProcessCommandValues.GroupID;
                                    processCommandJson["Parameters"]["MatchID"]             = matchId;
                                    break;

        case 'GetMatchScoreBoard'   :   
                                    processCommandJson["Parameters"]                        = {};
                                    processCommandJson["Parameters"]["GroupID"]             = states.ProcessCommandValues.GroupID;
                                    processCommandJson["Parameters"]["MatchID"]             = matchId;
                                    break;

        case 'GetListWatchers'     :   
                                    processCommandJson["Parameters"]                        = {};
                                    processCommandJson["Parameters"]["GroupID"]             = states.ProcessCommandValues.GroupID;
                                    processCommandJson["Parameters"]["MatchID"]             = matchId;
                                    break;
                                    
        case 'PlayerLeaveMatch'     :   
                                    processCommandJson["Parameters"]                        = {};
                                    processCommandJson["Parameters"]["GroupID"]             = states.ProcessCommandValues.GroupID;
                                    processCommandJson["Parameters"]["MatchID"]             = matchId;
                                    break;

        case 'StartNewGame'         :   
                                    processCommandJson["Parameters"]                        = {};
                                    processCommandJson["Parameters"]["GroupID"]             = states.ProcessCommandValues.GroupID;
                                    processCommandJson["Parameters"]["MatchID"]             = matchId;
                                    break;

        case 'CallBiddingKeyboard'  :   
                                    processCommandJson["Parameters"]                        = {};
                                    processCommandJson["Parameters"]["GroupID"]             = states.ProcessCommandValues.GroupID;
                                    processCommandJson["Parameters"]["MatchID"]             = matchId;
                                    processCommandJson["Parameters"]["myBid"]               = states.ProcessCommandValues.MyBid;
                                    break;

        case 'ResetMatch'           :   
                                    processCommandJson["Parameters"]                        = {};
                                    processCommandJson["Parameters"]["GroupID"]             = states.ProcessCommandValues.GroupID;
                                    processCommandJson["Parameters"]["MatchID"]             = matchId;
                                    break;

        case 'GetCurrentPlayerHand' :   
                                    processCommandJson["Parameters"]                        = {};
                                    processCommandJson["Parameters"]["GroupID"]             = states.ProcessCommandValues.GroupID;
                                    processCommandJson["Parameters"]["MatchID"]             = matchId;
                                    break;   
                                    
        case 'GetDiscardCards'      :   
                                    processCommandJson["Parameters"]                        = {};
                                    processCommandJson["Parameters"]["GroupID"]             = states.ProcessCommandValues.GroupID;
                                    processCommandJson["Parameters"]["MatchID"]             = matchId;
                                    break;                                       

        case 'ChangeMatch'      :   
                                    processCommandJson["Parameters"]                        = {};
                                    processCommandJson["Parameters"]["GroupID"]             = states.ProcessCommandValues.GroupID;
                                    processCommandJson["Parameters"]["MatchID"]             = matchId;
                                    processCommandJson["Parameters"]["AllowedHelpLevel"]    = states.ProcessCommandValues.AllowedHelpLevel;
                                    processCommandJson["Parameters"]["MaxPlay"]             = states.ProcessCommandValues.MaxPlay;
                                    processCommandJson["Parameters"]["NumberOfPlayers"]     = states.ProcessCommandValues.NumberOfPlayers;
                                    processCommandJson["Parameters"]["GameRules"]           = states.ProcessCommandValues.GameRules;
                                    processCommandJson["Parameters"]["PlayerLevel"]         = states.ProcessCommandValues.PlayerLevel;
                                    processCommandJson["Parameters"]["EnforceFollowSuit"]   = states.ProcessCommandValues.EnforceFollowSuit;
                                    processCommandJson["Parameters"]["ShowGamePoints"]      = states.ProcessCommandValues.ShowGamePoints;
                                    processCommandJson["Parameters"]["ShowRemainingPoints"] = states.ProcessCommandValues.ShowRemainingPoints;
                                    processCommandJson["Parameters"]["EnableAllPass"]       = states.ProcessCommandValues.EnableAllPass;
                                    processCommandJson["Parameters"]["PublicMatch"]         = states.ProcessCommandValues.PublicMatch;
                                    break;

        case 'DeleteMatch'      :   
                                    processCommandJson["Parameters"]                        = {};
                                    processCommandJson["Parameters"]["GroupID"]             = states.ProcessCommandValues.GroupID;
                                    processCommandJson["Parameters"]["MatchID"]             = matchId;
                                    break;

        case 'KickOutPlayer'    :   
                                    processCommandJson["Parameters"]                        = {};
                                    processCommandJson["Parameters"]["GroupID"]             = states.ProcessCommandValues.GroupID;
                                    processCommandJson["Parameters"]["MatchID"]             = matchId;
                                    processCommandJson["Parameters"]["ChairNo"]             = states.ProcessCommandValues.ChairNo;
                                    break;

        case 'PlayCard'         :   
                                    processCommandJson["Parameters"]                        = {};
                                    processCommandJson["Parameters"]["GroupID"]             = states.ProcessCommandValues.GroupID;
                                    processCommandJson["Parameters"]["MatchID"]             = matchId;
                                    processCommandJson["Parameters"]["myCardID"]            = states.ProcessCommandValues.MyCardID;
                                    break; 
        
        default             :

    }

    return processCommandAPI( command, processCommandJson, states);

}