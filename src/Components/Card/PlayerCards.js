import React from "react";
import Player1 from "../Form/Player1";

function PlayerCards ({ player, season }) {
    return (
        <>
            <Player1 player={player} season={season}/>
            {/* <Player2 player={player}/> */}
        </> 

    )
}

export default PlayerCards; 