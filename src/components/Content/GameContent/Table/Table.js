import React from 'react'
import styled from 'styled-components'

import {Tile, TileName, TileAdd, TilePlayers, TileDifficulty, TileStatus} from './Table.style'

const Table = ({ theme, tile, groupID, handler}) => {
    
    const bgSelect = (background) => {

        if( background == "public")
            return theme.PublicTileBackground;
        else    
            return theme.PrivateTileBackground;

    }
    
    return (

        <Tile id={tile.Name} className={tile.BackGround + " " + tile.TileType + " gameTile"} data-groupid={groupID.GroupID} data-matchid={tile.MatchID} data-mymatch={tile.MyMatch} onClick={((e) => handler.gameTileClick(e))} background={() => bgSelect(tile.BackGround)} fontColor={theme.TileFontColor}>
            <TileName>{tile.Name}</TileName>

            {tile.TileType == "createTile" ? 
                <>
                    <TileAdd>+</TileAdd>
                </>
            :
                <>
                    <TilePlayers>{tile.Players}</TilePlayers>
                    <TileDifficulty>{tile.Difficulty}</TileDifficulty>
                    <TileStatus>{tile.Status}</TileStatus>
                </>
            }


        </Tile>
    )
}

export default Table
