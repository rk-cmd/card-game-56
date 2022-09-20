export function initialize() {

    //below code makes sure adContent doesn't come above the scrollbar
    var right = document.getElementById("area").offsetWidth - document.getElementById("area").clientWidth;
    document.getElementById("adContent").style.right = right.toString() + "px";

    //below code makes sure that sideNav and adContent don't overlap in cell phone view
    // if ( document.getElementById("container").style.width < "480px" )
    //     document.getElementsByClassName("sideNavItem")[document.getElementsByClassName("sideNavItem").length - 1].style.marginBottom = "20vh";

    if ( parseInt(getComputedStyle(document.getElementById('container')).width) < 480 )
        document.getElementById('toggleTheme').parentElement.parentElement.style.marginBottom = "20vh";

}