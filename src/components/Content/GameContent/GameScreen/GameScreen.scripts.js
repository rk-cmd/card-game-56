var chairLoc = [ {"left":"82.80%", "top":"65%"}, {"left":"82.80%", "top":"45%"}, {"left":"82.80%", "top":"25%"}, {"left":"42.48%", "top":"3%"}, {"left":"2.16%", "top":"25%"}, {"left":"2.16%", "top":"45%"}, {"left":"2.16%", "top":"65%"}]
    
export const pushChairsToState = (states) => {

    var chairDetails = [];

    for( var i=2 ; i<=Object.keys(states.MatchState.Chairs).length ; i++ ) {

        if(states.MatchState.Chairs[i] !== null) {

            chairDetails.push({"Details": states.MatchState.Chairs[i], "Location": chairLoc[i-2] });


        }

    }

    // console.log(chairDetails);
    states.setGameChairs(chairDetails);

}