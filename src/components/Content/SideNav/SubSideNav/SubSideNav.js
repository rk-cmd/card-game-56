import React from 'react'
import styled from 'styled-components'

import {subSideNavClick} from './SubSideNav.scripts'

const SubSideNav = ({ theme, subSideNavJson}) => {
    
    return (
        <SubSideNavigation background={theme.SubSideNavBackground}>

            {subSideNavJson.map((item) => <SubSideNavItem id={item} key={item} fontColor={theme.SubSideNavFontColor} onClick={(item) => subSideNavClick(item)}>{item.replaceAll( " ", "\u00A0")}</SubSideNavItem>)}

        </SubSideNavigation>
    )
}

const SubSideNavigation = styled.div`
    background-color: ${props => props.background};
    width: calc( 100% - 20px );
    display: none;
    font-size: 18px;
    padding-left: 20px;
`

const SubSideNavItem = styled.a`
    display: block;
    padding: 8px 8px 8px 32px;
    color: ${props => props.fontColor};
    cursor: pointer;
`

export default SubSideNav
