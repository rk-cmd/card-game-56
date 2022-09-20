var refreshUrl = 'https://www.56cardgameonline.com/56game/get_tables.php';
var timestampUrl = 'https://www.56cardgameonline.com/56game/get_timestamp.php';

// var currentTimestamp = getTimestamp(timestampUrl);
var currentTimestamp;
var newTimestamp;
var flagTS = 0;

// export const sortTables = (tableJson) => {
export const sortTables = (tableJson, setTableContent) => {

    // console.log('tableJson', tableJson);
    // debugger;

    // tableJson = {"Public":{"0":{"GroupID":null},"1":{"Name":"Start Public Match","Difficulty":null,"Rules":null,"Players":null,"Status":null,"MyMatch":null,"TargetURL":null,"TargetWindow":null,"BackGround":"public","TileType":"createTile"},"2":{"Name":"Table #64","Difficulty":"Intermediate","Rules":"International","Players":"0\/6","Status":"Waiting for players","MyMatch":"N","TargetURL":"\/56game\/56game_match.php?match=605bc00c22303","TargetWindow":"_self","BackGround":"public","TileType":"tableTile"},"3":{"Name":"Table #55","Difficulty":"Intermediate","Rules":"International","Players":"0\/6","Status":"Waiting for players","MyMatch":"N","TargetURL":"\/56game\/56game_match.php?match=605bc027d1ad8","TargetWindow":"_self","BackGround":"public","TileType":"tableTile"},"4":{"Name":"Table #68","Difficulty":"Intermediate","Rules":"International","Players":"0\/6","Status":"Waiting for players","MyMatch":"N","TargetURL":"\/56game\/56game_match.php?match=605bc02f8da2c","TargetWindow":"_self","BackGround":"public","TileType":"tableTile"}},"second test":{"0":{"GroupID":"604f0c5587db4"},"1":{"Name":"New Table","Difficulty":null,"Rules":null,"Players":null,"Status":null,"MyMatch":null,"TargetURL":null,"TargetWindow":null,"BackGround":"private","TileType":"createTile"},"2":{"Name":"Table #64","Difficulty":"Intermediate","Rules":"International","Players":"0\/6","Status":"Waiting for players","MyMatch":"N","TargetURL":"\/56game\/56game_match.php?match=605bc00c22303","TargetWindow":"_self","BackGround":"public","TileType":"tableTile"},"3":{"Name":"Table #11","Difficulty":"Intermediate","Rules":"International","Players":"0\/6","Status":"Waiting for players","MyMatch":"N","TargetURL":"\/56game\/56game_match.php?match=605bc00c22303","TargetWindow":"_self","BackGround":"public","TileType":"tableTile"},"4":{"Name":"Table #2","Difficulty":"Intermediate","Rules":"International","Players":"0\/6","Status":"Waiting for players","MyMatch":"N","TargetURL":"\/56game\/56game_match.php?match=605bc00c22303","TargetWindow":"_self","BackGround":"public","TileType":"tableTile"},"5":{"Name":"Table #77","Difficulty":"Intermediate","Rules":"International","Players":"0\/6","Status":"Waiting for players","MyMatch":"N","TargetURL":"\/56game\/56game_match.php?match=605bc00c22303","TargetWindow":"_self","BackGround":"public","TileType":"tableTile"},"6":{"Name":"Table #8","Difficulty":"Intermediate","Rules":"International","Players":"0\/6","Status":"Waiting for players","MyMatch":"N","TargetURL":"\/56game\/56game_match.php?match=605bc00c22303","TargetWindow":"_self","BackGround":"public","TileType":"tableTile"}},"Create your Private Group":{"0":{"GroupID":null},"1":{"Name":"Create Private Group","Difficulty":null,"Rules":null,"Players":null,"Status":null,"MyMatch":null,"TargetURL":"\/56game\/56game_group.php","TargetWindow":"_self","BackGround":"private","TileType":"createTile"}}};

    //below is the code for sorting the tables according to table numbers within each group

    Object.keys(tableJson).map((item) => {

        var flag = 0;

        //performming bubble sort on each tileGroup
        do { flag = 0;

        for( var i=2 ; i<Object.keys(tableJson[item]).length ; i++) {
    
            // var flag = 0;
    
            // do {
                
                // flag = 0;
                
                try {
                if( parseInt(tableJson[item][i].Name.split( "#")[1]) > parseInt(tableJson[item][i+1].Name.split( "#")[1]) ) {
    
                    var temp = tableJson[item][i];
                    tableJson[item][i] = tableJson[item][i+1];
                    tableJson[item][i+1] = temp;
    
                    flag = 1;
    
                }
                }
                catch {}
    
            // } while(flag == 1);
    
        }
        } while(flag == 1);
        
    
    })

    // return tableJson;

    setTableContent(tableJson);
    setTimeout(() => window.dispatchEvent(new Event('resize')), 200);

}

//below function gets the tileJSON from the given url and refreshes the tables
const refresh = (refreshUrl, setTableContent) => {

	    fetch(refreshUrl).then(function (response) {
		    // The API call was successful!
		    return response.json();
	    }).then(function (data) {
		    // This is the JSON from our response
		    //console.log(data);
		    // var tiles = data;
		    // updateTiles(data);
		    // console.log(tiles);
            // console.log("tiles updated");

            //call test1(data) and call setTableContent over there
            // setTableContent(data);

            // console.log('refresh', data);
		    currentTimestamp = newTimestamp;
            // sortTables(data);
            sortTables(data, setTableContent);

	    }).catch(function (err) {
	    	// There was an error
	    	console.warn('Something went wrong.', err);
	    });
}

export const getTimestamp = (setTableContent) => {

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
                    // console.log('first table change');
				    // refresh(refreshUrl);
                    refresh(refreshUrl, setTableContent)
                }
                

                newTimestamp = data;

			    // if ( currentTimestamp["aets"] !== newTimestamp["aets"] ) {
                if ( currentTimestamp["aets"] < newTimestamp["aets"] ) {
                    // tableChange();
                    // console.log('table change', currentTimestamp, newTimestamp);
                    // refresh(refreshUrl);
                    refresh(refreshUrl, setTableContent)
			    }
    		    else {
        		    // console.log('no table change', currentTimestamp, newTimestamp);
                    return false;
                }
    		}).catch(function (err) {
	    		// There was an error
		    	console.warn('Something went wrong.', err);
	    });

}


// below is test code for new process command api

var userId = "";
var csrf = "";
var returnCode;

export const apiTest = () => {

    do {
        processCommandAPI( userId, csrf, "Register");
    } while ( returnCode == 3 );

    do {
        processCommandAPI( userId, csrf, "GetMenu");
    } while ( returnCode == 3 );

    do {
        processCommandAPI( userId, csrf, "GetTables");
    } while ( returnCode == 3 );

}

// processCommandAPI( userId, csrf, "GetMenu");
// processCommandAPI( userId, csrf, "GetTables");

const processCommandAPI = ( userId, csrf, command) => {

    fetch('https://www.56cardgameonline.com/newdesign/api/process_command.php', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
	        "Control": {
		        "UserID": userId,
		        "CSRF": csrf,
		        "Command": command,
		        "Comment": null,
		        "returnCode": null
	        }
        }),
    })
    .then(response => response.text())
    .then(data => {
        userId = JSON.parse(data).Control.UserID;
        csrf = JSON.parse(data).Control.CSRF;
        returnCode = JSON.parse(data).Control.returnCode;
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}