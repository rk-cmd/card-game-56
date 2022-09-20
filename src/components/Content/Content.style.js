import styled from 'styled-components'

export const Area = styled.div`
    height: calc( 100vh - 60px );
    width: 100%;
    overflow-y: auto;
    // background-color: green;
    display: flex;
    flex-wrap: wrap;
`

export const GameContent = styled.div`

    @media (max-width: 480px) {
        width: 100%;
        margin-bottom: 20vh;
    }
    @media (min-width: 481px) and (max-width: 720px) {
        // width: 70%;
        // width: calc( 100% - 215px );
        width: 100%;
        margin-bottom: 20vh;
    }
    @media (min-width: 721px) {
        // width: 80%;
        width: calc( 100% - 275px );
    }

    height: auto;
    // width: 80%;
    // background-color: blueviolet;
    transition: 0.5s;
    
    // margin-bottom: 20vh;
`
export const AdContent = styled.div`

    @media (max-width: 480px) {
        width: 100%;
        height: 20vh !important;
        bottom: 0px;
    }
    @media (min-width: 481px) and (max-width: 720px) {
        // // width: 30%;
        // width: 215px;
        // // height: 100%;
        // height: calc( 100vh - 60px );
        // // top: 60px;
        // bottom: 0px;
        width: 100%;
        height: 20vh !important;
        bottom: 0px;
    }
    @media (min-width: 721px) {
        // width: 20;
        width: 275px;
        // height: 100%;
        height: calc( 100vh - 60px );
        // top: 60px;
        bottom: 0px;
    }

    // height: 100%;
    // width: 20%;
    background-color: skyblue;
    position: fixed;
    z-index: 3;
    // top: 60px;
`