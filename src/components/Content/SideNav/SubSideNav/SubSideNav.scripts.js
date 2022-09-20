export const subSideNavClick = (item) => {

    if( item.target.parentElement.previousSibling.id == "tables" ) {

        switch( item.target.id ) {
        
            case "All":	document.getElementById('gameTablesContainer').childNodes.forEach((child) => child.style.removeProperty('display'))
                    break;
            case "Public":	document.getElementById('gameTablesContainer').childNodes.forEach((child) => { 
                        if(child.id == "Public")
                            child.style.removeProperty('display') 
                        else
                            child.style.display = "none";
                    
                    })
                    break;
            case "My groups":document.getElementById('gameTablesContainer').childNodes.forEach((child) => { 
                        if(child.id != "Public")
                            child.style.removeProperty('display') 
                        else
                            child.style.display = "none";
                    
                    })
                    break;
    
        }

        //to move adContent to the right if no scrolls now and scrolls were there before
        window.dispatchEvent(new Event('resize'));
    
    }

}