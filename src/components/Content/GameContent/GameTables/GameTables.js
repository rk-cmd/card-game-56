import React from 'react'
import {useState} from 'react'
import styled from 'styled-components'

import Table from '../Table/Table'
import { sortTables, getTimestamp, apiTest} from './GameTables.scripts'
// import {getTimestamp} from './GameTables.scripts'

const GameTables = ({ theme, TableContent, setTableContent, handler}) => {





    return (
        <GameTablesContainer id="gameTablesContainer">

            {Object.keys(TableContent).map((item) => (
                <TableGroup id={item} key={item} >
                    <TableGroupDesc key={item} fontColor={theme.TileFontColor}>{item}</TableGroupDesc>


                    {
                        Object.keys(TableContent[item]).slice(1).map((itemSub) => 
                        <Table key={itemSub} theme={theme} tile={TableContent[item][itemSub]} groupID={TableContent[item][0]} handler={handler} />
                        // console.log(TableContent[item][itemSub])
                        )
                    }

                    {/* {console.log(item)} */}

                </TableGroup>
            
            ))}

        </GameTablesContainer>
    )
}

const GameTablesContainer = styled.div`
    display: none;
    z-index: 0;
`

const TableGroup = styled.div`
    // width: 100%;
    // background-color: blue;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`

const TableGroupDesc = styled.span`
    width: 100%;
    height: 50px;
    padding: 10px 10px 10px 32px;
    font-size: 20px;
    color: ${props => props.fontColor};
    display: flex;
    align-items: center;
`

export default GameTables
