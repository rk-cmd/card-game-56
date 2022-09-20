import React from 'react'
import styled from 'styled-components'

const ChairPopup = ({ bg, chairInfo, states, handlers}) => {

    return (
        <GameDetailsTableItem className={'chairRowMatchDetails'} bg={bg}>

            { null == chairInfo ? <></> : 
            <>
                <TableItem>
                    <ChairIcon bg={ chairInfo.MatchAdmin === 'Y' ? 'others/chair-admin-solid.svg' : 'others/chair-solid.svg' }/>
                    <ChairNumber>{chairInfo.ChairNo}</ChairNumber>
                </TableItem>
                <TableItem>
                    { chairInfo.PlayerName == "" ? "Free" : chairInfo.PlayerName}   
                </TableItem>
                <TableItem>
                    <TableItemButton className={'gameDetailsTableButton'} onClick={e => handlers.actionGameDetailsPopup( e, states)}>
                        { chairInfo.PlayerName == "" ? "Join" : "Watch"} 
                    </TableItemButton>
                </TableItem>
            </>
            }

        </GameDetailsTableItem>
    )
}

const GameDetailsTableItem = styled.div`
    background-color: ${props => props.bg};
    height: 11%;
    width: 100%;
    color: #373737;
    display: flexbox;
    flex-wrap: wrap;
    transition: 0.3s;
`

const TableItem = styled.div`
    height: 100%;
    width: 33.33%;
    display: flexbox;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
`

const ChairIcon = styled.div`
    height: 100%;
    width: 35px;
    // background: url(others/chair-solid.svg);
    background: url(${props => props.bg});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50%;
`

const ChairNumber = styled.div`
    height: 30px;
    width: 30px;
    border: 2px solid #808080;
    border-radius: 50%;
    display: flexbox;
    justify-content: center;
    align-items: center;
`

const TableItemButton = styled.div`
    height: 75%;
    width: 60%;
    background-color: black;
    color: white;
    font-size: 14px;
    border-radius: 5px;
    display: flexbox;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    // &:hover {
    //     background-color: #606060;
    //     transition: 0.3s;
    // }

`

export default ChairPopup
