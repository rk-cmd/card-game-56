import { startGetTimestampLoop } from "../Content/Misc/Timestamp.scripts";

export function sideNavOpenClose(selectedBackground) {

    var scrollBarWidth = document.getElementById("area").offsetWidth - document.getElementById("area").clientWidth;

    //control entering 'if' block means sideNav is open
    if ( document.getElementById("sideNav").style.width > "0px") {

        document.getElementById("sideNav").style.removeProperty('width');
        document.getElementById("gameContent").style.removeProperty('width');
        document.getElementById("gameContent").style.removeProperty('margin-left');
        document.getElementById("navBarButton").style.removeProperty('background-color');
        document.getElementById("navBarButton").style.removeProperty('box-shadow');
        document.getElementById('navBarButton').classList.remove('selected');

        var containerWidth = document.getElementById("container").clientWidth;

        //close the sideNav code below
        document.getElementById("sideNav").style.width = "0px";

        // below code reduces card width of player hand
        // let handCards = document.getElementsByClassName('playerHandCard');
        // Array.from(handCards).forEach(item => item.style.width = '96px');

        switch(true) {
    
            case ( containerWidth >= 721 ): 
                                            // document.getElementById("gameContent").style.width = "80%"; 
                                            document.getElementById("gameContent").style.width = "calc( 100% - 275px )"; 
                                            break;
    
            case ( containerWidth >= 481 && containerWidth <= 720):
                                            // document.getElementById("gameContent").style.width = "70%";
                                            document.getElementById("gameContent").style.width = "calc( 100% )"; 
                                            break;
            
            case ( containerWidth <= 480 ): 
                                            document.getElementById("gameContent").style.width = "100%";
                                            break;        
        }

    }
    else {
        document.getElementById("sideNav").style.removeProperty('width');
        document.getElementById("gameContent").style.removeProperty('width');


        // document.getElementById("navBarButton").style.backgroundColor = "rgb(88, 88, 88)";
        document.getElementById('navBarButton').classList.add('selected');
        document.getElementById("navBarButton").style.backgroundColor = selectedBackground;
        document.getElementById("navBarButton").style.boxShadow = "white -1.5px 1.5px 1px";
        

        var adWidth = document.getElementById("adContent").clientWidth;
        var containerWidth = document.getElementById("container").clientWidth;

        // below code restores card width of player hand
        // let handCards = document.getElementsByClassName('playerHandCard');
        // Array.from(handCards).forEach(item => item.style.width = '80px');
    
        switch(true) { 
    
        case ( containerWidth >= 721 ): document.getElementById("sideNav").style.width = "250px";
                                        document.getElementById("gameContent").style.marginLeft = "250px";
                                        // document.getElementById("gameContent").style.width = "calc( 80% - 250px )";                                          
                                        // document.getElementById("adContent").style.width = "20%";
                                        document.getElementById("gameContent").style.width = "calc( 100% - 250px - 275px)";                                          
                                        document.getElementById("adContent").style.width = "275px";
                                        break;
    
        case ( containerWidth >= 481 && containerWidth <= 720):
                                        // document.getElementById("sideNav").style.width = "calc( 70% - " + scrollBarWidth + "px)";
                                        // document.getElementById("adContent").style.width = "30%";
                                        document.getElementById("sideNav").style.width = "100%";
                                        // document.getElementById("sideNav").style.width = "calc( 100% - 150px - " + scrollBarWidth + "px)";
                                        // document.getElementById("adContent").style.width = "150px";
                                        document.getElementById("adContent").style.width = "100%";

                                        break;
                                        
        case ( containerWidth <= 480 ): 
                                        document.getElementById("sideNav").style.width = "100%";
                                        break;
        }

    }

}

//below is the resize code

export function containerResize(states) {

// export const containerResize = () => {

    window.addEventListener('resize', () => {

        // (window.adsbygoogle = window.adsbygoogle || []).push({});
        
        var scrollBarWidth = document.getElementById("area").offsetWidth - document.getElementById("area").clientWidth;
        document.getElementById("adContent").style.right = scrollBarWidth.toString() + "px";

        // var adContentWidth = document.getElementById("adContent").clientWidth;
        var containerWidth = document.getElementById("container").clientWidth;

        document.getElementById("adContent").style.removeProperty('width');
        document.getElementById("gameContent").style.removeProperty('width');

        document.getElementById('navBarMatchDetails').style.removeProperty('display');

        // in gameScreen if not enough screenWidth don't display 'CardGameOnline' text code below
        if ( (containerWidth <= 820) && (states.CurrentPage === 'gameScreen') )
            document.getElementById('navBarText').style.display = 'none';
        else
            document.getElementById('navBarText').style.display = 'block';

    // document.getElementById('ovalTable').style.maxHeight = (document.getElementById('gameScreenTable').clientHeight * 0.65).toString() + 'px';


    switch(true) { 

    case ( containerWidth >= 721 ): 

                                    // document.getElementsByClassName("sideNavItem")[document.getElementsByClassName("sideNavItem").length - 1].style.removeProperty('margin-bottom');
                                    document.getElementById('toggleTheme').parentElement.parentElement.style.removeProperty('margin-bottom');
                                    
                                    document.getElementById("gameScreenDetails").style.width = "275px";
                                    document.getElementById("gameScreenDetailsArrow").style.display = 'none';
                                    // below code eliminates hiccups of ovalTable during resize
                                    document.getElementById('gameScreenContainer').style.maxHeight = (document.getElementById('container').clientHeight - 60 ).toString() + 'px';
                                    // document.getElementById('ovalTable').style.maxHeight = ((document.getElementById('container').clientHeight - 60 )* 0.4875).toString() + 'px';
                                    // document.getElementById('ovalTable').style.maxHeight = (document.getElementById('gameScreenTable').clientHeight * 0.65).toString() + 'px';


                                    if ( states.CurrentPage == 'gameScreen' )
                                        document.getElementById('navBarMatchDetails').style.display = 'block';
                                    arrangeGameIcons();
                                    // document.getElementById('adContent').lastChild.firstChild.style.removeProperty('max-height');

                                    if( ! (document.getElementById("sideNav").style.width > "0px") ) {

                                        // document.getElementById("adContent").style.width = "20%";
                                        // document.getElementById("gameContent").style.width = "80%";
                                        document.getElementById("adContent").style.width = "275px";
                                        // document.getElementById("gameScreenDetails").style.width = "275px";
                                        document.getElementById("gameContent").style.width = "calc( 100% - 275px )";
                                        
                                    }
                                    else {

                                        document.getElementById("sideNav").style.removeProperty('width');

                                        // document.getElementById("sideNav").style.width = "250px";
                                        // document.getElementById("adContent").style.width = "20%";
                                        // var adContentWidth = document.getElementById("adContent").clientWidth;
                                        // document.getElementById("gameContent").style.marginLeft = "250px";
                                        // document.getElementById("gameContent").style.width = "calc(100vw - 250px - " + adContentWidth + "px)";

                                        document.getElementById("sideNav").style.width = "250px";
                                        document.getElementById("adContent").style.width = "275px";
                                        // var adContentWidth = document.getElementById("adContent").clientWidth;
                                        document.getElementById("gameContent").style.marginLeft = "250px";
                                        document.getElementById("gameContent").style.width = "calc(100vw - 250px - 275px)";


                                    }
                                    break;

    case ( containerWidth >= 481 && containerWidth <= 720):

                                    // document.getElementsByClassName("sideNavItem")[document.getElementsByClassName("sideNavItem").length - 1].style.removeProperty('margin-bottom');
                                    // document.getElementById('toggleTheme').parentElement.parentElement.style.removeProperty('margin-bottom');
                                    document.getElementById('toggleTheme').parentElement.parentElement.style.marginBottom = "20vh";

                                    document.getElementById("gameScreenDetailsArrow").style.display = 'block';
                                    // if classList has rotateImage it means gameScreenDetails is open
                                    if ( document.getElementById("gameScreenDetailsArrowImage").classList.contains('rotateImage') ) 
                                        document.getElementById("gameScreenDetails").style.width = "250px";
                                    else 
                                        document.getElementById("gameScreenDetails").style.width = "0px";
                                    
                                    // below code eliminates hiccups of ovalTable during resize
                                    document.getElementById('gameScreenContainer').style.maxHeight = (document.getElementById('container').clientHeight - 60 - (document.getElementById('container').clientHeight * 0.2)).toString() + 'px';
                                    // document.getElementById('gameScreenTable').style.maxHeight = ((document.getElementById('container').clientHeight - 60 - (document.getElementById('container').clientHeight * 0.2))* 0.75).toString() + 'px';
                                    // document.getElementById('ovalTable').style.maxHeight = ((document.getElementById('container').clientHeight - 60 - (document.getElementById('container').clientHeight * 0.2))* 0.4875).toString() + 'px';


                                    if ( (containerWidth > 640) && (states.CurrentPage === 'gameScreen') )
                                        document.getElementById('navBarMatchDetails').style.display = 'block';
                                    else
                                        document.getElementById('navBarMatchDetails').style.display = 'none';
                                    
                                    arrangeGameIcons();
                                    // document.getElementById('adContent').lastChild.firstChild.style.removeProperty('max-height');

                                    // if( ! (document.getElementById("sideNav").style.width > "0px") ) {

                                    //     // document.getElementById("gameContent").style.width = "70%";
                                    //     // document.getElementById("adContent").style.width = "30%";
                                    //     document.getElementById("gameContent").style.width = "calc( 100% - 150px )";
                                    //     document.getElementById("adContent").style.width = "150px";
                                    //     document.getElementById("gameScreenDetails").style.width = "150px";

                                    // }
                                    // else {

                                    //     document.getElementById("sideNav").style.removeProperty('width');
                                    //     document.getElementById("gameContent").style.removeProperty('margin-left');
                                    //     // document.getElementById("sideNav").style.width = "calc( 70% - " + scrollBarWidth + "px)";
                                    //     // document.getElementById("gameContent").style.width = "70%";
                                    //     // document.getElementById("adContent").style.width = "30%";

                                    //     document.getElementById("sideNav").style.width = "calc( 100% - 150px - " + scrollBarWidth + "px)";
                                    //     document.getElementById("gameContent").style.width = "calc( 100% - 150px )";
                                    //     document.getElementById("adContent").style.width = "150px";
                                    //     document.getElementById("gameScreenDetails").style.width = "150px";

                                    // }

                                    if( ! (document.getElementById("sideNav").style.width > "0px") ) {

                                        document.getElementById("gameContent").style.removeProperty('margin-left');

                                        document.getElementById("gameContent").style.width = "100%";
                                        document.getElementById("adContent").style.width = "100%";

                                    }
                                    else {

                                        document.getElementById("sideNav").style.removeProperty('width');
                                        document.getElementById("gameContent").style.marginLeft = '250px';

                                        document.getElementById("sideNav").style.width = "100%";
                                        document.getElementById("adContent").style.width = "100%";

                                    }

                                    break;

    case ( containerWidth <= 480 ):                

                                    // document.getElementsByClassName("sideNavItem")[document.getElementsByClassName("sideNavItem").length - 1].style.marginBottom = "20vh";
                                    document.getElementById('toggleTheme').parentElement.parentElement.style.marginBottom = "20vh";
                                    
                                    // document.getElementById("gameScreenDetails").style.width = "225px";
                                    document.getElementById("gameScreenDetailsArrow").style.display = 'block';

                                    // if classList has rotateImage it means gameScreenDetails is open
                                    if ( document.getElementById("gameScreenDetailsArrowImage").classList.contains('rotateImage') ) 
                                        document.getElementById("gameScreenDetails").style.width = "225px";
                                    else 
                                        document.getElementById("gameScreenDetails").style.width = "0px";

                                    // below code eliminates hiccups of ovalTable during resize
                                    document.getElementById('gameScreenContainer').style.maxHeight = (document.getElementById('container').clientHeight - 60 - (document.getElementById('container').clientHeight * 0.2)).toString() + 'px';


                                    document.getElementById('navBarMatchDetails').style.display = 'none';
                                    arrangeGameIcons();

                                    if( ! (document.getElementById("sideNav").style.width > "0px") ) {

                                        document.getElementById("gameContent").style.removeProperty('margin-left');

                                        document.getElementById("gameContent").style.width = "100%";
                                        document.getElementById("adContent").style.width = "100%";

                                    }
                                    else {

                                        document.getElementById("sideNav").style.removeProperty('width');
                                        document.getElementById("gameContent").style.removeProperty('margin-left');

                                        document.getElementById("sideNav").style.width = "100%";
                                        document.getElementById("adContent").style.width = "100%";

                                    }
                                    break;
    }
    
    document.getElementById('gameScreenDetailsArrow').style.right = document.getElementById('gameScreenDetails').style.width;

    });

}

// below code arranges buttons on the navBar in the gameScreen

export const arrangeGameIcons = () => {

    if ( getComputedStyle(document.getElementById('navBarMatchDetails')).width === 'auto' )
        document.getElementById('navBarLeaveGame').style.right = '25px';
    else
        document.getElementById('navBarLeaveGame').style.right = ( parseInt(getComputedStyle(document.getElementById('navBarMatchDetails')).width) + 100 ).toString() + 'px';
    
    document.getElementById('navBarInfoIcon').style.right = ( parseInt(getComputedStyle(document.getElementById('navBarLeaveGame')).right) + 65 ).toString() + 'px';
    document.getElementById('navBarRefresh').style.right = ( parseInt(getComputedStyle(document.getElementById('navBarInfoIcon')).right) + 65 ).toString() + 'px';

}