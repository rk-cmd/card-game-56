import styled from 'styled-components'

export const SideNavigation = styled.div`
    background-color: ${props => props.background};
    height: calc( 100vh - 60px );
    width: 0px;
    overflow-x: hidden;
    overflow-y: auto;
    transition: 0.5s;
    position: fixed;
    z-index: 2;
`

export const ToggleSwitchContainer = styled.div`
    color: ${props => props.fontColor};
    font-size: 15px;
    // display: block;
    display: flex;
    justify-content: center;
    align-items: center;
    // flex-wrap: wrap;
`

export const ToggleSwitchText = styled.span`
    font-weight: 600;
    padding: 7px;
`