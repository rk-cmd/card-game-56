import React from 'react'
import {useState} from 'react'
import styled from 'styled-components'

import SideNavItem from './SideNavItem/SideNavItem'
import {sideNavDetect} from './SideNav.scripts'
import {SideNavigation, ToggleSwitchContainer, ToggleSwitchText} from './SideNav.style'
import ToggleSwitch from '../Misc/ToggleSwitch/ToggleSwitch'

const SideNav = ({ theme, SideNavItems,handler}) => {

    // const [ SideNavItems, setSideNavItems] = useState ([{"seq_no":0,"item_type":"item_t","parent_folder":"Parent folder","item_name":"item_name","page":"page","icon":"icon"},
    //     {"seq_no":1,"item_type":"P","parent_folder":"root","item_name":"Home","page":".\/home.html","icon":".\/graphics\/home.png"},
    //     {"seq_no":2,"item_type":"F","parent_folder":"root","item_name":"Tables","page":".\/tables.html","icon":".\/graphics\/matches.png"},
    //     {"seq_no":3,"item_type":"P","parent_folder":"tables","item_name":"All","page":".\/allmatches.html","icon":".\/graphics\/matches.png"},
    //     {"seq_no":4,"item_type":"P","parent_folder":"tables","item_name":"Public","page":".\/public.html","icon":".\/graphics\/matches.png"},
    //     {"seq_no":5,"item_type":"P","parent_folder":"tables","item_name":"My groups","page":".\/mygroup.html","icon":".\/graphics\/matches.png"},
    //     {"seq_no":6,"item_type":"P","parent_folder":"root","item_name":"My Statistics","page":".\/mystats.html","icon":".\/graphics\/myaccount.png"},
    //     {"seq_no":7,"item_type":"P","parent_folder":"root","item_name":"My match logs","page":".\/matchlog.php","icon":".\/graphics\/log.png"},
    //     {"seq_no":8,"item_type":"P","parent_folder":"root","item_name":"Suggestions","page":".\/suggestions.php","icon":".\/graphics\/feedback.png"},
    //     {"seq_no":9,"item_type":"P","parent_folder":"root","item_name":"User Settings","page":".\/usersetting.php","icon":".\/graphics\/usersettings.png"},
    //     {"seq_no":10,"item_type":"F","parent_folder":"root","item_name":"Help","page":"","icon":".\/graphics\/help.png"},
    //     {"seq_no":11,"item_type":"P","parent_folder":"Help","item_name":"Site Help","page":".\/sitehelp.html","icon":".\/graphics\/help.png"},
    //     {"seq_no":12,"item_type":"P","parent_folder":"Help","item_name":"56 Bidding rules","page":".\/56 bidding rules.html","icon":".\/graphics\/help.png"}
    // ])

    var sideNavJson = [];

    return (
        <SideNavigation background={theme.SideNavBackground} id="sideNav">
            {sideNavDetect( SideNavItems, sideNavJson)}

            {
                Object.keys(sideNavJson).map( (item) => 
                    <SideNavItem key={item} theme={theme} item={item} sideNavItemJson={sideNavJson[item]}/>
                )
            }

            <div style={{display: "block"}}>
            <ToggleSwitchContainer fontColor={theme.SideNavFontColor}>
                <ToggleSwitchText>Light</ToggleSwitchText>
                <ToggleSwitch item={"toggleTheme"} handler={handler}/>
                <ToggleSwitchText>Dark</ToggleSwitchText>
            </ToggleSwitchContainer>
            </div>
        </SideNavigation>
    )
}

export default SideNav
