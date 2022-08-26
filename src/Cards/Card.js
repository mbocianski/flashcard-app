import React from "react";

function Card ({card: {id, front, back, deckId}}){

    return(
        <table>
            <tr>
                <td>{front}</td>
                <td>{back}</td>
            </tr>
        </table>
    )



}

export default Card;