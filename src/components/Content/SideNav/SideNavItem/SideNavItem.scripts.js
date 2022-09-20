export function sideNavClick(e) {

    var arrow = e.target.closest('.sideNavItem').firstChild.firstChild.firstChild;
    var node = e.target.closest('.sideNavItem').lastChild;

    if( node != null && arrow != null ) {
        if ( node.style.display == "block" ) {
            node.style.display = "none";
            arrow.style.transform = "rotate( 45deg)";
        }
        else {    
            node.style.display = "block";
            arrow.style.transform = "rotate( 225deg)";
        }
    }

}