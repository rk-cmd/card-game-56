import styled from 'styled-components'

export const Tile = styled.a`

    @media (max-width: 480px) {
        height: 180px;
        width: 42.5%;
        // color: #337ab7;
        margin: 5% 0% 5% 5%;
        padding: 10px 0px 10px 0px;
    }
    @media (min-width: 481px) and (max-width: 720px) {
        min-height: 180px;
        height: auto;
        width: 42.5%;
        margin: 5% 0% 5% 5%;
        // color: #337ab7;
        padding: 10px 0px 10px 0px; 
        max-width: 220px
    }
    @media (min-width: 721px) {
        min-height: 200px;
        height: auto;
        width: 220px;
        // height: 200px;
        // width: 250px;
        margin: 20px;
        padding: 15px;
    }

    text-decoration: none;
    // height: 200px;
    // width: 250px;
    // margin: 20px;
    background: ${props => props.background};
    color: ${props => props.fontColor};
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
    // padding: 15px;
    text-align: center;
    cursor: pointer;

    &:hover {
        // background: rgba( 255, 255, 255, 0.6);
        box-shadow: 0px 0px 5px 3px white;
    }

`

export const TileAdd = styled.div`

@media (max-width: 480px) {
    font-size: 80px;
}
@media (min-width: 481px) and (max-width: 720px) {
    font-size: 100px;
}
@media (min-width: 721px) {
    font-size: 100px;
}

    display: flex;
    justify-content: center;
    align-items: center;
    /* min-height: 200px; */
    // font-size: 100px;
`

export const TileName = styled.div`

@media (max-width: 480px) {
    font-size: 18px;
}
@media (min-width: 481px) and (max-width: 720px) {
    font-size: 18px;
}
@media (min-width: 721px) {
    font-size: 22px;
}

    // font-size: 25px;
    margin-bottom: 10px;
`

export const TilePlayers = styled.div`

@media (max-width: 480px) {
   font-size: 44px;
}
@media (min-width: 481px) and (max-width: 720px) {
    font-size: 44px;
}
@media (min-width: 721px) {
    font-size: 44px;
}

    // font-size: 50px;
    margin-bottom: 15px;
`

export const TileDifficulty = styled.div`

@media (max-width: 480px) {
    font-size: 16px;
}
@media (min-width: 481px) and (max-width: 720px) {
    font-size: 16px;
}
@media (min-width: 721px) {
    font-size: 18px;
}

    // font-size: 20px;
    margin-bottom: 15px;
`

export const TileStatus = styled.div`

@media (max-width: 480px) {
    font-size: 16px;
}
@media (min-width: 481px) and (max-width: 720px) {
    font-size: 16px;
}
@media (min-width: 721px) {
    font-size: 18px;
}

    // font-size: 20px;
`