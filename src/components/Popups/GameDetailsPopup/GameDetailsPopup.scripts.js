import React from 'react'

//below function sorts chairs in the popupScreen
export const sortChairsMatchState = (states) => {

    var chairsMatchState = [];

    Object.keys(states.MatchState.Chairs).forEach((item) => {

        if ( states.MatchState.Chairs[item] !== null )
            chairsMatchState.push(states.MatchState.Chairs[item]);

    })

    // chairs popup should be 8 all the time
    for ( let i=0 ; i<8 ; i++) {

        if ( chairsMatchState[i] == undefined )
            chairsMatchState.push({"ChairNo":i+1,"PlayerName":"","PlayerTeam": ( (i % 2) == 0 ) ? "A": "B","PlayerTurn":"","MatchAdmin":"","TrickStarter":"","ChairEmpty":""});

    }

    var flag = 1;

    while ( flag == 1 ) {

        flag = 0;

        for( var i=0 ; i<chairsMatchState.length - 1 ; i++ ) {

            if( chairsMatchState[i].ChairNo > chairsMatchState[i+1].ChairNo ) {
        
                flag = 1;
                var temp = chairsMatchState[i];
                chairsMatchState[i] = chairsMatchState[i+1];
                chairsMatchState[i+1] = temp;
    
            }

        }

    }

    states.setPopupChairs(chairsMatchState);

}

//below function initializes all options in the popup, depending on whether it's a createTile or a gameTile
export const initializeOptions = (popupType, states) => {

    if( popupType == 'createTile') {

        switch ( states.PossibleValues.Defaults.PlayerLevel ) {

            case 'B':   document.getElementById('playerLevel').value = 'Beginner';
                        break;
            case 'I':   document.getElementById('playerLevel').value = 'Intermediate';
                        break;
            case 'E':document.getElementById('playerLevel').value = 'Expert';
                        break;
            default :
                
        }

        switch ( states.PossibleValues.Defaults.GameRules ) {

            case 'INT'  :   document.getElementById('gameRules').value = 'International';
                            break;
            case 'KER'  :   document.getElementById('gameRules').value = 'Kerala';
                            break;            
            default     :
        }

        switch ( states.PossibleValues.Defaults.ShowGamePoints ) {

            case 'Y':   document.getElementById('gamePoints').value = 'Show';
                        break;
            case 'N':   document.getElementById('gamePoints').value = 'Hide';
                        break;            
            default :
        }
        switch ( states.PossibleValues.Defaults.ShowRemainingPoints ) {

            case 'Y':   document.getElementById('remainingPoints').value = 'Show';
                        break;
            case 'N':   document.getElementById('remainingPoints').value = 'Hide';
                        break;  
            default :
        }
        switch ( states.PossibleValues.Defaults.EnableAllPass ) {

            case 'Y':   document.getElementById('allPass').value = 'Enabled';
                        break;
            case 'N':   document.getElementById('allPass').value = 'Disabled';
                        break;  
            default :            

        }
        switch ( states.PossibleValues.Defaults.NumberOfPlayers ) {

            case '4'    :   document.getElementById('numberOfPlayers').value = '4 Player';
                            break;
            case '6'    :   document.getElementById('numberOfPlayers').value = '6 Player';
                            break;
            case '86'   :   document.getElementById('numberOfPlayers').value = '8 Player with 6 cards each';
                            break;
            case '88'   :   document.getElementById('numberOfPlayers').value = '8 Player with 8 cards each';
                            break;     
            default :    

        }

        // setTimeout(() => maxGamesEvent(states), 1);
        
        maxGamesEvent(states, 'createMatch');

        // this is when new table is created
        // switch ( states.PossibleValues.Defaults.MaxPlay[states.PossibleValues.Defaults.NumberOfPlayers] ) {

        //     case 'GM1'  :   document.getElementById('maxGames').value = 'Match of 1 game';
        //                     break;
        //     case 'GM4'  :   document.getElementById('maxGames').value = 'Match of 4 games';
        //                     break;
        //     case 'GM6'  :   document.getElementById('maxGames').value = 'Match of 6 games';
        //                     break;
        //     case 'GM8'  :   document.getElementById('maxGames').value = 'Match of 8 games';
        //                     break;
        //     case 'GM12' :   document.getElementById('maxGames').value = 'Match of 12 games';
        //                     break;
        //     case 'GM16' :   document.getElementById('maxGames').value = 'Match of 16 games';
        //                     break;
        //     case 'GM18' :   document.getElementById('maxGames').value = 'Match of 18 games';
        //                     break;
        //     case 'GM20' :   document.getElementById('maxGames').value = 'Match of 20 games';
        //                     break;
        //     case 'GM24' :   document.getElementById('maxGames').value = 'Match of 24 games';
        //                     break;
        //     case 'GM30' :   document.getElementById('maxGames').value = 'Match of 30 games';
        //                     break;
        //     case 'GM32' :   document.getElementById('maxGames').value = 'Match of 32 games';
        //                     break;
        //     case 'GM36' :   document.getElementById('maxGames').value = 'Match of 36 games';
        //                     break;
        //     case 'GM40' :   document.getElementById('maxGames').value = 'Match of 40 games';
        //                     break;
        //     case 'GM48' :   document.getElementById('maxGames').value = 'Match of 48 games';
        //                     break;
    
        //     case 'PT25' :   document.getElementById('maxGames').value = 'Match with target 25 points';
        //                     break;
        //     case 'PT50' :   document.getElementById('maxGames').value = 'Match with target 50 points';
        //                     break;
        //     case 'PT75' :   document.getElementById('maxGames').value = 'Match with target 75 points';
        //                     break;
        //     case 'PT100':   document.getElementById('maxGames').value = 'Match with target 100 points';
        //                     break;
        //     default     :
    
        // }

        // switch ( states.PossibleValues.Defaults.MaxPlay[states.PossibleValues.Defaults.NumberOfPlayers] ) {

        //     case 'GM8'  :   document.getElementById('maxGames').value = 'Match of 8 games';
        //                     break;
        //     case 'GM12' :   document.getElementById('maxGames').value = 'Match of 12 games';
        //                     break;
        //     case 'GM16' :   document.getElementById('maxGames').value = 'Match of 16 games';
        //                     break;
        //     default :    

        // }

    }

    else if ( popupType == 'tableTile' ) {

        switch ( states.MatchState.PlayerLevel ) {

            case 'B':   document.getElementById('playerLevel').value = 'Beginner';
                        break;
            case 'I':   document.getElementById('playerLevel').value = 'Intermediate';
                        break;
            case 'E':document.getElementById('playerLevel').value = 'Expert';
                        break;
            default :
                        
        }
        
        switch ( states.MatchState.GameRules ) {

            case 'INT'  :   document.getElementById('gameRules').value = 'International';
                            break;
            case 'KER'  :   document.getElementById('gameRules').value = 'Kerala';
                            break;            
            default     :
        }

        switch ( states.MatchState.ShowGamePoints ) {

            case 'Y':   document.getElementById('gamePoints').value = 'Show';
                        break;
            case 'N':   document.getElementById('gamePoints').value = 'Hide';
                        break;            
            default :

        }
        switch ( states.MatchState.ShowRemainingPoints ) {

            case 'Y':   document.getElementById('remainingPoints').value = 'Show';
                        break;
            case 'N':   document.getElementById('remainingPoints').value = 'Hide';
                        break;  
            default :        

        }
        switch ( states.MatchState.EnableAllPass ) {

            case 'Y':   document.getElementById('allPass').value = 'Enabled';
                        break;
            case 'N':   document.getElementById('allPass').value = 'Disabled';
                        break;  
            default :        

        }
        switch ( states.MatchState.NumberOfPlayers.toString() ) {

            case '4'    :   document.getElementById('numberOfPlayers').value = '4 Player';
                            break;
            case '6'    :   document.getElementById('numberOfPlayers').value = '6 Player';
                            break;
            case '86'   :   document.getElementById('numberOfPlayers').value = '8 Player with 6 cards each';
                            break;
            case '88'   :   document.getElementById('numberOfPlayers').value = '8 Player with 8 cards each';
                            break;                
            default :        

        }

        // setTimeout(() => maxGamesEvent(states), 100);
        maxGamesEvent(states, 'existingMatch');

        // this is for existing tables display
        // switch ( states.MatchState.MaxPlay ) {

        //     case 'GM1'  :   document.getElementById('maxGames').value = 'Match of 1 game';
        //                     break;
        //     case 'GM4'  :   document.getElementById('maxGames').value = 'Match of 4 games';
        //                     break;
        //     case 'GM6'  :   document.getElementById('maxGames').value = 'Match of 6 games';
        //                     break;
        //     case 'GM8'  :   document.getElementById('maxGames').value = 'Match of 8 games';
        //                     break;
        //     case 'GM12' :   document.getElementById('maxGames').value = 'Match of 12 games';
        //                     break;
        //     case 'GM16' :   document.getElementById('maxGames').value = 'Match of 16 games';
        //                     break;
        //     case 'GM18' :   document.getElementById('maxGames').value = 'Match of 18 games';
        //                     break;
        //     case 'GM20' :   document.getElementById('maxGames').value = 'Match of 20 games';
        //                     break;
        //     case 'GM24' :   document.getElementById('maxGames').value = 'Match of 24 games';
        //                     break;
        //     case 'GM30' :   document.getElementById('maxGames').value = 'Match of 30 games';
        //                     break;
        //     case 'GM32' :   document.getElementById('maxGames').value = 'Match of 32 games';
        //                     break;
        //     case 'GM36' :   document.getElementById('maxGames').value = 'Match of 36 games';
        //                     break;
        //     case 'GM40' :   document.getElementById('maxGames').value = 'Match of 40 games';
        //                     break;
        //     case 'GM48' :   document.getElementById('maxGames').value = 'Match of 48 games';
        //                     break;
    
        //     case 'PT25' :   document.getElementById('maxGames').value = 'Match with target 25 points';
        //                     break;
        //     case 'PT50' :   document.getElementById('maxGames').value = 'Match with target 50 points';
        //                     break;
        //     case 'PT75' :   document.getElementById('maxGames').value = 'Match with target 75 points';
        //                     break;
        //     case 'PT100':   document.getElementById('maxGames').value = 'Match with target 100 points';
        //                     break;
        //     default     :
    
        // }

        // switch ( states.MatchState.MaxPlay ) {

        //     case 'GM8'  :   document.getElementById('maxGames').value = 'Match of 8 games';
        //                     break;
        //     case 'GM12' :   document.getElementById('maxGames').value = 'Match of 12 games';
        //                     break;
        //     case 'GM16' :   document.getElementById('maxGames').value = 'Match of 16 games';
        //                     break;
        //     default :        

        // }            

    }
    
}

//below two functions aid initializeOptions
export const maxGamesEvent = (states, refreshType) => {

    var arrChairRows = Array.from(document.getElementsByClassName('chairRowMatchDetails'));
    arrChairRows.forEach(item => item.style.display = 'none')
    // debugger;

    switch ( document.getElementById('numberOfPlayers').value ) {

        case '4 Player'                     :   for( var i=0; i<4 ; i++ ) 
                                                    document.getElementsByClassName('chairRowMatchDetails')[i].style.display = 'flex';
                                                maxGames('4', states, refreshType);
                                                break;
        case '6 Player'                     :   for( var i=0; i<6 ; i++ ) 
                                                    document.getElementsByClassName('chairRowMatchDetails')[i].style.display = 'flex';
                                                maxGames('6', states, refreshType);
                                                break;
        case '8 Player with 6 cards each'   :   for( var i=0; i<8 ; i++ ) 
                                                    document.getElementsByClassName('chairRowMatchDetails')[i].style.display = 'flex';
                                                maxGames('8', states, refreshType);
                                                break;
        case '8 Player with 8 cards each'   :   for( var i=0; i<8 ; i++ ) 
                                                    document.getElementsByClassName('chairRowMatchDetails')[i].style.display = 'flex';
                                                maxGames('8',states, refreshType);
                                                break;
        default                             :

    }

}

const maxGames = ( players, states, refreshType) => {

    document.getElementById('maxGames').innerHTML = "";

    Object.keys(states.PossibleValues.ListOfValues.MaxPlay[players]).forEach((item2) => {

        Object.keys(states.PossibleValues.ListOfValues.MaxPlay[players][item2]).forEach((item3) => {

            var option = document.createElement('option');
            option.text = states.PossibleValues.ListOfValues.MaxPlay[players][item2][item3];
            document.getElementById('maxGames').add(option);

        })
    })

    // return players;

    let initializeMaxGames;

    switch ( refreshType ) {

        case 'createMatch'      :
                                    initializeMaxGames = states.PossibleValues.Defaults.MaxPlay[states.PossibleValues.Defaults.NumberOfPlayers];
                                    break;
        case 'existingMatch'    :
                                    initializeMaxGames = states.MatchState.MaxPlay;
                                    break;
        case 'popupClick'       :
                                    initializeMaxGames = states.PossibleValues.Defaults.MaxPlay[players];
                                    break;
        
        default             :

    }

    // this is when user changes number of players, default value of those players should come
    // switch ( states.PossibleValues.Defaults.MaxPlay[players] ) {
    switch ( initializeMaxGames ) {

        case 'GM1'  :   document.getElementById('maxGames').value = 'Match of 1 game';
                        break;
        case 'GM4'  :   document.getElementById('maxGames').value = 'Match of 4 games';
                        break;
        case 'GM6'  :   document.getElementById('maxGames').value = 'Match of 6 games';
                        break;
        case 'GM8'  :   document.getElementById('maxGames').value = 'Match of 8 games';
                        break;
        case 'GM12' :   document.getElementById('maxGames').value = 'Match of 12 games';
                        break;
        case 'GM16' :   document.getElementById('maxGames').value = 'Match of 16 games';
                        break;
        case 'GM18' :   document.getElementById('maxGames').value = 'Match of 18 games';
                        break;
        case 'GM20' :   document.getElementById('maxGames').value = 'Match of 20 games';
                        break;
        case 'GM24' :   document.getElementById('maxGames').value = 'Match of 24 games';
                        break;
        case 'GM30' :   document.getElementById('maxGames').value = 'Match of 30 games';
                        break;
        case 'GM32' :   document.getElementById('maxGames').value = 'Match of 32 games';
                        break;
        case 'GM36' :   document.getElementById('maxGames').value = 'Match of 36 games';
                        break;
        case 'GM40' :   document.getElementById('maxGames').value = 'Match of 40 games';
                        break;
        case 'GM48' :   document.getElementById('maxGames').value = 'Match of 48 games';
                        break;

        case 'PT25' :   document.getElementById('maxGames').value = 'Match with target 25 points';
                        break;
        case 'PT50' :   document.getElementById('maxGames').value = 'Match with target 50 points';
                        break;
        case 'PT75' :   document.getElementById('maxGames').value = 'Match with target 75 points';
                        break;
        case 'PT100':   document.getElementById('maxGames').value = 'Match with target 100 points';
                        break;
        default     :

    }

}