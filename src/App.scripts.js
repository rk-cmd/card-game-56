import { commandCalls } from './components/Content/Misc/Timestamp.scripts'

export const moveToHomepage = (states) => {

    document.getElementById('adContent').style.height = 'calc( 100% - 60px )';
    document.getElementById('adContent').lastChild.style.height = 'calc( 100% - 60px )';
    document.getElementById('adContent').lastChild.firstChild.style.height = 'calc( 100% - 60px )';
    document.getElementById('adContent').lastChild.firstChild.firstChild.style.height = 'calc( 100% - 60px )';
    document.getElementById('adContent').lastChild.firstChild.firstChild.firstChild.style.height = 'calc( 100% - 60px )';

    document.getElementById('navBarMatchDetails').style.display = 'none';
    document.getElementById('navBarLeaveGame').style.display = 'none';
    document.getElementById('navBarInfoIcon').style.display = 'none';
    document.getElementById('navBarRefresh').style.display = 'none';

    states.setCurrentPage('homepage');
    // refresh tables when moving to homepage

    states.setProcessCommandValues(values => ({
        ...values,
        MyBid: ""
    }))

    setTimeout(() => {
        console.log('commandCalls ', ["GetTables"]);
        // commandCalls( ["GetTables"], states);
        window.dispatchEvent(new Event('resize'))
    }, 300);


}

export const moveToGameScreen = (states) => {

    document.getElementById('adContent').style.height = 'calc( 40% - 60px) ';
    // document.getElementById('adContent').lastChild.style.height = 'calc( 40% - 60px) '
    // document.getElementById('adContent').lastChild.firstChild.style.height = 'calc( 40% - 60px) '
    // document.getElementById('adContent').lastChild.firstChild.firstChild.style.height = 'calc( 40% - 60px) '
    // document.getElementById('adContent').lastChild.firstChild.firstChild.firstChild.style.height = 'calc( 40% - 60px) '
    document.getElementById('adContent').lastChild.style.height = '100% '
    document.getElementById('adContent').lastChild.firstChild.style.height = '100% '
    document.getElementById('adContent').lastChild.firstChild.firstChild.style.height = '100% '
    document.getElementById('adContent').lastChild.firstChild.firstChild.firstChild.style.height = '100% '

    // document.getElementById('biddingKeyboardTitle').innerText = 'Place your Bid';

    states.setCurrentPage('gameScreen');
    setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
    
}

export const stringToSuit = (id) => {

    // console.log(id);

    Array.from(document.getElementById(id).childNodes).forEach(item => {
        // console.log(item.innerText)

        item.style.removeProperty('background-image');

        // searching for suit values to replace them with a background of the suit
        switch ( item.innerText ) {

            case 'hearts'   :
                                item.style.backgroundImage = 'url(https://www.56cardgameonline.com/newdesign/others/hearts.PNG)';
                                // item2.innerText = "";
                                item.style.color = 'transparent';
                                break;
            case 'clubs'    :
                                item.style.backgroundImage = 'url(https://www.56cardgameonline.com/newdesign/others/clubs.PNG)';
                                // item2.innerText = "";
                                item.style.color = 'transparent';
                                break;
            case 'spades'   :
                                item.style.backgroundImage = 'url(https://www.56cardgameonline.com/newdesign/others/spades.PNG)';
                                // item2.innerText = "";
                                item.style.color = 'transparent';
                                break;
            case 'diams'    :
                                item.style.backgroundImage = 'url(https://www.56cardgameonline.com/newdesign/others/diams.PNG)';
                                // item2.innerText = "";
                                item.style.color = 'transparent';
                                break;                    
            default         :   item.style.color = 'black';

        }

    })

}

export const checkBidTitle = () => {

    // getting all the bidMessages in MatchState
    let bidValues = Array.from(document.getElementsByClassName('biddingKeyboardTitlePart'));
    // bidValues.forEach(item => item.style.display = 'none');

    // setTimeout(() => {
    bidValues.forEach(item => {

        // console.log(item1.childNodes)

        // item1.style.display = 'flex';

        // item1.childNodes.forEach(item2 => {

            // if ( item2.innerText !== '' )
            //     item1.style.display = 'flex';

            // console.log(item2.innerText);

            item.style.removeProperty('background-image');

            // searching for suit values to replace them with a background of the suit
            switch ( item.innerText ) {

                case 'hearts'   :
                                    item.style.backgroundImage = 'url(https://www.56cardgameonline.com/newdesign/others/hearts.PNG)';
                                    // item2.innerText = "";
                                    item.style.color = 'transparent';
                                    break;
                case 'clubs'    :
                                    item.style.backgroundImage = 'url(https://www.56cardgameonline.com/newdesign/others/clubs.PNG)';
                                    // item2.innerText = "";
                                    item.style.color = 'transparent';
                                    break;
                case 'spades'   :
                                    item.style.backgroundImage = 'url(https://www.56cardgameonline.com/newdesign/others/spades.PNG)';
                                    // item2.innerText = "";
                                    item.style.color = 'transparent';
                                    break;
                case 'diams'    :
                                    item.style.backgroundImage = 'url(https://www.56cardgameonline.com/newdesign/others/diams.PNG)';
                                    // item2.innerText = "";
                                    item.style.color = 'transparent';
                                    break;                    
                default         :   item.style.color = 'white';

            }

        // })
        

    }) 
    // }, 5000);

}

export const checkPlaceBid = () => {

    // getting all the bidValues in the chairs
    let bidValues = Array.from(document.getElementsByClassName('lastBid'));
    bidValues.forEach(item => item.style.display = 'none');

    // setTimeout(() => {
    bidValues.forEach(item1 => {

        // console.log(item1.childNodes)

        // item1.style.display = 'flex';

        item1.childNodes.forEach(item2 => {

            if ( item2.innerText !== '' )
                item1.style.display = 'flex';

            // console.log(item2.innerText);

            item2.style.removeProperty('background-image');

            // searching for suit values to replace them with a background of the suit
            switch ( item2.innerText ) {

                case 'hearts'   :
                                    item2.style.backgroundImage = 'url(https://www.56cardgameonline.com/newdesign/others/hearts.PNG)';
                                    // item2.innerText = "";
                                    item2.style.color = 'transparent';
                                    break;
                case 'clubs'    :
                                    item2.style.backgroundImage = 'url(https://www.56cardgameonline.com/newdesign/others/clubs.PNG)';
                                    // item2.innerText = "";
                                    item2.style.color = 'transparent';
                                    break;
                case 'spades'   :
                                    item2.style.backgroundImage = 'url(https://www.56cardgameonline.com/newdesign/others/spades.PNG)';
                                    // item2.innerText = "";
                                    item2.style.color = 'transparent';
                                    break;
                case 'diams'    :
                                    item2.style.backgroundImage = 'url(https://www.56cardgameonline.com/newdesign/others/diams.PNG)';
                                    // item2.innerText = "";
                                    item2.style.color = 'transparent';
                                    break;                    
                default         :   item2.style.color = 'black';

            }

        })
        

    }) 
    // }, 5000);

}

export const saveIconGameDetails = (states) => {

    //same as in popup action, but updateTimestamp diff, public match code diff
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



    switch ( document.getElementById('numberOfPlayers').value ) {

        case '4 Player'                     :   json["NumberOfPlayers"] = '4';
                                                break;
        case '6 Player'                     :   json["NumberOfPlayers"] = '6';
                                                break;
        case '8 Player with 6 cards each'   :   json["NumberOfPlayers"] = '86';
                                                break;
        case '8 Player with 8 cards each'   :   json["NumberOfPlayers"] = '88';
                                                break;            
        default                             :    

    }


    json["PublicMatch"] = states.MatchState.PublicMatch;
    

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
        MatchID: states.ProcessCommandValues.MatchID,
        EnableAllPass: json["EnableAllPass"],
        EnforceFollowSuit: states.PossibleValues.Defaults.EnforceFollowSuit,
        GameRules: json["GameRules"],
        MaxPlay : json["MaxPlay"],
        NumberOfPlayers: json["NumberOfPlayers"],
        PlayerLevel: json["PlayerLevel"],
        ShowGamePoints: json["ShowGamePoints"],
        ShowRemainingPoints: json["ShowRemainingPoints"],
        PublicMatch: json["PublicMatch"],
        GameDetailsPopupSave: Math.random()

    }));


}