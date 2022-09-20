import React from 'react'
import styled from 'styled-components'

import SideNav from './Content/SideNav/SideNav'
import GameTables from './Content/GameContent/GameTables/GameTables'
import GameScreen from './Content/GameContent/GameScreen/GameScreen'
import {Area,  GameContent, AdContent} from './Content/Content.style'
import { initialize } from './Content/Content.scripts'
import { containerResize } from './NavBar/NavBar.scripts'
import { getTimestamp, startGetTimestampLoop, stopGetTimestampLoop } from './Content/Misc/Timestamp.scripts'
import './Content/Content.css'

// var flagAd = 1;
var interval;
var flag = 0;

const Content = ({ theme, states, handlers}) => {

    

    React.useEffect(() => {
        
        initialize();
        containerResize(states);

        //makes sure below code only runs once        
        if(!flag) {
            flag = 1;
            // console.log('commandCalls',  ["Register", "GetMenu", "GetTables", "GetPossibleValues"]);
            // getTimestamp(states);
        }


        // startGetTimestampLoop(states);
        interval = setInterval(function() {

            // getTimestamp(states);

            // if( (states.CurrentPage == 'homepage') && (document.getElementById('gameDetails').style.display !== 'block') )
                // console.log('commandCalls Timestamp call');
         
        }, 1.5 * 1000);


            try{

                // if (flagAd) {

                setTimeout(() => {

                    // flagAd = 0;
                    
                    if (document.getElementById('adContent').lastChild.innerHTML === "")
                        (window.adsbygoogle = window.adsbygoogle || []).push({})
            
                }, 500);

                // }
            }
            catch{}
        // }

        return function unMount() {
            // stopGetTimestampLoop();
            clearInterval(interval);
        }

    })

    return (
        <Area id="area">
            <SideNav theme={theme} SideNavItems={states.SideNavItems} handler={handlers}/>
            <GameContent id="gameContent" >
                <GameTables theme={theme} TableContent={states.TableContent} setTableContent={states.setTableContent} handler={handlers}/>
                <GameScreen states={states} handlers={handlers} />
            </GameContent>
            <AdContent id="adContent">

                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                <ins className="adsbygoogle adStyle"
                    style={{display: "inline-block"}}
                    data-ad-client="ca-pub-9142249718992342"
                    data-ad-slot="3227850256"
                    // data-ad-format="auto"
                    data-full-width-responsive="true">
                </ins>
                    
            </AdContent>
        </Area>
    )
}

export default Content
