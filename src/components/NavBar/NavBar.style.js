import styled from 'styled-components'

export const Navigation = styled.div`
    display: flex;
    align-items: center;
    // background-color: black;
    background-color: ${props => props.background};
    height: 60px;
    width: 100%;
    color: white;
    // padding: 9px 9px 9px 15px;
`

export const NavBarButton = styled.span`
    color: gray;
    // font-size: 6rem;
    font-size: 24px;
    padding: 4px 7px 4px 7px;
    margin-left: 15px;
    border: 1px solid white;
    transition: 0.3s;
    cursor: pointer;
`

export const NavBarLogo = styled.div`
    background-image: url(others/logo.png);
    height: 100%;
    width: 45px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    margin: 0px 10px 0px 10px;
`

export const NavBarText = styled.span`
    // font-size: 6rem;

    @media (max-width: 480px) {
        font-size: 20px;
    }
    @media (min-width: 481px) {
        font-size: 24px;
    }

    // @media (max-width: 820px) {
    //     display: none;
    // }


    // font-size: 24px;
    color: ${props => props.fontColor};
`

export const NavBarMatchDetails = styled.div`
    font-size: 18px;
    font-weight: 600;
    margin-right: 50px;
    position: absolute;
    right: 0;
    display: none;

`

export const NavBarIcon = styled.div`
height: 45px;
width: 45px;
position: absolute;
// background-color: red;
display: none;
cursor: pointer;

background: url(${props => props.bg});
background-size: 50%;
background-repeat: no-repeat;
background-position: center;
background-color: lightgray;
border-radius: 50%;
`
