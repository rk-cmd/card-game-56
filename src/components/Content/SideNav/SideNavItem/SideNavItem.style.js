import styled from 'styled-components'

export const SideNavItemLink = styled.a`
    // background-color: green;
    width: 234px;
    display: flex;
    flex-wrap: wrap;
    padding: 8px 8px 8px 8px;
    cursor: pointer;
`

export const SideNavItemDrop = styled.div`
    // background-color: blue;
    width: 15%;
    color: white;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Arrow = styled.div`
    border: solid ${props => props.fontColor};
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(45deg);
    transition: 0.5s;
    z-index: -1;
`

export const SideNavItemDesc = styled.div`
    // background-color: red;
    width: 85%;
    color: ${props => props.fontColor};
    font-size: 20px;
`