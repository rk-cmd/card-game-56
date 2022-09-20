import './App.css';
import NavBar from './components/NavBar'
import Content from './components/Content'
import GameDetailsPopup from './components/Popups/GameDetailsPopup'
import ConfirmationPopup from './components/Popups/ConfirmationPopup'
import {sortChairsMatchState, initializeOptions} from './components/Popups/GameDetailsPopup/GameDetailsPopup.scripts'
import { commandCalls, processCommandJsonGenerator } from './components/Content/Misc/Timestamp.scripts'
import { saveIconGameDetails, moveToHomepage, moveToGameScreen, checkPlaceBid } from './App.scripts'
import { pushChairsToState } from './components/Content/GameContent/GameScreen/GameScreen.scripts'

import React from 'react'
import {useState} from 'react'
import styled from 'styled-components'

var clickedTileType = "";
var flag = 1;
// var flagPopupBegin = 0;
var interval;
var prevTable = ""; 

var flagAdminMSPopup = 0;

function App() {

  // const [ SideNavItems, setSideNavItems] = useState ({});

  const [ SideNavItems, setSideNavItems] = useState ([{"seq_no":0,"item_type":"item_t","parent_folder":"Parent folder","item_name":"item_name","page":"page","icon":"icon"},
    {"seq_no":1,"item_type":"P","parent_folder":"root","item_name":"Home","page":".\/home.html","icon":".\/graphics\/home.png"},
    {"seq_no":2,"item_type":"F","parent_folder":"root","item_name":"Tables","page":".\/tables.html","icon":".\/graphics\/matches.png"},
    {"seq_no":3,"item_type":"P","parent_folder":"tables","item_name":"All","page":".\/allmatches.html","icon":".\/graphics\/matches.png"},
    {"seq_no":4,"item_type":"P","parent_folder":"tables","item_name":"Public","page":".\/public.html","icon":".\/graphics\/matches.png"},
    {"seq_no":5,"item_type":"P","parent_folder":"tables","item_name":"My groups","page":".\/mygroup.html","icon":".\/graphics\/matches.png"},
    {"seq_no":6,"item_type":"P","parent_folder":"root","item_name":"My Statistics","page":".\/mystats.html","icon":".\/graphics\/myaccount.png"},
    {"seq_no":7,"item_type":"P","parent_folder":"root","item_name":"My match logs","page":".\/matchlog.php","icon":".\/graphics\/log.png"},
    {"seq_no":8,"item_type":"P","parent_folder":"root","item_name":"Suggestions","page":".\/suggestions.php","icon":".\/graphics\/feedback.png"},
    {"seq_no":9,"item_type":"P","parent_folder":"root","item_name":"User Settings","page":".\/usersetting.php","icon":".\/graphics\/usersettings.png"},
    {"seq_no":10,"item_type":"F","parent_folder":"root","item_name":"Help","page":"","icon":".\/graphics\/help.png"},
    {"seq_no":11,"item_type":"P","parent_folder":"Help","item_name":"Site Help","page":".\/sitehelp.html","icon":".\/graphics\/help.png"},
    {"seq_no":12,"item_type":"P","parent_folder":"Help","item_name":"56 Bidding rules","page":".\/56 bidding rules.html","icon":".\/graphics\/help.png"}
  ]);

  const [ TableContent, setTableContent] = useState ({});

  // const [ TableContent, setTableContent] = useState ({"second test":{"0":{"GroupID":"604f0c5587db4"},"1":{"MatchID":"","Name":"New Table","Difficulty":null,"Rules":null,"Players":null,"Status":null,"MyMatch":null,"TargetURL":null,"TargetWindow":null,"BackGround":"private","TileType":"createTile"},"2":{"MatchID":"608f8d6d4bbe2","Name":"Table #17","Difficulty":"Intermediate","Rules":"Kerala","Players":"1\/6","Status":"Waiting for players","MyMatch":"Y","TargetURL":"\/56game\/56game_match.php?match=608f8d6d4bbe2","TargetWindow":"_self","BackGround":"private","TileType":"tableTile"},"3":{"MatchID":"6083fbda0deea","Name":"Table #36","Difficulty":"Beginner","Rules":"International","Players":"1\/6","Status":"Waiting for players","MyMatch":"Y","TargetURL":"\/56game\/56game_match.php?match=6083fbda0deea","TargetWindow":"_self","BackGround":"private","TileType":"tableTile"}},"Create your Private Group":{"0":{"GroupID":null},"1":{"MatchID":"","Name":"Create Private Group","Difficulty":null,"Rules":null,"Players":null,"Status":null,"MyMatch":null,"TargetURL":"\/56game\/56game_group.php","TargetWindow":"_self","BackGround":"private","TileType":"createTile"}}})

  //Possible values are values inside the popup for start match
  // const [ PossibleValues, setPossibleValues] = useState ([]);
  const [ PossibleValues, setPossibleValues] = useState ({"ListOfValues":{"MaxPlay":{"4":{"0":{"GM1":"Match of 1 game"},"1":{"GM4":"Match of 4 games"},"2":{"GM8":"Match of 8 games"},"3":{"GM12":"Match of 12 games"},"4":{"GM16":"Match of 16 games"},"5":{"GM20":"Match of 20 games"},"6":{"GM24":"Match of 24 games"},"7":{"PT25":"Match with target 25 points"},"8":{"PT50":"Match with target 50 points"},"9":{"PT75":"Match with target 75 points"},"10":{"PT100":"Match with target 100 points"}},"6":{"0":{"GM1":"Match of 1 game"},"1":{"GM6":"Match of 6 games"},"2":{"GM12":"Match of 12 games"},"3":{"GM18":"Match of 18 games"},"4":{"GM24":"Match of 24 games"},"5":{"GM30":"Match of 30 games"},"6":{"GM36":"Match of 36 games"},"7":{"PT25":"Match with target 25 points"},"8":{"PT50":"Match with target 50 points"},"9":{"PT75":"Match with target 75 points"},"10":{"PT100":"Match with target 100 points"}},"8":{"0":{"GM1":"Match of 1 game"},"1":{"GM8":"Match of 8 games"},"2":{"GM16":"Match of 16 games"},"3":{"GM24":"Match of 24 games"},"4":{"GM32":"Match of 32 games"},"5":{"GM40":"Match of 40 games"},"6":{"GM48":"Match of 48 games"},"7":{"PT25":"Match with target 25 points"},"8":{"PT50":"Match with target 50 points"},"9":{"PT75":"Match with target 75 points"},"10":{"PT100":"Match with target 100 points"}}},"NumberOfPlayers":{"0":{"4":"4 Player"},"1":{"6":"6 Player"},"2":{"86":"8 Player with 6 cards each"},"3":{"88":"8 Player with 8 cards each"}},"GameRules":{"0":{"INT":"International"},"1":{"KER":"Kerala"}},"PlayerLevel":{"0":{"B":"Beginner"},"1":{"I":"Intermediate"},"2":{"E":"Expert"}},"EnforceFollowSuit":{"0":{"Y":"Enabled"},"1":{"N":"Disabled"}},"ShowGamePoints":{"0":{"Y":"Show"},"1":{"N":"Hide"}},"ShowRemainingPoints":{"0":{"Y":"Show"},"1":{"N":"Hide"}},"EnableAllPass":{"0":{"Y":"Enabled"},"1":{"N":"Disabled"}},"PublicMatch":{"0":{"Y":"Public Match"},"1":{"N":"Private Match"}}},"Defaults":{"MaxPlay":{"4":"GM8","6":"GM12","8":"GM16"},"NumberOfPlayers":"6","GameRules":"KER","PlayerLevel":"I","EnforceFollowSuit":"Y","ShowGamePoints":"Y","ShowRemainingPoints":"Y","EnableAllPass":"N","PublicMatch":"N"}});

  
  // const [ MatchState, setMatchState] = useState ('init');
  const [ MatchState, setMatchState] = useState ({"MatchStatus":"StartNewGame","NumberOfPlayers":6,"AllowedHelpLevel":null,"MaxPlay":"GM12","GameRules":"KER","PlayerLevel":"I","EnforceFollowSuit":"Y","ShowGamePoints":"Y","ShowRemainingPoints":"N","EnableAllPass":"N","PublicMatch":null,"MatchAdmin":"Y","MinimumWaitSeconds":0,"RefreshRequired":"No","LastRefreshTimestamp":"2021-04-28 09:00:00","RefreshCalls":{},"Chairs":{"1":{"ChairNo":2,"PlayerName":"rohith8194","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"No"},"2":{"ChairNo":3,"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"3":null,"4":{"ChairNo":4,"PlayerName":"","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"5":{"ChairNo":5,"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"6":{"ChairNo":6,"PlayerName":"","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"7":null,"8":{"ChairNo":1,"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"}}});
  // const [ MatchState, setMatchState] = useState ({"MatchStatus":"StartNewGame","NumberOfPlayers":4,"AllowedHelpLevel":null,"MaxPlay":"GM12","GameRules":"KER","PlayerLevel":"I","EnforceFollowSuit":"Y","ShowGamePoints":"Y","ShowRemainingPoints":"N","EnableAllPass":"N","PublicMatch":null,"MatchAdmin":"Yes","MinimumWaitSeconds":0,"RefreshRequired":"No","LastRefreshTimestamp":"2021-04-28 09:00:00","RefreshCalls":{},"Chairs":{"1":{"ChairNo":2,"PlayerName":"rohith8194","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"No"},"2":null,"3":{"ChairNo":3,"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"4":null,"5":{"ChairNo":4,"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"6":null,"7":{"ChairNo":1,"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"8":null}});


  const [ PopupOptions, setPopupOptions] = useState ([]);
  const [ PopupChairs, setPopupChairs] = useState([]);
  const [ GameChairs, setGameChairs] = useState ([]);
  const [ ProcessCommandValues, setProcessCommandValues] = useState ({ "userId": "", "csrf": "", "returnCode": "", "GameDetailsPopupEnd": "init", "GameDetailsPopupSave": "init", "KickOutTS": "init", "MatchIDTS": "", "CurrentPageTS": "init","RefreshCallsArray": "init","GroupID": "", "MatchID": "","AllowedHelpLevel": "", "MaxPlay": "", "NumberOfPlayers": "", "GameRules": "", "PlayerLevel": "", "EnforceFollowSuit": "", "ShowGamePoints": "", "ShowRemainingPoints": "", "EnableAllPass": "", "PublicMatch": "", "ChairNo": "", "LastRefreshTimestamp": "", "MyMatch": "", "TileType": "", "MyBid": "", "MyCardID": "init"});

  const [ BiddingKeyboardValues, setBiddingKeyboardValues] = useState ({"suits":{"0":"hearts","1":"clubs","2":"diams","3":"noos","4":"notr"},"numbers":{"0":29,"1":30,"2":31,"3":32,"4":33,"5":34,"6":35,"7":36,"8":37,"9":38,"10":39,"11":40,"12":41,"13":42,"14":43,"15":44,"16":45,"17":46,"18":47,"19":48,"20":49,"21":50,"22":51,"23":52,"24":53,"25":54,"26":55,"27":56},"actions":{"0":"+","1":"+1","2":"+2","3":"+3","4":"+4","5":"double","6":"pass","7":"allpass","8":"reset"},"others":{},"myBid":"","CompleteBid":"Y","MessagePart1":"Place your Bid","MessagePart2":"diams","MessagePart3":"44"});
  const [ CardDeck, setCardDeck] = useState ({"1spadesJ":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/spadesJ.PNG","1spades9":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/spades9.PNG","1spadesA":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/spadesA.PNG","1spades10":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/spades10.PNG","1spadesK":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/spadesK.PNG","1spadesQ":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/spadesQ.PNG","1spades8":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/spades8.PNG","1spades7":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/spades7.PNG","1heartsJ":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/heartsJ.PNG","1hearts9":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/hearts9.PNG","1heartsA":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/heartsA.PNG","1hearts10":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/hearts10.PNG","1heartsK":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/heartsK.PNG","1heartsQ":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/heartsQ.PNG","1hearts8":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/hearts8.PNG","1hearts7":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/hearts7.PNG","1diamsJ":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/diamsJ.PNG","1diams9":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/diams9.PNG","1diamsA":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/diamsA.PNG","1diams10":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/diams10.PNG","1diamsK":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/diamsK.PNG","1diamsQ":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/diamsQ.PNG","1diams8":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/diams8.PNG","1diams7":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/diams7.PNG","1clubsJ":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/clubsJ.PNG","1clubs9":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/clubs9.PNG","1clubsA":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/clubsA.PNG","1clubs10":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/clubs10.PNG","1clubsK":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/clubsK.PNG","1clubsQ":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/clubsQ.PNG","1clubs8":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/clubs8.PNG","1clubs7":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/clubs7.PNG","2spadesJ":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/spadesJ.PNG","2spades9":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/spades9.PNG","2spadesA":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/spadesA.PNG","2spades10":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/spades10.PNG","2spadesK":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/spadesK.PNG","2spadesQ":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/spadesQ.PNG","2spades8":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/spades8.PNG","2spades7":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/spades7.PNG","2heartsJ":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/heartsJ.PNG","2hearts9":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/hearts9.PNG","2heartsA":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/heartsA.PNG","2hearts10":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/hearts10.PNG","2heartsK":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/heartsK.PNG","2heartsQ":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/heartsQ.PNG","2hearts8":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/hearts8.PNG","2hearts7":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/hearts7.PNG","2diamsJ":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/diamsJ.PNG","2diams9":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/diams9.PNG","2diamsA":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/diamsA.PNG","2diams10":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/diams10.PNG","2diamsK":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/diamsK.PNG","2diamsQ":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/diamsQ.PNG","2diams8":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/diams8.PNG","2diams7":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/diams7.PNG","2clubsJ":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/clubsJ.PNG","2clubs9":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/clubs9.PNG","2clubsA":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/clubsA.PNG","2clubs10":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/clubs10.PNG","2clubsK":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/clubsK.PNG","2clubsQ":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/clubsQ.PNG","2clubs8":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/clubs8.PNG","2clubs7":"https:\/\/www.56cardgameonline.com\/newdesign\/others\/cards\/deckd\/clubs7.PNG"});
  const [ CurrentPlayerHand, setCurrentPlayerHand] = useState({
		"spades": {
			"0": "2spadesJ",
			"1": "1spadesA"
		},
		"hearts": {
      "0": "2heartsK"
    },
		"clubs": {
			"0": "2clubsJ",
			"1": "2clubs10"
		},
		"diams": {
			"0": "2diams9",
			"1": "1diamsA",
			"2": "2diamsA"
		}
	});
  // const [ BiddingKeyboardValues, setBiddingKeyboardValues] = useState ({"suits":{},"numbers":{},"actions":{},"others":{},"myBid":""});
  // const [ CardDeck, setCardDeck] = useState ();
  // const [ CurrentPlayerHand, setCurrentPlayerHand] = useState ({"spades": {},"hearts": {},"clubs": {},"diams": {}});

  const [ MatchScoreboard, setMatchScoreboard] = useState ({
		"TableNo": 12,
		"GroupName": "",
		"TeamAMatchPoints": 0,
		"TeamBMatchPoints": 0,
    "MatchGamesPoints": 'Game 2 of 12',
		"GameStatus": "Game to start"
	});
  // const [ DiscardCards, setDiscardCards] = useState ({
	// 	"1": "1spadesJ",
	// 	"2": "1spades10",
	// 	"3": "1spades10",
	// 	"4": "1spades10",
	// 	"5": "1spades10",
	// 	"6": "1spades10",
	// 	"7": "1spades10",
	// 	"8": "1spades10"
	// });
  // const [ MatchScoreboard, setMatchScoreboard] = useState ();
  const [ DiscardCards, setDiscardCards] = useState ({});

  const [ CurrentPage, setCurrentPage] = useState('homepage');

  // if ( ProcessCommandValues.CurrentPageTS == 'init' ) {
  //   setTimeout(() => {
  //     setCurrentPage('gameScreen')
  //     setProcessCommandValues(values => ({
  //       ...values,
  //       CurrentPageTS : 'firstCall'
  //     }))    
  //     // setTimeout(() => moveToGameScreen({setCurrentPage}), 500)
  //     setTimeout(() => moveToGameScreen({setCurrentPage}), 1500)
  //   } , 250)
  // }

  const lightTheme = {  
                        "ContainerBackground": "lightblue",
                        "NavBarBackground": "#7CB9E8",
                        "NavBarFontColor": "white",
                        "NavBarButtonBackgroundSelected": "rgb(102, 153, 204)",
                        "SideNavBackground": "#C6D7F5",
                        "SideNavFontColor": "#337AB7",
                        "SubSideNavFontColor": "gray",
                        "SubSideNavBackground": "#F0F8FF",
                        "TileFontColor": "#337AB7",
                        "PublicTileBackground": "linear-gradient( 0.25turn, #ACA0D2, #D9E0E7, #ACA0D2)",
                        "PrivateTileBackground": "linear-gradient( 0.25turn, #ACB9E1, #CDD6F1, #ACB9E1)"
  };

  const darkTheme = { 
                        "ContainerBackground": "url(others/bannerDark.jpg)",
                        "NavBarBackground": "black",
                        "NavBarFontColor": "white",
                        "NavBarButtonBackgroundSelected": "#404040",
                        "SideNavBackground": "#101010",
                        "SideNavFontColor": "#A0A0A0",
                        "SubSideNavFontColor": "white",
                        "SubSideNavBackground": "#787878",
                        "TileFontColor": "white",
                        "PublicTileBackground": "rgba( 0, 0, 0, 0.6)",
                        "PrivateTileBackground": "rgba( 0, 0, 0, 0.6)"
  };

  const [ Theme, setTheme ] = useState(lightTheme);

  const closeGameDetailsPopup = () => {

    document.getElementById('gameDetails').style.display= 'none';
    document.getElementById('container').style.opacity = '1';

    initializeOptions( 'tableTile', { PossibleValues, MatchState, setPopupOptions});

}

  const gameTileClick = (e) => {

    setTimeout(() => {

      // setMatchScoreboard({
      //   "TableNo": 12,
      //   "GroupName": "",
      //   "TeamAMatchPoints": 0,
      //   "TeamBMatchPoints": 0,
      //   "MatchGamesPoints": 'Game 4 of 12',
      //   "GameStatus": "Game to start"
      // })

      setMatchScoreboard({
        "TableNo": 2,
        "GroupName": "My family Group",
        "TeamAMatchPoints": 0,
        "TeamBMatchPoints": 0,
        "MatchGamesPoints":"Game 4 of 6",
        "GameStatus": "Bidding in progress",
        "CurrentTrump": "hearts",
        "CurrentHighestBidValue": 28,
        "CurrentHighestBid": {
           "1": "hearts",
           "2": "+",
           "3": "(28)"
        },
        "CurrentHighestBidPlayer": "AJM",
        "CurrentHighestBidTeam": "A",
        "CurrentHighestBidDoubledTeam": "A",
        "CurrentHighestBidDoubledPlayer": "Raj1 Kiran 1",
        "CurrentHighestBidRedoubledTeam": "B",
        "CurrentHighestBidRedoubledPlayer": "Liz3"
      })

      // setMatchScoreboard({
      //   "TableNo": 17,
      //   "GroupName": "My family Group",
      //   "TeamAMatchPoints": 0,
      //   "TeamBMatchPoints": 0,
      //   "MatchGamesPoints":"Game 1 of 6",
      //   "GameStatus": "Game in progress",
      //   "FinalBidTrump": "NT",
      //   "FinalBidValue": 28,
      //   "FinalBidWinningTeam": "B",
      //   "FinalBidWinningPlayer": "John5",
      //   "FinalBidDoubledTeam": "A",
      //   "FinalBidDoubledPlayer": "Raj1 Kiran 1",
      //   "FinalBidRedoubledTeam": "B",
      //   "FinalBidRedoubledPlayer": "Liz3",
      //   "TeamAGamePoints": 0,
      //   "TeamBGamePoints": 0,
      //   "RemainingPoints": 56,
      //   "TrickNo": 1,
      //   "TrickStatus": "In progress"
      // })

      // setMatchScoreboard({
      //   "TableNo": 17,
      //   "GroupName": "My family Group",
      //   "TeamAMatchPoints": 0,
      //   "TeamBMatchPoints": 15,
      //   "MatchGamesPoints":"Game 1 of 6",
      //   "GameStatus": "Game completed",
      //   "FinalBidValue": 28,
      //   "FinalBidWinningTeam": "B",
      //   "FinalBidDoubledTeam": "A",
      //   "FinalBidRedoubledTeam": "B",
      //   "TeamAGamePoints": 0,
      //   "TeamBGamePoints": 0,
      //   "MatchPointsAdded": 15,
      //   "MatchPointsAddedToTeam": "B"
      // })

    }, 5000);

    // //test code, now opens static game details popup everytime a tile has been clicked

    prevTable = document.getElementById('gameDetailsTitle').innerText;

    document.getElementById('gameDetailsTitle').innerText = e.target.closest('.gameTile').id;
    var arrDisable = Array.from(document.getElementsByClassName('matchDetailsItem'));

    //if user clicks on a createTile
    if(e.target.closest('.gameTile').classList.contains('createTile')) {
        
        arrDisable.forEach(item => item.removeAttribute('disabled'));
        clickedTileType = 'createTile';

        document.getElementById('gameDetails').style.display = "block";
        document.getElementById('container').style.opacity = '0.5';

        document.getElementById('gameDetailsMatchAdmin').innerText = 'Match Admin';
        
        //if create public match
        if ( e.target.closest('.gameTile').classList.contains('public') ) {
          setProcessCommandValues(values => ({...values, 
            "GroupID"   : "Public",
            "TileType"  : "createTile",
            "MyMatch"   : "N",
            "MatchIDTS" : Math.random()
          }))
        }
        //below matchidts is used so issues don't happen when you click tableTile->createTile->tableTile
        else { 
          setProcessCommandValues(values => ({...values, 
            "GroupID"   : e.target.closest('.gameTile').getAttribute('data-groupid'),
            "TileType"  : "createTile",
            "MyMatch"   : "N",
            "MatchIDTS" : Math.random()
          }))
        }

     

        setPopupChairs([{"ChairNo":1,"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"}, {"ChairNo":2,"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"}, {"ChairNo":3,"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"}, {"ChairNo":4,"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"}, {"ChairNo":5,"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"}, {"ChairNo":6,"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"}, {"ChairNo":7,"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"}, {"ChairNo":8,"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"}]);

     
        
    }        
    //if user clicks on a tableTile
    else {

        clickedTileType = 'tableTile';
        flagAdminMSPopup = 1;

          //MatchIDUpdatestamp given so that even when same tableTile clicked the click is triggered
          setProcessCommandValues(values => ({...values, 
            "GroupID"   : e.target.closest('.gameTile').getAttribute('data-groupid'),
            "MatchID"   : e.target.closest('.gameTile').getAttribute('data-matchid'),
            "MyMatch"   : e.target.closest('.gameTile').getAttribute('data-mymatch'),
            "TileType"  : "tableTile",
            "MatchIDTS" : Math.random()
          }))


    }

  }

  //MatchIDTS -> MatchState -> DisplayPopup, useEffect sequence

  React.useEffect(() => {

    if ( clickedTileType == 'tableTile' && (ProcessCommandValues.MatchIDTS !== "") ) {

      console.log('commandCalls',  document.getElementById('gameDetailsTitle').innerText, ["GetMatchState"]);
      // commandCalls( ["GetMatchState"], {CurrentPage, setCurrentPage, SideNavItems, setSideNavItems, TableContent, setTableContent, PossibleValues, setPossibleValues, MatchState, setMatchState, GameChairs, setGameChairs, ProcessCommandValues, setProcessCommandValues, BiddingKeyboardValues, setBiddingKeyboardValues, CardDeck, setCardDeck, CurrentPlayerHand, setCurrentPlayerHand, MatchScoreboard, setMatchScoreboard, DiscardCards, setDiscardCards});

      // setMatchState({"MatchStatus":"StartNewGame","NumberOfPlayers":6,"AllowedHelpLevel":null,"MaxPlay":"PT75","GameRules":"KER","PlayerLevel":"I","EnforceFollowSuit":"Y","ShowGamePoints":"Y","ShowRemainingPoints":"N","EnableAllPass":"N","PublicMatch":null,"MatchAdmin":"Y","MinimumWaitSeconds":0,"RefreshRequired":"N","LastRefreshTimestamp":"2021-04-28 09:00:00","RefreshCalls":{},"Chairs":{"1":{"ChairNo":2,"PlayerName":"rohith8194","PlayerTeam":"B","PlayerTurn":"Y","MatchAdmin":"Y","TrickStarter":"N","ChairEmpty":"N"},"2":{"ChairNo":3,"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"3":null,"4":{"ChairNo":4,"PlayerName":"","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"5":{"ChairNo":5,"PlayerName":"Ballu","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"6":{"ChairNo":6,"PlayerName":"","PlayerTeam":"B","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"},"7":null,"8":{"ChairNo":1,"PlayerName":"","PlayerTeam":"A","PlayerTurn":"Yes","MatchAdmin":"No","TrickStarter":"No","ChairEmpty":"Yes"}}});
      // setMatchState({"MatchStatus":"PlaceBid","NumberOfPlayers":4,"AllowedHelpLevel":null,"MaxPlay":"GM8","GameRules":"INT","PlayerLevel":"I","EnforceFollowSuit":"Y","ShowGamePoints":"Y","ShowRemainingPoints":"Y","EnableAllPass":"N","PublicMatch":null,"MatchAdmin":"Y","MinimumWaitSeconds":0,"RefreshRequired":"N","LastRefreshTimestamp":"2021-04-28 09:00:00","ElapsedSeconds":957,"RefreshCalls":{"0": "GetCurrentPlayerHand","1": "CallBiddingKeyboard","2": "GetMatchScoreBoard","3": "GetDiscardCards"},"Chairs":{"1":{"ChairNo":3,"PlayerName":"federer","PlayerTeam":"A","PlayerTurn":"N","MatchAdmin":"N","TrickStarter":"Y","ChairEmpty":"N","LastBid":""},"2":null,"3":{"ChairNo":4,"PlayerName":"nadal","PlayerTeam":"B","PlayerTurn":"Y","MatchAdmin":"Y","TrickStarter":"N","ChairEmpty":"N","LastBid":""},"4":null,"5":{"ChairNo":1,"PlayerName":"djokovic","PlayerTeam":"A","PlayerTurn":"N","MatchAdmin":"N","TrickStarter":"N","ChairEmpty":"N","LastBid":""},"6":null,"7":{"ChairNo":2,"PlayerName":"AJM","PlayerTeam":"B","PlayerTurn":"N","MatchAdmin":"N","TrickStarter":"N","ChairEmpty":"N","LastBid":""},"8":null}})
      setMatchState({"MatchStatus":"PlaceBid","NumberOfPlayers":4,"AllowedHelpLevel":null,"MaxPlay":"GM8","GameRules":"INT","PlayerLevel":"I","EnforceFollowSuit":"Y","ShowGamePoints":"Y","ShowRemainingPoints":"Y","EnableAllPass":"N","PublicMatch":null,"MatchAdmin":"Y","MinimumWaitSeconds":0,"RefreshRequired":"N","LastRefreshTimestamp":"2021-04-28 09:00:00","ElapsedSeconds":957,"RefreshCalls":{"0": "GetCurrentPlayerHand","1": "CallBiddingKeyboard","2": "GetMatchScoreBoard","3": "GetDiscardCards"},"Chairs":{"1":{"ChairNo":3,"PlayerName":"federer","PlayerTeam":"A","PlayerTurn":"Y","MatchAdmin":"N","TrickStarter":"Y","ChairEmpty":"N","LastBid":{"1":"clubs","2":"+2","3":"(32)"}},"2":null,"3":{"ChairNo":4,"PlayerName":"nadal","PlayerTeam":"B","PlayerTurn":"Y","MatchAdmin":"N","TrickStarter":"N","ChairEmpty":"N","LastBid":{"1":"hearts","2":"+2","3":"(32)"}},"4":null,"5":{"ChairNo":1,"PlayerName":"djokovic","PlayerTeam":"A","PlayerTurn":"N","MatchAdmin":"Y","TrickStarter":"N","ChairEmpty":"N","LastBid":{"1":"spades","2":"+2","3":"(32)"}},"6":null,"7":{"ChairNo":2,"PlayerName":"AJM","PlayerTeam":"B","PlayerTurn":"N","MatchAdmin":"N","TrickStarter":"N","ChairEmpty":"N","LastBid":{"1":"diams","2":"+2","3":"(32)"}},"8":null}});

      // setTimeout(() => setMatchState({"MatchStatus":"StartNewGame","NumberOfPlayers":4,"AllowedHelpLevel":null,"MaxPlay":"GM8","GameRules":"KER","PlayerLevel":"I","EnforceFollowSuit":"Y","ShowGamePoints":"Y","ShowRemainingPoints":"Y","EnableAllPass":"N","PublicMatch":null,"MatchAdmin":"N","MinimumWaitSeconds":0,"RefreshRequired":"N","LastRefreshTimestamp":"2021-04-28 09:00:00","ElapsedSeconds":957,"RefreshCalls":{"0": "GetCurrentPlayerHand","1": "CallBiddingKeyboard","2": "GetMatchScoreBoard","3": "GetDiscardCards"},"Chairs":{"1":{"ChairNo":3,"PlayerName":"sasimeshari","PlayerTeam":"A","PlayerTurn":"Y","MatchAdmin":"N","TrickStarter":"N","ChairEmpty":"N","LastBid":""},"2":null,"3":{"ChairNo":4,"PlayerName":"GK Nair 2","PlayerTeam":"B","PlayerTurn":"Y","MatchAdmin":"N","TrickStarter":"N","ChairEmpty":"N","LastBid":""},"4":null,"5":{"ChairNo":1,"PlayerName":"rohith8194","PlayerTeam":"A","PlayerTurn":"Y","MatchAdmin":"Y","TrickStarter":"Y","ChairEmpty":"N","LastBid":""},"6":null,"7":{"ChairNo":2,"PlayerName":"AJM","PlayerTeam":"B","PlayerTurn":"Y","MatchAdmin":"N","TrickStarter":"N","ChairEmpty":"N","LastBid":""},"8":null}}), 5000);
    }

    
  }, [ProcessCommandValues.MatchIDTS]);

  React.useEffect(() => {

    if( ProcessCommandValues.GameDetailsPopupSave !== 'init') {

      console.log(ProcessCommandValues);
      console.log('commandCalls', ["ChangeMatch"] );
      commandCalls( ["ChangeMatch"], {CurrentPage, setCurrentPage, SideNavItems, setSideNavItems, TableContent, setTableContent, PossibleValues, setPossibleValues, MatchState, setMatchState, GameChairs, setGameChairs, ProcessCommandValues, setProcessCommandValues});
    
    }

  }, [ProcessCommandValues.GameDetailsPopupSave])

  // if user was in gameScreen during the last session, below code loads the gameScreen upon initial startup
  React.useEffect(() => {

    if ( ProcessCommandValues.CurrentPageTS !== 'init' ) {

      setTimeout(() => {

        if ( CurrentPage == 'gameScreen' )
          commandCalls( ["GetMatchState"], {CurrentPage, setCurrentPage, SideNavItems, setSideNavItems, TableContent, setTableContent, PossibleValues, setPossibleValues, MatchState, setMatchState, GameChairs, setGameChairs, ProcessCommandValues, setProcessCommandValues, BiddingKeyboardValues, setBiddingKeyboardValues, CardDeck, setCardDeck, CurrentPlayerHand, setCurrentPlayerHand, MatchScoreboard, setMatchScoreboard, DiscardCards, setDiscardCards});
      
      }, 300);

    }

  }, [ProcessCommandValues.CurrentPageTS])

  // calling items in RefreshCallsArray inside MatchState
  React.useEffect(() => {

    if ( ProcessCommandValues.RefreshCallsArray !== 'init' ) {

      console.log('commandCalls of refreshCallsArray');
      commandCalls( ProcessCommandValues.RefreshCallsArray, {CurrentPage, setCurrentPage, SideNavItems, setSideNavItems, TableContent, setTableContent, PossibleValues, setPossibleValues, MatchState, setMatchState, GameChairs, setGameChairs, ProcessCommandValues, setProcessCommandValues, BiddingKeyboardValues, setBiddingKeyboardValues, CardDeck, setCardDeck, CurrentPlayerHand, setCurrentPlayerHand, MatchScoreboard, setMatchScoreboard, DiscardCards, setDiscardCards});

      // states.setProcessCommandValues(values => ({
      //     ...values,
      //     LastRefreshTimestamp: currentTimestamp["aets"]
      // }))

    }

  }, [ProcessCommandValues.RefreshCallsArray])

  const toggleSwitchHandler = (e) => {

    switch(e.target.id) {

      case "toggleTheme": 

                          if( getComputedStyle(document.getElementById('container').firstChild).backgroundColor == "rgb(124, 185, 232)") 
                            setTheme(darkTheme);

                          else  
                            setTheme(lightTheme);

    }

  }

  const gameDetailsIconHandler = (e) => {

    console.log(e.target.id);

    switch (e.target.id) {

        case 'saveButton'   :  
                                // clearInterval(interval);
                                console.log('register and save call');

                                saveIconGameDetails({ MatchState, setMatchState, ProcessCommandValues, setProcessCommandValues, PossibleValues});

                                //command calls are inside gamedetailspopupsave useffect for sync

 
                                break;

        case 'deleteButton' :           
                                document.getElementById('gameDetailsWrapper').style.opacity = 0.5;
                                document.getElementById('confirmationMessage').innerHTML = 'Are you sure you want to delete the match?';
                                document.getElementById('noButtonConfirmation').style.display = 'flex'; 
                                document.getElementById('yesButtonConfirmation').style.display = 'flex'; 
                                document.getElementById('okButtonConfirmation').style.display = 'none'; 
                                document.getElementById('popupConfirmation').style.display = 'block';

                                break;

        case 'resetButton'  :   
                                document.getElementById('gameDetailsWrapper').style.opacity = 0.5;
                                document.getElementById('confirmationMessage').innerHTML = 'Are you sure you want to reset the match?';
                                document.getElementById('noButtonConfirmation').style.display = 'flex'; 
                                document.getElementById('yesButtonConfirmation').style.display = 'flex'; 
                                document.getElementById('okButtonConfirmation').style.display = 'none'; 
                                document.getElementById('popupConfirmation').style.display = 'block';
                               
                                break;
        default:

    }
    


  }




  React.useEffect(() => {

    if ( flag )
      setTimeout(() =>     {
        flag = 0;
        setTableContent({"Public":{"0":{"GroupID":"Public"},"1":{"MatchID":"","Name":"Start Public Match","Difficulty":null,"Rules":null,"Players":null,"Status":null,"MyMatch":null,"TargetURL":null,"TargetWindow":null,"BackGround":"public","TileType":"createTile"},"2":{"MatchID":"60a607526f198","Name":"Table #37","Difficulty":"Intermediate","Rules":"International","Players":"0\/6","Status":"Waiting for players","MyMatch":"N","TargetURL":"\/56game\/56game_match.php?match=60a607526f198","TargetWindow":"_self","BackGround":"public","TileType":"tableTile"},"3":{"MatchID":"60a6075dd7a09","Name":"Table #64","Difficulty":"Intermediate","Rules":"International","Players":"0\/4","Status":"Waiting for players","MyMatch":"N","TargetURL":"\/56game\/56game_match.php?match=60a6075dd7a09","TargetWindow":"_self","BackGround":"public","TileType":"tableTile"}},"second test":{"0":{"GroupID":"604f0c5587db4"},"1":{"MatchID":"","Name":"New Table","Difficulty":null,"Rules":null,"Players":null,"Status":null,"MyMatch":null,"TargetURL":null,"TargetWindow":null,"BackGround":"private","TileType":"createTile"},"2":{"MatchID":"60a58e456719a","Name":"Table #15","Difficulty":"Intermediate","Rules":"International","Players":"1\/6","Status":"Waiting for players","MyMatch":"Y","TargetURL":"\/56game\/56game_match.php?match=60a58e456719a","TargetWindow":"_self","BackGround":"private","TileType":"tableTile"},"3":{"MatchID":"60a517a659f6b","Name":"Table #57","Difficulty":"Intermediate","Rules":"International","Players":"2\/6","Status":"Waiting for players","MyMatch":"N","TargetURL":"\/56game\/56game_match.php?match=60a517a659f6b","TargetWindow":"_self","BackGround":"private","TileType":"tableTile"}},"Create your Private Group":{"0":{"GroupID":null},"1":{"MatchID":"","Name":"Create Private Group","Difficulty":null,"Rules":null,"Players":null,"Status":null,"MyMatch":null,"TargetURL":"\/56game\/56game_group.php","TargetWindow":"_self","BackGround":"private","TileType":"createTile"}}});
    }, 100);

    if( document.getElementById('navBarButton').classList.contains('selected') ) 
      document.getElementById('navBarButton').style.backgroundColor = Theme.NavBarButtonBackgroundSelected;


  });

  React.useEffect(() => {

    // below code is necessary because after creation of a tile, and upon receiving the first MatchState
    // we have to convert it into a tableTile
    // if ( ProcessCommandValues.TileType == 'createTile' )
    //   clickedTileType = 'tableTile';

    // no need to sort chairs if we're in gameScreen
    // if( (CurrentPage == 'homepage')  || (CurrentPage == 'gameScreen')  ) {
    if(( ( (CurrentPage == 'homepage') || (CurrentPage == 'gameScreen') ) && ( clickedTileType == 'tableTile') ) || ( (CurrentPage == 'gameScreen') && ( clickedTileType == 'createTile') ) ) {
   
        // populate popup gameChairs, also popup chairs trigger intializeOptions
        sortChairsMatchState({ MatchState, setPopupChairs});



        var arrDisableItems = Array.from(document.getElementsByClassName('matchDetailsItem'));

        if ( MatchState.MatchAdmin == 'Y' ) {

          document.getElementById('gameDetailsMatchAdmin').innerText = 'Match Admin';
          document.getElementById('gameDetailsIcons').style.display = 'flex';
          arrDisableItems.forEach(item => item.removeAttribute('disabled'));

        }
        else {

          document.getElementById('gameDetailsMatchAdmin').innerText = '';
          document.getElementById('gameDetailsIcons').style.display = 'none';
          arrDisableItems.forEach(item => item.setAttribute('disabled', false));

        }  

        // below code only works for homepage
        if ( CurrentPage == 'homepage') {

          // if already in match, go straight to gameScreen
          if ( ProcessCommandValues.MyMatch == 'Y' ) {

            pushChairsToState({MatchState, setGameChairs});

            try {
              moveToGameScreen({setCurrentPage});
              console.log('moved to gameScreen')
            }
            catch {
              document.getElementById('adContent').style.height = 'calc( 100vh - 60px) ';
              alert('Please enable ads and then refresh to continue!!');
            }
          
            // clearInterval(interval);
            // maybe add scoreboard and discarded cards too
            // commandCalls(["Register", "GetDeckCards", "GetCurrentPlayerHand"], { CardDeck, setCardDeck, CurrentPlayerHand, setCurrentPlayerHand});
            
          }
          else {

            document.getElementById('gameDetails').style.display = "block";
            document.getElementById('container').style.opacity = '0.5';
          
          }
        }

    }

  }, [MatchState]);

  React.useEffect(() => {

    switch(clickedTileType) {
      
      case 'createTile'   : initializeOptions( 'createTile', { PossibleValues});
                            break;
      case 'tableTile'    : //for matchadmins initialization only once, else will interrupt changeMatch process
                            if ( MatchState.MatchAdmin == 'Y' ) {
                              if( flagAdminMSPopup == 1 ) {
                                initializeOptions( 'tableTile', { PossibleValues, MatchState, setPopupOptions});
                                flagAdminMSPopup = 0;
                              }
                            }
                            else
                              initializeOptions( 'tableTile', { PossibleValues, MatchState, setPopupOptions});
                            break;
      default             :
    }

  }, [PopupChairs]);

  React.useEffect(() => {

    checkPlaceBid();

  }, [GameChairs])

  React.useEffect(() => {
    
    document.getElementById('gameTablesContainer').style.display = 'none';
    document.getElementById('gameScreenContainer').style.display = 'none';

    console.log('current page check, now at ' + CurrentPage)

    switch( CurrentPage ) {

        case 'homepage'     :   
                                document.getElementById('gameTablesContainer').style.display = 'block';
                                break;
        case 'gameScreen'   :   
                                document.getElementById('gameScreenContainer').style.display = 'flex';

                                // below code is to pull down the adContent space inside gameScreen, if 
                                // at initialization currentPage is 'gameScreen'
                                // if ( ProcessCommandValues.CurrentPageTS == 'firstCall' )
                                //   setTimeout(() => moveToGameScreen({setCurrentPage}), 500)

                                break;
        default             :

    }

  }, [CurrentPage]);



  return (
    <>
      <Container className="App" id="container" background={Theme.ContainerBackground}>
        <NavBar theme={Theme} states={{CurrentPage, setCurrentPage, SideNavItems, setSideNavItems, TableContent, setTableContent, PossibleValues, setPossibleValues, MatchState, setMatchState, GameChairs, setGameChairs, ProcessCommandValues, setProcessCommandValues, BiddingKeyboardValues, setBiddingKeyboardValues, CardDeck, setCardDeck, CurrentPlayerHand, setCurrentPlayerHand, MatchScoreboard, setMatchScoreboard, DiscardCards, setDiscardCards}} />
        <Content theme={Theme} states={{CurrentPage, setCurrentPage, SideNavItems, setSideNavItems, TableContent, setTableContent, PossibleValues, setPossibleValues, MatchState, setMatchState, GameChairs, setGameChairs, ProcessCommandValues, setProcessCommandValues, BiddingKeyboardValues, setBiddingKeyboardValues, CardDeck, setCardDeck, CurrentPlayerHand, setCurrentPlayerHand, MatchScoreboard, setMatchScoreboard, DiscardCards, setDiscardCards}} handlers={{toggleSwitchHandler, gameTileClick}} />        
        {/* <Footer /> */}
      </Container>
      <Popups>
        <GameDetailsPopup states={{CurrentPage, setCurrentPage, PossibleValues, setPossibleValues, MatchState, setMatchState, PopupOptions, setPopupOptions, PopupChairs, setPopupChairs, GameChairs, setGameChairs, ProcessCommandValues, setProcessCommandValues}} handlers={{closeGameDetailsPopup, gameDetailsIconHandler}}/>
        <ConfirmationPopup states={{CurrentPage, setCurrentPage, SideNavItems, setSideNavItems, TableContent, setTableContent, PossibleValues, setPossibleValues, MatchState, setMatchState, GameChairs, setGameChairs, ProcessCommandValues, setProcessCommandValues}} />
      </Popups>
    </>
  );
}

const Container = styled.div`
  min-width: 320px;
  font-size: 4px;
  width: 100vw;
  height: 100vh;
  // background-color: red;
  background: ${props => props.background};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;  

  // opacity: 0.5;
`

const Popups = styled.div`
`

export default App;
