import React from 'react'
import styled from 'styled-components'

import SubSideNav from '../SubSideNav/SubSideNav'
import {sideNavClick} from './SideNavItem.scripts'
import {SideNavItemLink, SideNavItemDrop, Arrow, SideNavItemDesc} from './SideNavItem.style'

const SideNavItem = ({ theme, item, sideNavItemJson}) => {

    return (
        <div className="sideNavItem">
            <SideNavItemLink id={item.toLowerCase()} onClick={(e) => sideNavClick(e)}>
                
                {sideNavItemJson.length > 1 ? <SideNavItemDrop><Arrow fontColor={theme.SideNavFontColor}/></SideNavItemDrop> 
                : <SideNavItemDrop></SideNavItemDrop>}

                <SideNavItemDesc fontColor={theme.SideNavFontColor}>{item.replaceAll( " ", "\u00A0")}</SideNavItemDesc>
            </SideNavItemLink>
        
            <SubSideNav theme={theme} subSideNavJson={sideNavItemJson} />
        
        </div>
    )
}

export default SideNavItem
